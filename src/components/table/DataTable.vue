<script setup lang="ts">
/**
 * DataTable component
 *
 * Full-featured data table with sorting, pagination, search, grouping,
 * totals, and multiple column content types (delta, bar, sparkline, colorscale, etc.).
 *
 * Ported from Evidence's DataTable/Svelte implementation.
 */
import { ref, computed, provide, watch, useSlots, reactive } from 'vue';
import type {
  DataTableProps,
  TableColumnConfig,
  SortState,
  ColumnSummaryItem,
  TableServerQuery,
} from '../../types/table.types';
import type { TableContext } from '../../symbols/injectionKeys';
import { tableContextKey } from '../../symbols/injectionKeys';
import { getColumnSummary, getFinalColumnOrder, aggregateColumn, autoConvertDateColumns, autoConvertNumericColumns } from '../../utils/tableUtils';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import GroupRow from './GroupRow.vue';
import SubtotalRow from './SubtotalRow.vue';
import TotalRow from './TotalRow.vue';
import SearchBar from './SearchBar.vue';
import Pagination from './Pagination.vue';
import TableFooter from './TableFooter.vue';
import FullscreenButton from './FullscreenButton.vue';
import ChartHeader from '../core/ChartHeader.vue';
import { exportToCsv } from '../../utils/tableUtils';

const props = withDefaults(defineProps<DataTableProps>(), {
  rows: 10,
  rowNumbers: false,
  groupsOpen: true,
  groupType: 'accordion',
  subtotals: false,
  search: false,
  sortable: true,
  downloadable: true,
  totalRow: false,
  rowShading: false,
  rowLines: true,
  wrapTitles: false,
  formatColumnTitles: true,
  groupNamePosition: 'middle',
  showLinkCol: false,
  emptySet: 'info',
  emptyMessage: 'No data found',
});

const emit = defineEmits<{
  (e: 'server-query', query: TableServerQuery): void;
}>();

// Resolve effective rows count: "all" or 0 means show everything
const effectiveRows = computed(() => {
  if (props.rows === 'all' || props.rows === 0) return Infinity;
  return props.rows;
});

// ─── Server mode ───────────────────────────────────────────────────────
// In server mode `data` is one page of a larger dataset: local search/sort
// are bypassed and page/sort/search changes are emitted for the parent to
// resolve against the server.
const isServerMode = computed(() => props.serverMode === true && !props.groupBy);

function emitServerQuery() {
  emit('server-query', {
    page: currentPage.value,
    rows: effectiveRows.value === Infinity ? 100 : effectiveRows.value,
    sortCol: sortState.value.col,
    sortAsc: sortState.value.ascending,
    search: debouncedSearchValue.value,
  });
}

const slots = useSlots();

// Stable functional component for rendering slot children (Column registrations).
// CRITICAL: Must be a stable reference — an inline arrow function in the template
// (like `:is="() => slots.default?.()"`) creates a new function identity each render,
// causing Vue to unmount/remount all Column children. That triggers
// unregisterColumn + registerColumn cycles → infinite reactive loop.
const SlotRenderer = () => slots.default?.();

// ─── Column Registration via provide/inject ────────────────────────────
const registeredColumns = ref<TableColumnConfig[]>([]);

/** Shallow-compare two column configs to avoid unnecessary reactive mutations */
function columnConfigsEqual(a: TableColumnConfig, b: TableColumnConfig): boolean {
  const aObj = a as unknown as Record<string, unknown>;
  const bObj = b as unknown as Record<string, unknown>;
  const keys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]);
  for (const key of keys) {
    if (aObj[key] !== bObj[key]) return false;
  }
  return true;
}

const tableContext: TableContext = reactive({
  registerColumn(config: TableColumnConfig) {
    const idx = registeredColumns.value.findIndex((c) => c.id === config.id);
    if (idx === -1) {
      registeredColumns.value.push(config);
    } else if (!columnConfigsEqual(registeredColumns.value[idx], config)) {
      registeredColumns.value[idx] = config;
    }
  },
  unregisterColumn(id: string) {
    registeredColumns.value = registeredColumns.value.filter((c) => c.id !== id);
  },
  updateColumn(config: TableColumnConfig) {
    const idx = registeredColumns.value.findIndex((c) => c.id === config.id);
    if (idx !== -1) {
      if (!columnConfigsEqual(registeredColumns.value[idx], config)) {
        registeredColumns.value[idx] = config;
      }
    } else {
      registeredColumns.value.push(config);
    }
  },
  get data() {
    return props.data;
  },
});

