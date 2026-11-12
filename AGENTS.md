# AGENTS.md

**Continue from [PLAN.md](./PLAN.md).** Milestone 1 (UI surface) is done; the next one is Milestone 2 (database + API).

## Architecture
- Vite + React 19 SPA, React Router v7 (`react-router` package), Tailwind CSS v4 via `@tailwindcss/vite`.
- No template framework was used on purpose: the backend should be a **Netlify Server** (`netlify/server/index.mjs`, e.g. Hono) using Netlify Database (Drizzle, schema in `db/schema.ts`). A full-stack framework catch-all would stop the server receiving requests.
- `netlify.toml` builds to `dist` with an SPA fallback redirect. When adding the server, make sure `/api/*` routes reach it (not the SPA fallback).

## Key directories
- `src/main.tsx` — routes. `/` landing, `/app` shell with `Overview`, `counter`, `kitchen`.
- `src/components/` — `AppShell` (sidebar + mobile nav), `Logo`, `PageHeader`.
- `src/pages/` — one file per screen.
- `src/data/fixtures.ts` — **all** sample data and shared types (`MenuItem`, `Order`, `OrderStatus`) plus money helpers.
- `src/state/store.tsx` — React context holding menu/orders and actions (`placeOrder`, `advance`, `setStatus`). This is the seam to replace with API calls.

## Conventions
- Design tokens live in `src/index.css` `@theme`: paper/ink/tomato/mustard/basil colours; fonts Fraunces (display), Instrument Sans (body), JetBrains Mono (numbers, labels).
- Reusable CSS: `.ticket` (perforated receipt card), `.grain` (paper background), `.rise` entrance animation.
- Currency is ₹ via `formatMoney`; keep prices as integer units.
- Sidebar "Coming next" items (Menu planner, Inventory, Staff & shifts) are placeholders for later milestones.
