<script setup lang="ts">
import { computed, type Component } from 'vue';
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import {
  BarChart, LineChart, AreaChart, ScatterPlot, BubbleChart,
  BoxPlot, Histogram, FunnelChart, PieChart, Heatmap,
  CalendarHeatmap, SankeyDiagram, WaterfallChart,
  USMap, PointMap, BubbleMap,
  DataTable, Column,
  BigValue
} from 'vue-better-echarts';

const componentMap: Record<string, Component> = {
  BarChart, LineChart, AreaChart, ScatterPlot, BubbleChart,
  BoxPlot, Histogram, FunnelChart, PieChart, Heatmap,
  CalendarHeatmap, SankeyDiagram, WaterfallChart,
  USMap, PointMap, BubbleMap,
  DataTable,
  BigValue,
};

const { currentChart, assembledProps, assembledColumnConfigs, currentData } = usePlaygroundState();

const isTable = computed(() => currentChart.value.componentName === 'DataTable');

const activeColumnEntries = computed(() => {
  const configs = assembledColumnConfigs.value;
  return Object.entries(configs);
});

const chartComponent = computed(() =>
  componentMap[currentChart.value.componentName]
);
</script>

<template>
  <div class="chart-view">
    <!-- DataTable has its own rendering (no ECharts) -->
    <DataTable
      v-if="isTable && activeColumnEntries.length > 0"
      :data="(currentData as Record<string, unknown>[])"
      v-bind="assembledProps"
    >
      <Column
        v-for="[colId, colProps] in activeColumnEntries"
        :key="colId"
        v-bind="colProps"
      />
    </DataTable>
    <DataTable
      v-else-if="isTable"
      :data="(currentData as Record<string, unknown>[])"
      v-bind="assembledProps"
    />

    <component
      v-else-if="chartComponent"
      :is="chartComponent"
      :data="currentData"
      v-bind="assembledProps"
    />
    <div v-else class="chart-fallback">
      <p>Component "{{ currentChart.componentName }}" not available</p>
    </div>
  </div>
</template>

<style scoped>
.chart-view {
  padding: var(--space-4);
  min-height: 200px;
}
.chart-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}
</style>
