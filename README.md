# Vue ECharts Charts

A Vue 3 charting library built on Apache ECharts with advanced formatting, theming, and export capabilities.

> This library was inspired by [evidence.dev](https://evidence.dev) charts.

## Features

- **16 Chart Types**: Bar, Line, Area, Scatter, Bubble, Box Plot, Histogram, Funnel, Heatmap, Calendar Heatmap, Sankey, US Map, Area Map, Point Map, Bubble Map
- **100+ Built-in Formats**: Currencies (USD, EUR, GBP, etc.), dates, numbers, percentages with automatic scaling (k, M, B, T)
- **Light/Dark Theme Support**: Automatic system detection with manual toggle
- **Export Options**: PNG, JPEG, CSV download and clipboard copy
- **TypeScript Support**: Full type definitions included
- **Reference Components**: Add reference lines, areas, and points to charts

## Installation

```bash
npm install vue-better-echarts echarts
```

## Quick Start

```vue
<script setup>
import { BarChart, LineChart, useTheme } from 'vue-better-echarts';

const { activeAppearance, cycleAppearance } = useTheme();

const data = [
  { month: 'Jan', sales: 12500, orders: 145 },
  { month: 'Feb', sales: 15200, orders: 178 },
  { month: 'Mar', sales: 18900, orders: 210 },
  { month: 'Apr', sales: 16400, orders: 189 },
  { month: 'May', sales: 21000, orders: 245 },
  { month: 'Jun', sales: 24500, orders: 289 }
];
</script>

<template>
  <button @click="cycleAppearance">Toggle Theme</button>

  <BarChart
    :data="data"
    x="month"
    y="sales"
    title="Monthly Sales"
    yFmt="usd0k"
  />

  <LineChart
    :data="data"
    x="month"
    :y="['sales', 'orders']"
    title="Sales & Orders Trend"
    :markers="true"
  />
</template>
```

## Chart Types

### Basic Charts

| Component | Description |
|-----------|-------------|
| `BarChart` | Vertical/horizontal bars with stacked, grouped, or stacked100 modes |
| `LineChart` | Line charts with markers, step interpolation, missing value handling |
| `AreaChart` | Area charts with stacked or stacked100 modes |
| `ScatterPlot` | Scatter plots with customizable point shapes and opacity |

### Advanced Charts

| Component | Description |
|-----------|-------------|
| `BubbleChart` | Scatter with size dimension |
| `BoxPlot` | Statistical box plots |
| `Histogram` | Automatic binning |
| `FunnelChart` | Funnel/pipeline visualization |

### Specialized Charts

| Component | Description |
|-----------|-------------|
| `Heatmap` | 2D heatmap with color scales |
| `CalendarHeatmap` | Calendar-based heatmap for time series |
| `SankeyDiagram` | Flow visualization |

### Maps

| Component | Description |
|-----------|-------------|
| `USMap` | US choropleth map |
| `AreaMap` | Custom GeoJSON choropleth |
| `PointMap` | Point markers on world map |
| `BubbleMap` | Sized bubbles on world map |

### Reference Components

| Component | Description |
|-----------|-------------|
| `ReferenceLine` | Horizontal/vertical reference lines |
| `ReferenceArea` | Shaded reference areas |
| `ReferencePoint` | Labeled reference points |

## Formatting

Use the `yFmt`, `xFmt`, or `valueFmt` props to format values:

### Currency Formats
- `usd`, `usd0`, `usd1`, `usd2` - US Dollars
- `usd0k`, `usd1k`, `usd2k` - USD in thousands
- `usd0m`, `usd1m`, `usd2m` - USD in millions
- `eur`, `gbp`, `jpy`, `cny`, etc. - Other currencies

### Number Formats
- `num0`, `num1`, `num2`, `num3`, `num4` - Decimals
- `num0k`, `num1k`, `num2k` - Thousands
- `num0m`, `num1m`, `num2m` - Millions
- `pct`, `pct0`, `pct1`, `pct2`, `pct3` - Percentages

### Date Formats
- `shortdate`, `longdate`, `fulldate`
- `mdy`, `dmy`, `hms`
- `mmm`, `mmmm`, `yyyy`

## Theming

### Using Theme Composable

```typescript
import { useTheme } from 'vue-better-echarts';

const {
  activeAppearance,    // Current theme: 'light' | 'dark'
  selectedAppearance,  // User preference: 'light' | 'dark' | 'system'
  setAppearance,       // Set preference
  cycleAppearance,     // Cycle through options
  resolveColor,        // Resolve color for current theme
  resolveColorPalette  // Get color palette
} = useTheme();
```

### Custom Themes

```typescript
import { configureThemes } from 'vue-better-echarts';

configureThemes({
  light: {
    colors: {
      'base-100': '#ffffff',
      'base-content': '#333333'
    },
    colorPalettes: {
      default: ['#3366cc', '#dc3912', '#ff9900']
    }
  }
});
```

## Props Reference

### Common Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `Array` | Data array |
| `x` | `string` | X-axis column |
| `y` | `string \| string[]` | Y-axis column(s) |
| `series` | `string` | Column to split into series |
| `title` | `string` | Chart title |
| `titleIcon` | `string` | Image URL to display before the title |
| `subtitle` | `string` | Chart subtitle |
| `height` | `string` | Chart height (default: '291px') |
| `width` | `string` | Chart width (default: '100%') |
| `backgroundColor` | `string` | Background color for the chart container (default: `'white'`). Accepts any CSS color value. |
| `legend` | `boolean` | Show legend (auto-enabled when multiple series) |
| `legendPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | Legend position (default: 'top') |
| `yFmt` | `string` | Y-axis value format |
| `xFmt` | `string` | X-axis value format |

### Axis Labels Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `xAxisLabels` | `boolean` | `true` | Show X-axis labels |
| `yAxisLabels` | `boolean` | `true` | Show Y-axis labels |
| `xAxisTitle` | `string \| boolean` | - | X-axis title. Use `true` for auto-title from column name |
| `yAxisTitle` | `string \| boolean` | - | Y-axis title. Use `true` for auto-title from column name |
| `xBaseline` | `boolean` | `true` | Show X-axis baseline |
| `yBaseline` | `boolean` | `false` | Show Y-axis baseline |
| `xGridlines` | `boolean` | `false` | Show X-axis gridlines |
| `yGridlines` | `boolean` | `true` | Show Y-axis gridlines |
| `xTickMarks` | `boolean` | `false` | Show X-axis tick marks |
| `yTickMarks` | `boolean` | `false` | Show Y-axis tick marks |

```vue
<LineChart
  :data="data"
  x="month"
  y="sales"
  :xAxisLabels="true"
  :yAxisLabels="true"
  xAxisTitle="Month"
  yAxisTitle="Sales ($)"
  :yGridlines="true"
/>
```

### Legend Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `boolean` | auto | Show legend. Defaults to `true` when multiple series exist |
| `legendPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position of the legend |

```vue
<!-- Legend at bottom -->
<LineChart
  :data="data"
  x="month"
  :y="['sales', 'orders']"
  :legend="true"
  legendPosition="bottom"
/>

<!-- Legend on the right -->
<BarChart
  :data="data"
  x="month"
  y="sales"
  series="region"
  legendPosition="right"
/>
```

### Export Props

| Prop | Type | Description |
|------|------|-------------|
| `downloadableData` | `boolean` | Enable CSV download (default: true) |
| `downloadableImage` | `boolean` | Enable image download (default: true) |

### Heatmap Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `string` | required | Column for X-axis categories |
| `y` | `string` | required | Column for Y-axis categories |
| `value` | `string` | required | Column for cell values |
| `valueLabels` | `boolean` | `true` | Show values inside heatmap cells |
| `mobileValueLabels` | `boolean` | `false` | Show values on mobile (< 400px width) |
| `zeroDisplay` | `string` | `'—'` | What to display for zero values |
| `colorScale` | `string \| string[]` | `'default'` | Color scale for the heatmap |
| `nullsZero` | `boolean` | `false` | Treat null values as zero |
| `min` | `number` | auto | Override minimum value for color scale |
| `max` | `number` | auto | Override maximum value for color scale |

```vue
<Heatmap
  :data="data"
  x="hour"
  y="day"
  value="visitors"
  title="Website Traffic"
  titleIcon="https://example.com/icon.svg"
  subtitle="Peak Hours Analysis - Shows visitor patterns across weekdays and highlights peak activity periods"
  :valueLabels="true"
  zeroDisplay="0"
  colorScale="blue"
/>
```

## Interactive Features

Structured props for common ECharts interactive features. These provide a cleaner API than raw `echartsOptions` passthrough with full TypeScript support and sensible defaults.

### Zoom (DataZoom)

Enable data zooming with slider or mouse wheel controls.

```vue
<!-- Simple: just enable with true -->
<LineChart :data="data" x="date" y="value" :zoom="true" />

<!-- Detailed configuration -->
<LineChart
  :data="data"
  x="date"
  y="value"
  :zoom="{
    type: 'both',      // 'slider' | 'inside' | 'both'
    axis: 'x',         // 'x' | 'y' | 'both'
    start: 0,          // 0-100 percentage
    end: 50,           // 0-100 percentage
    height: 30         // slider height in pixels
  }"
/>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'slider' \| 'inside' \| 'both'` | `'slider'` | Zoom control type |
| `axis` | `'x' \| 'y' \| 'both'` | `'x'` | Which axis to zoom |
| `start` | `number` | `0` | Start percentage (0-100) |
| `end` | `number` | `100` | End percentage (0-100) |
| `minSpan` | `number` | `1` | Minimum span percentage |
| `maxSpan` | `number` | `100` | Maximum span percentage |
| `showDetail` | `boolean` | `false` | Show detail tooltip when zooming |
| `height` | `number` | `30` | Slider height in pixels |
| `zoomLock` | `boolean` | `false` | Lock zoom range |
| `realtime` | `boolean` | `true` | Update chart in realtime |

### Toolbox

Add a toolbox with save, restore, and zoom controls.

```vue
<!-- Simple: enables saveAsImage + restore -->
<LineChart :data="data" x="date" y="value" :toolbox="true" />

<!-- Full configuration -->
<LineChart
  :data="data"
  x="date"
  y="value"
  :toolbox="{
    position: 'top-right',
    saveAsImage: true,
    dataZoom: true,
    restore: true,
    magicType: { type: ['line', 'bar'] }
  }"
/>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Toolbox position |
| `orient` | `'horizontal' \| 'vertical'` | `'horizontal'` | Icon orientation |
| `iconSize` | `number` | `15` | Icon size in pixels |
| `itemGap` | `number` | `10` | Gap between icons |
| `saveAsImage` | `boolean \| SaveAsImageConfig` | - | Enable save as image |
| `dataZoom` | `boolean` | - | Enable toolbox zoom |
| `restore` | `boolean` | - | Enable restore |
| `dataView` | `boolean \| { readOnly?: boolean }` | - | Enable data view |
| `magicType` | `boolean \| { type: ('line' \| 'bar' \| 'stack')[] }` | - | Enable chart type switching |

### Brush (Selection)

Enable brush selection on scatter plots and other charts.

```vue
<ScatterPlot
  :data="data"
  x="age"
  y="income"
  :brush="{
    type: ['rect', 'polygon'],
    outOfBrush: { opacity: 0.2 }
  }"
