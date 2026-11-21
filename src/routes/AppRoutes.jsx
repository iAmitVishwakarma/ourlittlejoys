import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { PageSkeleton } from '@/components/common/Skeleton';
import { RETURNS_CONTENT, TERMS_CONTENT, PRIVACY_CONTENT } from '@/data/legal';

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
const Wishlist = React.lazy(() => import('@/pages/Wishlist'));
const Login = React.lazy(() => import('@/pages/Login'));
const FAQPage = React.lazy(() =>
  import('@/pages/StaticPages').then((m) => ({ default: m.FAQPage }))
);
const ContactPage = React.lazy(() =>
  import('@/pages/StaticPages').then((m) => ({ default: m.ContactPage }))
);
const LegalPage = React.lazy(() =>
  import('@/pages/StaticPages').then((m) => ({ default: m.LegalPage }))
);
const NotFound = React.lazy(() => import('@/pages/NotFound'));

export default function AppRoutes({
  cartItems = [],
  addToCart,
  updateQuantity,
}) {
  return (
    <Suspense fallback={<PageSkeleton />}>
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

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />

        {/* Dedicated Shopping Bag / Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Dedicated Parent Account & Orders Dashboard */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Profile defaultTab="orders" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Profile defaultTab="wallet" />
            </ProtectedRoute>
          }
        />

        {/* Checkout Flow */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <AddressStep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute>
              <AddressStep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/payment"
          element={
            <ProtectedRoute>
              <PaymentStep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <OrderSuccessStep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout-v2"
          element={
            <ProtectedRoute>
              <AddressStep />
            </ProtectedRoute>
          }
        />

        {/* Product Detail Page */}
        <Route
          path="/product/:slug"
          element={
            <ProductDetail onAddToCart={addToCart} cartItems={cartItems} />
          }
        />

        {/* Honest Reports */}
        <Route path="/honest-report" element={<HonestReport />} />

        {/* Wallet Recharge */}
        <Route
          path="/wallet-recharge"
          element={
            <ProtectedRoute>
              <WalletRecharge />
            </ProtectedRoute>
          }
        />

        {/* Brand & Support Pages */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/returns"
          element={
            <LegalPage
              title="Returns &amp; Refunds Policy"
              content={RETURNS_CONTENT}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <LegalPage
              title="Terms &amp; Conditions"
              content={TERMS_CONTENT}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <LegalPage
              title="Privacy &amp; Data Protection Policy"
              content={PRIVACY_CONTENT}
            />
          }
        />

        {/* 404 Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
