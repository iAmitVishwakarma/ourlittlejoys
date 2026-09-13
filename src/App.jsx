import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

// Interaction-only components — lazy-loaded since they're hidden until user clicks
const CartDrawer = React.lazy(() => import('@/components/modals/CartDrawer'));
const AuthModal = React.lazy(() => import('@/components/modals/AuthModal'));
const UserAccountDrawer = React.lazy(() => import('@/components/modals/UserAccountDrawer'));
const CheckoutFooter = React.lazy(() => import('@/components/layout/CheckoutFooter'));

// Pages - All routes lazy-loaded for optimal code splitting
const Home = React.lazy(() => import('@/pages/Home'));
const ShopAll = React.lazy(() => import('@/pages/ShopAll'));
const HonestReport = React.lazy(() => import('@/pages/HonestReport'));
const AddressStep = React.lazy(() => import('@/pages/checkout/AddressStep'));
const PaymentStep = React.lazy(() => import('@/pages/checkout/PaymentStep'));
const OrderSuccessStep = React.lazy(() => import('@/pages/checkout/OrderSuccessStep'));
const ProductDetail = React.lazy(() => import('@/pages/ProductDetail'));
const AboutUs = React.lazy(() => import('@/pages/AboutUs'));
const WalletRecharge = React.lazy(() => import('@/pages/WalletRecharge'));
const Cart = React.lazy(() => import('@/pages/Cart'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const FAQPage = React.lazy(() => import('@/pages/StaticPages').then(m => ({ default: m.FAQPage })));
const ContactPage = React.lazy(() => import('@/pages/StaticPages').then(m => ({ default: m.ContactPage })));
const LegalPage = React.lazy(() => import('@/pages/StaticPages').then(m => ({ default: m.LegalPage })));

// Scroll to top helper on route change
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
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const location = useLocation();
  const isCheckoutRoute = location.pathname.startsWith('/checkout');

  return (
    <div className={`flex flex-col min-h-screen bg-[#FFF9F5] text-slate-800 antialiased selection:bg-pink-100 selection:text-pink-600 font-sans ${isCheckoutRoute ? '' : 'pb-16 lg:pb-0'}`}>
      <ScrollToTop />
      
      {/* Navbar with announcement bar, categories (Hidden on checkout for distraction-free flow) */}
      {!isCheckoutRoute && (
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />
      )}

      {/* Main Pages Router (pt-0 on checkout routes) */}
      <main className={`flex-grow ${isCheckoutRoute ? 'pt-0' : 'pt-[90px] md:pt-[98px]'}`}>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-9 h-9 border-3 border-[#13805B] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <Home
                onAddToCart={addToCart}
                cartItems={cartItems}
                onUpdateCartQuantity={updateQuantity}
              />
            }
          />

          {/* Shop Catalog & Dynamic Category Route */}
          <Route
            path="/shop/all"
            element={
              <ShopAll
                onAddToCart={addToCart}
                cartItems={cartItems}
                onUpdateCartQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/shop/:category"
            element={
              <ShopAll
                onAddToCart={addToCart}
                cartItems={cartItems}
                onUpdateCartQuantity={updateQuantity}
              />
            }
          />

          {/* Dedicated Shopping Bag / Cart Page */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Dedicated Parent Account & Orders Dashboard */}
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/orders"
            element={<Profile />}
          />

          {/* Step-Based Myntra-Style Checkout Flow */}
          <Route path="/checkout" element={<AddressStep />} />
          <Route path="/checkout/address" element={<AddressStep />} />
          <Route path="/checkout/payment" element={<PaymentStep />} />
          <Route path="/checkout/success" element={<OrderSuccessStep />} />
          <Route path="/checkout-v2" element={<AddressStep />} />

          {/* Product Detail Page */}
          <Route
            path="/product/:slug"
            element={
              <ProductDetail
                onAddToCart={addToCart}
                cartItems={cartItems}
              />
            }
          />

          {/* Honest Reports & Lab Testing */}
          <Route
            path="/honest-report"
            element={<HonestReport />}
          />

          {/* LJ Wallet Recharge */}
          <Route
            path="/wallet-recharge"
            element={<WalletRecharge />}
          />

          {/* Brand & Support Pages */}
          <Route
            path="/aboutus"
            element={<AboutUs />}
          />
          <Route
            path="/faq"
            element={<FAQPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/returns"
            element={
              <LegalPage
                title="Returns & Refunds Policy"
                content={
                  <>
                    <p>
                      At Little Joys, your child's health, safety, and delight are our highest priorities. We formulate every product with medical-grade clean ingredients and transparent lab reporting.
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-4">7-Day Replacement Guarantee</h3>
                    <p>
                      If any product you receive is damaged in transit, expired, or defective, you are entitled to an immediate 100% free replacement or full refund to your original payment method or LJ Wallet within 7 days of delivery.
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-4">How to Initiate a Return</h3>
                    <p>
                      Simply contact our care team at care@ourlittlejoys.com or via WhatsApp helpline with your Order ID and photo of the damaged package.
                    </p>
                  </>
                }
              />
            }
          />
          <Route
            path="/terms"
            element={
              <LegalPage
                title="Terms & Conditions"
                content={
                  <>
                    <p>
                      Welcome to Our Little Joys. By accessing and purchasing from our website, you agree to comply with and be bound by the following terms of service.
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-4">Product Quality & Advisory</h3>
                    <p>
                      All our formulations are created in consultation with pediatricians. While our products support daily nutrition and immunity, they are nutritional dietary supplements and not intended to replace prescription medicine.
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-4">LJ Wallet Terms</h3>
                    <p>
                      LJ Wallet bonus credits cannot be withdrawn as hard cash to bank accounts, but can be redeemed on any purchase on ourlittlejoys.com without expiry.
                    </p>
                  </>
                }
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <LegalPage
                title="Privacy & Data Protection Policy"
                content={
                  <>
                    <p>
                      Your privacy and your family's personal data are strictly safeguarded. We do not sell or rent your personal contact information to any third parties.
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-4">Data We Collect</h3>
                    <p>
                      We collect basic contact information (phone number, shipping address) to deliver orders, and child age preferences to personalize nutritional recommendations.
                    </p>
                    <h3 className="text-sm font-black text-slate-800 mt-4">Security</h3>
                    <p>
                      All transaction data is processed using 256-bit SSL encryption adhering to PCI-DSS payment compliance standards.
                    </p>
                  </>
                }
              />
            }
          />
        </Routes>
        </React.Suspense>
      </main>

      {/* Footer with safety guarantees & page links (Switches to clean minimal CheckoutFooter on checkout) */}
      {isCheckoutRoute ? (
        <React.Suspense fallback={<footer className="h-16 bg-white" />}>
          <CheckoutFooter />
        </React.Suspense>
      ) : <Footer />}

      {/* Mobile Bottom Navigation (Hidden during checkout) */}
      {!isCheckoutRoute && (
        <MobileBottomNav
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* Interactive Sliding Cart Drawer */}
      <React.Suspense fallback={null}>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

        {/* Auth & LJ Wallet Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />

        {/* Logged in User Account & Wallet Drawer */}
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
    <Router>
      <AppContent />
    </Router>
  );
}
