<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  BarChart,
  LineChart,
  AreaChart,
  ScatterPlot,
  Heatmap,
  FunnelChart,
  SankeyDiagram,
  useThemeStores
} from 'vue-better-echarts';
import type {
  ZoomConfig,
  ToolboxConfig,
  BrushConfig,
  AnimationConfig,
  TooltipConfig
} from 'vue-better-echarts';

// Initialize theme
const { activeAppearance, cycleAppearance } = useThemeStores();

// ============================================================================
// Sample Data
// ============================================================================

const salesData = ref([
  { month: 'Jan', sales: 12500, orders: 145, region: 'North' },
  { month: 'Feb', sales: 15200, orders: 178, region: 'North' },
  { month: 'Mar', sales: 18900, orders: 210, region: 'North' },
  { month: 'Apr', sales: 16400, orders: 189, region: 'North' },
  { month: 'May', sales: 21000, orders: 245, region: 'North' },
  { month: 'Jun', sales: 24500, orders: 289, region: 'North' },
  { month: 'Jan', sales: 9800, orders: 112, region: 'South' },
  { month: 'Feb', sales: 11200, orders: 134, region: 'South' },
  { month: 'Mar', sales: 14500, orders: 167, region: 'South' },
  { month: 'Apr', sales: 13200, orders: 152, region: 'South' },
  { month: 'May', sales: 17800, orders: 198, region: 'South' },
  { month: 'Jun', sales: 19200, orders: 221, region: 'South' }
]);

const timeSeriesData = ref(
  Array.from({ length: 100 }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.round(1000 + Math.random() * 500 + Math.sin(i / 10) * 200),
    trend: Math.round(1000 + i * 5 + Math.random() * 100)
  }))
);

const scatterData = ref([
  { age: 25, income: 45000, spending: 1200 },
  { age: 32, income: 65000, spending: 2100 },
  { age: 28, income: 52000, spending: 1500 },
  { age: 45, income: 95000, spending: 3200 },
  { age: 38, income: 78000, spending: 2800 },
  { age: 52, income: 120000, spending: 4500 },
  { age: 29, income: 48000, spending: 1400 },
  { age: 35, income: 72000, spending: 2400 },
  { age: 41, income: 88000, spending: 3100 },
  { age: 48, income: 105000, spending: 3800 },
  { age: 22, income: 38000, spending: 900 },
  { age: 55, income: 135000, spending: 5200 },
  { age: 33, income: 68000, spending: 2300 },
  { age: 27, income: 50000, spending: 1350 },
  { age: 44, income: 92000, spending: 3400 },
  { age: 36, income: 75000, spending: 2600 },
  { age: 50, income: 115000, spending: 4100 },
  { age: 31, income: 62000, spending: 1900 },
  { age: 39, income: 82000, spending: 2900 },
  { age: 46, income: 98000, spending: 3600 }
]);

const heatmapData = ref([
  { day: 'Mon', hour: '9am', value: 45 },
  { day: 'Mon', hour: '12pm', value: 78 },
  { day: 'Mon', hour: '3pm', value: 62 },
  { day: 'Mon', hour: '6pm', value: 35 },
  { day: 'Tue', hour: '9am', value: 52 },
  { day: 'Tue', hour: '12pm', value: 89 },
  { day: 'Tue', hour: '3pm', value: 71 },
  { day: 'Tue', hour: '6pm', value: 42 },
  { day: 'Wed', hour: '9am', value: 48 },
  { day: 'Wed', hour: '12pm', value: 95 },
  { day: 'Wed', hour: '3pm', value: 68 },
  { day: 'Wed', hour: '6pm', value: 38 },
  { day: 'Thu', hour: '9am', value: 55 },
  { day: 'Thu', hour: '12pm', value: 82 },
  { day: 'Thu', hour: '3pm', value: 74 },
  { day: 'Thu', hour: '6pm', value: 45 },
  { day: 'Fri', hour: '9am', value: 42 },
  { day: 'Fri', hour: '12pm', value: 76 },
  { day: 'Fri', hour: '3pm', value: 58 },
  { day: 'Fri', hour: '6pm', value: 28 }
]);

const funnelData = ref([
  { stage: 'Visitors', count: 10000 },
  { stage: 'Leads', count: 5200 },
  { stage: 'Qualified', count: 2800 },
  { stage: 'Proposals', count: 1400 },
  { stage: 'Closed', count: 680 }
]);

const sankeyData = ref([
  { source: 'Website', target: 'Signup', value: 500 },
  { source: 'Email', target: 'Signup', value: 300 },
  { source: 'Social', target: 'Signup', value: 200 },
  { source: 'Signup', target: 'Trial', value: 700 },
  { source: 'Signup', target: 'Purchase', value: 100 },
  { source: 'Trial', target: 'Purchase', value: 350 }
]);

// ============================================================================
// Easing options for dropdowns
// ============================================================================
const easingOptions = [
  'linear',
  'cubicIn', 'cubicOut', 'cubicInOut',
  'elasticIn', 'elasticOut', 'elasticInOut',
  'bounceIn', 'bounceOut', 'bounceInOut',
  'backIn', 'backOut', 'backInOut'
];

