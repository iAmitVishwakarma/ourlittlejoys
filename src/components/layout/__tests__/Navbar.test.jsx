import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    useCartStore.setState({ cartItems: [] });
    useWishlistStore.setState({ wishlistItems: [] });
  });

  it('renders brand logo and primary navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/little/i)).toBeInTheDocument();
    expect(screen.getByText(/joys/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop all/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /honest reports/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });

  it('handles search input change, clearing, and form submission', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const searchInputs = screen.getAllByRole('textbox', { name: /search/i });
    const desktopSearch = searchInputs[0];

    await user.type(desktopSearch, 'Nutrimix');
    expect(desktopSearch).toHaveValue('Nutrimix');

    await user.keyboard('{Enter}');
    expect(mockedNavigate).toHaveBeenCalledWith('/shop/all?search=Nutrimix');

    // Clear search button appears when query is present
    const clearBtn = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearBtn);
    expect(desktopSearch).toHaveValue('');
  });

  it('displays dynamic cart item count', () => {
    useCartStore.setState({
      cartItems: [
        { id: 'p1', title: 'Nutrimix', price: 549, quantity: 3 },
      ],
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays wishlist counter when items are saved', () => {
    useWishlistStore.setState({
      wishlistItems: [{ id: 'w1', title: 'Kids Gummies' }, { id: 'w2', title: 'Choco Spread' }],
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const wishlistLinks = screen.getAllByLabelText(/wishlist with 2 items/i);
    expect(wishlistLinks.length).toBeGreaterThan(0);
  });

  it('renders login link when unauthenticated and user dropdown when authenticated', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /log in to account/i })).toBeInTheDocument();

    useAuthStore.setState({
      isAuthenticated: true,
      user: { id: 'u1', name: 'Amit Vishwakarma', email: 'amit@test.com', walletBalance: 450 },
    });

    rerender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const userMenuButton = screen.getByRole('button', { name: /parent profile menu/i });
    expect(userMenuButton).toBeInTheDocument();

    await user.click(userMenuButton);
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('My Orders')).toBeInTheDocument();
    expect(screen.getByText('Recharge Wallet')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    const logoutButton = screen.getByText('Log Out');
    await user.click(logoutButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
