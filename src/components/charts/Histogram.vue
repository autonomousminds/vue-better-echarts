<script setup lang="ts">
/**
 * Histogram component
 * Displays frequency distribution of data using echarts-stat for adaptive binning.
 * Ported from Evidence's Hist.svelte implementation.
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import ecStat from 'echarts-stat';
import type { HistogramProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getDistinctValues } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, formatAxisValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<HistogramProps>(), {
  fillOpacity: 1,
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

const { resolveColor, resolveColorPalette } = useThemeStores();

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
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

// Determine binning method based on data characteristics (matches Evidence's approach)
const binningMethod = computed(() => {
  if (!props.x || !processedData.value.length) return 'squareRoot';

  const xDistinct = getDistinctValues(processedData.value, props.x)
    .filter((v) => v != null) as number[];
  const xMax = Math.max(...xDistinct);

  if (xDistinct.length <= 1) return 'squareRoot';
  if (xMax < 10) return 'freedmanDiaconis';
  if (xMax < 40) return 'sturges';
  return 'squareRoot';
});

// Calculate histogram bins using echarts-stat
const histogramData = computed(() => {
  if (!props.x || !processedData.value.length) {
    return { data: [] };
  }

  // Extract x column values (echarts-stat expects a flat array)
  const values = processedData.value
    .map((d) => d[props.x!])
    .filter((v) => v != null && !isNaN(v as number));

  if (values.length === 0) {
    return { data: [] };
  }

  // Run echarts-stat histogram binning
  const result = ecStat.histogram(values as number[], binningMethod.value);

  // Remove empty first bin if it would cause negative values on x-axis
  if (result.data.length > 0) {
    const firstBinMin = result.data[0][2];
    const firstBinCount = result.data[0][1];
    if (firstBinMin < 0 && firstBinCount === 0) {
      result.data.shift();
    }
  }

  return result;
});

// Get the x format for tooltip formatting
const xFormat = computed(() => formats.value.x);

// Y format for histogram: since there's no y data column, formats.value.y is always undefined.
// Build it from yFmt prop directly if provided.
const yFormat = computed(() =>
  props.yFmt ? getFormatObjectFromString(props.yFmt, 'number') : undefined
);

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };
  const histData = histogramData.value;

  if (!histData.data.length) return config;

  // X-axis: continuous value axis (NOT category)
  // Preserve base config props (grid, legend, etc.) but override axis type and formatting
  const baseXAxis = config.xAxis as Record<string, unknown> | undefined;
  config.xAxis = {
    ...baseXAxis,
    type: 'value' as const,
    boundaryGap: ['1%', '1%'] as [string, string],
    scale: false,
    min: histData.data[0][2], // min of first bin
    axisLabel: {
      show: props.xAxisLabels !== false,
      hideOverlap: true,
      formatter: (value: number) => formatAxisValue(value, formats.value.x, unitSummaries.value.x)
    }
  };

  // Y-axis: frequency counts
  const baseYAxis = config.yAxis as Record<string, unknown> | undefined;
  config.yAxis = {
    ...baseYAxis,
    type: 'value' as const,
    boundaryGap: ['0%', '1%'] as [string, string],
    axisLabel: {
      show: props.yAxisLabels !== false,
      hideOverlap: true,
      formatter: (value: number) => formatAxisValue(value, yFormat.value)
    }
  };

  // Custom series type with renderItem (matches Evidence's Hist.svelte)
  const resolvedFill = fillColorResolved.value as string | undefined;
  const opacity = props.fillOpacity;
  const xFmt = xFormat.value;

  config.series = [
    {
      type: 'custom' as const,
      label: { show: true },
      renderItem: ((_params: unknown, api: unknown) => {
        const a = api as {
          value(idx: number): number;
          coord(point: number[]): number[];
          size(size: number[]): number[];
          visual(type: string): string;
        };
        const yValue = a.value(1);
        const start = a.coord([a.value(2), yValue]);
        const size = a.size([a.value(3) - a.value(2), yValue]);
        const barColor = a.visual('color');
        return {
          type: 'rect' as const,
          shape: {
            x: start[0],
            y: start[1],
            width: size[0] - 1, // 1px gap between bars
            height: size[1]
          },
          style: {
            fill: resolvedFill ?? barColor,
            opacity
          }
        };
      }) as never,
      data: histData.data as never,
      encode: {
        tooltip: [1],   // frequency count
        itemName: 4      // bin range string
      },
      tooltip: {
        formatter: ((params: unknown) => {
          const p = params as { value: number[] };
          const binMin = p.value[2];
          const binMax = p.value[3];
          const count = p.value[1];
          return `<span style='font-weight:600;'>${formatValue(binMin, xFmt)} - ${formatValue(binMax, xFmt)}</span> <span style='margin-left: 10px;'>${count}</span>`;
        }) as never
      },
      z: 3
    }
  ];

  // Update color palette
  if (colorPaletteResolved.value) {
    config.color = colorPaletteResolved.value;
  }

  // Tooltip trigger: item (not axis, since we use custom series)
  config.tooltip = {
    ...(config.tooltip as Record<string, unknown>),
    trigger: 'item' as const
  };

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
        :echarts-options="props.echartsOptions"
        :series-options="props.seriesOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
