import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FloweringPlantCatalog } from "@/components/calculators/FloweringPlantCatalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getFloweringPreset,
  getAllFloweringPresetSlugs,
  FLOWERING_PRESETS_UNIQUE,
} from "@/lib/constants/flowering-catalog-presets";
import { PresetJsonLd } from "@/components/PresetJsonLd";
import { presetPageMetadata } from "@/lib/seo";

const calc = getCalculatorBySlug("katalog-kwitnienia")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllFloweringPresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getFloweringPreset(slug);
  if (!preset) return {};

  return presetPageMetadata(
    preset.title,
    preset.description,
    preset.keywords,
    `/katalog-kwitnienia/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getFloweringPreset(slug);
  if (!preset) notFound();

  const relatedPresets = FLOWERING_PRESETS_UNIQUE.filter(
    (p) => p.slug !== slug && p.filters.months?.some((m) => preset.filters.months?.includes(m))
  ).slice(0, 6);

  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Katalog kwitnienia", href: "/katalog-kwitnienia" },
    { label: preset.title.split("—")[0]?.trim() ?? preset.title },
  ];

  return (
    <>
      <PresetJsonLd
        parentSlug="katalog-kwitnienia"
        parentLabel="Katalog kwitnienia"
        presetTitle={preset.title}
        presetDescription={preset.description}
        presetPath={`/katalog-kwitnienia/${slug}`}
        faq={preset.faq.length > 0 ? preset.faq : undefined}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          title={preset.h1 ?? preset.title}
          description={preset.description}
        />

        <FloweringPlantCatalog preset={preset} />

        {preset.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
            <FAQAccordion items={preset.faq} />
          </section>
        )}

        {relatedPresets.length > 0 && (
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-primary-dark mb-4">
              Powiązane katalogi
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedPresets.map((p) => (
                <Link
                  key={p.slug}
                  href={`/katalog-kwitnienia/${p.slug}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
                >
                  {p.title.split("—")[0]?.trim()}
                </Link>
              ))}
            </div>
          </section>
        )}

        <RelatedTools currentSlug="katalog-kwitnienia" hidePresets />
      </div>
    </>
  );
}
