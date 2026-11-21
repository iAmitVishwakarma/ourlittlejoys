import { apiClient } from './apiClient';
import { safeStorage } from '@/utils/storage';

function getLocalUserCart(userId) {
  if (!userId) return [];
  const stored = safeStorage.getJSON(`lj_cart_${userId}`);
  return Array.isArray(stored) ? stored : [];
}

function saveLocalUserCart(userId, items) {
  if (!userId) return;
  safeStorage.setJSON(`lj_cart_${userId}`, items);
}

export const cartService = {
  async getUserCart(userId) {
    if (!userId) return [];
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/cart');
        if (res.success && Array.isArray(res.data)) {
          saveLocalUserCart(userId, res.data);
          return res.data;
        }
      } catch (err) {
        console.warn('[cartService] getUserCart error, using local fallback:', err);
      }
    }

    return getLocalUserCart(userId);
  },

  async addToCart(userId, product, quantity = 1) {
    if (!userId) throw new Error('Authentication required to add to cart');
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    const currentItems = await this.getUserCart(userId);
    const targetId = String(product.id || product.productId || '');
    const targetSlug = String(product.slug || '');
    const existingIndex = currentItems.findIndex(
      (item) =>
        (targetId && (String(item.productId) === targetId || String(item.id) === targetId)) ||
        (targetSlug && String(item.slug || '') === targetSlug)
    );

    let updatedItems = [];

    if (existingIndex > -1) {
      const existing = currentItems[existingIndex];
      const newQty = (existing.quantity || 1) + quantity;

      if (!isMock && existing.id && !String(existing.id).startsWith('cart_')) {
        await apiClient.put(`/cart/items/${existing.id}`, { quantity: newQty }).catch(() => {});
      }

      updatedItems = [...currentItems];
      updatedItems[existingIndex] = { ...existing, quantity: newQty };
    } else {
      const newCartItem = {
        id: `cart_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        userId,
        productId: String(product.id || product.slug || 'prod'),
        title: product.title || product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.mrp || product.price,
        quantity,
        image: product.image || '',
        slug: product.slug || '',
        flavor: product.flavor || '',
        weight: product.weight || '',
      };

      if (!isMock) {
        await apiClient.post('/cart/items', newCartItem).catch(() => {});
      }

      updatedItems = [...currentItems, newCartItem];
    }

    saveLocalUserCart(userId, updatedItems);
    return updatedItems;
  },

  async updateQuantity(userId, cartItemIdOrSlug, newQty) {
    if (!userId) return [];
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const currentItems = await this.getUserCart(userId);
    const target = String(cartItemIdOrSlug);

    let updatedItems = [];
    if (newQty <= 0) {
      updatedItems = currentItems.filter(
        (i) => String(i.id) !== target && String(i.productId) !== target && String(i.slug || '') !== target
      );
      if (!isMock) {
        await apiClient.delete(`/cart/items/${target}`).catch(() => {});
      }
    } else {
      updatedItems = currentItems.map((item) => {
        if (String(item.id) === target || String(item.productId) === target || String(item.slug || '') === target) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
      if (!isMock) {
        await apiClient.put(`/cart/items/${target}`, { quantity: newQty }).catch(() => {});
      }
    }

    saveLocalUserCart(userId, updatedItems);
    return updatedItems;
  },

  async removeFromCart(userId, cartItemIdOrSlug) {
    if (!userId) return [];
    return this.updateQuantity(userId, cartItemIdOrSlug, 0);
  },

  async clearUserCart(userId) {
    if (!userId) return;
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      await apiClient.delete('/cart').catch(() => {});
    }

    saveLocalUserCart(userId, []);
    safeStorage.removeItem(`lj_cart_${userId}`);
  },

  async syncCart(userId, items) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      const res = await apiClient.post('/cart/sync', { items });
      if (res.success && Array.isArray(res.data)) {
        if (userId) saveLocalUserCart(userId, res.data);
        return res.data;
      }
    }

    if (userId) {
      saveLocalUserCart(userId, items);
    }
    return items;
  },

  async applyCoupon(couponCode, cartTotal) {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const code = (couponCode || '').trim().toUpperCase();

    if (!isMock) {
      const res = await apiClient.post('/cart/apply-coupon', { couponCode: code, cartTotal });
      if (res.success && res.data) {
        return res.data;
      }
    }

    // Default mock coupon validation
    if (code === 'JOY30') {
      return {
        valid: true,
        couponCode: 'JOY30',
        discountPercent: 30,
        discountAmount: Math.round(cartTotal * 0.30),
        message: '30% LJ Wallet discount applied!',
      };
    }
    if (code === 'FIRST100') {
      return {
        valid: true,
        couponCode: 'FIRST100',
        discountPercent: 0,
        discountAmount: 100,
        message: 'Flat ₹100 First Order discount applied!',
      };
    }
    if (code === 'LJWALLET') {
      return {
        valid: true,
        couponCode: 'LJWALLET',
        discountPercent: 20,
        discountAmount: Math.round(cartTotal * 0.20),
        message: '₹200 Welcome Wallet applied!',
      };
    }

    return {
      valid: false,
      couponCode: code,
      discountAmount: 0,
      discountPercent: 0,
      message: 'Invalid coupon code. Try JOY30, FIRST100, or LJWALLET.',
    };
  },
};

export default cartService;
