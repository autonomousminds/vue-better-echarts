<script setup lang="ts">
/**
 * LineChart component
 * Supports markers, step interpolation, and missing value handling
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { LineChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<LineChartProps>(), {
  lineType: 'solid',
  lineOpacity: 1,
  lineWidth: 2,
  markers: false,
  markerShape: 'circle',
  markerSize: 8,
  handleMissing: 'gap',
  step: false,
  stepPosition: 'middle',
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
  swapXY: () => false,
  chartType: 'line'
});

// Process chart configuration
// Note: We pass props directly (not spread) to maintain Vue reactivity
const {
  processedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, { chartType: 'Line Chart' });

// Resolve colors
const lineColorResolved = computed(() =>
  props.lineColor ? resolveColor(props.lineColor).value : undefined
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

// Map line type to ECharts format
const lineTypeMap = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
} as const;

// Map step position
const stepMap = {
  start: 'start',
  middle: 'middle',
  end: 'end'
} as const;

// Build line series configuration
const lineSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  return {
    type: 'line',
    smooth: false,
    step: props.step ? stepMap[props.stepPosition || 'middle'] : false,
    connectNulls: props.handleMissing === 'connect',
    lineStyle: {
      color: lineColorResolved.value,
      width: props.lineWidth,
      opacity: props.lineOpacity,
      type: lineTypeMap[props.lineType || 'solid']
    },
    itemStyle: {
      color: lineColorResolved.value
    },
    symbol: props.markers ? props.markerShape : 'none',
    symbolSize: props.markers ? props.markerSize : 0,
    label: props.labels ? {
      show: true,
      position: props.labelPosition || 'top',
      fontSize: props.labelSize || 11,
      color: labelColorResolved.value,
      formatter: (params: { value: unknown[] }) => {
        const value = params.value[1];
        if (props.labelFmt || props.yLabelFmt) {
          return formatValue(value, formats.value.y, unitSummaries.value.y);
        }
        return String(value);
      }
    } : undefined,
    emphasis: {
      focus: 'series',
      lineStyle: {
        width: (props.lineWidth || 2) + 1
      }
    }
  };
});

// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  let data = processedData.value;

  // Handle missing values
  if (props.handleMissing === 'zero') {
    const yColumns = Array.isArray(props.y) ? props.y : [props.y];
    data = data.map((row) => {
      const newRow = { ...row };
      for (const col of yColumns) {
        if (newRow[col] == null) {
          newRow[col] = 0;
        }
      }
      return newRow;
    });
  }

  return getSeriesConfig(
    data,
    props.x,
    props.y,
    props.series,
    false,
    lineSeriesConfig.value,
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

  // Debug logging
  console.log('[LineChart] Final config:', {
    xAxis: config.xAxis,
    xAxisName: (config.xAxis as Record<string, unknown>)?.name,
    legend: config.legend,
    legendShow: (config.legend as Record<string, unknown>)?.show,
    seriesCount: Array.isArray(config.series) ? config.series.length : 0,
    seriesNames: Array.isArray(config.series) ? (config.series as Array<{ name?: unknown }>).map((s) => String(s.name || '')) : [],
    grid: config.grid
  });

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
