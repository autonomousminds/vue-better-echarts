<script setup lang="ts">
/**
 * AreaMap component
 * Choropleth map with custom GeoJSON
 */

import { computed, ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import type { AreaMapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<AreaMapProps>(), {
  geoId: 'id',
  height: '500px',
  width: '100%',
  legend: true,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { activeAppearance, resolveColorScale } = useThemeStores();

// Resolve color scale
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'blue').value
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// GeoJSON loaded state
const geoJsonLoaded = ref(false);
const mapName = ref(`custom_map_${Date.now()}`);

// Load GeoJSON
const loadGeoJson = async () => {
  if (!props.geoJsonUrl) return;

  try {
    const response = await fetch(props.geoJsonUrl);
    const geoJson = await response.json();
    echarts.registerMap(mapName.value, geoJson);
    geoJsonLoaded.value = true;
  } catch (error) {
    console.error('Failed to load GeoJSON:', error);
    geoJsonLoaded.value = false;
  }
};

onMounted(() => {
  loadGeoJson();
});

watch(() => props.geoJsonUrl, () => {
  geoJsonLoaded.value = false;
  mapName.value = `custom_map_${Date.now()}`;
  loadGeoJson();
});

// Process map data
const mapData = computed(() => {
  if (!props.data?.length || !props.areaCol || !props.value) {
    return { data: [], min: 0, max: 0 };
  }

  let min = Infinity;
  let max = -Infinity;

  const data = props.data.map((row) => {
    const value = row[props.value] as number;
    if (value != null) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    return {
      name: String(row[props.areaCol]),
      value: value
    };
  });

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with props if provided
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  return { data, min, max };
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { data, min, max } = mapData.value;

  return {
    title: {
      text: props.title,
      subtext: props.subtitle
    },
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number };
        let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
        output += `Value: <span style='float:right; margin-left: 10px;'>${p.value != null ? formatValue(p.value, valueFormat.value) : '-'}</span>`;
        return output;
      }
    },
    visualMap: {
      show: props.legend,
      min,
      max,
      left: 'left',
      top: 'bottom',
      calculable: true,
      inRange: {
        color: colorScaleResolved.value || ['#e0f3db', '#0868ac']
      }
    },
    series: [
      {
        name: 'Area Map',
        type: 'map',
        map: mapName.value,
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: geoJsonLoaded.value ? data : []
      }
    ]
  };
});

const hovering = ref(false);
</script>

<template>
  <div v-if="!geoJsonLoaded" class="map-loading">
    Loading map data...
  </div>
  <EChartsBase
    v-else
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

<style scoped>
.map-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('props.height');
  color: #666;
}
</style>
