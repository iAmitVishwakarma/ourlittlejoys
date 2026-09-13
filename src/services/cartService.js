/**
 * ============================================================================
 * USER-SCOPED CART SERVICE - OUR LITTLE JOYS
 * ============================================================================
 * Scopes all shopping bag operations to the authenticated user ID.
 * Communicates with backend / json-server (/cart) with resilient offline fallback.
 * ============================================================================
 */

import { apiClient } from './apiClient';

function getLocalUserCart(userId) {
  try {
    const raw = localStorage.getItem(`lj_cart_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUserCart(userId, items) {
  try {
    localStorage.setItem(`lj_cart_${userId}`, JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
}

export const cartService = {
  /**
   * Fetch all cart items for a specific user
   */
  async getUserCart(userId) {
    if (!userId) return [];
    try {
      const res = await apiClient.get('/cart', { params: { userId } });
      if (res.success && Array.isArray(res.data)) {
        saveLocalUserCart(userId, res.data);
        return res.data;
      }
    } catch (err) {
      console.warn('[cartService] getUserCart error, using local fallback:', err.message);
    }
    return getLocalUserCart(userId);
  },

  /**
   * Add an item to user cart
   */
  async addToCart(userId, product, quantity = 1) {
    if (!userId) throw new Error('Authentication required to add to cart');

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
      
      // Update on server
      if (existing.id && typeof existing.id === 'string' && existing.id.startsWith('cart_')) {
        await apiClient.patch(`/cart/${existing.id}`, { quantity: newQty });
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
        weight: product.weight || ''
      };

      await apiClient.post('/cart', newCartItem);
      updatedItems = [...currentItems, newCartItem];
    }

    saveLocalUserCart(userId, updatedItems);
    return updatedItems;
  },

  /**
   * Update quantity of a cart item
   */
  async updateQuantity(userId, cartItemIdOrSlug, newQty) {
    if (!userId) return [];
    const currentItems = await this.getUserCart(userId);
    const target = String(cartItemIdOrSlug);

    let updatedItems = [];
    if (newQty <= 0) {
      updatedItems = currentItems.filter(
        (i) => String(i.id) !== target && String(i.productId) !== target && String(i.slug || '') !== target
      );
      await apiClient.delete(`/cart/${target}`).catch(() => {});
    } else {
      updatedItems = currentItems.map((item) => {
        if (String(item.id) === target || String(item.productId) === target || String(item.slug || '') === target) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
      await apiClient.patch(`/cart/${target}`, { quantity: newQty }).catch(() => {});
    }

    saveLocalUserCart(userId, updatedItems);
    return updatedItems;
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(userId, cartItemIdOrSlug) {
    if (!userId) return [];
    return this.updateQuantity(userId, cartItemIdOrSlug, 0);
  },

  /**
   * Clear user cart (e.g. after order placement or on user request)
   */
  async clearUserCart(userId) {
    if (!userId) return;
    try {
      saveLocalUserCart(userId, []);
      localStorage.removeItem(`lj_cart_${userId}`);
    } catch (e) {
      console.error(e);
    }
  }
};

export default cartService;
