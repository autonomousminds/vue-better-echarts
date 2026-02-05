<script setup lang="ts">
/**
 * Histogram component
 * Displays frequency distribution of data
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { HistogramProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<HistogramProps>(), {
  fillOpacity: 0.8,
  outlineWidth: 1,
  bins: 10,
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
} = useChartConfig(props, { chartType: 'Histogram' });

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

// Calculate histogram bins
const histogramData = computed(() => {
  if (!props.x || !processedData.value.length) {
    return { bins: [], counts: [] };
  }

  // Get numeric values
  const values = processedData.value
    .map((d) => d[props.x!] as number)
    .filter((v) => v != null && !isNaN(v))
    .sort((a, b) => a - b);

  if (values.length === 0) {
    return { bins: [], counts: [] };
  }

  const min = values[0];
  const max = values[values.length - 1];
  const range = max - min;
  const binWidth = range / props.bins!;

  // Create bins
  const bins: { start: number; end: number; label: string }[] = [];
  const counts: number[] = [];

  for (let i = 0; i < props.bins!; i++) {
    const binStart = min + i * binWidth;
    const binEnd = min + (i + 1) * binWidth;
    bins.push({
      start: binStart,
      end: binEnd,
      label: `${formatValue(binStart, formats.value.x, unitSummaries.value.x)} - ${formatValue(binEnd, formats.value.x, unitSummaries.value.x)}`
    });

    // Count values in this bin
    const count = values.filter((v) => {
      if (i === props.bins! - 1) {
        // Last bin includes the max value
        return v >= binStart && v <= binEnd;
      }
      return v >= binStart && v < binEnd;
    }).length;

    counts.push(count);
  }

  return { bins, counts };
});

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };
  const { bins, counts } = histogramData.value;

  // Update x-axis
  const xAxisBase = config.xAxis as Record<string, unknown> | undefined;
  config.xAxis = {
    ...xAxisBase,
    type: 'category' as const,
    data: bins.map((b) => b.label),
    axisLabel: {
      ...(xAxisBase?.axisLabel as Record<string, unknown> | undefined),
      rotate: 45,
      interval: 0
    }
  };

  // Update y-axis for counts
  config.yAxis = {
    ...config.yAxis,
    type: 'value',
    name: 'Count'
  };

  // Update series
  config.series = [
    {
      name: 'Frequency',
      type: 'bar' as const,
      data: counts,
      barWidth: '90%',
      itemStyle: {
        color: (fillColorResolved.value || colorPaletteResolved.value?.[0]) as string | undefined,
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
    trigger: 'axis' as const,
    axisPointer: { type: 'shadow' as const },
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number }[];
      const param = p[0];
      return `<span style='font-weight: 600;'>${param.name}</span><br/>Count: <span style='float:right; margin-left: 10px;'>${param.value}</span>`;
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
