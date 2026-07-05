import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GardenProblemDetail } from "@/components/garden-problems/GardenProblemDetail";
import {
  getGardenProblem,
  getAllGardenProblemSlugs,
} from "@/lib/constants/garden-problems";
import { presetPageMetadata, jsonLdBreadcrumb, jsonLdFAQ, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGardenProblemSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = getGardenProblem(slug);
  if (!problem) return {};

  return presetPageMetadata(
    problem.title,
    problem.description,
    problem.keywords,
    `/problemy-ogrodowe/${slug}`
  );
}

export default async function GardenProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = getGardenProblem(slug);
  if (!problem) notFound();

  const path = `/problemy-ogrodowe/${slug}`;
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: "Problemy ogrodowe", url: `${SITE_URL}/problemy-ogrodowe` },
    { name: problem.title, url: `${SITE_URL}${path}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {problem.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(problem.faq)) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Problemy ogrodowe", href: "/problemy-ogrodowe" },
            { label: problem.h1 ?? problem.title },
          ]}
        />

        <header className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
            {problem.h1 ?? problem.title}
          </h1>
          <p className="mt-3 text-muted">{problem.description}</p>
        </header>

        <GardenProblemDetail problem={problem} />

        {problem.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
            <FAQAccordion items={problem.faq} />
          </section>
        )}
      </div>
    </>
  );
}