// ============================================================================
// LINE CHART Settings
// ============================================================================
const lineSettings = ref({
  // Zoom
  zoomEnabled: true,
  zoomType: 'both' as 'slider' | 'inside' | 'both',
  zoomAxis: 'x' as 'x' | 'y' | 'both',
  zoomStart: 0,
  zoomEnd: 100,
  // Toolbox
  toolboxEnabled: true,
  toolboxPosition: 'top-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  toolboxSaveAsImage: true,
  toolboxDataZoom: true,
  toolboxRestore: true,
  toolboxMagicType: false,
  // Animation
  animationEnabled: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut' as string,
  // Tooltip
  tooltipEnabled: true,
  tooltipTrigger: 'axis' as 'item' | 'axis' | 'none',
  tooltipAxisPointer: 'shadow' as 'line' | 'shadow' | 'cross' | 'none',
  // Axis
  xAxisLabels: true,
  yAxisLabels: true,
  xAxisTitle: '',
  yAxisTitle: '',
  xGridlines: false,
  yGridlines: true,
  // Legend
  legendEnabled: true,
  legendPosition: 'top' as 'top' | 'bottom' | 'left' | 'right',
  // Line-specific
  lineType: 'solid' as 'solid' | 'dashed' | 'dotted',
  lineWidth: 2,
  markers: false,
  markerShape: 'circle' as 'circle' | 'rect' | 'triangle' | 'diamond',
  markerSize: 8,
  handleMissing: 'gap' as 'gap' | 'connect' | 'zero',
  step: false
});

const lineZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!lineSettings.value.zoomEnabled) return false;
  return {
    type: lineSettings.value.zoomType,
    axis: lineSettings.value.zoomAxis,
    start: lineSettings.value.zoomStart,
    end: lineSettings.value.zoomEnd,
    height: 25
  };
});

const lineToolboxConfig = computed<ToolboxConfig | boolean>(() => {
  if (!lineSettings.value.toolboxEnabled) return false;
  return {
    position: lineSettings.value.toolboxPosition,
    saveAsImage: lineSettings.value.toolboxSaveAsImage,
    dataZoom: lineSettings.value.toolboxDataZoom,
    restore: lineSettings.value.toolboxRestore,
    magicType: lineSettings.value.toolboxMagicType ? { type: ['line', 'bar'] as Array<'line' | 'bar'> } : undefined
  };
});

const lineAnimationConfig = computed<AnimationConfig | boolean>(() => {
  if (!lineSettings.value.animationEnabled) return false;
  return {
    duration: lineSettings.value.animationDuration,
    easing: lineSettings.value.animationEasing as AnimationConfig['easing']
  };
});

const lineTooltipConfig = computed<TooltipConfig | boolean>(() => {
  if (!lineSettings.value.tooltipEnabled) return false;
  return {
    trigger: lineSettings.value.tooltipTrigger,
    axisPointer: lineSettings.value.tooltipAxisPointer,
    confine: true
  };
});

// ============================================================================
// BAR CHART Settings
// ============================================================================
const barSettings = ref({
  // Zoom
  zoomEnabled: false,
  zoomType: 'slider' as 'slider' | 'inside' | 'both',
  zoomAxis: 'x' as 'x' | 'y' | 'both',
  // Toolbox
  toolboxEnabled: true,
  toolboxPosition: 'top-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  toolboxSaveAsImage: true,
  toolboxDataZoom: true,
  toolboxRestore: true,
  // Animation
  animationEnabled: true,
  animationDuration: 800,
  animationEasing: 'cubicOut' as string,
  // Tooltip
  tooltipEnabled: true,
  tooltipTrigger: 'axis' as 'item' | 'axis' | 'none',
  // Axis
  xAxisLabels: true,
  yAxisLabels: true,
  xGridlines: false,
  yGridlines: true,
  // Legend
  legendEnabled: true,
  legendPosition: 'top' as 'top' | 'bottom' | 'left' | 'right',
  // Bar-specific
  stackType: 'grouped' as 'stacked' | 'grouped' | 'stacked100',
  fillOpacity: 1,
  labels: false,
  swapXY: false,
  // Background
  backgroundColor: '#ffffff'
});

const barZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!barSettings.value.zoomEnabled) return false;
  return {
    type: barSettings.value.zoomType,
    axis: barSettings.value.zoomAxis,
    height: 25
  };
});

const barToolboxConfig = computed<ToolboxConfig | boolean>(() => {
  if (!barSettings.value.toolboxEnabled) return false;
  return {
    position: barSettings.value.toolboxPosition,
    saveAsImage: barSettings.value.toolboxSaveAsImage,
    dataZoom: barSettings.value.toolboxDataZoom,
    restore: barSettings.value.toolboxRestore
  };
});

const barAnimationConfig = computed<AnimationConfig | boolean>(() => {
  if (!barSettings.value.animationEnabled) return false;
  return {
    duration: barSettings.value.animationDuration,
    easing: barSettings.value.animationEasing as AnimationConfig['easing']
  };
});

const barTooltipConfig = computed<TooltipConfig | boolean>(() => {
  if (!barSettings.value.tooltipEnabled) return false;
  return { trigger: barSettings.value.tooltipTrigger, confine: true };
});

// ============================================================================
// AREA CHART Settings
// ============================================================================
const areaSettings = ref({
  // Zoom
  zoomEnabled: true,
  zoomType: 'both' as 'slider' | 'inside' | 'both',
  zoomAxis: 'x' as 'x' | 'y' | 'both',
  zoomStart: 0,
  zoomEnd: 60,
  // Toolbox
  toolboxEnabled: true,
  toolboxPosition: 'top-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  toolboxSaveAsImage: true,
  toolboxDataZoom: true,
  toolboxRestore: true,
  // Animation
  animationEnabled: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut' as string,
  // Tooltip
  tooltipEnabled: true,
  tooltipTrigger: 'axis' as 'item' | 'axis' | 'none',
  // Axis
  xAxisLabels: true,
  yAxisLabels: true,
  xGridlines: false,
  yGridlines: true,
  // Legend
  legendEnabled: true,
  legendPosition: 'top' as 'top' | 'bottom' | 'left' | 'right',
  // Area-specific
  stackType: 'stacked' as 'stacked' | 'stacked100',
  fillOpacity: 0.6,
  lineType: 'solid' as 'solid' | 'dashed' | 'dotted',
  lineWidth: 2,
  markers: false
});

const areaZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!areaSettings.value.zoomEnabled) return false;
  return {
    type: areaSettings.value.zoomType,
    axis: areaSettings.value.zoomAxis,
    start: areaSettings.value.zoomStart,
    end: areaSettings.value.zoomEnd,
    height: 25
  };
});

const areaToolboxConfig = computed<ToolboxConfig | boolean>(() => {
  if (!areaSettings.value.toolboxEnabled) return false;
  return {
    position: areaSettings.value.toolboxPosition,
    saveAsImage: areaSettings.value.toolboxSaveAsImage,
    dataZoom: areaSettings.value.toolboxDataZoom,
    restore: areaSettings.value.toolboxRestore
  };
});

const areaAnimationConfig = computed<AnimationConfig | boolean>(() => {
  if (!areaSettings.value.animationEnabled) return false;
  return {
    duration: areaSettings.value.animationDuration,
    easing: areaSettings.value.animationEasing as AnimationConfig['easing']
  };
});

const areaTooltipConfig = computed<TooltipConfig | boolean>(() => {
  if (!areaSettings.value.tooltipEnabled) return false;
  return { trigger: areaSettings.value.tooltipTrigger, confine: true };
});

// ============================================================================
// SCATTER PLOT Settings
// ============================================================================
const scatterSettings = ref({
  // Zoom
  zoomEnabled: true,
  zoomType: 'both' as 'slider' | 'inside' | 'both',
  zoomAxis: 'both' as 'x' | 'y' | 'both',
  // Toolbox
  toolboxEnabled: true,
  toolboxPosition: 'top-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  toolboxSaveAsImage: true,
  toolboxDataZoom: true,
  toolboxRestore: true,
  // Brush
  brushEnabled: true,
  brushType: 'rect' as 'rect' | 'polygon' | 'lineX' | 'lineY',
  brushOpacity: 0.2,
  // Animation
  animationEnabled: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut' as string,
  // Tooltip
  tooltipEnabled: true,
  // Axis
  xAxisLabels: true,
  yAxisLabels: true,
  xAxisTitle: 'Age',
  yAxisTitle: 'Annual Income',
  xGridlines: true,
  yGridlines: true,
  // Scatter-specific
  pointSize: 10,
  pointOpacity: 0.8,
  pointShape: 'circle' as 'circle' | 'rect' | 'triangle' | 'diamond'
});

const scatterZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!scatterSettings.value.zoomEnabled) return false;
  return {
    type: scatterSettings.value.zoomType,
    axis: scatterSettings.value.zoomAxis,
    height: 20
  };
});

const scatterToolboxConfig = computed<ToolboxConfig | boolean>(() => {
  if (!scatterSettings.value.toolboxEnabled) return false;
  return {
    position: scatterSettings.value.toolboxPosition,
    saveAsImage: scatterSettings.value.toolboxSaveAsImage,
    dataZoom: scatterSettings.value.toolboxDataZoom,
    restore: scatterSettings.value.toolboxRestore
  };
});

const scatterBrushConfig = computed<BrushConfig | boolean>(() => {
  if (!scatterSettings.value.brushEnabled) return false;
  return {
    type: [scatterSettings.value.brushType],
    outOfBrush: { opacity: scatterSettings.value.brushOpacity }
  };
});

const scatterAnimationConfig = computed<AnimationConfig | boolean>(() => {
  if (!scatterSettings.value.animationEnabled) return false;
  return {
    duration: scatterSettings.value.animationDuration,
    easing: scatterSettings.value.animationEasing as AnimationConfig['easing']
  };
});

const scatterTooltipConfig = computed<TooltipConfig | boolean>(() => {
  if (!scatterSettings.value.tooltipEnabled) return false;
  return { trigger: 'item', confine: true };
});

// ============================================================================
// HEATMAP Settings
// ============================================================================
const heatmapSettings = ref({
  // Display
  title: 'Website Traffic Heatmap',
  subtitle: 'Peak Hours Analysis - This subtitle tests long text wrapping behavior and should display properly across multiple lines without truncation. The heatmap visualizes website traffic patterns throughout the week, helping identify optimal times for marketing campaigns, server scaling decisions, and customer support staffing. Each cell represents the average number of visitors during that specific hour and day combination over the past 30 days.',
  legend: true,
  valueLabels: true,
  mobileValueLabels: false,
  nullsZero: false,
  zeroDisplay: '—',
  // Color
  colorScale: 'default',
  // Range
  useCustomRange: false,
  min: 0,
  max: 100,
  // Download
  downloadableData: true,
  downloadableImage: true
});

// ============================================================================
// FUNNEL CHART Settings
// ============================================================================
const funnelSettings = ref({
  // Display
  title: 'Sales Funnel',
  subtitle: '',
  legend: true,
  showPercent: true,
  // Format
  valueFmt: 'num0',
  // Download
  downloadableData: true,
  downloadableImage: true
});

// ============================================================================
// SANKEY DIAGRAM Settings
// ============================================================================
const sankeySettings = ref({
  // Display
  title: 'Customer Acquisition Flow',
  subtitle: '',
  // Layout
  orient: 'horizontal' as 'horizontal' | 'vertical',
  nodeWidth: 20,
  nodeGap: 8,
  nodeAlign: 'justify' as 'left' | 'right' | 'justify',
  // Download
  downloadableData: true,
  downloadableImage: true
});
</script>

