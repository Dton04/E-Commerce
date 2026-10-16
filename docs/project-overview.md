# E-commerce, Affiliate, and AI Recommendation Platform

## Vision and Users

Build a demoable marketplace and backend-focused NestJS portfolio that supports customer purchases, seller catalog management, affiliate referrals/accounting, and product recommendations. Roles: Customer, Seller, Affiliate, Admin. MVP first; optional AI and analytics follow.

## Requirements

### Must (MVP)

- Authentication and server-side RBAC; UI hiding is not authorization.
- Authorized catalog CRUD for products, categories, images, SKUs/variants; validation.
- Search/filter/sort/bounded pagination; PostgreSQL full-text search for MVP.
- Persistent user cart; server validates current prices.
- Transactional checkout with order items and price snapshots.
- Inventory handling prevents concurrent overselling.
- Sandbox payments and idempotent webhooks; never store card data.
- Valid order lifecycle, cancellation/refund handling, status history.
- Affiliate application/admin approval, referral link and click tracking.
- Last-click attribution with a seven-day window for the demo.
- Immutable commission ledger for pending/approved/paid/reversed; prevent duplicate payment.
- Baseline recommendations from category/tags/popularity with new-user fallback.
- Swagger, structured logs, /health, validation, sensitive-route rate limits, admin audit log.
- Docker, CI for lint/test/build, deployment/rollback notes, repeatable demo.

### Should

Personalized event recommendations with consent/retention; FAQ/product RAG chatbot that says when uncertain and cannot mutate orders/payments; simulated payout requests/admin reconciliation (no real transfer); funnel analytics with defined events/timezone/range; basic metrics (Prometheus/Grafana proposed).

### Stretch

Advanced recommendations, A/B testing, multi-tenancy, advanced analytics.

## Acceptance and Quality

Use the product owner's requirement IDs/acceptance criteria as detailed authority. Core demo must verify server-side denied access, server-authoritative prices, transactional checkout, no inventory oversell under concurrency, idempotent payment webhooks, valid order history, correct last-click/7-day commission and reversal, recommendation fallback, critical-flow tests, migrations, API docs, logs, and demo procedure.

Use a modular monolith; do not start with microservices. Benchmark representative workloads before performance claims. Planning assumptions: one person 12–16 weeks; two people 10 weeks (estimates only).

## Current Maturity

Verified: NestJS starter endpoint, Prisma service, PostgreSQL schema and initial migration. Schema declares marketplace/payment/affiliate/behavior data structures, but does not prove flows exist. Auth/RBAC, business APIs, frontend, payment integration, recommendations/chatbot, CI, and deployment are not verified. Existing tests are starter tests.

## Open Decisions

Define global/shop role semantics; inventory reservation/release; commission eligibility/approval/reversal; affiliate duplicate-click/bot policy; behavior-event consent/retention/timezone; payment sandbox and object-storage providers.
