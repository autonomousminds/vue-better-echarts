/**
 * Vue 3 composable for chart export functionality
 *
 */

import { ref, type Ref } from 'vue';
import download from 'downloadjs';
import { mkConfig, generateCsv, download as downloadCsv } from 'export-to-csv';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import type { DataRecord, Appearance } from '../types';
import { defaultThemeLight, defaultThemeDark } from '../themes/echartsThemes';

export interface ExportImageOptions {
  /**
   * Image format
   */
  type?: 'png' | 'jpeg';

  /**
   * Pixel ratio for higher resolution
   */
  pixelRatio?: number;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Width of exported image
   */
  width?: number;

  /**
   * Filename (without extension)
   */
  filename?: string;

  /**
   * Components to exclude from export
   */
  excludeComponents?: string[];
}

export interface ExportCsvOptions {
  /**
   * Filename (without extension)
   */
  filename?: string;

  /**
   * Include header row
   */
  showHeaders?: boolean;

  /**
   * Use BOM for UTF-8 encoding (helps Excel recognize UTF-8)
   */
  useBom?: boolean;

  /**
   * Column separator
   */
  separator?: string;
}

export interface ExportElementOptions {
  /**
   * Filename (without extension)
   */
  filename?: string;
}

export interface UseExportReturn {
  /**
   * Whether export is in progress
   */
  isExporting: Ref<boolean>;

  /**
   * Export chart as PNG image
   */
  exportAsPng: (
    chartConfig: EChartsOption,
    options?: ExportImageOptions,
    theme?: Appearance,
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ) => Promise<void>;

  /**
   * Export chart as JPEG image
   */
  exportAsJpeg: (
    chartConfig: EChartsOption,
    options?: ExportImageOptions,
    theme?: Appearance,
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ) => Promise<void>;

  /**
   * Export data as CSV
   */
  exportAsCsv: (data: DataRecord[], options?: ExportCsvOptions) => void;

  /**
   * Export an HTML element as a PNG screenshot (for non-ECharts content like Leaflet maps)
   */
  exportElementAsPng: (element: HTMLElement, options?: ExportElementOptions) => Promise<void>;

  /**
   * Copy chart to clipboard as image
   */
  copyToClipboard: (
    chartConfig: EChartsOption,
    theme?: Appearance,
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ) => Promise<boolean>;

  /**
   * Get data URL from chart config
   */
  getChartDataUrl: (
    chartConfig: EChartsOption,
    options?: ExportImageOptions,
    theme?: Appearance,
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ) => string | null;
}

// Register themes
let themesRegistered = false;
function registerThemes(): void {
  if (themesRegistered) return;
  echarts.registerTheme('light', defaultThemeLight);
  echarts.registerTheme('dark', defaultThemeDark);
  themesRegistered = true;
}

/**
 * Generate timestamp for filenames
 */
function getTimestamp(): string {
  const date = new Date();
  const localISOTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19)
    .replace(/:/g, '-');
  return localISOTime;
}

/**
 * Apply series colors to a chart instance
 */
function applySeriesColors(
  chart: echarts.ECharts,
  seriesColors: Record<string, string> | undefined
): void {
  if (!seriesColors) return;

  const prevOption = chart.getOption() as EChartsOption;
  if (!prevOption || !prevOption.series) return;

  const series = prevOption.series as Array<{ name?: string; itemStyle?: { color?: string } }>;
  const newSeries = series.map((s) => {
    if (s.name && seriesColors[s.name]) {
      return {
        ...s,
        itemStyle: {
          ...s.itemStyle,
          color: seriesColors[s.name]
        }
      };
    }
    return s;
  });

  chart.setOption({ series: newSeries });
}

/**
 * Apply series options to chart instance
 */
function applySeriesOptions(
  chart: echarts.ECharts,
  seriesOptions: Record<string, unknown> | undefined,
  config: EChartsOption
): void {
  if (!seriesOptions) return;

  const configSeries = config.series as Array<{ seriesType?: string }> | undefined;
  if (!configSeries) return;

  const referenceIndices = configSeries.reduce<number[]>(
    (acc, { seriesType }, index) => {
      if (
        seriesType === 'reference_line' ||
        seriesType === 'reference_area' ||
        seriesType === 'reference_point'
      ) {
        acc.push(index);
      }
      return acc;
    },
    []
  );

  const tempSeries = configSeries.map((_, index) => {
    if (referenceIndices.includes(index)) {
      return {};
    }
    return { ...seriesOptions };
  });

  chart.setOption({ series: tempSeries });
}

/**
 * Create a temporary chart instance for export
 */
