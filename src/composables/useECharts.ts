/**
 * Vue 3 composable for ECharts instance management
 */

import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  shallowRef,
  type Ref,
  type ShallowRef
} from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';
import debounce from 'debounce';
import type { Appearance, ChartRenderer } from '../types';
import { defaultThemeLight, defaultThemeDark } from '../themes/echartsThemes';

export interface UseEChartsOptions {
  /**
   * Theme mode
   */
  theme?: Ref<Appearance> | Appearance;

  /**
   * Renderer type
   */
  renderer?: ChartRenderer;

  /**
   * Connect group for linked interactions
   */
  connectGroup?: string;

  /**
   * Animation duration in ms
   */
  animationDuration?: number;

  /**
   * Whether to auto-resize on container changes
   */
  autoResize?: boolean;

  /**
   * Resize debounce delay in ms
   */
  resizeDebounce?: number;
}

export interface UseEChartsReturn {
  /**
   * Reference to the ECharts instance
   */
  chartInstance: ShallowRef<ECharts | null>;

  /**
   * Reference to the container element
   */
  containerRef: Ref<HTMLElement | null>;

  /**
   * Initialize the chart
   */
  init: (container?: HTMLElement) => ECharts | null;

  /**
   * Set chart options
   */
  setOption: (option: EChartsOption, notMerge?: boolean) => void;

  /**
   * Resize the chart
   */
  resize: () => void;

  /**
   * Dispose the chart
   */
  dispose: () => void;

  /**
   * Get data URL for export
   */
  getDataURL: (opts?: {
    type?: 'png' | 'jpeg' | 'svg';
    pixelRatio?: number;
    backgroundColor?: string;
    excludeComponents?: string[];
  }) => string | undefined;

  /**
   * Check if chart is disposed
   */
  isDisposed: () => boolean;
}

const ANIMATION_DURATION = 500;

// Themes registered flag
let themesRegistered = false;

/**
 * Register themes with ECharts
 */
function registerThemes(): void {
  if (themesRegistered) return;
  echarts.registerTheme('light', defaultThemeLight);
  echarts.registerTheme('dark', defaultThemeDark);
  themesRegistered = true;
}

/**
 * Check if we should use SVG renderer (iOS large canvas workaround)
 */
function shouldUseSvg(container: HTMLElement): boolean {
  const isIOS = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
    navigator.platform
  );
  // iOS breaks with canvas if the canvas is too large
  return isIOS && container.clientWidth * 3 * container.clientHeight * 3 > 16777215;
}

/**
 * Main composable for ECharts instance management
 */
