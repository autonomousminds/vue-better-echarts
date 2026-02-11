import type { PropDefinition } from '../../types/playground.types';
import { formatOptions } from './baseChartProps';

export const pointMapProps: PropDefinition[] = [
  { name: 'pointSize', label: 'Point Size', control: 'number', defaultValue: 8, group: 'Point Style', min: 2, max: 30 },
  { name: 'pointOpacity', label: 'Point Opacity', control: 'slider', defaultValue: 0.8, group: 'Point Style', min: 0, max: 1, step: 0.05 },
  { name: 'pointColor', label: 'Point Color', control: 'color', defaultValue: '', group: 'Point Style' },
  { name: 'borderColor', label: 'Border Color', control: 'color', defaultValue: '#ffffff', group: 'Point Style' },
  { name: 'borderWidth', label: 'Border Width', control: 'number', defaultValue: 1, group: 'Point Style', min: 0, max: 5 },
  { name: 'tooltipType', label: 'Tooltip Type', control: 'select', defaultValue: 'hover', group: 'Point Style', options: ['hover', 'click'] },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Point Style', options: formatOptions },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '500px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
];
