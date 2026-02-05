import { ComputedRef, MaybeRefOrGetter } from 'vue';
import { EChartsOption } from 'echarts';
import { ZoomProp, ToolboxProp, BrushProp, AnimationProp, TooltipProp } from '../types';

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
 * Main composable for interactive chart features
 * All options can be refs, getters, or plain values for reactivity
 */
export declare function useInteractiveFeatures(options: InteractiveFeaturesOptions): UseInteractiveFeaturesReturn;
