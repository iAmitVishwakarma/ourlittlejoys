import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CheckoutStepper from '../CheckoutStepper';

describe('CheckoutStepper Component', () => {
  it('renders all four checkout steps with accessible progress navigation', () => {
    render(
      <MemoryRouter>
        <CheckoutStepper currentStep="address" />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation', { name: /checkout progress/i })).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders Back to Bag link on address and payment steps, but hides on confirmation', () => {
    const { rerender } = render(
      <MemoryRouter>
        <CheckoutStepper currentStep="address" />
      </MemoryRouter>
    );
    expect(screen.getByText(/back to bag/i)).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <CheckoutStepper currentStep="confirmation" />
      </MemoryRouter>
    );
    expect(screen.queryByText(/back to bag/i)).not.toBeInTheDocument();
  });

  it('allows clicking previously completed steps to navigate back', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/checkout/payment']}>
        <CheckoutStepper currentStep="payment" />
      </MemoryRouter>
    );

    // Cart and Address are completed (indices 0 and 1 < index 2 of payment)
    const cartStep = screen.getByText('Cart').closest('div');
    expect(cartStep).toHaveClass('cursor-pointer');

    // Future step (Done) is not clickable
    const doneStep = screen.getByText('Done').closest('div');
    expect(doneStep).toHaveClass('cursor-default');

    await user.click(cartStep);
  });
});
