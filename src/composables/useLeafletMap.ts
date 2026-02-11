/**
 * Composable for managing Leaflet map lifecycle
 * Ported from Evidence's EvidenceMap.js, adapted as a Vue 3 composable
 */
import { ref, type Ref } from 'vue';
import { initSmoothZoom } from './leafletSmoothZoom';

type LeafletModule = typeof import('leaflet');

// Module-level cache: load Leaflet once globally
let leafletModule: LeafletModule | undefined;
let leafletPromise: Promise<LeafletModule> | undefined;

const DEFAULT_BASEMAP = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const DEFAULT_LAT = 39.077;
const DEFAULT_LONG = -180;
const DEFAULT_ZOOM = 2;
const FIT_MAX_ZOOM = 12;

async function loadLeaflet(): Promise<LeafletModule> {
  if (leafletModule) return leafletModule;
  if (leafletPromise) return leafletPromise;
  leafletPromise = import('leaflet').then((m) => {
    const L = m.default;
    initSmoothZoom(L);
    leafletModule = L;
    return L;
  });
  return leafletPromise;
}

function processBasemapUrl(url: string): string {
  const pixelRatio = window.devicePixelRatio || 1;
  let processed = url;
  if (processed.includes('{r}')) {
    processed = processed.replace('{r}', pixelRatio > 1 ? '@2x' : '');
  }
  if (processed.includes('{ext}')) {
    processed = processed.replace('{ext}', 'png');
  }
  return processed;
}

export interface LeafletMapOptions {
  basemap?: string;
  startingLat?: number;
  startingLong?: number;
  startingZoom?: number;
  maxZoom?: number;
}

export interface CircleMarkerOptions {
  lat: number;
  lng: number;
  radius: number;
  fillColor: string;
  fillOpacity: number;
  color: string;
  weight: number;
  opacity: number;
  tooltipContent?: string;
  tooltipType?: 'hover' | 'click';
}

export function useLeafletMap() {
  const loading = ref(true);
  const mapReady = ref(false);
  const error: Ref<string | undefined> = ref(undefined);

  let map: import('leaflet').Map | undefined;
  let L: LeafletModule | undefined;
  const markers: import('leaflet').CircleMarker[] = [];

  async function initMap(
    el: HTMLElement,
    options: LeafletMapOptions = {}
  ): Promise<void> {
    try {
      L = await loadLeaflet();

      // Import CSS (bundled by vite-plugin-css-injected-by-js)
      await import('leaflet/dist/leaflet.css');

      const lat = options.startingLat ?? DEFAULT_LAT;
      const lng = options.startingLong ?? DEFAULT_LONG;
      const zoom = options.startingZoom ?? DEFAULT_ZOOM;
      const basemap = options.basemap ?? DEFAULT_BASEMAP;

      map = L.map(el, {
        zoomControl: false,
        scrollWheelZoom: false,
        smoothWheelZoom: true,
        smoothSensitivity: 5
      } as any).setView([lat, lng], zoom);

      const processedBasemap = processBasemapUrl(basemap);
      L.tileLayer(processedBasemap, {
        subdomains: 'abcd',
        maxZoom: options.maxZoom ?? 20
      }).addTo(map);

      loading.value = false;
      mapReady.value = true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      loading.value = false;
    }
  }

  function addCircleMarker(opts: CircleMarkerOptions): import('leaflet').CircleMarker | undefined {
    if (!L || !map) return;

    const marker = L.circleMarker([opts.lat, opts.lng], {
      radius: opts.radius,
      fillColor: opts.fillColor,
      fillOpacity: opts.fillOpacity,
      color: opts.color,
      weight: opts.weight,
      opacity: opts.opacity
    }).addTo(map);

    if (opts.tooltipContent) {
      if (opts.tooltipType === 'click') {
        marker.bindPopup(opts.tooltipContent, {
          className: 'leaflet-map-tooltip'
        });
      } else {
        marker.bindTooltip(opts.tooltipContent, {
          className: 'leaflet-map-tooltip',
          direction: 'top',
          offset: [0, -opts.radius]
        });
      }
    }

    markers.push(marker);
    return marker;
  }

  function clearMarkers(): void {
    for (const marker of markers) {
      marker.remove();
    }
    markers.length = 0;
  }

  function fitBoundsToMarkers(startingZoom?: number): void {
    if (!L || !map || markers.length === 0) return;

    const bounds = L.latLngBounds(markers.map((m) => m.getLatLng()));

    if (bounds.isValid()) {
      map.fitBounds(bounds, { maxZoom: FIT_MAX_ZOOM, padding: [30, 30] });
      if (startingZoom != null) {
        map.setZoom(startingZoom);
      }
    }
  }

  function cleanup(): void {
    clearMarkers();
    if (map) {
      map.remove();
      map = undefined;
    }
  }

  function getMap() {
    return map;
  }

  return {
    loading,
    mapReady,
    error,
    initMap,
    addCircleMarker,
    clearMarkers,
    fitBoundsToMarkers,
    cleanup,
    getMap
  };
}
