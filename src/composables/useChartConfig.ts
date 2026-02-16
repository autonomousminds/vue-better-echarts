/**
 * Vue 3 composable for chart configuration building
 */

import { computed, type ComputedRef } from 'vue';
import type { EChartsOption } from 'echarts';
import type {
  BaseChartProps,
  DataRecord,
  XAxisType,
  FormatObject,
  ColumnUnitSummary,
  SeriesConfig,
  ColumnSummary,
  LegendPosition
} from '../types';
import { formatAxisValue, formatTitle, getFormatObjectFromString, lookupColumnFormat } from '../utils/formatting';
import { standardizeDateColumn } from '../utils/dateParsing';
import { createTooltipConfig } from './useTooltip';

/**
 * Gets legend configuration based on position
 */
function getLegendConfig(
  show: boolean,
  position: LegendPosition | undefined,
  defaultTop: number,
  hasZoomSlider: boolean = false
): Record<string, unknown> {
  const baseConfig = {
    show,
    type: 'scroll' as const,
    padding: [0, 0, 0, 0] as [number, number, number, number]
  };

  // Default position is top
  if (!position || position === 'top') {
    return {
      ...baseConfig,
      top: defaultTop,
      left: 'center',
      orient: 'horizontal' as const
    };
  }

  let result: Record<string, unknown>;
  switch (position) {
    case 'bottom':
      // Position legend between chart and zoom slider
      // Legend sits just above the zoom slider (or at bottom if no slider)
      result = {
        ...baseConfig,
        bottom: hasZoomSlider ? 40 : 0,
        left: 'center',
        orient: 'horizontal' as const
      };
      break;
    case 'left':
      result = {
        ...baseConfig,
        left: 5,
        top: 'middle',
        orient: 'vertical' as const
      };
      break;
    case 'right':
      result = {
        ...baseConfig,
        right: 5,
        top: 'middle',
        orient: 'vertical' as const
      };
      break;
    default:
      result = {
        ...baseConfig,
        top: defaultTop,
        left: 'center',
        orient: 'horizontal' as const
      };
  }

  return result;
}

export interface ChartConfigOptions extends BaseChartProps {
  chartType?: string;
  stacked100?: boolean;
  stackType?: string;
}

export interface UseChartConfigReturn {
  /**
   * Processed data
   */
  processedData: ComputedRef<DataRecord[]>;

  /**
   * Column summary information
   */
  columnSummary: ComputedRef<Record<string, ColumnSummary>>;

  /**
   * X-axis type (category, value, time)
   */
  xAxisType: ComputedRef<XAxisType>;

  /**
   * Base ECharts configuration
   */
  baseConfig: ComputedRef<EChartsOption>;

  /**
   * Format objects
   */
  formats: ComputedRef<{
    x?: FormatObject;
    y?: FormatObject;
    y2?: FormatObject;
    size?: FormatObject;
  }>;

  /**
   * Unit summaries
   */
  unitSummaries: ComputedRef<{
    x?: ColumnUnitSummary;
    y?: ColumnUnitSummary;
    y2?: ColumnUnitSummary;
  }>;
}

/**
 * Gets column summary from data
 */
export function getColumnSummary(data: DataRecord[]): Record<string, ColumnSummary> {
  if (!data || data.length === 0) return {};

  const summary: Record<string, ColumnSummary> = {};
  const firstRow = data[0];

  for (const key of Object.keys(firstRow)) {
    const values = data.map((d) => d[key]).filter((v) => v != null);
    const sampleValue = values[0];

    let type: 'number' | 'date' | 'string' | 'boolean' = 'string';
    let columnUnitSummary: ColumnUnitSummary | undefined;

    if (typeof sampleValue === 'number') {
      type = 'number';
      const numValues = values as number[];
      const sorted = [...numValues].sort((a, b) => a - b);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const median = sorted[Math.floor(sorted.length / 2)];
      const maxDecimals = Math.max(
        ...numValues.map((v) => {
          const str = v.toString();
          const decimalIndex = str.indexOf('.');
          return decimalIndex >= 0 ? str.length - decimalIndex - 1 : 0;
        })
      );

      columnUnitSummary = { min, max, median, maxDecimals, unitType: 'number' };
    } else if (typeof sampleValue === 'boolean') {
      type = 'boolean';
    } else if (sampleValue instanceof Date) {
      type = 'date';
      columnUnitSummary = { min: 0, max: 0, median: 0, maxDecimals: 0, unitType: 'date' };
    } else if (typeof sampleValue === 'string') {
      // Check if it looks like a date
      const dateAttempt = new Date(sampleValue);
      if (!isNaN(dateAttempt.getTime()) && sampleValue.match(/\d{4}-\d{2}-\d{2}/)) {
        type = 'date';
        columnUnitSummary = { min: 0, max: 0, median: 0, maxDecimals: 0, unitType: 'date' };
      }
    }

    // Look up format based on column name
    const format = lookupColumnFormat(
      key,
      { columnType: type },
      columnUnitSummary
    );

    summary[key] = {
      id: key,
      title: formatTitle(key, format),
      type,
      format,
      columnUnitSummary
    };
  }

  return summary;
}

