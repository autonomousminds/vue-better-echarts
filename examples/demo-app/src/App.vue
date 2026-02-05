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

const lineData = ref([
  { date: '2024-01', revenue: 45000, cost: 32000 },
  { date: '2024-02', revenue: 52000, cost: 35000 },
  { date: '2024-03', revenue: 61000, cost: 38000 },
  { date: '2024-04', revenue: 58000, cost: 36000 },
  { date: '2024-05', revenue: 72000, cost: 42000 },
  { date: '2024-06', revenue: 85000, cost: 48000 },
  { date: '2024-07', revenue: 78000, cost: 45000 },
  { date: '2024-08', revenue: 92000, cost: 52000 },
  { date: '2024-09', revenue: 88000, cost: 50000 },
  { date: '2024-10', revenue: 95000, cost: 54000 },
  { date: '2024-11', revenue: 102000, cost: 58000 },
  { date: '2024-12', revenue: 115000, cost: 62000 }
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
// Interactive Settings State - Line Chart
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

  // Axis Labels
  xAxisLabels: true,
  yAxisLabels: true,
  xAxisTitle: '',
  yAxisTitle: '',

  // Legend
  legendEnabled: true
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
// Interactive Settings State - Scatter Plot
// ============================================================================

const scatterSettings = ref({
  // Zoom
  zoomEnabled: true,
  zoomType: 'both' as 'slider' | 'inside' | 'both',
  zoomAxis: 'both' as 'x' | 'y' | 'both',

  // Brush
  brushEnabled: true,
  brushType: 'rect' as 'rect' | 'polygon' | 'lineX' | 'lineY',
  brushOpacity: 0.2,

  // Toolbox
  toolboxEnabled: true,

  // Animation
  animationEnabled: true,
  animationDuration: 1000
});

const scatterZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!scatterSettings.value.zoomEnabled) return false;
  return {
    type: scatterSettings.value.zoomType,
    axis: scatterSettings.value.zoomAxis,
    height: 20
  };
});

const scatterBrushConfig = computed<BrushConfig | boolean>(() => {
  if (!scatterSettings.value.brushEnabled) return false;
  return {
    type: [scatterSettings.value.brushType],
    outOfBrush: { opacity: scatterSettings.value.brushOpacity }
  };
});

// ============================================================================
// Interactive Settings State - Bar Chart
// ============================================================================

const barSettings = ref({
  zoomEnabled: false,
  zoomType: 'slider' as 'slider' | 'inside' | 'both',
  toolboxEnabled: false,
  animationEnabled: true,
  animationDuration: 800,
  animationEasing: 'cubicOut' as string,

  // Axis Labels
  xAxisLabels: true,
  yAxisLabels: true
});

const barZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!barSettings.value.zoomEnabled) return false;
  return {
    type: barSettings.value.zoomType,
    axis: 'x',
    height: 25
  };
});

const barAnimationConfig = computed<AnimationConfig | boolean>(() => {
  if (!barSettings.value.animationEnabled) return false;
  return {
    duration: barSettings.value.animationDuration,
    easing: barSettings.value.animationEasing as AnimationConfig['easing']
  };
});

// ============================================================================
// Interactive Settings State - Area Chart
// ============================================================================

const areaSettings = ref({
  zoomEnabled: true,
  zoomType: 'both' as 'slider' | 'inside' | 'both',
  zoomStart: 0,
  zoomEnd: 60,
  toolboxEnabled: true,
  animationEnabled: true
});

const areaZoomConfig = computed<ZoomConfig | boolean>(() => {
  if (!areaSettings.value.zoomEnabled) return false;
  return {
    type: areaSettings.value.zoomType,
    axis: 'x',
    start: areaSettings.value.zoomStart,
    end: areaSettings.value.zoomEnd,
    height: 25
  };
});

// Easing options for dropdowns
const easingOptions = [
  'linear',
  'cubicIn', 'cubicOut', 'cubicInOut',
  'elasticIn', 'elasticOut', 'elasticInOut',
  'bounceIn', 'bounceOut', 'bounceInOut',
  'backIn', 'backOut', 'backInOut'
];
</script>

