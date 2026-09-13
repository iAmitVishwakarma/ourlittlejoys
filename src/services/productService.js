/**
 * ============================================================================
 * PRODUCT DOMAIN SERVICE - OUR LITTLE JOYS
 * ============================================================================
 * Single point of access for catalog data:
 * - Products
 * - Categories
 * - Product Details
 * - Cross-sell Recommendations
 * - Product Reviews
 * 
 * Fetches through apiClient with automatic fallback to static seed data
 * whenever the mock backend (json-server) is offline or initialising.
 * Standardizes ID lookups using string coercion (F-3.2).
 * ============================================================================
 */

import { apiClient, normalizeData } from './apiClient';
import { ALL_PRODUCTS, CROSS_SELL_PRODUCTS, HERO_SLIDES } from '@/data/products';

export const productService = {
  /**
   * Fetch complete product catalog with category & tag filters
   */
  async getAllProducts(params = {}) {
    try {
      const res = await apiClient.get('/products', params);
      const data = normalizeData(res);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('[productService] Backend fetch failed, falling back to seed catalog:', err);
    }
    return ALL_PRODUCTS;
  },

  /**
   * Fetch single product by slug or ID
   * Normalizes IDs using string comparison to avoid parseInt bugs (F-3.2)
   */
  async getProductBySlugOrId(slugOrId) {
    if (!slugOrId) return null;
    const target = String(slugOrId).toLowerCase().trim();

    try {
      // 1. Attempt slug query
      const res = await apiClient.get('/products', { slug: slugOrId });
      const data = normalizeData(res);
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }

      // 2. Attempt direct ID query
      const resById = await apiClient.get(`/products/${slugOrId}`);
      if (resById.success && resById.data) {
        return resById.data;
      }
    } catch {
      // Fall through to seed lookup
    }

    // Seed fallback lookup with normalized string comparison
    return (
      ALL_PRODUCTS.find(
        (p) =>
          String(p.id).toLowerCase() === target ||
          String(p.slug || '').toLowerCase() === target
      ) || null
    );
  },

  /**
   * Fetch products filtered by category
   */
  async getProductsByCategory(category) {
    if (!category || category === 'all') {
      return this.getAllProducts();
    }
    const targetCat = String(category).toLowerCase().trim();
    try {
      const res = await apiClient.get('/products', { category: targetCat });
      const data = normalizeData(res);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
      // Fall through to seed filtering
    }

    return ALL_PRODUCTS.filter(
      (p) => String(p.category || '').toLowerCase() === targetCat
    );
  },

  /**
   * Fetch cross-sell product recommendations for Cart & PDP
   */
  async getCrossSellProducts() {
    try {
      const res = await apiClient.get('/products', { isCrossSell: true });
      const data = normalizeData(res);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback
    }
    return CROSS_SELL_PRODUCTS || ALL_PRODUCTS.slice(0, 3);
  },

  /**
   * Fetch hero banner slides
   */
  async getHeroSlides() {
    try {
      const res = await apiClient.get('/hero_slides');
      const data = normalizeData(res);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback
    }
    return HERO_SLIDES;
  },

  /**
   * Fetch customer reviews for a given product ID
   */
  async getReviews(productId) {
    const targetId = String(productId);
    try {
      const res = await apiClient.get('/reviews', { productId: targetId });
      const data = normalizeData(res);
      if (Array.isArray(data)) {
        return data;
      }
    } catch {
      // Fallback
    }
    return [];
  },

  /**
   * Submit new review
   */
  async submitReview(reviewData) {
    return apiClient.post('/reviews', {
      ...reviewData,
      createdAt: new Date().toISOString()
    });
  }
};

export default productService;
