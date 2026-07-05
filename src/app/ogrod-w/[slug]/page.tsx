import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import {
  getSeasonalGuide,
  getCalendarMonthForGuide,
  getAllSeasonalGuideSlugs,
  SEASONAL_GUIDES,
} from "@/lib/constants/seasonal-guides";
import { CALENDAR_CATEGORIES } from "@/lib/constants/garden-calendar";
import { presetPageMetadata, jsonLdBreadcrumb, jsonLdFAQ, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSeasonalGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSeasonalGuide(slug);
  if (!guide) return {};

  return presetPageMetadata(guide.title, guide.description, guide.keywords, `/ogrod-w/${slug}`);
}

export default async function SeasonalGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getSeasonalGuide(slug);
  const month = getCalendarMonthForGuide(slug);
  if (!guide || !month) notFound();

  const path = `/ogrod-w/${slug}`;
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: guide.h1, url: `${SITE_URL}${path}` },
  ]);

  const highPriority = month.tasks.filter((t) => t.priority === "wysoki");
  const otherTasks = month.tasks.filter((t) => t.priority !== "wysoki");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {month.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(month.faq)) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: guide.h1 },
          ]}
        />

        <header className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">{guide.h1}</h1>
          <p className="mt-4 text-muted leading-relaxed">{month.intro}</p>
          <p className="mt-3 text-sm rounded-xl bg-accent/40 border border-border px-4 py-3 text-muted">
            🌡️ {guide.weatherNote}
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-primary-dark mb-3">Priorytety miesiąca</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {guide.highlights.map((h) => (
              <li
                key={h}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
              >
                ✓ {h}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-primary-dark mb-4">Harmonogram prac</h2>
          {highPriority.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-red-700 mb-2">Wysoki priorytet</h3>
              <ul className="space-y-3">
                {highPriority.map((t) => (
                  <li key={t.id} className="rounded-xl bg-red-50 border border-red-100 p-4">
                    <p className="font-medium text-foreground">
                      {CALENDAR_CATEGORIES[t.category].icon} {t.title}
                    </p>
                    <p className="text-sm text-muted mt-1">{t.description}</p>
                    {t.relatedLink && (
                      <Link
                        href={t.relatedLink.href}
                        className="text-sm text-primary mt-2 inline-block hover:underline"
                      >
                        {t.relatedLink.label} →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {otherTasks.length > 0 && (
            <ul className="space-y-2">
              {otherTasks.map((t) => (
                <li key={t.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-medium text-sm">
                    {CALENDAR_CATEGORIES[t.category].icon} {t.title}
                  </p>
                  <p className="text-xs text-muted mt-1">{t.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold text-primary-dark mb-3">Narzędzia na ten miesiąc</h2>
          <div className="flex flex-wrap gap-2">
            {guide.priorityTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
              >
                {t.label}
              </Link>
            ))}
            <Link
              href={`/kalendarz-ogrodnika/${slug}`}
              className="rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              Pełny kalendarz — {month.name}
            </Link>
          </div>
        </section>

        <nav className="mb-8 rounded-2xl border border-border bg-accent/30 p-5">
          <p className="text-sm font-semibold text-primary-dark mb-3">Inne miesiące</p>
          <div className="flex flex-wrap gap-2">
            {SEASONAL_GUIDES.filter((g) => g.pathSlug !== slug).map((g) => (
              <Link
                key={g.pathSlug}
                href={`/ogrod-w/${g.pathSlug}`}
                className="rounded-full bg-card border border-border px-3 py-1 text-xs hover:border-primary transition-colors"
              >
                {g.h1}
              </Link>
            ))}
          </div>
        </nav>

        {month.faq.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
            <FAQAccordion items={month.faq} />
          </section>
        )}
      </div>
    </>
  );
}