/>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `BrushType \| BrushType[]` | All types | Available brush types |
| `defaultType` | `BrushType` | `'rect'` | Default brush type |
| `mode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `toolbox` | `boolean` | `true` | Show brush buttons in toolbox |
| `outOfBrush` | `{ opacity?: number }` | `{ opacity: 0.3 }` | Style for unselected items |

### Animation

Control chart animations.

```vue
<!-- Disable animation -->
<LineChart :data="data" x="date" y="value" :animation="false" />

<!-- Custom animation -->
<LineChart
  :data="data"
  x="date"
  y="value"
  :animation="{
    duration: 2000,
    easing: 'elasticOut'
  }"
/>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable animation |
| `duration` | `number` | `1000` | Initial animation duration (ms) |
| `durationUpdate` | `number` | `500` | Update animation duration (ms) |
| `easing` | `AnimationEasing` | `'cubicOut'` | Easing function |
| `delay` | `number` | `0` | Animation delay (ms) |
| `threshold` | `number` | `2000` | Disable if data count exceeds this |

### Tooltip

Customize tooltip behavior and appearance.

```vue
<LineChart
  :data="data"
  x="date"
  y="value"
  :tooltip="{
    trigger: 'axis',
    axisPointer: 'cross',
    confine: true
  }"
/>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable tooltip |
| `trigger` | `'item' \| 'axis' \| 'none'` | `'axis'` (line/bar), `'item'` (scatter) | Trigger type |
| `axisPointer` | `'line' \| 'shadow' \| 'cross' \| 'none'` | `'shadow'` | Axis pointer style |
| `showSeriesMarker` | `boolean` | `true` | Show series color marker |
| `confine` | `boolean` | `true` | Confine to chart area |
| `followMouse` | `boolean` | `false` | Follow mouse movement |
| `order` | `'asc' \| 'desc' \| 'none'` | `'desc'` | Order of series in tooltip |
| `backgroundColor` | `string` | - | Custom background color |
| `borderColor` | `string` | - | Custom border color |
| `textColor` | `string` | - | Custom text color |

### Complete Example

```vue
<LineChart
  :data="timeSeriesData"
  x="date"
  :y="['revenue', 'cost']"
  title="Revenue & Cost Trend"
  yFmt="usd0k"
  :zoom="{ type: 'both', axis: 'x', start: 0, end: 50 }"
  :toolbox="{ saveAsImage: true, dataZoom: true, restore: true }"
  :animation="{ duration: 2000, easing: 'elasticOut' }"
  :tooltip="{ trigger: 'axis', axisPointer: 'cross' }"
/>
```

### Escape Hatch

The `echartsOptions` prop is still available for edge cases not covered by structured props:

```vue
<LineChart
  :data="data"
  x="date"
  y="value"
  :echartsOptions="{
    /* Any raw ECharts option */
  }"
/>

## Running the Demo

```bash
cd examples/demo-app
npm install
npm run dev
```

## API

### Composables

- `useTheme()` - Theme management
- `useECharts()` - Direct ECharts instance management
- `useFormatting()` - Value formatting utilities
- `useExport()` - Export functionality

### Core Components

- `EChartsBase` - Base ECharts wrapper component
- `ChartProvider` - Context provider for nested components
- `ChartFooter` - Download buttons component

## License

MIT
