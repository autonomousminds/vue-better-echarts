/**
 * BigValue component types
 */

export interface BigValueProps {
  /** Data array */
  data: Record<string, unknown>[];

  /** Column name for the main value to display */
  value: string;

  /** Column name for the comparison value */
  comparison?: string;

  /** Whether to show comparison as delta indicator (true) or plain value (false) */
  comparisonDelta?: boolean;

  /** Column name for the sparkline date/x-axis */
  sparkline?: string;

  /** Sparkline chart type */
  sparklineType?: 'line' | 'area' | 'bar';

  /** Sparkline color override */
  sparklineColor?: string;

  /** Format string for sparkline tooltip values */
  sparklineValueFmt?: string;

  /** Format string for sparkline tooltip dates */
  sparklineDateFmt?: string;

  /** Whether to scale sparkline y-axis to data range */
  sparklineYScale?: boolean;

  /** Group name for connected sparkline tooltips */
  connectGroup?: string;

  /** Format string for main value */
  fmt?: string;

  /** Format string for comparison value */
  comparisonFmt?: string;

  /** Title text (defaults to formatted column name) */
  title?: string;

  /** Subtitle text displayed below the title */
  subtitle?: string;

  /** Comparison label text (defaults to formatted column name) */
  comparisonTitle?: string;

  /** Whether negative changes should be colored green */
  downIsGood?: boolean;

  /** Minimum value for neutral range */
  neutralMin?: number;

  /** Maximum value for neutral range */
  neutralMax?: number;

  /** CSS max-width */
  maxWidth?: string;

  /** CSS min-width */
  minWidth?: string;

  /** URL to link the value to */
  link?: string;

  /** Description text shown as info tooltip */
  description?: string;

  /** CSS class for the title */
  titleClass?: string;

  /** CSS class for the value */
  valueClass?: string;

  /** CSS class for the comparison */
  comparisonClass?: string;
}
