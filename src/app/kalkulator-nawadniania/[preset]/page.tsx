import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IrrigationCalculator } from "@/components/calculators/IrrigationCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getIrrigationPreset,
  getAllIrrigationPresetSlugs,
} from "@/lib/constants/irrigation-presets";
import { PresetJsonLd } from "@/components/PresetJsonLd";
import {
  irrigationPageMetadata,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-nawadniania")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllIrrigationPresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getIrrigationPreset(slug);
  if (!preset) return {};

  return irrigationPageMetadata(
    preset.title,
    preset.description,
    preset.keywords,
    `/kalkulator-nawadniania/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getIrrigationPreset(slug);
  if (!preset) notFound();

  return (
    <>
      <PresetJsonLd
        parentSlug="kalkulator-nawadniania"
        parentLabel="Kalkulator nawadniania"
        presetTitle={preset.title}
        presetDescription={preset.description}
        presetPath={`/kalkulator-nawadniania/${slug}`}
        faq={preset.faq}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Nawadnianie", href: "/kalkulator-nawadniania" },
            { label: preset.title },
          ]}
        />

        <CalculatorHero
          calc={calc}
          title={preset.h1 ?? preset.title}
          description={preset.description}
        />

        <IrrigationCalculator preset={preset} />

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
        <RelatedTools currentSlug="kalkulator-nawadniania" hidePresets />
      </div>
    </>
  );
}