provide(tableContextKey, tableContext);

// ─── Column Summary ────────────────────────────────────────────────────
// Compute summary once and reuse for both columnSummary and processedData
// to avoid the expensive O(n×m) getColumnSummary() running twice.
const rawColumnSummary = computed<ColumnSummaryItem[]>(() => {
  if (!props.data || props.data.length === 0) return [];
  return getColumnSummary(props.data);
});

// ─── Date/Numeric Auto-Conversion ───────────────────────────────────────
const processedData = computed(() => {
  if (!props.data || props.data.length === 0) return props.data;
  const summary = rawColumnSummary.value;
  const withDates = autoConvertDateColumns(props.data, summary);
  // Pass original ref so autoConvertNumericColumns can mutate in-place
  // when data was already cloned by autoConvertDateColumns (avoids second 20K clone)
  return autoConvertNumericColumns(withDates, summary, props.data);
});

// Re-derive column summary from processed data only if conversions happened
const columnSummary = computed<ColumnSummaryItem[]>(() => {
  if (processedData.value === props.data) return rawColumnSummary.value;
  // Conversions happened — update min/max/median from converted values
  // but reuse structure to avoid full recompute
  return getColumnSummary(processedData.value);
});

// ─── Auto-generated columns (when no <Column> children) ────────────────
const autoColumns = computed<TableColumnConfig[]>(() => {
  if (!props.data || props.data.length === 0) return [];
  return Object.keys(props.data[0]).map((key) => ({
    identifier: Symbol(`auto-${key}`),
    id: key,
  }));
});

const effectiveColumns = computed<TableColumnConfig[]>(() => {
  // Use registered columns if <Column> children exist, else auto-generate
  if (registeredColumns.value.length > 0) {
    // Sort registered columns by their position in data keys.
    // Vue's patchKeyedChildren may mount Column children in reverse order
    // when all keys change (e.g. switching between different tables),
    // causing registerColumn push-order to be reversed.
    const dataKeys = props.data?.[0] ? Object.keys(props.data[0]) : [];
    if (dataKeys.length > 0) {
      return [...registeredColumns.value].sort((a, b) => {
        const ia = dataKeys.indexOf(a.id);
        const ib = dataKeys.indexOf(b.id);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return 0;
      });
    }
    return registeredColumns.value;
  }
  return autoColumns.value;
});

// ─── Column Ordering ───────────────────────────────────────────────────
const finalColumnOrder = computed(() =>
  getFinalColumnOrder(
    effectiveColumns.value.map((d) => d.id),
    [props.groupBy]
  )
);

const orderedColumns = computed(() => {
  let cols = [...effectiveColumns.value].sort(
    (a, b) => finalColumnOrder.value.indexOf(a.id) - finalColumnOrder.value.indexOf(b.id)
  );

  // Hide link column by default when link prop is set (matches Evidence behavior)
  if (props.link && !props.showLinkCol && registeredColumns.value.length === 0) {
    cols = cols.filter((c) => c.id !== props.link);
  }

  return cols;
});

// ─── Search ────────────────────────────────────────────────────────────
const searchValue = ref('');
let searchDebounceTimer: ReturnType<typeof setTimeout> | undefined;

const debouncedSearchValue = ref('');

watch(searchValue, (val) => {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    debouncedSearchValue.value = val;
  }, 200);
});

const searchFilteredData = computed(() => {
  // Server mode: the server already applied the search filter to this page
  if (isServerMode.value) return processedData.value;
  if (!debouncedSearchValue.value || !props.search) return processedData.value;

  const query = debouncedSearchValue.value.toLowerCase();
  const visibleCols = effectiveColumns.value.map((c) => c.id);

  return processedData.value.filter((row) =>
    visibleCols.some((col) => {
      const val = row[col];
      if (val == null) return false;
      return String(val).toLowerCase().includes(query);
    })
  );
});

