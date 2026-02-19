<script setup lang="ts">
/**
 * SankeyDiagram component
 * Flow visualization showing relationships and quantities
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { SankeyDiagramProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<SankeyDiagramProps>(), {
  height: '400px',
  width: '100%',
  orient: 'horizontal',
  nodeWidth: 20,
  nodeGap: 8,
  nodeAlign: 'justify',
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorPalette } = useThemeStores();

// Resolve colors
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Process sankey data
const sankeyData = computed(() => {
  if (!props.data?.length || !props.source || !props.target || !props.value) {
    return { nodes: [], links: [] };
  }

  // Collect unique nodes
  const nodeSet = new Set<string>();
  const links: { source: string; target: string; value: number }[] = [];

  for (const row of props.data) {
    const source = String(row[props.source]);
    const target = String(row[props.target]);
    const value = row[props.value] as number;

    nodeSet.add(source);
    nodeSet.add(target);

    links.push({ source, target, value });
  }

  // Create nodes array
  const nodes = Array.from(nodeSet).map((name) => ({ name }));

  return { nodes, links };
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { nodes, links } = sankeyData.value;

  return {
    tooltip: {
      trigger: 'item' as const,
      triggerOn: 'mousemove',
      formatter: (params: unknown) => {
        const p = params as { data: { source?: string; target?: string; value?: number; name?: string } };
        if (p.data.source && p.data.target) {
          // Link tooltip
          return `${p.data.source} → ${p.data.target}<br/>Value: ${formatValue(p.data.value, valueFormat.value)}`;
        } else {
          // Node tooltip
          return p.data.name || '';
        }
      }
    },
    series: [
      {
        type: 'sankey',
        orient: props.orient,
        nodeWidth: props.nodeWidth,
        nodeGap: props.nodeGap,
        nodeAlign: props.nodeAlign,
        layoutIterations: 32,
        left: '5%',
        right: '15%',
        top: 20,
        bottom: 20,
        data: nodes,
        links: links,
        emphasis: {
          focus: 'adjacency'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        label: {
          show: true,
          position: props.orient === 'horizontal' ? 'right' : 'top'
        }
      }
    ],
    color: colorPaletteResolved.value
  };
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :title="props.title"
    :title-icon="props.titleIcon"
    :subtitle="props.subtitle"
    :height="props.height"
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
