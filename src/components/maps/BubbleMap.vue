<script setup lang="ts">
/**
 * BubbleMap component
 * Map with sized bubble markers at lat/long coordinates
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { BubbleMapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<BubbleMapProps>(), {
  height: '500px',
  width: '100%',
  pointOpacity: 0.6,
  minSize: 5,
  maxSize: 40,
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
const sizeFormat = computed(() =>
  props.sizeFmt ? getFormatObjectFromString(props.sizeFmt) : undefined
);

// Calculate size range
const sizeRange = computed(() => {
  if (!props.data?.length || !props.size) {
    return { min: 0, max: 1 };
  }

  const sizes = props.data
    .map((d) => d[props.size!] as number)
    .filter((v) => v != null && !isNaN(v));

  if (sizes.length === 0) return { min: 0, max: 1 };

  return {
    min: Math.min(...sizes),
    max: Math.max(...sizes)
  };
});

// Process bubble data
const bubbleData = computed(() => {
  if (!props.data?.length || !props.lat || !props.long || !props.size) {
    return [];
  }

  const { min: sizeMin, max: sizeMax } = sizeRange.value;
  const sizeSpan = sizeMax - sizeMin || 1;

  return props.data.map((row) => {
    const lat = row[props.lat] as number;
    const lng = row[props.long] as number;
    const size = row[props.size!] as number;
    const value = props.value ? row[props.value] as number : undefined;
    const name = props.name ? String(row[props.name]) : undefined;

    // Calculate symbol size
    const normalized = (size - sizeMin) / sizeSpan;
    const symbolSize = props.minSize! + normalized * (props.maxSize! - props.minSize!);

    return {
      name,
      value: [lng, lat, size, value],
      symbolSize,
      lat,
      lng
    };
  }).filter((d) => d.lat != null && d.lng != null);
});

// Calculate bounds for centering
const mapBounds = computed(() => {
  if (!bubbleData.value.length) {
    return { center: [0, 0], zoom: 1 };
  }

  const lats = bubbleData.value.map((d) => d.lat);
  const lngs = bubbleData.value.map((d) => d.lng);

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
        const p = params as { data: { name?: string; value: [number, number, number, number?]; symbolSize: number } };
        const { name, value } = p.data;
        let output = '';
        if (name) {
          output += `<span style='font-weight: 600;'>${name}</span><br/>`;
        }
        output += `Lat: ${value[1].toFixed(4)}<br/>`;
        output += `Long: ${value[0].toFixed(4)}<br/>`;
        output += `Size: ${formatValue(value[2], sizeFormat.value)}`;
        if (value[3] != null) {
          output += `<br/>Value: ${formatValue(value[3], valueFormat.value)}`;
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
        name: 'Bubbles',
        type: 'scatter' as const,
        coordinateSystem: 'geo' as const,
        data: bubbleData.value,
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
