# Next.js Best Practices & Architecture Standards

**Version 1.0.0** — Next.js 16 (App Router) + React 19 + Tailwind CSS + TypeScript

---

## 1. Project Organization & Directory Structure

Organize the `client/` project by clear architectural concerns, separating routing (`app/`), presentation (`components/`), core business logic (`lib/`, `services/`), data/fixtures (`data/`), and TypeScript models (`types/`).

```text
client/
├── app/                              # Next.js App Router (Routes, Layouts, Metadata, Loading, Error)
│   ├── layout.tsx                    # Root Layout (Fonts, Global Header/Footer, HTML/Body)
│   ├── page.tsx                      # Storefront Homepage
│   ├── globals.css                   # Global Tailwind CSS tokens
│   └── (storefront)/                 # Route Groups for distinct sections (storefront, auth, account, etc.)
├── public/                           # Static public assets (images, icons, SVGs)
│   └── figma/                        # Brand & campaign assets extracted from designs
├── src/
│   ├── components/                   # Modular UI components
│   │   ├── layout/                   # Global shell components (Header, Footer, Navigation, Sidebar)
│   │   ├── common/                   # Reusable atom/molecule primitives (Buttons, Inputs, Modals, Badges)
│   │   └── storefront/               # Domain-specific components for the Storefront experience
│   │       ├── CampaignBanner.tsx
│   │       ├── ServiceCommitments.tsx
│   │       ├── ProductCard.tsx
│   │       ├── ProductSection.tsx
│   │       ├── CategoryGrid.tsx
│   │       └── ConfidenceCta.tsx
│   ├── data/                         # Static mock data, navigation menus, constants
│   │   └── mock-products.ts
│   ├── hooks/                        # Custom React hooks (useCart, useDebounce, useMediaQuery)
│   ├── lib/                          # Utility functions and API clients
│   │   └── api.ts                    # Backend API client & price formatters
│   └── types/                        # TypeScript type definitions and DTO contracts
│       └── index.ts
└── next.config.ts                    # Next.js compiler & caching configuration
```

---

## 2. Server Components vs. Client Components

- **Server-First by Default:** All components in `app/` and `src/components/` are React Server Components (RSC) by default. Do NOT add `'use client'` unless the component strictly requires:
  - React interactive state (`useState`, `useReducer`).
  - Lifecycle effects (`useEffect`, `useLayoutEffect`).
  - Browser-only APIs (`window`, `localStorage`, `navigator`).
  - Event listeners (`onClick`, `onChange`, `onSubmit`).
- **Push Client Boundaries to the Leaves:** Keep parent sections, layouts, and data fetchers as Server Components; wrap only the interactive widgets (e.g. search input, drawer button, cart toggle) in leaf client components.
- **Header & Footer Placement:** Global `Header` and `Footer` belong in `app/layout.tsx` so they persist across route transitions without unnecessary re-mounting.

---

## 3. Cache Components & Partial Prerendering (PPR)

Following the rules in `.agents/skills/next-cache-components-adoption` and `.agents/skills/next-partial-prefetching-adoption`:
- **`cacheComponents: true` Compatibility:**
  - Avoid reading dynamic request data (`cookies()`, `headers()`, dynamic `searchParams`) outside `<Suspense>` boundaries.
  - Wrap any dynamic or streaming data components in `<Suspense fallback={<Skeleton />}>` to ensure the route shell remains fully prerenderable and instant.
  - Do NOT export deprecated config options like `export const dynamic = ...` or `revalidate = ...`.
- **Image Optimization:** Always use `next/image` with proper `sizes` and aspect ratio styling (`relative aspect-square`) to prevent Cumulative Layout Shift (CLS).

---

## 4. Coding Standards

- **TypeScript Strictness:** Strict typing on all component props; no `any` types. Export dedicated interfaces from `types/` or co-locate with data modules.
- **Styling with Tailwind CSS:** Prefer semantic HTML tags (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`) with utility classes.
- **Import Alias:** Always use the `@/` alias mapped in `tsconfig.json` (e.g., `@/src/components/...`, `@/src/lib/...`) to avoid messy relative paths (`../../../`).

