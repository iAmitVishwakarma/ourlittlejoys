import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AddressDrawer from '../AddressDrawer';
import { useCheckoutStore } from '@/stores/checkoutStore';

describe('AddressDrawer Component', () => {
  beforeEach(() => {
    useCheckoutStore.setState({
      savedAddresses: [],
      addAddress: vi.fn(),
      updateAddress: vi.fn(),
    });
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <AddressDrawer isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('validates required fields on empty submit', async () => {
    const user = userEvent.setup();

    render(
      <AddressDrawer isOpen={true} onClose={vi.fn()} />
    );

    const saveBtn = screen.getByRole('button', { name: /save address/i });
    await user.click(saveBtn);

    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid 10-digit mobile number')).toBeInTheDocument();
  });

  it('allows filling valid address and saving', async () => {
    const user = userEvent.setup({ delay: null });
    const handleClose = vi.fn();
    const addAddressMock = vi.fn();
    useCheckoutStore.setState({ addAddress: addAddressMock });

    render(
      <AddressDrawer isOpen={true} onClose={handleClose} />
    );

    await user.type(screen.getByLabelText(/full name/i), 'Amit Vishwakarma');
    await user.type(screen.getByLabelText(/mobile number/i), '9876543210');
    await user.type(screen.getByLabelText(/flat, house no/i), 'Flat 402, Sunshine Towers');
    await user.type(screen.getByLabelText(/area, street, sector/i), 'Arera Colony');

    const saveBtn = screen.getByRole('button', { name: /save address/i });
    await user.click(saveBtn);

    expect(addAddressMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Amit Vishwakarma',
        mobile: '9876543210',
        addressLine: 'Flat 402, Sunshine Towers',
        locality: 'Arera Colony',
        city: 'Bhopal',
      })
    );
    expect(handleClose).toHaveBeenCalled();
  }, 10000);
});
