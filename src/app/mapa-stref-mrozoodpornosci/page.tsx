import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HardinessZoneMap } from "@/components/hardiness-map/HardinessZoneMap";
import { HARDINESS_MAP_FAQ, VOIVODESHIP_ZONES, ZONE_COLORS } from "@/lib/constants/hardiness-zones";
import { presetPageMetadata, jsonLdBreadcrumb, jsonLdFAQ, SITE_URL } from "@/lib/seo";

const TITLE = "Mapa stref mrozoodporności Polski — USDA 5b–7a";
const DESCRIPTION =
  "Interaktywna mapa stref mrozoodporności USDA dla 16 województw Polski. Sprawdź swoją strefę, daty przymrozków i dobierz rośliny do klimatu regionu.";

export const metadata: Metadata = presetPageMetadata(
  TITLE,
  DESCRIPTION,
  [
    "strefa mrozoodporności Polska",
    "mapa stref USDA Polska",
    "strefa klimatyczna ogrodnictwo",
    "mrozoodporność roślin Polska",
    "USDA zone Poland",
  ],
  "/mapa-stref-mrozoodpornosci"
);

export default function HardinessMapPage() {
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: "Mapa stref mrozoodporności", url: `${SITE_URL}/mapa-stref-mrozoodpornosci` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(HARDINESS_MAP_FAQ)) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Mapa stref mrozoodporności" },
          ]}
        />

        <header className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
            Mapa stref mrozoodporności Polski
          </h1>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">{DESCRIPTION}</p>
          <p className="mt-3 text-sm text-muted">
            Kliknij województwo na mapie lub wyszukaj miasto — zobaczysz strefę USDA,
            orientacyjne daty przymrozków i linki do kalkulatorów dla Twojego regionu.
          </p>
        </header>

        <HardinessZoneMap />

        <section className="mt-12">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Wszystkie województwa ({VOIVODESHIP_ZONES.length})
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {VOIVODESHIP_ZONES.map((v) => (
              <li
                key={v.id}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: ZONE_COLORS[v.zone].fill }}
                />
                <span className="font-medium">{v.name}</span>
                <span className="text-xs text-muted ml-auto">USDA {v.zone}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-accent/30 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-primary-dark mb-3">Jak czytać mapę USDA?</h2>
          <div className="prose prose-sm max-w-none text-muted space-y-3">
            <p>
              Strefy mrozoodporności USDA dzielą obszar na podstawie{" "}
              <strong>średniej rocznej minimalnej temperatury</strong> z ostatnich 30 lat.
              W Polsce występują strefy od <strong>5b</strong> (góry, do -26°C) do{" "}
              <strong>7a</strong> (wybrzeże, do -17°C).
            </p>
            <p>
              Przed zakupem sadzonki sprawdź etykietę — np. „mrozoodporność 6b” oznacza, że
              roślina powinna przetrwać zimy typowe dla centrum Polski. W górach (Małopolska,
              Dolny Śląsk) wybieraj gatunki oznaczone na strefę niższą niż w dolinie.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/alternatywy-dla-tui"
              className="rounded-full bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Dobierz krzewy do strefy
            </Link>
            <Link
              href="/kalkulator-nawadniania/warszawa"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
            >
              Nawadnianie — presety miast
            </Link>
            <Link
              href="/kalkulator-wzrostu"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
            >
              Wzrost drzew i krzewów
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
          <FAQAccordion items={HARDINESS_MAP_FAQ} />
        </section>

        <p className="mt-8 text-xs text-muted">
          Granice województw: dane OpenStreetMap via{" "}
          <a
            href="https://github.com/codeforgermany/click_that_hood"
            className="text-primary hover:underline"
            rel="noopener noreferrer"
          >
            click_that_hood
          </a>{" "}
          (CC BY-SA). Strefy USDA — uśrednione dane klimatyczne IMGW; mikroklimat ogrodu może
          różnić się o pół strefy.
        </p>
      </div>
    </>
  );
}