function createExportChart(
  config: EChartsOption,
  width: number,
  height: number,
  theme: Appearance,
  seriesColors?: Record<string, string>,
  echartsOptions?: EChartsOption,
  seriesOptions?: Record<string, unknown>
): { chart: echarts.ECharts; container: HTMLDivElement } {
  registerThemes();

  // Create hidden container
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    width: ${width}px;
    height: ${height}px;
    visibility: hidden;
  `;
  document.body.appendChild(container);

  // Create chart instance
  const chart = echarts.init(container, theme, { renderer: 'canvas' });

  // Set options with animation disabled
  const configWithoutAnimation = {
    ...config,
    animation: false
  };
  chart.setOption(configWithoutAnimation);

  // Apply overrides
  if (echartsOptions) {
    chart.setOption(echartsOptions);
  }
  if (seriesColors) {
    applySeriesColors(chart, seriesColors);
  }
  if (seriesOptions) {
    applySeriesOptions(chart, seriesOptions, config);
  }

  return { chart, container };
}

/**
 * Main composable for export functionality
 */
export function useExport(): UseExportReturn {
  const isExporting = ref(false);

  /**
   * Get chart data URL
   */
  const getChartDataUrl = (
    chartConfig: EChartsOption,
    options: ExportImageOptions = {},
    theme: Appearance = 'light',
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ): string | null => {
    const {
      type = 'png',
      pixelRatio = 3,
      backgroundColor = theme === 'dark' ? '#1a1a2e' : '#ffffff',
      width = 666,
      excludeComponents = ['toolbox']
    } = options;

    // Determine height from config or use default
    const height = 300; // Default height

    const { chart, container } = createExportChart(
      chartConfig,
      width,
      height,
      theme,
      seriesColors,
      echartsOptions,
      seriesOptions
    );

    try {
      const dataUrl = chart.getConnectedDataURL({
        type,
        pixelRatio,
        backgroundColor,
        excludeComponents
      });

      return dataUrl;
    } finally {
      chart.dispose();
      document.body.removeChild(container);
    }
  };

  /**
   * Export chart as image
   */
  const exportAsImage = async (
    chartConfig: EChartsOption,
    options: ExportImageOptions = {},
    theme: Appearance = 'light',
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ): Promise<void> => {
    isExporting.value = true;

    try {
      const {
        type = 'png',
        filename = 'chart'
      } = options;

      const dataUrl = getChartDataUrl(
        chartConfig,
        options,
        theme,
        seriesColors,
        echartsOptions,
        seriesOptions
      );

      if (dataUrl) {
        const timestamp = getTimestamp();
        download(dataUrl, `${filename}_${timestamp}.${type}`);
      }
    } finally {
      isExporting.value = false;
    }
  };

  /**
   * Export as PNG
   */
  const exportAsPng = (
    chartConfig: EChartsOption,
    options: ExportImageOptions = {},
    theme?: Appearance,
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ): Promise<void> => {
    return exportAsImage(
      chartConfig,
      { ...options, type: 'png', pixelRatio: options.pixelRatio || 3 },
      theme || 'light',
      seriesColors,
      echartsOptions,
      seriesOptions
    );
  };

  /**
   * Export as JPEG
   */
  const exportAsJpeg = (
    chartConfig: EChartsOption,
    options: ExportImageOptions = {},
    theme?: Appearance,
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ): Promise<void> => {
    return exportAsImage(
      chartConfig,
      { ...options, type: 'jpeg', pixelRatio: options.pixelRatio || 2 },
      theme || 'light',
      seriesColors,
      echartsOptions,
      seriesOptions
    );
  };

  /**
   * Export an HTML element as a PNG screenshot (for non-ECharts content like Leaflet maps)
   */
  const exportElementAsPng = async (
    element: HTMLElement,
    options: ExportElementOptions = {}
  ): Promise<void> => {
    isExporting.value = true;

    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        cacheBust: true
      });
      const timestamp = getTimestamp();
      const filename = options.filename || 'map';
      download(dataUrl, `${filename}_${timestamp}.png`);
    } catch (error) {
      console.error('Failed to export element as PNG:', error);
    } finally {
      isExporting.value = false;
    }
  };

  /**
   * Export data as CSV
   */
  const exportAsCsv = (
    data: DataRecord[],
    options: ExportCsvOptions = {}
  ): void => {
    const {
      filename = 'data',
      showHeaders = true,
      useBom = true,
      separator = ','
    } = options;

    if (!data || data.length === 0) {
      console.warn('useExport: No data to export');
      return;
    }

    const timestamp = getTimestamp();

    const csvConfig = mkConfig({
      filename: `${filename}_${timestamp}`,
      columnHeaders: showHeaders ? Object.keys(data[0]) : [],
      useKeysAsHeaders: showHeaders,
      useBom,
      fieldSeparator: separator
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csv = generateCsv(csvConfig)(data as any);
    downloadCsv(csvConfig)(csv);
  };

  /**
   * Copy chart to clipboard
   */
  const copyToClipboard = async (
    chartConfig: EChartsOption,
    theme: Appearance = 'light',
    seriesColors?: Record<string, string>,
    echartsOptions?: EChartsOption,
    seriesOptions?: Record<string, unknown>
  ): Promise<boolean> => {
    isExporting.value = true;

    try {
      const dataUrl = getChartDataUrl(
        chartConfig,
        { type: 'png', pixelRatio: 2 },
        theme,
        seriesColors,
        echartsOptions,
        seriesOptions
      );

      if (!dataUrl) {
        return false;
      }

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Use clipboard API
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);

      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    } finally {
      isExporting.value = false;
    }
  };

  return {
    isExporting,
    exportAsPng,
    exportAsJpeg,
    exportAsCsv,
    exportElementAsPng,
    copyToClipboard,
    getChartDataUrl
  };
}
