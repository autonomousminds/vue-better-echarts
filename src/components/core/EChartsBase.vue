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
import { createEChartsTheme, themeVersion } from '../../themes/echartsThemes';
import { applySeriesColors, applyEchartsOptions, applySeriesOptions } from '../../composables/useECharts';
import ChartContainer from './ChartContainer.vue';

const ANIMATION_DURATION = 500;

// Register ECharts themes from current configuration
function registerThemes(): void {
  echarts.registerTheme('light', createEChartsTheme('light'));
  echarts.registerTheme('dark', createEChartsTheme('dark'));
}

interface Props {
  config: EChartsOption;
  title?: string;
  subtitle?: string;
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
  backgroundColor?: string;
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

  // Make ECharts canvas transparent so the container background shows through
  if (props.backgroundColor) {
    config.backgroundColor = 'transparent';
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

// Watch for theme changes (light/dark toggle)
watch(
  () => props.theme,
  () => {
    initChart();
    updateChart();
  }
);

// Watch for theme configuration changes (preset applied)
watch(themeVersion, () => {
  registerThemes();
  initChart();
  updateChart();
});

// Expose chart instance
defineExpose({
  getChart: () => chartInstance.value,
  resize,
  updateChart
});
</script>

<template>
  <ChartContainer
    :title="props.title"
    :subtitle="props.subtitle"
    :backgroundColor="props.backgroundColor"
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
  </ChartContainer>
</template>

<style scoped>
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
}
</style>
