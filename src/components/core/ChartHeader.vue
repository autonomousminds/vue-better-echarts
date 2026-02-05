<script setup lang="ts">
/**
 * ChartHeader component
 * Renders title and subtitle as HTML outside the ECharts canvas
 * This ensures proper text wrapping and no overlap with chart elements
 */

import { computed } from 'vue';
import { useThemeStores } from '../../composables/useTheme';

interface Props {
  title?: string;
  subtitle?: string;
}

defineProps<Props>();

// Get theme colors for proper light/dark mode support
const { theme } = useThemeStores();

const titleColor = computed(() => theme.value.colors['base-heading']);
const subtitleColor = computed(() => theme.value.colors['base-content-muted']);
</script>

<template>
  <div v-if="title || subtitle" class="chart-header">
    <h4
      v-if="title"
      class="chart-title"
      :class="{ 'has-subtitle': !!subtitle }"
      :style="{ color: titleColor }"
    >
      {{ title }}
    </h4>
    <p
      v-if="subtitle"
      class="chart-subtitle"
      :style="{ color: subtitleColor }"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
.chart-header {
  margin: 0 0 4px 0;
}

.chart-title {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1;
}

.chart-title.has-subtitle {
  margin-bottom: 2px;
}

.chart-subtitle {
  font-size: 13px;
  font-weight: 400;
  margin: 0;
  line-height: 1.4;
}
</style>