// ─── Sorting ───────────────────────────────────────────────────────────
const sortState = ref<SortState>({ col: null, ascending: true });

// Initialize from sort prop
watch(
  () => props.sort,
  (sort) => {
    if (sort) {
      // Split on last space to support column names with spaces (e.g. "FY Total desc")
      const lastSpace = sort.lastIndexOf(' ');
      const possibleDir = lastSpace > 0 ? sort.substring(lastSpace + 1) : '';
      if (possibleDir === 'desc' || possibleDir === 'asc') {
        sortState.value = {
          col: sort.substring(0, lastSpace),
          ascending: possibleDir !== 'desc',
        };
      } else {
        sortState.value = { col: sort, ascending: true };
      }
    }
  },
  { immediate: true }
);

function sortClick(column: string) {
  if (sortState.value.col === column) {
    sortState.value = { col: column, ascending: !sortState.value.ascending };
  } else {
    const colType = columnSummary.value.find((c) => c.id === column)?.type;
    sortState.value = { col: column, ascending: colType !== 'number' };
  }
}

function comparator(a: Record<string, unknown>, b: Record<string, unknown>): number {
  const column = sortState.value.col;
  if (!column) return 0;

  const sortModifier = sortState.value.ascending ? 1 : -1;

  const forceTop = (val: unknown) =>
    val === undefined || val === null || (typeof val === 'number' && isNaN(val));

  const valA = a[column];
  const valB = b[column];

  if (forceTop(valA) && !forceTop(valB)) return -1 * sortModifier;
  if (forceTop(valB) && !forceTop(valA)) return 1 * sortModifier;

  const normalizedA = typeof valA === 'string' ? valA.toLowerCase() : valA;
  const normalizedB = typeof valB === 'string' ? valB.toLowerCase() : valB;

  if ((normalizedA as number) < (normalizedB as number)) return -1 * sortModifier;
  if ((normalizedA as number) > (normalizedB as number)) return 1 * sortModifier;
  return 0;
}

const sortedData = computed(() => {
  // Server mode: the server already applied the sort to this page
  if (isServerMode.value) return searchFilteredData.value;
  if (!sortState.value.col) return searchFilteredData.value;
  return [...searchFilteredData.value].sort(comparator);
});

// Server mode: sort and search changes restart from page 1 and are resolved
// by the parent against the full dataset.
watch([sortState, debouncedSearchValue], () => {
  if (!isServerMode.value) return;
  currentPage.value = 1;
  emitServerQuery();
});

// ─── Grouping ──────────────────────────────────────────────────────────
const groupToggleStates = ref<Record<string, boolean>>({});

const groupedData = computed<Record<string, Record<string, unknown>[]>>(() => {
  if (!props.groupBy) return {};

  return sortedData.value.reduce<Record<string, Record<string, unknown>[]>>((acc, row) => {
    const groupName = String(row[props.groupBy!] ?? '');
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(row);
    return acc;
  }, {});
});

// Large dataset threshold: auto-collapse all groups when total rows exceed this
const LARGE_DATASET_THRESHOLD = 200;

// For large grouped datasets, override groupsOpen to false so only header rows render initially
const effectiveGroupsOpen = computed(() => {
  if (!props.groupBy) return props.groupsOpen;
  const totalRows = sortedData.value.length;
  if (totalRows > LARGE_DATASET_THRESHOLD && props.groupsOpen) return false;
  return props.groupsOpen;
});

// Initialize toggle states for new groups
watch(
  groupedData,
  (newGroups) => {
    for (const groupName of Object.keys(newGroups)) {
      if (!(groupName in groupToggleStates.value)) {
        groupToggleStates.value[groupName] = effectiveGroupsOpen.value;
      }
    }
  },
  { immediate: true }
);

function handleToggle(groupName: string) {
  groupToggleStates.value[groupName] = !groupToggleStates.value[groupName];
}

// Limit visible rows per expanded group to avoid DOM explosion
const GROUP_ROW_LIMIT = 100;
const groupRowLimits = ref<Record<string, number>>({});

