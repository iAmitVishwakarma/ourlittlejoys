import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { wishlistService } from '@/services/wishlistService';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      activeUserId: null,

      /**
       * Load wishlist items for authenticated user
       */
      loadUserWishlist: async (userId) => {
        if (!userId) return;
        set({ activeUserId: userId });
        const items = await wishlistService.getUserWishlist(userId);
        set({ wishlistItems: items || [] });
      },

      /**
       * Toggle product in wishlist
       */
      toggleWishlist: async (product) => {
        const userId = get().activeUserId || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lj_user_data') || '{}')?.id : null);
        
        // Optimistic update
        set((state) => {
          const exists = state.wishlistItems.some(
            (item) => item.id === product.id || item.slug === product.slug || item.productId === product.id
          );
          if (exists) {
            return {
              wishlistItems: state.wishlistItems.filter(
                (item) => item.id !== product.id && item.slug !== product.slug && item.productId !== product.id
              )
            };
          }
          return { wishlistItems: [...state.wishlistItems, product] };
        });

        // Sync with service
        if (userId) {
          const updated = await wishlistService.toggleWishlist(userId, product);
          set({ wishlistItems: updated, activeUserId: userId });
        }
      },

      /**
       * Check if product is in active user's wishlist
       */
      isInWishlist: (productIdOrSlug) => {
        return get().wishlistItems.some(
          (item) => item.id === productIdOrSlug || item.slug === productIdOrSlug || item.productId === productIdOrSlug
        );
      },

      /**
       * Remove item from wishlist
       */
      removeFromWishlist: async (productIdOrSlug) => {
        const userId = get().activeUserId;
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => item.id !== productIdOrSlug && item.slug !== productIdOrSlug && item.productId !== productIdOrSlug
          )
        }));

        if (userId) {
          await wishlistService.removeFromWishlist(userId, productIdOrSlug);
        }
      },

      /**
       * Clear wishlist on user logout
       */
      clearWishlist: () => {
        set({ wishlistItems: [], activeUserId: null });
      }
    }),
    {
      name: 'lj_user_wishlist_store_v3'
    }
  )
);

export default useWishlistStore;
