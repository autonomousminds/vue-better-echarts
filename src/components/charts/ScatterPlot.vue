<script setup lang="ts">
/**
 * ScatterPlot component
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { ScatterPlotProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { useTooltip } from '../../composables/useTooltip';

const props = withDefaults(defineProps<ScatterPlotProps>(), {
  pointOpacity: 0.7,
  pointSize: 10,
  pointShape: 'circle',
  outlineWidth: 1,
  xBaseline: true,
  yGridlines: true,
  xAxisLabels: true,
  yAxisLabels: true,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();
const { scatterFormatter } = useTooltip();

// Interactive features - use getters for reactivity
const {
  interactiveConfig,
  tooltipBaseConfig
} = useInteractiveFeatures({
  zoom: () => props.zoom,
  toolbox: () => props.toolbox,
  brush: () => props.brush,
  animation: () => props.animation,
  tooltip: () => props.tooltip,
  swapXY: () => false,
  chartType: 'scatter'
});

// Resolve colors
const pointColorResolved = computed(() =>
  props.pointColor ? resolveColor(props.pointColor).value : undefined
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);
const seriesColorsResolved = computed(() =>
  props.seriesColors ? resolveColorsObject(props.seriesColors).value : undefined
);
const yAxisColorResolved = computed(() =>
  props.yAxisColor ? resolveColor(props.yAxisColor).value : undefined
);
const y2AxisColorResolved = computed(() =>
  props.y2AxisColor ? resolveColor(props.y2AxisColor).value : undefined
);

// Process chart configuration
const {
  processedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries: _unitSummaries
} = useChartConfig(props, {
  chartType: 'Scatter Plot',
  xType: props.xType || 'value',
  resolvedColorPalette: () => colorPaletteResolved.value,
  resolvedYAxisColor: () => yAxisColorResolved.value,
  resolvedY2AxisColor: () => y2AxisColorResolved.value
});

// Build scatter series configuration
const scatterSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  return {
    type: 'scatter',
    symbol: props.pointShape,
    symbolSize: props.pointSize,
    itemStyle: {
      color: pointColorResolved.value,
      opacity: props.pointOpacity,
      borderColor: outlineColorResolved.value,
      borderWidth: props.outlineWidth
    },
    emphasis: {
      focus: 'series',
      itemStyle: {
        borderWidth: (props.outlineWidth || 1) + 1
      }
    }
  };
});

// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  return getSeriesConfig(
    processedData.value,
    props.x,
    props.y,
    props.series,
    false,
    scatterSeriesConfig.value,
    columnSummary.value,
    {
      tooltipTitle: props.tooltipTitle
    }
  );
});

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };

  // Update series
  config.series = seriesData.value as EChartsOption['series'];

  // Update color palette
  if (colorPaletteResolved.value) {
    config.color = colorPaletteResolved.value;
  }

  // Custom tooltip for scatter
  config.tooltip = {
    ...config.tooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      return scatterFormatter(params as Parameters<typeof scatterFormatter>[0], {
        xColumn: props.x,
        yColumn: props.y,
        xFormat: formats.value.x,
        yFormat: formats.value.y,
        tooltipTitle: props.tooltipTitle
      });
    }
  };

  // Ensure x-axis is value type for scatter
  if (!props.xType) {
    (config.xAxis as Record<string, unknown>).type = 'value';
  }

  // Merge interactive features
  const interactive = interactiveConfig.value;
  if (interactive.dataZoom) {
    config.dataZoom = interactive.dataZoom;
  }
  if (interactive.toolbox) {
    config.toolbox = interactive.toolbox;
  }
  if (interactive.brush) {
    config.brush = interactive.brush;
  }
  // Merge animation settings
  if (interactive.animation !== undefined) {
    config.animation = interactive.animation;
  }
  if (interactive.animationDuration !== undefined) {
    config.animationDuration = interactive.animationDuration;
  }
  if (interactive.animationDurationUpdate !== undefined) {
    config.animationDurationUpdate = interactive.animationDurationUpdate;
  }
  if (interactive.animationEasing !== undefined) {
    config.animationEasing = interactive.animationEasing;
  }
  if (interactive.animationDelay !== undefined) {
    config.animationDelay = interactive.animationDelay;
  }
  if (interactive.animationThreshold !== undefined) {
    config.animationThreshold = interactive.animationThreshold;
  }

  // Merge tooltip config from interactive features (but preserve custom formatter)
  const tooltipBase = tooltipBaseConfig.value;
  if (tooltipBase && Object.keys(tooltipBase).length > 0) {
    const { show, confine, enterable, axisPointer, backgroundColor, borderColor, textStyle } = tooltipBase as Record<string, unknown>;
    if (show !== undefined) (config.tooltip as Record<string, unknown>).show = show;
    if (confine !== undefined) (config.tooltip as Record<string, unknown>).confine = confine;
    if (enterable !== undefined) (config.tooltip as Record<string, unknown>).enterable = enterable;
    if (axisPointer !== undefined) (config.tooltip as Record<string, unknown>).axisPointer = axisPointer;
    if (backgroundColor !== undefined) (config.tooltip as Record<string, unknown>).backgroundColor = backgroundColor;
    if (borderColor !== undefined) (config.tooltip as Record<string, unknown>).borderColor = borderColor;
    if (textStyle !== undefined) (config.tooltip as Record<string, unknown>).textStyle = textStyle;
  }

  return config;
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :title="props.title"
    :title-icon="props.titleIcon"
    :subtitle="props.subtitle"
    :height="props.height"
    :width="props.width"
    :renderer="props.renderer"
    :connect-group="props.connectGroup"
    :series-colors="seriesColorsResolved as Record<string, string>"
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
    :background-color="props.backgroundColor"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="processedData"
        :chart-title="props.title"
        :series-colors="seriesColorsResolved as Record<string, string>"
        :echarts-options="props.echartsOptions"
        :series-options="props.seriesOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
