import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HedgeCalculator } from "@/components/calculators/HedgeCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getHedgePreset,
  getAllHedgePresetSlugs,
} from "@/lib/constants/hedge-presets";
import {
  irrigationPageMetadata,
  jsonLdBreadcrumb,
  jsonLdFAQ,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-zywoplotu")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllHedgePresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getHedgePreset(slug);
  if (!preset) return {};

  return irrigationPageMetadata(
    preset.title,
    preset.description,
    preset.keywords,
    `/kalkulator-zywoplotu/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getHedgePreset(slug);
  if (!preset) notFound();

  const breadcrumb = jsonLdBreadcrumb([
    { name: "Strona główna", url: "https://ogrodelo.pl" },
    { name: "Kalkulator żywopłotu", url: "https://ogrodelo.pl/kalkulator-zywoplotu" },
    { name: preset.title, url: `https://ogrodelo.pl/kalkulator-zywoplotu/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
            { label: "Żywopłot", href: "/kalkulator-zywoplotu" },
            { label: preset.title },
          ]}
        />

        <CalculatorHero
          calc={calc}
          title={preset.h1 ?? preset.title}
          description={preset.description}
        />

        <HedgeCalculator preset={preset} />

        {preset.sections.length > 0 && (
          <article className="mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 space-y-8 text-muted leading-relaxed">
            {preset.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-primary-dark mb-3">
                  {s.heading}
                </h2>
                <p>{s.content}</p>
              </section>
            ))}
          </article>
        )}
      </div>
    </>
  );
}
