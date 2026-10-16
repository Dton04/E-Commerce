# Code Standards

**Current** means supported by repository evidence; **Required** comes from accepted scope; **Proposed** is not yet adopted.

## Structure and TypeScript

- Current: Nest source in server/src; Prisma schema/migrations in server/prisma; Jest tests use .spec.ts and e2e-spec.ts.
- Required: modular monolith.
- Proposed: group feature code by Nest module; PascalCase classes, camelCase members, descriptive kebab-case filenames; controllers handle HTTP mapping, services/providers own business rules.
- Current TypeScript has strictNullChecks enabled, noImplicitAny disabled; ESLint permits explicit any. Do not claim full strictness. For new code, prefer explicit types and treat external data as unknown until validated.
- Follow server ESLint/Prettier config. Run commands from server/. lint uses --fix and may modify files; inspect diff afterward.

## HTTP, Validation, Errors

- Required: validate external input and enforce auth on server; document stable API behavior.
- Proposed: DTO classes and global ValidationPipe after confirming contract and adding needed dependencies transparently.
- Map domain errors to appropriate Nest exceptions; never expose stack traces, SQL details, secrets, or provider internals.
- Swagger is required target but not currently configured.

## Security and Authorization

Check identity, global role, shop membership, ownership on each protected operation. Hiding UI controls is not authorization. Hash passwords; protect refresh tokens; never log credentials. Verify webhook signatures and make processing idempotent. Never store card data. Rate-limit sensitive endpoints and audit important admin actions. Minimize affiliate/behavior data; define consent/retention. Do not commit secrets or overwrite local env files carelessly.

## Prisma and Money

Use PrismaService; use transactions for multi-record invariant-preserving operations. Use conditional updates/approved locking to prevent overselling; test concurrency. Use decimal-safe money arithmetic, not binary floats. Keep order details as historical snapshots and commission ledger immutable; represent reversal without erasing history. Use idempotency keys and handle unique conflicts. Change schema through reviewed migrations; inspect FK/delete rules before edits. Never run production migrations or alter production data without authorization.

## Logging and Tests

Structured logs, health checks, audit logs, and no secret logging are required targets. Proposed: correlation IDs and minimal event context. Existing tests are Nest starter tests. Critical target coverage: denied authorization, webhook idempotency, inventory concurrency, order transitions, affiliate attribution/ledger/reversal, recommendation fallback. Use isolated test data, never production. A task is Done only after acceptance evidence is verified.

## Commands

From server/: npm run build; npm test -- --runInBand; npm run test:e2e -- --runInBand; npm run lint. These checks were not run during this documentation update.
