/**
 * Complete data so every series has a value for every x value.
 * Prevents visual artifacts in stacked/multi-series charts.
 */
export interface CompletedDataOptions {
  nullsZero?: boolean;
  fillX?: boolean;
}

export function getCompletedData(
  data: Record<string, any>[],
  x: string,
  y: string | string[],
  series?: string,
  options?: CompletedDataOptions
): Record<string, any>[] {
  if (!data || data.length === 0 || !x) return data;

  // Filter out rows where x is null/undefined
  const filtered = data.filter(row => row[x] != null);
  if (filtered.length === 0) return filtered;

  const yColumns = Array.isArray(y) ? y : [y];
  const fillValue = options?.nullsZero ? 0 : null;

  // If no series column, no completion needed (single series)
  if (!series) return filtered;

  // Get all distinct x values and series values
  const allX = [...new Set(filtered.map(row => row[x]))];
  const allSeries = [...new Set(filtered.map(row => row[series]))];

  // First-seen x order interleaves date ranges when rows arrive grouped by
  // series (ORDER BY series, day) — keep numeric/date x chronological.
  if (allX.every(v => typeof v === 'number')) {
    (allX as number[]).sort((a, b) => a - b);
  } else if (allX.every(v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v))) {
    (allX as string[]).sort();
  }

  // Build a lookup map: key = `${xVal}|||${seriesVal}`
  const existing = new Map<string, Record<string, any>>();
  for (const row of filtered) {
    const key = `${row[x]}|||${row[series]}`;
    existing.set(key, row);
  }

  // Fill in missing combinations
  const result: Record<string, any>[] = [];
  for (const xVal of allX) {
    for (const seriesVal of allSeries) {
      const key = `${xVal}|||${seriesVal}`;
      if (existing.has(key)) {
        result.push(existing.get(key)!);
      } else {
        // Create a new row with fill values
        const newRow: Record<string, any> = { [x]: xVal, [series]: seriesVal };
        for (const col of yColumns) {
          newRow[col] = fillValue;
        }
        result.push(newRow);
      }
    }
  }

  return result;
}

/**
 * Replace null/undefined y values with 0.
 * Used for stacked charts where nulls cause incorrect rendering.
 */
export function replaceNulls(
  data: Record<string, any>[],
  yColumns: string | string[]
): Record<string, any>[] {
  const cols = Array.isArray(yColumns) ? yColumns : [yColumns];
  return data.map(row => {
    const newRow = { ...row };
    for (const col of cols) {
      if (newRow[col] == null) newRow[col] = 0;
    }
    return newRow;
  });
}
