import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import ProductCard from '@/components/product/ProductCard';
import CartDrawer from '@/components/modals/CartDrawer';
import AuthModal from '@/components/modals/AuthModal';
import AddressDrawer from '@/components/modals/AddressDrawer';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import { FAQPage } from '@/pages/StaticPages';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

describe('Accessibility & Semantic HTML Audits (WCAG 2.1 AA)', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: false });
    useCartStore.setState({ cartItems: [] });
  });

  describe('Interactive Buttons & Links Accessible Names', () => {
    it('all buttons in Navbar have accessible names or aria-labels', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((btn) => {
        const name = btn.getAttribute('aria-label') || btn.textContent?.trim();
        expect(name).toBeTruthy();
      });
    });

    it('all links in MobileBottomNav have descriptive accessible names', () => {
      render(
        <MemoryRouter>
          <MobileBottomNav />
        </MemoryRouter>
      );

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        const name = link.getAttribute('aria-label') || link.textContent?.trim();
        expect(name).toBeTruthy();
      });
    });

    it('ProductCard interactive controls have complete aria-labels', () => {
      render(
        <MemoryRouter>
          <ProductCard
            id="a11y-prod"
            title="Immunity Gummies"
            price={399}
            cartQuantity={2}
          />
        </MemoryRouter>
      );

      expect(screen.getByRole('button', { name: /increase quantity of immunity gummies/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /decrease quantity of immunity gummies/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /wishlist/i })).toBeInTheDocument();
    });
  });

  describe('Dialogs & Modal ARIA Roles', () => {
    it('CartDrawer adheres to WAI-ARIA dialog pattern', () => {
      render(
        <MemoryRouter>
          <CartDrawer isOpen={true} cartItems={[]} onClose={() => {}} />
        </MemoryRouter>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('AuthModal adheres to WAI-ARIA dialog pattern', () => {
      render(
        <MemoryRouter>
          <AuthModal isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('AddressDrawer adheres to WAI-ARIA dialog pattern', () => {
      render(
        <MemoryRouter>
          <AddressDrawer isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });
  });

  describe('Form Labels & Input Accessibility', () => {
    it('AddressDrawer form fields have properly associated labels', () => {
      render(
        <MemoryRouter>
          <AddressDrawer isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/pincode/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/flat, house no/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/area, street, sector/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/town \/ city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Landmarks & Stepper Semantics', () => {
    it('CheckoutStepper uses a labeled nav landmark', () => {
      render(
        <MemoryRouter>
          <CheckoutStepper currentStep="payment" />
        </MemoryRouter>
      );

      expect(screen.getByRole('navigation', { name: /checkout progress/i })).toBeInTheDocument();
    });

    it('FAQ page has correct heading hierarchy (h1 and h2)', () => {
      render(
        <MemoryRouter>
          <FAQPage />
        </MemoryRouter>
      );

      const h1s = screen.getAllByRole('heading', { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent(/frequently asked questions/i);

      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThanOrEqual(4);
    });
  });
});
