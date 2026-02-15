# Vue Better BI

A Vue 3 charting library built on Apache ECharts and Leaflet.js with advanced formatting, theming, and export capabilities.

> This library was inspired by [evidence.dev](https://evidence.dev) charts.

## Features

- **18 Chart Types**: Bar, Line, Area, Scatter, Bubble, Box Plot, Histogram, Funnel, Pie, Heatmap, Calendar Heatmap, Sankey, Waterfall, US Map, Area Map, Point Map, Bubble Map
- **BigValue Component**: KPI metric display with formatted value, sparkline chart, and comparison delta indicator
- **Interactive Maps**: PointMap and BubbleMap use Leaflet.js with CartoDB tile basemaps — real zoomable maps down to street level (dynamically loaded, no bundle bloat)
- **DataTable Component**: Full-featured data table with sorting, pagination, search, grouping, totals, column formatting, and rich content types (bars, deltas, sparklines, color scales)
- **100+ Built-in Formats**: Currencies (USD, EUR, GBP, etc.), dates, numbers, percentages with automatic scaling (k, M, B, T)
- **Light/Dark Theme Support**: Automatic system detection with manual toggle
- **Export Options**: PNG, JPEG, CSV download and clipboard copy
- **TypeScript Support**: Full type definitions included
- **Reference Components**: Add reference lines, areas, and points to charts

## Installation
```bash
npm install @autonomousminds-public/vue-better-bi echarts
```

## Quick Start

```vue
<script setup>
import { BarChart, LineChart, useTheme } from '@autonomousminds-public/vue-better-bi';

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
| `PieChart` | Pie and donut charts with configurable labels and legend |

> **Note:** `ScatterPlot` and `BubbleChart` both use ECharts' scatter series. `BubbleChart` adds a `size` prop that maps a data column to point sizes (`minSize`–`maxSize`), making it a scatter plot with a third dimension.

### Specialized Charts

| Component | Description |
|-----------|-------------|
| `Heatmap` | 2D heatmap with color scales |
| `CalendarHeatmap` | Calendar-based heatmap for time series |
| `SankeyDiagram` | Flow visualization |
| `WaterfallChart` | Accumulative or bridge waterfall with positive/negative breakdown |

### Maps

| Component | Engine | Description |
|-----------|--------|-------------|
| `PointMap` | Leaflet | Point markers at lat/long coordinates on an interactive tile basemap |
| `BubbleMap` | Leaflet | Sized bubble markers at lat/long coordinates on an interactive tile basemap |
| `USMap` | ECharts | US state choropleth map |
| `AreaMap` | ECharts | Custom GeoJSON choropleth map |

> **Note:** `PointMap` and `BubbleMap` use [Leaflet.js](https://leafletjs.com/) with CartoDB tile basemaps, providing real interactive maps with smooth zoom down to street level. Leaflet is dynamically imported and only loaded when a map component renders. `USMap` and `AreaMap` use ECharts.

### Data Table

| Component | Description |
|-----------|-------------|
| `DataTable` | Full-featured data table with sorting, pagination, search, grouping, and rich column content types |
| `Column` | Declarative column configuration for DataTable (renderless) |

### Value Components

| Component | Description |
|-----------|-------------|
| `BigValue` | KPI metric display with sparkline, comparison delta, and percent/absolute toggle |

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
import { useTheme } from '@autonomousminds-public/vue-better-bi';

const {
  activeAppearance,    // Current theme: 'light' | 'dark'
  selectedAppearance,  // User preference: 'light' | 'dark' | 'system'
  setAppearance,       // Set preference
  cycleAppearance,     // Cycle through options
  resolveColor,        // Resolve color for current theme
  resolveColorPalette  // Get color palette
} = useTheme();
```

### Pre-built Themes

Apply a complete theme preset with a single call:

```typescript
import { applyPreset } from '@autonomousminds-public/vue-better-bi';

applyPreset('midnight');
```

Available presets:

| Preset | Description |
|--------|-------------|
| `sandstone` | Warm earth tones — browns, tans, and sandy hues |
| `midnight` | Dark theme with vibrant purple, cyan, and pink accents |
| `evergreen` | Natural greens and teals |
| `grayscale` | Monochromatic black and white |
| `spectrum` | Scientific color gradient from deep blue to bright yellow |
| `vintage` | Bold retro primary colors on paper-white background |

You can also start from a preset and customize further:

```typescript
import { themePresets, configureThemes } from '@autonomousminds-public/vue-better-bi';

const custom = {
  light: {
    ...themePresets.midnight.light,
    colors: { ...themePresets.midnight.light.colors, 'base-100': '#1a1a2e' }
  },
  dark: themePresets.midnight.dark
};
configureThemes(custom);
```

### Custom Themes

```typescript
import { configureThemes } from '@autonomousminds-public/vue-better-bi';

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

### Secondary Y-Axis (Dual Axis)

Add a secondary Y-axis to overlay different scales or chart types. Supported by BarChart, LineChart, and AreaChart.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `y2` | `string \| string[]` | - | Column(s) for secondary Y-axis |
| `y2SeriesType` | `'line' \| 'bar'` | `'line'` | Chart type for Y2 series |
| `y2Fmt` | `string` | - | Format for Y2 axis values |
| `y2AxisTitle` | `string \| boolean` | - | Secondary axis title |
| `y2AxisLabels` | `boolean` | `true` | Show Y2 axis labels |
| `y2Gridlines` | `boolean` | `false` | Show Y2 gridlines |
| `y2Baseline` | `boolean` | `false` | Show Y2 baseline |
| `y2TickMarks` | `boolean` | `false` | Show Y2 tick marks |
| `y2Min` / `y2Max` | `number` | - | Y2 axis range |
| `y2Scale` | `boolean` | `false` | Auto-scale Y2 to fit data |
| `yAxisColor` | `ColorInput` | auto | Primary Y-axis color (auto-matches first series color when Y2 is present) |
| `y2AxisColor` | `ColorInput` | auto | Secondary Y-axis color (auto-matches first Y2 series color) |

When a secondary axis is present, both axes automatically color their labels and titles to match their respective series colors. This provides a clear visual link between each axis and its data. You can override with a custom color or set to `'false'` to disable.

```vue
<!-- Bar chart with line overlay on secondary axis -->
<BarChart
  :data="data"
  x="month"
  y="revenue"
  y2="profit_margin"
  y2SeriesType="line"
  yAxisTitle="Revenue"
  y2AxisTitle="Profit Margin"
  yFmt="usd0"
  y2Fmt="pct1"
/>

<!-- Custom axis colors -->
<LineChart
  :data="data"
  x="month"
  y="temperature"
  y2="rainfall"
  yAxisColor="#e74c3c"
  y2AxisColor="#3498db"
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

### Pie Chart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | required | Data array |
| `name` | `string` | first column | Column for slice labels |
| `value` | `string` | second column | Column for slice values |
| `donut` | `boolean` | `false` | Render as donut chart (inner radius 50%) |
| `innerRadius` | `string \| number` | - | Custom inner radius (e.g. `'40%'`). Overrides `donut` default |
| `labels` | `boolean` | `true` | Show labels on slices |
| `labelPosition` | `'inside' \| 'outside'` | `'outside'` | Where to render labels |
| `showPercent` | `boolean` | `true` | Show percentage in labels and tooltip |
| `legendPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Legend position (pie auto-adjusts to avoid overlap) |
| `valueFmt` | `string` | - | Format for values in tooltip |
| `percentFmt` | `string` | `'pct1'` | Format for percentages |
| `colorPalette` | `string \| string[]` | `'default'` | Color palette for slices |

```vue
<!-- Basic pie chart -->
<PieChart
  :data="data"
  name="category"
  value="revenue"
  title="Revenue by Category"
  valueFmt="usd0k"
/>

<!-- Donut chart with inside labels -->
<PieChart
  :data="data"
  name="category"
  value="revenue"
  title="Revenue Breakdown"
  :donut="true"
  labelPosition="inside"
  legendPosition="right"
/>

<!-- Custom inner radius -->
<PieChart
  :data="data"
  name="category"
  value="revenue"
  :donut="true"
  innerRadius="30%"
/>
```

### Waterfall Chart Props

Two waterfall types are supported via `waterfallType`:

- **Accumulative** (default) — Each bar is an incremental change from zero. A running total builds up across all bars, with an optional auto-total at the end.
- **Bridge** — Starts and ends with explicit total bars (full bars from zero), with incremental +/- changes floating in between. Requires a `totalColumn` to mark which rows are totals.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | required | Data array |
| `x` | `string` | required | Column for category labels |
| `y` | `string` | required | Column for values (positive = increase, negative = decrease) |
| `waterfallType` | `'accumulative' \| 'bridge'` | `'accumulative'` | Waterfall chart type |
| `totalColumn` | `string` | - | Column name that marks rows as totals (boolean column). Required for bridge mode |
| `positiveColor` | `ColorInput` | `'#4CAF50'` | Color for increase bars |
| `negativeColor` | `ColorInput` | `'#F44336'` | Color for decrease bars |
| `totalColor` | `ColorInput` | `'#2196F3'` | Color for total/subtotal bars |
| `showTotal` | `boolean` | `true` (accumulative), `false` (bridge) | Auto-add a total bar at the end |
| `totalLabel` | `string` | `'Total'` | Label for the auto-total bar |
| `labels` | `boolean` | `false` | Show value labels on bars |
| `labelPosition` | `'top' \| 'inside'` | `'top'` | Label position |
| `connectorLines` | `boolean` | `true` | Show dashed lines connecting bar tops |
| `connectorLineType` | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Connector line style |
| `fillOpacity` | `number` | `1` | Bar fill opacity (0-1) |

```vue
<!-- Accumulative: P&L breakdown -->
<WaterfallChart
  :data="plData"
  x="category"
  y="amount"
  title="Profit & Loss"
  yFmt="usd0k"
  :labels="true"
  totalLabel="Net Income"
/>

<!-- Bridge: Q1 → changes → Q2 -->
<WaterfallChart
  :data="bridgeData"
  x="category"
  y="amount"
  waterfallType="bridge"
  totalColumn="isTotal"
  title="Revenue Bridge Q1 → Q2"
  yFmt="usd0k"
/>
```

## DataTable

A full-featured data table component with sorting, pagination, search, grouping, totals, and rich column content types.

### Basic Usage

```vue
<script setup>
import { DataTable } from '@autonomousminds-public/vue-better-bi';

const data = [
  { name: 'Alice', department: 'Engineering', salary: 125000, change: 0.08 },
  { name: 'Bob', department: 'Marketing', salary: 95000, change: -0.03 },
  { name: 'Carol', department: 'Engineering', salary: 142000, change: 0.12 },
  { name: 'Dave', department: 'Sales', salary: 88000, change: 0.05 },
];
</script>

<template>
  <!-- Auto-generates columns from data keys -->
  <DataTable :data="data" title="Team Directory" />
</template>
```

### Custom Columns

Use `<Column>` children to control which columns appear, their order, formatting, and content types:

```vue
<script setup>
import { DataTable, Column } from '@autonomousminds-public/vue-better-bi';
</script>

<template>
  <DataTable :data="data" title="Team Compensation" :search="true">
    <Column id="name" title="Employee" />
    <Column id="department" />
    <Column id="salary" fmt="usd0" totalAgg="mean" />
    <Column id="change" contentType="delta" fmt="pct1" />
  </DataTable>
</template>
```

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Record<string, unknown>[]` | required | Data array |
| `rows` | `number \| 'all'` | `10` | Rows per page. Use `'all'` to disable pagination |
| `title` | `string` | - | Table title |
| `subtitle` | `string` | - | Subtitle below the title |
| `search` | `boolean` | `false` | Enable search bar |
| `sortable` | `boolean` | `true` | Allow column header click to sort |
| `sort` | `string` | - | Default sort: `"column"` or `"column desc"` |
| `downloadable` | `boolean` | `true` | Show CSV download button |
| `rowNumbers` | `boolean` | `false` | Show row index numbers |
| `totalRow` | `boolean` | `false` | Show summary total row |
| `compact` | `boolean` | `false` | Reduce padding and font size |
| `rowShading` | `boolean` | `false` | Alternate row background shading |
| `rowLines` | `boolean` | `true` | Show borders between rows |
| `wrapTitles` | `boolean` | `false` | Allow column titles to wrap |
| `formatColumnTitles` | `boolean` | `true` | Auto-format titles from `snake_case` to `Title Case` |
| `link` | `string` | - | Column containing URL to make rows clickable |
| `showLinkCol` | `boolean` | `false` | Show the link column (hidden by default) |
| `emptySet` | `'error' \| 'warn' \| 'pass'` | `'error'` | Empty data behavior |
| `emptyMessage` | `string` | `'No records'` | Message shown when data is empty |

#### Grouping Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `groupBy` | `string` | - | Column to group rows by |
| `groupType` | `'accordion' \| 'section'` | `'accordion'` | Group display mode |
| `groupsOpen` | `boolean` | `true` | Whether groups start expanded |
| `subtotals` | `boolean` | `false` | Show subtotal row per group |
| `subtotalFmt` | `string` | - | Table-level format for all subtotals (fallback) |
| `groupNamePosition` | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Group name position in section mode |

#### Color Props

| Prop | Type | Description |
|------|------|-------------|
| `headerColor` | `string` | Header background color |
| `headerFontColor` | `string` | Header text color |
| `backgroundColor` | `string` | Table background color |
| `totalRowColor` | `string` | Total row background color |
| `totalFontColor` | `string` | Total row text color |
| `accordionRowColor` | `string` | Accordion group header background |
| `subtotalRowColor` | `string` | Subtotal row background |
| `subtotalFontColor` | `string` | Subtotal row text color |

### Column Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Column key in data |
| `title` | `string` | auto | Display title (defaults to formatted `id`) |
| `description` | `string` | - | Tooltip shown on hover over column header |
| `align` | `'left' \| 'center' \| 'right'` | auto | Cell alignment (auto-detected from data type) |
| `fmt` | `string` | auto | Format string (e.g. `'usd0'`, `'pct1'`, `'num2'`) |
| `fmtColumn` | `string` | - | Column containing per-row format strings |
| `contentType` | `string` | - | Rich content type (see below) |
| `totalAgg` | `string` | - | Aggregation for total row: `sum`, `mean`, `median`, `min`, `max`, `count`, `countDistinct`, `weightedMean` |
| `totalFmt` | `string` | - | Format for total row value |
| `subtotalFmt` | `string` | - | Format for subtotal row value |
| `weightCol` | `string` | - | Weight column for `weightedMean` aggregation |
| `wrap` | `boolean` | `false` | Allow cell content to wrap |
| `wrapTitle` | `boolean` | `false` | Allow column title to wrap |
| `colGroup` | `string` | - | Group columns under a shared header |
| `redNegatives` | `boolean` | `false` | Show negative values in red |

### Column Content Types

#### Bar (`contentType="bar"`)

Renders a horizontal bar in the cell background proportional to the value.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `barColor` | `string` | `'#a5cdee'` | Positive bar color |
| `negativeBarColor` | `string` | `'#fca5a5'` | Negative bar color |
| `backgroundColor` | `string` | `'transparent'` | Bar track background |
| `hideLabels` | `boolean` | `false` | Hide value labels |

```vue
<Column id="revenue" contentType="bar" fmt="usd0k" barColor="#4ade80" />
```

#### Delta (`contentType="delta"`)

Shows a value with an up/down indicator and configurable styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `downIsGood` | `boolean` | `false` | Flip colors (green for negative) |
| `showValue` | `boolean` | `true` | Show the numeric value |
| `deltaSymbol` | `boolean` | `true` | Show up/down arrow |
| `symbolPosition` | `'left' \| 'right'` | `'right'` | Arrow position relative to value |
| `neutralMin` | `number` | `0` | Values above this are neutral |
| `neutralMax` | `number` | `0` | Values below this are neutral |
| `chip` | `boolean` | `false` | Render as a colored chip/badge |
| `deltaText` | `string` | - | Trailing label (e.g. `"vs. prev month"`) |

```vue
<Column id="change" contentType="delta" fmt="pct1" downIsGood chip />
```

#### Color Scale (`contentType="colorscale"`)

Colors the cell background based on the value using a gradient scale.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colorScale` | `string \| string[]` | `'default'` | Color scale: named preset (`'default'`, `'positive'`, `'negative'`, `'info'`) or array of hex colors |
| `colorMin` | `number` | auto | Override minimum value |
| `colorMax` | `number` | auto | Override maximum value |
| `colorMid` | `number` | - | Midpoint for diverging scales |
| `colorBreakpoints` | `number[]` | - | Custom breakpoints |
| `scaleColumn` | `string` | - | Use another column's values for the scale |

```vue
<Column id="score" contentType="colorscale" colorScale="positive" />
```

#### Sparkline / Sparkbar / Sparkarea

Renders a mini chart inside the cell from array data.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sparkX` | `string` | - | Key for X values in the array data |
| `sparkY` | `string` | - | Key for Y values in the array data |
| `sparkColor` | `string` | - | Line/bar/area color |
| `sparkWidth` | `number` | `50` | Chart width in pixels |
| `sparkHeight` | `number` | `15` | Chart height in pixels |
| `sparkYScale` | `boolean` | `false` | Include zero in Y scale |
| `interactive` | `boolean` | `false` | Enable hover tooltip |
| `valueFmt` | `string` | - | Tooltip value format |
| `dateFmt` | `string` | - | Tooltip date format |

```vue
<Column id="trend" contentType="sparkline" sparkColor="#6366f1" :interactive="true" />
```

#### Link (`contentType="link"`)

Renders the cell value as a clickable hyperlink.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `linkLabel` | `string` | - | Static label text (overrides cell value) |
| `openInNewTab` | `boolean` | `false` | Open link in new tab |

#### Image (`contentType="image"`)

Renders the cell value as an image URL.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string` | - | Image height |
| `width` | `string` | - | Image width |
| `alt` | `string` | - | Alt text |

#### HTML (`contentType="html"`)

Renders the cell value as raw HTML.

### Grouping Example

```vue
<DataTable
  :data="data"
  groupBy="department"
  groupType="accordion"
  :subtotals="true"
  :groupsOpen="true"
  accordionRowColor="#f8fafc"
>
  <Column id="name" />
  <Column id="department" />
  <Column id="salary" fmt="usd0" totalAgg="sum" />
</DataTable>
```

### Total Row Example

```vue
<DataTable :data="data" :totalRow="true" totalRowColor="#f0fdf4">
  <Column id="product" />
  <Column id="revenue" fmt="usd0" totalAgg="sum" />
  <Column id="margin" fmt="pct1" totalAgg="mean" />
  <Column id="growth" contentType="delta" fmt="pct1" totalAgg="mean" />
</DataTable>
```

## BigValue

A KPI metric display component for showing a single highlighted value with an optional sparkline trend chart and comparison delta indicator.

The comparison column holds the **raw comparison value** (e.g. previous period's revenue), and the component automatically computes the percentage or absolute change. Click the comparison area to toggle between display modes.

### Basic Usage

```vue
<script setup>
import { BigValue } from '@autonomousminds-public/vue-better-bi';

const data = [
  { date: '2025-01-01', revenue: 48500, previous_revenue: 43200 },
  { date: '2025-01-02', revenue: 49200, previous_revenue: 44100 },
  // ... 30 days of data
];
</script>

<template>
  <BigValue
    :data="data"
    value="revenue"
    title="Monthly Revenue"
    fmt="usd0"
  />
</template>
```

### With Sparkline and Comparison

```vue
<BigValue
  :data="data"
  value="revenue"
  comparison="previous_revenue"
  sparkline="date"
  title="Revenue"
  subtitle="Last 30 days"
  fmt="usd0"
/>
```

This renders:
- **Title** and optional **subtitle** (same style as chart headers)
- **Large formatted value** from the first row of data
- **Sparkline** showing the trend over time (line, area, or bar)
- **Comparison delta** with directional arrow and color coding (e.g. `▲ 12.3%`)
- **Clickable toggle** — click the comparison area to switch between percentage and absolute change

### BigValue Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | required | Data array |
| `value` | `string` | required | Column name for the main display value |
| `title` | `string` | auto | Title text (defaults to formatted column name) |
| `subtitle` | `string` | - | Subtitle text below the title |
| `fmt` | `string` | - | Format string for the main value (e.g. `'usd0'`, `'num2'`) |
| `link` | `string` | - | URL to make the value clickable |
| `minWidth` | `string` | `'18%'` | CSS min-width |
| `maxWidth` | `string` | `'none'` | CSS max-width |

#### Comparison Props

The `comparison` column should contain the **raw comparison value** (e.g. previous period's revenue). The component computes the delta automatically:
- **Percent mode**: `(value - comparison) / |comparison|` — displayed as `▲ 12.3%`
- **Absolute mode**: `value - comparison` — displayed as `▲ 5,234`

Click the comparison area to toggle between modes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `comparison` | `string` | - | Column name for the raw comparison value |
| `comparisonDelta` | `boolean` | `true` | Show as computed delta indicator (`true`) or plain value (`false`) |
| `comparisonDisplay` | `'percent' \| 'absolute'` | `'percent'` | Default display mode for the delta (clickable to toggle) |
| `comparisonFmt` | `string` | - | Format string for comparison value (used in absolute mode and non-delta display) |
| `comparisonTitle` | `string` | auto | Label text (defaults to formatted column name) |
| `downIsGood` | `boolean` | `false` | Invert colors (green for negative values) |
| `neutralMin` | `number` | `0` | Minimum threshold for neutral range |
| `neutralMax` | `number` | `0` | Maximum threshold for neutral range |

#### Sparkline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sparkline` | `string` | - | Column name for sparkline date/x-axis |
| `sparklineType` | `'line' \| 'area' \| 'bar'` | `'line'` | Sparkline chart type |
| `sparklineColor` | `string` | - | Sparkline color override |
| `sparklineYScale` | `boolean` | `false` | Scale sparkline y-axis to data range |
| `sparklineValueFmt` | `string` | - | Format for sparkline tooltip values |
| `sparklineDateFmt` | `string` | - | Format for sparkline tooltip dates |
| `connectGroup` | `string` | - | Group name to link sparkline tooltips across multiple BigValues |

### Examples

```vue
<!-- Simple KPI -->
<BigValue :data="data" value="revenue" fmt="usd0" />

<!-- With all features (defaults to percent mode, click to toggle) -->
<BigValue
  :data="data"
  value="revenue"
  comparison="previous_revenue"
  sparkline="date"
  title="Monthly Revenue"
  subtitle="Compared to previous period"
  fmt="usd0"
  sparklineType="area"
  sparklineColor="#3366cc"
  :sparklineYScale="true"
/>

<!-- Start in absolute mode -->
<BigValue
  :data="data"
  value="revenue"
  comparison="previous_revenue"
  comparisonDisplay="absolute"
  fmt="usd0"
/>

<!-- Down is good (e.g. costs, churn) -->
<BigValue
  :data="data"
  value="churn_rate"
  comparison="previous_churn_rate"
  fmt="pct1"
  :downIsGood="true"
/>

<!-- Plain comparison (no delta computation, no toggle) -->
<BigValue
  :data="data"
  value="revenue"
  comparison="target"
  :comparisonDelta="false"
  comparisonTitle="vs. target"
  fmt="usd0"
/>

<!-- Linked sparklines (shared tooltip) -->
<BigValue :data="data" value="revenue" sparkline="date" connectGroup="kpis" />
<BigValue :data="data" value="orders" sparkline="date" connectGroup="kpis" />
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

## Interactive Playground

The library includes a full interactive playground app for exploring every chart type and prop. It serves as both a demo and a tutorial for learning the API.

### Features

- **All 17 chart types** with live rendering and sample data
- **Complete prop controls** — every prop for every chart type is adjustable via the settings panel (toggles, sliders, dropdowns, color pickers, number inputs)
- **Three view modes**:
  - **Chart** — live rendered chart that updates as you change settings
  - **Code** — auto-generated Vue SFC that reproduces the current configuration (copy-paste ready)
  - **Data** — table view of the sample dataset powering the chart
- **Grouped settings** — props organized into collapsible sections (Chart-Specific, Titles, Axes, Display, Formatting, Zoom, Toolbox, Animation, Tooltip, Export)
- **Theme support** — light/dark toggle and theme preset selector
- **URL hash sync** — bookmark any chart type directly (e.g. `#scatter-plot`)

### Running the Playground

```bash
cd examples/demo-app
npm install
npm run dev
```

### Layout

The playground uses a three-panel layout:

| Panel | Description |
|-------|-------------|
| **Left sidebar** | Chart type selector grouped by category (Standard, Statistical, Part-to-Whole, Relational, Maps) with search filter |
| **Center area** | Chart/Code/Data tabs with chart info header |
| **Right panel** | Settings panel with all props for the selected chart type |

## Maps

### PointMap

Renders point markers at lat/long coordinates on an interactive Leaflet tile basemap. Works with any data that has latitude and longitude columns — cities, countries, addresses, etc.

```vue
<PointMap
  :data="data"
  lat="latitude"
  long="longitude"
  name="country"
  value="gdp"
  valueFmt="usd0k"
  title="GDP by Country"
  pointColor="#e63946"
  :pointSize="10"
  :pointOpacity="0.8"
/>
```

#### PointMap Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | required | Data array |
| `lat` | `string` | required | Column name for latitude values |
| `long` | `string` | required | Column name for longitude values |
| `name` | `string` | - | Column name for point labels (shown in tooltip) |
| `value` | `string` | - | Column name for point values (shown in tooltip) |
| `valueFmt` | `string` | - | Format string for values |
| `title` | `string` | - | Chart title |
| `subtitle` | `string` | - | Chart subtitle |
| `height` | `string` | `'500px'` | Map height |
| `width` | `string` | `'100%'` | Map width |
| `basemap` | `string` | CartoDB Light | Tile layer URL template |
| `pointColor` | `ColorInput` | `'#3366cc'` | Marker fill color |
| `pointOpacity` | `number` | `0.8` | Marker fill opacity (0-1) |
| `pointSize` | `number` | `8` | Marker radius in pixels |
| `borderColor` | `string` | `'#fff'` | Marker border color |
| `borderWidth` | `number` | `1` | Marker border width |
| `tooltipType` | `'hover' \| 'click'` | `'hover'` | Tooltip trigger mode |
| `startingLat` | `number` | - | Initial map center latitude |
| `startingLong` | `number` | - | Initial map center longitude |
| `startingZoom` | `number` | - | Initial map zoom level |

### BubbleMap

Like PointMap but with a `size` column that scales marker radius, useful for showing magnitude (population, revenue, etc.).

```vue
<BubbleMap
  :data="data"
  lat="latitude"
  long="longitude"
  name="country"
  value="gdp"
  size="population"
  sizeFmt="num0k"
  title="World Population"
  :minSize="5"
  :maxSize="40"
  :pointOpacity="0.6"
/>
```

#### BubbleMap Props

Inherits all PointMap props, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | required | Column name for bubble size values |
| `sizeFmt` | `string` | - | Format string for size values in tooltip |
| `minSize` | `number` | `5` | Minimum bubble radius in pixels |
| `maxSize` | `number` | `40` | Maximum bubble radius in pixels |

### Custom Basemaps

Both `PointMap` and `BubbleMap` accept a `basemap` prop for custom tile layers:

```vue
<!-- OpenStreetMap -->
<PointMap
  :data="data"
  lat="lat"
  long="long"
  basemap="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<!-- CartoDB Dark -->
<PointMap
  :data="data"
  lat="lat"
  long="long"
  basemap="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>
```

## API

### Composables

- `useTheme()` - Theme management
- `useECharts()` - Direct ECharts instance management
- `useLeafletMap()` - Leaflet map lifecycle management (used internally by PointMap/BubbleMap)
- `useFormatting()` - Value formatting utilities
- `useExport()` - Export functionality

### Core Components

- `EChartsBase` - Base ECharts wrapper component
- `ChartProvider` - Context provider for nested components
- `ChartFooter` - Download buttons component

### Table Components

- `DataTable` - Full-featured data table with sorting, pagination, search, grouping, totals, and rich content types
- `Column` - Declarative column configuration (renderless, used as child of DataTable)

### Value Components

- `BigValue` - KPI metric display with formatted value, sparkline chart, and comparison delta with percent/absolute toggle

## License

MIT
