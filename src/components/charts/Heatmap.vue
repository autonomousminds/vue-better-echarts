<script setup lang="ts">
/**
 * Heatmap component
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { HeatmapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { getDistinctValues } from '../../composables/useChartConfig';

const props = withDefaults(defineProps<HeatmapProps>(), {
  height: '400px',
  width: '100%',
  legend: true,
  nullsZero: false,
  valueLabels: true,
  mobileValueLabels: false,
  zeroDisplay: '—',
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorScale } = useThemeStores();

// Resolve color scale
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'default').value
);

// Get format objects
const xFormat = computed(() =>
  props.xFmt ? getFormatObjectFromString(props.xFmt) : undefined
);
const yFormat = computed(() =>
  props.yFmt ? getFormatObjectFromString(props.yFmt) : undefined
);
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Process heatmap data
const heatmapData = computed(() => {
  if (!props.data?.length || !props.x || !props.y || !props.value) {
    return { xCategories: [], yCategories: [], data: [], min: 0, max: 0 };
  }

  const xCategories = getDistinctValues(props.data, props.x).map(String);
  const yCategories = getDistinctValues(props.data, props.y).map(String);

  // Create data array: [xIndex, yIndex, value]
  const data: [number, number, number | null][] = [];
  let min = Infinity;
  let max = -Infinity;

  for (const row of props.data) {
    const xVal = String(row[props.x]);
    const yVal = String(row[props.y]);
    const value = row[props.value] as number;

    const xIndex = xCategories.indexOf(xVal);
    const yIndex = yCategories.indexOf(yVal);

    if (xIndex !== -1 && yIndex !== -1) {
      const numValue = props.nullsZero && value == null ? 0 : value;
      data.push([xIndex, yIndex, numValue]);

      if (numValue != null) {
        min = Math.min(min, numValue);
        max = Math.max(max, numValue);
      }
    }
  }

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with props if provided
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  return { xCategories, yCategories, data, min, max };
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { xCategories, yCategories, data, min, max } = heatmapData.value;

  // Title/subtitle are now rendered as HTML via ChartHeader in EChartsBase
  // So we don't include them in the ECharts config

  return {
    tooltip: {
      trigger: 'item' as const,
      position: 'top',
      formatter: (params: unknown) => {
        const p = params as { value: [number, number, number | null] };
        const [xIdx, yIdx, value] = p.value;
        const xVal = xCategories[xIdx];
        const yVal = yCategories[yIdx];

        let output = `<span style='font-weight: 600;'>${formatValue(xVal, xFormat.value)} / ${formatValue(yVal, yFormat.value)}</span><br/>`;
        output += `Value: <span style='float:right; margin-left: 10px;'>${value != null ? formatValue(value, valueFormat.value) : '-'}</span>`;
        return output;
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '10%',
      top: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xCategories,
      splitArea: { show: true },
      axisLabel: {
        rotate: xCategories.length > 10 ? 45 : 0
      }
    },
    yAxis: {
      type: 'category',
      data: yCategories,
      splitArea: { show: true }
    },
    visualMap: {
      show: props.legend,
      min,
      max,
      calculable: true,
      orient: 'vertical',
      right: '2%',
      top: 'center',
      inRange: {
        color: colorScaleResolved.value || ['#f0f9e8', '#0868ac']
      }
    },
    series: [
      {
        name: 'Heatmap',
        type: 'heatmap',
        data: data,
        label: {
          show: props.valueLabels,
          formatter: (params: unknown) => {
            const p = params as { value: [number, number, number | null] };
            const val = p.value[2];
            if (val === 0) return props.zeroDisplay;
            return val != null ? formatValue(val, valueFormat.value) : '';
          }
        },
        labelLayout: {
          hideOverlap: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    media: [
      {
        query: { maxWidth: 400 },
        option: {
          series: [{ label: { show: props.mobileValueLabels } }]
        }
      },
      {
        query: { minWidth: 400 },
        option: {
          series: [{ label: { show: props.valueLabels } }]
        }
      }
    ]
  };
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
    :echarts-options="props.echartsOptions"
    :background-color="props.backgroundColor"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="props.data"
        :chart-title="props.title"
        :echarts-options="props.echartsOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
