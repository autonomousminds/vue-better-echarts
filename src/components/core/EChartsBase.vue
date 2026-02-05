<script setup lang="ts">
/**
 * Base ECharts wrapper component
 * Handles chart initialization, resize, and theme switching
 */

import { ref, watch, onMounted, onUnmounted, shallowRef } from 'vue';
import type { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts';
import debounce from 'debounce';
import type { Appearance, ChartRenderer } from '../../types';
import { defaultThemeLight, defaultThemeDark } from '../../themes/echartsThemes';
import { applySeriesColors, applyEchartsOptions, applySeriesOptions } from '../../composables/useECharts';

const ANIMATION_DURATION = 500;

// Register themes once
let themesRegistered = false;
function registerThemes(): void {
  if (themesRegistered) return;
  echarts.registerTheme('light', defaultThemeLight);
  echarts.registerTheme('dark', defaultThemeDark);
  themesRegistered = true;
}

interface Props {
  config: EChartsOption;
  height?: string;
  width?: string;
  theme?: Appearance;
  renderer?: ChartRenderer;
  connectGroup?: string;
  seriesColors?: Record<string, string>;
  echartsOptions?: EChartsOption;
  seriesOptions?: Record<string, unknown>;
  showAllXAxisLabels?: boolean;
  swapXY?: boolean;
  xAxisLabelOverflow?: 'break' | 'truncate';
}

const props = withDefaults(defineProps<Props>(), {
  height: '291px',
  width: '100%',
  theme: 'light',
  renderer: 'canvas'
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
  (e: 'init', chart: ECharts): void;
  (e: 'dispose'): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const chartInstance = shallowRef<ECharts | null>(null);
const hovering = ref(false);
const isFirstRender = ref(true);

// Check if we should use SVG (iOS large canvas workaround)
function shouldUseSvg(container: HTMLElement): boolean {
  const isIOS = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
    navigator.platform
  );
  return isIOS && container.clientWidth * 3 * container.clientHeight * 3 > 16777215;
}

// Initialize chart
function initChart(): void {
  if (!containerRef.value) return;

  registerThemes();

  // Dispose existing instance
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // Reset first render flag when creating a new chart instance
  isFirstRender.value = true;

  const useRenderer = shouldUseSvg(containerRef.value) ? 'svg' : props.renderer;
  const chart = echarts.init(containerRef.value, props.theme, {
    renderer: useRenderer
  });

  chartInstance.value = chart;

  // Set up connect group
  if (props.connectGroup) {
    chart.group = props.connectGroup;
    echarts.connect(props.connectGroup);
  }

  // Click event handler
  chart.on('click', (params) => {
    emit('click', params);
  });

  emit('init', chart);
}

// Update chart options
function updateChart(): void {
  if (!chartInstance.value) return;

  const config = { ...props.config };

  // Debug logging
  console.log('[EChartsBase] updateChart called:', {
    xAxis: config.xAxis,
    xAxisName: (config.xAxis as Record<string, unknown>)?.name,
    legend: config.legend,
    legendShow: (config.legend as Record<string, unknown>)?.show,
    isFirstRender: isFirstRender.value
  });

  // Ensure series is a valid array with properly typed entries
  // Filter out null/undefined entries AND entries without a valid 'type' property
  if (Array.isArray(config.series)) {
    config.series = config.series.filter((s): s is NonNullable<typeof s> => {
      if (s == null) return false;
      if (typeof s !== 'object') return false;
      // ECharts requires each series to have a 'type' property
      if (!('type' in s) || s.type == null) return false;
      return true;
    });
  } else {
    config.series = [];
  }

  // Skip update if no valid series data yet
  if (config.series.length === 0) {
    return;
  }

  // For first render, use notMerge to ensure clean initial state
  // For subsequent updates, use notMerge: false to preserve toolbox internal
  // state (required for restore/dataZoom to work)
  const setOptionOpts = { notMerge: isFirstRender.value };

  chartInstance.value.setOption(
    {
      ...config,
      animationDuration: ANIMATION_DURATION,
      animationDurationUpdate: ANIMATION_DURATION
    },
    setOptionOpts
  );

  isFirstRender.value = false;

  if (props.seriesColors) {
    applySeriesColors(chartInstance.value, props.seriesColors);
  }

  if (props.echartsOptions) {
    applyEchartsOptions(chartInstance.value, props.echartsOptions);
  }

  if (props.seriesOptions) {
    applySeriesOptions(chartInstance.value, props.seriesOptions, props.config);
  }

  updateLabelWidths();
}

// Update label widths for category axes
function updateLabelWidths(): void {
  if (!chartInstance.value || !props.showAllXAxisLabels || props.swapXY) return;

  const prevOption = chartInstance.value.getOption() as EChartsOption;
  if (!prevOption || !prevOption.series) return;

  const series = prevOption.series as Array<{ data?: Array<[unknown, unknown]> }>;
  const distinctXValues = new Set(
    series.flatMap((s) => s.data?.map((d) => d[0]) || [])
  );

  const modConst = 4 / 5;
  const clientWidth = containerRef.value?.clientWidth ?? 0;

  chartInstance.value.setOption({
    xAxis: {
      axisLabel: {
        interval: 0,
        overflow: props.xAxisLabelOverflow || 'truncate',
        width: (clientWidth * modConst) / distinctXValues.size
      }
    }
  });
}

// Resize handler
const resize = debounce(() => {
  if (!chartInstance.value) return;

  chartInstance.value.resize({
    animation: {
      duration: ANIMATION_DURATION
    }
  });

  updateLabelWidths();
}, 100);

// ResizeObserver
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  initChart();
  updateChart();

  // Set up resize observer
  const parentElement = containerRef.value?.parentElement;
  if (window.ResizeObserver && parentElement) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parentElement);
  } else {
    window.addEventListener('resize', resize);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  } else {
    window.removeEventListener('resize', resize);
  }

  if (chartInstance.value) {
    chartInstance.value.dispose();
    emit('dispose');
  }
});

// Watch for config changes
watch(
  () => props.config,
  () => {
    updateChart();
  },
  { deep: true }
);

// Watch for theme changes
watch(
  () => props.theme,
  () => {
    initChart();
    updateChart();
  }
);

// Expose chart instance
defineExpose({
  getChart: () => chartInstance.value,
  resize,
  updateChart
});
</script>

<template>
  <div
    class="echarts-base-container"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      ref="containerRef"
      class="echarts-base"
      :style="{
        height: props.height,
        width: props.width
      }"
    />
    <slot name="footer" :hovering="hovering" />
  </div>
</template>

<style scoped>
.echarts-base-container {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

.echarts-base {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

@media print {
  .echarts-base {
    break-inside: avoid;
    -moz-column-break-inside: avoid;
  }

  .echarts-base-container {
    padding: 0;
  }
}
</style>
