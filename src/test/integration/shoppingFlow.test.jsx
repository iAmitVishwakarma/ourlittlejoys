import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ShopAll from '@/pages/ShopAll';
import Wishlist from '@/pages/Wishlist';
import CartDrawer from '@/components/modals/CartDrawer';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useAuthStore } from '@/stores/authStore';
import { productService } from '@/services/productService';

const mockProducts = [
  {
    id: 'prod-nutrimix',
    slug: 'nutrimix-daily-nutrition',
    title: 'Nutrimix Daily Health Drink',
    price: 549,
    originalPrice: 699,
    category: 'Nutrimix',
    age: '4+ Yr',
    rating: '4.9',
    reviews: '2.1k',
  },
  {
    id: 'prod-gummies',
    slug: 'multivitamin-gummies',
    title: 'Immunity Multivitamin Gummies',
    price: 399,
    originalPrice: 499,
    category: 'Gummies',
    age: '4+ Yr',
    rating: '4.8',
    reviews: '1.2k',
  },
];

describe('Shopping, Wishlist & Search Integration Flows', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ cartItems: [] });
    useWishlistStore.setState({ wishlistItems: [] });
    useAuthStore.setState({ isAuthenticated: true, user: { id: 'u1', name: 'Amit' } });

    vi.spyOn(productService, 'getAllProducts').mockResolvedValue(mockProducts);
  });

  describe('FLOW 1: Complete Shopping Flow', () => {
    it('browses shop, adds product to cart, updates quantity in drawer, and removes item', async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <MemoryRouter initialEntries={['/shop/all']}>
          <Routes>
            <Route path="/shop/all" element={<ShopAll />} />
          </Routes>
        </MemoryRouter>
      );

      // 1. Catalog loads products
      await waitFor(() => {
        expect(screen.getByText('Nutrimix Daily Health Drink')).toBeInTheDocument();
      });

      // 2. Add Nutrimix to cart
      const addBtns = screen.getAllByRole('button', { name: /add/i });
      await user.click(addBtns[0]);

      // Cart state updated
      expect(useCartStore.getState().cartItems).toHaveLength(1);
      expect(useCartStore.getState().cartItems[0].id).toBe('prod-nutrimix');

      // 3. Open Cart Drawer and inspect contents
      rerender(
        <MemoryRouter initialEntries={['/shop/all']}>
          <CartDrawer
            isOpen={true}
            cartItems={useCartStore.getState().cartItems}
            onClose={vi.fn()}
            onUpdateQuantity={useCartStore.getState().updateQuantity}
            onRemoveItem={useCartStore.getState().removeFromCart}
          />
        </MemoryRouter>
      );

      expect(screen.getByText('Nutrimix Daily Health Drink')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();

      // 4. Increment quantity to 2
      const increaseBtn = screen.getByRole('button', { name: /increase quantity of nutrimix daily health drink/i });
      await user.click(increaseBtn);
      expect(useCartStore.getState().cartItems[0].quantity).toBe(2);

      // 5. Remove item from cart
      const removeBtn = screen.getByRole('button', { name: /remove nutrimix daily health drink/i });
      await user.click(removeBtn);
      expect(useCartStore.getState().cartItems).toHaveLength(0);
    });
  });

  describe('FLOW 2: Wishlist Flow', () => {
    it('adds product to wishlist, displays it on wishlist page, and moves item to cart', async () => {
      const user = userEvent.setup();

      // 1. Initially wishlist is empty
      const { rerender } = render(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Wishlist />
        </MemoryRouter>
      );

      expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();

      // 2. Add an item to wishlist
      useWishlistStore.getState().toggleWishlist(mockProducts[0]);
      expect(useWishlistStore.getState().wishlistItems).toHaveLength(1);

      // 3. Rerender Wishlist page
      rerender(
        <MemoryRouter initialEntries={['/wishlist']}>
          <Wishlist />
        </MemoryRouter>
      );

      expect(screen.getByText('Nutrimix Daily Health Drink')).toBeInTheDocument();

      // 4. Move to Bag
      const moveBtn = screen.getByRole('button', { name: /move to bag/i });
      await user.click(moveBtn);

      // Wishlist now empty, Cart now has 1 item
      expect(useWishlistStore.getState().wishlistItems).toHaveLength(0);
      expect(useCartStore.getState().cartItems).toHaveLength(1);
    });
  });

  describe('FLOW 3: Search Integration & Edge Cases', () => {
    it('filters products by valid search term', async () => {
      render(
        <MemoryRouter initialEntries={['/shop/all?search=Gummies']}>
          <Routes>
            <Route path="/shop/all" element={<ShopAll />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Immunity Multivitamin Gummies')).toBeInTheDocument();
      });
      expect(screen.queryByText('Nutrimix Daily Health Drink')).not.toBeInTheDocument();
    });

    it('shows empty results fallback when search yields no matches', async () => {
      render(
        <MemoryRouter initialEntries={['/shop/all?search=NonExistentGadgetXYZ']}>
          <Routes>
            <Route path="/shop/all" element={<ShopAll />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/no products found/i)).toBeInTheDocument();
      });
    });

    it('sanitizes special characters in search input without breaking', async () => {
      render(
        <MemoryRouter initialEntries={['/shop/all?search=%3Cscript%3Ealert(1)%3C%2Fscript%3E']}>
          <Routes>
            <Route path="/shop/all" element={<ShopAll />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/no products found/i)).toBeInTheDocument();
      });
    });
  });

  describe('FLOW 6: Cart Persistence Across Re-initialization', () => {
    it('persists cart state to localStorage and reloads intact', () => {
      // 1. Add item to cart
      useCartStore.getState().addToCart({
        id: 'persist-prod-1',
        title: 'Organic Almond Spread',
        price: 349,
        quantity: 2,
      });

      // 2. Read what was serialized to localStorage under 'lj_user_cart_store_v3'
      const rawStored = localStorage.getItem('lj_user_cart_store_v3');
      expect(rawStored).toBeTruthy();
      const parsed = JSON.parse(rawStored);
      expect(parsed.state.cartItems[0].title).toBe('Organic Almond Spread');
      expect(parsed.state.cartItems[0].quantity).toBe(2);
    });
  });
});
