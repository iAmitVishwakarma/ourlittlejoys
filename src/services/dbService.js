import { ALL_PRODUCTS, HERO_SLIDES } from '../data/products';
import { apiClient } from './apiClient';

/**
 * Service to interface with product catalog and user data without statically bundling db.json.
 */
export const dbService = {
  getHeroSlides: () => HERO_SLIDES || [],
  getProducts: () => ALL_PRODUCTS || [],
  getProductBySlug: (slug) => {
    return (
      ALL_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || null
    );
  },
  getCategories: () => [
    'Nutrimix', 'Gummies', 'Spreads & Sauce', 'Cereals & Snacks', 'Protein', 'Brain Health', 'For Moms', 'Best Value'
  ],
  getReviews: async (productId) => {
    const res = await apiClient.get('/reviews', { productId });
    return res.data || [];
  },
  getCoupons: () => [
    { code: 'JOY30', discountPercent: 30, description: '30% LJ Wallet discount' },
    { code: 'FIRST100', discountAmount: 100, description: 'Flat ₹100 First Order' },
  ],
  getUserProfile: () => null,
  getOrders: async () => {
    const res = await apiClient.get('/orders');
    return res.data || [];
  }
};

export default dbService;
