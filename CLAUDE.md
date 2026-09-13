# Little Joys Clone - AI Context

## Project Overview
Modern e-commerce platform for baby/kids health & nutrition products inspired by [ourlittlejoys.com](https://ourlittlejoys.com/), built with React, Vite, and Tailwind CSS v4 with a focus on performance, rich user experience, safety transparency (Honest Reports), and clean architecture.

## Tech Stack
- **Frontend Framework**: React 19 with Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom brand tokens & glassmorphism in `src/index.css`
- **Routing**: React Router DOM (`/`, `/shop/all`, `/honest-report`, `/checkout-v2`, `/product/:slug`, `/aboutus`, `/wallet-recharge`)
- **State Management**: React Context (`AuthContext`, Cart state) + LocalStorage persistence
- **Icons**: Lucide React
- **Services & APIs**: Modular mock & REST-ready services (`paymentService.js`, `api.js`)
- **Backend Mocking**: `json-server` ready with `db.json`
- **Linter**: Oxlint / ESLint

## Implemented Pages & Features
- [x] **Home Page (`/`)**: Hero banner, category icon strip, Top-Selling Favourites with dynamic filters, Free Health Assessment banner, Honest Reports lab certification badges, authentic parent testimonials, and FAQ accordion.
- [x] **Shop All (`/shop/all`)**: Category filtering (Nutrimix, Gummies, Spreads & Sauce, Cereals & Snacks, Protein, For Moms, Best Value), search query filtering, sorting (Featured, Price Low-High, High-Low, Rating), and responsive grid.
- [x] **Honest Reports (`/honest-report`)**: Batch test certificate search, safety guarantees (No heavy metals, no added refined sugar, no preservatives, 100% natural), doctor endorsement signatures, and downloadable lab reports.
- [x] **Checkout V2 (`/checkout-v2`)**: Delivery pin-code check with expected delivery dates, First Order free gift alert, cart item quantity controls, "Parents Also Purchase" cross-sell carousel, coupon engine (`JOY30`, `FIRST100`, `LJWALLET`), bill summary, and realistic simulated Payment Gateway modal (UPI, Cards, NetBanking, COD, LJ Wallet).
- [x] **Product Detail (`/product/:slug`)**: High-res packaging visual, age-bracket badge, pack size options, nutritional values, benefits breakdown, doctor verification, and customer ratings.
- [x] **About Us (`/aboutus`)**: Founding mission, paediatric doctor advisory board, safety & clean-label commitment.
- [x] **Wallet Recharge (`/wallet-recharge`)**: LJ Wallet recharge packs (Save up to 30%), instant cashback calculations, and transaction history.
- [x] **Auth & Cart Modals**: Mobile/Email OTP login simulation with user profile drawer and fly-out slide-over cart drawer.

### Folder Structure
```
d:/ourlittlejoys/
├── ARCHITECTURE.md        # Technical architecture & data flows
├── CLAUDE.md              # AI instructions and context
├── RULES.md               # AI coding rules
├── SCHEMA.md              # Data schemas
├── README.md              # Project overview
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration with @ path alias
├── jsconfig.json          # IDE path mapping configuration
├── .env.example           # Environment variables template
├── db.json                # Mock data for json-server
├── docs/                  # Detailed architecture & AI setup guides
│   └── AI_DEVELOPMENT_SETUP.md
├── public/                # Static assets & icons
└── src/                   # Source code
    ├── assets/            # Static brand assets
    ├── components/        # Reusable domain-categorized UI components
    │   ├── layout/        # Navbar, Footer, MobileBottomNav, CheckoutFooter
    │   ├── common/        # SEO, ResponsiveImage, ScallopDivider, TestimonialCard
    │   ├── modals/        # AuthModal, CartDrawer, UserAccountDrawer, AddressDrawer
    │   ├── product/       # ProductCard, ProductVisual
    │   ├── checkout/      # CheckoutStepper, CheckoutOrderSummary, BrandPaymentSection
    │   ├── graphics/      # KidsDoodles, CategorySVGs, PaymentLogos, PediatricDoctorIllustration
    │   └── index.js       # Master component barrel export
    ├── constants/         # Route definitions and global constants
    ├── data/              # Product listings & lab test reports
    ├── pages/             # Route pages
    │   ├── Home.jsx           # Landing page
    │   ├── ShopAll.jsx        # Product catalog with filters
    │   ├── HonestReport.jsx   # Lab tests and certifications
    │   ├── ProductDetail.jsx  # Individual product view
    │   ├── Cart.jsx           # Dedicated shopping bag
    │   ├── Profile.jsx        # Parent account & orders dashboard
    │   ├── AboutUs.jsx        # Story & paediatric advisory board
    │   ├── WalletRecharge.jsx # LJ Wallet credit packs
    │   ├── StaticPages.jsx    # FAQ, Contact, Policy views
    │   └── checkout/          # Multi-step checkout flow (Address, Payment, Success)
    ├── services/          # API & payment gateway integration layers
    ├── stores/            # Zustand global state (auth, cart, checkout, wishlist)
    ├── utils/             # Helper utilities (formatters, calculations)
    ├── App.jsx            # Router and layout setup with code-splitting
    ├── main.jsx           # Application entry point
    └── index.css          # Tailwind CSS v4 & custom design tokens
```

## Coding Conventions
- Use functional components with modern React hooks (no class components).
- Use path alias `@/*` for imports from `src/*`.
- Keep component code clean, modular, and well-commented with backend integration notes.
- Use Tailwind CSS utility classes and design tokens defined in `src/index.css`.
- Ensure responsive design for mobile (360px+), tablet (768px+), and desktop (1024px+).
- Use authentic high-fidelity imagery with `ResponsiveImage.jsx` and vector packaging in `ProductVisual.jsx`.

## API Service Layer Pattern
All external and backend communication should go through service files in `src/services/`:
- `src/services/api.js`: Base HTTP client instance with token headers and response handlers.
- `src/services/apiClient.js`: Core fetch wrapper with standard envelope response `{ success, data, message }`.
- `src/services/paymentService.js`: Payment gateway integrations (Razorpay, Paytm, Cashfree, UPI deep-links).

## State Management Patterns
- **Global State**: Managed with Zustand stores in `src/stores/`:
  - `authStore.js`: Session authentication, user profile, login/logout, wallet balance.
  - `cartStore.js`: Cart items, quantity modifiers, coupon code engine, derived totals.
  - `checkoutStore.js`: Multi-step checkout address selection, payment option, order placement.
  - `wishlistStore.js`: Saved favorite items with localStorage synchronization.
- **Server State**: Configured for TanStack Query / REST API endpoints against `db.json` or live Node/Django backend.
