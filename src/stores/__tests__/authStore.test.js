/**
 * ============================================================================
 * AUTH STORE UNIT TESTS - OUR LITTLE JOYS
 * ============================================================================
 * Tests Zustand authStore: login, logout, session state management.
 * ============================================================================
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '@/stores/authStore';

// Mock all dependent stores to isolate authStore
vi.mock('@/stores/cartStore', () => ({
  useCartStore: {
    getState: () => ({
      loadUserCart: vi.fn(),
      clearCart: vi.fn(),
    }),
  },
}));

vi.mock('@/stores/wishlistStore', () => ({
  useWishlistStore: {
    getState: () => ({
      loadUserWishlist: vi.fn(),
      clearWishlist: vi.fn(),
    }),
  },
}));

vi.mock('@/stores/checkoutStore', () => ({
  useCheckoutStore: {
    getState: () => ({
      loadUserAddresses: vi.fn(),
      resetCheckout: vi.fn(),
    }),
  },
}));

vi.mock('@/services/authService', () => ({
  authService: {
    logoutUser: vi.fn(),
    checkSession: vi.fn().mockResolvedValue(null),
    loginUser: vi.fn().mockResolvedValue({ success: true, user: { id: 'u1', name: 'Test' }, token: 'tok' }),
    updateProfile: vi.fn().mockResolvedValue({ success: true, user: {} }),
  },
}));

vi.mock('@/services/apiClient', () => ({
  setAuthTokenGetter: vi.fn(),
}));

// Reset state before each test
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });
});

// ============================================================================
// Initial State
// ============================================================================
describe('authStore - initial state', () => {
  it('starts unauthenticated', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});

// ============================================================================
// Login
// ============================================================================
describe('authStore - login', () => {
  it('sets user, token, and isAuthenticated on login', () => {
    const user = { id: 'user_001', name: 'Amit', email: 'amit@test.com' };
    useAuthStore.getState().login(user, 'jwt_token_123');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.token).toBe('jwt_token_123');
    expect(state.isLoading).toBe(false);
  });

  it('generates a mock token when none provided', () => {
    const user = { id: 'user_001', name: 'Amit' };
    useAuthStore.getState().login(user);

    const state = useAuthStore.getState();
    expect(state.token).toMatch(/^mock_token_/);
    expect(state.isAuthenticated).toBe(true);
  });

  it('sets isLoading to false after login', () => {
    useAuthStore.setState({ isLoading: true });
    useAuthStore.getState().login({ id: 'u1' });
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});

// ============================================================================
// Logout
// ============================================================================
describe('authStore - logout', () => {
  it('clears all auth state on logout', () => {
    // First login
    useAuthStore.getState().login({ id: 'user_001', name: 'Test' }, 'token_abc');

    // Then logout
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});

// ============================================================================
// Session Restoration
// ============================================================================
describe('authStore - restoreSession', () => {
  it('sets isLoading to false when no token exists', async () => {
    useAuthStore.setState({ isLoading: true, token: null, user: null });
    await useAuthStore.getState().restoreSession();
    expect(useAuthStore.getState().isLoading).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('sets isLoading to false when no user exists', async () => {
    useAuthStore.setState({ isLoading: true, token: 'abc', user: null });
    await useAuthStore.getState().restoreSession();
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});

// ============================================================================
// Profile Updates
// ============================================================================
describe('authStore - updateProfile', () => {
  it('does nothing if no user is logged in', async () => {
    await useAuthStore.getState().updateProfile({ name: 'New Name' });
    expect(useAuthStore.getState().user).toBeNull();
  });
});
