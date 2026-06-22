import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreeComparator } from "@/components/calculators/TreeComparator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorHero } from "@/components/CalculatorHero";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import { getTreePreset, getAllTreePresetSlugs } from "@/lib/constants/tree-presets";
import { presetPageMetadata, jsonLdBreadcrumb, jsonLdFAQ } from "@/lib/seo";

const calc = getCalculatorBySlug("porownywarka-drzew")!;

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  return getAllTreePresetSlugs().map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getTreePreset(slug);
  if (!preset) return {};

  return presetPageMetadata(
    preset.title,
    preset.description,
    preset.keywords,
    `/porownywarka-drzew/${slug}`
  );
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getTreePreset(slug);
  if (!preset) notFound();

  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Porównywarka drzew", href: "/porownywarka-drzew" },
    { label: preset.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: "https://ogrodelo.pl" },
              { name: "Porównywarka drzew", url: "https://ogrodelo.pl/porownywarka-drzew" },
              {
                name: preset.title,
                url: `https://ogrodelo.pl/porownywarka-drzew/${slug}`,
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
        <Breadcrumbs items={breadcrumbs} />

        <CalculatorHero
          calc={calc}
          title={preset.h1 ?? preset.title}
          description={preset.description}
        />

        <TreeComparator preset={preset} />

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
