import Link from "next/link";
import { TREE_PRESETS } from "@/lib/constants/tree-presets";

interface TreePresetNavProps {
  currentSlug?: string;
}

const SHORT: Record<string, string> = {
  "dab-vs-sosna": "Dąb vs sosna",
  "dab-vs-brzoza": "Dąb vs brzoza",
  "dab-vs-lipa": "Dąb vs lipa",
  "dab-vs-buk": "Dąb vs buk",
  "sosna-vs-jodla": "Sosna vs jodła",
  "brzoza-vs-wierzba": "Brzoza vs wierzba",
  "lipa-vs-klon": "Lipa vs klon",
  "buk-vs-jesion": "Buk vs jesion",
  "wierzba-vs-olcha": "Wierzba vs olcha",
  "kasztan-vs-lipa": "Kasztan vs lipa",
  "swierk-vs-jodla": "Świerk vs jodła",
  "modrzew-vs-sosna": "Modrzew vs sosna",
  "topola-vs-wierzba": "Topola vs wierzba",
  "orzech-vs-klon": "Orzech vs klon",
  "akacja-vs-brzoza": "Akacja vs brzoza",
  kasztan: "Kasztanowiec",
  dab: "Dąb",
  sosna: "Sosna",
  brzoza: "Brzoza",
  porownanie: "Porównaj",
};

export function TreePresetNav({ currentSlug }: TreePresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-4 sm:p-5"
      aria-label="Porównania drzew"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Popularne porównania
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/porownywarka-drzew"
          className={`rounded-full px-3 py-1 text-xs sm:text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Wszystkie
        </Link>
        {TREE_PRESETS.map((p) => (
          <Link
            key={p.slug}
            href={`/porownywarka-drzew/${p.slug}`}
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
