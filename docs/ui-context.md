# UI Context

## Status

`client/` (Next.js 16.4.2, React 19, Tailwind CSS v4, Lucide Icons):
- **Storefront Home (`app/page.tsx`):** Implemented with `Header`, `HeroBanner`, `ValueProps`, `CategorySection`, `FeaturedProducts` (with live NestJS API connection, sorting, tab filters, pagination, loading skeletons, empty/error states), `AffiliateCtaSection`, and `Footer`.
- Verified production build via `npm run build` with Turbopack and Partial Prerendering.

## Confirmed Target

The frontend is implemented using Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and Lucide React. API calls connect to NestJS Modular Monolith backend on port 3001 (`/api/v1`).

## Design Decisions

No theme, colors, typography, spacing, navigation, page structure, or design references have been approved. Do not invent these as established design tokens. When UI work begins, record approved choices and cite source files/design references; mark unresolved decisions explicitly.

## Requirements When Implemented

- Responsive customer, seller, affiliate, and admin flows.
- Accessible forms, labels, keyboard support, visible focus states.
- Loading, empty, error, and success states for data-driven views.
- Client-side hiding does not replace server-side authorization.
- Client validation supports usability; backend validation is authoritative.
- Add component conventions/tokens only after selected and present in code.


## Screen Inventory

The product owner supplied the following target screens and behaviors. These are product/UI requirements, not implemented pages.

| Area | Screen | Main content and actions | States | Interaction notes |
| --- | --- | --- | --- | --- |
| Storefront | Home | Header/search, category navigation, hero, trending products, recommendations, footer | Loading, empty recommendations, error | Keep the primary CTA visible; avoid excessive banners. |
| Storefront | Product listing | Breadcrumbs, filters, sorting, product grid, pagination | Loading, no results, active filter chips | 3–4 columns on desktop; 2 on mobile. |
| Storefront | Product detail | Image gallery, price, variant selector, stock, quantity, add to cart, reviews | Out of stock, invalid variant, success toast | A sticky purchase panel may be used on desktop if helpful. |
| Storefront | Cart | Line items, quantity controls, subtotal, coupon, checkout CTA | Empty cart, stock changed, invalid coupon | Recalculate prices on the server. |
| Storefront | Checkout | Address, delivery option, order summary, payment option | Submitting, payment pending, failure | One clear primary CTA; prevent duplicate submission. |
| Storefront | Orders | Status timeline, order items, payment/refund details | Pending, paid, cancelled, refunded | Show timestamps and the next action. |
| Affiliate | Overview | KPI cards, date filter, clicks/conversions chart, top products | No data, pending approval | Separate pending earnings from approved earnings. |
| Affiliate | Links | Product search, campaign name, generated link, copy action | Copied, expired/invalid campaign | Show an explicit attribution disclosure. |
| Affiliate | Commissions | Ledger table, status, order reference, date filters | Pending, approved, reversed, paid | Show calculation basis and reason. |
| Admin | Overview | Sales/orders/users/commission KPIs, trends, alerts | No data, permission denied | Define each metric; avoid vanity metrics. |
| Admin | Catalog | Data table, search, filters, create/edit drawer | Validation errors, upload progress | Use consistent table actions. |
| Admin | Orders | Status filters, detail panel, audit timeline | Payment pending, refund, conflict | Confirm destructive actions. |
| Admin | Affiliate review | Applicant table, profile detail, approve/reject with reason | Pending, approved, rejected | Record the admin action. |
| AI | Chat widget | Conversation, suggested questions, citations/product cards | Typing, timeout, unknown answer | State limits; do not imply an AI action completed an operation. |
| AI | Recommendations | Products with a reason label, such as similar category or trending for you | Cold start, unavailable products | Log impressions/clicks for evaluation. |
| System | Observability | Latency/error charts, queue depth, failed jobs, health | Alert state, missing data | Restrict to internal admin users. |

## Cross-screen Behavior

- Recalculate product prices and enforce permissions on the backend; UI state is not authoritative.
- Provide loading, empty, error, and success feedback appropriate to each screen.
- Keep keyboard access, visible focus, labels, and responsive layouts in scope when these screens are implemented.
- Protect admin and observability screens with server-side authorization.
- Do not show chatbot responses as completed order/payment actions; the chatbot is informational and cannot mutate those records.
- For charts and KPI cards, define metric meaning, date range, and timezone before implementation.

