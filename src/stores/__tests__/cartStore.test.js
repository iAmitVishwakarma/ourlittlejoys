/**
 * ============================================================================
 * CART STORE UNIT TESTS - OUR LITTLE JOYS
 * ============================================================================
 * Tests Zustand cartStore: add/remove/update/clear, coupon engine, quantity
 * clamping (MAX_ITEM_QUANTITY), and derived selectors.
 * ============================================================================
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore, VALID_COUPONS, MAX_ITEM_QUANTITY } from '@/stores/cartStore';

// Mock cartService to prevent real API calls
vi.mock('@/services/cartService', () => ({
  cartService: {
    getUserCart: vi.fn().mockResolvedValue([]),
    addToCart: vi.fn().mockResolvedValue([]),
    updateQuantity: vi.fn().mockResolvedValue([]),
    removeFromCart: vi.fn().mockResolvedValue([]),
  },
}));

// Reset store state before each test
beforeEach(() => {
  useCartStore.setState({
    cartItems: [],
    activeUserId: null,
    appliedCoupon: null,
  });
});

// ============================================================================
// Initial State
// ============================================================================
describe('cartStore - initial state', () => {
  it('starts with empty cart', () => {
    const state = useCartStore.getState();
    expect(state.cartItems).toEqual([]);
  });

  it('starts with no active user', () => {
    const state = useCartStore.getState();
    expect(state.activeUserId).toBeNull();
  });
});

// ============================================================================
// addToCart
// ============================================================================
describe('cartStore - addToCart', () => {
  it('adds a new product to cart', async () => {
    const product = { id: 'prod_1', name: 'Nutrimix', price: 499, slug: 'nutrimix' };
    await useCartStore.getState().addToCart(product);
    
    const items = useCartStore.getState().cartItems;
    expect(items).toHaveLength(1);
    expect(items[0].price).toBe(499);
    expect(items[0].quantity).toBe(1);
  });

  it('increments quantity for existing product', async () => {
    const product = { id: 'prod_1', name: 'Nutrimix', price: 499, slug: 'nutrimix' };
    await useCartStore.getState().addToCart(product);
    await useCartStore.getState().addToCart(product);
    
    const items = useCartStore.getState().cartItems;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('adds different products as separate items', async () => {
    await useCartStore.getState().addToCart({ id: 'prod_1', name: 'A', price: 499 });
    await useCartStore.getState().addToCart({ id: 'prod_2', name: 'B', price: 299 });
    
    const items = useCartStore.getState().cartItems;
    expect(items).toHaveLength(2);
  });

  it('clamps quantity at MAX_ITEM_QUANTITY when adding', async () => {
    const product = { id: 'prod_1', name: 'Test', price: 499, slug: 'test' };
    // Add initial with high quantity
    await useCartStore.getState().addToCart({ ...product, quantity: MAX_ITEM_QUANTITY + 5 });
    
    const items = useCartStore.getState().cartItems;
    expect(items[0].quantity).toBeLessThanOrEqual(MAX_ITEM_QUANTITY);
  });

  it('clamps quantity when incrementing beyond MAX_ITEM_QUANTITY', async () => {
    const product = { id: 'prod_1', name: 'Test', price: 499, slug: 'test' };
    // Set existing item at max - 1
    useCartStore.setState({
      cartItems: [{ id: 'prod_1', productId: 'prod_1', price: 499, quantity: MAX_ITEM_QUANTITY - 1, slug: 'test' }]
    });
    // Adding 5 more should clamp
    await useCartStore.getState().addToCart({ ...product, quantity: 5 });
    
    const items = useCartStore.getState().cartItems;
    expect(items[0].quantity).toBe(MAX_ITEM_QUANTITY);
  });
});

// ============================================================================
// updateQuantity
// ============================================================================
describe('cartStore - updateQuantity', () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: [
        { id: 'prod_1', productId: 'prod_1', price: 499, quantity: 3, slug: 'nutrimix' },
      ],
    });
  });

  it('updates quantity for existing item', async () => {
    await useCartStore.getState().updateQuantity('prod_1', 5);
    expect(useCartStore.getState().cartItems[0].quantity).toBe(5);
  });

  it('removes item when quantity is set to 0', async () => {
    await useCartStore.getState().updateQuantity('prod_1', 0);
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('removes item when quantity is negative', async () => {
    await useCartStore.getState().updateQuantity('prod_1', -1);
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('clamps quantity at MAX_ITEM_QUANTITY', async () => {
    await useCartStore.getState().updateQuantity('prod_1', MAX_ITEM_QUANTITY + 50);
    expect(useCartStore.getState().cartItems[0].quantity).toBe(MAX_ITEM_QUANTITY);
  });
});

// ============================================================================
// removeFromCart
// ============================================================================
describe('cartStore - removeFromCart', () => {
  it('removes an item by id', async () => {
    useCartStore.setState({
      cartItems: [
        { id: 'prod_1', productId: 'prod_1', price: 499, quantity: 1 },
        { id: 'prod_2', productId: 'prod_2', price: 299, quantity: 2 },
      ],
    });
    await useCartStore.getState().removeFromCart('prod_1');
    
    const items = useCartStore.getState().cartItems;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('prod_2');
  });

  it('removes an item by slug', async () => {
    useCartStore.setState({
      cartItems: [
        { id: 'prod_1', productId: 'prod_1', price: 499, quantity: 1, slug: 'nutrimix' },
      ],
    });
    await useCartStore.getState().removeFromCart('nutrimix');
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('does nothing when id not found', async () => {
    useCartStore.setState({
      cartItems: [{ id: 'prod_1', productId: 'prod_1', price: 499, quantity: 1 }],
    });
    await useCartStore.getState().removeFromCart('nonexistent');
    expect(useCartStore.getState().cartItems).toHaveLength(1);
  });
});

// ============================================================================
// clearCart
// ============================================================================
describe('cartStore - clearCart', () => {
  it('clears all items and resets state', () => {
    useCartStore.setState({
      cartItems: [{ id: 'prod_1', price: 499, quantity: 2 }],
      activeUserId: 'user_001',
      appliedCoupon: VALID_COUPONS[0],
    });
    
    useCartStore.getState().clearCart();
    
    const state = useCartStore.getState();
    expect(state.cartItems).toEqual([]);
    expect(state.activeUserId).toBeNull();
    expect(state.appliedCoupon).toBeNull();
  });
});

// ============================================================================
// Coupon Engine
// ============================================================================
describe('cartStore - applyCoupon', () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: [{ id: 'prod_1', productId: 'prod_1', price: 999, quantity: 1 }],
      appliedCoupon: null,
    });
  });

  it('applies valid JOY30 coupon', () => {
    const result = useCartStore.getState().applyCoupon('JOY30');
    expect(result.success).toBe(true);
    expect(useCartStore.getState().appliedCoupon?.code).toBe('JOY30');
  });

  it('applies FIRST100 coupon (case insensitive)', () => {
    const result = useCartStore.getState().applyCoupon('first100');
    expect(result.success).toBe(true);
    expect(useCartStore.getState().appliedCoupon?.code).toBe('FIRST100');
  });

  it('rejects invalid coupon code', () => {
    const result = useCartStore.getState().applyCoupon('INVALID');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Invalid');
  });

  it('rejects coupon when cart is below minimum order', () => {
    useCartStore.setState({
      cartItems: [{ id: 'prod_1', productId: 'prod_1', price: 100, quantity: 1 }],
    });
    const result = useCartStore.getState().applyCoupon('JOY30');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Minimum');
  });

  it('handles whitespace in coupon code', () => {
    const result = useCartStore.getState().applyCoupon('  JOY30  ');
    expect(result.success).toBe(true);
  });

  it('removeCoupon clears applied coupon', () => {
    useCartStore.getState().applyCoupon('JOY30');
    useCartStore.getState().removeCoupon();
    expect(useCartStore.getState().appliedCoupon).toBeNull();
  });
});

// ============================================================================
// Constants
// ============================================================================
describe('cartStore - constants', () => {
  it('exports VALID_COUPONS', () => {
    expect(VALID_COUPONS).toBeDefined();
    expect(VALID_COUPONS.length).toBeGreaterThanOrEqual(3);
  });

  it('exports MAX_ITEM_QUANTITY', () => {
    expect(MAX_ITEM_QUANTITY).toBeDefined();
    expect(MAX_ITEM_QUANTITY).toBeGreaterThan(0);
    expect(MAX_ITEM_QUANTITY).toBe(10);
  });
});