function getVisibleGroupData(groupName: string): Record<string, unknown>[] {
  const data = groupedData.value[groupName];
  if (!data) return [];
  const limit = groupRowLimits.value[groupName] ?? GROUP_ROW_LIMIT;
  return data.length > limit ? data.slice(0, limit) : data;
}

function showMoreRows(groupName: string) {
  const current = groupRowLimits.value[groupName] ?? GROUP_ROW_LIMIT;
  groupRowLimits.value[groupName] = current + GROUP_ROW_LIMIT;
}

function isGroupTruncated(groupName: string): boolean {
  const data = groupedData.value[groupName];
  if (!data) return false;
  const limit = groupRowLimits.value[groupName] ?? GROUP_ROW_LIMIT;
  return data.length > limit;
}

function groupTruncatedCount(groupName: string): number {
  const data = groupedData.value[groupName];
  if (!data) return 0;
  const limit = groupRowLimits.value[groupName] ?? GROUP_ROW_LIMIT;
  return Math.max(0, data.length - limit);
}

// For section grouping: walk sortedData and create runs of consecutive same-group rows.
// This lets section grouping respect the active sort: rows from different groups can interleave,
// and the group-name cell uses rowSpan only across consecutive same-group rows (Excel-style).
const sectionRuns = computed<{ groupName: string; rows: Record<string, unknown>[] }[]>(() => {
  if (!props.groupBy) return [];
  const runs: { groupName: string; rows: Record<string, unknown>[] }[] = [];
  for (const row of sortedData.value) {
    const groupName = String(row[props.groupBy] ?? '');
    const last = runs[runs.length - 1];
    if (last && last.groupName === groupName) {
      last.rows.push(row);
    } else {
      runs.push({ groupName, rows: [row] });
    }
  }
  return runs;
});

// Sort group names
const sortedGroupNames = computed(() => {
  const names = Object.keys(groupedData.value);
  if (!sortState.value.col) return names.sort();

  // Sort groups by their aggregated values
  return names.sort((a, b) => {
    const col = sortState.value.col!;
    const sortModifier = sortState.value.ascending ? 1 : -1;

    if (col === props.groupBy) {
      return sortModifier * a.localeCompare(b);
    }

    // Get aggregate for each group
    const colSummary = columnSummary.value.find((c) => c.id === col);
    const colType = colSummary?.type || 'string';
    const colConfig = effectiveColumns.value.find((c) => c.id === col);

    const valA = aggregateColumn(groupedData.value[a], col, colConfig?.totalAgg, colType, colConfig?.weightCol);
    const valB = aggregateColumn(groupedData.value[b], col, colConfig?.totalAgg, colType, colConfig?.weightCol);

    if (valA == null || isNaN(Number(valA))) return -1 * sortModifier;
    if (valB == null || isNaN(Number(valB))) return 1 * sortModifier;
    return (Number(valA) - Number(valB)) * sortModifier;
  });
});

// ─── Pagination ────────────────────────────────────────────────────────
const totalRowCount = computed(() =>
  isServerMode.value ? (props.serverTotalRows ?? sortedData.value.length) : sortedData.value.length
);
const isPaginated = computed(() => totalRowCount.value > effectiveRows.value && !props.groupBy);
const currentPage = ref(1);

const pageCount = computed(() =>
  isPaginated.value ? Math.ceil(totalRowCount.value / effectiveRows.value) : 1
);

// Reset page when data/search changes
watch([sortedData, effectiveRows], () => {
  if (currentPage.value > pageCount.value) {
    currentPage.value = Math.max(1, pageCount.value);
  }
});

const displayedData = computed(() => {
  // Server mode: `data` holds the current page (or, before the first server
  // fetch, the initial inline window) — render at most one page of it.
  if (isServerMode.value) return sortedData.value.slice(0, effectiveRows.value);
  if (!isPaginated.value) return sortedData.value;
  const start = (currentPage.value - 1) * effectiveRows.value;
  return sortedData.value.slice(start, start + effectiveRows.value);
});

