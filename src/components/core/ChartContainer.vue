<script setup lang="ts">
/**
 * ChartContainer component
 * Shared outer wrapper for all chart-like components (EChartsBase, BigValue, etc.)
 * Provides consistent padding, border-radius, margins, title/subtitle, and print styles.
 */

import ChartHeader from './ChartHeader.vue';

withDefaults(defineProps<{
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}>(), {});
</script>

<template>
  <div
    class="chart-container"
    :style="backgroundColor ? { backgroundColor } : undefined"
  >
    <ChartHeader :title="title" :subtitle="subtitle" />
    <slot />
  </div>
</template>

<style scoped>
.chart-container {
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

@media print {
  .chart-container {
    padding: 0 !important;
  }
}
</style>
