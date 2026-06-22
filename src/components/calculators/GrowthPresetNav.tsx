import Link from "next/link";
import { GROWTH_PRESETS } from "@/lib/constants/growth-presets";

interface GrowthPresetNavProps {
  currentSlug?: string;
}

const SHORT: Record<string, string> = {
  grab: "Grab",
  tuja: "Tuja",
  laurowisnia: "Laurowiśnia",
  cis: "Cis",
  bambus: "Bambus",
  wierzba: "Wierzba",
  brzoza: "Brzoza",
  ostrokrzew: "Ostrokrzew",
  porownanie: "Porównanie",
};

export function GrowthPresetNav({ currentSlug }: GrowthPresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-4 sm:p-5"
      aria-label="Warianty kalkulatora wzrostu"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Kalkulator wzrostu — gatunki
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/kalkulator-wzrostu"
          className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Wszystkie
        </Link>
        {GROWTH_PRESETS.map((p) => (
          <Link
            key={p.slug}
            href={`/kalkulator-wzrostu/${p.slug}`}
            className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
              currentSlug === p.slug
                ? "bg-primary text-white"
                : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
            }`}
          >
            {SHORT[p.slug] ?? p.slug}
          </Link>
        ))}
      </div>
    </nav>
  );
}