function goToPage(page: number) {
  const target = Math.max(1, Math.min(page, pageCount.value));
  if (target === currentPage.value) return;
  currentPage.value = target;
  if (isServerMode.value) emitServerQuery();
}

// ─── Data for export ───────────────────────────────────────────────────
const exportColumns = computed(() => effectiveColumns.value.map((d) => d.id));

// ─── Has data check ─────────────────────────────────────────────────────
// Server mode with an active search keeps the table (and search bar) rendered
// even when the server returned zero matching rows, so the search can be cleared.
const hasData = computed(
  () => (!!props.data && props.data.length > 0) || (isServerMode.value && !!debouncedSearchValue.value)
);

// ─── Hover state (for footer visibility) ───────────────────────────────
const hovering = ref(false);

// ─── Fullscreen ─────────────────────────────────────────────────────────
const isFullscreen = ref(false);
const isFullscreenClosing = ref(false);
const fullscreenDialogRef = ref<HTMLDialogElement>();

const FULLSCREEN_EXIT_DURATION = 250; // ms, matches CSS animation duration

/** Compute optimal row count for fullscreen based on viewport height */
const fullscreenRows = computed(() => {
  if (typeof window === 'undefined') return 20;
  const rowHeight = props.compact ? 32 : 40;
  const headerHeight = 56;
  const paginationHeight = 52;
  const searchHeight = 52;
  const margins = 60;
  const available = window.innerHeight - headerHeight - paginationHeight - searchHeight - margins;
  return Math.max(5, Math.floor(available / rowHeight));
});

// Fullscreen pagination
const fullscreenPage = ref(1);
// Server mode: fullscreen shows only the currently loaded page (no server round-trips)
const fullscreenIsPaginated = computed(() => !isServerMode.value && sortedData.value.length > fullscreenRows.value);
const fullscreenPageCount = computed(() =>
  fullscreenIsPaginated.value ? Math.ceil(sortedData.value.length / fullscreenRows.value) : 1
);
const fullscreenDisplayedData = computed(() => {
  // Server mode: only the loaded page is available — don't render the whole window
  if (isServerMode.value) return sortedData.value.slice(0, fullscreenRows.value);
  if (!fullscreenIsPaginated.value) return sortedData.value;
  const start = (fullscreenPage.value - 1) * fullscreenRows.value;
  return sortedData.value.slice(start, start + fullscreenRows.value);
});

function goToFullscreenPage(page: number) {
  fullscreenPage.value = Math.max(1, Math.min(page, fullscreenPageCount.value));
}

// Reset fullscreen page when data changes
watch([sortedData, fullscreenRows], () => {
  if (fullscreenPage.value > fullscreenPageCount.value) {
    fullscreenPage.value = Math.max(1, fullscreenPageCount.value);
  }
});

watch(isFullscreen, (open) => {
  const dialog = fullscreenDialogRef.value;
  if (!dialog) return;
  if (open) {
    fullscreenPage.value = 1;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  } else {
    dialog.close();
    document.body.style.overflow = '';
  }
});

function closeFullscreen() {
  if (isFullscreenClosing.value) return;
  isFullscreenClosing.value = true;
  setTimeout(() => {
    isFullscreen.value = false;
    isFullscreenClosing.value = false;
  }, FULLSCREEN_EXIT_DURATION);
}

function handleFullscreenDialogClick(e: MouseEvent) {
  if (e.target === fullscreenDialogRef.value) {
    closeFullscreen();
  }
}

function handleFullscreenKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeFullscreen();
  }
}

// ─── Export ─────────────────────────────────────────────────────────────
// Server mode holds only one page locally; exportDataProvider fetches the
// full dataset from the parent. Falls back to loaded rows if it fails.
async function resolveExportData(fallback: Record<string, unknown>[]): Promise<Record<string, unknown>[]> {
  if (!props.exportDataProvider) return fallback;
  try {
    const full = await props.exportDataProvider();
    if (full && full.length > 0) return full;
  } catch (err) {
    console.error('exportDataProvider failed, exporting loaded rows only', err);
  }
  return fallback;
}

