import type { ReactNode } from "react";

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-tomato">{eyebrow}</p>
        <h1 className="mt-1 font-display text-4xl font-black tracking-tight">{title}</h1>
      </div>
      {children}
    </div>
  );
}
