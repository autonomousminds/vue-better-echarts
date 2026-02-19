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
} from '../../types/table.types';
import type { TableContext } from '../../symbols/injectionKeys';
import { tableContextKey } from '../../symbols/injectionKeys';
import { getColumnSummary, getFinalColumnOrder, aggregateColumn, autoConvertDateColumns } from '../../utils/tableUtils';
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
  emptySet: 'error',
  emptyMessage: 'No records',
});

// Resolve effective rows count: "all" means show everything
const effectiveRows = computed(() => {
  if (props.rows === 'all') return Infinity;
  return props.rows;
});

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

// Debug counters — remove after confirming the recursive update fix
let _dbgReg = 0, _dbgUnreg = 0, _dbgUpd = 0;

const tableContext: TableContext = reactive({
  registerColumn(config: TableColumnConfig) {
    console.log(`[DataTable] registerColumn #${++_dbgReg}: ${config.id}`);
    const idx = registeredColumns.value.findIndex((c) => c.id === config.id);
    if (idx === -1) {
      registeredColumns.value.push(config);
    } else if (!columnConfigsEqual(registeredColumns.value[idx], config)) {
      registeredColumns.value[idx] = config;
    }
  },
  unregisterColumn(id: string) {
    console.log(`[DataTable] unregisterColumn #${++_dbgUnreg}: ${id}`);
    registeredColumns.value = registeredColumns.value.filter((c) => c.id !== id);
  },
  updateColumn(config: TableColumnConfig) {
    console.log(`[DataTable] updateColumn #${++_dbgUpd}: ${config.id} (changed: ${!columnConfigsEqual(registeredColumns.value.find(c => c.id === config.id) ?? {} as TableColumnConfig, config)})`);
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
const columnSummary = computed<ColumnSummaryItem[]>(() => {
  if (!props.data || props.data.length === 0) return [];
  return getColumnSummary(props.data);
});

// ─── Date Auto-Conversion ───────────────────────────────────────────────
// Compute separately from columnSummary to avoid circular reactive pressure.
// Only re-runs when props.data changes (not when columnSummary changes).
const processedData = computed(() => {
  if (!props.data || props.data.length === 0) return props.data;
  // Detect date-typed string columns by checking the column summary snapshot
  // Use getColumnSummary directly instead of the columnSummary computed to avoid
  // creating a reactive dependency loop.
  const summary = getColumnSummary(props.data);
  return autoConvertDateColumns(props.data, summary);
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
  if (registeredColumns.value.length > 0) return registeredColumns.value;
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
      const parts = sort.split(' ');
      sortState.value = {
        col: parts[0],
        ascending: parts[1] !== 'desc',
      };
    }
  },
  { immediate: true }
);

function sortClick(column: string) {
  if (sortState.value.col === column) {
    sortState.value = { col: column, ascending: !sortState.value.ascending };
  } else {
    sortState.value = { col: column, ascending: true };
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
  if (!sortState.value.col) return searchFilteredData.value;
  return [...searchFilteredData.value].sort(comparator);
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

// Initialize toggle states for new groups
watch(
  groupedData,
  (newGroups) => {
    for (const groupName of Object.keys(newGroups)) {
      if (!(groupName in groupToggleStates.value)) {
        groupToggleStates.value[groupName] = props.groupsOpen;
      }
    }
  },
  { immediate: true }
);

function handleToggle(groupName: string) {
  groupToggleStates.value[groupName] = !groupToggleStates.value[groupName];
}

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
const isPaginated = computed(() => sortedData.value.length > effectiveRows.value && !props.groupBy);
const currentPage = ref(1);

const pageCount = computed(() =>
  isPaginated.value ? Math.ceil(sortedData.value.length / effectiveRows.value) : 1
);

// Reset page when data/search changes
watch([sortedData, effectiveRows], () => {
  if (currentPage.value > pageCount.value) {
    currentPage.value = Math.max(1, pageCount.value);
  }
});

const displayedData = computed(() => {
  if (!isPaginated.value) return sortedData.value;
  const start = (currentPage.value - 1) * effectiveRows.value;
  return sortedData.value.slice(start, start + effectiveRows.value);
});

function goToPage(page: number) {
  currentPage.value = Math.max(1, Math.min(page, pageCount.value));
}

// ─── Data for export ───────────────────────────────────────────────────
const exportColumns = computed(() => effectiveColumns.value.map((d) => d.id));

// ─── Has data check ─────────────────────────────────────────────────────
const hasData = computed(() => !!props.data && props.data.length > 0);

// ─── Hover state (for footer visibility) ───────────────────────────────
const hovering = ref(false);

// ─── Fullscreen ─────────────────────────────────────────────────────────
const isFullscreen = ref(false);
const fullscreenDialogRef = ref<HTMLDialogElement>();

watch(isFullscreen, (open) => {
  const dialog = fullscreenDialogRef.value;
  if (!dialog) return;
  if (open) {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  } else {
    dialog.close();
    document.body.style.overflow = '';
  }
});

function closeFullscreen() {
  isFullscreen.value = false;
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
        :class="{ 'empty-error': emptySet === 'error', 'empty-warn': emptySet === 'warn' }"
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
            <template v-for="groupName in sortedGroupNames" :key="groupName">
              <!-- Accordion mode -->
              <template v-if="groupType === 'accordion'">
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
                  :displayed-data="groupedData[groupName]"
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
              </template>

              <!-- Section mode -->
              <template v-else-if="groupType === 'section'">
                <TableRow
                  :displayed-data="groupedData[groupName]"
                  :ordered-columns="orderedColumns"
                  :column-summary="columnSummary"
                  :group-type="groupType"
                  :row-span="groupedData[groupName].length"
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
                  :group-name="groupName"
                  :current-group-data="groupedData[groupName]"
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
              :index="(currentPage - 1) * effectiveRows"
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
        :total-rows="sortedData.length"
        :displayed-count="displayedData.length"
        @go-to-page="goToPage"
      />
      <div class="footer-actions">
        <TableFooter
          v-if="downloadable"
          :data="data"
          :columns="exportColumns"
          :visible="hovering"
        />
        <FullscreenButton :visible="hovering" @open="isFullscreen = true" />
      </div>
    </div>
    <div v-else class="footer-actions-right">
      <TableFooter
        v-if="downloadable"
        :data="data"
        :columns="exportColumns"
        :visible="hovering"
      />
      <FullscreenButton :visible="hovering" @open="isFullscreen = true" />
    </div>
    </template>

    <!-- Fullscreen dialog (always in DOM for ref stability) -->
    <dialog
      ref="fullscreenDialogRef"
      :class="['fullscreen-dialog', isFullscreen ? 'slide-in' : 'slide-out']"
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
        <div v-if="title || subtitle" class="table-title-section">
          <div v-if="title" class="table-title" :class="{ 'has-subtitle': !!subtitle }">{{ title }}</div>
          <div v-if="subtitle" class="table-subtitle">{{ subtitle }}</div>
        </div>
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
                :displayed-data="sortedData"
                :ordered-columns="orderedColumns"
                :column-summary="columnSummary"
                :row-shading="rowShading"
                :link="link"
                :row-numbers="rowNumbers"
                :row-lines="rowLines"
                :compact="compact"
                :index="0"
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


.scrollbox {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
}

table {
  display: table;
  width: 100%;
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

.fullscreen-dialog.slide-out::backdrop {
  all: unset;
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

@media print {
  .fullscreen-dialog {
    display: none;
  }
}
</style>
