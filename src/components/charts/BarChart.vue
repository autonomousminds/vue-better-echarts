<script setup lang="ts">
/**
 * BarChart component
 * Supports stacked, grouped, and stacked100 layouts
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { BarChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<BarChartProps>(), {
  type: 'stacked',
  fillOpacity: 1,
  outlineWidth: 0,
  swapXY: false,
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

const { activeAppearance, resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();

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
  swapXY: () => props.swapXY,
  chartType: 'bar'
});

// Process chart configuration
const {
  processedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, {
  chartType: 'Bar Chart',
  stacked100: props.type === 'stacked100'
});

// Resolve colors
const fillColorResolved = computed(() =>
  props.fillColor ? resolveColor(props.fillColor).value : undefined
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const labelColorResolved = computed(() =>
  props.labelColor ? resolveColor(props.labelColor).value : undefined
);
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);
const seriesColorsResolved = computed(() =>
  props.seriesColors ? resolveColorsObject(props.seriesColors).value : undefined
);

// Build bar series configuration
const barSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  const isStacked = props.type === 'stacked' || props.type === 'stacked100';

  return {
    type: 'bar',
    stack: isStacked ? 'total' : undefined,
    barMaxWidth: props.swapXY ? undefined : 60,
    itemStyle: {
      color: fillColorResolved.value,
      opacity: props.fillOpacity,
      borderColor: outlineColorResolved.value,
      borderWidth: props.outlineWidth
    },
    label: props.labels ? {
      show: true,
      position: props.labelPosition || (props.swapXY ? 'right' : 'top'),
      fontSize: props.labelSize || 11,
      color: labelColorResolved.value,
      formatter: (params: { value: unknown[] }) => {
        const value = props.swapXY ? params.value[0] : params.value[1];
        if (props.labelFmt || props.yLabelFmt) {
          return formatValue(value, formats.value.y, unitSummaries.value.y);
        }
        return String(value);
      }
    } : undefined,
    emphasis: {
      focus: 'series'
    }
  };
});

// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  const baseSeriesConfig = barSeriesConfig.value;

  return getSeriesConfig(
    processedData.value,
    props.x,
    props.y,
    props.series,
    props.swapXY || false,
    baseSeriesConfig,
    columnSummary.value,
    {
      y2: props.y2,
      seriesOrder: props.seriesOrder
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

  // Handle stacked100 y-axis formatting
  if (props.type === 'stacked100') {
    const yAxis = config.yAxis as Record<string, unknown> | undefined;
    if (yAxis && !props.swapXY) {
      yAxis.max = 1;
      yAxis.axisLabel = {
        ...(yAxis.axisLabel as Record<string, unknown> | undefined),
        formatter: (value: number) => `${Math.round(value * 100)}%`
      };
    }
  }

  // Handle stack total labels
  if (props.stackTotalLabel && (props.type === 'stacked' || props.type === 'stacked100')) {
    // Add a hidden series for stack total labels
    const stackTotalSeries = {
      name: 'stackTotal',
      type: 'bar',
      stack: 'total',
      itemStyle: { color: 'transparent' },
      label: {
        show: true,
        position: props.swapXY ? 'right' : 'top',
        formatter: (params: { value: unknown[]; dataIndex: number }) => {
          // Calculate total from all series
          const seriesArray = seriesData.value;
          let total = 0;
          for (const s of seriesArray) {
            const dataPoint = s.data[params.dataIndex] as unknown[];
            total += (dataPoint[props.swapXY ? 0 : 1] as number) || 0;
          }
          return formatValue(total, formats.value.y, unitSummaries.value.y);
        }
      },
      data: seriesData.value[0]?.data.map(() => [0, 0]) || []
    };
    (config.series as unknown[]).push(stackTotalSeries);
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

  // Merge tooltip config from interactive features
  const tooltipBase = tooltipBaseConfig.value;
  if (tooltipBase && Object.keys(tooltipBase).length > 0) {
    config.tooltip = { ...(config.tooltip as Record<string, unknown>), ...tooltipBase } as EChartsOption['tooltip'];
  }

  return config;
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :height="props.height"
    :width="props.width"
    :theme="activeAppearance"
    :renderer="props.renderer"
    :connect-group="props.connectGroup"
    :series-colors="seriesColorsResolved as Record<string, string>"
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
    :show-all-x-axis-labels="props.showAllXAxisLabels"
    :swap-x-y="props.swapXY"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="processedData"
        :chart-title="props.title"
        :theme="activeAppearance"
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
