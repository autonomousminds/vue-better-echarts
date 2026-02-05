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
  ColumnSummary
} from '../types';
import { formatAxisValue, formatTitle, getFormatObjectFromString, lookupColumnFormat } from '../utils/formatting';
import { standardizeDateColumn } from '../utils/dateParsing';
import { createTooltipConfig } from './useTooltip';

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
}

export function useChartConfig(
  props: BaseChartProps,
  options: ChartConfigExtraOptions = {}
): UseChartConfigReturn {
  // Extract options (chartType and stacked100 reserved for future use)
  const { xType: overrideXType } = options;
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
    // Chart area height is computed but not currently used in grid calculation
    void (props.chartAreaHeight || 180);
    const hasTitle = !!props.title;
    const hasSubtitle = !!props.subtitle;
    const hasLegend = legend;

    const titleFontSize = 15;
    const subtitleFontSize = 13;
    const titleBoxPadding = 6 * (hasSubtitle ? 1 : 0);
    const titleBoxHeight =
      (hasTitle ? titleFontSize : 0) +
      (hasSubtitle ? subtitleFontSize : 0) +
      titleBoxPadding * Math.max(hasTitle ? 1 : 0, hasSubtitle ? 1 : 0);

    const legendHeight = hasLegend ? 15 : 0;
    const legendPaddingTop = 7 * Math.max(hasTitle ? 1 : 0, hasSubtitle ? 1 : 0);
    const legendTop = titleBoxHeight + legendPaddingTop;

    const chartAreaPaddingTop = 10;
    const chartAreaPaddingBottom = 10;
    const chartTop = legendTop + legendHeight + chartAreaPaddingTop;
    const chartBottom = chartAreaPaddingBottom;

    // Axis titles
    const xAxisTitle = props.xAxisTitle === true
      ? formatTitle(props.x || '', formats.value.x)
      : (props.xAxisTitle === false ? '' : (props.xAxisTitle || ''));

    const yAxisTitle = props.yAxisTitle === true
      ? formatTitle(Array.isArray(props.y) ? '' : (props.y || ''), formats.value.y)
      : (props.yAxisTitle === false ? '' : (props.yAxisTitle || ''));

    // Extra bottom padding needed when x-axis has a title
    const xAxisTitlePadding = xAxisTitle ? 25 : 0;

    // Debug logging
    console.log('[useChartConfig] Config:', {
      xAxisTitle,
      yAxisTitle,
      legend,
      hasLegend,
      totalSeriesCount: totalSeriesCount.value,
      swapXY,
      propsXAxisTitle: props.xAxisTitle,
      propsYAxisTitle: props.yAxisTitle
    });

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

    const yAxisConfig = swapXY
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
            formatter: (value: number) => formatAxisValue(value, formats.value.y, unitSummaries.value.y)
          },
          name: yAxisTitle,
          nameLocation: 'end' as const,
          nameTextStyle: { align: 'left' as const, verticalAlign: 'top' as const, padding: [0, 5, 0, 0] as [number, number, number, number] },
          min: props.yMin,
          max: props.yMax,
          scale: props.yScale,
          boundaryGap: ['0%', '1%'] as [string, string]
        };

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
      title: {
        text: props.title,
        subtext: props.subtitle
      },
      tooltip: tooltipConfig,
      legend: {
        show: legend,
        type: 'scroll' as const,
        top: legendTop,
        padding: [0, 0, 0, 0] as [number, number, number, number]
        // Don't set data - let ECharts auto-detect from series names
      },
      grid: {
        left: props.leftPadding || (swapXY ? '1%' : '0.8%'),
        right: props.rightPadding || (swapXY ? '4%' : '3%'),
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
  } = {}
): SeriesConfig[] {
  const {
    xMismatch = false,
    size,
    tooltipTitle,
    y2,
    seriesOrder
  } = options;

  const seriesConfigs: SeriesConfig[] = [];

  // Combine y and y2 columns with their axis indices
  const yList: Array<[string, number]> = [];
  const yArray = Array.isArray(y) ? y : (y ? [y] : []);
  const y2Array = Array.isArray(y2) ? y2 : (y2 ? [y2] : []);

  yArray.forEach((col) => yList.push([col, 0]));
  y2Array.forEach((col) => yList.push([col, 1]));

  // Generate series config
  if (series && yList.length === 1) {
    // Series column with single y column
    const distinctValues = getDistinctValues(data, series);

    for (const seriesValue of distinctValues) {
      const filteredData = data.filter((d) => d[series] === seriesValue);
      const seriesData = filteredData.map((d) => {
        const xVal = xMismatch ? String(d[x]) : d[x];
        const yVal = d[yList[0][0]];
        const point = swapXY ? [yVal, xVal] : [xVal, yVal];

        if (size) point.push(d[size]);
        if (tooltipTitle) point.push(d[tooltipTitle]);

        return point;
      });

      seriesConfigs.push({
        name: String(seriesValue ?? 'null'),
        data: seriesData,
        yAxisIndex: yList[0][1],
        ...baseConfig
      });
    }
  } else if (yList.length > 1) {
    // Multiple y columns
    for (const [yCol, yAxisIndex] of yList) {
      const seriesData = data.map((d) => {
        const xVal = xMismatch ? String(d[x]) : d[x];
        const yVal = d[yCol];
        const point = swapXY ? [yVal, xVal] : [xVal, yVal];

        if (size) point.push(d[size]);
        if (tooltipTitle) point.push(d[tooltipTitle]);

        return point;
      });

      seriesConfigs.push({
        name: columnSummary[yCol]?.title || yCol,
        data: seriesData,
        yAxisIndex,
        ...baseConfig
      });
    }
  } else if (yList.length === 1) {
    // Single y column
    const seriesData = data.map((d) => {
      const xVal = xMismatch ? String(d[x]) : d[x];
      const yVal = d[yList[0][0]];
      const point = swapXY ? [yVal, xVal] : [xVal, yVal];

      if (size) point.push(d[size]);
      if (tooltipTitle) point.push(d[tooltipTitle]);

      return point;
    });

    seriesConfigs.push({
      name: columnSummary[yList[0][0]]?.title || yList[0][0],
      data: seriesData,
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
