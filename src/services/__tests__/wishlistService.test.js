import { describe, it, expect, beforeEach } from 'vitest';
import { wishlistService } from '../wishlistService';

describe('wishlistService', () => {
  const userId = 'test_wishlist_user_01';

  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves empty wishlist for new user', async () => {
    const list = await wishlistService.getUserWishlist(userId);
    expect(list).toEqual([]);
  });

  it('toggles item in wishlist (adds if absent, removes if present)', async () => {
    const product = {
      id: 'prod_w1',
      title: 'Nutrition Drink',
      price: 549,
      slug: 'nutrition-drink',
    };

    const added = await wishlistService.toggleWishlist(userId, product);
    expect(added).toHaveLength(1);
    expect(added[0].productId).toBe('prod_w1');

    const removed = await wishlistService.toggleWishlist(userId, product);
    expect(removed).toHaveLength(0);
  });

  it('removes item from wishlist by productId', async () => {
    const product = {
      id: 'prod_w2',
      title: 'Multivitamin Gummies',
      price: 399,
      slug: 'multivitamin-gummies',
    };

    await wishlistService.toggleWishlist(userId, product);
    const updated = await wishlistService.removeFromWishlist(userId, 'prod_w2');
    expect(updated).toHaveLength(0);
  });

  it('clears all wishlist items', async () => {
    const product = { id: 'prod_w3', title: 'Barley Powder', price: 299 };
    await wishlistService.toggleWishlist(userId, product);
    wishlistService.clearUserWishlist(userId);

    const list = await wishlistService.getUserWishlist(userId);
    expect(list).toEqual([]);
  });
});
