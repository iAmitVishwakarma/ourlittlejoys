# Our Little Joys (Nestor) — Frontend Application

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand 5](https://img.shields.io/badge/Zustand-5-443E38?logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Tests Passing](https://img.shields.io/badge/Vitest-255_Passed-4ADE80?logo=vitest&logoColor=white)](https://vitest.dev/)

Production-grade React storefront for Nestor / Our Little Joys child nutrition, immunity, and wellness essentials. Built with React 19, Vite 8, Tailwind CSS v4, and Zustand 5. Architected with zero AI tooling artifacts, accessible WAI-ARIA controls, resilient error boundaries, and a clean, standardized REST API layer ready for backend integration.

**Repository:** [https://github.com/iAmitVishwakarma/ourlittlejoys](https://github.com/iAmitVishwakarma/ourlittlejoys)

---

## Key Features & Highlights

- **Smart Scroll Navbar:**
  - Auto-hiding top announcement bar with smooth CSS grid transition (`grid-rows-[1fr]` to `grid-rows-[0fr]`) when scrolling beyond 10px (`window.scrollY > 10`), sliding the main navbar flush to `top-0` without layout jank.
  - Subtle frosted-glass backdrop blur (`bg-white/85 backdrop-blur-md border-b border-stone-200/70 shadow-sm`) providing legibility and polish over scrolling content.
  - DRY user dropdown with direct navigation to My Account, My Orders, and Logout, plus a live Nestor Wallet balance pill (`₹200`).

- **Dedicated `/orders` Dashboard:**
  - Full-width protected standalone page (`max-w-5xl mx-auto`) with complete `<SEO>` metadata.
  - Interactive status filter dropdown (`All Orders`, `Delivered`, `Processing`) and order count badges.
  - Visual 4-step delivery progress tracker (`Confirmed → Packed → Shipped → Delivered`).
  - Single-click **Buy Again** reordering to cart, detailed order receipts via `OrderDetailModal`, and delivery address recap.
  - Dedicated business logic hook (`useOrders.js`).

- **Unified `/wallet` Hub:**
  - Combines available Nestor Wallet balance, tiered top-up bonus packs (+10%, +15%, +30%), and instant credit animations.
  - Integrated **Recent Wallet Transactions Ledger** tracking credits, order redemptions, and bonus credits with real-time updates.

- **Balanced `/profile` Bento Grid Layout:**
  - **Hero Welcome Banner:** Personalized parent welcome, verified badge, child milestone pill, and Nestor Wallet quick link.
  - **Row 1 Bento Grid (7:5 Split):**
    - `ParentDetailsCard`: Eyebrow branding, unwrapable `"Edit Details →"` action (`whitespace-nowrap shrink-0`), structured 2-column contact grid (`whitespace-nowrap` on phone numbers), and full-width email with inline form validation.
    - `ChildProfileCard`: Soft mint card (`bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6`) with zero dead space across 3 milestone tiles (`Child Name`, `Age Milestone`, `Nutrition Focus`) and inline editing.
    - `AccountPreferencesCard`: Full-height card with accessible switch toggles (`role="switch"`, `aria-checked`, forest green active state) for WhatsApp alerts, weekly pediatric nutrition digests, and birthday cash, plus dedicated support contact.
  - **Row 2 Action Cards:** 3 equal-height cards for restock reordering, order tracking & support, and referral sharing (`Refer Now →`).

- **Production-Grade E-Commerce Flow:**
  - Complete 4-step checkout flow (Shopping Bag → Address Selection → Razorpay/COD Payment → Order Confirmation).
  - Centralized pricing calculations with GST, tiered quantity discounts, coupon validation, and wallet balance deductions.
  - Safe `localStorage` hydration preventing SSR/private browsing corruption.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework & Build** | React 19, Vite 8, React Router v7 |
| **Styling & UI** | Tailwind CSS v4, Lucide React Icons |
| **State Management** | Zustand 5 with safe local storage persistence |
| **Networking** | Axios HTTP client (`apiClient`) with domain service wrappers |
| **Testing** | Vitest 5, React Testing Library, jsdom, Playwright (E2E) |
| **Code Quality** | Oxlint, ESLint |

---

## Application Routes

| Path | Component | Description | Access |
|---|---|---|---|
| `/` | `Home` | Hero, product carousel, doctor trust badges, testimonials | Public |
| `/shop/all` | `ShopAll` | Full product catalog with filter sidebar and sorting | Public |
| `/shop/:category` | `ShopAll` | Category-filtered catalog (Powders, Gummies, Combos) | Public |
| `/product/:slug` | `ProductDetail` | Nutrition facts, batch test reports, reviews, add-to-bag | Public |
| `/cart` | `Cart` | Dedicated shopping bag with item quantities and pricing recap | Public |
| `/checkout` | `AddressStep` | Step 1: Delivery address selection & address drawer | Protected |
| `/checkout/payment` | `PaymentStep` | Step 2: Payment method (Razorpay UPI/Cards/Netbanking & COD) | Protected |
| `/checkout/success` | `OrderSuccessStep` | Step 3: Order confirmation and estimated delivery recap | Protected |
| `/orders` | `Orders` | Dedicated order tracking, order details modal & reorder | Protected |
| `/profile` | `Profile` | Bento Grid parent details, child profile & preferences | Protected |
| `/wallet` | `WalletRecharge` | Unified wallet hub, bonus recharge packs & ledger | Protected |
| `/wishlist` | `Wishlist` | Saved favorite products with quick move-to-bag | Protected |
| `/honest-report` | `HonestReport` | Batch safety test certificates and pediatrician verification | Public |
| `/login` / `/signup`| `Login` | Mobile OTP authentication with quick demo access | Public |
| `/aboutus`, `/faq`, `/contact`, `/returns`, `/terms`, `/privacy` | Static Pages | Brand story, customer support, and legal policies | Public |

---

## Getting Started

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

### Installation
```bash
git clone https://github.com/iAmitVishwakarma/ourlittlejoys.git
cd ourlittlejoys
npm install
```

### Local Development
```bash
# Copy example environment configuration
cp .env.example .env

# Start local development server
npm run dev
```

The application runs at `http://localhost:5173`. By default, `VITE_USE_MOCK=true`, meaning the frontend runs fully offline with interactive mock data and local storage state.

---

## Environment Variables

Configure these in `.env`:

| Variable | Type | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | string | `http://localhost:5000/api/v1` | Root URL for the production REST API |
| `VITE_USE_MOCK` | boolean | `true` | Toggle mock service mode (`true` for standalone frontend review, `false` for real backend integration) |
| `VITE_API_TIMEOUT` | number | `10000` | HTTP request timeout in milliseconds |
| `VITE_RAZORPAY_KEY_ID` | string | `rzp_test_...` | Razorpay public key ID for checkout payment modal |
| `VITE_ENVIRONMENT` | string | `development` | Environment label (`development`, `staging`, `production`) |

---

## Backend Integration & API Layer

All API communication is organized into domain services backed by `src/services/apiClient.js`:

```
src/services/
├── apiClient.js        # Centralized Axios client with JWT interceptor & normalized envelopes
├── authService.js      # Sign-in, sign-up, phone OTP, and session management
├── productService.js   # Product catalog, categories, slug queries, cross-sell, and reviews
├── cartService.js      # Bag operations, item quantities, sync, and coupon validation
├── addressService.js   # Delivery addresses (CRUD) scoped to user
├── orderService.js     # Checkout order creation, gateway payment verification, and order history
├── paymentService.js   # Razorpay SDK loader, order initialization, and signature validation
├── reportService.js    # Batch lab test reports lookup and verification
└── index.js            # Barrel export
```

For the complete API contract detailing endpoints, headers, payloads, and response shapes, refer to [API_CONTRACT.md](./API_CONTRACT.md).

---

## Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Start local Vite development server with HMR |
| `npm run build` | `vite build` | Create optimized production bundle in `dist/` |
| `npm run preview` | `vite preview` | Locally preview production build |
| `npm run lint` | `oxlint` | Run ultra-fast linter checks |
| `npm run test` | `vitest run` | Run full unit and integration test suite (255 tests) |
| `npm run test:watch` | `vitest` | Run Vitest in interactive watch mode |
| `npm run test:coverage`| `vitest run --coverage` | Generate test coverage report |
| `npm run test:e2e` | `playwright test` | Run Playwright end-to-end tests |

---

## Project Structure

```
ourlittlejoys/
├── public/                 # Static assets (favicons, branding logos)
├── src/
│   ├── assets/             # Images and local binary assets
│   ├── components/         # Reusable UI components
│   │   ├── checkout/       # Checkout stepper, summaries, address forms
│   │   ├── common/         # Buttons, badges, error boundary, SEO, skeletons
│   │   ├── graphics/       # Brand vectors, doodles, trust badges
│   │   ├── layout/         # Navbar, announcement bar, mobile bottom nav, footer
│   │   ├── modals/         # Authentication, search, quick-view, order details modals
│   │   └── product/        # Product card, filter bar, price displays, visuals
│   ├── constants/          # Routes, categories, and business constants
│   ├── data/               # Seed catalog, batch reports, and testimonials
│   ├── hooks/              # Custom React hooks (useOrders, useProfile, useProductDetail)
│   ├── pages/              # Routed view components
│   │   ├── checkout/       # AddressStep, PaymentStep, and OrderSuccessStep
│   │   ├── profile/        # Bento grid subcomponents (Parent, Child, Preferences, Action cards)
│   │   ├── Orders.jsx      # Standalone Orders & Tracking Dashboard
│   │   ├── Profile.jsx     # Bento Grid Parent Account & Preferences
│   │   ├── WalletRecharge.jsx # Unified Wallet Hub & Transaction Ledger
│   │   └── ...             # ShopAll, ProductDetail, Cart, Wishlist, Static pages
│   ├── routes/             # AppRoutes configuration with ProtectedRoute wrappers
│   ├── services/           # Domain API services & apiClient
│   ├── stores/             # Zustand global state stores (auth, cart, checkout, wishlist)
│   ├── utils/              # Formatting, pricing math, safe storage, session reset
│   ├── App.jsx             # Shell wrapper with ErrorBoundary & Toast provider
│   └── main.jsx            # React root mount
├── API_CONTRACT.md         # Exhaustive REST API contract for backend developers
├── .env.example            # Sample environment variables
├── vite.config.js          # Vite build and manual chunking configuration
└── vitest.config.js        # Vitest test runner configuration
```

---

## License

Private and proprietary. All rights reserved by Nestor / Our Little Joys.