export function useECharts(options: UseEChartsOptions = {}): UseEChartsReturn {
  const {
    theme = 'light',
    renderer = 'canvas',
    connectGroup,
    animationDuration = ANIMATION_DURATION,
    autoResize = true,
    resizeDebounce = 100
  } = options;

  const chartInstance: ShallowRef<ECharts | null> = shallowRef(null);
  const containerRef: Ref<HTMLElement | null> = ref(null);
  let resizeObserver: ResizeObserver | null = null;

  // Get the current theme value
  const getThemeValue = (): Appearance => {
    if (typeof theme === 'string') {
      return theme;
    }
    return theme.value;
  };

  // Register themes
  registerThemes();

  /**
   * Initialize the chart
   */
  const init = (container?: HTMLElement): ECharts | null => {
    const targetContainer = container || containerRef.value;
    if (!targetContainer) {
      console.warn('useECharts: No container element provided');
      return null;
    }

    // Dispose existing instance
    if (chartInstance.value) {
      chartInstance.value.dispose();
    }

    // Determine renderer
    const useRenderer = shouldUseSvg(targetContainer) ? 'svg' : renderer;

    // Create new instance
    const instance = echarts.init(targetContainer, getThemeValue(), {
      renderer: useRenderer
    });

    chartInstance.value = instance;

    // Set up connect group if provided
    if (connectGroup) {
      instance.group = connectGroup;
      echarts.connect(connectGroup);
    }

    return instance;
  };

  /**
   * Set chart options
   * @param option - ECharts option object
   * @param opts - Either a boolean (legacy notMerge) or SetOptionOpts object
   */
  const setOption = (option: EChartsOption, opts: boolean | { notMerge?: boolean; replaceMerge?: string[] } = false): void => {
    if (!chartInstance.value) {
      console.warn('useECharts: Chart not initialized');
      return;
    }

    // Convert legacy boolean to options object
    const setOptionOpts = typeof opts === 'boolean'
      ? { notMerge: opts }
      : {
          // Default to using replaceMerge for series to preserve toolbox state
          replaceMerge: opts.replaceMerge ?? ['series'],
          notMerge: opts.notMerge ?? false
        };

    chartInstance.value.setOption(
      {
        ...option,
        animationDuration,
        animationDurationUpdate: animationDuration
      },
      setOptionOpts
    );
  };

  /**
   * Resize the chart
   */
  const resize = (): void => {
    if (!chartInstance.value) return;

    chartInstance.value.resize({
      animation: {
        duration: animationDuration
      }
    });
  };

  /**
   * Dispose the chart
   */
  const dispose = (): void => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (chartInstance.value) {
      chartInstance.value.dispose();
      chartInstance.value = null;
    }
  };

  /**
   * Get data URL for export
   */
  const getDataURL = (opts?: {
    type?: 'png' | 'jpeg' | 'svg';
    pixelRatio?: number;
    backgroundColor?: string;
    excludeComponents?: string[];
  }): string | undefined => {
    if (!chartInstance.value) return undefined;

    return chartInstance.value.getConnectedDataURL({
      type: opts?.type || 'png',
      pixelRatio: opts?.pixelRatio || 3,
      backgroundColor: opts?.backgroundColor || '#ffffff',
      excludeComponents: opts?.excludeComponents || ['toolbox']
    });
  };

  /**
   * Check if chart is disposed
   */
  const isDisposed = (): boolean => {
    return !chartInstance.value || chartInstance.value.isDisposed();
  };

  // Debounced resize handler
  const debouncedResize = debounce(resize, resizeDebounce);

  // Set up lifecycle hooks
  onMounted(() => {
    if (autoResize && containerRef.value) {
      const parentElement = containerRef.value.parentElement;
      if (window.ResizeObserver && parentElement) {
        resizeObserver = new ResizeObserver(debouncedResize);
        resizeObserver.observe(parentElement);
      } else {
        window.addEventListener('resize', debouncedResize);
      }
    }
  });

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', debouncedResize);
    }
    dispose();
  });

  // Watch for theme changes
  if (typeof theme !== 'string') {
    watch(theme, (newTheme) => {
      if (chartInstance.value && containerRef.value) {
        // Re-initialize with new theme
        chartInstance.value.dispose();
        const instance = echarts.init(containerRef.value, newTheme, {
          renderer: shouldUseSvg(containerRef.value) ? 'svg' : renderer
        });
        chartInstance.value = instance;
      }
    });
  }

  return {
    chartInstance,
    containerRef,
    init,
    setOption,
    resize,
    dispose,
    getDataURL,
    isDisposed
  };
}

/**
 * Apply series colors override
 */
export function applySeriesColors(
  chart: ECharts,
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
 * Apply additional ECharts options
 */
export function applyEchartsOptions(
  chart: ECharts,
  echartsOptions: EChartsOption | undefined
): void {
  if (!echartsOptions) return;
  chart.setOption(echartsOptions);
}

/**
 * Apply series options to all series (except reference lines/areas/points)
 */
export function applySeriesOptions(
  chart: ECharts,
  seriesOptions: Record<string, unknown> | undefined,
  config: EChartsOption
): void {
  if (!seriesOptions) return;

  const configSeries = config.series as Array<{ seriesType?: string }> | undefined;
  if (!configSeries) return;

  // Find reference series indices
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

  // Apply options to non-reference series
  const tempSeries = configSeries.map((_, index) => {
    if (referenceIndices.includes(index)) {
      return {};
    }
    return { ...seriesOptions };
  });

  chart.setOption({ series: tempSeries });
}
