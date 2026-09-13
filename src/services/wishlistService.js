/**
 * ============================================================================
 * USER-SCOPED WISHLIST SERVICE - OUR LITTLE JOYS
 * ============================================================================
 * Manages parent favorites scoped strictly to the authenticated userId.
 * ============================================================================
 */

import { apiClient } from './apiClient';

function getLocalUserWishlist(userId) {
  try {
    const raw = localStorage.getItem(`lj_wishlist_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUserWishlist(userId, items) {
  try {
    localStorage.setItem(`lj_wishlist_${userId}`, JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
}

export const wishlistService = {
  /**
   * Fetch wishlist items for current user
   */
  async getUserWishlist(userId) {
    if (!userId) return [];
    try {
      const res = await apiClient.get('/wishlist', { userId });
      if (res.success && Array.isArray(res.data)) {
        saveLocalUserWishlist(userId, res.data);
        return res.data;
      }
    } catch (err) {
      console.warn('[wishlistService] getUserWishlist fallback:', err.message);
    }
    return getLocalUserWishlist(userId);
  },

  /**
   * Toggle item in user's wishlist
   */
  async toggleWishlist(userId, product) {
    if (!userId) throw new Error('Authentication required for wishlist');

    const currentItems = await this.getUserWishlist(userId);
    const existingIndex = currentItems.findIndex(
      (item) => item.productId === (product.id || product.slug) || item.slug === product.slug || item.id === product.id
    );

    let updatedItems = [];
    if (existingIndex > -1) {
      const itemToRemove = currentItems[existingIndex];
      updatedItems = currentItems.filter((_, idx) => idx !== existingIndex);
      if (itemToRemove.id && typeof itemToRemove.id === 'string' && itemToRemove.id.startsWith('wish_')) {
        await apiClient.delete(`/wishlist/${itemToRemove.id}`).catch(() => {});
      }
    } else {
      const newWishlistItem = {
        id: `wish_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        userId,
        productId: product.id || product.slug,
        title: product.title || product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.mrp || product.price,
        image: product.image || '',
        slug: product.slug || ''
      };
      await apiClient.post('/wishlist', newWishlistItem).catch(() => {});
      updatedItems = [...currentItems, newWishlistItem];
    }

    saveLocalUserWishlist(userId, updatedItems);
    return updatedItems;
  },

  /**
   * Remove from wishlist
   */
  async removeFromWishlist(userId, productIdOrSlug) {
    if (!userId) return [];
    const currentItems = await this.getUserWishlist(userId);
    const updatedItems = currentItems.filter(
      (item) => item.id !== productIdOrSlug && item.productId !== productIdOrSlug && item.slug !== productIdOrSlug
    );
    saveLocalUserWishlist(userId, updatedItems);
    return updatedItems;
  },

  /**
   * Clear user's wishlist
   */
  clearUserWishlist(userId) {
    if (!userId) return;
    try {
      localStorage.removeItem(`lj_wishlist_${userId}`);
    } catch (e) {
      console.error(e);
    }
  }
};

export default wishlistService;