async function handleExportExcel() {
  const { exportToXlsx } = await import('../../utils/excelExport');
  await exportToXlsx({
    data: await resolveExportData(sortedData.value),
    columns: orderedColumns.value,
    columnSummary: columnSummary.value,
    groupBy: props.groupBy,
    groupedData: props.groupBy ? groupedData.value : undefined,
    sortedGroupNames: props.groupBy ? sortedGroupNames.value : undefined,
    subtotals: props.subtotals,
    totalRow: props.totalRow,
    title: props.title,
    filename: props.title || 'table-data',
  });
}

async function handleExportCsv() {
  exportToCsv(await resolveExportData(props.data), exportColumns.value, props.title || 'table-data');
}
</script>

<template>
  <!-- Render slot for Column children (renderless). Uses stable SlotRenderer ref
       to prevent Vue from remounting Column children on every re-render. -->
  <component :is="SlotRenderer" v-if="slots.default" />

  <div
    class="table-container"
    :class="{ 'table-paginated': isPaginated && hasData }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- Empty state handling -->
    <template v-if="!hasData && emptySet !== 'pass'">
      <ChartHeader :title="title" :title-icon="titleIcon" :subtitle="subtitle" />
      <div
        class="empty-state"
        :class="{ 'empty-error': emptySet === 'error', 'empty-warn': emptySet === 'warn', 'empty-info': emptySet === 'info' }"
      >
        {{ emptyMessage }}
      </div>
    </template>

    <!-- Table content -->
    <template v-else-if="hasData">
      <!-- Title -->
      <ChartHeader :title="title" :title-icon="titleIcon" :subtitle="subtitle" />

      <!-- Search -->
      <SearchBar v-if="search" v-model="searchValue" />

      <!-- Scrollable table -->
      <div class="scrollbox" :style="{ backgroundColor: backgroundColor || undefined }">
        <table>
        <TableHeader
          :ordered-columns="orderedColumns"
          :column-summary="columnSummary"
          :row-numbers="rowNumbers"
          :sortable="sortable"
          :sort-state="sortState"
          :format-column-titles="formatColumnTitles"
          :wrap-titles="wrapTitles"
          :compact="compact"
          :header-color="headerColor"
          :header-font-color="headerFontColor"
          :link="link"
          @sort-click="sortClick"
        />

        <tbody>
          <!-- Grouped mode -->
          <template v-if="groupBy && Object.keys(groupedData).length > 0 && !debouncedSearchValue">
            <!-- Accordion mode (bucketed by group) -->
            <template v-if="groupType === 'accordion'">
              <template v-for="groupName in sortedGroupNames" :key="groupName">
                <GroupRow
                  :group-name="groupName"
                  :current-group-data="groupedData[groupName]"
                  :toggled="groupToggleStates[groupName]"
                  :column-summary="columnSummary"
                  :row-numbers="rowNumbers"
                  :row-color="accordionRowColor"
                  :subtotals="subtotals"
                  :ordered-columns="orderedColumns"
                  :compact="compact"
                  :table-subtotal-fmt="subtotalFmt"
                  @toggle="handleToggle"
                />
                <TableRow
                  v-if="groupToggleStates[groupName]"
                  :displayed-data="getVisibleGroupData(groupName)"
                  :ordered-columns="orderedColumns"
                  :column-summary="columnSummary"
                  :group-type="groupType"
                  :row-shading="rowShading"
                  :link="link"
                  :row-numbers="rowNumbers"
                  :row-lines="rowLines"
                  :compact="compact"
                  :index="0"
                  :grouped="true"
                  :group-column="groupBy"
                />
                <tr v-if="groupToggleStates[groupName] && isGroupTruncated(groupName)" class="show-more-row">
                  <td :colspan="orderedColumns.length + (rowNumbers ? 1 : 0)">
                    <button class="show-more-btn" @click.stop="showMoreRows(groupName)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      Show {{ Math.min(GROUP_ROW_LIMIT, groupTruncatedCount(groupName)).toLocaleString() }} more
                      <span class="show-more-meta">
                        ({{ (groupedData[groupName].length - groupTruncatedCount(groupName)).toLocaleString() }} / {{ groupedData[groupName].length.toLocaleString() }})
                      </span>
                    </button>
                  </td>
                </tr>
              </template>
            </template>

            <!-- Section mode (uses runs so global sort interleaves rows across groups) -->
            <template v-else-if="groupType === 'section'">
              <template v-for="(run, runIdx) in sectionRuns" :key="run.groupName + '-' + runIdx">
                <TableRow
                  :displayed-data="run.rows"
                  :ordered-columns="orderedColumns"
                  :column-summary="columnSummary"
                  :group-type="groupType"
                  :row-span="run.rows.length"
                  :row-shading="rowShading"
                  :link="link"
                  :row-numbers="rowNumbers"
                  :row-lines="rowLines"
                  :compact="compact"
                  :index="0"
                  :grouped="true"
                  :group-column="groupBy"
                  :group-name-position="groupNamePosition"
                />
                <SubtotalRow
                  v-if="subtotals"
                  :group-name="run.groupName"
                  :current-group-data="run.rows"
                  :column-summary="columnSummary"
                  :row-color="subtotalRowColor"
                  :font-color="subtotalFontColor"
                  :group-type="groupType"
                  :group-by="groupBy"
                  :ordered-columns="orderedColumns"
                  :compact="compact"
                  :table-subtotal-fmt="subtotalFmt"
                />
              </template>
            </template>
          </template>

          <!-- Non-grouped mode -->
          <template v-else>
            <TableRow
              :displayed-data="displayedData"
              :ordered-columns="orderedColumns"
              :column-summary="columnSummary"
              :row-shading="rowShading"
              :link="link"
              :row-numbers="rowNumbers"
              :row-lines="rowLines"
              :compact="compact"
              :index="isPaginated ? (currentPage - 1) * effectiveRows : 0"
            />
          </template>

          <!-- Total row -->
          <TotalRow
            v-if="totalRow && !debouncedSearchValue"
            :data="data"
            :column-summary="columnSummary"
            :row-numbers="rowNumbers"
            :row-color="totalRowColor"
            :font-color="totalFontColor"
            :group-type="groupType"
            :ordered-columns="orderedColumns"
            :compact="compact"
          />
        </tbody>
      </table>
    </div>

    <!-- No results -->
    <div v-if="search && debouncedSearchValue && searchFilteredData.length === 0" class="no-results">
      No Results
    </div>

    <!-- Pagination -->
    <div v-if="isPaginated && pageCount > 1" class="pagination-footer">
      <Pagination
        :current-page="currentPage"
        :page-count="pageCount"
        :total-rows="totalRowCount"
        :displayed-count="displayedData.length"
        @go-to-page="goToPage"
      />
      <div class="footer-actions">
        <TableFooter
          v-if="downloadable"
          :visible="hovering"
          @export-csv="handleExportCsv"
          @export-excel="handleExportExcel"
        />
        <FullscreenButton :visible="hovering" @open="isFullscreen = true" />
      </div>
    </div>
    <div v-else class="footer-actions-right">
      <TableFooter
        v-if="downloadable"
        :visible="hovering"
        @export-csv="handleExportCsv"
        @export-excel="handleExportExcel"
      />
      <FullscreenButton :visible="hovering" @open="isFullscreen = true" />
    </div>
    </template>

    <!-- Fullscreen dialog (always in DOM for ref stability) -->
    <dialog
      ref="fullscreenDialogRef"
      :class="['fullscreen-dialog', isFullscreenClosing ? 'slide-out' : isFullscreen ? 'slide-in' : '']"
      @click="handleFullscreenDialogClick"
      @keydown="handleFullscreenKeydown"
    >
      <button class="fullscreen-close-btn" aria-label="Close fullscreen" @click="closeFullscreen">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div class="fullscreen-content">
        <ChartHeader :title="title" :title-icon="titleIcon" :subtitle="subtitle" />
        <div class="scrollbox" :style="{ backgroundColor: backgroundColor || undefined }">
          <table>
            <TableHeader
              :ordered-columns="orderedColumns"
              :column-summary="columnSummary"
              :row-numbers="rowNumbers"
              :sortable="sortable"
              :sort-state="sortState"
              :format-column-titles="formatColumnTitles"
              :wrap-titles="wrapTitles"
              :compact="compact"
              :header-color="headerColor"
              :header-font-color="headerFontColor"
              :link="link"
              @sort-click="sortClick"
            />
            <tbody>
              <TableRow
                :displayed-data="fullscreenDisplayedData"
                :ordered-columns="orderedColumns"
                :column-summary="columnSummary"
                :row-shading="rowShading"
                :link="link"
                :row-numbers="rowNumbers"
                :row-lines="rowLines"
                :compact="compact"
                :index="(fullscreenPage - 1) * fullscreenRows"
              />
              <TotalRow
                v-if="totalRow"
                :data="data"
                :column-summary="columnSummary"
                :row-numbers="rowNumbers"
                :row-color="totalRowColor"
                :font-color="totalFontColor"
                :group-type="groupType"
                :ordered-columns="orderedColumns"
                :compact="compact"
              />
            </tbody>
          </table>
        </div>
        <!-- Fullscreen pagination -->
        <div v-if="fullscreenIsPaginated && fullscreenPageCount > 1" class="fullscreen-pagination">
          <Pagination
            :current-page="fullscreenPage"
            :page-count="fullscreenPageCount"
            :total-rows="sortedData.length"
            :displayed-count="fullscreenDisplayedData.length"
            @go-to-page="goToFullscreenPage"
          />
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.table-container {
  font-size: 9.5pt;
  margin-top: 8px;
  margin-bottom: 8px;
}

