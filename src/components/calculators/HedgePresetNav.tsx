import Link from "next/link";
import { HEDGE_PRESETS } from "@/lib/constants/hedge-presets";

interface HedgePresetNavProps {
  currentSlug?: string;
}

const SHORT_LABELS: Record<string, string> = {
  grab: "Grab",
  laurowisnia: "Laurowiśnia",
  cis: "Cis",
  ligustr: "Ligustr",
  bambus: "Bambus",
  ostrokrzew: "Ostrokrzew",
  bukszpan: "Bukszpan",
  "ile-sadzonek": "Ile sadzonek?",
  "koszt-zywoplotu": "Koszt",
};

export function HedgePresetNav({ currentSlug }: HedgePresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-4 sm:p-5"
      aria-label="Warianty kalkulatora żywopłotu"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Kalkulator żywopłotu — warianty
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/kalkulator-zywoplotu"
          className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Ogólny
        </Link>
        {HEDGE_PRESETS.map((p) => (
          <Link
            key={p.slug}
            href={`/kalkulator-zywoplotu/${p.slug}`}
            className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
              currentSlug === p.slug
                ? "bg-primary text-white"
                : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
            }`}
          >
            {SHORT_LABELS[p.slug] ?? p.slug}
          </Link>
        ))}
      </div>
    </nav>
  );
}
