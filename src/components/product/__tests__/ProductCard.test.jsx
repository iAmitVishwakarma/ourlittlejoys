import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { useAuthStore } from '@/stores/authStore';
import { useWishlistStore } from '@/stores/wishlistStore';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('ProductCard Component', () => {
  const defaultProduct = {
    id: 'prod-101',
    title: 'Nutrimix Chocolate Drink',
    price: 549,
    originalPrice: 699,
    rating: '4.9',
    reviews: '1.5k+',
    category: 'Daily Nutrition',
    age: '4+ Yr',
    weight: '400g',
    slug: 'nutrimix-chocolate',
  };

  beforeEach(() => {
    mockedNavigate.mockClear();
    useAuthStore.setState({ isAuthenticated: true });
    useWishlistStore.setState({ wishlistItems: [] });
  });

  it('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard {...defaultProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Nutrimix Chocolate Drink')).toBeInTheDocument();
    expect(screen.getByText('₹549')).toBeInTheDocument();
    expect(screen.getByText('₹699')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('(1.5k+ reviews)')).toBeInTheDocument();
    expect(screen.getByText('4+ Yr')).toBeInTheDocument();
    // Discount badge: round(((699 - 549) / 699) * 100) = 21%
    expect(screen.getByText('21% OFF')).toBeInTheDocument();
  });

  it('handles Add To Cart interaction for authenticated user', async () => {
    const handleAddToCart = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard {...defaultProduct} onAddToCart={handleAddToCart} />
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /add nutrimix chocolate drink to cart/i });
    await user.click(addBtn);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'prod-101',
        title: 'Nutrimix Chocolate Drink',
        price: 549,
      })
    );
    expect(screen.getByText('ADDED')).toBeInTheDocument();
  });

  it('redirects unauthenticated guest to login when adding to cart', async () => {
    useAuthStore.setState({ isAuthenticated: false });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard {...defaultProduct} />
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /add nutrimix chocolate drink to cart/i });
    await user.click(addBtn);

    expect(mockedNavigate).toHaveBeenCalledWith('/login', { state: { from: '/cart' } });
  });

  it('renders quantity controls when item is already in cart', async () => {
    const handleUpdateQuantity = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard
          {...defaultProduct}
          cartQuantity={2}
          onUpdateCartQuantity={handleUpdateQuantity}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('2')).toBeInTheDocument();

    const increaseBtn = screen.getByRole('button', { name: /increase quantity/i });
    const decreaseBtn = screen.getByRole('button', { name: /decrease quantity/i });

    await user.click(increaseBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledWith('prod-101', 3);

    await user.click(decreaseBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledWith('prod-101', 1);
  });

  it('disables interactions when product is sold out', () => {
    render(
      <MemoryRouter>
        <ProductCard {...defaultProduct} isSoldOut={true} />
      </MemoryRouter>
    );

    const soldOutBtn = screen.getByRole('button', { name: /is currently sold out/i });
    expect(soldOutBtn).toBeDisabled();
    expect(screen.getByText('SOLD OUT')).toBeInTheDocument();
  });

  it('toggles wishlist when heart icon is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard {...defaultProduct} />
      </MemoryRouter>
    );

    const wishlistBtn = screen.getByRole('button', { name: /wishlist/i });
    await user.click(wishlistBtn);

    const items = useWishlistStore.getState().wishlistItems;
    expect(items.some((i) => i.id === 'prod-101')).toBe(true);
  });
});