<template>
  <div class="app" :class="activeAppearance">
    <header>
      <h1>Vue Better ECharts - Interactive Features Demo</h1>
      <button @click="cycleAppearance" class="theme-toggle">
        {{ activeAppearance === 'light' ? 'Dark' : 'Light' }}
      </button>
    </header>

    <main>
      <!-- ================================================================== -->
      <!-- LINE CHART -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Line Chart</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Zoom -->
          <div class="settings-group">
            <h4>Zoom</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.zoomEnabled" />
              Enable Zoom
            </label>
            <div v-if="lineSettings.zoomEnabled" class="settings-row">
              <label>
                Type
                <select v-model="lineSettings.zoomType">
                  <option value="slider">Slider</option>
                  <option value="inside">Mouse Wheel</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Axis
                <select v-model="lineSettings.zoomAxis">
                  <option value="x">X Only</option>
                  <option value="y">Y Only</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Start %
                <input type="number" v-model.number="lineSettings.zoomStart" min="0" max="100" />
              </label>
              <label>
                End %
                <input type="number" v-model.number="lineSettings.zoomEnd" min="0" max="100" />
              </label>
            </div>
          </div>

          <!-- Toolbox -->
          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
            <div v-if="lineSettings.toolboxEnabled" class="settings-row">
              <label>
                Position
                <select v-model="lineSettings.toolboxPosition">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="lineSettings.toolboxSaveAsImage" />
                Save Image
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="lineSettings.toolboxDataZoom" />
                Data Zoom
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="lineSettings.toolboxRestore" />
                Restore
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="lineSettings.toolboxMagicType" />
                Magic Type
              </label>
            </div>
          </div>

          <!-- Animation -->
          <div class="settings-group">
            <h4>Animation</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.animationEnabled" />
              Enable Animation
            </label>
            <div v-if="lineSettings.animationEnabled" class="settings-row">
              <label>
                Duration (ms)
                <input type="number" v-model.number="lineSettings.animationDuration" min="0" max="5000" step="100" />
              </label>
              <label>
                Easing
                <select v-model="lineSettings.animationEasing">
                  <option v-for="easing in easingOptions" :key="easing" :value="easing">{{ easing }}</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Tooltip -->
          <div class="settings-group">
            <h4>Tooltip</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.tooltipEnabled" />
              Enable Tooltip
            </label>
            <div v-if="lineSettings.tooltipEnabled" class="settings-row">
              <label>
                Trigger
                <select v-model="lineSettings.tooltipTrigger">
                  <option value="axis">Axis</option>
                  <option value="item">Item</option>
                  <option value="none">None</option>
                </select>
              </label>
              <label>
                Axis Pointer
                <select v-model="lineSettings.tooltipAxisPointer">
                  <option value="line">Line</option>
                  <option value="shadow">Shadow</option>
                  <option value="cross">Cross</option>
                  <option value="none">None</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Axis -->
          <div class="settings-group">
            <h4>Axis</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.xAxisLabels" />
              X-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.yAxisLabels" />
              Y-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.xGridlines" />
              X Gridlines
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.yGridlines" />
              Y Gridlines
            </label>
          </div>

          <!-- Legend -->
          <div class="settings-group">
            <h4>Legend</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.legendEnabled" />
              Show Legend
            </label>
            <label v-if="lineSettings.legendEnabled">
              Position
              <select v-model="lineSettings.legendPosition">
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </div>

          <!-- Line-specific -->
          <div class="settings-group">
            <h4>Line Style</h4>
            <label>
              Line Type
              <select v-model="lineSettings.lineType">
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </label>
            <label>
              Line Width
              <input type="number" v-model.number="lineSettings.lineWidth" min="1" max="10" />
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.markers" />
              Show Markers
            </label>
            <label v-if="lineSettings.markers">
              Marker Shape
              <select v-model="lineSettings.markerShape">
                <option value="circle">Circle</option>
                <option value="rect">Rectangle</option>
                <option value="triangle">Triangle</option>
                <option value="diamond">Diamond</option>
              </select>
            </label>
            <label v-if="lineSettings.markers">
              Marker Size
              <input type="number" v-model.number="lineSettings.markerSize" min="4" max="20" />
            </label>
            <label>
              Handle Missing
              <select v-model="lineSettings.handleMissing">
                <option value="gap">Gap</option>
                <option value="connect">Connect</option>
                <option value="zero">Zero</option>
              </select>
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.step" />
              Step Line
            </label>
          </div>
        </div>

        <LineChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="100 Days Time Series"
          subtitle="This is an extremely long subtitle that demonstrates how the chart handles text wrapping for extended descriptions. It should wrap nicely across multiple lines without being cut off or truncated in any way. The purpose of this test is to verify that our ECharts subtitle configuration properly sets the width and overflow properties so that long descriptive text can be displayed beneath the chart title. This kind of detailed description might be useful when presenting data to stakeholders who need additional context about what the visualization represents, the time period covered, data sources, or any caveats that should be considered when interpreting the results."
          height="380px"
          :zoom="lineZoomConfig"
          :toolbox="lineToolboxConfig"
          :animation="lineAnimationConfig"
          :tooltip="lineTooltipConfig"
          :xAxisLabels="lineSettings.xAxisLabels"
          :yAxisLabels="lineSettings.yAxisLabels"
          :xGridlines="lineSettings.xGridlines"
          :yGridlines="lineSettings.yGridlines"
          :legend="lineSettings.legendEnabled"
          :legendPosition="lineSettings.legendPosition"
          :lineType="lineSettings.lineType"
          :lineWidth="lineSettings.lineWidth"
          :markers="lineSettings.markers"
          :markerShape="lineSettings.markerShape"
          :markerSize="lineSettings.markerSize"
          :handleMissing="lineSettings.handleMissing"
          :step="lineSettings.step"
        />
      </section>

      <!-- ================================================================== -->
      <!-- BAR CHART -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Bar Chart</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Zoom -->
          <div class="settings-group">
            <h4>Zoom</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.zoomEnabled" />
              Enable Zoom
            </label>
            <div v-if="barSettings.zoomEnabled" class="settings-row">
              <label>
                Type
                <select v-model="barSettings.zoomType">
                  <option value="slider">Slider</option>
                  <option value="inside">Mouse Wheel</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Axis
                <select v-model="barSettings.zoomAxis">
                  <option value="x">X Only</option>
                  <option value="y">Y Only</option>
                  <option value="both">Both</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Toolbox -->
          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
            <div v-if="barSettings.toolboxEnabled" class="settings-row">
              <label>
                Position
                <select v-model="barSettings.toolboxPosition">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="barSettings.toolboxSaveAsImage" />
                Save Image
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="barSettings.toolboxDataZoom" />
                Data Zoom
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="barSettings.toolboxRestore" />
                Restore
              </label>
            </div>
          </div>

          <!-- Animation -->
          <div class="settings-group">
            <h4>Animation</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.animationEnabled" />
              Enable Animation
            </label>
            <div v-if="barSettings.animationEnabled" class="settings-row">
              <label>
                Duration (ms)
                <input type="number" v-model.number="barSettings.animationDuration" min="0" max="5000" step="100" />
              </label>
              <label>
                Easing
                <select v-model="barSettings.animationEasing">
                  <option v-for="easing in easingOptions" :key="easing" :value="easing">{{ easing }}</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Tooltip -->
          <div class="settings-group">
            <h4>Tooltip</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.tooltipEnabled" />
              Enable Tooltip
            </label>
            <label v-if="barSettings.tooltipEnabled">
              Trigger
              <select v-model="barSettings.tooltipTrigger">
                <option value="axis">Axis</option>
                <option value="item">Item</option>
              </select>
            </label>
          </div>

          <!-- Axis -->
          <div class="settings-group">
            <h4>Axis</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.xAxisLabels" />
              X-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.yAxisLabels" />
              Y-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.xGridlines" />
              X Gridlines
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.yGridlines" />
              Y Gridlines
            </label>
          </div>

          <!-- Legend -->
          <div class="settings-group">
            <h4>Legend</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.legendEnabled" />
              Show Legend
            </label>
            <label v-if="barSettings.legendEnabled">
              Position
              <select v-model="barSettings.legendPosition">
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </div>

          <!-- Background -->
          <div class="settings-group">
            <h4>Background</h4>
            <label>
              Background Color
              <input type="color" v-model="barSettings.backgroundColor" />
            </label>
          </div>

          <!-- Bar-specific -->
          <div class="settings-group">
            <h4>Bar Style</h4>
            <label>
              Stack Type
              <select v-model="barSettings.stackType">
                <option value="grouped">Grouped</option>
                <option value="stacked">Stacked</option>
                <option value="stacked100">Stacked 100%</option>
              </select>
            </label>
            <label>
              Fill Opacity
              <input type="range" v-model.number="barSettings.fillOpacity" min="0" max="1" step="0.1" />
              {{ barSettings.fillOpacity }}
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.labels" />
              Show Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.swapXY" />
              Horizontal Bars
            </label>
          </div>
        </div>

        <BarChart
          :data="salesData"
          x="month"
          y="sales"
          series="region"
          title="Monthly Sales by Region"
          subtitle="Comparing North and South regional performance across the first half of the year with detailed monthly breakdowns. This comprehensive analysis shows how each region has performed relative to targets and historical benchmarks. The data reveals interesting seasonal patterns and highlights opportunities for growth in underperforming areas. Sales teams can use this visualization to identify trends and adjust their strategies accordingly for the upcoming quarters."
          yFmt="usd0k"
          height="350px"
          :type="barSettings.stackType"
          :zoom="barZoomConfig"
          :toolbox="barToolboxConfig"
          :animation="barAnimationConfig"
          :tooltip="barTooltipConfig"
          :xAxisLabels="barSettings.xAxisLabels"
          :yAxisLabels="barSettings.yAxisLabels"
          :xGridlines="barSettings.xGridlines"
          :yGridlines="barSettings.yGridlines"
          :legend="barSettings.legendEnabled"
          :legendPosition="barSettings.legendPosition"
          :fillOpacity="barSettings.fillOpacity"
          :labels="barSettings.labels"
          :swapXY="barSettings.swapXY"
          :backgroundColor="barSettings.backgroundColor"
        />
      </section>

      <!-- ================================================================== -->
      <!-- AREA CHART -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Area Chart</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Zoom -->
          <div class="settings-group">
            <h4>Zoom</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.zoomEnabled" />
              Enable Zoom
            </label>
            <div v-if="areaSettings.zoomEnabled" class="settings-row">
              <label>
                Type
                <select v-model="areaSettings.zoomType">
                  <option value="slider">Slider</option>
                  <option value="inside">Mouse Wheel</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Start %
                <input type="number" v-model.number="areaSettings.zoomStart" min="0" max="100" />
              </label>
              <label>
                End %
                <input type="number" v-model.number="areaSettings.zoomEnd" min="0" max="100" />
              </label>
            </div>
          </div>

          <!-- Toolbox -->
          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
            <div v-if="areaSettings.toolboxEnabled" class="settings-row">
              <label>
                Position
                <select v-model="areaSettings.toolboxPosition">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="areaSettings.toolboxSaveAsImage" />
                Save Image
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="areaSettings.toolboxDataZoom" />
                Data Zoom
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="areaSettings.toolboxRestore" />
                Restore
              </label>
            </div>
          </div>

          <!-- Animation -->
          <div class="settings-group">
            <h4>Animation</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.animationEnabled" />
              Enable Animation
            </label>
            <div v-if="areaSettings.animationEnabled" class="settings-row">
              <label>
                Duration (ms)
                <input type="number" v-model.number="areaSettings.animationDuration" min="0" max="5000" step="100" />
              </label>
              <label>
                Easing
                <select v-model="areaSettings.animationEasing">
                  <option v-for="easing in easingOptions" :key="easing" :value="easing">{{ easing }}</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Tooltip -->
          <div class="settings-group">
            <h4>Tooltip</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.tooltipEnabled" />
              Enable Tooltip
            </label>
            <label v-if="areaSettings.tooltipEnabled">
              Trigger
              <select v-model="areaSettings.tooltipTrigger">
                <option value="axis">Axis</option>
                <option value="item">Item</option>
              </select>
            </label>
          </div>

          <!-- Axis -->
          <div class="settings-group">
            <h4>Axis</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.xAxisLabels" />
              X-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.yAxisLabels" />
              Y-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.xGridlines" />
              X Gridlines
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.yGridlines" />
              Y Gridlines
            </label>
          </div>

          <!-- Legend -->
          <div class="settings-group">
            <h4>Legend</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.legendEnabled" />
              Show Legend
            </label>
            <label v-if="areaSettings.legendEnabled">
              Position
              <select v-model="areaSettings.legendPosition">
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </label>
          </div>

          <!-- Area-specific -->
          <div class="settings-group">
            <h4>Area Style</h4>
            <label>
              Stack Type
              <select v-model="areaSettings.stackType">
                <option value="stacked">Stacked</option>
                <option value="stacked100">Stacked 100%</option>
              </select>
            </label>
            <label>
              Fill Opacity
              <input type="range" v-model.number="areaSettings.fillOpacity" min="0" max="1" step="0.1" />
              {{ areaSettings.fillOpacity }}
            </label>
            <label>
              Line Type
              <select v-model="areaSettings.lineType">
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </label>
            <label>
              Line Width
              <input type="number" v-model.number="areaSettings.lineWidth" min="0" max="10" />
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.markers" />
              Show Markers
            </label>
          </div>
        </div>

        <AreaChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="Stacked Area Chart"
          height="380px"
          :type="areaSettings.stackType"
          :zoom="areaZoomConfig"
          :toolbox="areaToolboxConfig"
          :animation="areaAnimationConfig"
          :tooltip="areaTooltipConfig"
          :xAxisLabels="areaSettings.xAxisLabels"
          :yAxisLabels="areaSettings.yAxisLabels"
          :xGridlines="areaSettings.xGridlines"
          :yGridlines="areaSettings.yGridlines"
          :legend="areaSettings.legendEnabled"
          :legendPosition="areaSettings.legendPosition"
          :fillOpacity="areaSettings.fillOpacity"
          :lineType="areaSettings.lineType"
          :lineWidth="areaSettings.lineWidth"
          :markers="areaSettings.markers"
        />
      </section>

      <!-- ================================================================== -->
      <!-- SCATTER PLOT -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Scatter Plot</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Zoom -->
          <div class="settings-group">
            <h4>Zoom</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.zoomEnabled" />
              Enable Zoom
            </label>
            <div v-if="scatterSettings.zoomEnabled" class="settings-row">
              <label>
                Type
                <select v-model="scatterSettings.zoomType">
                  <option value="slider">Slider</option>
                  <option value="inside">Mouse Wheel</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <label>
                Axis
                <select v-model="scatterSettings.zoomAxis">
                  <option value="x">X Only</option>
                  <option value="y">Y Only</option>
                  <option value="both">Both</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Toolbox -->
          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
            <div v-if="scatterSettings.toolboxEnabled" class="settings-row">
              <label>
                Position
                <select v-model="scatterSettings.toolboxPosition">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="scatterSettings.toolboxSaveAsImage" />
                Save Image
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="scatterSettings.toolboxDataZoom" />
                Data Zoom
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="scatterSettings.toolboxRestore" />
                Restore
              </label>
            </div>
          </div>

          <!-- Brush -->
          <div class="settings-group">
            <h4>Brush Selection</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.brushEnabled" />
              Enable Brush
            </label>
            <div v-if="scatterSettings.brushEnabled" class="settings-row">
              <label>
                Brush Type
                <select v-model="scatterSettings.brushType">
                  <option value="rect">Rectangle</option>
                  <option value="polygon">Polygon</option>
                  <option value="lineX">Line X</option>
                  <option value="lineY">Line Y</option>
                </select>
              </label>
              <label>
                Unselected Opacity
                <input type="range" v-model.number="scatterSettings.brushOpacity" min="0" max="1" step="0.1" />
                {{ scatterSettings.brushOpacity }}
              </label>
            </div>
          </div>

          <!-- Animation -->
          <div class="settings-group">
            <h4>Animation</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.animationEnabled" />
              Enable Animation
            </label>
            <div v-if="scatterSettings.animationEnabled" class="settings-row">
              <label>
                Duration (ms)
                <input type="number" v-model.number="scatterSettings.animationDuration" min="0" max="5000" step="100" />
              </label>
              <label>
                Easing
                <select v-model="scatterSettings.animationEasing">
                  <option v-for="easing in easingOptions" :key="easing" :value="easing">{{ easing }}</option>
                </select>
              </label>
            </div>
          </div>

          <!-- Tooltip -->
          <div class="settings-group">
            <h4>Tooltip</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.tooltipEnabled" />
              Enable Tooltip
            </label>
          </div>

          <!-- Axis -->
          <div class="settings-group">
            <h4>Axis</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.xAxisLabels" />
              X-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.yAxisLabels" />
              Y-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.xGridlines" />
              X Gridlines
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.yGridlines" />
              Y Gridlines
            </label>
            <div class="settings-row">
              <label>
                X-Axis Title
                <input type="text" v-model="scatterSettings.xAxisTitle" />
              </label>
              <label>
                Y-Axis Title
                <input type="text" v-model="scatterSettings.yAxisTitle" />
              </label>
            </div>
          </div>

          <!-- Scatter-specific -->
          <div class="settings-group">
            <h4>Point Style</h4>
            <label>
              Point Size
              <input type="number" v-model.number="scatterSettings.pointSize" min="2" max="30" />
            </label>
            <label>
              Point Opacity
              <input type="range" v-model.number="scatterSettings.pointOpacity" min="0" max="1" step="0.1" />
              {{ scatterSettings.pointOpacity }}
            </label>
            <label>
              Point Shape
              <select v-model="scatterSettings.pointShape">
                <option value="circle">Circle</option>
                <option value="rect">Rectangle</option>
                <option value="triangle">Triangle</option>
                <option value="diamond">Diamond</option>
              </select>
            </label>
          </div>
        </div>

        <ScatterPlot
          :data="scatterData"
          x="age"
          y="income"
          title="Customer Demographics"
          subtitle="Age vs Annual Income relationship analysis showing how customer spending correlates with demographic factors. This scatter plot reveals the distribution of our customer base across different age groups and income levels, enabling targeted marketing strategies and product positioning. Each point represents an individual customer, and the overall pattern helps identify key market segments for business development initiatives."
          :xAxisTitle="scatterSettings.xAxisTitle"
          :yAxisTitle="scatterSettings.yAxisTitle"
          yFmt="usd0k"
          height="400px"
          :zoom="scatterZoomConfig"
          :toolbox="scatterToolboxConfig"
          :brush="scatterBrushConfig"
          :animation="scatterAnimationConfig"
          :tooltip="scatterTooltipConfig"
          :xAxisLabels="scatterSettings.xAxisLabels"
          :yAxisLabels="scatterSettings.yAxisLabels"
          :xGridlines="scatterSettings.xGridlines"
          :yGridlines="scatterSettings.yGridlines"
          :pointSize="scatterSettings.pointSize"
          :pointOpacity="scatterSettings.pointOpacity"
          :pointShape="scatterSettings.pointShape"
        />
      </section>

      <!-- ================================================================== -->
      <!-- HEATMAP -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Heatmap</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Display -->
          <div class="settings-group">
            <h4>Display</h4>
            <label>
              Title
              <input type="text" v-model="heatmapSettings.title" />
            </label>
            <label>
              Subtitle
              <input type="text" v-model="heatmapSettings.subtitle" />
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.legend" />
              Show Legend
            </label>
          </div>

          <!-- Labels -->
          <div class="settings-group">
            <h4>Labels</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.valueLabels" />
              Show Value Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.mobileValueLabels" />
              Mobile Value Labels
            </label>
            <label>
              Zero Display
              <input type="text" v-model="heatmapSettings.zeroDisplay" style="width: 60px" />
            </label>
          </div>

          <!-- Data -->
          <div class="settings-group">
            <h4>Data Handling</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.nullsZero" />
              Treat Nulls as Zero
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.useCustomRange" />
              Custom Range
            </label>
            <div v-if="heatmapSettings.useCustomRange" class="settings-row">
              <label>
                Min
                <input type="number" v-model.number="heatmapSettings.min" />
              </label>
              <label>
                Max
                <input type="number" v-model.number="heatmapSettings.max" />
              </label>
            </div>
          </div>

          <!-- Color -->
          <div class="settings-group">
            <h4>Color</h4>
            <label>
              Color Scale
              <select v-model="heatmapSettings.colorScale">
                <option value="default">Default</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
              </select>
            </label>
          </div>

          <!-- Download -->
          <div class="settings-group">
            <h4>Export</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.downloadableData" />
              Downloadable Data
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="heatmapSettings.downloadableImage" />
              Downloadable Image
            </label>
          </div>
        </div>

        <Heatmap
          :data="heatmapData"
          x="hour"
          y="day"
          value="value"
          :title="heatmapSettings.title"
          :subtitle="heatmapSettings.subtitle"
          height="300px"
          :legend="heatmapSettings.legend"
          :valueLabels="heatmapSettings.valueLabels"
          :mobileValueLabels="heatmapSettings.mobileValueLabels"
          :nullsZero="heatmapSettings.nullsZero"
          :zeroDisplay="heatmapSettings.zeroDisplay"
          :min="heatmapSettings.useCustomRange ? heatmapSettings.min : undefined"
          :max="heatmapSettings.useCustomRange ? heatmapSettings.max : undefined"
          :downloadableData="heatmapSettings.downloadableData"
          :downloadableImage="heatmapSettings.downloadableImage"
        />
      </section>

      <!-- ================================================================== -->
      <!-- FUNNEL CHART -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Funnel Chart</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Display -->
          <div class="settings-group">
            <h4>Display</h4>
            <label>
              Title
              <input type="text" v-model="funnelSettings.title" />
            </label>
            <label>
              Subtitle
              <input type="text" v-model="funnelSettings.subtitle" />
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="funnelSettings.legend" />
              Show Legend
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="funnelSettings.showPercent" />
              Show Percent
            </label>
          </div>

          <!-- Format -->
          <div class="settings-group">
            <h4>Format</h4>
            <label>
              Value Format
              <select v-model="funnelSettings.valueFmt">
                <option value="num0">Number (no decimals)</option>
                <option value="num1">Number (1 decimal)</option>
                <option value="num2">Number (2 decimals)</option>
                <option value="usd0">USD (no decimals)</option>
                <option value="usd2">USD (2 decimals)</option>
                <option value="pct1">Percent</option>
              </select>
            </label>
          </div>

          <!-- Download -->
          <div class="settings-group">
            <h4>Export</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="funnelSettings.downloadableData" />
              Downloadable Data
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="funnelSettings.downloadableImage" />
              Downloadable Image
            </label>
          </div>
        </div>

        <FunnelChart
          :data="funnelData"
          name="stage"
          value="count"
          :title="funnelSettings.title"
          :subtitle="funnelSettings.subtitle || undefined"
          :valueFmt="funnelSettings.valueFmt"
          height="350px"
          :legend="funnelSettings.legend"
          :showPercent="funnelSettings.showPercent"
          :downloadableData="funnelSettings.downloadableData"
          :downloadableImage="funnelSettings.downloadableImage"
        />
      </section>

      <!-- ================================================================== -->
      <!-- SANKEY DIAGRAM -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Sankey Diagram</h2>
          <span class="badge">Full Settings</span>
        </div>

        <div class="settings-panel">
          <!-- Display -->
          <div class="settings-group">
            <h4>Display</h4>
            <label>
              Title
              <input type="text" v-model="sankeySettings.title" />
            </label>
            <label>
              Subtitle
              <input type="text" v-model="sankeySettings.subtitle" />
            </label>
          </div>

          <!-- Layout -->
          <div class="settings-group">
            <h4>Layout</h4>
            <label>
              Orientation
              <select v-model="sankeySettings.orient">
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </label>
            <label>
              Node Align
              <select v-model="sankeySettings.nodeAlign">
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </label>
          </div>

          <!-- Node Sizing -->
          <div class="settings-group">
            <h4>Node Sizing</h4>
            <label>
              Node Width
              <input type="number" v-model.number="sankeySettings.nodeWidth" min="5" max="50" />
            </label>
            <label>
              Node Gap
              <input type="number" v-model.number="sankeySettings.nodeGap" min="0" max="30" />
            </label>
          </div>

          <!-- Download -->
          <div class="settings-group">
            <h4>Export</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="sankeySettings.downloadableData" />
              Downloadable Data
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="sankeySettings.downloadableImage" />
              Downloadable Image
            </label>
          </div>
        </div>

        <SankeyDiagram
          :data="sankeyData"
          source="source"
          target="target"
          value="value"
          :title="sankeySettings.title"
          :subtitle="sankeySettings.subtitle || undefined"
          height="350px"
          :orient="sankeySettings.orient"
          :nodeWidth="sankeySettings.nodeWidth"
          :nodeGap="sankeySettings.nodeGap"
          :nodeAlign="sankeySettings.nodeAlign"
          :downloadableData="sankeySettings.downloadableData"
          :downloadableImage="sankeySettings.downloadableImage"
        />
      </section>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  padding: 20px;
  transition: background-color 0.3s, color 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app.light {
  background-color: #f5f5f5;
  color: #333;
}

