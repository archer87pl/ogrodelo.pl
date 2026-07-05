import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HedgeCalculator } from "@/components/calculators/HedgeCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getHedgePreset,
  getAllHedgePresetSlugs,
} from "@/lib/constants/hedge-presets";
import { PresetJsonLd } from "@/components/PresetJsonLd";
import { irrigationPageMetadata } from "@/lib/seo";

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

  return (
    <>
      <PresetJsonLd
        parentSlug="kalkulator-zywoplotu"
        parentLabel="Kalkulator żywopłotu"
        presetTitle={preset.title}
        presetDescription={preset.description}
        presetPath={`/kalkulator-zywoplotu/${slug}`}
        faq={preset.faq.length > 0 ? preset.faq : undefined}
      />

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
        <RelatedTools currentSlug="kalkulator-zywoplotu" hidePresets />
      </div>
    </>
  );
}
