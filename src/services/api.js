/**
 * ============================================================================
 * BACKEND API SERVICE LAYER - OUR LITTLE JOYS
 * ============================================================================
 * 
 * NOTE FOR BACKEND DEVELOPER:
 * This file serves as the unified API interface between the React frontend
 * and your backend server (Node.js/Express, Python/Django/FastAPI, Go, PHP, etc.).
 * 
 * 1. Set your backend URL in your environment file (.env):
 *    VITE_API_BASE_URL=https://api.yourdomain.com/v1
 * 
 * 2. All functions return standardized Promise data: { success, data, message }.
 *    Currently, fallback mock data is provided so the frontend runs seamlessly
 *    out of the box while backend development is in progress.
 * ============================================================================
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Generic API request wrapper with authentication and error handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('lj_auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API] Endpoint "${endpoint}" fetch failed, using fallback mock data. Reason:`, error.message);
    return null; // Return null so callers can gracefully fallback to mock data
  }
}

/* ============================================================================
 * 1. PRODUCT CATALOG APIS
 * ============================================================================ */

export const productService = {
  /**
   * BACKEND ENDPOINT: GET /api/products
   * Query params supported: ?category=nutrimix&age=2-6&search=powder&filter=newlaunches
   */
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/products?${query}` : '/products';
    const res = await request(endpoint);
    return res?.data || null;
  },

  /**
   * BACKEND ENDPOINT: GET /api/products/:slug
   */
  async getProductBySlug(slug) {
    const res = await request(`/products/${slug}`);
    return res?.data || null;
  },

  /**
   * BACKEND ENDPOINT: GET /api/products/cross-sell
   * Used on checkout page for "Parents Also Purchase"
   */
  async getCrossSellProducts() {
    const res = await request('/products/cross-sell');
    return res?.data || null;
  }
};

/* ============================================================================
 * 2. CART & COUPON APIS
 * ============================================================================ */

export const cartService = {
  /**
   * BACKEND ENDPOINT: POST /api/cart/sync
   * Payload: { items: [{ productId, quantity, variantId }] }
   */
  async syncCart(items) {
    const res = await request('/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
    return res?.data || null;
  },

  /**
   * BACKEND ENDPOINT: POST /api/cart/apply-coupon
   * Payload: { couponCode: "JOY30", cartTotal: 999 }
   * Response expected: { valid: true, discountAmount: 298, couponCode: "JOY30" }
   */
  async applyCoupon(couponCode, cartTotal) {
    const res = await request('/cart/apply-coupon', {
      method: 'POST',
      body: JSON.stringify({ couponCode, cartTotal }),
    });
    if (res) return res;

    // Default mock coupon validation for offline frontend testing
    const code = couponCode.trim().toUpperCase();
    if (code === 'JOY30') {
      return { valid: true, discountPercent: 30, discountAmount: Math.round(cartTotal * 0.30), message: '30% LJ Wallet discount applied!' };
    }
    if (code === 'FIRST100') {
      return { valid: true, discountPercent: 0, discountAmount: 100, message: 'Flat ₹100 First Order discount applied!' };
    }
    if (code === 'LJWALLET') {
      return { valid: true, discountPercent: 20, discountAmount: Math.round(cartTotal * 0.20), message: '₹200 Welcome Wallet applied!' };
    }
    return { valid: false, discountAmount: 0, message: 'Invalid coupon code. Try JOY30 or FIRST100.' };
  }
};

/* ============================================================================
 * 3. HONEST LAB REPORT APIS
 * ============================================================================ */

export const reportService = {
  /**
   * BACKEND ENDPOINT: GET /api/reports/batch/:batchNumber
   * or GET /api/reports?age=2-6&flavour=chocolate
   * 
   * Response expected:
   * {
   *    batchNumber: "SL-2026-NM09",
   *    mfgDate: "10-Aug-2026",
   *    expDate: "09-Aug-2027",
   *    labName: "National Accreditation Board (NABL) Certified Labs",
   *    proteinContent: { actual: 18.4, unit: "g/100g", standard: "Min 16.0g" },
   *    heavyMetals: [
   *      { parameter: "Lead (Pb)", result: "BDL (<0.05 ppm)", permissibleLimit: "Max 2.5 ppm", status: "PASSED" },
   *      { parameter: "Arsenic (As)", result: "BDL (<0.02 ppm)", permissibleLimit: "Max 1.1 ppm", status: "PASSED" },
   *      { parameter: "Cadmium (Cd)", result: "BDL (<0.01 ppm)", permissibleLimit: "Max 1.0 ppm", status: "PASSED" },
   *      { parameter: "Mercury (Hg)", result: "BDL (<0.01 ppm)", permissibleLimit: "Max 0.25 ppm", status: "PASSED" }
   *    ]
   * }
   */
  async getBatchReport(batchNumber, age = '', flavour = '') {
    const query = new URLSearchParams({ batchNumber, age, flavour }).toString();
    const res = await request(`/reports/batch?${query}`);
    return res?.data || null;
  }
};

/* ============================================================================
 * 4. ORDER & USER APIS
 * ============================================================================ */

export const orderService = {
  /**
   * BACKEND ENDPOINT: POST /api/orders/create
   * Payload:
   * {
   *    items: [...],
   *    shippingAddress: { name, phone, address, pincode, city, state },
   *    pricing: { itemTotal, discount, handlingFee, orderTotal },
   *    couponCode: "JOY30",
   *    paymentMethod: "RAZORPAY" | "COD" | "WALLET"
   * }
   */
  async createOrder(orderPayload) {
    const res = await request('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
    return res || null;
  },

  /**
   * BACKEND ENDPOINT: GET /api/orders/:orderId
   */
  async getOrderDetails(orderId) {
    const res = await request(`/orders/${orderId}`);
    return res?.data || null;
  }
};
