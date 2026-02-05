/**
 * Vue 3 composable for converting structured interactive feature props to ECharts config
 */

import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue';
import type { EChartsOption } from 'echarts';
import type {
  ZoomProp,
  ZoomConfig,
  ToolboxProp,
  ToolboxConfig,
  BrushProp,
  BrushConfig,
  AnimationProp,
  AnimationConfig,
  TooltipProp,
  TooltipConfig,
  ToolboxPosition
} from '../types';

export interface InteractiveFeaturesOptions {
  zoom?: MaybeRefOrGetter<ZoomProp | undefined>;
  toolbox?: MaybeRefOrGetter<ToolboxProp | undefined>;
  brush?: MaybeRefOrGetter<BrushProp | undefined>;
  animation?: MaybeRefOrGetter<AnimationProp | undefined>;
  tooltip?: MaybeRefOrGetter<TooltipProp | undefined>;
  swapXY?: MaybeRefOrGetter<boolean | undefined>;
  chartType?: 'line' | 'bar' | 'area' | 'scatter';
}

export interface UseInteractiveFeaturesReturn {
  dataZoomConfig: ComputedRef<EChartsOption['dataZoom']>;
  toolboxConfig: ComputedRef<Record<string, unknown> | undefined>;
  brushConfig: ComputedRef<Record<string, unknown> | undefined>;
  animationConfig: ComputedRef<Partial<EChartsOption>>;
  tooltipBaseConfig: ComputedRef<Record<string, unknown>>;
  interactiveConfig: ComputedRef<Partial<EChartsOption>>;
}

/**
 * Default configurations when props are set to `true`
 */
const ZOOM_DEFAULTS: ZoomConfig = {
  type: 'slider',
  axis: 'x',
  start: 0,
  end: 100,
  minSpan: 1,
  maxSpan: 100,
  showDetail: false,
  height: 30,
  zoomLock: false,
  realtime: true
};

const TOOLBOX_DEFAULTS: ToolboxConfig = {
  position: 'top-right',
  orient: 'horizontal',
  iconSize: 15,
  itemGap: 10,
  saveAsImage: true,
  restore: true
};

const BRUSH_DEFAULTS: BrushConfig = {
  type: ['rect', 'polygon', 'lineX', 'lineY'],
  defaultType: 'rect',
  mode: 'single',
  toolbox: true,
  outOfBrush: { opacity: 0.3 }
};

const ANIMATION_DEFAULTS: AnimationConfig = {
  enabled: true,
  duration: 1000,
  durationUpdate: 500,
  easing: 'cubicOut',
  delay: 0,
  threshold: 2000
};

const TOOLTIP_DEFAULTS: TooltipConfig = {
  enabled: true,
  trigger: 'axis',
  axisPointer: 'shadow',
  showSeriesMarker: true,
  confine: true,
  followMouse: false,
  order: 'desc'
};

/**
 * Convert toolbox position to ECharts left/right/top/bottom
 */
function getToolboxPositionConfig(position: ToolboxPosition = 'top-right'): Record<string, number | string> {
  switch (position) {
    case 'top-left':
      return { left: 10, top: 10 };
    case 'top-right':
      return { right: 10, top: 10 };
    case 'bottom-left':
      return { left: 10, bottom: 10 };
    case 'bottom-right':
      return { right: 10, bottom: 10 };
    default:
      return { right: 10, top: 10 };
  }
}

/**
 * Main composable for interactive chart features
 * All options can be refs, getters, or plain values for reactivity
 */
