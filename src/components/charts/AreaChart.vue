<script setup lang="ts">
/**
 * AreaChart component
 * Supports stacked and stacked100 layouts
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { AreaChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<AreaChartProps>(), {
  type: 'stacked',
  fillOpacity: 0.7,
  lineType: 'solid',
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

const { resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();

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
  chartType: 'area'
});

// Resolve colors
const fillColorResolved = computed(() =>
  props.fillColor ? resolveColor(props.fillColor).value : undefined
);
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
  unitSummaries
} = useChartConfig(props, {
  chartType: 'Area Chart',
  stacked100: props.type === 'stacked100',
  resolvedColorPalette: () => colorPaletteResolved.value,
  resolvedYAxisColor: () => yAxisColorResolved.value,
  resolvedY2AxisColor: () => y2AxisColorResolved.value
});

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

// Build area series configuration
const areaSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  return {
    type: 'line',
    stack: 'total',
    smooth: false,
    step: props.step ? stepMap[props.stepPosition || 'middle'] : false,
    connectNulls: props.handleMissing === 'connect',
    areaStyle: {
      color: fillColorResolved.value,
      opacity: props.fillOpacity
    },
    lineStyle: {
      color: lineColorResolved.value,
      width: props.lineWidth,
      type: lineTypeMap[props.lineType || 'solid']
    },
    itemStyle: {
      color: lineColorResolved.value || fillColorResolved.value
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
      focus: 'series'
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

  const allSeries = getSeriesConfig(
    data,
    props.x,
    props.y,
    props.series,
    false,
    areaSeriesConfig.value,
    columnSummary.value,
    {
      y2: props.y2,
      seriesOrder: props.seriesOrder
    }
  );

  // Apply y2SeriesType: change y2 series to the specified type (default: 'line')
  if (props.y2) {
    const y2Type = props.y2SeriesType || 'line';
    for (let i = 0; i < allSeries.length; i++) {
      if (allSeries[i].yAxisIndex === 1) {
        allSeries[i].type = y2Type;
        allSeries[i].stack = undefined;
        allSeries[i].areaStyle = undefined;
        if (y2Type === 'line') {
          allSeries[i].symbol = 'circle';
          allSeries[i].symbolSize = 6;
        }
      }
    }
  }

  return allSeries;
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
    const yAxisRaw = config.yAxis;
    const primaryYAxis = (Array.isArray(yAxisRaw) ? yAxisRaw[0] : yAxisRaw) as Record<string, unknown> | undefined;
    if (primaryYAxis) {
      primaryYAxis.max = 1;
      primaryYAxis.axisLabel = {
        ...(primaryYAxis.axisLabel as Record<string, unknown> | undefined),
        formatter: (value: number) => `${Math.round(value * 100)}%`
      };
    }
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
    :show-all-x-axis-labels="props.showAllXAxisLabels"
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
