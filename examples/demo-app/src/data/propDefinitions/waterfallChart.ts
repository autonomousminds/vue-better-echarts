import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs } from './baseChartProps';

const waterfallSpecificProps: PropDefinition[] = [
  {
    name: 'waterfallType', label: 'Type', control: 'select', defaultValue: 'accumulative', group: 'Waterfall Style',
    options: [
      { label: 'Accumulative', value: 'accumulative' },
      { label: 'Bridge', value: 'bridge' },
    ],
  },
  { name: 'totalColumn', label: 'Total Column', control: 'text', defaultValue: 'isTotal', group: 'Waterfall Style', showWhen: (s) => s.waterfallType === 'bridge' },
  { name: 'showTotal', label: 'Show Total', control: 'checkbox', defaultValue: true, group: 'Waterfall Style' },
  { name: 'totalLabel', label: 'Total Label', control: 'text', defaultValue: 'Total', group: 'Waterfall Style', showWhen: (s) => s.showTotal === true },
  { name: 'labels', label: 'Show Labels', control: 'checkbox', defaultValue: false, group: 'Waterfall Style' },
  {
    name: 'labelPosition', label: 'Label Position', control: 'select', defaultValue: 'top', group: 'Waterfall Style',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Inside', value: 'inside' },
    ],
    showWhen: (s) => s.labels === true,
  },
  { name: 'connectorLines', label: 'Connector Lines', control: 'checkbox', defaultValue: true, group: 'Waterfall Style' },
  {
    name: 'connectorLineType', label: 'Connector Line Type', control: 'select', defaultValue: 'dashed', group: 'Waterfall Style',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Dashed', value: 'dashed' },
      { label: 'Dotted', value: 'dotted' },
    ],
    showWhen: (s) => s.connectorLines === true,
  },
  { name: 'fillOpacity', label: 'Fill Opacity', control: 'slider', defaultValue: 1, group: 'Waterfall Style', min: 0, max: 1, step: 0.05 },
  { name: 'positiveColor', label: 'Positive Color', control: 'color', defaultValue: '#4CAF50', group: 'Waterfall Style' },
  { name: 'negativeColor', label: 'Negative Color', control: 'color', defaultValue: '#F44336', group: 'Waterfall Style' },
  { name: 'totalColor', label: 'Total Color', control: 'color', defaultValue: '#2196F3', group: 'Waterfall Style' },
];

export const waterfallChartProps: PropDefinition[] = [...waterfallSpecificProps, ...baseChartPropDefs];