.app.dark {
  background-color: #1a1a2e;
  color: #eee;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid currentColor;
  opacity: 0.8;
}

h1 {
  font-size: 1.6rem;
  font-weight: 600;
}

.theme-toggle {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.light .theme-toggle {
  background: #333;
  color: #fff;
}

.dark .theme-toggle {
  background: #fff;
  color: #333;
}

.theme-toggle:hover {
  transform: scale(1.05);
}

main {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-section {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 12px;
  transition: background-color 0.3s;
}

.chart-section.with-settings {
  padding-top: 16px;
}

.light .chart-section {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .chart-section {
  background: #16213e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.badge {
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.light .badge {
  background: #e3f2fd;
  color: #1565c0;
}

.dark .badge {
  background: #1565c0;
  color: #e3f2fd;
}

/* Settings Panel */
.settings-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 8px;
  font-size: 0.85rem;
}

.light .settings-panel {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.dark .settings-panel {
  background: #0f1629;
  border: 1px solid #2d3748;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.settings-group h4 {
  margin: 0 0 4px 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.settings-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.settings-group label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
}

.settings-group label.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.settings-group input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.settings-group select,
.settings-group input[type="number"],
.settings-group input[type="text"] {
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  min-width: 80px;
}

.settings-group input[type="text"] {
  min-width: 120px;
}

.light .settings-group select,
.light .settings-group input[type="number"],
.light .settings-group input[type="text"] {
  background: #fff;
  border: 1px solid #ced4da;
  color: #333;
}

.dark .settings-group select,
.dark .settings-group input[type="number"],
.dark .settings-group input[type="text"] {
  background: #1a1a2e;
  border: 1px solid #4a5568;
  color: #eee;
}

.settings-group input[type="range"] {
  width: 100px;
}

.settings-group input[type="color"] {
  width: 50px;
  height: 32px;
  padding: 2px;
  border-radius: 4px;
  cursor: pointer;
}

.settings-group select:focus,
.settings-group input:focus {
  outline: 2px solid #4299e1;
  outline-offset: 1px;
}
</style>
