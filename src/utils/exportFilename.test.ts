import { describe, expect, it } from 'vitest';
import { toExportFilename } from './exportFilename';

describe('toExportFilename', () => {
  it('lowercases and joins words with underscores', () => {
    expect(toExportFilename('Tokens per Request', 'data')).toBe('tokens_per_request');
  });

  it('collapses punctuation and trims the edges', () => {
    expect(toExportFilename('  Revenue (EUR) / Month — 2026!  ', 'data')).toBe('revenue_eur_month_2026');
  });

  it('keeps non-Latin letters', () => {
    expect(toExportFilename('Įmokos pagal šalį', 'data')).toBe('įmokos_pagal_šalį');
  });

  it('falls back when the title is missing or empty after cleaning', () => {
    expect(toExportFilename(undefined, 'table_data')).toBe('table_data');
    expect(toExportFilename('***', 'data')).toBe('data');
  });
});
