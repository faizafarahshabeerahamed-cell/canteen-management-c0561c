export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="8" fill="#d9481f" />
        <path d="M9 13h14a7 7 0 0 1-14 0z" fill="#fbf4e6" />
        <path d="M22 13l5-7" stroke="#fbf4e6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className={`font-display text-2xl font-black tracking-tight ${light ? "text-paper" : "text-ink"}`}>Ladle</span>
    </span>
  );
}