/**
 * Gets distinct values from a column
 */
export function getDistinctValues(data: DataRecord[], column: string): unknown[] {
  const values = new Set(data.map((d) => d[column]));
  return Array.from(values);
}

/**
 * Gets distinct count from a column
 */
export function getDistinctCount(data: DataRecord[], column: string): number {
  return getDistinctValues(data, column).length;
}

/**
 * Sorts data by a column
 */
export function getSortedData(
  data: DataRecord[],
  column: string | string[],
  ascending = true
): DataRecord[] {
  const sortColumn = Array.isArray(column) ? column[0] : column;
  return [...data].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return ascending ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal);
    const bStr = String(bVal);
    return ascending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
}

/**
 * Main composable for chart configuration
 */
interface ChartConfigExtraOptions {
  chartType?: string;
  stacked100?: boolean;
  xType?: string;
  resolvedColorPalette?: () => string[] | undefined;
  resolvedYAxisColor?: () => unknown;
  resolvedY2AxisColor?: () => unknown;
}

export function useChartConfig(
  props: BaseChartProps,
  options: ChartConfigExtraOptions = {}
): UseChartConfigReturn {
  // Extract options (chartType and stacked100 reserved for future use)
  const { xType: overrideXType, resolvedColorPalette: getColorPalette, resolvedYAxisColor: getYAxisColor, resolvedY2AxisColor: getY2AxisColor } = options;
  // Process data
  const processedData = computed(() => {
    let data = [...(props.data || [])];

    // Standardize date columns
    const colSummary = getColumnSummary(data);
    const dateCols = Object.values(colSummary)
      .filter((col) => col.type === 'date')
      .map((col) => col.id);

    for (const col of dateCols) {
      data = standardizeDateColumn(data, col);
    }

    // Sort data if needed
    if (props.sort !== false && props.x) {
      const xType = colSummary[props.x]?.type;
      if (xType === 'date' || xType === 'number') {
        data = getSortedData(data, props.x, true);
      } else if (props.y) {
        data = getSortedData(data, props.y, false);
      }
    }

    return data;
  });

  // Column summary
  const columnSummary = computed(() => {
    return getColumnSummary(processedData.value);
  });

  // X-axis type
  const xAxisType = computed<XAxisType>(() => {
    if (overrideXType) return overrideXType as XAxisType;
    if (props.xType) return props.xType;
    if (!props.x) return 'category';

    const colType = columnSummary.value[props.x]?.type;
    switch (colType) {
      case 'number':
        return 'value';
      case 'date':
        return 'time';
      default:
        return 'category';
    }
  });

  // Format objects
  const formats = computed(() => {
    const result: {
      x?: FormatObject;
      y?: FormatObject;
      y2?: FormatObject;
      size?: FormatObject;
    } = {};

    if (props.x) {
      if (props.xFmt) {
        result.x = getFormatObjectFromString(props.xFmt, columnSummary.value[props.x]?.format?.valueType);
      } else {
        result.x = columnSummary.value[props.x]?.format;
      }
    }

    const yCol = Array.isArray(props.y) ? props.y[0] : props.y;
    if (yCol) {
      if (props.yFmt) {
        result.y = getFormatObjectFromString(props.yFmt, columnSummary.value[yCol]?.format?.valueType);
      } else {
        result.y = columnSummary.value[yCol]?.format;
      }
    }

    const y2Col = Array.isArray(props.y2) ? props.y2[0] : props.y2;
    if (y2Col) {
      if (props.y2Fmt) {
        result.y2 = getFormatObjectFromString(props.y2Fmt, columnSummary.value[y2Col]?.format?.valueType);
      } else {
        result.y2 = columnSummary.value[y2Col]?.format;
      }
    }

    return result;
  });

  // Unit summaries
  const unitSummaries = computed(() => {
    const result: {
      x?: ColumnUnitSummary;
      y?: ColumnUnitSummary;
      y2?: ColumnUnitSummary;
    } = {};

    if (props.x) {
      result.x = columnSummary.value[props.x]?.columnUnitSummary;
    }

    const yCol = Array.isArray(props.y) ? props.y[0] : props.y;
    if (yCol) {
      result.y = columnSummary.value[yCol]?.columnUnitSummary;
    }

    const y2Col = Array.isArray(props.y2) ? props.y2[0] : props.y2;
    if (y2Col) {
      result.y2 = columnSummary.value[y2Col]?.columnUnitSummary;
    }

    return result;
  });

  // Calculate series counts
  const yCount = computed(() => {
    return Array.isArray(props.y) ? props.y.length : (props.y ? 1 : 0);
  });

  const y2Count = computed(() => {
    return Array.isArray(props.y2) ? props.y2.length : (props.y2 ? 1 : 0);
  });

  const seriesCount = computed(() => {
    const distinctSeries = props.series ? getDistinctCount(processedData.value, props.series) : 1;
    return yCount.value * distinctSeries;
  });

  const totalSeriesCount = computed(() => {
    return seriesCount.value + y2Count.value;
  });

  // Base configuration
  const baseConfig = computed<EChartsOption>(() => {
    const swapXY = props.swapXY || false;
    const legend = props.legend ?? totalSeriesCount.value > 1;

    // Calculate chart dimensions
    // Title/subtitle are now rendered as HTML outside the chart via ChartHeader
    // So we don't need to account for them in the chart grid
    const hasLegend = legend;

    // Legend position affects chart dimensions
    const legendPos = props.legendPosition || 'top';
    const isLegendTop = legendPos === 'top';
    const isLegendBottom = legendPos === 'bottom';
    const isLegendLeft = legendPos === 'left';
    const isLegendRight = legendPos === 'right';

    const legendHeight = hasLegend && isLegendTop ? 15 : 0;
    const chartAreaPaddingTop = 10;
    const chartAreaPaddingBottom = 10;

    // Extra top padding when y-axis has a title (placed at top of axis via nameLocation: 'end')
    const yAxisTitleRaw = props.yAxisTitle === true
      ? formatTitle(Array.isArray(props.y) ? '' : (props.y || ''), formats.value.y)
      : (props.yAxisTitle === false ? '' : (props.yAxisTitle || ''));
    const y2AxisTitleRaw = props.y2AxisTitle === true
      ? formatTitle(Array.isArray(props.y2) ? '' : (props.y2 || ''), formats.value.y2)
      : (props.y2AxisTitle === false ? '' : (props.y2AxisTitle || ''));
    const yAxisTitlePaddingTop = (yAxisTitleRaw || y2AxisTitleRaw) ? 15 : 0;

    const chartTop = legendHeight + chartAreaPaddingTop + yAxisTitlePaddingTop;

    // Check if there's a zoom slider at the bottom
    const hasZoomSlider = !!props.zoom && (
      props.zoom === true ||
      (typeof props.zoom === 'object' && (props.zoom.type === 'slider' || props.zoom.type === 'both'))
    );

    // Calculate bottom space needed
    // When legend is at bottom: grid must leave room for legend below x-axis labels
    // Stack from bottom: zoom slider (~40px) + legend (~20px) + gap
    const zoomSliderHeight = hasZoomSlider ? 40 : 0;
    const bottomLegendHeight = hasLegend && isLegendBottom ? 25 : 0;
    const chartBottom = chartAreaPaddingBottom + zoomSliderHeight + bottomLegendHeight;

    // Side padding for left/right legend - use fixed pixels to leave room for legend
    const leftLegendPadding = hasLegend && isLegendLeft ? 70 : (swapXY ? '1%' : '0.8%');
    const rightLegendPadding = hasLegend && isLegendRight ? 70 : (swapXY ? '4%' : '3%');

    // Axis titles
    const xAxisTitle = props.xAxisTitle === true
      ? formatTitle(props.x || '', formats.value.x)
      : (props.xAxisTitle === false ? '' : (props.xAxisTitle || ''));

    const yAxisTitle = props.yAxisTitle === true
      ? formatTitle(Array.isArray(props.y) ? '' : (props.y || ''), formats.value.y)
      : (props.yAxisTitle === false ? '' : (props.yAxisTitle || ''));

    // Extra bottom padding needed when x-axis has a title
    const xAxisTitlePadding = xAxisTitle ? 25 : 0;

    // Build axis config
    const xAxisConfig = swapXY
      ? {
          type: (props.yLog ? 'log' : 'value') as 'log' | 'value',
          logBase: props.yLogBase || 10,
          position: 'top' as const,
          axisLabel: {
            show: props.yAxisLabels !== false,
            hideOverlap: true,
            formatter: (value: number) => formatAxisValue(value, formats.value.y, unitSummaries.value.y)
          },
          min: props.yMin,
          max: props.yMax,
          scale: props.yScale,
          splitLine: { show: props.yGridlines !== false },
          axisLine: { show: props.yBaseline, onZero: false },
          axisTick: { show: props.yTickMarks }
        }
      : {
          type: xAxisType.value,
          min: props.xMin,
          max: props.xMax,
          splitLine: { show: props.xGridlines },
          axisLine: { show: props.xBaseline !== false },
          axisTick: { show: props.xTickMarks },
          axisLabel: {
            show: props.xAxisLabels !== false,
            hideOverlap: true,
            formatter: xAxisType.value === 'time' || xAxisType.value === 'category'
              ? undefined
              : (value: number) => formatAxisValue(value, formats.value.x, unitSummaries.value.x)
          },
          name: xAxisTitle,
          nameLocation: 'middle' as const,
          nameGap: 30
        };

    const hasY2 = !swapXY && y2Count.value > 0;

    // Compute axis colors (only when dual axis is active)
    const colorPalette = getColorPalette?.();
    const yAxisColorRaw = getYAxisColor?.() as string | undefined;
    const y2AxisColorRaw = getY2AxisColor?.() as string | undefined;

    const yAxisColorValue = hasY2
      ? (!yAxisColorRaw || yAxisColorRaw === 'true'
          ? colorPalette?.[0]
          : yAxisColorRaw !== 'false' ? yAxisColorRaw : undefined)
      : undefined;

    const y2StartIndex = yCount.value * (props.series ? getDistinctCount(processedData.value, props.series) : 1);
    const y2AxisColorValue = hasY2
      ? (!y2AxisColorRaw || y2AxisColorRaw === 'true'
          ? colorPalette?.[y2StartIndex]
          : y2AxisColorRaw !== 'false' ? y2AxisColorRaw : undefined)
      : undefined;

    // Y2 axis title
    const y2AxisTitle = hasY2
      ? (props.y2AxisTitle === true
        ? formatTitle(Array.isArray(props.y2) ? '' : (props.y2 || ''), formats.value.y2)
        : (props.y2AxisTitle === false ? '' : (props.y2AxisTitle || '')))
      : '';

    const primaryYAxisConfig = swapXY
      ? {
          type: 'category' as const,
          inverse: true,
          splitLine: { show: props.xGridlines },
          axisLine: { show: props.xBaseline !== false },
          axisTick: { show: props.xTickMarks },
          axisLabel: { show: props.xAxisLabels !== false, hideOverlap: true }
        }
      : {
          type: (props.yLog ? 'log' : 'value') as 'log' | 'value',
          logBase: props.yLogBase || 10,
          splitLine: { show: props.yGridlines !== false },
          axisLine: { show: props.yBaseline, onZero: false },
          axisTick: { show: props.yTickMarks },
          axisLabel: {
            show: props.yAxisLabels !== false,
            hideOverlap: true,
            color: yAxisColorValue,
            formatter: (value: number) => formatAxisValue(value, formats.value.y, unitSummaries.value.y)
          },
          name: yAxisTitle,
          nameLocation: 'end' as const,
          nameTextStyle: { align: 'left' as const, verticalAlign: 'top' as const, padding: [0, 5, 0, 0] as [number, number, number, number], color: yAxisColorValue },
          min: props.yMin,
          max: props.yMax,
          scale: props.yScale,
          boundaryGap: ['0%', '1%'] as [string, string]
        };

    // Build yAxis config — array when y2 exists, single object otherwise
    let yAxisConfig: EChartsOption['yAxis'];
    if (hasY2) {
      const secondaryYAxisConfig = {
        type: 'value' as const,
        alignTicks: true,
        splitLine: { show: props.y2Gridlines ?? false },
        axisLine: { show: props.y2Baseline, onZero: false },
        axisTick: { show: props.y2TickMarks },
        axisLabel: {
          show: props.y2AxisLabels !== false,
          hideOverlap: true,
          color: y2AxisColorValue,
          formatter: (value: number) => formatAxisValue(value, formats.value.y2, unitSummaries.value.y2)
        },
        name: y2AxisTitle,
        nameLocation: 'end' as const,
        nameTextStyle: { align: 'right' as const, verticalAlign: 'top' as const, padding: [0, 0, 0, 5] as [number, number, number, number], color: y2AxisColorValue },
        min: props.y2Min,
        max: props.y2Max,
        scale: props.y2Scale,
        boundaryGap: ['0%', '1%'] as [string, string]
      };
      yAxisConfig = [primaryYAxisConfig, secondaryYAxisConfig];
    } else {
      yAxisConfig = primaryYAxisConfig;
    }

    // Tooltip config
    const tooltipConfig = createTooltipConfig({
      swapXY,
      xType: xAxisType.value,
      totalSeriesCount: totalSeriesCount.value,
      yCount: yCount.value,
      y2Count: y2Count.value,
      xColumn: props.x,
      yColumn: props.y,
      xFormat: formats.value.x,
      yFormat: formats.value.y,
      y2Format: formats.value.y2,
      tooltipTitle: props.tooltipTitle
    });

    return {
      // Title/subtitle are rendered as HTML via ChartHeader component
      // Not included in ECharts config to avoid duplication
      tooltip: tooltipConfig,
      legend: getLegendConfig(legend, props.legendPosition, 0, hasZoomSlider),
      grid: {
        left: props.leftPadding || leftLegendPadding,
        right: props.rightPadding || rightLegendPadding,
        bottom: chartBottom + xAxisTitlePadding,
        top: chartTop,
        containLabel: true
      },
      xAxis: xAxisConfig,
      yAxis: yAxisConfig,
      series: [],
      animation: true
    };
  });

  return {
    processedData,
    columnSummary,
    xAxisType,
    baseConfig,
    formats,
    unitSummaries
  };
}

