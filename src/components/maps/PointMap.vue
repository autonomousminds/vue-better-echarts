<script setup lang="ts">
/**
 * PointMap component
 * Map with point markers at lat/long coordinates
 * Uses Leaflet with CartoDB tile basemap
 */

import { computed, watchEffect, ref } from 'vue';
import type { PointMapProps } from '../../types';
import LeafletBase from './LeafletBase.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<PointMapProps>(), {
  height: '500px',
  width: '100%',
  pointOpacity: 0.8,
  pointSize: 8,
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

// Process point data
const pointData = computed(() => {
  if (!props.data?.length || !props.lat || !props.long) return [];

  return props.data
    .map((row) => ({
      lat: row[props.lat] as number,
      lng: row[props.long] as number,
      value: props.value ? (row[props.value] as number) : undefined,
      name: props.name ? String(row[props.name]) : undefined,
      row
    }))
    .filter((d) => d.lat != null && d.lng != null && !isNaN(d.lat) && !isNaN(d.lng));
});

function buildTooltip(item: typeof pointData.value[number]): string {
  let html = '';
  if (item.name) {
    html += `<div class="tooltip-row"><span class="tooltip-label">${item.name}</span></div>`;
  }
  if (item.value != null && props.value) {
    html += `<div class="tooltip-row"><span class="tooltip-label">${props.value}</span> <span>${formatValue(item.value, valueFormat.value)}</span></div>`;
  }
  return html;
}

const leafletBase = ref<InstanceType<typeof LeafletBase>>();

// watchEffect auto-tracks all reactive dependencies:
// - leafletBase.value (template ref — set when child mounts)
// - leaflet.mapReady.value (becomes true after Leaflet initializes)
// - pointData.value (changes when data/columns change)
// - pointColorResolved.value, props.pointSize, etc.
watchEffect(() => {
  const base = leafletBase.value;
  if (!base?.leaflet) return;

  const { mapReady, clearMarkers, addCircleMarker, fitBoundsToMarkers } = base.leaflet;

  // Wait until map is initialized
  if (!mapReady.value) return;

  // Access reactive data (creates dependency)
  const data = pointData.value;
  const color = pointColorResolved.value as string;
  const size = props.pointSize;
  const opacity = props.pointOpacity;
  const border = props.borderColor!;
  const borderW = props.borderWidth!;
  const ttType = props.tooltipType;

  clearMarkers();

  for (const item of data) {
    addCircleMarker({
      lat: item.lat,
      lng: item.lng,
      radius: size,
      fillColor: color,
      fillOpacity: opacity,
      color: border,
      weight: borderW,
      opacity: 1,
      tooltipContent: buildTooltip(item),
      tooltipType: ttType
    });
  }

  // Auto-fit bounds unless user set explicit starting coordinates
  if (props.startingLat == null && props.startingLong == null) {
    fitBoundsToMarkers(props.startingZoom);
  }
});
</script>

<template>
  <LeafletBase
    ref="leafletBase"
    :title="props.title"
    :title-icon="props.titleIcon"
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