<template>
  <div class="app" :class="activeAppearance">
    <header>
      <h1>Vue Better ECharts - Interactive Features Demo</h1>
      <button @click="cycleAppearance" class="theme-toggle">
        {{ activeAppearance === 'light' ? '🌙 Dark' : '☀️ Light' }}
      </button>
    </header>

    <main>
      <!-- ================================================================== -->
      <!-- LINE CHART WITH FULL SETTINGS PANEL -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Line Chart - Interactive Settings</h2>
          <span class="badge">All Features</span>
        </div>

        <div class="settings-panel">
          <!-- Zoom Settings -->
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

          <!-- Toolbox Settings -->
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

          <!-- Animation Settings -->
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

          <!-- Tooltip Settings -->
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

          <!-- Axis Labels Settings -->
          <div class="settings-group">
            <h4>Axis Labels</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.xAxisLabels" />
              X-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.yAxisLabels" />
              Y-Axis Labels
            </label>
            <div class="settings-row">
              <label>
                X-Axis Title
                <input type="text" v-model="lineSettings.xAxisTitle" placeholder="e.g. Day" />
              </label>
              <label>
                Y-Axis Title
                <input type="text" v-model="lineSettings.yAxisTitle" placeholder="e.g. Value" />
              </label>
            </div>
          </div>

          <!-- Legend Settings -->
          <div class="settings-group">
            <h4>Legend</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="lineSettings.legendEnabled" />
              Show Legend
            </label>
          </div>
        </div>

        <LineChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="100 Days Time Series"
          :markers="false"
          height="380px"
          :zoom="lineZoomConfig"
          :toolbox="lineToolboxConfig"
          :animation="lineAnimationConfig"
          :tooltip="lineTooltipConfig"
          :xAxisLabels="lineSettings.xAxisLabels"
          :yAxisLabels="lineSettings.yAxisLabels"
          :xAxisTitle="lineSettings.xAxisTitle || undefined"
          :yAxisTitle="lineSettings.yAxisTitle || undefined"
          :legend="lineSettings.legendEnabled"
        />
      </section>

      <!-- ================================================================== -->
      <!-- SCATTER PLOT WITH SETTINGS PANEL -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Scatter Plot - Zoom & Brush Selection</h2>
          <span class="badge">Brush</span>
        </div>

        <div class="settings-panel">
          <!-- Zoom Settings -->
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

          <!-- Brush Settings -->
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

          <!-- Toolbox -->
          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="scatterSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
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
            </div>
          </div>
        </div>

        <ScatterPlot
          :data="scatterData"
          x="age"
          y="income"
          title="Customer Demographics"
          subtitle="Age vs Annual Income"
          xAxisTitle="Age"
          yAxisTitle="Annual Income"
          yFmt="usd0k"
          height="400px"
          :zoom="scatterZoomConfig"
          :brush="scatterBrushConfig"
          :toolbox="scatterSettings.toolboxEnabled"
          :animation="scatterSettings.animationEnabled ? { duration: scatterSettings.animationDuration } : false"
        />
      </section>

      <!-- ================================================================== -->
      <!-- BAR CHART WITH SETTINGS PANEL -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Bar Chart - Interactive Settings</h2>
          <span class="badge">Animation</span>
        </div>

        <div class="settings-panel compact">
          <div class="settings-group">
            <h4>Zoom</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.zoomEnabled" />
              Enable Zoom
            </label>
            <label v-if="barSettings.zoomEnabled">
              Type
              <select v-model="barSettings.zoomType">
                <option value="slider">Slider</option>
                <option value="inside">Mouse Wheel</option>
                <option value="both">Both</option>
              </select>
            </label>
          </div>

          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
          </div>

          <div class="settings-group">
            <h4>Animation</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.animationEnabled" />
              Enable Animation
            </label>
            <div v-if="barSettings.animationEnabled" class="settings-row">
              <label>
                Duration
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

          <div class="settings-group">
            <h4>Axis Labels</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.xAxisLabels" />
              X-Axis Labels
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="barSettings.yAxisLabels" />
              Y-Axis Labels
            </label>
          </div>
        </div>

        <BarChart
          :data="salesData"
          x="month"
          y="sales"
          series="region"
          title="Monthly Sales by Region"
          yFmt="usd0k"
          :legend="true"
          height="350px"
          :zoom="barZoomConfig"
          :toolbox="barSettings.toolboxEnabled"
          :animation="barAnimationConfig"
          :xAxisLabels="barSettings.xAxisLabels"
          :yAxisLabels="barSettings.yAxisLabels"
        />
      </section>

      <!-- ================================================================== -->
      <!-- AREA CHART WITH SETTINGS PANEL -->
      <!-- ================================================================== -->
      <section class="chart-section with-settings">
        <div class="section-header">
          <h2>Area Chart - Zoom Settings</h2>
          <span class="badge">Zoom</span>
        </div>

        <div class="settings-panel compact">
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

          <div class="settings-group">
            <h4>Toolbox</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.toolboxEnabled" />
              Enable Toolbox
            </label>
          </div>

          <div class="settings-group">
            <h4>Animation</h4>
            <label class="checkbox">
              <input type="checkbox" v-model="areaSettings.animationEnabled" />
              Enable Animation
            </label>
          </div>
        </div>

        <AreaChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="Stacked Area Chart"
          height="380px"
          :zoom="areaZoomConfig"
          :toolbox="areaSettings.toolboxEnabled"
          :animation="areaSettings.animationEnabled"
        />
      </section>

      <!-- ================================================================== -->
      <!-- STATIC EXAMPLES (No Settings Panel) -->
      <!-- ================================================================== -->

      <section class="chart-section">
        <h2>Line Chart - Simple Usage</h2>
        <p class="hint">Just use :zoom="true" for sensible defaults</p>
        <LineChart
          :data="lineData"
          x="date"
          :y="['revenue', 'cost']"
          title="Revenue & Cost Trend"
          yFmt="usd0k"
          :markers="true"
          height="350px"
          :zoom="true"
          :toolbox="true"
        />
      </section>

      <section class="chart-section">
        <h2>Heatmap</h2>
        <Heatmap
          :data="heatmapData"
          x="hour"
          y="day"
          value="value"
          title="Website Traffic Heatmap"
          subtitle="Peak Hours Analysis"
          height="300px"
        />
      </section>

      <section class="chart-section">
        <h2>Funnel Chart</h2>
        <FunnelChart
          :data="funnelData"
          name="stage"
          value="count"
          title="Sales Funnel"
          valueFmt="num0"
          height="350px"
        />
      </section>

      <section class="chart-section">
        <h2>Sankey Diagram</h2>
        <SankeyDiagram
          :data="sankeyData"
          source="source"
          target="target"
          value="value"
          title="Customer Acquisition Flow"
          height="350px"
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

.chart-section h2 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
}

.chart-section .hint {
  margin: -10px 0 15px 0;
  font-size: 0.85rem;
  opacity: 0.6;
  font-style: italic;
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

.settings-panel.compact {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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

.settings-group select:focus,
.settings-group input:focus {
  outline: 2px solid #4299e1;
  outline-offset: 1px;
}
</style>
