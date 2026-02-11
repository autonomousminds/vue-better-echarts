<script setup lang="ts">
/**
 * LeafletBase - Container component for Leaflet maps
 * Provides the HTML element for Leaflet to mount into,
 * handles loading/error states, and renders ChartHeader.
 * Analogous to Evidence's BaseMap.svelte.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ChartHeader from '../core/ChartHeader.vue';
import { useLeafletMap, type LeafletMapOptions } from '../../composables/useLeafletMap';

interface Props {
  title?: string;
  subtitle?: string;
  height?: string;
  width?: string;
  basemap?: string;
  startingLat?: number;
  startingLong?: number;
  startingZoom?: number;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '500px',
  width: '100%'
});

const mapContainer = ref<HTMLDivElement>();
const leaflet = useLeafletMap();

defineExpose({
  leaflet
});

onMounted(async () => {
  if (!mapContainer.value) return;

  const options: LeafletMapOptions = {
    basemap: props.basemap,
    startingLat: props.startingLat,
    startingLong: props.startingLong,
    startingZoom: props.startingZoom
  };

  await leaflet.initMap(mapContainer.value, options);
});

onBeforeUnmount(() => {
  leaflet.cleanup();
});
</script>

<template>
  <div
    class="leaflet-base-wrapper"
    :style="{ width: props.width, backgroundColor: props.backgroundColor }"
  >
    <ChartHeader :title="props.title" :subtitle="props.subtitle" />

    <div v-if="leaflet.error.value" class="leaflet-error">
      {{ leaflet.error.value }}
    </div>

    <div
      ref="mapContainer"
      class="leaflet-map-container"
      :style="{ height: props.height, width: '100%' }"
    />

    <div v-if="leaflet.loading.value" class="leaflet-loading-overlay" :style="{ height: props.height }">
      Loading map...
    </div>

    <slot />
  </div>
</template>

<style scoped>
.leaflet-base-wrapper {
  position: relative;
}

.leaflet-map-container {
  border-radius: 6px;
  overflow: hidden;
  z-index: 0;
}

.leaflet-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  color: #666;
  font-size: 13px;
  border-radius: 6px;
  pointer-events: none;
}

.leaflet-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #dc2626;
  font-size: 13px;
}
</style>

<style>
/* Global Leaflet tooltip/popup overrides (ported from Evidence BaseMap.svelte) */
.leaflet-map-tooltip {
  font-family: inherit;
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.leaflet-map-tooltip .tooltip-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.leaflet-map-tooltip .tooltip-label {
  font-weight: 600;
}

.leaflet-container img.leaflet-tile {
  /* https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */
  mix-blend-mode: plus-lighter;
}

.leaflet-tooltip::before {
  display: none;
}

.leaflet-popup-tip {
  display: none;
}

.leaflet-popup-close-button {
  display: none;
}

.leaflet-popup-content-wrapper {
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  font-size: 11px;
}

.leaflet-popup-content {
  margin: 7px 9px;
}
</style>