/**
 * Generates series configuration from data
 */
export function getSeriesConfig(
  data: DataRecord[],
  x: string,
  y: string | string[],
  series: string | undefined,
  swapXY: boolean,
  baseConfig: Partial<SeriesConfig>,
  columnSummary: Record<string, ColumnSummary>,
  options: {
    xMismatch?: boolean;
    size?: string;
    tooltipTitle?: string;
    y2?: string | string[];
    seriesOrder?: string[];
    seriesLabelFmt?: string;
    fillMissingData?: boolean;
  } = {}
): SeriesConfig[] {
  const {
    xMismatch = false,
    size,
    tooltipTitle,
    y2,
    seriesOrder,
    fillMissingData = false
  } = options;

  const seriesConfigs: SeriesConfig[] = [];

  // Combine y and y2 columns with their axis indices
  const yList: Array<[string, number]> = [];
  const yArray = Array.isArray(y) ? y : (y ? [y] : []);
  const y2Array = Array.isArray(y2) ? y2 : (y2 ? [y2] : []);

  yArray.forEach((col) => yList.push([col, 0]));
  y2Array.forEach((col) => yList.push([col, 1]));

  // Helper to build data points for a column from a set of rows
  function buildSeriesData(rows: DataRecord[], yCol: string): unknown[][] {
    return rows.map((d) => {
      const xVal = xMismatch ? String(d[x]) : d[x];
      const yVal = d[yCol];
      const point = swapXY ? [yVal, xVal] : [xVal, yVal];

      if (size) point.push(d[size]);
      if (tooltipTitle) point.push(d[tooltipTitle]);

      return point;
    });
  }

  // Helper to aggregate y2 data by x value (sum) when series grouping causes duplicate x values
  function buildAggregatedSeriesData(rows: DataRecord[], yCol: string): unknown[][] {
    const aggregated = new Map<unknown, number>();
    const xOrder: unknown[] = [];
    for (const d of rows) {
      const xVal = xMismatch ? String(d[x]) : d[x];
      const yVal = d[yCol];
      const numVal = typeof yVal === 'number' ? yVal : 0;
      if (aggregated.has(xVal)) {
        aggregated.set(xVal, (aggregated.get(xVal) || 0) + numVal);
      } else {
        aggregated.set(xVal, numVal);
        xOrder.push(xVal);
      }
    }
    return xOrder.map((xVal) => {
      const point = swapXY ? [aggregated.get(xVal), xVal] : [xVal, aggregated.get(xVal)];
      return point;
    });
  }

  // Helper to build series data with all x-values filled (missing → 0)
  // Used for stacked charts to prevent white gaps when a series is missing data for some x-values
  function buildFilledSeriesData(allXValues: unknown[], rows: DataRecord[], yCol: string): unknown[][] {
    const xMap = new Map<string, DataRecord>();
    for (const d of rows) {
      const xVal = xMismatch ? String(d[x]) : d[x];
      xMap.set(String(xVal), d);
    }
    return allXValues.map((xVal) => {
      const row = xMap.get(String(xVal));
      const yVal = row ? (row[yCol] ?? 0) : 0;
      const point = swapXY ? [yVal, xVal] : [xVal, yVal];
      if (size) point.push(row ? row[size] : undefined);
      if (tooltipTitle) point.push(row ? row[tooltipTitle] : undefined);
      return point;
    });
  }

  // Collect all distinct x-values (needed for fillMissingData)
  const allXValues = fillMissingData ? getDistinctValues(data, x) : [];

  // Generate series config
  if (series && y2Array.length > 0) {
    // Series column WITH y2: group primary y by series, aggregate y2 separately
    const distinctValues = getDistinctValues(data, series);

    // Primary y columns: grouped by series value
    for (const yCol of yArray) {
      for (const seriesValue of distinctValues) {
        const filteredData = data.filter((d) => d[series] === seriesValue);
        seriesConfigs.push({
          name: yArray.length > 1
            ? `${String(seriesValue ?? 'null')} - ${columnSummary[yCol]?.title || yCol}`
            : String(seriesValue ?? 'null'),
          data: fillMissingData
            ? buildFilledSeriesData(allXValues, filteredData, yCol)
            : buildSeriesData(filteredData, yCol),
          yAxisIndex: 0,
          ...baseConfig
        });
      }
    }

    // Y2 columns: aggregated by x value (not grouped by series)
    for (const y2Col of y2Array) {
      seriesConfigs.push({
        name: columnSummary[y2Col]?.title || y2Col,
        data: buildAggregatedSeriesData(data, y2Col),
        yAxisIndex: 1,
        ...baseConfig
      });
    }
  } else if (series && yList.length === 1) {
    // Series column with single y column (no y2)
    const distinctValues = getDistinctValues(data, series);

    for (const seriesValue of distinctValues) {
      const filteredData = data.filter((d) => d[series] === seriesValue);
      seriesConfigs.push({
        name: String(seriesValue ?? 'null'),
        data: fillMissingData
          ? buildFilledSeriesData(allXValues, filteredData, yList[0][0])
          : buildSeriesData(filteredData, yList[0][0]),
        yAxisIndex: yList[0][1],
        ...baseConfig
      });
    }
  } else if (yList.length > 1) {
    // Multiple y/y2 columns without series grouping
    for (const [yCol, yAxisIndex] of yList) {
      seriesConfigs.push({
        name: columnSummary[yCol]?.title || yCol,
        data: buildSeriesData(data, yCol),
        yAxisIndex,
        ...baseConfig
      });
    }
  } else if (yList.length === 1) {
    // Single y column without series grouping
    seriesConfigs.push({
      name: columnSummary[yList[0][0]]?.title || yList[0][0],
      data: buildSeriesData(data, yList[0][0]),
      yAxisIndex: yList[0][1],
      ...baseConfig
    });
  }

  // Apply series order
  if (seriesOrder) {
    seriesConfigs.sort((a, b) => seriesOrder.indexOf(a.name) - seriesOrder.indexOf(b.name));
  }

  return seriesConfigs;
}
