<script setup lang="ts">
/**
 * FunnelChart component
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { FunnelChartProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<FunnelChartProps>(), {
  height: '400px',
  width: '100%',
  legend: true,
  showPercent: true,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorPalette } = useThemeStores();

// Resolve colors
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);
const percentFormat = computed(() =>
  props.percentFmt ? getFormatObjectFromString(props.percentFmt) : { formatTag: 'pct1', formatCode: '#,##0.0%', valueType: 'number' as const }
);

// Process funnel data
const funnelData = computed(() => {
  if (!props.data?.length) return [];

  const nameCol = props.name || Object.keys(props.data[0])[0];
  const valueCol = props.value || Object.keys(props.data[0])[1];

  return props.data.map((row) => ({
    name: String(row[nameCol]),
    value: row[valueCol] as number
  }));
});

// Calculate max value for percentage calculation
const maxValue = computed(() => {
  if (!funnelData.value.length) return 0;
  return Math.max(...funnelData.value.map((d) => d.value));
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  // Calculate chart area
  const hasLegend = props.legend;
  const legendHeight = hasLegend ? 25 : 0;
  const legendTop = 7;
  const chartTop = legendTop + legendHeight + 10;

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number };
        let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
        output += `Value: <span style='float:right; margin-left: 10px;'>${formatValue(p.value, valueFormat.value)}</span>`;
        if (props.showPercent && maxValue.value > 0) {
          const percent = p.value / maxValue.value;
          output += `<br/>Percent: <span style='float:right; margin-left: 10px;'>${formatValue(percent, percentFormat.value)}</span>`;
        }
        return output;
      }
    },
    legend: {
      show: props.legend,
      type: 'scroll',
      top: legendTop,
      data: funnelData.value.map((d) => d.name)
    },
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        left: '10%',
        top: chartTop,
        bottom: 20,
        width: '80%',
        min: 0,
        max: maxValue.value || 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside' as const,
          formatter: (params: unknown) => {
            const p = params as { name: string; value: number };
            if (props.showPercent && maxValue.value > 0) {
              const percent = p.value / maxValue.value;
              return `${p.name}\n${formatValue(percent, percentFormat.value)}`;
            }
            return p.name;
          }
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 14
          }
        },
        data: funnelData.value
      }
    ],
    color: colorPaletteResolved.value
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
