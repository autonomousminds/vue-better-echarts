export type ControlType =
  | 'checkbox'
  | 'select'
  | 'number'
  | 'slider'
  | 'text'
  | 'color';

export interface PropDefinition {
  name: string;
  label: string;
  control: ControlType;
  defaultValue: unknown;
  group: string;
  options?: { label: string; value: unknown }[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  showWhen?: (state: Record<string, unknown>) => boolean;
  subProps?: PropDefinition[];
}

export interface ColumnConfig {
  enabled: boolean;
  contentType?: 'bar' | 'delta' | 'colorscale' | '';
  title?: string;
  align?: 'left' | 'center' | 'right' | '';
  fmt?: string;
  totalAgg?: string;
  colGroup?: string;
  redNegatives?: boolean;
  description?: string;
  // Bar
  barColor?: string;
  negativeBarColor?: string;
  backgroundColor?: string;
  // Colorscale
  colorScale?: string;
  // Delta
  downIsGood?: boolean;
  chip?: boolean;
  symbolPosition?: 'left' | 'right';
  deltaText?: string;
}

export interface ChartDefinition {
  id: string;
  name: string;
  componentName: string;
  category: 'Standard Charts' | 'Statistical' | 'Part-to-Whole' | 'Relational' | 'Maps' | 'Tables' | 'Values';
  description: string;
  dataBindings: Record<string, string | string[]>;
  supportsReferences: boolean;
  props: PropDefinition[];
  sampleDataKey: string;
}
