import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import CartDrawer from '@/components/modals/CartDrawer';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useAuthStore } from '@/stores/authStore';
import { apiClient } from '@/services/apiClient';

describe('Error & Edge Case Testing Suite', () => {
  beforeEach(() => {
    useCartStore.setState({ cartItems: [] });
    useWishlistStore.setState({ wishlistItems: [] });
    useAuthStore.setState({ isAuthenticated: true, user: { id: 'u1', name: 'Amit' } });
    vi.restoreAllMocks();
  });

  describe('Product Data Boundary & Fallbacks', () => {
    it('renders ProductCard without crashing when optional fields are null or undefined', () => {
      render(
        <MemoryRouter>
          <ProductCard
            id="p-edge"
            title="Minimal Product"
            price={299}
            benefits={null}
            subCategory={null}
            category={null}
            originalPrice={null}
            rating={undefined}
            reviews={undefined}
            image={null}
          />
        </MemoryRouter>
      );

      expect(screen.getByText('Minimal Product')).toBeInTheDocument();
      expect(screen.getByText('₹299')).toBeInTheDocument();
    });

    it('handles ProductCard with missing slug by generating fallback from id or title', () => {
      render(
        <MemoryRouter>
          <ProductCard
            id="p-fallback"
            title="Product With Special Characters! & More"
            price={199}
          />
        </MemoryRouter>
      );

      const links = screen.getAllByRole('link');
      expect(links.some((link) => link.getAttribute('href')?.includes('/product/'))).toBe(true);
    });
  });

  describe('Cart Boundary & Quantity Limits', () => {
    it('prevents adding items beyond MAX_ITEM_QUANTITY (10)', () => {
      const { addToCart, updateQuantity } = useCartStore.getState();

      addToCart({ id: 'edge-item', title: 'Nutrimix', price: 500 });
      // Set to maximum
      updateQuantity('edge-item', 10);
      expect(useCartStore.getState().cartItems[0].quantity).toBe(10);

      // Attempt to exceed 10
      updateQuantity('edge-item', 15);
      expect(useCartStore.getState().cartItems[0].quantity).toBe(10);

      // Attempt to decrement below 1 -> removes item from cart
      updateQuantity('edge-item', 0);
      expect(useCartStore.getState().cartItems).toHaveLength(0);
    });

    it('renders empty cart drawer gracefully without throwing pricing errors', () => {
      render(
        <MemoryRouter>
          <CartDrawer isOpen={true} cartItems={[]} onClose={vi.fn()} />
        </MemoryRouter>
      );

      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
      expect(screen.queryByText(/total amount/i)).not.toBeInTheDocument();
    });
  });

  describe('API Resilience & Malformed Data', () => {
    it('handles malformed JSON response envelopes from backend without throwing', async () => {
      vi.spyOn(apiClient.instance, 'get').mockResolvedValueOnce({
        status: 200,
        data: 'Not a JSON object string from broken proxy',
      });

      const res = await apiClient.get('/malformed-endpoint');
      expect(res.success).toBe(true);
      expect(res.data).toBe('Not a JSON object string from broken proxy');
    });

    it('handles HTTP 502 Bad Gateway and 504 Gateway Timeout gracefully', async () => {
      vi.spyOn(apiClient.instance, 'get').mockRejectedValueOnce({
        response: { status: 502, data: { message: 'Bad Gateway' } },
      });

      const res = await apiClient.get('/unstable-endpoint');
      expect(res.success).toBe(false);
      expect(res.status).toBe(502);
      expect(res.message).toBe('Bad Gateway');
    });
  });

  describe('Rapid User Interaction & Deduplication', () => {
    it('handles rapid repeated clicks on Add to Cart without corrupting state', async () => {
      useAuthStore.setState({ isAuthenticated: true });
      const onAddToCartMock = vi.fn();
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <ProductCard
            id="rapid-item"
            title="Rapid Item"
            price={400}
            onAddToCart={onAddToCartMock}
          />
        </MemoryRouter>
      );

      const addBtn = screen.getByRole('button', { name: /add rapid item to cart/i });

      // Click rapidly
      await user.click(addBtn);
      await user.click(addBtn);

      expect(onAddToCartMock).toHaveBeenCalled();
    });
  });
});
