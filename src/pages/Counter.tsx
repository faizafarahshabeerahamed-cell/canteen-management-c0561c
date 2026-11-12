import { useMemo, useState } from "react";
import { Minus, Plus, Search, Trash2, X, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { categories, formatMoney, getItem, orderTotal, type Category, type Order, type OrderLine } from "../data/fixtures";
import { useStore } from "../state/store";

const payments: Order["payment"][] = ["Wallet", "Card", "Cash"];

export default function Counter() {
  const { menu, placeOrder } = useStore();
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<OrderLine[]>([]);
  const [customer, setCustomer] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState<Order["payment"]>("Wallet");
  const [placed, setPlaced] = useState<Order | null>(null);

  const visible = useMemo(
    () => menu.filter((m) => (cat === "All" || m.category === cat) && m.name.toLowerCase().includes(q.toLowerCase())),
    [menu, cat, q],
  );

  const qtyOf = (id: string) => cart.find((l) => l.itemId === id)?.qty ?? 0;
  const stockOf = (id: string) => menu.find((m) => m.id === id)?.stock ?? 0;

  const change = (id: string, delta: number) =>
    setCart((prev) => {
      const cur = prev.find((l) => l.itemId === id)?.qty ?? 0;
      const nextQty = Math.min(Math.max(cur + delta, 0), stockOf(id));
      if (nextQty === 0) return prev.filter((l) => l.itemId !== id);
      return cur === 0 ? [...prev, { itemId: id, qty: nextQty }] : prev.map((l) => (l.itemId === id ? { ...l, qty: nextQty } : l));
    });

  const total = orderTotal({ lines: cart });
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const submit = () => {
    if (!cart.length) return;
    const order = placeOrder({ customer, lines: cart, payment, note });
    setPlaced(order);
    setCart([]);
    setCustomer("");
    setNote("");
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader eyebrow="Counter 1" title="Take an order">
        <label className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu"
            className="w-full rounded-full border border-line bg-[#fffdf7] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-ink" />
        </label>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-ink text-paper" : "border border-line bg-[#fffdf7] text-ink-soft hover:border-ink hover:text-ink"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {visible.map((m) => {
              const qty = qtyOf(m.id);
              const out = m.stock === 0;
              return (
                <button key={m.id} disabled={out || qty >= m.stock} onClick={() => change(m.id, 1)}
                  className={`group relative flex flex-col rounded-2xl border p-4 text-left transition ${
                    out ? "cursor-not-allowed border-line bg-paper-2/60 opacity-55"
                      : qty ? "border-tomato bg-[#fffdf7] shadow-[0_4px_0_#d9481f]" : "border-line bg-[#fffdf7] hover:-translate-y-0.5 hover:border-ink"}`}>
                  {qty > 0 && (
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-tomato font-mono text-xs font-bold text-paper">{qty}</span>
                  )}
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold leading-tight">
                    <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-sm border-2 ${m.veg ? "border-basil" : "border-tomato"}`} aria-label={m.veg ? "Veg" : "Non-veg"} />
                    {m.name}
                  </span>
                  <span className="mt-auto flex items-end justify-between pt-3">
                    <span className="font-display text-lg font-bold">{formatMoney(m.price)}</span>
                    <span className={`font-mono text-[11px] ${out ? "text-tomato" : m.stock <= 10 ? "text-tomato" : "text-ink-soft"}`}>
                      {out ? "sold out" : `${m.stock} left`}
                    </span>
                  </span>
                </button>
              );
            })}
            {visible.length === 0 && <p className="col-span-full py-10 text-center text-sm text-ink-soft">Nothing on the menu matches "{q}".</p>}
          </div>
        </div>

        {/* Ticket */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="ticket rounded-t-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Current ticket</h2>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} className="flex items-center gap-1 text-xs text-ink-soft hover:text-tomato"><Trash2 size={14} /> Clear</button>
              )}
            </div>

            <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name or ID (optional)"
              className="mt-4 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-ink" />

            <div className="mt-4 min-h-[120px] border-t border-dashed border-line pt-3">
              {cart.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-soft">Tap a dish to add it.</p>
              ) : (
                <ul className="space-y-2">
                  {cart.map((l) => {
                    const item = getItem(l.itemId);
                    return (
                      <li key={l.itemId} className="flex items-center gap-2 text-sm">
                        <span className="flex-1 truncate">{item.name}</span>
                        <div className="flex items-center rounded-full border border-line">
                          <button onClick={() => change(l.itemId, -1)} className="p-1.5 hover:text-tomato" aria-label="Remove one"><Minus size={12} /></button>
                          <span className="w-5 text-center font-mono text-xs">{l.qty}</span>
                          <button onClick={() => change(l.itemId, 1)} className="p-1.5 hover:text-tomato" aria-label="Add one"><Plus size={12} /></button>
                        </div>
                        <span className="w-14 text-right font-mono">{formatMoney(item.price * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Kitchen note (e.g. less spicy)"
              className="mt-3 w-full resize-none rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-ink" />

            <div className="mt-3 grid grid-cols-3 gap-2">
              {payments.map((p) => (
                <button key={p} onClick={() => setPayment(p)}
                  className={`rounded-lg py-2 text-sm font-medium transition ${payment === p ? "bg-ink text-paper" : "border border-line text-ink-soft hover:border-ink"}`}>
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-line pt-4">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">{count} item{count === 1 ? "" : "s"}</span>
              <span className="font-display text-3xl font-black">{formatMoney(total)}</span>
            </div>

            <button onClick={submit} disabled={!cart.length}
              className="mt-4 w-full rounded-xl bg-tomato py-3.5 font-semibold text-paper shadow-[0_5px_0_#a8330f] transition enabled:active:translate-y-1 enabled:active:shadow-[0_1px_0_#a8330f] disabled:cursor-not-allowed disabled:opacity-40">
              Charge {formatMoney(total)} & send to kitchen
            </button>
          </div>
        </aside>
      </div>

      {placed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" onClick={() => setPlaced(null)}>
          <div className="ticket rise w-full max-w-xs rounded-t-2xl p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPlaced(null)} className="absolute right-3 top-3 text-ink-soft hover:text-ink" aria-label="Close"><X size={18} /></button>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-basil text-paper"><Check size={24} /></span>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">Token for {placed.customer}</p>
            <p className="font-display text-7xl font-black text-tomato">#{placed.token}</p>
            <p className="mt-2 text-sm text-ink-soft">{formatMoney(orderTotal(placed))} paid by {placed.payment.toLowerCase()} · sent to kitchen</p>
            <button onClick={() => setPlaced(null)} className="mt-6 w-full rounded-xl bg-ink py-3 font-semibold text-paper hover:bg-tomato">Next customer</button>
          </div>
        </div>
      )}
    </div>
  );
}
