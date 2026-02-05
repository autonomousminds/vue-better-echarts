<script setup lang="ts">
/**
 * PointMap component
 * Map with point markers at lat/long coordinates
 * Uses ECharts scatter series with geo coordinate system
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { PointMapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<PointMapProps>(), {
  height: '500px',
  width: '100%',
  pointOpacity: 0.8,
  pointSize: 8,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { activeAppearance, resolveColor } = useThemeStores();

// Resolve colors
const pointColorResolved = computed(() =>
  props.pointColor ? resolveColor(props.pointColor).value : '#3366cc'
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Process point data
const pointData = computed(() => {
  if (!props.data?.length || !props.lat || !props.long) {
    return [];
  }

  return props.data.map((row) => {
    const lat = row[props.lat] as number;
    const lng = row[props.long] as number;
    const value = props.value ? row[props.value] as number : undefined;
    const name = props.name ? String(row[props.name]) : undefined;

    return {
      name,
      value: [lng, lat, value],
      lat,
      lng
    };
  }).filter((d) => d.lat != null && d.lng != null);
});

// Calculate bounds for centering
const mapBounds = computed(() => {
  if (!pointData.value.length) {
    return { center: [0, 0], zoom: 1 };
  }

  const lats = pointData.value.map((d) => d.lat);
  const lngs = pointData.value.map((d) => d.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // Calculate zoom based on extent
  const latSpan = maxLat - minLat;
  const lngSpan = maxLng - minLng;
  const span = Math.max(latSpan, lngSpan);

  let zoom = 1;
  if (span < 1) zoom = 8;
  else if (span < 5) zoom = 6;
  else if (span < 20) zoom = 4;
  else if (span < 50) zoom = 3;
  else zoom = 2;

  return { center: [centerLng, centerLat], zoom };
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  return {
    title: {
      text: props.title,
      subtext: props.subtitle
    },
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: unknown) => {
        const p = params as { data: { name?: string; value: [number, number, number?] } };
        const { name, value } = p.data;
        let output = '';
        if (name) {
          output += `<span style='font-weight: 600;'>${name}</span><br/>`;
        }
        output += `Lat: ${value[1].toFixed(4)}<br/>`;
        output += `Long: ${value[0].toFixed(4)}`;
        if (value[2] != null) {
          output += `<br/>Value: ${formatValue(value[2], valueFormat.value)}`;
        }
        return output;
      }
    },
    geo: {
      map: 'world',
      roam: true,
      center: mapBounds.value.center,
      zoom: mapBounds.value.zoom,
      itemStyle: {
        areaColor: '#e0e0e0',
        borderColor: '#111'
      },
      emphasis: {
        disabled: true
      }
    },
    series: [
      {
        name: 'Points',
        type: 'scatter' as const,
        coordinateSystem: 'geo' as const,
        data: pointData.value,
        symbolSize: props.pointSize,
        itemStyle: {
          color: pointColorResolved.value as string | undefined,
          opacity: props.pointOpacity
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 1
          }
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
    :height="props.height"
    :width="props.width"
    :theme="activeAppearance"
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
        :theme="activeAppearance"
        :echarts-options="props.echartsOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
