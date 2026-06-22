import Link from "next/link";
import { GARDEN_PLAN_PRESETS } from "@/lib/constants/garden-plan-presets";

interface GardenPlanPresetNavProps {
  currentSlug?: string;
}

const SHORT: Record<string, string> = {
  "maly-ogrod": "Mały ogród",
  "duzy-ogrod": "Duży ogród",
  "ogrod-prywatny": "Prywatność",
  "warzywnik-domowy": "Warzywnik",
  "ogrod-dla-dzieci": "Dla dzieci",
  "ogrod-niskich-kosztow": "Ekonomiczny",
  "ogrod-ekologiczny": "Eko",
  "ogrod-bez-pielegnacji": "Bezobsługowy",
  ankieta: "Ankieta",
};

export function GardenPlanPresetNav({ currentSlug }: GardenPlanPresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-4 sm:p-5"
      aria-label="Warianty generatora planu"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Plany ogrodu — gotowe scenariusze
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/generator-planu-ogrodu"
          className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Generator
        </Link>
        {GARDEN_PLAN_PRESETS.map((p) => (
          <Link
            key={p.slug}
            href={`/generator-planu-ogrodu/${p.slug}`}
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
