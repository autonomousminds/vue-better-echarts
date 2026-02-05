<script setup lang="ts">
/**
 * BoxPlot component
 * Statistical box plot with min, max, midpoint, and confidence intervals
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { BoxPlotProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getDistinctValues } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<BoxPlotProps>(), {
  fillOpacity: 0.8,
  outlineWidth: 1.5,
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

const { activeAppearance, resolveColor, resolveColorPalette } = useThemeStores();

// Process chart configuration
const {
  processedData,
  columnSummary: _columnSummary,
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, { chartType: 'Box Plot' });

// Resolve colors
const fillColorResolved = computed(() =>
  props.fillColor ? resolveColor(props.fillColor).value : undefined
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

// Get box plot data
// Expects data with columns: x, min, max, midpoint (median), confidenceIntervalLower (Q1), confidenceIntervalUpper (Q3)
const boxPlotData = computed(() => {
  if (!props.x) return { categories: [], data: [] };

  const categories = getDistinctValues(processedData.value, props.x) as string[];

  const data = categories.map((cat) => {
    const row = processedData.value.find((d) => d[props.x!] === cat);
    if (!row) return [0, 0, 0, 0, 0];

    // BoxPlot format: [min, Q1, median, Q3, max]
    const min = (row[props.min!] as number) ?? 0;
    const q1 = (row[props.confidenceIntervalLower!] as number) ?? 0;
    const median = (row[props.midpoint!] as number) ?? 0;
    const q3 = (row[props.confidenceIntervalUpper!] as number) ?? 0;
    const max = (row[props.max!] as number) ?? 0;

    return [min, q1, median, q3, max];
  });

  return { categories, data };
});

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };
  const { categories, data } = boxPlotData.value;

  // Update x-axis for categories
  config.xAxis = {
    ...config.xAxis,
    type: 'category',
    data: categories
  };

  // Update y-axis
  config.yAxis = {
    ...config.yAxis,
    type: 'value'
  };

  // Update series
  config.series = [
    {
      name: 'boxplot',
      type: 'boxplot' as const,
      data: data,
      itemStyle: {
        color: fillColorResolved.value as string | undefined,
        opacity: props.fillOpacity,
        borderColor: outlineColorResolved.value as string | undefined,
        borderWidth: props.outlineWidth
      }
    }
  ];

  // Update color palette
  if (colorPaletteResolved.value) {
    config.color = colorPaletteResolved.value;
  }

  // Custom tooltip
  config.tooltip = {
    ...(config.tooltip as Record<string, unknown>),
    trigger: 'item' as const,
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number[] };
      const [min, q1, median, q3, max] = p.value;
      let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
      output += `Min: <span style='float:right; margin-left: 10px;'>${formatValue(min, formats.value.y, unitSummaries.value.y)}</span><br/>`;
      output += `Q1: <span style='float:right; margin-left: 10px;'>${formatValue(q1, formats.value.y, unitSummaries.value.y)}</span><br/>`;
      output += `Median: <span style='float:right; margin-left: 10px;'>${formatValue(median, formats.value.y, unitSummaries.value.y)}</span><br/>`;
      output += `Q3: <span style='float:right; margin-left: 10px;'>${formatValue(q3, formats.value.y, unitSummaries.value.y)}</span><br/>`;
      output += `Max: <span style='float:right; margin-left: 10px;'>${formatValue(max, formats.value.y, unitSummaries.value.y)}</span>`;
      return output;
    }
  };

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
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
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
        :echarts-options="props.echartsOptions"
        :series-options="props.seriesOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
