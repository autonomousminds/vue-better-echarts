<script setup lang="ts">
import { computed } from 'vue';
import type { BigValueProps } from '../../types';
import { formatValue, getFormatObjectFromString, formatTitle } from '../../utils/formatting';
import ChartHeader from '../core/ChartHeader.vue';
import BigValueSparkline from './BigValueSparkline.vue';
import DeltaCell from '../table/DeltaCell.vue';

const props = withDefaults(defineProps<BigValueProps>(), {
  comparisonDelta: true,
  sparklineType: 'line',
  sparklineYScale: false,
  downIsGood: false,
  neutralMin: 0,
  neutralMax: 0,
  maxWidth: 'none',
  minWidth: '18%',
});

const normalizedData = computed(() => {
  if (!props.data) return [];
  return Array.isArray(props.data) ? props.data : [props.data];
});

const valueFormatObject = computed(() => {
  if (props.fmt) return getFormatObjectFromString(props.fmt);
  return undefined;
});

const comparisonFormatObject = computed(() => {
  if (props.comparisonFmt) return getFormatObjectFromString(props.comparisonFmt);
  return undefined;
});

const displayValue = computed(() => {
  const data = normalizedData.value;
  if (!data.length || !props.value) return '-';
  const raw = data[0][props.value];
  if (raw === null || raw === undefined) return '-';
  return formatValue(raw, valueFormatObject.value);
});

const resolvedTitle = computed(() => {
  if (props.title) return props.title;
  if (props.value) return formatTitle(props.value);
  return '';
});

const resolvedComparisonTitle = computed(() => {
  if (props.comparisonTitle) return props.comparisonTitle;
  if (props.comparison) return formatTitle(props.comparison);
  return '';
});

const comparisonValue = computed(() => {
  const data = normalizedData.value;
  if (!data.length || !props.comparison) return null;
  const raw = data[0][props.comparison];
  if (raw === null || raw === undefined) return null;
  return Number(raw);
});

const comparisonDisplayValue = computed(() => {
  if (comparisonValue.value === null) return '-';
  return formatValue(comparisonValue.value, comparisonFormatObject.value);
});

const sparklineEffectiveValueFmt = computed(() => props.fmt ?? props.sparklineValueFmt);

const hasSparkline = computed(() => !!props.sparkline && normalizedData.value.length > 0);
const hasComparison = computed(() => !!props.comparison && normalizedData.value.length > 0);
</script>

<template>
  <div
    class="big-value"
    :style="{
      minWidth: minWidth,
      maxWidth: maxWidth,
    }"
  >
    <ChartHeader :title="resolvedTitle" :subtitle="subtitle" />

    <div :class="['big-value-main', valueClass]">
      <a v-if="link" :href="link" class="big-value-link">
        {{ displayValue }}
      </a>
      <span v-else>{{ displayValue }}</span>

      <BigValueSparkline
        v-if="hasSparkline"
        :data="normalizedData"
        :dateCol="sparkline!"
        :valueCol="value"
        :type="sparklineType"
        :color="sparklineColor"
        :yScale="sparklineYScale"
        :valueFmt="sparklineEffectiveValueFmt"
        :dateFmt="sparklineDateFmt"
        :connectGroup="connectGroup"
        :width="120"
        :height="32"
      />
    </div>

    <div v-if="hasComparison" :class="['big-value-comparison', comparisonClass]">
      <template v-if="comparisonDelta && comparisonValue !== null">
        <DeltaCell
          :value="comparisonValue"
          :downIsGood="downIsGood"
          :neutralMin="neutralMin"
          :neutralMax="neutralMax"
          :formatObject="comparisonFormatObject"
          symbolPosition="left"
          :text="resolvedComparisonTitle"
        />
      </template>
      <template v-else>
        <a v-if="link" :href="link" class="big-value-link">
          {{ comparisonDisplayValue }}
        </a>
        <span v-else>{{ comparisonDisplayValue }}</span>
        <span class="big-value-comparison-label">{{ resolvedComparisonTitle }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.big-value {
  display: inline-block;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 0.5rem 0 1rem 0;
  margin-right: 1rem;
  vertical-align: top;
}

.big-value-main {
  position: relative;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0.25rem;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.big-value-link {
  text-decoration: none;
  color: inherit;
}

.big-value-link:hover {
  background-color: var(--base-200, #f3f4f6);
}

.big-value-comparison {
  font-size: 0.875rem;
  font-family: system-ui, -apple-system, sans-serif;
  margin-top: 0.375rem;
}

.big-value-comparison-label {
  margin-left: 0.25rem;
  opacity: 0.6;
}
</style>
