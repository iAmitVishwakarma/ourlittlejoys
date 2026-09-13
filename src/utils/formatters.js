/**
 * Format a number into Indian Rupee currency string (e.g. ₹1,299)
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Calculate percentage discount between MRP and selling price
 * @param {number} mrp
 * @param {number} price
 * @returns {number} discount percent rounded
 */
export function calculateDiscountPercent(mrp, price) {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Sanitize user input by stripping HTML tags and trimming extra whitespace (F-4.3)
 * @param {string} str
 * @returns {string}
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\r\n]+/g, ' ') // Collapse line breaks
    .trim();
}