.table-container.table-paginated {
  margin-bottom: 20px;
}

.show-more-row td {
  padding: 0;
  border-bottom: 1px solid var(--table-border-color, #e5e7eb);
  position: sticky;
  left: 0;
}

.show-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: var(--table-row-shading, #f9fafb);
  border: none;
  color: var(--table-muted-color, #6b7280);
  cursor: pointer;
  font-size: 0.88em;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 150ms;
}

.show-more-btn:hover {
  background: #eef2f7;
  color: var(--table-link-color, #3b82f6);
}

.show-more-btn svg {
  flex-shrink: 0;
}

.show-more-meta {
  color: var(--table-muted-color, #9ca3af);
  font-weight: 400;
}


.scrollbox {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
}

table {
  display: table;
  min-width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.no-results {
  text-align: center;
  color: var(--table-muted-color, #999);
  margin-top: 8px;
  font-size: 0.9em;
}

.empty-state {
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-top: 4px;
}

.empty-error {
  background-color: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #dc2626;
}

.empty-warn {
  background-color: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.2);
  color: #a16207;
}

.empty-info {
  background-color: rgba(107, 114, 128, 0.06);
  border: 1px solid rgba(107, 114, 128, 0.15);
  color: #6b7280;
}

.pagination-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-actions-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}

/* Fullscreen dialog */
.fullscreen-dialog {
  width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  position: fixed;
  border: 1px solid var(--table-border-color, #e5e7eb);
  background: var(--table-bg, #fff);
  color: inherit;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 0;
  font-size: 9.5pt;
}

.fullscreen-dialog::backdrop {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
}

.fullscreen-dialog.slide-in {
  animation: slideInFromBottom 0.3s ease-in-out;
}

.fullscreen-dialog.slide-out {
  animation: slideOutToBottom 0.25s ease-in forwards;
}

.fullscreen-dialog.slide-out::backdrop {
  animation: fadeOutBackdrop 0.25s ease-in forwards;
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(70%);
    opacity: 0;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes slideOutToBottom {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(50px);
    opacity: 0;
  }
}

@keyframes fadeOutBackdrop {
  from {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
  }
  to {
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(0px);
  }
}

.fullscreen-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  color: inherit;
  opacity: 0.6;
  transition: all 200ms;
  z-index: 1;
}

.fullscreen-close-btn:hover {
  opacity: 1;
  background: var(--table-row-shading, #f3f4f6);
}

.fullscreen-content {
  padding: 32px 24px 16px;
  overflow: auto;
  max-height: calc(90vh - 16px);
}

.fullscreen-pagination {
  padding: 8px 0 0;
}

@media print {
  .fullscreen-dialog {
    display: none;
  }
}
</style>
