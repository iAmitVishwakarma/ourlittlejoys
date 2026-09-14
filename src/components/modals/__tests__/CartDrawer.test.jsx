import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CartDrawer from '../CartDrawer';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('CartDrawer Component', () => {
  const mockItems = [
    {
      id: 'c1',
      title: 'Nutrimix Chocolate',
      price: 549,
      originalPrice: 699,
      quantity: 2,
      category: 'Nutrition',
    },
    {
      id: 'c2',
      title: 'Multivitamin Gummies',
      price: 399,
      originalPrice: 499,
      quantity: 1,
      category: 'Gummies',
    },
  ];

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <MemoryRouter>
        <CartDrawer isOpen={false} cartItems={[]} onClose={vi.fn()} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders empty cart state when cart has no items', () => {
    render(
      <MemoryRouter>
        <CartDrawer isOpen={true} cartItems={[]} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /explore products/i })).toBeInTheDocument();
  });

  it('renders list of cart items with quantity adjustment and removal controls', async () => {
    const handleUpdateQuantity = vi.fn();
    const handleRemoveItem = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartDrawer
          isOpen={true}
          cartItems={mockItems}
          onClose={vi.fn()}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Nutrimix Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Multivitamin Gummies')).toBeInTheDocument();

    const increaseBtn = screen.getByRole('button', { name: /increase quantity of nutrimix chocolate/i });
    const decreaseBtn = screen.getByRole('button', { name: /decrease quantity of nutrimix chocolate/i });
    const removeBtn = screen.getByRole('button', { name: /remove multivitamin gummies/i });

    await user.click(increaseBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledWith('c1', 3);

    await user.click(decreaseBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledWith('c1', 1);

    await user.click(removeBtn);
    expect(handleRemoveItem).toHaveBeenCalledWith('c2');
  });

  it('navigates to checkout when Proceed to Checkout is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartDrawer
          isOpen={true}
          cartItems={mockItems}
          onClose={handleClose}
          onUpdateQuantity={vi.fn()}
          onRemoveItem={vi.fn()}
        />
      </MemoryRouter>
    );

    const checkoutBtn = screen.getByRole('button', { name: /proceed to checkout/i });
    await user.click(checkoutBtn);

    expect(handleClose).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('/checkout/address');
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartDrawer
          isOpen={true}
          cartItems={mockItems}
          onClose={handleClose}
          onUpdateQuantity={vi.fn()}
          onRemoveItem={vi.fn()}
        />
      </MemoryRouter>
    );

    const closeBtn = screen.getByRole('button', { name: /close shopping bag/i });
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
