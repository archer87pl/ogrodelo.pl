import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GardenCalendar } from "@/components/calculators/GardenCalendar";
import { GardenCalendarTaskDetail } from "@/components/calculators/GardenCalendarTaskDetail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { getCalendarMonth } from "@/lib/constants/garden-calendar";
import {
  getCalendarTask,
  getAllCalendarPresetSlugs,
  getCalendarPreset,
} from "@/lib/constants/calendar-task-presets";
import {
  presetPageMetadata,
  jsonLdBreadcrumb,
  jsonLdFAQ,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalendarz-ogrodnika")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllCalendarPresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getCalendarPreset(slug);
  if (!preset) return {};

  if (preset.type === "month") {
    const month = getCalendarMonth(slug);
    if (!month) return {};
    return presetPageMetadata(
      month.title,
      month.description,
      month.keywords,
      `/kalendarz-ogrodnika/${slug}`
    );
  }

  const task = getCalendarTask(slug);
  if (!task) return {};
  return presetPageMetadata(
    task.title,
    task.description,
    task.keywords,
    `/kalendarz-ogrodnika/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getCalendarPreset(slug);
  if (!preset) notFound();

  if (preset.type === "task") {
    const task = getCalendarTask(slug);
    if (!task) notFound();

    const breadcrumbs = [
      { label: "Strona główna", href: "/" },
      { label: "Kalendarz ogrodnika", href: "/kalendarz-ogrodnika" },
      { label: task.title },
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              jsonLdBreadcrumb([
                { name: "Strona główna", url: "https://ogrodelo.pl" },
                {
                  name: "Kalendarz ogrodnika",
                  url: "https://ogrodelo.pl/kalendarz-ogrodnika",
                },
                {
                  name: task.title,
                  url: `https://ogrodelo.pl/kalendarz-ogrodnika/${slug}`,
                },
              ])
            ),
          }}
        />
        {task.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdFAQ(task.faq)),
            }}
          />
        )}

        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <Breadcrumbs items={breadcrumbs} />

          <CalculatorHero
            calc={calc}
            title={task.h1 ?? task.title}
            description={task.description}
          />

          <GardenCalendarTaskDetail task={task} />

          {task.faq.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
              <FAQAccordion items={task.faq} />
            </section>
          )}

          <RelatedTools currentSlug="kalendarz-ogrodnika" hidePresets />
        </div>
      </>
    );
  }

  const month = getCalendarMonth(slug);
  if (!month) notFound();

  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Kalendarz ogrodnika", href: "/kalendarz-ogrodnika" },
    { label: month.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: "https://ogrodelo.pl" },
              {
                name: "Kalendarz ogrodnika",
                url: "https://ogrodelo.pl/kalendarz-ogrodnika",
              },
              {
                name: month.name,
                url: `https://ogrodelo.pl/kalendarz-ogrodnika/${slug}`,
              },
            ])
          ),
        }}
      />
      {month.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFAQ(month.faq)),
          }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          title={month.h1 ?? month.title}
          description={month.description}
        />

        <GardenCalendar preset={month} />

        {month.sections.length > 0 && (
          <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-8 text-muted leading-relaxed">
            {month.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-primary-dark mb-3">
                  {s.heading}
                </h2>
                <p>{s.content}</p>
              </section>
            ))}
          </article>
        )}

        {month.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">
              Pytania o prace ogrodowe w {month.nameGenitive}
            </h2>
            <FAQAccordion items={month.faq} />
          </section>
        )}

        <RelatedTools currentSlug="kalendarz-ogrodnika" hidePresets />
      </div>
    </>
  );
}
