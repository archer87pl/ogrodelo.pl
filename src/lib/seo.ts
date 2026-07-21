import type { Metadata } from "next";
import type { CalculatorMeta } from "./constants/calculators";
import { CALCULATORS } from "./constants/calculators";
import { TOOL_COUNT } from "./constants/site-stats";

const DEFAULT_SITE_URL = "https://ogrodelo.pl";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
const SITE_NAME = "Ogrodelo.pl";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Darmowe kalkulatory ogrodowe`,
};

function withSocialImages(metadata: Metadata): Metadata {
  const ogImages = metadata.openGraph?.images ?? [DEFAULT_OG_IMAGE];
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      ...metadata.twitter,
      images: metadata.twitter?.images ?? [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function siteMetadata(): Metadata {
  return withSocialImages({
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Ogrodelo.pl — Darmowe kalkulatory ogrodowe",
      template: "%s | Ogrodelo.pl",
    },
    description:
      "Darmowe kalkulatory ogrodowe online: nawadnianie, żywopłot, wzrost roślin, katalog kwitnienia, kalendarz ogrodnika i więcej. Obliczenia dla polskiego klimatu — bez rejestracji.",
    keywords: [
      "kalkulator ogrodowy",
      "kalkulatory ogrodowe",
      "nawadnianie ogrodu",
      "żywopłot kalkulator",
      "wzrost roślin",
      "ogród kalkulator",
      "ogrodelo",
      "planowanie ogrodu",
      "katalog roślin kwitnących",
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "home and garden",
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: "Ogrodelo.pl — Darmowe kalkulatory ogrodowe",
      description: `Planuj ogród mądrze: ${TOOL_COUNT} darmowych narzędzi — kalendarz, katalog kwitnienia, nawadnianie, żywopłoty i generator planu.`,
    },
    twitter: {
      title: "Ogrodelo.pl — Kalkulatory ogrodowe",
      description:
        "Darmowe kalkulatory ogrodowe dla polskich ogrodników — nawadnianie, żywopłot, wzrost roślin i więcej.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
      types: {
        "application/rss+xml": `${SITE_URL}/feed.xml`,
      },
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
  });
}

export function calculatorMetadata(calc: CalculatorMeta): Metadata {
  const url = `${SITE_URL}/${calc.slug}`;
  return withSocialImages({
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: calc.title,
      description: calc.description,
      url,
      type: "website",
      locale: "pl_PL",
      siteName: SITE_NAME,
    },
    twitter: {
      title: calc.title,
      description: calc.description,
    },
    alternates: {
      canonical: url,
    },
  });
}

export function presetPageMetadata(
  title: string,
  description: string,
  keywords: string[],
  path: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  return withSocialImages({
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "pl_PL",
      siteName: SITE_NAME,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  });
}

export function privacyPageMetadata(): Metadata {
  const url = `${SITE_URL}/polityka-prywatnosci`;
  return withSocialImages({
    title: "Polityka prywatności",
    description:
      "Polityka prywatności serwisu Ogrodelo.pl — informacje o plikach cookies, analityce i przetwarzaniu danych.",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Polityka prywatności | Ogrodelo.pl",
      description: "Zasady przetwarzania danych i cookies w serwisie Ogrodelo.pl.",
      url,
      type: "website",
      locale: "pl_PL",
      siteName: SITE_NAME,
    },
    twitter: {
      title: "Polityka prywatności | Ogrodelo.pl",
      description: "Zasady przetwarzania danych i cookies w serwisie Ogrodelo.pl.",
    },
    alternates: {
      canonical: url,
    },
  });
}

/** @deprecated Use presetPageMetadata */
export const irrigationPageMetadata = presetPageMetadata;

export function jsonLdWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Darmowe kalkulatory ogrodowe do planowania nawadniania, żywopłotów, wzrostu roślin i więcej.",
    inLanguage: "pl-PL",
  };
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: "Darmowe kalkulatory ogrodowe dla ogrodników w Polsce.",
    inLanguage: "pl-PL",
  };
}

export function jsonLdCalculatorList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kalkulatory ogrodowe Ogrodelo.pl",
    description: "Lista darmowych kalkulatorów ogrodowych",
    numberOfItems: CALCULATORS.length,
    itemListElement: CALCULATORS.map((calc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: calc.title,
      url: `${SITE_URL}/${calc.slug}`,
      description: calc.description,
    })),
  };
}

export function jsonLdCalculator(calc: CalculatorMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calc.title,
    description: calc.description,
    url: `${SITE_URL}/${calc.slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
    },
    inLanguage: "pl-PL",
    isAccessibleForFree: true,
  };
}

export function jsonLdPresetWebApplication(
  parentCalc: CalculatorMeta,
  presetTitle: string,
  presetDescription: string,
  path: string
) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: presetTitle,
    description: presetDescription,
    url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    inLanguage: "pl-PL",
    isPartOf: {
      "@type": "WebApplication",
      name: parentCalc.title,
      url: `${SITE_URL}/${parentCalc.slug}`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
    },
  };
}

export function presetBreadcrumbJsonLd(
  parentSlug: string,
  parentLabel: string,
  presetTitle: string,
  path: string
) {
  return jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: parentLabel, url: `${SITE_URL}/${parentSlug}` },
    { name: presetTitle, url: `${SITE_URL}${path}` },
  ]);
}

export function jsonLdFAQ(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function jsonLdBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function breadcrumbItemsFromPath(
  segments: { name: string; path: string }[]
) {
  return [
    { name: "Strona główna", url: SITE_URL },
    ...segments.map((s) => ({ name: s.name, url: `${SITE_URL}${s.path}` })),
  ];
}