export function useInteractiveFeatures(options: InteractiveFeaturesOptions): UseInteractiveFeaturesReturn {
  const { chartType } = options;

  /**
   * DataZoom configuration
   */
  const dataZoomConfig = computed<EChartsOption['dataZoom']>(() => {
    const zoomProp = toValue(options.zoom);
    const swapXY = toValue(options.swapXY) || false;

    if (!zoomProp) return undefined;

    const config: ZoomConfig = zoomProp === true
      ? { ...ZOOM_DEFAULTS }
      : { ...ZOOM_DEFAULTS, ...zoomProp };

    const zoomComponents: EChartsOption['dataZoom'] = [];
    const xAxisKey = swapXY ? 'yAxisIndex' : 'xAxisIndex';
    const yAxisKey = swapXY ? 'xAxisIndex' : 'yAxisIndex';

    // Helper to add zoom components for an axis
    const addAxisZoom = (axisKey: string, isY: boolean) => {
      const isVertical = (isY && !swapXY) || (!isY && swapXY);

      if (config.type === 'slider' || config.type === 'both') {
        zoomComponents.push({
          type: 'slider',
          [axisKey]: 0,
          start: config.start,
          end: config.end,
          minSpan: config.minSpan,
          maxSpan: config.maxSpan,
          showDetail: config.showDetail,
          zoomLock: config.zoomLock,
          realtime: config.realtime,
          ...(isVertical
            ? { right: 10, width: config.height || 30 }
            : { bottom: 10, height: config.height || 30 })
        });
      }

      if (config.type === 'inside' || config.type === 'both') {
        zoomComponents.push({
          type: 'inside',
          [axisKey]: 0,
          start: config.start,
          end: config.end,
          minSpan: config.minSpan,
          maxSpan: config.maxSpan,
          zoomLock: config.zoomLock
        });
      }
    };

    // Add zoom for configured axes
    if (config.axis === 'x' || config.axis === 'both') {
      addAxisZoom(xAxisKey, false);
    }
    if (config.axis === 'y' || config.axis === 'both') {
      addAxisZoom(yAxisKey, true);
    }

    return zoomComponents.length > 0 ? zoomComponents : undefined;
  });

  /**
   * Toolbox configuration
   */
  const toolboxConfig = computed<Record<string, unknown> | undefined>(() => {
    const toolboxProp = toValue(options.toolbox);

    if (!toolboxProp) return undefined;

    const config: ToolboxConfig = toolboxProp === true
      ? { ...TOOLBOX_DEFAULTS }
      : { ...TOOLBOX_DEFAULTS, ...toolboxProp };

    const positionConfig = getToolboxPositionConfig(config.position);
    const feature: Record<string, unknown> = {};

    // Save as image
    if (config.saveAsImage) {
      const saveConfig = config.saveAsImage === true ? {} : config.saveAsImage;
      feature.saveAsImage = {
        type: saveConfig.type || 'png',
        pixelRatio: saveConfig.pixelRatio || 1,
        name: saveConfig.name,
        title: 'Save'
      };
    }

    // Data zoom - enables area selection zoom in the toolbox
    if (config.dataZoom) {
      feature.dataZoom = {
        xAxisIndex: 0,      // Enable zoom on first X axis
        yAxisIndex: 'none', // Don't zoom Y axis (keeps proportions)
        title: { zoom: 'Zoom', back: 'Reset' }
      };
    }

    // Restore
    if (config.restore) {
      feature.restore = { title: 'Restore' };
    }

    // Data view
    if (config.dataView) {
      const viewConfig = config.dataView === true ? {} : config.dataView;
      feature.dataView = {
        readOnly: viewConfig.readOnly ?? false,
        title: 'Data'
      };
    }

    // Magic type
    if (config.magicType) {
      const magicConfig = config.magicType === true
        ? { type: ['line', 'bar'] }
        : config.magicType;
      feature.magicType = {
        type: magicConfig.type,
        title: {
          line: 'Line',
          bar: 'Bar',
          stack: 'Stack'
        }
      };
    }

    return {
      show: true,
      ...positionConfig,
      orient: config.orient || 'horizontal',
      itemSize: config.iconSize || 15,
      itemGap: config.itemGap || 10,
      feature
    };
  });

  /**
   * Brush configuration
   */
  const brushConfig = computed<Record<string, unknown> | undefined>(() => {
    const brushProp = toValue(options.brush);

    if (!brushProp) return undefined;

    const config: BrushConfig = brushProp === true
      ? { ...BRUSH_DEFAULTS }
      : { ...BRUSH_DEFAULTS, ...brushProp };

    const brushTypes = Array.isArray(config.type) ? config.type : (config.type ? [config.type] : ['rect']);

    return {
      toolbox: brushTypes.filter(t => !['keep', 'clear'].includes(t)) as Array<'rect' | 'polygon' | 'lineX' | 'lineY'>,
      brushType: config.defaultType || 'rect',
      brushMode: config.mode || 'single',
      outOfBrush: {
        colorAlpha: config.outOfBrush?.opacity ?? 0.3
      }
    };
  });

  /**
   * Animation configuration
   */
  const animationConfig = computed<Partial<EChartsOption>>(() => {
    const animationProp = toValue(options.animation);

    // If explicitly false, disable animation
    if (animationProp === false) {
      return { animation: false };
    }

    // If not set, return empty (use ECharts defaults)
    if (animationProp === undefined) {
      return {};
    }

    const config: AnimationConfig = animationProp === true
      ? { ...ANIMATION_DEFAULTS }
      : { ...ANIMATION_DEFAULTS, ...animationProp };

    if (config.enabled === false) {
      return { animation: false };
    }

    return {
      animation: true,
      animationDuration: config.duration,
      animationDurationUpdate: config.durationUpdate,
      animationEasing: config.easing,
      animationDelay: config.delay,
      animationThreshold: config.threshold
    };
  });

  /**
   * Tooltip base configuration
   */
  const tooltipBaseConfig = computed<Record<string, unknown>>(() => {
    const tooltipProp = toValue(options.tooltip);

    // If explicitly false, disable tooltip
    if (tooltipProp === false) {
      return { show: false };
    }

    // If not set, return empty (use chart component defaults)
    if (tooltipProp === undefined) {
      return {};
    }

    const config: TooltipConfig = tooltipProp === true
      ? { ...TOOLTIP_DEFAULTS }
      : { ...TOOLTIP_DEFAULTS, ...tooltipProp };

    if (config.enabled === false) {
      return { show: false };
    }

    // Determine default trigger based on chart type
    const defaultTrigger = chartType === 'scatter' ? 'item' : 'axis';
    const trigger = config.trigger ?? defaultTrigger;

    const tooltipConfig: Record<string, unknown> = {
      show: true,
      trigger,
      confine: config.confine,
      enterable: config.followMouse ? false : true
    };

    // Axis pointer settings (only for axis trigger)
    if (trigger === 'axis' && config.axisPointer && config.axisPointer !== 'none') {
      tooltipConfig.axisPointer = {
        type: config.axisPointer
      };
    }

    // Order setting
    if (config.order && config.order !== 'none') {
      tooltipConfig.order = config.order === 'asc' ? 'valueAsc' : 'valueDesc';
    }

    // Custom styling
    if (config.backgroundColor) {
      tooltipConfig.backgroundColor = config.backgroundColor;
    }
    if (config.borderColor) {
      tooltipConfig.borderColor = config.borderColor;
    }
    if (config.textColor) {
      tooltipConfig.textStyle = { color: config.textColor };
    }

    return tooltipConfig;
  });

  /**
   * Combined interactive configuration
   */
  const interactiveConfig = computed<Partial<EChartsOption>>(() => {
    const config: Partial<EChartsOption> = {};

    // Add dataZoom
    const dataZoom = dataZoomConfig.value;
    if (dataZoom) {
      config.dataZoom = dataZoom;
    }

    // Add toolbox
    const toolbox = toolboxConfig.value;
    if (toolbox) {
      config.toolbox = toolbox;
    }

    // Add brush
    const brush = brushConfig.value;
    if (brush) {
      config.brush = brush;
    }

    // Add animation settings
    const animation = animationConfig.value;
    Object.assign(config, animation);

    return config;
  });

  return {
    dataZoomConfig,
    toolboxConfig,
    brushConfig,
    animationConfig,
    tooltipBaseConfig,
    interactiveConfig
  };
}
