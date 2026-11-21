import { describe, it, expect, beforeEach } from 'vitest';
import { cartService } from '../cartService';

describe('cartService', () => {
  const userId = 'test_cart_user_01';

  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves empty cart for new user', async () => {
    const items = await cartService.getUserCart(userId);
    expect(items).toEqual([]);
  });

  it('adds an item to user cart and increments quantity on repeated add', async () => {
    const product = {
      id: 'p101',
      title: 'Nutrimix Chocolate',
      price: 549,
      slug: 'nutrimix-chocolate',
    };

    const updated1 = await cartService.addToCart(userId, product, 1);
    expect(updated1).toHaveLength(1);
    expect(updated1[0].productId).toBe('p101');
    expect(updated1[0].quantity).toBe(1);

    const updated2 = await cartService.addToCart(userId, product, 2);
    expect(updated2).toHaveLength(1);
    expect(updated2[0].quantity).toBe(3);
  });

  it('updates item quantity and removes item when quantity is zero', async () => {
    const product = { id: 'p102', title: 'Daily Gummies', price: 449, slug: 'daily-gummies' };
    await cartService.addToCart(userId, product, 2);

    const afterUpdate = await cartService.updateQuantity(userId, 'p102', 5);
    expect(afterUpdate[0].quantity).toBe(5);

    const afterZero = await cartService.updateQuantity(userId, 'p102', 0);
    expect(afterZero).toHaveLength(0);
  });

  it('clears user cart completely', async () => {
    const product = { id: 'p103', title: 'Omega 3', price: 699, slug: 'omega-3' };
    await cartService.addToCart(userId, product, 1);
    await cartService.clearUserCart(userId);

    const items = await cartService.getUserCart(userId);
    expect(items).toEqual([]);
  });

  it('applies discount coupons accurately in mock mode', async () => {
    const resJoy = await cartService.applyCoupon('JOY30', 1000);
    expect(resJoy.valid).toBe(true);
    expect(resJoy.discountAmount).toBe(300);

    const resFirst = await cartService.applyCoupon('FIRST100', 500);
    expect(resFirst.valid).toBe(true);
    expect(resFirst.discountAmount).toBe(100);

    const resInvalid = await cartService.applyCoupon('INVALID_CODE', 1000);
    expect(resInvalid.valid).toBe(false);
    expect(resInvalid.discountAmount).toBe(0);
  });
});
