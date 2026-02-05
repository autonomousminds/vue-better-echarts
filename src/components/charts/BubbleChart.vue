<script setup lang="ts">
/**
 * BubbleChart component
 * Scatter plot with size dimension
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { BubbleChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useTooltip } from '../../composables/useTooltip';
import { getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<BubbleChartProps>(), {
  pointOpacity: 0.7,
  minSize: 5,
  maxSize: 50,
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

const { activeAppearance, resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();
const { scatterFormatter } = useTooltip();

// Process chart configuration
const {
  processedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries: _unitSummaries
} = useChartConfig(props, {
  chartType: 'Bubble Chart',
  xType: props.xType || 'value'
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

// Get size format
const sizeFormat = computed(() => {
  if (props.sizeFmt) {
    return getFormatObjectFromString(props.sizeFmt);
  }
  if (props.size && columnSummary.value[props.size]) {
    return columnSummary.value[props.size].format;
  }
  return undefined;
});

// Calculate size range from data
const sizeRange = computed(() => {
  if (!props.size || !processedData.value.length) {
    return { min: 0, max: 1 };
  }

  const sizes = processedData.value
    .map((d) => d[props.size!] as number)
    .filter((v) => v != null && !isNaN(v));

  return {
    min: Math.min(...sizes),
    max: Math.max(...sizes)
  };
});

// Build bubble series configuration
const bubbleSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  return {
    type: 'scatter',
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

// Generate series with size mapping
const seriesData = computed(() => {
  if (!props.x || !props.y || !props.size) return [];

  const baseSeries = getSeriesConfig(
    processedData.value,
    props.x,
    props.y,
    props.series,
    false,
    bubbleSeriesConfig.value,
    columnSummary.value,
    {
      size: props.size,
      tooltipTitle: props.tooltipTitle
    }
  );

  // Add symbol size function to each series
  const { min: sizeMin, max: sizeMax } = sizeRange.value;
  const sizeSpan = sizeMax - sizeMin || 1;

  return baseSeries.map((series) => ({
    ...series,
    symbolSize: (data: unknown[]) => {
      const sizeValue = data[2] as number;
      if (sizeValue == null) return props.minSize;

      // Normalize to 0-1 range then scale to min-max size
      const normalized = (sizeValue - sizeMin) / sizeSpan;
      return props.minSize! + normalized * (props.maxSize! - props.minSize!);
    }
  }));
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

  // Custom tooltip for bubble
  config.tooltip = {
    ...config.tooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      return scatterFormatter(params as Parameters<typeof scatterFormatter>[0], {
        xColumn: props.x,
        yColumn: props.y,
        xFormat: formats.value.x,
        yFormat: formats.value.y,
        size: props.size,
        sizeFormat: sizeFormat.value,
        tooltipTitle: props.tooltipTitle
      });
    }
  };

  // Ensure x-axis is value type
  if (!props.xType) {
    (config.xAxis as Record<string, unknown>).type = 'value';
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
