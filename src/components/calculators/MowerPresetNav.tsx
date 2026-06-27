import Link from "next/link";
import { MOWER_PRESETS } from "@/lib/constants/mower-presets";

interface MowerPresetNavProps {
  currentSlug?: string;
}

export function MowerPresetNav({ currentSlug }: MowerPresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-5"
      aria-label="Warianty kalkulatora robota koszącego"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Robot koszący — tematy
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/kalkulator-robota-koszacego"
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Ogólny
        </Link>
        {MOWER_PRESETS.map((p) => (
          <Link
            key={p.slug}
            href={`/kalkulator-robota-koszacego/${p.slug}`}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              currentSlug === p.slug
                ? "bg-primary text-white"
                : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
            }`}
          >
            {p.shortLabel}
          </Link>
        ))}
      </div>
    </nav>
  );
}
