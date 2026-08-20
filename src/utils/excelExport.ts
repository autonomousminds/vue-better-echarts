/**
 * Excel export utility using ExcelJS (dynamically imported).
 *
 * Produces a styled .xlsx file with:
 * - Formatted headers (bold, gray fill, bottom border)
 * - Number formatting via Excel-compatible numFmt codes
 * - Collapsible row groups (outline levels) when groupBy is used
 * - Subtotal rows per group
 * - Grand total row
 */

import type { TableColumnConfig, ColumnSummaryItem } from '../types/table.types';
import { getFormatObjectFromString } from './formatting';
import { safeExtractColumn, aggregateColumn } from './tableUtils';
import { isFormula, evaluateFormula } from './formulaUtils';

export interface ExcelExportOptions {
  data: Record<string, unknown>[];
  columns: TableColumnConfig[];
  columnSummary: ColumnSummaryItem[];
  groupBy?: string;
  groupedData?: Record<string, Record<string, unknown>[]>;
  sortedGroupNames?: string[];
  subtotals?: boolean;
  totalRow?: boolean;
  title?: string;
  filename?: string;
}

/**
 * Resolves the Excel numFmt code for a column.
 * Returns undefined for auto/string formats (Excel will use General).
 */
function getNumFmt(column: TableColumnConfig, columnSummary: ColumnSummaryItem[]): string | undefined {
  const fmtString = column.fmt;
  if (!fmtString) {
    // Use auto-detected format from column summary
    const colSummary = safeExtractColumn(column, columnSummary);
    const code = colSummary.format?.formatCode;
    if (!code || code === 'auto') return undefined;
    return code;
  }

  const formatObj = getFormatObjectFromString(fmtString);
  const code = formatObj.formatCode;
  if (!code || code === 'auto') return undefined;
  return code;
}

/**
 * Gets the aggregated value for a column in a subtotal/total row.
 * Mirrors the logic in SubtotalRow.vue / TotalRow.vue.
 */
function getAggValue(
  column: TableColumnConfig,
  data: Record<string, unknown>[],
  allColumns: TableColumnConfig[],
  columnSummary: ColumnSummaryItem[],
): number | string | null {
  if (isFormula(column.totalAgg)) {
    return evaluateFormula(column.totalAgg, data, allColumns, columnSummary);
  }
  const colSummary = safeExtractColumn(column, columnSummary);
  return aggregateColumn(data, column.id, column.totalAgg, colSummary.type, column.weightCol);
}

/**
 * Estimates a reasonable column width from data.
 */
function estimateColumnWidth(
  column: TableColumnConfig,
  data: Record<string, unknown>[],
  headerTitle: string,
): number {
  let maxLen = headerTitle.length;
  const sampleSize = Math.min(data.length, 100);
  for (let i = 0; i < sampleSize; i++) {
    const val = data[i]?.[column.id];
    if (val != null) {
      maxLen = Math.max(maxLen, String(val).length);
    }
  }
  // Add some padding, cap at 30
  return Math.min(Math.max(maxLen + 2, 8), 30);
}

/**
 * ExcelJS converts Date → Excel serial via raw getTime() (UTC ms) with no TZ
 * adjustment. Our Date objects come from ISO strings parsed as local time
 * (Z stripped upstream), so for users east of UTC, getTime() points at the
 * previous calendar day. Shift so UTC components match local components.
 */
function toExcelSafeDate(val: unknown): unknown {
  if (val instanceof Date && !isNaN(val.getTime())) {
    return new Date(val.getTime() - val.getTimezoneOffset() * 60000);
  }
  return val;
}

/**
 * Excel worksheet names: no * ? : \ / [ ], max 31 chars, no leading/trailing
 * apostrophe, non-empty — ExcelJS throws otherwise.
 */
