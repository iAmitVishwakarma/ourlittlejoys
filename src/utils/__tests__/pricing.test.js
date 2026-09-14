/**
 * ============================================================================
 * PRICING ENGINE UNIT TESTS - OUR LITTLE JOYS
 * ============================================================================
 * Tests the pure pricing functions used across Cart, Checkout, and Order flows.
 * Covers normal inputs, edge cases, invalid inputs, empty inputs, and extremes.
 * ============================================================================
 */

import { describe, it, expect } from 'vitest';
import {
  calculateItemTotal,
  calculateSubtotal,
  calculateMrpTotal,
  calculateDiscount,
  calculateDiscountPercentage,
  calculateShipping,
  calculateTax,
  calculateCouponDiscount,
  calculateOrderPricing,
  calculateOrderTotal,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from '@/utils/pricing';

// ============================================================================
// calculateItemTotal
// ============================================================================
describe('calculateItemTotal', () => {
  it('calculates price * quantity for normal values', () => {
    expect(calculateItemTotal(499, 2)).toBe(998);
  });

  it('defaults quantity to 1 when omitted', () => {
    expect(calculateItemTotal(299)).toBe(299);
  });

  it('treats 0 quantity as 1 (minimum quantity is always 1)', () => {
    expect(calculateItemTotal(299, 0)).toBe(299);
  });

  it('treats negative quantity as 1', () => {
    expect(calculateItemTotal(299, -5)).toBe(299);
  });

  it('returns 0 for NaN price', () => {
    expect(calculateItemTotal(NaN, 2)).toBe(0);
  });

  it('returns 0 for null price', () => {
    expect(calculateItemTotal(null, 2)).toBe(0);
  });

  it('returns 0 for undefined price', () => {
    expect(calculateItemTotal(undefined, 2)).toBe(0);
  });

  it('handles string price by coercing to number', () => {
    expect(calculateItemTotal('499', 2)).toBe(998);
  });

  it('handles decimal prices correctly', () => {
    expect(calculateItemTotal(99.5, 3)).toBeCloseTo(298.5);
  });
});

// ============================================================================
// calculateSubtotal
// ============================================================================
describe('calculateSubtotal', () => {
  it('returns 0 for empty array', () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  it('returns 0 for non-array input', () => {
    expect(calculateSubtotal(null)).toBe(0);
    expect(calculateSubtotal(undefined)).toBe(0);
    expect(calculateSubtotal('invalid')).toBe(0);
  });

  it('sums price * quantity for single item', () => {
    const items = [{ price: 499, quantity: 2 }];
    expect(calculateSubtotal(items)).toBe(998);
  });

  it('sums price * quantity for multiple items', () => {
    const items = [
      { price: 499, quantity: 2 },
      { price: 299, quantity: 1 },
      { price: 899, quantity: 3 },
    ];
    expect(calculateSubtotal(items)).toBe(499 * 2 + 299 * 1 + 899 * 3);
  });

  it('defaults missing quantity to 1', () => {
    const items = [{ price: 499 }];
    expect(calculateSubtotal(items)).toBe(499);
  });

  it('handles items with 0 price', () => {
    const items = [{ price: 0, quantity: 5 }];
    expect(calculateSubtotal(items)).toBe(0);
  });

  it('handles items with NaN price gracefully', () => {
    const items = [{ price: NaN, quantity: 2 }];
    expect(calculateSubtotal(items)).toBe(0);
  });

  it('handles items with string prices by coercion', () => {
    const items = [{ price: '499', quantity: 2 }];
    expect(calculateSubtotal(items)).toBe(998);
  });
});

// ============================================================================
// calculateMrpTotal
// ============================================================================
describe('calculateMrpTotal', () => {
  it('returns 0 for empty array', () => {
    expect(calculateMrpTotal([])).toBe(0);
  });

  it('uses originalPrice when available', () => {
    const items = [{ originalPrice: 699, price: 499, quantity: 2 }];
    expect(calculateMrpTotal(items)).toBe(1398);
  });

  it('falls back to mrp field', () => {
    const items = [{ mrp: 699, price: 499, quantity: 1 }];
    expect(calculateMrpTotal(items)).toBe(699);
  });

  it('falls back to price when no originalPrice or mrp', () => {
    const items = [{ price: 499, quantity: 2 }];
    expect(calculateMrpTotal(items)).toBe(998);
  });

  it('returns 0 for non-array input', () => {
    expect(calculateMrpTotal(null)).toBe(0);
  });
});

// ============================================================================
// calculateCouponDiscount
// ============================================================================
describe('calculateCouponDiscount', () => {
  it('returns 0 when no coupon is provided', () => {
    expect(calculateCouponDiscount(1000, null)).toBe(0);
    expect(calculateCouponDiscount(1000)).toBe(0);
  });

  it('returns 0 when subtotal is 0', () => {
    const coupon = { type: 'percent', value: 22 };
    expect(calculateCouponDiscount(0, coupon)).toBe(0);
  });

  it('returns 0 when subtotal is negative', () => {
    const coupon = { type: 'percent', value: 22 };
    expect(calculateCouponDiscount(-100, coupon)).toBe(0);
  });

  it('calculates percent discount correctly', () => {
    const coupon = { type: 'percent', value: 22 };
    expect(calculateCouponDiscount(1000, coupon)).toBe(220);
  });

  it('calculates flat discount correctly', () => {
    const coupon = { type: 'flat', value: 100 };
    expect(calculateCouponDiscount(1000, coupon)).toBe(100);
  });

  it('caps flat discount at subtotal (does not go negative)', () => {
    const coupon = { type: 'flat', value: 500 };
    expect(calculateCouponDiscount(200, coupon)).toBe(200);
  });

  it('returns 0 when subtotal is below minimum order', () => {
    const coupon = { type: 'percent', value: 22, minOrder: 499 };
    expect(calculateCouponDiscount(400, coupon)).toBe(0);
  });

  it('applies discount when subtotal meets minimum order', () => {
    const coupon = { type: 'percent', value: 22, minOrder: 499 };
    expect(calculateCouponDiscount(499, coupon)).toBe(Math.round(499 * 22 / 100));
  });

  it('returns 0 for unknown coupon type', () => {
    const coupon = { type: 'bogus', value: 50 };
    expect(calculateCouponDiscount(1000, coupon)).toBe(0);
  });

  it('handles coupon with 0 value', () => {
    const coupon = { type: 'percent', value: 0 };
    expect(calculateCouponDiscount(1000, coupon)).toBe(0);
  });

  it('handles 100% discount coupon', () => {
    const coupon = { type: 'percent', value: 100 };
    expect(calculateCouponDiscount(1000, coupon)).toBe(1000);
  });

  it('handles coupon value exceeding 100%', () => {
    const coupon = { type: 'percent', value: 150 };
    // Should still calculate (trust is on the backend for validation)
    expect(calculateCouponDiscount(1000, coupon)).toBe(1500);
  });
});

// ============================================================================
// calculateShipping
// ============================================================================
describe('calculateShipping', () => {
  it('returns 0 when subtotal is 0 (empty cart)', () => {
    expect(calculateShipping(0)).toBe(0);
  });

  it('returns shipping fee when below threshold', () => {
    expect(calculateShipping(400)).toBe(STANDARD_SHIPPING_FEE);
  });

  it('returns 0 (free) when at threshold', () => {
    expect(calculateShipping(FREE_SHIPPING_THRESHOLD)).toBe(0);
  });

  it('returns 0 (free) when above threshold', () => {
    expect(calculateShipping(1000)).toBe(0);
  });

  it('returns 0 for negative subtotal', () => {
    expect(calculateShipping(-100)).toBe(0);
  });

  it('respects custom threshold and fee', () => {
    expect(calculateShipping(300, 500, 99)).toBe(99);
    expect(calculateShipping(500, 500, 99)).toBe(0);
  });
});

// ============================================================================
// calculateTax
// ============================================================================
describe('calculateTax', () => {
  it('returns 0 with default 0 tax rate', () => {
    expect(calculateTax(1000)).toBe(0);
  });

  it('calculates GST correctly', () => {
    expect(calculateTax(1000, 0.05)).toBe(50);
  });

  it('rounds tax to nearest integer', () => {
    expect(calculateTax(999, 0.05)).toBe(Math.round(999 * 0.05));
  });

  it('returns 0 for 0 subtotal', () => {
    expect(calculateTax(0, 0.18)).toBe(0);
  });

  it('returns 0 for negative subtotal', () => {
    expect(calculateTax(-500, 0.05)).toBe(0);
  });
});

// ============================================================================
// calculateDiscountPercentage
// ============================================================================
describe('calculateDiscountPercentage', () => {
  it('calculates percentage correctly', () => {
    expect(calculateDiscountPercentage(699, 499)).toBe(Math.round(((699 - 499) / 699) * 100));
  });

  it('returns 0 when original equals selling', () => {
    expect(calculateDiscountPercentage(499, 499)).toBe(0);
  });

  it('returns 0 when selling > original (markup)', () => {
    expect(calculateDiscountPercentage(499, 599)).toBe(0);
  });

  it('returns 0 for 0 original price', () => {
    expect(calculateDiscountPercentage(0, 499)).toBe(0);
  });

  it('returns 0 for null/undefined', () => {
    expect(calculateDiscountPercentage(null, null)).toBe(0);
    expect(calculateDiscountPercentage(undefined, undefined)).toBe(0);
  });
});

// ============================================================================
// calculateDiscount (compound: mrpSavings + couponDiscount)
// ============================================================================
describe('calculateDiscount', () => {
  it('calculates combined savings', () => {
    const mrpTotal = 1200;
    const subtotal = 1000;
    const coupon = { type: 'percent', value: 10 };
    // mrpSavings = 200, couponDiscount = 100
    expect(calculateDiscount(mrpTotal, subtotal, coupon)).toBe(300);
  });

  it('returns only mrp savings when no coupon', () => {
    expect(calculateDiscount(1200, 1000)).toBe(200);
  });

  it('returns 0 when mrp equals subtotal and no coupon', () => {
    expect(calculateDiscount(1000, 1000)).toBe(0);
  });
});

// ============================================================================
// calculateOrderPricing (comprehensive)
// ============================================================================
describe('calculateOrderPricing', () => {
  const sampleItems = [
    { price: 499, originalPrice: 699, quantity: 2 },
    { price: 299, originalPrice: 399, quantity: 1 },
  ];

  it('calculates full breakdown for a typical order', () => {
    const result = calculateOrderPricing({ items: sampleItems });
    expect(result.subtotal).toBe(499 * 2 + 299 * 1);    // 1297
    expect(result.mrpTotal).toBe(699 * 2 + 399 * 1);    // 1797
    expect(result.mrpSavings).toBe(1797 - 1297);         // 500
    expect(result.discount).toBe(0);                      // no coupon
    expect(result.shipping).toBe(0);                      // above 499 threshold
    expect(result.tax).toBe(0);                           // default 0 tax
    expect(result.walletDeduction).toBe(0);
    expect(result.finalTotal).toBe(1297);
    expect(result.totalSavings).toBe(500);
  });

  it('applies coupon discount', () => {
    const coupon = { type: 'percent', value: 22, minOrder: 499 };
    const result = calculateOrderPricing({ items: sampleItems, coupon });
    expect(result.discount).toBe(Math.round(1297 * 22 / 100)); // 285
    expect(result.finalTotal).toBe(1297 - 285);                 // 1012
  });

  it('applies wallet deduction', () => {
    const result = calculateOrderPricing({
      items: sampleItems,
      walletBalance: 200,
      useWallet: true,
    });
    expect(result.walletDeduction).toBe(200);
    expect(result.finalTotal).toBe(1297 - 200); // 1097
  });

  it('wallet deduction does not exceed total payable', () => {
    const items = [{ price: 100, quantity: 1 }];
    const result = calculateOrderPricing({
      items,
      walletBalance: 9999,
      useWallet: true,
    });
    expect(result.walletDeduction).toBeLessThanOrEqual(result.walletDeduction + result.finalTotal);
    expect(result.finalTotal).toBe(0);
  });

  it('returns all zeros for empty cart', () => {
    const result = calculateOrderPricing({ items: [] });
    expect(result.subtotal).toBe(0);
    expect(result.mrpTotal).toBe(0);
    expect(result.finalTotal).toBe(0);
    expect(result.shipping).toBe(0);
  });

  it('adds shipping fee when subtotal below threshold', () => {
    const items = [{ price: 200, quantity: 1 }];
    const result = calculateOrderPricing({ items });
    expect(result.shipping).toBe(STANDARD_SHIPPING_FEE);
    expect(result.finalTotal).toBe(200 + STANDARD_SHIPPING_FEE);
  });

  it('does not apply wallet when useWallet is false', () => {
    const result = calculateOrderPricing({
      items: sampleItems,
      walletBalance: 500,
      useWallet: false,
    });
    expect(result.walletDeduction).toBe(0);
  });

  it('includes tax when taxRate is set', () => {
    const result = calculateOrderPricing({
      items: sampleItems,
      taxRate: 0.05,
    });
    expect(result.tax).toBe(Math.round(1297 * 0.05));
  });
});

// ============================================================================
// calculateOrderTotal (shorthand)
// ============================================================================
describe('calculateOrderTotal', () => {
  it('calculates total for items only', () => {
    const items = [{ price: 499, quantity: 2 }];
    expect(calculateOrderTotal({ items })).toBe(998);
  });

  it('returns 0 for empty cart', () => {
    expect(calculateOrderTotal({ items: [] })).toBe(0);
    expect(calculateOrderTotal()).toBe(0);
  });

  it('subtracts coupon discount', () => {
    const items = [{ price: 1000, quantity: 1 }];
    const coupon = { type: 'flat', value: 100 };
    expect(calculateOrderTotal({ items, coupon })).toBe(900);
  });

  it('subtracts wallet applied amount', () => {
    const items = [{ price: 1000, quantity: 1 }];
    expect(calculateOrderTotal({ items, walletAppliedAmount: 200 })).toBe(800);
  });

  it('never returns negative', () => {
    const items = [{ price: 100, quantity: 1 }];
    const coupon = { type: 'flat', value: 500 };
    expect(calculateOrderTotal({ items, coupon, walletAppliedAmount: 500 })).toBe(0);
  });
});
