/**
 * Utility functions for DataTable
 * Ported from Evidence's datatable.js and getColumnSummary.js
 */

import type { ColumnSummaryItem, ColumnUnitSummary } from '../types';
import { inferValueType, lookupColumnFormat, formatTitle } from './formatting';

// ============================================================================
// Aggregation Functions
// ============================================================================

/**
 * Calculates weighted mean of a column
 * @returns null when weightCol is missing or data is empty
 */
export function weightedMean(
  data: Record<string, unknown>[],
  valueCol: string,
  weightCol?: string
): number | null {
  if (!weightCol) return null;
  if (!data.length) return null;

  let totalWeightedValue = 0;
  let totalWeight = 0;

  data.forEach((item) => {
    const value = Number(item[valueCol] ?? 0);
    const weight = Number(item[weightCol] ?? 0);
    totalWeightedValue += value * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? totalWeightedValue / totalWeight : 0;
}

/**
 * Calculates median of a column
 */
export function median(data: Record<string, unknown>[], column: string): number {
  const values = data
    .map((item) => item[column])
    .filter((val): val is number => val !== undefined && val !== null && !isNaN(Number(val)))
    .map(Number)
    .sort((a, b) => a - b);

  if (values.length === 0) return 0; // standalone median helper, not the aggregation path

  const midIndex = Math.floor(values.length / 2);
  return values.length % 2 !== 0
    ? values[midIndex]
    : (values[midIndex - 1] + values[midIndex]) / 2;
}

/**
 * Aggregates column values based on the specified aggregation type.
 * Defaults to 'sum' for numeric columns if aggType is not specified.
 */
export function aggregateColumn(
  data: Record<string, unknown>[],
  columnName: string,
  aggType: string | undefined,
  columnType: string,
  weightColumnName?: string | null
): number | string | null {
  if (!aggType && columnType === 'number') {
    aggType = 'sum';
  }

  if (!data || !data.length) return null;

  // Non-numeric columns can't have numeric aggregations
  if (
    columnType !== 'number' &&
    ['sum', 'min', 'max', 'mean', 'weightedMean', 'median', undefined].includes(aggType)
  ) {
    return '-';
  }

  const columnValues = data
    .map((row) => row[columnName])
    .filter((val) => val !== undefined && val !== null);

  switch (aggType) {
    case 'sum':
      return columnValues.reduce<number>((sum, val) => sum + Number(val), 0);
    case 'min':
      // No spread: a 6-figure row count overflows the call stack.
      return columnValues.reduce<number>((m, val) => Math.min(m, Number(val)), Infinity);
    case 'max':
      return columnValues.reduce<number>((m, val) => Math.max(m, Number(val)), -Infinity);
    case 'mean':
      return columnValues.length
        ? columnValues.reduce<number>((sum, val) => sum + Number(val), 0) / columnValues.length
        : '-';
    case 'count':
      return data.length;
    case 'countDistinct':
      return new Set(columnValues).size;
    case 'weightedMean': {
      if (!weightColumnName) return null;
      let totalWeight = 0;
      const weightedSum = data.reduce((sum, row) => {
        const weight = Number(row[weightColumnName] || 0);
        totalWeight += weight;
        return sum + (Number(row[columnName]) || 0) * weight;
      }, 0);
      return totalWeight > 0 ? weightedSum / totalWeight : null;
    }
    case 'median': {
      const sortedValues = columnValues.map(Number).sort((a, b) => a - b);
      const mid = Math.floor(sortedValues.length / 2);
      return sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    }
    default:
      return aggType ? `${aggType}` : null;
  }
}

// ============================================================================
// Column Order
// ============================================================================

/**
 * Generates the final column order placing priority columns (groupBy) first
 */
export function getFinalColumnOrder(columns: string[], priorityColumns: (string | undefined)[]): string[] {
  const validPriority = priorityColumns.filter((c): c is string => c !== undefined);
  const restColumns = columns.filter((key) => !validPriority.includes(key));
  return [...validPriority, ...restColumns];
}

// ============================================================================
// Column Summary
// ============================================================================

/**
 * Computes column unit summary (min, max, median, mean, etc.) for a numeric column
 */
function getColumnUnitSummary(
  data: Record<string, unknown>[],
  columnName: string,
  isNumeric: boolean
): ColumnUnitSummary {
  // Single pass to collect values, count, and count distinct
  let count = 0;
  const distinctSet = new Set<unknown>();

  if (!isNumeric) {
    for (const row of data) {
      const v = row[columnName];
      if (v !== undefined && v !== null) {
        count++;
        distinctSet.add(v);
      }
    }
    return {
      min: undefined as unknown as number,
      max: undefined as unknown as number,
      median: undefined as unknown as number,
      maxDecimals: 0,
      unitType: 'string',
      count,
      countDistinct: distinctSet.size,
      mean: undefined as unknown as number,
      sum: undefined as unknown as number,
    };
  }

  // Single pass for numeric: collect values, compute min/max/sum, track decimals
  const numericValues: number[] = [];
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  let maxDecimals = 0;

  for (const row of data) {
    const v = row[columnName];
    if (v === undefined || v === null) continue;
    count++;
    distinctSet.add(v);
    const num = Number(v);
    if (isNaN(num)) continue;
    numericValues.push(num);
    if (num < min) min = num;
    if (num > max) max = num;
    sum += num;
    // Track decimals
    const str = String(v);
    const dotIdx = str.indexOf('.');
    if (dotIdx !== -1) {
      const dec = str.length - dotIdx - 1;
      if (dec > maxDecimals) maxDecimals = dec;
    }
  }

  if (numericValues.length === 0) {
    return {
      min: 0, max: 0, median: 0, maxDecimals: 0,
      unitType: 'number', count, countDistinct: distinctSet.size, mean: 0, sum: 0,
    };
  }

  const mean = sum / numericValues.length;

  // For median, sort is required but only do it once (already collected)
  numericValues.sort((a, b) => a - b);
  const midIdx = Math.floor(numericValues.length / 2);
  const medianVal = numericValues.length % 2 !== 0
    ? numericValues[midIdx]
    : (numericValues[midIdx - 1] + numericValues[midIdx]) / 2;

  return {
    min, max, median: medianVal, maxDecimals,
    unitType: 'number', count, countDistinct: distinctSet.size, mean, sum,
  };
}

/**
 * Generates column summaries from data array.
 * Returns metadata for each column: id, title, type, format, columnUnitSummary.
 */
export function getColumnSummary(data: Record<string, unknown>[]): ColumnSummaryItem[] {
  if (!data || data.length === 0) return [];

  const columns = Object.keys(data[0]);
  const result: ColumnSummaryItem[] = [];

  for (const colName of columns) {
    // Find first non-null value to infer type
    let sampleValue: unknown = undefined;
    for (const row of data) {
      if (row[colName] !== undefined && row[colName] !== null) {
        sampleValue = row[colName];
        break;
      }
    }

    const type = inferValueType(sampleValue);
    const isNumeric = type === 'number';
    const columnUnitSummary = getColumnUnitSummary(data, colName, isNumeric);

    const format = lookupColumnFormat(
      colName,
      { columnType: type },
      columnUnitSummary
    );

    const title = formatTitle(colName, format);

    result.push({
      id: colName,
      title,
      type,
      format,
      columnUnitSummary,
    });
  }

  return result;
}

/**
 * Finds a column in columnSummary by id
 */
export function safeExtractColumn(
  column: { id: string },
  columnSummary: ColumnSummaryItem[]
): ColumnSummaryItem {
  const found = columnSummary.find((d) => d.id === column.id);
  if (!found) {
    console.warn(`Column "${column.id}" not found in column summary`);
    return {
      id: column.id,
      title: column.id,
      type: 'string',
    };
  }
  return found;
}

// ============================================================================
// Date Auto-Detection
// ============================================================================

/**
 * Standardizes a date string for reliable parsing.
 * Ported from Evidence's dateParsing.js.
 */
function standardizeDateString(date: string): string {
  let d = date;
  const dateSplit = d.split(' ');

  // If date doesn't contain timestamp, add one at midnight
  if (!d.includes(':')) {
    d = d + 'T00:00:00';
  }

  // Remove character groups beyond 2 (date and time)
  if (dateSplit.length > 2) {
    d = dateSplit[0] + ' ' + dateSplit[1];
  }

  // Remove microseconds
  d = d.replace(/\.([^\s]+)/, '');

  // Remove "Z" to avoid timezone issue
  d = d.replace('Z', '');

  // Replace spaces with "T"
  d = d.replace(' ', 'T');

  return d;
}

/**
 * Detects date-typed columns with string values and converts them to Date objects.
 * Returns a new data array with converted date columns.
 */
export function autoConvertDateColumns(
  data: Record<string, unknown>[],
  columnSummary: ColumnSummaryItem[]
): Record<string, unknown>[] {
  if (!data || data.length === 0) return data;

  // Find columns typed as 'date' but with string values (not Date objects)
  const dateCols = columnSummary
    .filter((d) => d.type === 'date' && data[0]?.[d.id] != null && !(data[0][d.id] instanceof Date))
    .map((d) => d.id);

  if (dateCols.length === 0) return data;

  return data.map((row) => {
    const newRow = { ...row };
    for (const col of dateCols) {
      const val = newRow[col];
      if (val != null && typeof val === 'string') {
        newRow[col] = new Date(standardizeDateString(val));
      }
    }
    return newRow;
  });
}

/**
 * Detects number-typed columns with string values and converts them to numbers.
 * Returns a new data array with converted numeric columns.
 * Mutates in-place if data was already cloned by autoConvertDateColumns (same ref check).
 */
export function autoConvertNumericColumns(
  data: Record<string, unknown>[],
  columnSummary: ColumnSummaryItem[],
  originalData?: Record<string, unknown>[]
): Record<string, unknown>[] {
  if (!data || data.length === 0) return data;

  const numCols = columnSummary
    .filter((c) => c.type === 'number' && typeof data[0]?.[c.id] === 'string')
    .map((c) => c.id);

  if (numCols.length === 0) return data;

  // If data was already cloned (not same ref as original), mutate in-place to avoid
  // a second full-dataset clone for 20K+ row tables.
  const alreadyCloned = originalData !== undefined && data !== originalData;

  if (alreadyCloned) {
    for (const row of data) {
      for (const col of numCols) {
        const val = row[col];
        if (val != null && typeof val === 'string') {
          const num = Number(val);
          if (!isNaN(num)) row[col] = num;
        }
      }
    }
    return data;
  }

  return data.map((row) => {
    const newRow = { ...row };
    for (const col of numCols) {
      const val = newRow[col];
      if (val != null && typeof val === 'string') {
        const num = Number(val);
        if (!isNaN(num)) newRow[col] = num;
      }
    }
    return newRow;
  });
}

// ============================================================================
// CSV Export
// ============================================================================

/**
 * Exports table data to CSV and triggers download
 */
export function exportToCsv(
  data: Record<string, unknown>[],
  columns: string[],
  filename = 'table-data'
): void {
  if (!data || data.length === 0) return;

  const subset = data.map((row) => {
    const obj: Record<string, unknown> = {};
    for (const col of columns) {
      obj[col] = row[col];
    }
    return obj;
  });

  const headers = columns.join(',');
  const rows = subset.map((row) =>
    columns
      .map((col) => {
        const val = row[col];
        if (val === null || val === undefined) return '';
        const str = String(val);
        // Escape values containing commas, quotes, or newlines
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(',')
  );

  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
