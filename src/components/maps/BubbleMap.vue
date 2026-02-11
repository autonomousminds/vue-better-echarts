<script setup lang="ts">
/**
 * BubbleMap component
 * Map with sized bubble markers at lat/long coordinates
 * Uses Leaflet with CartoDB tile basemap
 */

import { computed, watchEffect, ref } from 'vue';
import type { BubbleMapProps } from '../../types';
import LeafletBase from './LeafletBase.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<BubbleMapProps>(), {
  height: '500px',
  width: '100%',
  pointOpacity: 0.6,
  minSize: 5,
  maxSize: 40,
  borderColor: '#fff',
  borderWidth: 1,
  tooltipType: 'hover',
  downloadableData: true,
  downloadableImage: false
});

const { resolveColor } = useThemeStores();

const pointColorResolved = computed(() =>
  props.pointColor ? resolveColor(props.pointColor).value : '#3366cc'
);

const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);
const sizeFormat = computed(() =>
  props.sizeFmt ? getFormatObjectFromString(props.sizeFmt) : undefined
);

// Calculate size range for normalization
const sizeRange = computed(() => {
  if (!props.data?.length || !props.size) return { min: 0, max: 1 };

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
  if (!props.data?.length || !props.lat || !props.long || !props.size) return [];

  const { min: sizeMin, max: sizeMax } = sizeRange.value;
  const sizeSpan = sizeMax - sizeMin || 1;

  return props.data
    .map((row) => {
      const lat = row[props.lat] as number;
      const lng = row[props.long] as number;
      const size = row[props.size!] as number;
      const value = props.value ? (row[props.value] as number) : undefined;
      const name = props.name ? String(row[props.name]) : undefined;

      const normalized = (size - sizeMin) / sizeSpan;
      const radius = props.minSize! + normalized * (props.maxSize! - props.minSize!);

      return { lat, lng, size, value, name, radius, row };
    })
    .filter((d) => d.lat != null && d.lng != null && !isNaN(d.lat) && !isNaN(d.lng));
});

function buildTooltip(item: typeof bubbleData.value[number]): string {
  let html = '';
  if (item.name) {
    html += `<div class="tooltip-row"><span class="tooltip-label">${item.name}</span></div>`;
  }
  if (props.size) {
    html += `<div class="tooltip-row"><span class="tooltip-label">${props.size}</span> <span>${formatValue(item.size, sizeFormat.value)}</span></div>`;
  }
  if (item.value != null && props.value) {
    html += `<div class="tooltip-row"><span class="tooltip-label">${props.value}</span> <span>${formatValue(item.value, valueFormat.value)}</span></div>`;
  }
  return html;
}

const leafletBase = ref<InstanceType<typeof LeafletBase>>();

watchEffect(() => {
  const base = leafletBase.value;
  if (!base?.leaflet) return;

  const { mapReady, clearMarkers, addCircleMarker, fitBoundsToMarkers } = base.leaflet;

  if (!mapReady.value) return;

  const data = bubbleData.value;
  const color = pointColorResolved.value as string;
  const opacity = props.pointOpacity;
  const border = props.borderColor!;
  const borderW = props.borderWidth!;
  const ttType = props.tooltipType;

  clearMarkers();

  for (const item of data) {
    addCircleMarker({
      lat: item.lat,
      lng: item.lng,
      radius: item.radius,
      fillColor: color,
      fillOpacity: opacity,
      color: border,
      weight: borderW,
      opacity: 1,
      tooltipContent: buildTooltip(item),
      tooltipType: ttType
    });
  }

  if (props.startingLat == null && props.startingLong == null) {
    fitBoundsToMarkers(props.startingZoom);
  }
});
</script>

<template>
  <LeafletBase
    ref="leafletBase"
    :title="props.title"
    :subtitle="props.subtitle"
    :height="props.height"
    :width="props.width"
    :basemap="props.basemap"
    :starting-lat="props.startingLat"
    :starting-long="props.startingLong"
    :starting-zoom="props.startingZoom"
    :background-color="props.backgroundColor"
    :data="props.data"
    :downloadable-data="props.downloadableData"
    :downloadable-image="props.downloadableImage"
    :chart-title="props.title"
  />
</template>
