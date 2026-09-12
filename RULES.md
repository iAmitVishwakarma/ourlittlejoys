# AI Coding Rules

## Security Rules
- Never hardcode API keys, secrets, or database passwords in code.
- Use environment variables (`import.meta.env.VITE_*`) for all external credentials and backend endpoints.
- Validate all user inputs (PIN codes, phone numbers, quantities, coupon codes) on both client and server side.
- Sanitize user-generated content and review feedback before display.
- Store JWT tokens and session data securely in memory or HTTPS-only cookies when connecting a real backend.

## Code Style Rules
- Use modern React 19 / JSX patterns with standard hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`).
- Prefer functional components over class components.
- Use early returns for clarity and readability.
- Keep components focused and under 300 lines — extract reusable sub-components when necessary.
- Use descriptive variable names (e.g. `discountAmount`, `activeCategory` instead of `d`, `cat`).
- Use Tailwind CSS classes for styling; avoid inline styles where possible.
- Include clear JSDoc comments and integration guide notes for backend endpoints.

## Pattern Rules
- Centralize API and payment logic in `src/services/` rather than spreading `fetch` calls across UI components.
- Use context providers for global cross-cutting state like Authentication and Cart.
- Follow component composition over inheritance.
- Always provide accessible fallback UI states (e.g., empty cart state, loading skeletons, error banners).

## Anti-Patterns to Avoid
- Prop drilling through more than 3 component levels (use Context instead).
- Hardcoding URLs in multiple files (use constants or `.env`).
- Direct DOM manipulation (use React refs and declarative state).
- Broken or generic external placeholder image URLs (use `ProductVisual.jsx` SVG packaging or hosted CDN assets).
- Magic numbers (extract discounts, tax rates, and delivery thresholds to constants).

## Testing Rules
- Ensure `npm run build` passes with zero errors before submitting work.
- Test responsive layouts on mobile (375px), tablet (768px), and desktop (1280px).
- Verify cart operations: Add, increment, decrement, delete, coupon application, and total recalculation.
- Verify checkout steps: Address review, pin code validation, payment method selection, and order success modal.

## Documentation Rules
- Update `CLAUDE.md` whenever new pages or core architecture changes are introduced.
- Document environment variables in `.env.example`.
- Keep `SCHEMA.md` in sync with data models and mock records in `db.json`.
