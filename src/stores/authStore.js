import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import { setAuthTokenGetter } from '@/services/apiClient';
import { useCartStore } from './cartStore';
import { useWishlistStore } from './wishlistStore';
import { useCheckoutStore } from './checkoutStore';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true, // Used for initial session restoration to prevent route flashing

      /**
       * Login user with verified credentials & session token
       */
      login: (userData, token = null) => {
        const activeToken = token || `mock_token_${userData.id || 'usr'}_${Date.now()}`;
        set({
          user: userData,
          token: activeToken,
          isAuthenticated: true,
          isLoading: false
        });

        // Initialize user-scoped cart, wishlist, and addresses
        if (userData?.id) {
          try {
            useCartStore.getState().loadUserCart(userData.id);
            useWishlistStore.getState().loadUserWishlist(userData.id);
            useCheckoutStore.getState().loadUserAddresses(userData.id);
          } catch (e) {
            console.warn('[authStore] Error syncing user stores upon login:', e);
          }
        }
      },

      /**
       * Logout user and cleanly wipe client state
       */
      logout: () => {
        authService.logoutUser();

        // Clear user-scoped stores so no data leaks
        try {
          useCartStore.getState().clearCart();
          useWishlistStore.getState().clearWishlist();
        } catch (e) {
          console.warn('[authStore] Error clearing user stores upon logout:', e);
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      /**
       * Restore persisted session on app startup
       */
      restoreSession: async () => {
        const currentToken = get().token || (typeof window !== 'undefined' ? localStorage.getItem('lj_auth_token') : null);
        const currentUser = get().user;

        if (!currentToken || !currentUser) {
          set({ isLoading: false, isAuthenticated: false });
          return;
        }

        try {
          // Validate session with service
          const validatedUser = await authService.checkSession(currentToken);
          if (validatedUser) {
            set({
              user: validatedUser,
              token: currentToken,
              isAuthenticated: true,
              isLoading: false
            });

            // Sync user stores
            useCartStore.getState().loadUserCart(validatedUser.id);
            useWishlistStore.getState().loadUserWishlist(validatedUser.id);
            useCheckoutStore.getState().loadUserAddresses(validatedUser.id);
          } else {
            // Invalid session
            get().logout();
          }
        } catch (err) {
          console.warn('[authStore] Session restoration failed:', err);
          set({ isLoading: false });
        }
      },

      /**
       * Update user profile
       */
      updateProfile: async (updatedFields) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const res = await authService.updateProfile(currentUser.id, updatedFields);
        if (res.success && res.user) {
          set({ user: res.user });
        } else {
          set({ user: { ...currentUser, ...updatedFields } });
        }
      },

      /**
       * Personalize child profile
       */
      updateChildProfile: async ({ childName, childAge, nutritionGoal }) => {
        const currentUser = get().user;
        if (!currentUser) return;

        await get().updateProfile({ childName, childAge, nutritionGoal });
      },

      /**
       * Update parent profile details
       */
      updateParentProfile: async ({ name, phone, email }) => {
        const currentUser = get().user;
        if (!currentUser) return;

        await get().updateProfile({ name, phone, email });
      },

      /**
       * Fast OTP login simulation helper
       */
      loginWithOtp: async (phone) => {
        const res = await authService.loginUser({ phone, otp: '1234' });
        if (res.success && res.user) {
          get().login(res.user, res.token);
          return { success: true, user: res.user };
        }
        return { success: false, message: res.message };
      }
    }),
    {
      name: 'lj_auth_session_v3',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Connect dynamic token getter to apiClient
setAuthTokenGetter(() => useAuthStore.getState()?.token);

// Handle server 401 session expiration
if (typeof window !== 'undefined') {
  window.addEventListener('lj:unauthorized', () => {
    const { logout, isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      logout();
    }
  });
}

export default useAuthStore;
