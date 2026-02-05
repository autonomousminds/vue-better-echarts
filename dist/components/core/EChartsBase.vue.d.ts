import { EChartsOption, ECharts } from 'echarts';
import { default as debounce } from 'debounce';
import { Appearance, ChartRenderer } from '../../types';

interface Props {
    config: EChartsOption;
    title?: string;
    subtitle?: string;
    height?: string;
    width?: string;
    theme?: Appearance;
    renderer?: ChartRenderer;
    connectGroup?: string;
    seriesColors?: Record<string, string>;
    echartsOptions?: EChartsOption;
    seriesOptions?: Record<string, unknown>;
    showAllXAxisLabels?: boolean;
    swapXY?: boolean;
    xAxisLabelOverflow?: 'break' | 'truncate';
    backgroundColor?: string;
}
declare function updateChart(): void;
declare function __VLS_template(): {
    footer?(_: {
        hovering: boolean;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    height: string;
    width: string;
    theme: string;
    renderer: string;
    backgroundColor: string;
}>>, {
    getChart: () => ECharts | null;
    resize: debounce.DebouncedFunction<() => void>;
    updateChart: typeof updateChart;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (params: unknown) => void;
    init: (chart: ECharts) => void;
    dispose: () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    height: string;
    width: string;
    theme: string;
    renderer: string;
    backgroundColor: string;
}>>> & Readonly<{
    onClick?: ((params: unknown) => any) | undefined;
    onInit?: ((chart: ECharts) => any) | undefined;
    onDispose?: (() => any) | undefined;
}>, {
    theme: Appearance;
    renderer: ChartRenderer;
    backgroundColor: string;
    height: string;
    width: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
