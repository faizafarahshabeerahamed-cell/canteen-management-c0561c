import { useEffect, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { formatMoney, getItem, orderTotal, type Order, type OrderStatus } from "../data/fixtures";
import { useStore } from "../state/store";

const columns: { status: OrderStatus; title: string; action: string; accent: string }[] = [
  { status: "new", title: "New", action: "Start cooking", accent: "bg-mustard" },
  { status: "preparing", title: "Cooking", action: "Mark ready", accent: "bg-tomato" },
  { status: "ready", title: "Ready for pickup", action: "Collected", accent: "bg-basil" },
];

function useNow(interval = 15_000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
}

function OrderCard({ order, now, action, onAdvance }: { order: Order; now: number; action: string; onAdvance: () => void }) {
  const mins = Math.floor((now - order.placedAt) / 60_000);
  const late = order.status !== "ready" && mins >= 8;
  return (
    <article className="ticket rise rounded-t-xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-3xl font-black leading-none">#{order.token}</p>
          <p className="mt-1 text-xs text-ink-soft">{order.customer}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${late ? "bg-tomato text-paper" : "bg-paper-2 text-ink-soft"}`}>
          {mins < 1 ? "just now" : `${mins} min`}
        </span>
      </div>
      <ul className="mt-3 space-y-1 border-t border-dashed border-line pt-3 font-mono text-sm">
        {order.lines.map((l) => (
          <li key={l.itemId} className="flex gap-2"><span className="font-semibold">{l.qty}×</span><span>{getItem(l.itemId).name}</span></li>
        ))}
      </ul>
      {order.note && <p className="mt-2 rounded-md bg-mustard/20 px-2 py-1 text-xs">📝 {order.note}</p>}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-ink-soft">{formatMoney(orderTotal(order))} · {order.payment}</span>
        <button onClick={onAdvance} className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-paper hover:bg-tomato">
          {action} <ArrowRight size={12} />
        </button>
      </div>
    </article>
  );
}

export default function Kitchen() {
  const { orders, advance, setStatus } = useStore();
  const now = useNow();
  const collected = orders.filter((o) => o.status === "collected").slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader eyebrow="Live" title="Kitchen board">
        <p className="flex items-center gap-2 text-sm text-ink-soft">
          <span className="pulse-dot h-2 w-2 rounded-full bg-tomato" /> Tickets over 8 minutes turn red
        </p>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-3">
        {columns.map((col) => {
          const list = orders.filter((o) => o.status === col.status).sort((a, b) => a.placedAt - b.placedAt);
          return (
            <section key={col.status} className="rounded-2xl bg-paper-2/70 p-4">
              <header className="mb-4 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${col.accent}`} />
                <h2 className="font-display text-lg font-bold">{col.title}</h2>
                <span className="ml-auto rounded-full bg-[#fffdf7] px-2.5 py-0.5 font-mono text-xs">{list.length}</span>
              </header>
              <div className="flex flex-col gap-5">
                {list.map((o) => (
                  <OrderCard key={o.id} order={o} now={now} action={col.action} onAdvance={() => advance(o.id)} />
                ))}
                {list.length === 0 && <p className="rounded-xl border-2 border-dashed border-line py-10 text-center text-sm text-ink-soft">No tickets</p>}
              </div>
            </section>
          );
        })}
      </div>

      {collected.length > 0 && (
        <section className="mt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">Recently collected</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {collected.map((o) => (
              <button key={o.id} onClick={() => setStatus(o.id, "ready")} title="Move back to ready"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-[#fffdf7] px-3 py-1.5 font-mono text-xs text-ink-soft hover:border-ink hover:text-ink">
                #{o.token} {o.customer} <RotateCcw size={12} className="opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