function sanitizeSheetName(name: string): string {
  const cleaned = name
    .replace(/[*?:\\/[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 31)
    .replace(/^'+|'+$/g, '')
    .trim();
  return cleaned || 'Data';
}

/**
 * Exports data to an Excel (.xlsx) file and triggers download.
 */
export async function exportToXlsx(options: ExcelExportOptions): Promise<void> {
  const {
    data,
    columns,
    columnSummary,
    groupBy,
    groupedData,
    sortedGroupNames,
    subtotals = false,
    totalRow = false,
    title,
    filename = 'table-data',
  } = options;

  if (!data || data.length === 0) return;

  // Dynamic import of ExcelJS
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sanitizeSheetName(title || 'Data'));

  // --- Header row ---
  const headerFill: import('exceljs').Fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF3F4F6' },
  };
  const headerFont: Partial<import('exceljs').Font> = { bold: true, size: 10 };
  const borderBottom: Partial<import('exceljs').Borders> = {
    bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  };

  // Column headers
  const headerTitles = columns.map((col) => {
    const colSummary = safeExtractColumn(col, columnSummary);
    return col.title || colSummary.title || col.id;
  });

  const headerRow = worksheet.addRow(headerTitles);
  headerRow.eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.border = borderBottom;
  });

  // Set column widths and alignment
  columns.forEach((col, idx) => {
    const wsCol = worksheet.getColumn(idx + 1);
    wsCol.width = estimateColumnWidth(col, data, headerTitles[idx]);

    const colSummary = safeExtractColumn(col, columnSummary);
    if (colSummary.type === 'number') {
      wsCol.alignment = { horizontal: 'right' };
    } else {
      wsCol.alignment = { horizontal: 'left' };
    }
  });

  // --- Data rows ---
  const isGrouped = groupBy && groupedData && sortedGroupNames && sortedGroupNames.length > 0;

  if (isGrouped) {
    // Grouped export
    const groupHeaderFont: Partial<import('exceljs').Font> = { bold: true, size: 10 };
    const subtotalFill: import('exceljs').Fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF3F4F6' },
    };

    for (const groupName of sortedGroupNames!) {
      const groupRows = groupedData![groupName];
      if (!groupRows) continue;

      // Group header row (merged across all columns)
      const groupHeaderRow = worksheet.addRow([groupName]);
      groupHeaderRow.font = groupHeaderFont;
      if (columns.length > 1) {
        worksheet.mergeCells(groupHeaderRow.number, 1, groupHeaderRow.number, columns.length);
      }

      // Data rows with outline level (collapsible in Excel)
      for (const row of groupRows) {
        const dataRow = worksheet.addRow(columns.map((col) => toExcelSafeDate(row[col.id]) ?? ''));
        dataRow.outlineLevel = 1;

        // Apply number formats
        columns.forEach((col, idx) => {
          const numFmt = getNumFmt(col, columnSummary);
          if (numFmt) {
            dataRow.getCell(idx + 1).numFmt = numFmt;
          }
        });
      }

      // Subtotal row
      if (subtotals) {
        const subtotalValues = columns.map((col) => {
          if (col.id === groupBy) return groupName;
          return getAggValue(col, groupRows, columns, columnSummary) ?? '';
        });
        const subtotalRow = worksheet.addRow(subtotalValues);
        subtotalRow.font = { bold: true, size: 10 };
        subtotalRow.eachCell((cell) => {
          cell.fill = subtotalFill;
        });
        // Apply number formats to subtotal
        columns.forEach((col, idx) => {
          if (col.id === groupBy) return;
          const numFmt = getNumFmt(col, columnSummary);
          if (numFmt) {
            subtotalRow.getCell(idx + 1).numFmt = numFmt;
          }
        });
      }
    }
  } else {
    // Ungrouped export
    for (const row of data) {
      const dataRow = worksheet.addRow(columns.map((col) => toExcelSafeDate(row[col.id]) ?? ''));

      columns.forEach((col, idx) => {
        const numFmt = getNumFmt(col, columnSummary);
        if (numFmt) {
          dataRow.getCell(idx + 1).numFmt = numFmt;
        }
      });
    }
  }

  // --- Grand total row ---
  if (totalRow) {
    const totalValues = columns.map((col) =>
      getAggValue(col, data, columns, columnSummary) ?? '',
    );
    const grandTotalRow = worksheet.addRow(totalValues);
    grandTotalRow.font = { bold: true, size: 10 };
    grandTotalRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'double', color: { argb: 'FF999999' } },
      };
    });
    // Apply number formats to total row
    columns.forEach((col, idx) => {
      const numFmt = getNumFmt(col, columnSummary);
      if (numFmt) {
        grandTotalRow.getCell(idx + 1).numFmt = numFmt;
      }
    });
  }

  // --- Write and download ---
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename.replace(/[*?:\\/[\]]/g, ' ').replace(/\s+/g, ' ').trim() || 'table-data'}.xlsx`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
