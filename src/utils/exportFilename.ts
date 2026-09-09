/**
 * Builds a download filename stem from a chart or table title: lowercased,
 * runs of anything that is not a letter or digit collapsed to "_".
 * Falls back when the title is missing or reduces to nothing.
 */
export function toExportFilename(title: string | null | undefined, fallback: string): string {
  const stem = (title ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '_')
    .replace(/^_+|_+$/g, '');
  return stem || fallback;
}
