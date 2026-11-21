import { apiClient } from './apiClient';
import { safeStorage } from '@/utils/storage';

function getLocalUserWishlist(userId) {
  if (!userId) return [];
  const stored = safeStorage.getJSON(`lj_wishlist_${userId}`);
  return Array.isArray(stored) ? stored : [];
}

function saveLocalUserWishlist(userId, items) {
  if (!userId) return;
  safeStorage.setJSON(`lj_wishlist_${userId}`, items);
}

export const wishlistService = {
  async getUserWishlist(userId) {
    if (!userId) return [];
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/wishlist');
        if (res.success && Array.isArray(res.data)) {
          saveLocalUserWishlist(userId, res.data);
          return res.data;
        }
      } catch (err) {
        console.warn('[wishlistService] getUserWishlist error, using local fallback:', err);
      }
    }

    return getLocalUserWishlist(userId);
  },

  async toggleWishlist(userId, product) {
    if (!userId) throw new Error('Authentication required for wishlist');
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    const currentItems = await this.getUserWishlist(userId);
    const existingIndex = currentItems.findIndex(
      (item) =>
        item.productId === (product.id || product.slug) ||
        item.slug === product.slug ||
        item.id === product.id
    );

    let updatedItems = [];
    if (existingIndex > -1) {
      const itemToRemove = currentItems[existingIndex];
      updatedItems = currentItems.filter((_, idx) => idx !== existingIndex);
      if (!isMock && itemToRemove.id && !String(itemToRemove.id).startsWith('wish_')) {
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
        slug: product.slug || '',
      };

      if (!isMock) {
        await apiClient.post('/wishlist', newWishlistItem).catch(() => {});
      }

      updatedItems = [...currentItems, newWishlistItem];
    }

    saveLocalUserWishlist(userId, updatedItems);
    return updatedItems;
  },

  async removeFromWishlist(userId, productIdOrSlug) {
    if (!userId) return [];
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
    const currentItems = await this.getUserWishlist(userId);
    const updatedItems = currentItems.filter(
      (item) =>
        item.id !== productIdOrSlug &&
        item.productId !== productIdOrSlug &&
        item.slug !== productIdOrSlug
    );

    if (!isMock) {
      await apiClient.delete(`/wishlist/${productIdOrSlug}`).catch(() => {});
    }

    saveLocalUserWishlist(userId, updatedItems);
    return updatedItems;
  },

  clearUserWishlist(userId) {
    if (!userId) return;
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      apiClient.delete('/wishlist').catch(() => {});
    }

    saveLocalUserWishlist(userId, []);
    safeStorage.removeItem(`lj_wishlist_${userId}`);
  },
};

export default wishlistService;
