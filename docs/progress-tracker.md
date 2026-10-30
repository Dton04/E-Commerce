# Progress Tracker

Keep this as a short status snapshot. Product requirements live in project-overview.md; architecture and evidence live in architecture.md.

## Current Phase

Backend foundation and initial data model. This describes inspected repository state, not feature completion.

## Work Items

Statuses: Todo, In Progress, Blocked, Done. Done requires verified acceptance evidence.

| ID | Work | Status | Acceptance evidence / dependency |
| --- | --- | --- | --- |
| BASE-01 | NestJS + PostgreSQL/Prisma foundation | Done | Schema, Prisma 7 adapter-pg service, initial migration applied to PostgreSQL; npm run build passed; Nest bootstrap verified. |
| AUTH-01/02 | Authentication and server RBAC | Done | Register, login, refresh rotation (SHA-256 hash + jti), logout; global JwtAuthGuard, RolesGuard; 10/10 e2e tests passed in test/auth.e2e-spec.ts; build verified. |
| CAT-01/02 | Catalog/media/search/pagination | Done | Categories hierarchy & admin CRUD, Product + atomic SKU creation, bounded pagination (max 50 limit), keyword & price range filtering, shop membership authorization, soft SKU deactivation, index [status, createdAt], UploadModule (Multer single/multi image upload, static serving, gallery append/remove); 35/35 e2e tests passed in test/catalog.e2e-spec.ts; regression verified with 10/10 in test/auth.e2e-spec.ts (45/45 passing e2e tests, 51 total tests); build verified. |
| CART-01/ORD-01 | Persistent cart and transactional checkout | Todo | Server-authoritative prices and order snapshots verified; depends on stock policy. |
| INV-01 | Safe stock handling | Todo | Concurrency test proves no oversell; define reserve/release policy. |
| PAY-01/ORD-02 | Sandbox payment, webhook, order lifecycle | Todo | Signature/idempotency tests and valid transitions/history; choose provider/policies. |
| AFF-01–05 | Approval, click tracking, attribution, ledger, simulated payout | Todo | Last-click/7-day, immutable reversal, no duplicate payout; define remaining policies. |
| AI-01 | Recommendation baseline | Todo | New-user fallback and catalog-signal results verified. |
| OPS-01/02 | Swagger/logs/health, CI, deploy/rollback | Todo | CI checks and repeatable demo/deploy procedure verified. |
| AI-02/03, ANA-01, OPS-03 | Personalization, chatbot, analytics, metrics | Todo | Consent/retention and operational acceptance agreed and tested. |

## Verified Repository Artifacts

NestJS modular monolith; Prisma 7 with PostgreSQL adapter; schema & migrations; Auth & RBAC module (/api/v1/auth) with refresh rotation; Catalog module (/api/v1/categories, /api/v1/products) with multi-variant SKUs, bounded search/pagination and composite indexes (status + createdAt); UploadModule (/api/v1/upload, static file serving at /uploads/); Swagger docs at /api/docs; NestJS best practices skills; 45 passing e2e tests; Next.js 16 Storefront Homepage (Header, HeroBanner, CategorySection, FeaturedProducts with live API integration & pagination, ValueProps, Affiliate CTA, Footer) with verified Turbopack production build.

## Gaps

Cart, Checkout/Order processing, Inventory safe concurrency, Payment integration, Affiliate attribution engine, AI recommendations, and remaining frontend pages (Product detail, Cart, Checkout, Merchant/Affiliate portals) remain to be implemented.

## Confirmed Decisions

MVP first; modular monolith; product-owner requirement IDs/criteria define scope; last-click attribution with seven-day demo window; sandbox payment; simulated payout; benchmark before performance claims.

## Next Task

Implement CART-01/ORD-01 (Persistent Cart and Transactional Checkout) with server-authoritative pricing, cart item management, and order snapshot generation.
