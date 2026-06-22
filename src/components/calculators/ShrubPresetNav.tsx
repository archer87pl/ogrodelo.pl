import Link from "next/link";
import { SHRUB_PRESETS } from "@/lib/constants/shrub-presets";

interface ShrubPresetNavProps {
  currentSlug?: string;
}

const SHORT: Record<string, string> = {
  "laurowisnia-vs-tuja": "Laurowiśnia vs tuja",
  "tuja-vs-ostrokrzew": "Tuja vs ostrokrzew",
  "laurowisnia-vs-ostrokrzew": "Laurowiśnia vs ostrokrzew",
  "berberys-vs-bukszpan": "Berberys vs bukszpan",
  "hortensja-vs-forsycja": "Hortensja vs forsycja",
  "bez-vs-kalina": "Bez vs kalina",
  "pigwowiec-vs-deren": "Pigwowiec vs deren",
  "tawula-vs-berberys": "Tawuła vs berberys",
  laurowisnia: "Laurowiśnia",
  tuja: "Tuja",
  ostrokrzew: "Ostrokrzew",
  porownanie: "Porównaj",
};

export function ShrubPresetNav({ currentSlug }: ShrubPresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-4 sm:p-5"
      aria-label="Porównania krzewów"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Popularne porównania krzewów
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/porownywarka-krzewow"
          className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Wszystkie
        </Link>
        {SHRUB_PRESETS.map((p) => (
          <Link
            key={p.slug}
            href={`/porownywarka-krzewow/${p.slug}`}
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
