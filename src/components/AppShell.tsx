import { NavLink, Outlet, Link } from "react-router";
import { LayoutGrid, ReceiptText, ChefHat, BookOpen, Boxes, Users } from "lucide-react";
import Logo from "./Logo";
import { useStore } from "../state/store";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/app/counter", label: "Counter", icon: ReceiptText },
  { to: "/app/kitchen", label: "Kitchen board", icon: ChefHat },
];

const soon = [
  { label: "Menu planner", icon: BookOpen },
  { label: "Inventory", icon: Boxes },
  { label: "Staff & shifts", icon: Users },
];

export default function AppShell() {
  const { orders } = useStore();
  const live = orders.filter((o) => o.status === "new" || o.status === "preparing").length;

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink px-5 py-6 text-paper md:flex">
        <Link to="/"><Logo light /></Link>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-paper/50">Block C Canteen</p>

        <nav className="mt-10 flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-tomato text-paper" : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                }`
              }
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {label === "Kitchen board" && live > 0 && (
                <span className="rounded-full bg-mustard px-2 py-0.5 font-mono text-[11px] font-semibold text-ink">{live}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <p className="mt-8 px-3 font-mono text-[10px] uppercase tracking-widest text-paper/40">Coming next</p>
        <div className="mt-2 flex flex-col gap-1">
          {soon.map(({ label, icon: Icon }) => (
            <span key={label} className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-paper/35">
              <Icon size={18} /> {label}
            </span>
          ))}
        </div>

        <div className="mt-auto rounded-xl bg-paper/5 p-4">
          <div className="flex items-center gap-2 text-xs text-paper/70">
            <span className="pulse-dot h-2 w-2 rounded-full bg-basil" style={{ background: "#5fbf6f" }} /> Lunch service open
          </div>
          <p className="mt-1 font-mono text-[11px] text-paper/40">11:30 – 15:00</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <header className="flex items-center justify-between border-b border-line bg-paper px-4 py-3 md:hidden">
          <Link to="/"><Logo /></Link>
          <nav className="flex gap-1">
            {nav.map(({ to, icon: Icon, end, label }) => (
              <NavLink key={to} to={to} end={end} aria-label={label}
                className={({ isActive }) => `rounded-lg p-2 ${isActive ? "bg-tomato text-paper" : "text-ink-soft"}`}>
                <Icon size={20} />
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="grain flex-1 px-4 py-6 md:px-10 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
