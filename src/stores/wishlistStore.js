import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlistItems.some(
            (item) => item.id === product.id || item.slug === product.slug
          );
          if (exists) {
            return {
              wishlistItems: state.wishlistItems.filter(
                (item) => item.id !== product.id && item.slug !== product.slug
              )
            };
          }
          return { wishlistItems: [...state.wishlistItems, product] };
        });
      },

      isInWishlist: (productIdOrSlug) => {
        return get().wishlistItems.some(
          (item) => item.id === productIdOrSlug || item.slug === productIdOrSlug
        );
      },

      removeFromWishlist: (productIdOrSlug) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => item.id !== productIdOrSlug && item.slug !== productIdOrSlug
          )
        }));
      }
    }),
    {
      name: 'lj_wishlist_store_v2'
    }
  )
);
