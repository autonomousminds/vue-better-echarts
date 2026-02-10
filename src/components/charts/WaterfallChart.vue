<script setup lang="ts">
/**
 * WaterfallChart component
 * Visualizes cumulative effects of sequential positive and negative values
 * Uses stacked bar series with a transparent "assist" series for positioning
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { WaterfallChartProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<WaterfallChartProps>(), {
  sort: false,
  fillOpacity: 1,
  outlineWidth: 0,
  totalLabel: 'Total',
  connectorLines: true,
  connectorLineType: 'dashed',
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

const { activeAppearance, resolveColor, resolveColorsObject } = useThemeStores();

// Interactive features
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
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, {
  chartType: 'Waterfall Chart'
});

// Resolve colors
const positiveColorResolved = computed(() =>
  props.positiveColor ? resolveColor(props.positiveColor).value : '#4CAF50'
);
const negativeColorResolved = computed(() =>
  props.negativeColor ? resolveColor(props.negativeColor).value : '#F44336'
);
const totalColorResolved = computed(() =>
  props.totalColor ? resolveColor(props.totalColor).value : '#2196F3'
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const labelColorResolved = computed(() =>
  props.labelColor ? resolveColor(props.labelColor).value : undefined
);
const connectorLineColorResolved = computed(() =>
  props.connectorLineColor ? resolveColor(props.connectorLineColor).value : '#999'
);
const seriesColorsResolved = computed(() =>
  props.seriesColors ? resolveColorsObject(props.seriesColors).value : undefined
);

// Waterfall data transformation
const waterfallData = computed(() => {
  if (!props.x || !props.y) return { categories: [], assist: [], positive: [], negative: [], total: [], rawValues: [] };

  const data = processedData.value;
  const xCol = props.x;
  const yCol = Array.isArray(props.y) ? props.y[0] : props.y;
  const totalCol = props.totalColumn;

  const categories: string[] = [];
  const assistValues: number[] = [];   // Transparent base
  const positiveValues: number[] = [];  // Positive bars
  const negativeValues: number[] = [];  // Negative bars
  const totalValues: number[] = [];     // Total bars
  const rawValues: number[] = [];       // Original values for tooltips

  let runningTotal = 0;

  for (const row of data) {
    const category = String(row[xCol] ?? '');
    const value = Number(row[yCol] ?? 0);
    const isTotal = props.waterfallType === 'bridge' && totalCol ? Boolean(row[totalCol]) : false;

    categories.push(category);

    if (isTotal) {
      // Bridge mode: use actual data value, reset running total
      runningTotal = value;
      assistValues.push(0);
      positiveValues.push(0);
      negativeValues.push(0);
      totalValues.push(runningTotal);
      rawValues.push(runningTotal);
    } else {
      runningTotal += value;

      if (value >= 0) {
        // Positive bar: assist = previous running total, bar = value
        assistValues.push(runningTotal - value);
        positiveValues.push(value);
        negativeValues.push(0);
        totalValues.push(0);
        rawValues.push(value);
      } else {
        // Negative bar: assist = new running total, bar = abs(value)
        assistValues.push(runningTotal);
        positiveValues.push(0);
        negativeValues.push(Math.abs(value));
        totalValues.push(0);
        rawValues.push(value);
      }
    }
  }

  // Auto-add total bar at the end (defaults: true for accumulative, false for bridge)
  const shouldShowTotal = props.showTotal ?? props.waterfallType !== 'bridge';
  if (shouldShowTotal) {
    categories.push(props.totalLabel || 'Total');
    assistValues.push(0);
    positiveValues.push(0);
    negativeValues.push(0);
    totalValues.push(runningTotal);
    rawValues.push(runningTotal);
  }

  return { categories, assist: assistValues, positive: positiveValues, negative: negativeValues, total: totalValues, rawValues };
});

// Label formatter
const labelFormatter = computed(() => {
  if (!props.labels) return undefined;
  return {
    show: true,
    position: (props.labelPosition || 'top') as string,
    fontSize: props.labelSize || 11,
    color: labelColorResolved.value,
    formatter: (params: { value: number }) => {
      const value = params.value;
      if (value === 0) return '';
      if (props.labelFmt || props.yLabelFmt) {
        return formatValue(value, formats.value.y, unitSummaries.value.y);
      }
      return String(value);
    }
  };
});

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };
  const wf = waterfallData.value;

  // Override x-axis to use our computed categories
  config.xAxis = {
    ...(config.xAxis as Record<string, unknown>),
    type: 'category',
    data: wf.categories
  };

  const barStyle = {
    opacity: props.fillOpacity,
    borderColor: outlineColorResolved.value as string | undefined,
    borderWidth: props.outlineWidth
  };

  // Build series as plain objects, then cast
  const assistSeries: Record<string, unknown> = {
    name: 'Assist',
    type: 'bar',
    stack: 'waterfall',
    itemStyle: {
      color: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0
    },
    emphasis: {
      itemStyle: {
        color: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0
      }
    },
    data: wf.assist,
    tooltip: { show: false }
  };

  const positiveSeries: Record<string, unknown> = {
    name: 'Increase',
    type: 'bar',
    stack: 'waterfall',
    itemStyle: {
      color: positiveColorResolved.value,
      ...barStyle
    },
    label: labelFormatter.value,
    data: wf.positive
  };

  const negativeSeries: Record<string, unknown> = {
    name: 'Decrease',
    type: 'bar',
    stack: 'waterfall',
    itemStyle: {
      color: negativeColorResolved.value,
      ...barStyle
    },
    label: labelFormatter.value ? {
      ...labelFormatter.value,
      formatter: (params: { value: number }) => {
        const value = params.value;
        if (value === 0) return '';
        const displayValue = -value;
        if (props.labelFmt || props.yLabelFmt) {
          return formatValue(displayValue, formats.value.y, unitSummaries.value.y);
        }
        return String(displayValue);
      }
    } : undefined,
    data: wf.negative
  };

  const totalSeries: Record<string, unknown> = {
    name: 'Total',
    type: 'bar',
    stack: 'waterfall',
    itemStyle: {
      color: totalColorResolved.value,
      ...barStyle
    },
    label: labelFormatter.value,
    data: wf.total
  };

  // Connector lines between bars using markLine on the positive series
  if (props.connectorLines) {
    const markLineData: Array<Array<{ xAxis: number; yAxis: number }>> = [];
    const totalCount = wf.categories.length;

    for (let i = 0; i < totalCount - 1; i++) {
      // Top of current bar = assist + positive + negative + total
      const currentTop = wf.assist[i] + wf.positive[i] + wf.negative[i] + wf.total[i];
      markLineData.push([
        { xAxis: i, yAxis: currentTop },
        { xAxis: i + 1, yAxis: currentTop }
      ]);
    }

    positiveSeries.markLine = {
      symbol: 'none',
      lineStyle: {
        color: connectorLineColorResolved.value,
        type: props.connectorLineType,
        width: 1
      },
      label: { show: false },
      data: markLineData,
      animation: false
    };
  }

  config.series = [assistSeries, positiveSeries, negativeSeries, totalSeries] as EChartsOption['series'];

  // Hide the Assist series from legend
  config.legend = {
    ...(config.legend as Record<string, unknown>),
    data: ['Increase', 'Decrease', 'Total']
  };

  // Custom tooltip to show actual values
  config.tooltip = {
    ...(config.tooltip as Record<string, unknown>),
    trigger: 'axis',
    formatter: (params: unknown) => {
      const paramArray = params as Array<{
        axisValue: string;
        seriesName: string;
        value: number;
        color: string;
        dataIndex: number;
      }>;
      if (!paramArray || paramArray.length === 0) return '';

      const dataIndex = paramArray[0].dataIndex;
      const category = wf.categories[dataIndex];
      const rawValue = wf.rawValues[dataIndex];

      const formattedValue = (props.yFmt || props.labelFmt)
        ? formatValue(rawValue, formats.value.y, unitSummaries.value.y)
        : String(rawValue);

      // Determine bar type for color
      const isTotal = wf.total[dataIndex] !== 0;
      const isPositive = wf.positive[dataIndex] !== 0;
      const color = isTotal
        ? totalColorResolved.value
        : isPositive
          ? positiveColorResolved.value
          : negativeColorResolved.value;

      return `<div style="font-size:14px;font-weight:500;margin-bottom:4px">${category}</div>`
        + `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:6px"></span>`
        + `${formattedValue}`;
    }
  };

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
    :subtitle="props.subtitle"
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
