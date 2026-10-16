# Architecture Context

## Evidence Labels

**Verified current state** is repository evidence. **Confirmed target** is a requirement, not necessarily implemented. **Proposal** requires adoption.

## Verified Stack

| Area | Evidence |
| --- | --- |
| Backend | NestJS 11, TypeScript 5.7, Express adapter (manifest ranges) |
| Persistence | Prisma 7, PostgreSQL, pg, @prisma/adapter-pg |
| Database config | PostgreSQL 16 Alpine in server/docker-compose.yml; DATABASE_URL in server/.env.example and prisma.config.ts |
| Tooling | Jest, ts-jest, Supertest, ESLint, Prettier |
| Frontend | client/ is empty; no framework configured |
| Missing infrastructure | No Redis/BullMQ, Nginx, GitHub Actions, Swagger, health endpoint, or deployment config found |

Use server/package.json and package-lock.json as version sources.

## Confirmed Target

Next.js + TypeScript + Tailwind + shadcn/ui; NestJS + Prisma + PostgreSQL; Redis + BullMQ, Docker Compose, GitHub Actions, Nginx, VPS. Modular monolith; MVP first.

## Current Structure and Contracts

- server/src/main.ts starts NestFactory, sets global prefix `api/v1`, enables CORS, enforces global ValidationPipe, and hosts Swagger UI at `/api/docs`.
- server/src/app.module.ts composes AppController/AppService, PrismaModule, AuthModule, CategoriesModule, ProductsModule, and global JwtAuthGuard.
- server/src/prisma/prisma.module.ts exports global PrismaService; service builds a pg Pool from DATABASE_URL, wraps with PrismaPg, and connects on module init.
- server/src/modules/auth implements AuthModule (AuthController, AuthService, JwtStrategy, RegisterDto, LoginDto, RefreshTokenDto). Supports register, login, refresh rotation (SHA-256 hash + jti nonce), logout, and server-side RBAC (@Roles, RolesGuard).
- server/src/modules/categories implements CategoriesModule (CategoriesController, CategoriesService, DTOs). Public browsing of hierarchical categories; ADMIN-only creation, updating, and safe deletion.
- server/src/modules/products implements ProductsModule (ProductsController, ProductsService, DTOs). Public search & filtering with bounded pagination (`limit <= 50`); SELLER/ADMIN atomic creation with multi-variant SKUs, shop access validation, and soft deactivation.
- server/prisma/schema.prisma and server/prisma/migrations/20261014102002_init/migration.sql define persistence.
- Verified APIs:
  - Auth: POST /api/v1/auth/register, POST /api/v1/auth/login, POST /api/v1/auth/refresh, POST /api/v1/auth/logout, GET /api/v1/auth/me, GET /api/v1/auth/admin-test. (10/10 e2e tests passed)
  - Categories: GET /api/v1/categories, GET /api/v1/categories/:idOrSlug, POST /api/v1/categories, PATCH /api/v1/categories/:id, DELETE /api/v1/categories/:id.
  - Products: GET /api/v1/products, GET /api/v1/products/:idOrSlug, POST /api/v1/products, PATCH /api/v1/products/:id, DELETE /api/v1/products/:id, POST /api/v1/products/:id/skus, PATCH /api/v1/products/skus/:skuId, DELETE /api/v1/products/skus/:skuId. (23/23 e2e tests passed)

## Declared Data Model

Schema declares users/role assignments, shops/memberships, categories/products/SKUs/carts, orders/shop orders/item snapshots/payment transactions/status history, affiliate profiles/clicks/commissions/wallet transactions/payout requests, and behavior logs. It defines relations, indexes and constraints; these declarations are not implemented business flows. Notable uniqueness: email, referral/order/SKU codes, one cart per user, one shop order per order/shop, one commission per order, payment/wallet idempotency keys.

## Target Boundaries and Flows

**Proposal:** one NestJS deployable, with modules for Identity, Catalog, Cart, Orders/Inventory, Payments, Affiliate, Recommendations, Analytics, Operations. This module structure does not yet exist.

Target checkout revalidates prices, writes order snapshots transactionally, and applies agreed inventory policy. Verified/idempotent payment callbacks update payment/order state. Affiliate attribution uses last-click/seven days; immutable ledger captures commission and reversal. Recommendation baseline uses category/tags/popularity with fallback; later personalization uses consented events. FAQ/product chatbot retrieves approved content and cannot mutate orders/payments. Object storage provider and queue/retry policy are undecided. These flows are requirements, not current integrations.

## Security and Operational Decisions

Auth/RBAC are required but absent. Define global roles alongside shop-scoped membership before implementing guards. Server authorization is authoritative. Swagger, validation, rate limiting, structured logs, health checks, audit logs, stable API errors are requirements not current capabilities.

Confirmed: PostgreSQL/Prisma, modular-monolith target, last-click/7-day demo attribution, sandbox-only payment, simulated payout. Unresolved: role semantics, inventory policy, provider choices, commission policy, queue retry, API versioning/error envelope. Never log secrets or unnecessary personal data; measure real workload before performance claims.
