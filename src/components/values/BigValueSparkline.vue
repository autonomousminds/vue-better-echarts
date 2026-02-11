<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import chroma from 'chroma-js';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import type { FormatObject } from '../../types';

const props = withDefaults(defineProps<{
  data: Record<string, unknown>[];
  dateCol: string;
  valueCol: string;
  type?: 'line' | 'area' | 'bar';
  color?: string;
  yScale?: boolean;
  width?: number;
  height?: number;
  valueFmt?: string;
  dateFmt?: string;
  connectGroup?: string;
}>(), {
  type: 'line',
  yScale: false,
  width: 50,
  height: 15,
});

const chartContainer = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;

const { theme } = useThemeStores();

const valueFormatObject = computed<FormatObject | undefined>(() => {
  if (props.valueFmt) return getFormatObjectFromString(props.valueFmt);
  return undefined;
});

const dateFormatObject = computed<FormatObject | undefined>(() => {
  if (props.dateFmt) return getFormatObjectFromString(props.dateFmt);
  return undefined;
});

const seriesType = computed(() => props.type === 'area' ? 'line' : props.type);

const resolvedColor = computed(() => props.color ?? theme.value.colors['base-content-muted']);

const sparklineData = computed(() => {
  const mapped = props.data.map(d => [d[props.dateCol], d[props.valueCol]]);
  mapped.sort((a, b) => {
    const aTime = new Date(a[0] as string).getTime();
    const bTime = new Date(b[0] as string).getTime();
    return aTime - bTime;
  });
  return mapped;
});

const chartOption = computed(() => {
  const themeColors = theme.value.colors;
  const color = resolvedColor.value;
  const valFmt = valueFormatObject.value;
  const dtFmt = dateFormatObject.value;
  return {
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      position(
        point: [number, number],
        _params: unknown,
        _dom: unknown,
        _rect: unknown,
        size: { contentSize: [number, number] }
      ) {
        // Position tooltip centered above the hover point
        const x = point[0] - size.contentSize[0] / 2;
        const y = point[1] - size.contentSize[1] - 8;
        return [x, y];
      },
      formatter(params: unknown) {
        const arr = Array.isArray(params) ? params : [params];
        const p = arr[0] as Record<string, unknown> | undefined;
        if (!p) return '';
        const val = (p.value as unknown[])[1];
        return `<div style="text-align:center;background-color:${themeColors['base-100']};border-radius:2px;padding:1px 4px;font-size:10px;line-height:1.3;white-space:nowrap;">`
          + `<div>${formatValue(val, valFmt)}</div>`
          + `<div style="opacity:0.6;">${formatValue(p.axisValueLabel, dtFmt)}</div>`
          + `</div>`;
      },
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      extraCssText: 'box-shadow:none;pointer-events:none;',
      padding: 0,
      textStyle: { fontSize: 10 },
    },
    legend: { show: false },
    grid: { left: 0, right: 0, bottom: 0, top: 0, containLabel: true },
    xAxis: {
      type: 'time',
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: { color: themeColors['base-300'], width: 0.75 },
      },
      axisLabel: { show: false, hideOverlap: true, showMaxLabel: false, margin: 6 },
      scale: true,
      z: 2,
      boundaryGap: ['2%', '2%'] as unknown as boolean,
      axisPointer: {
        show: true,
        snap: true,
        type: 'line',
        z: 0,
        lineStyle: { width: 0.5 },
        handle: { show: false },
        label: { show: false },
      },
    },
    yAxis: [{
      type: 'value',
      splitLine: { show: false },
      axisLine: { show: false, onZero: false },
      axisTick: { show: false },
      axisLabel: { show: false, hideOverlap: true, margin: 4 },
      name: '',
      nameLocation: 'end',
      nameTextStyle: { align: 'left', verticalAlign: 'top', padding: [0, 5, 0, 0] },
      nameGap: 6,
      scale: props.yScale,
      boundaryGap: ['1%', '1%'] as unknown as boolean,
      z: 2,
    }],
    series: [{
      type: seriesType.value,
      triggerLineEvent: true,
      label: { show: false, position: 'top', padding: 0, fontSize: 9 },
      labelLayout: { hideOverlap: true },
      connectNulls: false,
      emphasis: { disabled: true },
      lineStyle: {
        width: 1,
        type: 'solid',
        color: color,
      },
      areaStyle: {
        color: props.type === 'area'
          ? (props.color ? chroma(props.color).brighten(1.5).hex() : themeColors['base-300'])
          : 'transparent',
      },
      itemStyle: { color: color },
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 0,
      step: false as const,
      name: 'sparkline',
      data: sparklineData.value,
      yAxisIndex: 0,
    }],
    animation: false,
  };
});

function initChart() {
  if (chartContainer.value && !chartInstance) {
    chartInstance = echarts.init(chartContainer.value, undefined, {
      renderer: 'svg',
      width: props.width,
      height: props.height,
    });
    chartInstance.setOption(chartOption.value);
    if (props.connectGroup) {
      chartInstance.group = props.connectGroup;
      echarts.connect(props.connectGroup);
    }
  }
}

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});

watch(chartOption, (newOption) => {
  if (chartInstance) {
    chartInstance.setOption(newOption, true);
  }
});
</script>

<template>
  <div
    ref="chartContainer"
    class="big-value-sparkline"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>

<style scoped>
.big-value-sparkline {
  display: inline-block;
  vertical-align: baseline;
  overflow: visible;
}
</style>
