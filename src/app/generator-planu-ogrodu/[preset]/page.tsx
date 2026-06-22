import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GardenPlanGenerator } from "@/components/calculators/GardenPlanGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getGardenPlanPreset,
  getAllGardenPlanPresetSlugs,
} from "@/lib/constants/garden-plan-presets";
import { presetPageMetadata, jsonLdBreadcrumb, jsonLdFAQ } from "@/lib/seo";

const calc = getCalculatorBySlug("generator-planu-ogrodu")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllGardenPlanPresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getGardenPlanPreset(slug);
  if (!preset) return {};

  return presetPageMetadata(
    preset.title,
    preset.description,
    preset.keywords,
    `/generator-planu-ogrodu/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getGardenPlanPreset(slug);
  if (!preset) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: "https://ogrodelo.pl" },
              {
                name: "Generator planu ogrodu",
                url: "https://ogrodelo.pl/generator-planu-ogrodu",
              },
              {
                name: preset.title,
                url: `https://ogrodelo.pl/generator-planu-ogrodu/${slug}`,
              },
            ])
          ),
        }}
      />
      {preset.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(preset.faq)) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Generator planu", href: "/generator-planu-ogrodu" },
            { label: preset.title },
          ]}
        />

        <CalculatorHero
          calc={calc}
          title={preset.h1 ?? preset.title}
          description={preset.description}
        />

        <GardenPlanGenerator preset={preset} />

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
        <RelatedTools currentSlug="generator-planu-ogrodu" hidePresets />
      </div>
    </>
  );
}
