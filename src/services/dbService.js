/**
 * ============================================================================
 * LEGACY DB SERVICE (DEPRECATED)
 * ============================================================================
 * @deprecated Use domain-specific services (productService, orderService, etc.) instead.
 */

import { productService } from './productService';
import { orderService } from './orderService';

export const dbService = {
  getHeroSlides: () => productService.getHeroSlides(),
  getProducts: () => productService.getAllProducts(),
  getProductBySlug: (slug) => productService.getProductBySlugOrId(slug),
  getCategories: () => [
    'Nutrimix', 'Gummies', 'Spreads & Sauce', 'Cereals & Snacks', 'Protein', 'Brain Health', 'For Moms', 'Best Value'
  ],
  getReviews: (productId) => productService.getReviews(productId),
  getCoupons: () => [
    { code: 'JOY30', discountPercent: 30, description: '30% LJ Wallet discount' },
    { code: 'FIRST100', discountAmount: 100, description: 'Flat ₹100 First Order' },
  ],
  getUserProfile: () => null,
  getOrders: () => orderService.getUserOrders(),
};

export default dbService;
