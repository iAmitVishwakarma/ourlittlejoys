import dbData from '../../db.json';

/**
 * Service to interface with db.json data directly or via json-server backend if available.
 */
export const dbService = {
  getHeroSlides: () => dbData.heroSlides || [],
  getProducts: () => dbData.products || [],
  getProductBySlug: (slug) => {
    return (
      dbData.products.find((p) => p.slug === slug || p.id === slug) || null
    );
  },
  getCategories: () => dbData.categories || [],
  getReviews: (productId) => {
    if (!productId) return dbData.reviews || [];
    return dbData.reviews.filter((r) => r.productId === productId);
  },
  getCoupons: () => dbData.coupons || [],
  getUserProfile: () => (dbData.users && dbData.users[0]) || null,
  getOrders: () => dbData.orders || []
};

export default dbService;
