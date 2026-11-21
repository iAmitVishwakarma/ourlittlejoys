import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useCartStore } from './stores/cartStore';
import { useAuthStore } from './stores/authStore';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import AppRoutes from './routes/AppRoutes';

const CartDrawer = React.lazy(() => import('./components/modals/CartDrawer'));
const AuthModal = React.lazy(() => import('./components/modals/AuthModal'));
const UserAccountDrawer = React.lazy(() => import('./components/modals/UserAccountDrawer'));
const CheckoutFooter = React.lazy(() => import('./components/layout/CheckoutFooter'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const cartItems = useCartStore((s) => s.cartItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const location = useLocation();
  const isCheckoutRoute = location.pathname.startsWith('/checkout');

  return (
    <div
      className={`flex flex-col min-h-screen bg-brand-cream text-slate-800 antialiased selection:bg-[#C89B58]/25 selection:text-[#1F3C24] font-sans ${
        isCheckoutRoute ? '' : 'pb-16 lg:pb-0'
      }`}
    >
      <ScrollToTop />

      {!isCheckoutRoute && (
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />
      )}

      <main className={`grow ${isCheckoutRoute ? 'pt-0' : 'pt-22.5 md:pt-24.5'}`}>
        <ErrorBoundary>
          <AppRoutes
            cartItems={cartItems}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
          />
        </ErrorBoundary>
      </main>

      {isCheckoutRoute ? (
        <React.Suspense fallback={<footer className="h-16 bg-white" />}>
          <CheckoutFooter />
        </React.Suspense>
      ) : (
        <Footer />
      )}

      {!isCheckoutRoute && (
        <MobileBottomNav onOpenAuth={() => setIsAuthOpen(true)} />
      )}

      <React.Suspense fallback={null}>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        <UserAccountDrawer
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
        />
      </React.Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}
