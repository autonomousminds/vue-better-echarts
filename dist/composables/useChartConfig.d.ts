import { ComputedRef } from 'vue';
import { EChartsOption } from 'echarts';
import { BaseChartProps, DataRecord, XAxisType, FormatObject, ColumnUnitSummary, SeriesConfig, ColumnSummary } from '../types';

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
export declare function getColumnSummary(data: DataRecord[]): Record<string, ColumnSummary>;
/**
 * Gets distinct values from a column
 */
export declare function getDistinctValues(data: DataRecord[], column: string): unknown[];
/**
 * Gets distinct count from a column
 */
export declare function getDistinctCount(data: DataRecord[], column: string): number;
/**
 * Sorts data by a column
 */
export declare function getSortedData(data: DataRecord[], column: string | string[], ascending?: boolean): DataRecord[];
/**
 * Main composable for chart configuration
 */
interface ChartConfigExtraOptions {
    chartType?: string;
    stacked100?: boolean;
    xType?: string;
}
export declare function useChartConfig(props: BaseChartProps, options?: ChartConfigExtraOptions): UseChartConfigReturn;
/**
 * Generates series configuration from data
 */
export declare function getSeriesConfig(data: DataRecord[], x: string, y: string | string[], series: string | undefined, swapXY: boolean, baseConfig: Partial<SeriesConfig>, columnSummary: Record<string, ColumnSummary>, options?: {
    xMismatch?: boolean;
    size?: string;
    tooltipTitle?: string;
    y2?: string | string[];
    seriesOrder?: string[];
    seriesLabelFmt?: string;
}): SeriesConfig[];
export {};
