/**
 * ============================================================================
 * PURE PRICING ENGINE - OUR LITTLE JOYS
 * ============================================================================
 * Single source of truth for all ecommerce monetary calculations.
 * Ensures strict determinism, avoids rounding discrepancies across Cart,
 * Checkout, and Order placement, and is completely prepared for server-side
 * total validation once the live backend is integrated.
 * ============================================================================
 */

export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_THRESHOLD = FREE_SHIPPING_THRESHOLD;
export const STANDARD_SHIPPING_FEE = 49;
export const DEFAULT_DELIVERY_FEE = STANDARD_SHIPPING_FEE;
export const TAX_RATE = 0.05; // 5% GST rate
export const DEFAULT_TAX_RATE = TAX_RATE;

/**
 * Calculates item subtotal: price * quantity
 */
export function calculateItemTotal(price, quantity = 1) {
  const safePrice = Number(price) || 0;
  const safeQty = Math.max(1, Number(quantity) || 1);
  return safePrice * safeQty;
}

/**
 * Calculates cart subtotal across all active items (sum of price * quantity)
 */
export function calculateSubtotal(items = []) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Math.max(1, Number(item.quantity) || 1);
    return sum + price * quantity;
  }, 0);
}

/**
 * Calculates total MRP across all active items (for savings display)
 */
export function calculateMrpTotal(items = []) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const mrp = Number(item.originalPrice) || Number(item.mrp) || Number(item.price) || 0;
    const quantity = Math.max(1, Number(item.quantity) || 1);
    return sum + mrp * quantity;
  }, 0);
}

/**
 * Calculates total discount (mrpSavings + couponSavings)
 * Returns positive savings number
 */
export function calculateDiscount(mrpTotal, subtotal, coupon = null) {
  const safeMrp = Math.max(0, Number(mrpTotal) || 0);
  const safeSubtotal = Math.max(0, Number(subtotal) || 0);
  const mrpSavings = Math.max(0, safeMrp - safeSubtotal);
  const couponDiscount = calculateCouponDiscount(safeSubtotal, coupon);
  return mrpSavings + couponDiscount;
}

/**
 * Calculates delivery / shipping surcharge
 * Returns 0 if subtotal is zero or exceeds threshold (default: ₹499), else STANDARD_SHIPPING_FEE (₹49)
 */
export function calculateShipping(subtotal, threshold = FREE_SHIPPING_THRESHOLD, deliveryFee = STANDARD_SHIPPING_FEE) {
  const safeSubtotal = Number(subtotal) || 0;
  if (safeSubtotal <= 0) return 0;
  return safeSubtotal >= threshold ? 0 : deliveryFee;
}

/**
 * Calculates estimated tax (GST) for subtotal
 */
export function calculateTax(subtotal, taxRate = 0) {
  const safeSubtotal = Number(subtotal) || 0;
  if (safeSubtotal <= 0) return 0;
  return Math.round(safeSubtotal * taxRate);
}

/**
 * Calculates discount amount derived from an applied coupon
 */
export function calculateCouponDiscount(subtotal, coupon = null) {
  const safeSubtotal = Number(subtotal) || 0;
  if (!coupon || safeSubtotal <= 0) return 0;

  if (coupon.minOrder && safeSubtotal < coupon.minOrder) {
    return 0;
  }

  if (coupon.type === 'percent') {
    const percent = Number(coupon.value) || 0;
    return Math.round((safeSubtotal * percent) / 100);
  }

  if (coupon.type === 'flat') {
    const flat = Number(coupon.value) || 0;
    return Math.min(flat, safeSubtotal);
  }

  return 0;
}

/**
 * Comprehensive Order Pricing Calculator
 * Computes deterministic breakdown of:
 * - subtotal
 * - mrpTotal
 * - mrpSavings
 * - discount (coupon)
 * - shipping
 * - tax
 * - walletDeduction
 * - finalTotal
 * - totalSavings
 */
export function calculateOrderPricing({
  items = [],
  coupon = null,
  walletBalance = 0,
  useWallet = false,
  threshold = SHIPPING_THRESHOLD,
  deliveryFee = DEFAULT_DELIVERY_FEE,
  taxRate = 0 // By Indian D2C convention, catalog prices are inclusive of GST
}) {
  const subtotal = calculateSubtotal(items);
  const mrpTotal = calculateMrpTotal(items);
  const mrpSavings = Math.max(0, mrpTotal - subtotal);
  const discount = calculateCouponDiscount(subtotal, coupon);
  const shipping = calculateShipping(subtotal, threshold, deliveryFee);
  const tax = calculateTax(subtotal, taxRate);

  // Intermediate payable before wallet
  const intermediatePayable = subtotal === 0 ? 0 : Math.max(0, subtotal - discount + shipping + tax);

  // Wallet deduction
  const safeWalletBalance = Math.max(0, Number(walletBalance) || 0);
  const walletDeduction = useWallet ? Math.min(safeWalletBalance, intermediatePayable) : 0;
  const finalTotal = Math.max(0, intermediatePayable - walletDeduction);

  const totalSavings = mrpSavings + discount + walletDeduction;

  return {
    subtotal,
    mrpTotal,
    mrpSavings,
    discount,
    shipping,
    tax,
    walletDeduction,
    finalTotal,
    totalSavings,
  };
}

/**
 * Calculates final order total considering items, coupon, and applied wallet deduction
 */
export function calculateOrderTotal({
  items = [],
  coupon = null,
  walletAppliedAmount = 0,
  threshold = FREE_SHIPPING_THRESHOLD,
  deliveryFee = STANDARD_SHIPPING_FEE,
  taxRate = 0
} = {}) {
  const subtotal = calculateSubtotal(items);
  if (subtotal === 0) return 0;
  const discount = calculateCouponDiscount(subtotal, coupon);
  const shipping = calculateShipping(subtotal, threshold, deliveryFee);
  const tax = calculateTax(subtotal, taxRate);
  const netBeforeWallet = Math.max(0, subtotal - discount + shipping + tax);
  return Math.max(0, netBeforeWallet - Math.max(0, Number(walletAppliedAmount) || 0));
}

export default {
  calculateItemTotal,
  calculateSubtotal,
  calculateMrpTotal,
  calculateDiscount,
  calculateShipping,
  calculateTax,
  calculateCouponDiscount,
  calculateOrderPricing,
  calculateOrderTotal,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
  DEFAULT_DELIVERY_FEE,
  TAX_RATE,
  DEFAULT_TAX_RATE
};

