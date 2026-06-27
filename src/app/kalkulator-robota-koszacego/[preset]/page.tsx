import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MowerCalculator } from "@/components/calculators/MowerCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getMowerPreset,
  getAllMowerPresetSlugs,
  MOWER_PRESETS,
} from "@/lib/constants/mower-presets";
import {
  presetPageMetadata,
  jsonLdBreadcrumb,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-robota-koszacego")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllMowerPresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getMowerPreset(slug);
  if (!preset) return {};

  return presetPageMetadata(
    preset.title,
    preset.description,
    preset.keywords,
    `/kalkulator-robota-koszacego/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getMowerPreset(slug);
  if (!preset) notFound();

  const relatedPresets = MOWER_PRESETS.filter(
    (p) =>
      p.slug !== slug &&
      (p.defaults.area === preset.defaults.area ||
        p.slug.includes("oplacalnosc") ||
        p.slug.includes("montaz"))
  ).slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              {
                name: "Robot koszący",
                url: `${SITE_URL}/kalkulator-robota-koszacego`,
              },
              {
                name: preset.title,
                url: `${SITE_URL}/kalkulator-robota-koszacego/${slug}`,
              },
            ])
          ),
        }}
      />
      {preset.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFAQ(preset.faq)),
          }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Robot koszący", href: "/kalkulator-robota-koszacego" },
            { label: preset.shortLabel },
          ]}
        />

        <CalculatorHero
          calc={calc}
          title={preset.h1 ?? preset.title}
          description={preset.description}
        />

        <MowerCalculator preset={preset} />

        {preset.sections.length > 0 && (
          <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-8 text-muted leading-relaxed">
            {preset.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-primary-dark mb-3">{s.heading}</h2>
                <p>{s.content}</p>
              </section>
            ))}
          </article>
        )}

        {preset.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
            <FAQAccordion items={preset.faq} />
          </section>
        )}

        {relatedPresets.length > 0 && (
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-primary-dark mb-4">
              Powiązane poradniki
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedPresets.map((p) => (
                <Link
                  key={p.slug}
                  href={`/kalkulator-robota-koszacego/${p.slug}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
                >
                  {p.shortLabel}
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedTools currentSlug="kalkulator-robota-koszacego" hidePresets />
      </div>
    </>
  );
}
