# Ladle — canteen management

Ladle runs a canteen from one screen: take orders at the counter, move tickets across a live kitchen board, and keep an eye on revenue, best sellers and low stock.

## What's here
- **Landing page** (`/`) — product introduction.
- **Overview** (`/app`) — today's revenue, orders, wait time, waste, revenue by hour, best sellers, low-stock alerts.
- **Counter** (`/app/counter`) — menu grid with categories and search, ticket with quantities, notes and payment method; placing an order issues a token and draws down stock.
- **Kitchen board** (`/app/kitchen`) — New → Cooking → Ready → Collected, with ticket age and late highlighting.

Data is currently sample data (`src/data/fixtures.ts`) held in browser state, so changes reset on reload.

## Tech
React 19, Vite, TypeScript, Tailwind CSS v4, React Router, lucide-react icons. Hosted on Netlify.

## Run locally
```bash
npm install
npm run dev
# or, with Netlify emulation:
netlify dev
```

## Roadmap
See [PLAN.md](./PLAN.md): database-backed API on a Netlify Server, staff logins and roles, live pickup screen, menu and inventory management, prepaid wallets, reports with waste tracking, and customer pre-ordering.
