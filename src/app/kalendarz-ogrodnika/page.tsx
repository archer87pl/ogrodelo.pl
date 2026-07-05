import type { Metadata } from "next";
import Link from "next/link";
import { GardenCalendar } from "@/components/calculators/GardenCalendar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  CALENDAR_MONTHS,
  MAIN_CALENDAR_FAQ,
} from "@/lib/constants/garden-calendar";
import { CALENDAR_TASK_PRESETS } from "@/lib/constants/calendar-task-presets";
import {
  CALENDAR_REGIONS,
  getRegionalCalendarSlug,
} from "@/lib/constants/garden-calendar-regions";
import { MONTH_LABELS } from "@/lib/constants/flowering-plants";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalendarz-ogrodnika")!;

const calendarYear = new Date().getFullYear();

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Kalendarz ogrodnika na cały rok: cięcie jabłoni w styczniu, nawożenie hortensji w maju, wertykulacja trawnika. Harmonogram prac w ogrodzie dla polskiego klimatu.",
  keywords: [
    ...calc.keywords,
    `kalendarz ogrodnika ${calendarYear}`,
    "harmonogram prac ogrodowych",
    "co robić w ogrodzie",
    "wertykulacja trawnika kiedy",
    "nawożenie hortensji kiedy",
    "cięcie jabłoni kiedy",
  ],
};

export default function Page() {
  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Kalendarz ogrodnika" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator(calc)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              { name: "Kalendarz ogrodnika", url: `${SITE_URL}/kalendarz-ogrodnika` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(MAIN_CALENDAR_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          description="Harmonogram prac na 12 miesięcy — od zimowego cięcia owocówek po jesienne sadzenia. Dostosowany do polskiego klimatu."
        />

        <GardenCalendar />

        <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Kalendarz ogrodnika — miesiąc po miesiącu
            </h2>
            <p>
              Każdy miesiąc ma dedykowaną stronę z pełną listą zadań, poradami i
              linkami do kalkulatorów Ogrodelo.pl. Wybierz miesiąc, by zaplanować prace
              w ogrodzie.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {CALENDAR_MONTHS.map((month) => (
                <Link
                  key={month.slug}
                  href={`/kalendarz-ogrodnika/${month.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary">
                    {month.name}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2">{month.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Kalendarz według regionu
            </h2>
            <p className="text-muted mb-6 max-w-2xl">
              Północ, centrum, południe i góry — inne daty przymrozków i terminy siewu.
              Każdy region ma 12 stron miesięcznych.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {CALENDAR_REGIONS.map((region) => {
                const currentMonth = MONTH_LABELS[new Date().getMonth()];
                const href = `/kalendarz-ogrodnika/${getRegionalCalendarSlug(region.id, currentMonth.slug)}`;
                return (
                  <Link
                    key={region.id}
                    href={href}
                    className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary">
                      {region.name}
                    </p>
                    <p className="text-sm text-muted mt-1">
                      Strefa {region.zone} · ostatnie przymrozki: {region.avgLastFrost}
                    </p>
                    <p className="text-xs text-primary mt-2 font-medium">
                      {currentMonth.name} w regionie →
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Popularne prace — kiedy je wykonać?
            </h2>
            <p className="text-muted mb-6 max-w-2xl">
              Dedykowane poradniki z harmonogramem miesięcy, krokami i FAQ pod konkretne
              zadania ogrodowe.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CALENDAR_TASK_PRESETS.map((task) => (
                <Link
                  key={task.slug}
                  href={`/kalendarz-ogrodnika/${task.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary">
                    {task.title.split("?")[0]}
                  </p>
                  <p className="text-sm mt-1 line-clamp-2">{task.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Najczęściej szukane terminy
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <strong className="text-foreground">Wertykulacja trawnika</strong> —{" "}
                <Link
                  href="/kalendarz-ogrodnika/wertykulacja-trawnika"
                  className="text-primary hover:underline"
                >
                  poradnik
                </Link>
                , maj lub czerwiec
              </li>
              <li>
                <strong className="text-foreground">Nawożenie hortensji</strong> —{" "}
                <Link
                  href="/kalendarz-ogrodnika/nawozenie-hortensji"
                  className="text-primary hover:underline"
                >
                  harmonogram
                </Link>
                , kwiecień–maj
              </li>
              <li>
                <strong className="text-foreground">Cięcie jabłoni</strong> —{" "}
                <Link
                  href="/kalendarz-ogrodnika/przycinanie-jabloni"
                  className="text-primary hover:underline"
                >
                  kiedy przycinać
                </Link>
                , styczeń–luty
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">FAQ</h2>
            <FAQAccordion items={MAIN_CALENDAR_FAQ} />
          </section>
        </article>

        <RelatedTools currentSlug="kalendarz-ogrodnika" />
      </div>
    </>
  );
}
