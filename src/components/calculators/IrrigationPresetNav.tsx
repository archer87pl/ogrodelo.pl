import Link from "next/link";
import { IRRIGATION_PRESETS } from "@/lib/constants/irrigation-presets";

interface IrrigationPresetNavProps {
  currentSlug?: string;
}

export function IrrigationPresetNav({ currentSlug }: IrrigationPresetNavProps) {
  return (
    <nav
      className="rounded-2xl border border-border bg-accent/30 p-5"
      aria-label="Warianty kalkulatora nawadniania"
    >
      <p className="text-sm font-semibold text-primary-dark mb-3">
        Kalkulator nawadniania — warianty
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/kalkulator-nawadniania"
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            !currentSlug
              ? "bg-primary text-white"
              : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
          }`}
        >
          Ogólny
        </Link>
        {IRRIGATION_PRESETS.map((p) => {
          const labels: Record<string, string> = {
            trawnik: "Trawnik",
            warzywnik: "Warzywnik",
            kroplowanie: "Kroplówka",
            "ile-litrow": "Ile litrów?",
            "koszt-wody": "Koszt wody",
            harmonogram: "Harmonogram",
            "gleba-piaszczysta": "Piasek",
            "gleba-gliniasta": "Glina",
            warszawa: "Warszawa",
            krakow: "Kraków",
            wroclaw: "Wrocław",
            gdansk: "Gdańsk",
            poznan: "Poznań",
            lodz: "Łódź",
          };
          return (
            <Link
              key={p.slug}
              href={`/kalkulator-nawadniania/${p.slug}`}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                currentSlug === p.slug
                  ? "bg-primary text-white"
                  : "bg-card border border-border hover:border-primary text-muted hover:text-primary"
              }`}
            >
              {labels[p.slug] ?? p.slug.charAt(0).toUpperCase() + p.slug.slice(1)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
