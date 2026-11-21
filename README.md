# Our Little Joys — Frontend Application

Production-grade React storefront for Little Joys child nutrition and wellness essentials. Built with React 19, Vite, Tailwind CSS v4, and Zustand.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework & Build** | React 19, Vite 8, React Router v7 |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **State Management** | Zustand 5 with safe local storage persistence |
| **Networking** | Axios HTTP client (`apiClient`) with domain service wrappers |
| **Testing** | Vitest, React Testing Library, Playwright (E2E) |
| **Code Quality** | Oxlint, ESLint |

---

## Getting Started

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

### Installation
```bash
git clone <repo-url> ourlittlejoys
cd ourlittlejoys
npm install
```

### Local Development
```bash
# Copy example environment configuration
cp .env.example .env

# Start development server
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
| `npm run test` | `vitest run` | Run full unit and integration test suite |
| `npm run test:watch` | `vitest` | Run Vitest in interactive watch mode |
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
│   │   ├── layout/         # Navbar, footer, banner ribbons
│   │   ├── modals/         # Authentication, search, quick-view modals
│   │   └── product/        # Product card, filter bar, price displays
│   ├── data/               # Seed catalog, batch reports, and testimonials
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Routed view components
│   │   ├── checkout/       # Address, Payment, and Success checkout steps
│   │   └── profile/        # User profile, addresses, orders, and wallet tabs
│   ├── services/           # Domain API services & apiClient
│   ├── stores/             # Zustand global state stores (auth, cart, checkout, wishlist)
│   ├── utils/              # Formatting, pricing math, safe storage
│   ├── App.jsx             # Shell wrapper with ErrorBoundary & Toast provider
│   └── main.jsx            # React root mount
├── API_CONTRACT.md         # Exhaustive REST API contract for backend developers
├── .env.example            # Sample environment variables
└── vitest.config.js        # Vitest test runner configuration
```
