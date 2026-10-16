# AI Workflow Rules

## Before Work

1. Read relevant docs: project-overview.md for scope, architecture.md for verified state/decisions, code-standards.md for conventions, progress-tracker.md for status.
2. Inspect actual source, schema, tests, configuration, and callers. Docs are not proof of implementation.
3. Separate verified facts, accepted requirements, assumptions, and proposals. Never invent behavior or describe planned work as implemented.
4. For significant changes, give a concise plan, affected areas, and checks. Clarify critical business rules before dependent implementation.

## Scope and Compatibility

- Work on one coherent unit and stay within requested scope.
- Do not silently change architecture, stack, API contracts, or data model. Preserve modular monolith and backward compatibility unless approved.
- Explain dependency need and impact before adding packages.
- Avoid modifying generated/third-party files unless required.

## Security and Data

- Never reveal credentials, tokens, private keys, or secret environment values in output, logs, or docs.
- Preserve local environment files; do not overwrite carelessly.
- Never run destructive commands, production migrations, or alter production data without explicit authorization.
- Validate input and enforce server-side authorization. Do not store card data.
- Do not contact external parties or send data to external services without explicit authorization.

## Implementation and Verification

- Follow repository conventions; keep diffs focused.
- Run relevant checks when possible and inspect output. Report checks not run, failures, and environment blockers.
- Never claim tests/builds/migrations/benchmarks/deployments succeeded without verification.
- Do not add or run tests unless requested or required by task instructions.
- Benchmark representative workloads before performance claims.

## Documentation and Approval

Update context docs only for verified implementation changes or user-approved decisions. Keep each file within its purpose, link authoritative source files, and label proposals/open decisions. Mark tracker items Done only after acceptance criteria are verified.

Stop and request approval before materially ambiguous business behavior, breaking contracts, unapproved architecture/schema changes, destructive or production actions, sensitive-data exposure, external cost/contact, or credential/security-control changes. Explain the specific approval needed; continue independent work where possible.
