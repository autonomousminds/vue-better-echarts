<script setup lang="ts">
/**
 * PieChart component
 * Displays data as a pie or donut chart
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { PieChartProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<PieChartProps>(), {
  height: '400px',
  width: '100%',
  legend: true,
  legendPosition: 'top',
  showPercent: true,
  donut: false,
  labels: true,
  labelPosition: 'outside',
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
  props.percentFmt
    ? getFormatObjectFromString(props.percentFmt)
    : { formatTag: 'pct1', formatCode: '#,##0.0%', valueType: 'number' as const }
);

// Process pie data
const pieData = computed(() => {
  if (!props.data?.length) return [];

  const nameCol = props.name || Object.keys(props.data[0])[0];
  const valueCol = props.value || Object.keys(props.data[0])[1];

  return props.data
    .map((row) => ({
      name: String(row[nameCol]),
      value: row[valueCol] as number
    }))
    .filter((d) => d.value > 0);
});

// Compute the inner radius for donut mode
const resolvedInnerRadius = computed<string | number>(() => {
  if (props.innerRadius !== undefined) return props.innerRadius;
  if (props.donut) return '50%';
  return 0;
});

// Compute legend configuration
const legendConfig = computed(() => {
  if (!props.legend) return { show: false };

  const position = props.legendPosition || 'top';
  const config: Record<string, unknown> = {
    show: true,
    type: 'scroll',
    data: pieData.value.map((d) => d.name)
  };

  switch (position) {
    case 'top':
      config.top = 0;
      config.left = 'center';
      config.orient = 'horizontal';
      break;
    case 'bottom':
      config.bottom = 0;
      config.left = 'center';
      config.orient = 'horizontal';
      break;
    case 'left':
      config.left = 0;
      config.top = 'middle';
      config.orient = 'vertical';
      break;
    case 'right':
      config.right = 0;
      config.top = 'middle';
      config.orient = 'vertical';
      break;
  }

  return config;
});

// Compute pie chart center and radius based on legend position
const pieLayout = computed(() => {
  const hasLegend = props.legend;
  const position = props.legendPosition || 'top';

  let center: [string, string] = ['50%', '50%'];
  let outerRadius = '70%';

  if (hasLegend) {
    switch (position) {
      case 'top':
        center = ['50%', '55%'];
        outerRadius = '65%';
        break;
      case 'bottom':
        center = ['50%', '45%'];
        outerRadius = '65%';
        break;
      case 'left':
        center = ['60%', '50%'];
        outerRadius = '65%';
        break;
      case 'right':
        center = ['40%', '50%'];
        outerRadius = '65%';
        break;
    }
  }

  return { center, outerRadius };
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { center, outerRadius } = pieLayout.value;

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number; percent: number };
        let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
        output += `Value: <span style='float:right; margin-left: 10px;'>${formatValue(p.value, valueFormat.value)}</span>`;
        if (props.showPercent) {
          output += `<br/>Percent: <span style='float:right; margin-left: 10px;'>${formatValue(p.percent / 100, percentFormat.value)}</span>`;
        }
        return output;
      }
    },
    legend: legendConfig.value,
    series: [
      {
        name: 'Pie',
        type: 'pie',
        radius: [resolvedInnerRadius.value, outerRadius],
        center: center,
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: props.labels,
          position: props.labelPosition,
          formatter: (params: unknown) => {
            const p = params as { name: string; percent: number };
            if (props.showPercent) {
              return `${p.name}\n${formatValue(p.percent / 100, percentFormat.value)}`;
            }
            return p.name;
          }
        },
        labelLine: {
          show: props.labels && props.labelPosition === 'outside'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        data: pieData.value
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
