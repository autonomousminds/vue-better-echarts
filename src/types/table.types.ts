/**
 * Type definitions for the DataTable component
 */

import type { FormatObject, ColumnUnitSummary } from './formatting.types';

// ============================================================================
// Content Types
// ============================================================================

export type ColumnContentType =
  | 'link'
  | 'image'
  | 'delta'
  | 'bar'
  | 'sparkline'
  | 'sparkbar'
  | 'sparkarea'
  | 'colorscale'
  | 'html';

export type AggregationType =
  | 'sum'
  | 'min'
  | 'max'
  | 'mean'
  | 'median'
  | 'count'
  | 'countDistinct'
  | 'weightedMean';

export type GroupType = 'accordion' | 'section';

export type GroupNamePosition = 'middle' | 'top' | 'bottom';

// ============================================================================
// Column Configuration (registered by <Column> child components)
// ============================================================================

export interface TableColumnConfig {
  /** Internal unique identifier for this Column instance */
  identifier: symbol;
  /** Column key in data */
  id: string;
  /** Custom header title */
  title?: string;
  /** Column description shown as tooltip */
  description?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Allow text wrapping */
  wrap?: boolean;
  /** Allow title wrapping */
  wrapTitle?: boolean;

  // Content type
  contentType?: ColumnContentType;

  // Image
  height?: string;
  width?: string;
  alt?: string;

  // Links
  openInNewTab?: boolean;
  linkLabel?: string;

  // Formatting
  fmt?: string;
  fmtColumn?: string;

  // Totals
  totalAgg?: AggregationType | string;
  totalFmt?: string;
  weightCol?: string;

  // Subtotals
  subtotalFmt?: string;

  // Color Scale
  colorMax?: number;
  colorMin?: number;
  colorMid?: number;
  colorBreakpoints?: number[];
  colorScale?: string | string[];
  scaleColumn?: string;

  // Delta
  downIsGood?: boolean;
  showValue?: boolean;
  deltaSymbol?: boolean;
  neutralMin?: number;
  neutralMax?: number;
  chip?: boolean;
  symbolPosition?: 'left' | 'right';
  deltaText?: string;

  // Sparkline
  sparkWidth?: number;
  sparkHeight?: number;
  sparkColor?: string;
  sparkX?: string;
  sparkY?: string;
  sparkYScale?: boolean;
  interactive?: boolean;
  valueFmt?: string;
  dateFmt?: string;

  // Bar
  barColor?: string;
  negativeBarColor?: string;
  backgroundColor?: string;
  hideLabels?: boolean;

  // Column groups
  colGroup?: string;

  // Negative value styling
  redNegatives?: boolean;
}

// ============================================================================
// Column Summary (computed from data)
// ============================================================================

export interface ColumnSummaryItem {
  id: string;
  title: string;
  type: string;
  format?: FormatObject;
  columnUnitSummary?: ColumnUnitSummary;
}

// ============================================================================
// Sort State
// ============================================================================

export interface SortState {
  col: string | null;
  ascending: boolean;
}

// ============================================================================
// DataTable Props
// ============================================================================

export type EmptySetBehavior = 'error' | 'warn' | 'pass';

export interface DataTableProps {
  /** Array of data objects to display */
  data: Record<string, unknown>[];
  /** Number of rows per page, or "all" to disable pagination */
  rows?: number | 'all';
  /** Table title */
  title?: string;
  /** Title icon URL displayed above the title */
  titleIcon?: string;
  /** Table subtitle */
  subtitle?: string;
  /** Show row numbers */
  rowNumbers?: boolean;
  /** Default sort: "columnName" or "columnName desc" */
  sort?: string;
  /** Column to group by */
  groupBy?: string;
  /** Whether groups start open */
  groupsOpen?: boolean;
  /** Group display type */
  groupType?: GroupType;
  /** Show subtotals for groups */
  subtotals?: boolean;
  /** Enable search */
  search?: boolean;
  /** Enable column sorting */
  sortable?: boolean;
  /** Show download button */
  downloadable?: boolean;
  /** Show total row */
  totalRow?: boolean;
  /** Column containing link URLs for row navigation */
  link?: string;
  /** Show the link column in the table (default: false — hidden when link is set) */
  showLinkCol?: boolean;
  /** Behavior when data is empty: "error" shows error, "warn" shows warning, "pass" renders nothing */
  emptySet?: EmptySetBehavior;
  /** Custom message for empty data (default: "No records") */
  emptyMessage?: string;
  /** Table-level subtotal format, used as fallback when Column doesn't set subtotalFmt */
  subtotalFmt?: string;

  // Styling
  /** Alternate row shading */
  rowShading?: boolean;
  /** Show row border lines */
  rowLines?: boolean;
  /** Wrap column titles */
  wrapTitles?: boolean;
  /** Format column titles (e.g., snake_case → Title Case) */
  formatColumnTitles?: boolean;
  /** Compact mode */
  compact?: boolean;

  // Colors
  /** Header background color */
  headerColor?: string;
  /** Header text color */
  headerFontColor?: string;
  /** Table background color */
  backgroundColor?: string;
  /** Total row background color */
  totalRowColor?: string;
  /** Total row text color */
  totalFontColor?: string;
  /** Subtotal row background color */
  subtotalRowColor?: string;
  /** Subtotal row text color */
  subtotalFontColor?: string;
  /** Accordion group row background color */
  accordionRowColor?: string;
  /** Position of group name in section mode */
  groupNamePosition?: GroupNamePosition;
}

// ============================================================================
// Column Props (public props of <Column> component)
// ============================================================================

export interface ColumnProps {
  /** Column key in data (required) */
  id: string;
  /** Custom header title */
  title?: string;
  /** Description shown as tooltip */
  description?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Allow text wrapping */
  wrap?: boolean;
  /** Allow title wrapping */
  wrapTitle?: boolean;
  /** Content type for rendering */
  contentType?: ColumnContentType;
  /** Format string (Excel-style or format name) */
  fmt?: string;
  /** Column name containing per-row format strings */
  fmtColumn?: string;
  /** Aggregation type for totals */
  totalAgg?: AggregationType | string;
  /** Format string for totals */
  totalFmt?: string;
  /** Column for weighted mean calculations */
  weightCol?: string;
  /** Format string for subtotals */
  subtotalFmt?: string;

  // Image
  height?: string;
  width?: string;
  alt?: string;

  // Link
  openInNewTab?: boolean;
  linkLabel?: string;

  // Color Scale
  colorMax?: number;
  colorMin?: number;
  colorMid?: number;
  colorBreakpoints?: number[];
  colorScale?: string | string[];
  scaleColumn?: string;

  // Delta
  downIsGood?: boolean;
  showValue?: boolean;
  deltaSymbol?: boolean;
  neutralMin?: number;
  neutralMax?: number;
  chip?: boolean;
  /** Symbol position: 'left' or 'right' (default: 'right') */
  symbolPosition?: 'left' | 'right';
  /** Trailing text label displayed after the delta value */
  deltaText?: string;

  // Sparkline
  sparkWidth?: number;
  sparkHeight?: number;
  sparkColor?: string;
  sparkX?: string;
  sparkY?: string;
  sparkYScale?: boolean;
  /** Enable hover tooltip on sparkline */
  interactive?: boolean;
  /** Format string for tooltip values */
  valueFmt?: string;
  /** Format string for tooltip dates */
  dateFmt?: string;

  // Bar
  barColor?: string;
  negativeBarColor?: string;
  backgroundColor?: string;
  hideLabels?: boolean;

  // Column Groups
  colGroup?: string;

  // Styling
  redNegatives?: boolean;
}
