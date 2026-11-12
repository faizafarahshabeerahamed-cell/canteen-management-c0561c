import { Link } from "react-router";
import { ArrowRight, ReceiptText, ChefHat, Boxes, ChartColumn, Wallet, Leaf } from "lucide-react";
import Logo from "../components/Logo";

const features = [
  { icon: ReceiptText, title: "A counter that keeps up", body: "Tap the menu, take payment, print a token. Sold-out dishes grey themselves out so nobody orders the last biryani twice." },
  { icon: ChefHat, title: "A kitchen board, not a shouting match", body: "Every ticket lands on a live board — new, cooking, ready. Cooks bump orders forward; the pickup screen updates on its own." },
  { icon: Boxes, title: "Stock that counts itself", body: "Each sale draws down today's portions. Low-stock warnings show up before the queue finds out." },
  { icon: ChartColumn, title: "The day, at a glance", body: "Revenue by hour, best sellers, average wait and waste — the numbers a canteen manager actually checks." },
  { icon: Wallet, title: "Card, cash or wallet", body: "Prepaid student and staff wallets sit alongside cash and card, so the lunch rush never stalls on change." },
  { icon: Leaf, title: "Less food in the bin", body: "Forecasts from past days help you cook closer to demand and log what's left at close." },
];

export default function Landing() {
  return (
    <div className="grain min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <Link to="/app" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-tomato">
          Open the canteen
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-[1.15fr_1fr] md:pt-16">
        <div>
          <p className="rise font-mono text-xs uppercase tracking-[0.25em] text-tomato">Canteen management</p>
          <h1 className="rise rise-1 mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Keep the lunch line <em className="text-tomato">moving.</em>
          </h1>
          <p className="rise rise-2 mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Ladle runs the whole canteen from one screen — the order counter, the kitchen board, today's menu and the
            stock behind it. Built for school, college and office canteens that serve hundreds in an hour.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <Link to="/app/counter" className="group inline-flex items-center gap-2 rounded-full bg-tomato px-6 py-3.5 font-semibold text-paper shadow-[0_6px_0_#a8330f] transition active:translate-y-1 active:shadow-[0_2px_0_#a8330f]">
              Take an order <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link to="/app/kitchen" className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-paper">
              See the kitchen board
            </Link>
          </div>
        </div>

        {/* Ticket stack illustration */}
        <div className="relative mx-auto h-[380px] w-full max-w-sm">
          <div className="ticket absolute left-6 top-8 w-64 rotate-[-7deg] rounded-t-lg p-5 opacity-70 shadow-lg">
            <p className="font-mono text-xs text-ink-soft">TOKEN</p>
            <p className="font-display text-4xl font-black">#139</p>
          </div>
          <div className="ticket rise rise-2 absolute right-0 top-0 w-72 rotate-[4deg] rounded-t-lg p-6 shadow-xl">
            <div className="flex items-center justify-between font-mono text-xs text-ink-soft">
              <span>BLOCK C CANTEEN</span><span>12:41</span>
            </div>
            <p className="mt-3 font-mono text-xs text-ink-soft">TOKEN</p>
            <p className="font-display text-6xl font-black text-tomato">#142</p>
            <div className="mt-4 space-y-1.5 border-t border-dashed border-line pt-4 font-mono text-sm">
              <div className="flex justify-between"><span>1 × Veg Thali</span><span>₹110</span></div>
              <div className="flex justify-between"><span>2 × Masala Chai</span><span>₹30</span></div>
              <div className="flex justify-between"><span>1 × Samosa (2)</span><span>₹30</span></div>
            </div>
            <div className="mt-4 flex justify-between border-t border-dashed border-line pt-3 font-mono text-sm font-semibold">
              <span>TOTAL · WALLET</span><span>₹170</span>
            </div>
          </div>
          <div className="rise rise-3 absolute bottom-6 left-0 flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-paper shadow-xl">
            <span className="pulse-dot h-2.5 w-2.5 rounded-full" style={{ background: "#5fbf6f" }} />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-paper/60">Ready for pickup</p>
              <p className="font-display text-xl font-bold">#136 · #137</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {[["4 min", "average wait at peak"], ["750+", "orders a day per counter"], ["3%", "food waste, down from 9%"], ["1 screen", "for counter, kitchen & stock"]].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl font-black text-mustard">{n}</p>
              <p className="mt-1 text-sm text-paper/60">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-xl font-display text-4xl font-black leading-tight tracking-tight">
          Everything between "one dosa please" and a clean tray.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-line bg-[#fffdf7] p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-paper-2 text-tomato"><Icon size={22} /></span>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-tomato px-8 py-10 text-paper md:flex-row md:items-center md:px-12">
          <div>
            <h2 className="font-display text-3xl font-black md:text-4xl">Doors open at 7:30.</h2>
            <p className="mt-2 text-paper/80">Walk through today's service with sample orders and a live kitchen board.</p>
          </div>
          <Link to="/app" className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-semibold text-ink transition hover:bg-ink hover:text-paper">
            Open the dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-ink-soft">
        Ladle · canteen management · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
