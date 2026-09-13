/**
 * ============================================================================
 * UNIFIED SESSION TEARDOWN & LIFECYCLE - OUR LITTLE JOYS (F-4.4)
 * ============================================================================
 * Single source of truth for teardown of all client stores, local caches,
 * TanStack Query caches, and tenant isolation state upon logout or session expiry.
 * ============================================================================
 */

import { useAuthStore } from '@/stores/authStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { queryClient } from '@/lib/queryClient';

/**
 * Perform a clean, atomic teardown of the entire user session.
 * Prevents cross-user state leaks, stale query caches, and address/order retention.
 */
export function resetAppSession() {
  // 1. Teardown Auth Session & Token
  try {
    useAuthStore.getState().logout();
  } catch (err) {
    console.warn('[session] Error logging out authStore:', err);
  }

  // 2. Reset Checkout & Draft Order State
  try {
    useCheckoutStore.getState().resetCheckout();
  } catch (err) {
    console.warn('[session] Error resetting checkoutStore:', err);
  }

  // 3. Purge User Cart
  try {
    useCartStore.getState().clearCart();
  } catch (err) {
    console.warn('[session] Error clearing cartStore:', err);
  }

  // 4. Purge User Wishlist
  try {
    useWishlistStore.getState().clearWishlist();
  } catch (err) {
    console.warn('[session] Error clearing wishlistStore:', err);
  }

  // 5. Purge TanStack Query Cache
  try {
    if (queryClient && typeof queryClient.clear === 'function') {
      queryClient.clear();
    }
  } catch (err) {
    console.warn('[session] Error clearing queryClient cache:', err);
  }

  // 6. Clean user-scoped storage items
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lj_auth_token');
      localStorage.removeItem('lj_user_data');
    }
  } catch {
    // ignore
  }
}

export default resetAppSession;
