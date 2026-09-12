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

## Folder Structure
```
d:/ourlittlejoys/
├── CLAUDE.md              # AI instructions and context
├── ARCHITECTURE.md        # Technical architecture
├── RULES.md               # AI coding rules
├── SCHEMA.md              # Data schemas
├── README.md              # Project documentation
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── .env.example           # Environment variables template
├── db.json                # Mock data for json-server
│
├── public/                # Static assets & icons
└── src/                   # Source code
    ├── components/        # Reusable UI components
    │   ├── Navbar.jsx         # Sticky header with categories & search
    │   ├── Footer.jsx         # Brand footer with safety guarantees
    │   ├── ProductCard.jsx    # Standard e-commerce product card
    │   ├── ProductVisual.jsx  # SVG vector packaging graphics for products
    │   ├── CartDrawer.jsx     # Slide-over cart overlay
    │   ├── AuthModal.jsx      # Mobile/email login with OTP verification
    │   ├── UserAccountDrawer.jsx # Profile, orders, and wallet drawer
    │   └── TestimonialCard.jsx# Parent reviews component
    ├── pages/             # Route pages
    │   ├── Home.jsx           # Landing page
    │   ├── ShopAll.jsx        # Product catalog
    │   ├── HonestReport.jsx   # Lab tests and honest certifications
    │   ├── CheckoutV2.jsx     # Step-by-step cart & checkout
    │   ├── ProductDetail.jsx  # Individual product page
    │   ├── AboutUs.jsx        # Story & paediatric advisory board
    │   └── WalletRecharge.jsx # LJ Wallet credit packs
    ├── context/           # React context providers
    │   └── AuthContext.jsx    # User authentication & profile state
    ├── data/              # Static data & product listings
    │   └── products.js        # Detailed product database with nutritional info
    ├── services/          # API & integration layers
    │   └── paymentService.js  # Payment gateway simulator (Razorpay/UPI)
    ├── App.jsx            # Router and layout setup
    ├── main.jsx           # Application entry point
    └── index.css          # Tailwind CSS v4 & custom design tokens
```

## Coding Conventions
- Use functional components with modern React hooks (no class components).
- Keep component code clean, modular, and well-commented with backend integration notes.
- Use Tailwind CSS utility classes and design tokens defined in `src/index.css`.
- Ensure responsive design for mobile (360px+), tablet (768px+), and desktop (1024px+).
- Do not use generic placeholder images: use vector illustrations or high-fidelity SVGs (`ProductVisual.jsx`).

## API Service Layer Pattern
All external and backend communication should go through service files in `src/services/`:
- `src/services/api.js`: Base HTTP client instance (fetch / Axios) with token headers and response handlers.
- `src/services/paymentService.js`: Payment gateway integrations (Razorpay, Paytm, Cashfree, UPI deep-links).

## State Management Patterns
- **User Authentication**: Managed via `src/context/AuthContext.jsx` with LocalStorage session persistence.
- **Cart State**: Managed centrally in `App.jsx` and persisted to LocalStorage, passed to `CartDrawer.jsx`, `Navbar.jsx`, and `CheckoutV2.jsx`.
- **Server State**: Configured for TanStack Query / REST API endpoints against `db.json` or live Node/Django backend.
