import type { PropDefinition } from '../../types/playground.types';
import { formatOptions } from './baseChartProps';

export const bigValueProps: PropDefinition[] = [
  // Core
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Core' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Core' },
  { name: 'fmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Core', options: formatOptions },
  { name: 'link', label: 'Link URL', control: 'text', defaultValue: '', group: 'Core' },
  { name: 'minWidth', label: 'Min Width', control: 'text', defaultValue: '18%', group: 'Core' },
  { name: 'maxWidth', label: 'Max Width', control: 'text', defaultValue: 'none', group: 'Core' },

  // Comparison
  { name: 'comparisonDelta', label: 'Show as Delta', control: 'checkbox', defaultValue: true, group: 'Comparison' },
  { name: 'comparisonFmt', label: 'Comparison Format', control: 'select', defaultValue: '', group: 'Comparison', options: formatOptions },
  { name: 'comparisonTitle', label: 'Comparison Title', control: 'text', defaultValue: '', group: 'Comparison' },
  { name: 'downIsGood', label: 'Down is Good', control: 'checkbox', defaultValue: false, group: 'Comparison' },
  { name: 'neutralMin', label: 'Neutral Min', control: 'number', defaultValue: 0, group: 'Comparison', min: -1, max: 1, step: 0.01 },
  { name: 'neutralMax', label: 'Neutral Max', control: 'number', defaultValue: 0, group: 'Comparison', min: -1, max: 1, step: 0.01 },

  // Sparkline
  {
    name: 'sparklineType', label: 'Sparkline Type', control: 'select', defaultValue: 'line', group: 'Sparkline',
    options: [
      { label: 'Line', value: 'line' },
      { label: 'Area', value: 'area' },
      { label: 'Bar', value: 'bar' },
    ],
  },
  { name: 'sparklineColor', label: 'Sparkline Color', control: 'color', defaultValue: '', group: 'Sparkline' },
  { name: 'sparklineYScale', label: 'Y Scale', control: 'checkbox', defaultValue: false, group: 'Sparkline' },
  { name: 'sparklineValueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Sparkline', options: formatOptions },
  { name: 'sparklineDateFmt', label: 'Date Format', control: 'select', defaultValue: '', group: 'Sparkline', options: formatOptions },
];
