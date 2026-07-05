import type { ReactNode } from "react";
import type { CalculatorMeta } from "@/lib/constants/calculators";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";
import { CalculatorHero } from "@/components/CalculatorHero";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQAccordion } from "@/components/FAQAccordion";
import { jsonLdCalculator, jsonLdBreadcrumb, jsonLdFAQ } from "@/lib/seo";

import { SITE_URL } from "@/lib/seo";

interface CalculatorLayoutProps {
  calc: CalculatorMeta;
  children: ReactNode;
  seoContent?: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: { question: string; answer: string }[];
}

function toAbsoluteUrl(href: string): string {
  if (href.startsWith("http")) return href;
  if (href === "/") return SITE_URL;
  return `${SITE_URL}${href}`;
}

export function CalculatorLayout({
  calc,
  children,
  seoContent,
  title,
  description,
  breadcrumbs,
  faqs,
}: CalculatorLayoutProps) {
  const visualBreadcrumbs: BreadcrumbItem[] =
    breadcrumbs ?? [
      { label: "Strona główna", href: "/" },
      { label: calc.shortTitle },
    ];

  const structuredBreadcrumbs = jsonLdBreadcrumb(
    visualBreadcrumbs.map((b) => ({
      name: b.label,
      url: b.href
        ? toAbsoluteUrl(b.href)
        : toAbsoluteUrl(`/${calc.slug}`),
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator(calc)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredBreadcrumbs),
        }}
      />
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFAQ(faqs)),
          }}
        />
      )}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={visualBreadcrumbs} />

        <CalculatorHero calc={calc} title={title} description={description} />

        {children}

        {seoContent && (
          <article className="mt-12 sm:mt-16 prose prose-green max-w-none border-t border-border pt-8 sm:pt-12 text-muted leading-relaxed">
            {seoContent}
          </article>
        )}

        {faqs && faqs.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <FAQAccordion items={faqs} />
          </div>
        )}

        <RelatedTools currentSlug={calc.slug} />
      </div>
    </>
  );
}
