// All sample data for the product surface lives here.
// A later milestone replaces these with real API calls (see PLAN.md).

export type Category = "Breakfast" | "Mains" | "Snacks" | "Drinks" | "Desserts";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number; // in currency units
  emoji: string;
  veg: boolean;
  stock: number; // portions left today
  prepMins: number;
}

export type OrderStatus = "new" | "preparing" | "ready" | "collected";

export interface OrderLine {
  itemId: string;
  qty: number;
}

export interface Order {
  id: string;
  token: number;
  customer: string;
  lines: OrderLine[];
  status: OrderStatus;
  placedAt: number; // epoch ms
  payment: "Card" | "Cash" | "Wallet";
  note?: string;
}

export const CURRENCY = "₹";

export const categories: Category[] = ["Breakfast", "Mains", "Snacks", "Drinks", "Desserts"];

export const menu: MenuItem[] = [
  { id: "m1", name: "Masala Dosa", category: "Breakfast", price: 60, emoji: "🥞", veg: true, stock: 42, prepMins: 6 },
  { id: "m2", name: "Idli Sambar (3)", category: "Breakfast", price: 40, emoji: "🍚", veg: true, stock: 60, prepMins: 3 },
  { id: "m3", name: "Poha", category: "Breakfast", price: 35, emoji: "🥣", veg: true, stock: 8, prepMins: 4 },
  { id: "m4", name: "Egg Bhurji Pav", category: "Breakfast", price: 55, emoji: "🍳", veg: false, stock: 25, prepMins: 5 },
  { id: "m5", name: "Veg Thali", category: "Mains", price: 110, emoji: "🍛", veg: true, stock: 70, prepMins: 4 },
  { id: "m6", name: "Chicken Biryani", category: "Mains", price: 150, emoji: "🍗", veg: false, stock: 18, prepMins: 5 },
  { id: "m7", name: "Rajma Chawal", category: "Mains", price: 90, emoji: "🫘", veg: true, stock: 34, prepMins: 3 },
  { id: "m8", name: "Paneer Wrap", category: "Mains", price: 95, emoji: "🌯", veg: true, stock: 0, prepMins: 7 },
  { id: "m9", name: "Samosa (2)", category: "Snacks", price: 30, emoji: "🥟", veg: true, stock: 80, prepMins: 1 },
  { id: "m10", name: "Veg Puff", category: "Snacks", price: 25, emoji: "🥐", veg: true, stock: 22, prepMins: 1 },
  { id: "m11", name: "French Fries", category: "Snacks", price: 60, emoji: "🍟", veg: true, stock: 30, prepMins: 6 },
  { id: "m12", name: "Masala Chai", category: "Drinks", price: 15, emoji: "☕", veg: true, stock: 200, prepMins: 2 },
  { id: "m13", name: "Filter Coffee", category: "Drinks", price: 20, emoji: "🥤", veg: true, stock: 150, prepMins: 2 },
  { id: "m14", name: "Fresh Lime Soda", category: "Drinks", price: 35, emoji: "🍋", veg: true, stock: 6, prepMins: 2 },
  { id: "m15", name: "Gulab Jamun (2)", category: "Desserts", price: 30, emoji: "🍡", veg: true, stock: 40, prepMins: 1 },
  { id: "m16", name: "Fruit Custard", category: "Desserts", price: 45, emoji: "🍮", veg: true, stock: 12, prepMins: 1 },
];

const now = Date.now();
const min = 60_000;

export const seedOrders: Order[] = [
  { id: "o1", token: 141, customer: "Priya S.", lines: [{ itemId: "m5", qty: 1 }, { itemId: "m12", qty: 1 }], status: "new", placedAt: now - 1 * min, payment: "Wallet" },
  { id: "o2", token: 140, customer: "Rahul M.", lines: [{ itemId: "m6", qty: 2 }], status: "new", placedAt: now - 2 * min, payment: "Card", note: "Extra raita" },
  { id: "o3", token: 139, customer: "Ananya K.", lines: [{ itemId: "m1", qty: 1 }, { itemId: "m13", qty: 2 }], status: "preparing", placedAt: now - 5 * min, payment: "Cash" },
  { id: "o4", token: 138, customer: "Dev P.", lines: [{ itemId: "m11", qty: 1 }, { itemId: "m14", qty: 1 }], status: "preparing", placedAt: now - 7 * min, payment: "Wallet" },
  { id: "o5", token: 137, customer: "Meera J.", lines: [{ itemId: "m7", qty: 1 }], status: "ready", placedAt: now - 9 * min, payment: "Card" },
  { id: "o6", token: 136, customer: "Arjun T.", lines: [{ itemId: "m9", qty: 2 }, { itemId: "m12", qty: 2 }], status: "ready", placedAt: now - 11 * min, payment: "Cash" },
  { id: "o7", token: 135, customer: "Sana R.", lines: [{ itemId: "m15", qty: 1 }], status: "collected", placedAt: now - 16 * min, payment: "Wallet" },
];

/** Hourly revenue for today (07:00 → 16:00). */
export const hourlySales = [
  { hour: "7a", revenue: 1840, orders: 41 },
  { hour: "8a", revenue: 4620, orders: 98 },
  { hour: "9a", revenue: 3910, orders: 82 },
  { hour: "10a", revenue: 1760, orders: 47 },
  { hour: "11a", revenue: 2280, orders: 51 },
  { hour: "12p", revenue: 9450, orders: 133 },
  { hour: "1p", revenue: 11280, orders: 156 },
  { hour: "2p", revenue: 5130, orders: 77 },
  { hour: "3p", revenue: 2420, orders: 64 },
  { hour: "4p", revenue: 0, orders: 0 },
];

export const kpis = {
  revenueToday: 42690,
  revenueYesterday: 39820,
  ordersToday: 749,
  avgWaitMins: 4.2,
  wastePct: 3.1,
};

export const topSellers = [
  { itemId: "m5", sold: 186 },
  { itemId: "m12", sold: 171 },
  { itemId: "m6", sold: 94 },
  { itemId: "m1", sold: 88 },
  { itemId: "m9", sold: 73 },
];

export const getItem = (id: string) => menu.find((m) => m.id === id)!;

export const orderTotal = (o: Pick<Order, "lines">) =>
  o.lines.reduce((sum, l) => sum + getItem(l.itemId).price * l.qty, 0);

export const formatMoney = (n: number) => `${CURRENCY}${n.toLocaleString("en-IN")}`;
