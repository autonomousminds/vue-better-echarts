import type { PropDefinition } from '../../types/playground.types';
import { formatOptions } from './baseChartProps';

export const bubbleMapProps: PropDefinition[] = [
  { name: 'minSize', label: 'Min Size', control: 'number', defaultValue: 5, group: 'Bubble Style', min: 1, max: 20 },
  { name: 'maxSize', label: 'Max Size', control: 'number', defaultValue: 40, group: 'Bubble Style', min: 10, max: 100 },
  { name: 'pointOpacity', label: 'Point Opacity', control: 'slider', defaultValue: 0.8, group: 'Bubble Style', min: 0, max: 1, step: 0.05 },
  { name: 'pointColor', label: 'Point Color', control: 'color', defaultValue: '', group: 'Bubble Style' },
  { name: 'borderColor', label: 'Border Color', control: 'color', defaultValue: '#ffffff', group: 'Bubble Style' },
  { name: 'borderWidth', label: 'Border Width', control: 'number', defaultValue: 1, group: 'Bubble Style', min: 0, max: 5 },
  { name: 'tooltipType', label: 'Tooltip Type', control: 'select', defaultValue: 'hover', group: 'Bubble Style', options: ['hover', 'click'] },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Bubble Style', options: formatOptions },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '500px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
];
