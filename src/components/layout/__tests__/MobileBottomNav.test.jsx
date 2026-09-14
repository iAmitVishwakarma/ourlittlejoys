import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MobileBottomNav from '../MobileBottomNav';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';

describe('MobileBottomNav Component', () => {
  beforeEach(() => {
    useCartStore.setState({ cartItems: [] });
    useAuthStore.setState({ isAuthenticated: false });
  });

  it('renders all mobile bottom navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileBottomNav />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation', { name: /mobile bottom navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /honest lab reports/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shopping cart/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /log in to account/i })).toBeInTheDocument();
  });

  it('displays cart count badge when items are in cart', () => {
    useCartStore.setState({
      cartItems: [
        { id: '1', title: 'Nutrimix', price: 499, quantity: 2 },
        { id: '2', title: 'Gummies', price: 399, quantity: 3 },
      ],
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileBottomNav />
      </MemoryRouter>
    );

    // Total quantity = 2 + 3 = 5
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('links to /profile when authenticated and /login when unauthenticated', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <MobileBottomNav />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /log in to account/i })).toHaveAttribute('href', '/login');

    useAuthStore.setState({ isAuthenticated: true });

    rerender(
      <MemoryRouter initialEntries={['/']}>
        <MobileBottomNav />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /parent account/i })).toHaveAttribute('href', '/profile');
  });

  it('hides completely on checkout routes to prevent mobile checkout button obstruction', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/checkout/address']}>
        <MobileBottomNav />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});
