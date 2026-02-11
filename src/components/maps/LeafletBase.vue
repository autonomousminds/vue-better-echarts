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
import { useExport } from '../../composables/useExport';
import type { DataRecord } from '../../types';

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
  data?: DataRecord[];
  downloadableData?: boolean;
  downloadableImage?: boolean;
  chartTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '500px',
  width: '100%',
  downloadableData: true,
  downloadableImage: false
});

const mapContainer = ref<HTMLDivElement>();
const hovering = ref(false);
const leaflet = useLeafletMap();
const { exportAsCsv, exportElementAsPng, isExporting } = useExport();

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

const handleSaveImage = async () => {
  if (!mapContainer.value) return;
  await exportElementAsPng(mapContainer.value, {
    filename: props.chartTitle || props.title || 'map'
  });
};

const handleDownloadData = () => {
  if (props.data) {
    exportAsCsv(props.data, {
      filename: props.chartTitle || props.title || 'map-data'
    });
  }
};
</script>

<template>
  <div
    class="leaflet-base-wrapper"
    :style="{ width: props.width, backgroundColor: props.backgroundColor }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
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

    <div
      v-if="downloadableData || downloadableImage"
      class="chart-footer"
      :class="{ visible: hovering }"
    >
      <button
        v-if="downloadableImage"
        class="download-button"
        :disabled="isExporting"
        @click="handleSaveImage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M20.4 14.5L16 10 4 20" />
        </svg>
        <span class="button-text">Save Image</span>
      </button>

      <button
        v-if="data && downloadableData"
        class="download-button"
        @click="handleDownloadData"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span class="button-text">Download Data</span>
      </button>
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

.chart-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 3px 12px;
  font-size: 12px;
  height: 9px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.chart-footer.visible {
  opacity: 1;
}

.chart-footer .download-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  margin-left: 8px;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 11px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.chart-footer .download-button:hover {
  opacity: 1;
}

.chart-footer .download-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.chart-footer .button-text {
  white-space: nowrap;
}

@media print {
  .chart-footer {
    display: none;
  }
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
