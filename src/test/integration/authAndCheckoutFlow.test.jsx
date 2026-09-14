import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import AddressStep from '@/pages/checkout/AddressStep';
import PaymentStep from '@/pages/checkout/PaymentStep';
import OrderSuccessStep from '@/pages/checkout/OrderSuccessStep';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';

import { apiClient } from '@/services/apiClient';

describe('Auth, Protected Route & Checkout Integration Flows', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(apiClient, 'post').mockResolvedValue({ success: false, status: 500 });
    vi.spyOn(apiClient, 'get').mockResolvedValue({ success: false, status: 500 });
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    useCartStore.setState({
      cartItems: [
        { id: 'p1', title: 'Nutrimix Daily Health Drink', price: 549, quantity: 2 },
      ],
    });
    useCheckoutStore.setState({
      savedAddresses: [
        {
          id: 'addr-default',
          name: 'Amit Vishwakarma',
          mobile: '9876543210',
          pincode: '462016',
          addressLine: 'Flat 402, Sunshine',
          locality: 'Arera Colony',
          city: 'Bhopal',
          state: 'Madhya Pradesh',
          type: 'HOME',
        },
      ],
      selectedAddressId: 'addr-default',
      paymentMethod: 'COD',
      walletBalance: 200,
      useWalletBalance: false,
    });
  });

  describe('FLOW 4: Authentication Full Flow', () => {
    it('shows error on invalid credentials and succeeds with valid credentials', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<div>Home Welcome Screen</div>} />
          </Routes>
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/demo@example\.com/i);
      const passwordInput = screen.getByPlaceholderText(/enter password/i);
      const submitBtn = screen.getByRole('button', { name: /sign in to dashboard/i });

      // 1. Submit with invalid credentials
      await user.type(emailInput, 'wrong@test.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/no account found/i)).toBeInTheDocument();
      });

      // 2. Clear and submit with valid credentials
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, 'iam.itvishwakarma03@gmail.com');
      await user.type(passwordInput, 'demo123');
      await user.click(submitBtn);

      await waitFor(() => {
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
      });
    }, 15000);
  });

  describe('FLOW 5: Protected Route Enforcement', () => {
    it('blocks guests from accessing protected /checkout/address and redirects to login', () => {
      useAuthStore.setState({ isAuthenticated: false });

      render(
        <MemoryRouter initialEntries={['/checkout/address']}>
          <Routes>
            <Route
              path="/checkout/address"
              element={
                <ProtectedRoute>
                  <AddressStep />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Please Log In First</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Please Log In First')).toBeInTheDocument();
      expect(screen.queryByText('Delivery Address')).not.toBeInTheDocument();
    });

    it('permits authenticated users to access protected checkout address step', () => {
      useAuthStore.setState({ isAuthenticated: true, user: { id: 'u1', name: 'Amit' } });

      render(
        <MemoryRouter initialEntries={['/checkout/address']}>
          <Routes>
            <Route
              path="/checkout/address"
              element={
                <ProtectedRoute>
                  <AddressStep />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Delivery Address')).toBeInTheDocument();
      expect(screen.getByText('Amit Vishwakarma')).toBeInTheDocument();
    });
  });

  describe('FLOW 7: Checkout Address -> Payment -> Confirmation', () => {
    it('allows proceeding from Address step to Payment step', async () => {
      useAuthStore.setState({ isAuthenticated: true, user: { id: 'u1', name: 'Amit' } });
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/checkout/address']}>
          <Routes>
            <Route path="/checkout/address" element={<AddressStep />} />
            <Route path="/checkout/payment" element={<div>Payment Options Screen</div>} />
          </Routes>
        </MemoryRouter>
      );

      const proceedBtn = screen.getByRole('button', { name: /continue to payment/i });
      await user.click(proceedBtn);

      expect(screen.getByText('Payment Options Screen')).toBeInTheDocument();
    });

    it('places COD order on Payment step and navigates to Order Success Confirmation', async () => {
      useAuthStore.setState({
        isAuthenticated: true,
        user: { id: 'u1', name: 'Amit Vishwakarma', phone: '9876543210' },
      });
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/checkout/payment']}>
          <Routes>
            <Route path="/checkout/payment" element={<PaymentStep />} />
            <Route path="/checkout/success" element={<OrderSuccessStep />} />
          </Routes>
        </MemoryRouter>
      );

      // Verify order summary calculations (549 * 2 = 1098, free shipping)
      expect(screen.getByText(/select payment method/i)).toBeInTheDocument();

      // Click Place Order CTA
      const placeOrderBtn = screen.getByRole('button', { name: /place order • ₹1098/i });
      await user.click(placeOrderBtn);

      await waitFor(() => {
        expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
      });
    });
  });
});
