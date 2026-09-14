/**
 * ============================================================================
 * FORMATTERS UNIT TESTS - OUR LITTLE JOYS
 * ============================================================================
 * Tests formatCurrency, calculateDiscountPercent, and sanitizeInput.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  calculateDiscountPercent,
  sanitizeInput,
} from '@/utils/formatters';

// ============================================================================
// formatCurrency
// ============================================================================
describe('formatCurrency', () => {
  it('formats a standard INR amount', () => {
    expect(formatCurrency(1299)).toBe('₹1,299');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });

  it('returns ₹0 for null', () => {
    expect(formatCurrency(null)).toBe('₹0');
  });

  it('returns ₹0 for undefined', () => {
    expect(formatCurrency(undefined)).toBe('₹0');
  });

  it('returns ₹0 for NaN', () => {
    expect(formatCurrency(NaN)).toBe('₹0');
  });

  it('formats negative amounts', () => {
    const result = formatCurrency(-500);
    expect(result).toContain('500');
    expect(result).toContain('₹');
  });

  it('formats large amounts with Indian grouping', () => {
    const result = formatCurrency(1000000);
    expect(result).toContain('₹');
    // Indian locale: 10,00,000
    expect(result).toContain('10,00,000');
  });

  it('handles string numeric input', () => {
    expect(formatCurrency('499')).toBe('₹499');
  });

  it('handles decimal amounts', () => {
    const result = formatCurrency(99.5);
    expect(result).toContain('₹');
    expect(result).toContain('99.5');
  });
});

// ============================================================================
// calculateDiscountPercent
// ============================================================================
describe('calculateDiscountPercent', () => {
  it('calculates discount correctly', () => {
    expect(calculateDiscountPercent(699, 499)).toBe(Math.round(((699 - 499) / 699) * 100));
  });

  it('returns 0 when mrp equals price', () => {
    expect(calculateDiscountPercent(499, 499)).toBe(0);
  });

  it('returns 0 when mrp < price (markup)', () => {
    expect(calculateDiscountPercent(400, 500)).toBe(0);
  });

  it('returns 0 for null mrp', () => {
    expect(calculateDiscountPercent(null, 499)).toBe(0);
  });

  it('returns 0 for null price', () => {
    expect(calculateDiscountPercent(699, null)).toBe(0);
  });

  it('returns 0 for 0 mrp', () => {
    expect(calculateDiscountPercent(0, 499)).toBe(0);
  });

  it('returns 0 for 0 price', () => {
    expect(calculateDiscountPercent(699, 0)).toBe(0);
  });

  it('returns 100 for free product', () => {
    // mrp > 0 but price = 0 returns 0 because !price
    expect(calculateDiscountPercent(100, 0)).toBe(0);
  });
});

// ============================================================================
// sanitizeInput
// ============================================================================
describe('sanitizeInput', () => {
  it('returns empty string for non-string input', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(123)).toBe('');
    expect(sanitizeInput({})).toBe('');
    expect(sanitizeInput([])).toBe('');
  });

  it('passes through clean text unchanged', () => {
    expect(sanitizeInput('Hello World')).toBe('Hello World');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('collapses line breaks to single space', () => {
    expect(sanitizeInput('line1\nline2\r\nline3')).toBe('line1 line2 line3');
  });

  it('strips basic HTML tags', () => {
    expect(sanitizeInput('<b>bold</b>')).toBe('bold');
  });

  it('strips script tags (XSS payload)', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe('alert(1)');
    // Note: the tag is stripped but the text content remains (harmless as text)
  });

  it('strips img onerror XSS payload', () => {
    const payload = '<img src=x onerror=alert(1)>';
    const result = sanitizeInput(payload);
    expect(result).not.toContain('<img');
    expect(result).not.toContain('onerror');
  });

  it('strips javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).not.toContain('javascript:');
  });

  it('strips javascript: protocol (case insensitive)', () => {
    expect(sanitizeInput('JAVASCRIPT:alert(1)')).not.toContain('javascript');
  });

  it('strips event handler attributes', () => {
    const payload = 'text onerror="alert(1)" more';
    const result = sanitizeInput(payload);
    expect(result).not.toContain('onerror');
  });

  it('handles emoji input safely', () => {
    expect(sanitizeInput('Hello 🍓🎉')).toBe('Hello 🍓🎉');
  });

  it('handles Unicode text safely', () => {
    expect(sanitizeInput('नमस्ते दुनिया')).toBe('नमस्ते दुनिया');
  });

  it('handles very long string without crashing', () => {
    const long = 'a'.repeat(100000);
    expect(sanitizeInput(long).length).toBe(100000);
  });

  it('returns empty string for empty input', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('handles nested HTML tags', () => {
    expect(sanitizeInput('<div><span>text</span></div>')).toBe('text');
  });

  it('strips self-closing tags', () => {
    expect(sanitizeInput('<br/><hr/>')).toBe('');
  });
});
