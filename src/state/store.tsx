import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { menu as seedMenu, seedOrders, type MenuItem, type Order, type OrderLine, type OrderStatus } from "../data/fixtures";

// Client-side state for the product surface. Swapped for API calls in a later milestone.

interface Store {
  menu: MenuItem[];
  orders: Order[];
  placeOrder: (input: { customer: string; lines: OrderLine[]; payment: Order["payment"]; note?: string }) => Order;
  advance: (orderId: string) => void;
  setStatus: (orderId: string, status: OrderStatus) => void;
}

const Ctx = createContext<Store | null>(null);

const next: Record<OrderStatus, OrderStatus> = {
  new: "preparing",
  preparing: "ready",
  ready: "collected",
  collected: "collected",
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<MenuItem[]>(seedMenu);
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  const value = useMemo<Store>(() => ({
    menu,
    orders,
    placeOrder: ({ customer, lines, payment, note }) => {
      const token = Math.max(...orders.map((o) => o.token), 100) + 1;
      const order: Order = {
        id: `o${Date.now()}`,
        token,
        customer: customer.trim() || "Walk-in",
        lines,
        payment,
        note: note?.trim() || undefined,
        status: "new",
        placedAt: Date.now(),
      };
      setOrders((prev) => [order, ...prev]);
      setMenu((prev) =>
        prev.map((m) => {
          const line = lines.find((l) => l.itemId === m.id);
          return line ? { ...m, stock: Math.max(0, m.stock - line.qty) } : m;
        }),
      );
      return order;
    },
    advance: (orderId) =>
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: next[o.status] } : o))),
    setStatus: (orderId, status) =>
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o))),
  }), [menu, orders]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
