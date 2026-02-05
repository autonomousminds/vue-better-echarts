<script setup lang="ts">
/**
 * ChartFooter component
 * Displays download buttons for chart image and data
 */

// Vue types
import type { EChartsOption } from 'echarts';
import type { DataRecord, Appearance } from '../../types';
import { useExport } from '../../composables/useExport';

interface Props {
  config: EChartsOption;
  data?: DataRecord[];
  queryId?: string;
  chartTitle?: string;
  theme?: Appearance;
  seriesColors?: Record<string, string>;
  echartsOptions?: EChartsOption;
  seriesOptions?: Record<string, unknown>;
  downloadableData?: boolean;
  downloadableImage?: boolean;
  visible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  downloadableData: true,
  downloadableImage: true,
  visible: false,
  theme: 'light'
});

const { exportAsPng, exportAsCsv, isExporting } = useExport();

const handleSaveImage = async () => {
  await exportAsPng(
    props.config,
    {
      filename: props.chartTitle || props.queryId || 'chart',
      pixelRatio: 3,
      width: 666
    },
    props.theme,
    props.seriesColors,
    props.echartsOptions,
    props.seriesOptions
  );
};

const handleDownloadData = () => {
  if (props.data) {
    exportAsCsv(props.data, {
      filename: props.queryId || 'data'
    });
  }
};
</script>

<template>
  <div
    v-if="downloadableData || downloadableImage"
    class="chart-footer"
    :class="{ visible }"
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
</template>

<style scoped>
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

/* Use parent chaining for higher specificity to beat Tailwind preflight */
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
