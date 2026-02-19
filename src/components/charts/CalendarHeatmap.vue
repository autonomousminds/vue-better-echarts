<script setup lang="ts">
/**
 * CalendarHeatmap component
 * Time-series heatmap displayed as a calendar
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { CalendarHeatmapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { standardizeDateString } from '../../utils/dateParsing';

const props = withDefaults(defineProps<CalendarHeatmapProps>(), {
  height: '200px',
  width: '100%',
  legend: true,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorScale } = useThemeStores();

// Resolve color scale
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'green').value
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Process calendar data
const calendarData = computed(() => {
  if (!props.data?.length || !props.date || !props.value) {
    return { data: [], range: ['', ''], min: 0, max: 0 };
  }

  // Parse dates and values
  const data: [string, number][] = [];
  let min = Infinity;
  let max = -Infinity;
  let minDate: Date | null = null;
  let maxDate: Date | null = null;

  for (const row of props.data) {
    const dateStr = standardizeDateString(row[props.date]);
    const date = new Date(dateStr);
    const value = row[props.value] as number;

    if (!isNaN(date.getTime()) && value != null) {
      const formattedDate = date.toISOString().split('T')[0];
      data.push([formattedDate, value]);

      min = Math.min(min, value);
      max = Math.max(max, value);

      if (!minDate || date < minDate) minDate = date;
      if (!maxDate || date > maxDate) maxDate = date;
    }
  }

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with props if provided
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  // Calculate range (year)
  let range: [string, string] = ['', ''];
  if (minDate && maxDate) {
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();

    if (minYear === maxYear) {
      range = [`${minYear}-01-01`, `${minYear}-12-31`];
    } else {
      range = [`${minYear}-01-01`, `${maxYear}-12-31`];
    }
  }

  return { data, range, min, max };
});

// Determine number of calendars needed
const calendarCount = computed(() => {
  const { range } = calendarData.value;
  if (!range[0] || !range[1]) return 1;

  const startYear = parseInt(range[0].split('-')[0]);
  const endYear = parseInt(range[1].split('-')[0]);
  return endYear - startYear + 1;
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { data, range, min, max } = calendarData.value;

  // Calculate height based on number of years
  const cellSize = 13;
  const yearHeight = cellSize * 7 + 40;

  // Create calendar for each year
  const calendars: object[] = [];
  const series: object[] = [];

  const startYear = range[0] ? parseInt(range[0].split('-')[0]) : new Date().getFullYear();
  const yearCount = calendarCount.value;

  for (let i = 0; i < yearCount; i++) {
    const year = startYear + i;
    const top = 30 + (i * yearHeight);

    calendars.push({
      top,
      left: 60,
      right: props.legend ? 100 : 30,
      cellSize: [cellSize, cellSize],
      range: `${year}`,
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: yearCount > 1, position: 'left' },
      monthLabel: { show: true },
      dayLabel: { firstDay: 0, show: true }
    });

    series.push({
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: i,
      data: data.filter((d) => d[0].startsWith(`${year}`))
    });
  }

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: unknown) => {
        const p = params as { value: [string, number] };
        const [date, value] = p.value;
        let output = `<span style='font-weight: 600;'>${date}</span><br/>`;
        output += `Value: <span style='float:right; margin-left: 10px;'>${formatValue(value, valueFormat.value)}</span>`;
        return output;
      }
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
        color: colorScaleResolved.value || ['#ebedf0', '#216e39']
      }
    },
    calendar: calendars,
    series
  };
});

// Dynamic height based on data
const dynamicHeight = computed(() => {
  if (props.height !== '200px') return props.height;

  const yearHeight = 140;
  const baseHeight = 60;
  return `${baseHeight + (calendarCount.value * yearHeight)}px`;
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :title="props.title"
    :title-icon="props.titleIcon"
    :subtitle="props.subtitle"
    :height="dynamicHeight"
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
