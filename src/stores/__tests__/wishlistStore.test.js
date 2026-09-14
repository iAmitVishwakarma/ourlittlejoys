/**
 * ============================================================================
 * WISHLIST STORE UNIT TESTS - OUR LITTLE JOYS
 * ============================================================================
 * Tests Zustand wishlistStore: toggle, isInWishlist, clearWishlist.
 * ============================================================================
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useWishlistStore } from '@/stores/wishlistStore';

// Mock wishlistService to prevent real API calls
vi.mock('@/services/wishlistService', () => ({
  wishlistService: {
    getUserWishlist: vi.fn().mockResolvedValue([]),
    toggleWishlist: vi.fn().mockResolvedValue([]),
    removeFromWishlist: vi.fn().mockResolvedValue([]),
  },
}));

// Reset state before each test
beforeEach(() => {
  useWishlistStore.setState({
    wishlistItems: [],
    activeUserId: null,
  });
});

// ============================================================================
// Initial State
// ============================================================================
describe('wishlistStore - initial state', () => {
  it('starts with empty wishlist', () => {
    expect(useWishlistStore.getState().wishlistItems).toEqual([]);
  });

  it('starts with no active user', () => {
    expect(useWishlistStore.getState().activeUserId).toBeNull();
  });
});

// ============================================================================
// toggleWishlist
// ============================================================================
describe('wishlistStore - toggleWishlist', () => {
  it('adds a product when not in wishlist', async () => {
    const product = { id: 'prod_1', name: 'Nutrimix', slug: 'nutrimix', price: 499 };
    await useWishlistStore.getState().toggleWishlist(product);
    
    const items = useWishlistStore.getState().wishlistItems;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('prod_1');
  });

  it('removes a product when already in wishlist', async () => {
    // Pre-populate
    useWishlistStore.setState({
      wishlistItems: [{ id: 'prod_1', name: 'Nutrimix', slug: 'nutrimix', price: 499, productId: 'prod_1' }],
    });

    await useWishlistStore.getState().toggleWishlist({ id: 'prod_1', slug: 'nutrimix' });
    
    expect(useWishlistStore.getState().wishlistItems).toHaveLength(0);
  });
});

// ============================================================================
// isInWishlist
// ============================================================================
describe('wishlistStore - isInWishlist', () => {
  beforeEach(() => {
    useWishlistStore.setState({
      wishlistItems: [
        { id: 'prod_1', slug: 'nutrimix', productId: 'prod_1' },
        { id: 'prod_2', slug: 'gummies', productId: 'prod_2' },
      ],
    });
  });

  it('returns true for product in wishlist (by id)', () => {
    expect(useWishlistStore.getState().isInWishlist('prod_1')).toBe(true);
  });

  it('returns true for product in wishlist (by slug)', () => {
    expect(useWishlistStore.getState().isInWishlist('nutrimix')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(useWishlistStore.getState().isInWishlist('NUTRIMIX')).toBe(true);
    expect(useWishlistStore.getState().isInWishlist('Prod_1')).toBe(true);
  });

  it('returns false for product not in wishlist', () => {
    expect(useWishlistStore.getState().isInWishlist('prod_999')).toBe(false);
  });

  it('returns false for null/undefined/empty', () => {
    expect(useWishlistStore.getState().isInWishlist(null)).toBe(false);
    expect(useWishlistStore.getState().isInWishlist(undefined)).toBe(false);
    expect(useWishlistStore.getState().isInWishlist('')).toBe(false);
  });
});

// ============================================================================
// clearWishlist
// ============================================================================
describe('wishlistStore - clearWishlist', () => {
  it('clears all items and resets user', () => {
    useWishlistStore.setState({
      wishlistItems: [{ id: 'prod_1', slug: 'nutrimix' }],
      activeUserId: 'user_001',
    });

    useWishlistStore.getState().clearWishlist();

    const state = useWishlistStore.getState();
    expect(state.wishlistItems).toEqual([]);
    expect(state.activeUserId).toBeNull();
  });
});

// ============================================================================
// removeFromWishlist
// ============================================================================
describe('wishlistStore - removeFromWishlist', () => {
  it('removes item by id', async () => {
    useWishlistStore.setState({
      wishlistItems: [
        { id: 'prod_1', slug: 'nutrimix', productId: 'prod_1' },
        { id: 'prod_2', slug: 'gummies', productId: 'prod_2' },
      ],
    });

    await useWishlistStore.getState().removeFromWishlist('prod_1');
    
    const items = useWishlistStore.getState().wishlistItems;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('prod_2');
  });

  it('removes item by slug', async () => {
    useWishlistStore.setState({
      wishlistItems: [{ id: 'prod_1', slug: 'nutrimix', productId: 'prod_1' }],
    });

    await useWishlistStore.getState().removeFromWishlist('nutrimix');
    expect(useWishlistStore.getState().wishlistItems).toHaveLength(0);
  });
});
