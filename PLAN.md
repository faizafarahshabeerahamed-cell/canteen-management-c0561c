# Ladle — product roadmap

Ladle is a canteen management system: counter ordering, a live kitchen board, menu and stock control, wallets and reporting for school, college and office canteens.

## Milestone 1 — Product surface ✅
Landing page, Overview dashboard, Counter (order taking) and Kitchen board, running on sample data in `src/data/fixtures.ts` with client-side state in `src/state/store.tsx`.

## Milestone 2 — Data model & API
- Add a Netlify Server (`netlify/server/index.mjs`, Hono) for all API routes.
- Netlify Database (Postgres + Drizzle) schema in `db/schema.ts`: `menu_items`, `daily_stock`, `orders`, `order_lines`, `payments`.
- Endpoints: list menu, place order (atomic stock decrement + token number per day), update order status, list today's orders.
- Replace `fixtures.ts` / `store.tsx` with fetch calls; keep the same types.

## Milestone 3 — Staff accounts & roles
- Netlify Identity login for staff; roles `manager`, `cashier`, `cook`.
- Cashiers see Counter, cooks see Kitchen, managers see everything. Server checks roles on every write.

## Milestone 4 — Live kitchen & pickup screen
- Polling or streaming updates so new tickets appear on the kitchen board without reload.
- Public full-screen "Now serving" pickup display listing ready tokens.

## Milestone 5 — Menu planner & inventory
- Manage dishes, prices, categories, veg flag, photos (Netlify Blobs).
- Daily menu per service (breakfast/lunch/snacks) and opening stock per dish.
- Ingredient inventory with low-stock alerts and supplier restock log.

## Milestone 6 — Wallets & payments
- Prepaid wallets for students/staff with top-ups, balance checks at the counter, and transaction history.
- End-of-day cash reconciliation per counter.

## Milestone 7 — Reports & waste
- Real Overview metrics from the database (revenue by hour, best sellers, average wait).
- Closing waste log and a scheduled function that emails a daily summary.
- Optional AI demand forecast (Netlify AI Gateway) suggesting tomorrow's portions.

## Milestone 8 — Customer pre-ordering
- Mobile pre-order page where customers order ahead, pay from their wallet, and get notified when their token is ready.
