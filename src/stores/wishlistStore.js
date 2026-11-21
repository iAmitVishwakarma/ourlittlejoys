import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { wishlistService } from '@/services/wishlistService';
import { safeStorage } from '@/utils/storage';

const safeLocalStorage = {
  getItem: (name) => safeStorage.getItem(name),
  setItem: (name, value) => safeStorage.setItem(name, value),
  removeItem: (name) => safeStorage.removeItem(name)
};

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      activeUserId: null,

      loadUserWishlist: async (userId) => {
        if (!userId) return;
        set({ activeUserId: userId });
        const items = await wishlistService.getUserWishlist(userId);
        set({ wishlistItems: items || [] });
      },

      toggleWishlist: async (product) => {
        const userId = get().activeUserId || safeStorage.getJSON('lj_user_data')?.id || null;
        
        set((state) => {
          const targetId = String(product.id || '');
          const targetSlug = String(product.slug || '');
          const exists = state.wishlistItems.some(
            (item) =>
              String(item.id) === targetId ||
              (targetSlug && String(item.slug) === targetSlug) ||
              String(item.productId) === targetId
          );
          if (exists) {
            return {
              wishlistItems: state.wishlistItems.filter(
                (item) =>
                  String(item.id) !== targetId &&
                  (!targetSlug || String(item.slug) !== targetSlug) &&
                  String(item.productId) !== targetId
              )
            };
          }
          return { wishlistItems: [...state.wishlistItems, product] };
        });

        if (userId) {
          const updated = await wishlistService.toggleWishlist(userId, product);
          set({ wishlistItems: updated, activeUserId: userId });
        }
      },

      isInWishlist: (productIdOrSlug) => {
        if (!productIdOrSlug) return false;
        const target = String(productIdOrSlug).toLowerCase();
        return get().wishlistItems.some(
          (item) =>
            String(item.id).toLowerCase() === target ||
            String(item.slug || '').toLowerCase() === target ||
            String(item.productId || '').toLowerCase() === target
        );
      },

      removeFromWishlist: async (productIdOrSlug) => {
        const userId = get().activeUserId;
        const target = String(productIdOrSlug);
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) =>
              String(item.id) !== target &&
              String(item.slug || '') !== target &&
              String(item.productId || '') !== target
          )
        }));

        if (userId) {
          await wishlistService.removeFromWishlist(userId, target);
        }
      },

      clearWishlist: () => {
        set({ wishlistItems: [], activeUserId: null });
      }
    }),
    {
      name: 'lj_user_wishlist_store_v3',
      storage: createJSONStorage(() => safeLocalStorage)
    }
  )
);

export default useWishlistStore;
