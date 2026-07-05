import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CALENDAR_CATEGORIES } from "@/lib/constants/garden-calendar";
import {
  getCurrentSeasonalGuide,
  SEASONAL_GUIDES,
} from "@/lib/constants/seasonal-guides";
import { getCalendarMonthForGuide } from "@/lib/constants/seasonal-guides";
import { presetPageMetadata, jsonLdBreadcrumb, SITE_URL } from "@/lib/seo";

const guide = getCurrentSeasonalGuide();
const month = getCalendarMonthForGuide(guide.monthSlug)!;
const now = new Date();
const monthName = month.name;

export const metadata: Metadata = presetPageMetadata(
  `Co robić w ogrodzie TERAZ — ${monthName} ${now.getFullYear()}`,
  `Aktualne prace ogrodowe na ${monthName.toLowerCase()} ${now.getFullYear()}. Priorytety, pogoda i linki do kalkulatorów — co zrobić w ogrodzie w tym miesiącu.`,
  [
    "co robić w ogrodzie teraz",
    `ogród ${monthName.toLowerCase()}`,
    "prace ogrodowe teraz",
    "kalendarz ogrodnika",
  ],
  "/ogrod-teraz"
);

export default function GardenNowPage() {
  const highTasks = month.tasks.filter((t) => t.priority === "wysoki").slice(0, 6);

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: "Co robić teraz", url: `${SITE_URL}/ogrod-teraz` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Co robić teraz" },
          ]}
        />

        <header className="mt-6 mb-8">
          <p className="text-sm font-medium text-primary mb-2">
            Aktualizowane automatycznie · {monthName} {now.getFullYear()}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
            Co robić w ogrodzie TERAZ
          </h1>
          <p className="mt-4 text-muted leading-relaxed">{guide.weatherNote}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-primary-dark mb-4">
            Priorytet na {month.nameGenitive}
          </h2>
          <ul className="space-y-3">
            {highTasks.map((t) => (
              <li key={t.id} className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold">
                  {CALENDAR_CATEGORIES[t.category].icon} {t.title}
                </p>
                <p className="text-sm text-muted mt-1">{t.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={`/ogrod-w/${guide.monthSlug}`}
            className="rounded-full bg-primary text-white px-5 py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Poradnik — ogród w {month.nameGenitive}
          </Link>
          <Link
            href={`/kalendarz-ogrodnika/${guide.monthSlug}`}
            className="rounded-full border border-border bg-card px-5 py-2 text-sm hover:border-primary transition-colors"
          >
            Kalendarz ogrodnika
          </Link>
          <Link
            href="/problemy-ogrodowe"
            className="rounded-full border border-border bg-card px-5 py-2 text-sm hover:border-primary transition-colors"
          >
            Problemy ogrodowe
          </Link>
        </div>

        <section>
          <h2 className="text-lg font-bold text-primary-dark mb-3">Wszystkie miesiące</h2>
          <div className="flex flex-wrap gap-2">
            {SEASONAL_GUIDES.map((g) => (
              <Link
                key={g.pathSlug}
                href={`/ogrod-w/${g.pathSlug}`}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                  g.pathSlug === guide.monthSlug
                    ? "bg-primary text-white border-primary"
                    : "bg-card border-border hover:border-primary"
                }`}
              >
                {g.h1}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
