import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FloweringPlantDetail } from "@/components/calculators/FloweringPlantDetail";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  getFloweringPlantById,
  getAllFloweringPlantIds,
  getPlantPageTitle,
  getPlantPageDescription,
  getPlantPageKeywords,
  getPlantFaq,
  plantDetailPath,
  jsonLdFloweringPlant,
} from "@/lib/flowering-plant-seo";
import {
  presetPageMetadata,
  jsonLdBreadcrumb,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("katalog-kwitnienia")!;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFloweringPlantIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const plant = getFloweringPlantById(slug);
  if (!plant) return {};

  return presetPageMetadata(
    getPlantPageTitle(plant),
    getPlantPageDescription(plant),
    getPlantPageKeywords(plant),
    plantDetailPath(slug)
  );
}

export default async function PlantPage({ params }: PageProps) {
  const { slug } = await params;
  const plant = getFloweringPlantById(slug);
  if (!plant) notFound();

  const path = plantDetailPath(slug);
  const faq = getPlantFaq(plant);

  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Katalog kwitnienia", href: "/katalog-kwitnienia" },
    { label: plant.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFloweringPlant(plant, `${SITE_URL}${path}`)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              { name: "Katalog kwitnienia", url: `${SITE_URL}/katalog-kwitnienia` },
              { name: plant.name, url: `${SITE_URL}${path}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(faq)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-8">
          <p className="text-sm text-muted mb-2">
            {calc.icon} Katalog kwitnienia
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            {plant.name} — kiedy kwitnie?
          </h1>
          <p className="mt-2 text-muted italic">{plant.latinName}</p>
          <p className="mt-3 text-muted leading-relaxed max-w-3xl">
            {getPlantPageDescription(plant)}
          </p>
        </header>

        <FloweringPlantDetail plant={plant} />

        <section className="mt-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
          <FAQAccordion items={faq} />
        </section>

        <RelatedTools currentSlug="katalog-kwitnienia" hidePresets />
      </div>
    </>
  );
}
