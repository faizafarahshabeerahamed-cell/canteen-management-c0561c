import { Link } from "react-router";
import { TriangleAlert, ArrowUpRight, Clock, IndianRupee, ShoppingBag, Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { formatMoney, getItem, hourlySales, kpis, topSellers } from "../data/fixtures";
import { useStore } from "../state/store";

function Stat({ icon: Icon, label, value, sub }: { icon: typeof Clock; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-line bg-[#fffdf7] p-5">
      <div className="flex items-center gap-2 text-sm text-ink-soft"><Icon size={16} /> {label}</div>
      <p className="mt-3 font-display text-3xl font-black">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{sub}</p>
    </div>
  );
}

export default function Overview() {
  const { menu, orders } = useStore();
  const max = Math.max(...hourlySales.map((h) => h.revenue));
  const growth = ((kpis.revenueToday - kpis.revenueYesterday) / kpis.revenueYesterday) * 100;
  const lowStock = menu.filter((m) => m.stock <= 10).sort((a, b) => a.stock - b.stock);
  const counts = {
    new: orders.filter((o) => o.status === "new").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
  };
  const topMax = topSellers[0].sold;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Thursday · 12 Nov" title="Good afternoon, Block C">
        <Link to="/app/counter" className="inline-flex items-center gap-2 rounded-full bg-tomato px-5 py-2.5 text-sm font-semibold text-paper hover:bg-tomato-dark">
          New order <ArrowUpRight size={16} />
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={IndianRupee} label="Revenue today" value={formatMoney(kpis.revenueToday)} sub={`${growth >= 0 ? "+" : ""}${growth.toFixed(1)}% vs yesterday`} />
        <Stat icon={ShoppingBag} label="Orders" value={kpis.ordersToday.toString()} sub="across 2 counters" />
        <Stat icon={Clock} label="Avg. wait" value={`${kpis.avgWaitMins} min`} sub="order to pickup" />
        <Stat icon={Trash2} label="Waste" value={`${kpis.wastePct}%`} sub="of portions cooked" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-line bg-[#fffdf7] p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-bold">Revenue by hour</h2>
            <span className="font-mono text-xs text-ink-soft">peak 1–2 pm</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-2" role="img" aria-label="Bar chart of revenue by hour today">
            {hourlySales.map((h) => (
              <div key={h.hour} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="font-mono text-[10px] text-ink-soft opacity-0 transition group-hover:opacity-100">
                  {h.revenue ? formatMoney(h.revenue) : "—"}
                </span>
                <div
                  className={`w-full rounded-t-md transition ${h.revenue === max ? "bg-tomato" : "bg-ink/80 group-hover:bg-ink"}`}
                  style={{ height: `${Math.max((h.revenue / max) * 100, 2)}%` }}
                />
                <span className="font-mono text-[11px] text-ink-soft">{h.hour}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-ink p-6 text-paper">
          <h2 className="font-display text-xl font-bold">Right now</h2>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[["New", counts.new, "text-mustard"], ["Cooking", counts.preparing, "text-paper"], ["Ready", counts.ready, "text-[#5fbf6f]"]].map(([l, n, c]) => (
              <div key={l as string} className="rounded-xl bg-paper/5 py-4">
                <p className={`font-display text-4xl font-black ${c}`}>{n}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-paper/50">{l}</p>
              </div>
            ))}
          </div>
          <Link to="/app/kitchen" className="mt-5 flex items-center justify-between rounded-xl bg-paper/10 px-4 py-3 text-sm font-medium hover:bg-paper/15">
            Open kitchen board <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-[#fffdf7] p-6">
          <h2 className="font-display text-xl font-bold">Best sellers today</h2>
          <ul className="mt-5 space-y-4">
            {topSellers.map((t, i) => {
              const item = getItem(t.itemId);
              return (
                <li key={t.itemId} className="flex items-center gap-3">
                  <span className="w-5 font-mono text-xs text-ink-soft">{i + 1}</span>
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm"><span className="font-medium">{item.name}</span><span className="font-mono text-ink-soft">{t.sold}</span></div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-paper-2"><div className="h-full rounded-full bg-mustard" style={{ width: `${(t.sold / topMax) * 100}%` }} /></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-[#fffdf7] p-6">
          <div className="flex items-center gap-2">
            <TriangleAlert size={18} className="text-tomato" />
            <h2 className="font-display text-xl font-bold">Running low</h2>
          </div>
          {lowStock.length === 0 ? (
            <p className="mt-5 text-sm text-ink-soft">Everything is well stocked.</p>
          ) : (
            <ul className="mt-5 divide-y divide-line">
              {lowStock.map((m) => (
                <li key={m.id} className="flex items-center gap-3 py-3">
                  <span className="text-xl">{m.emoji}</span>
                  <span className="flex-1 text-sm font-medium">{m.name}</span>
                  <span className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold ${m.stock === 0 ? "bg-tomato text-paper" : "bg-mustard/25 text-ink"}`}>
                    {m.stock === 0 ? "Sold out" : `${m.stock} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
