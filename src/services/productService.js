import { apiClient, normalizeData } from './apiClient';
import { ALL_PRODUCTS, CROSS_SELL_PRODUCTS, HERO_SLIDES } from '@/data/products';

export const productService = {
  async getAllProducts(params = {}) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/products', params);
        const data = normalizeData(res);
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('[productService] Backend fetch failed, falling back to seed catalog:', err);
      }
    }

    let products = [...ALL_PRODUCTS];

    if (params.category && params.category !== 'all') {
      const targetCat = String(params.category).toLowerCase().trim();
      products = products.filter(
        (p) => String(p.category || '').toLowerCase() === targetCat
      );
    }

    if (params.search) {
      const q = String(params.search).toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    return products;
  },

  async getProductBySlugOrId(slugOrId) {
    if (!slugOrId) return null;
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const target = String(slugOrId).toLowerCase().trim();

    if (!isMock) {
      try {
        const res = await apiClient.get('/products', { slug: slugOrId });
        const data = normalizeData(res);
        if (Array.isArray(data) && data.length > 0) {
          return data[0];
        }

        const resById = await apiClient.get(`/products/${slugOrId}`);
        if (resById.success && resById.data) {
          return resById.data;
        }
      } catch (err) {
        console.warn('[productService] getProductBySlugOrId backend error:', err);
      }
    }

    return (
      ALL_PRODUCTS.find(
        (p) =>
          String(p.id).toLowerCase() === target ||
          String(p.slug || '').toLowerCase() === target
      ) || null
    );
  },

  async getProductsByCategory(category) {
    if (!category || category === 'all') {
      return this.getAllProducts();
    }
    return this.getAllProducts({ category });
  },

  async getCrossSellProducts() {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/products/cross-sell');
        const data = normalizeData(res);
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('[productService] getCrossSellProducts backend error:', err);
      }
    }

    return CROSS_SELL_PRODUCTS || ALL_PRODUCTS.slice(0, 3);
  },

  async getHeroSlides() {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/hero_slides');
        const data = normalizeData(res);
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('[productService] getHeroSlides backend error:', err);
      }
    }

    return HERO_SLIDES;
  },

  async getReviews(productId) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const targetId = String(productId);

    if (!isMock) {
      try {
        const res = await apiClient.get('/reviews', { productId: targetId });
        const data = normalizeData(res);
        if (Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn('[productService] getReviews backend error:', err);
      }
    }

    return [];
  },

  async submitReview(reviewData) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      return apiClient.post('/reviews', {
        ...reviewData,
        createdAt: new Date().toISOString(),
      });
    }

    return {
      success: true,
      data: {
        id: `rev_${Date.now()}`,
        ...reviewData,
        createdAt: new Date().toISOString(),
      },
    };
  },
};

export default productService;
