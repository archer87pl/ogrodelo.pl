import type { Metadata } from "next";
import type { CalculatorMeta } from "./constants/calculators";
import { CALCULATORS } from "./constants/calculators";

const SITE_URL = "https://ogrodelo.pl";
const SITE_NAME = "Ogrodelo.pl";

export function siteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Ogrodelo.pl — Darmowe kalkulatory ogrodowe",
      template: "%s | Ogrodelo.pl",
    },
    description:
      "Darmowe kalkulatory ogrodowe online: nawadnianie, żywopłot, wzrost roślin, nawożenie, deszczówka i więcej. Obliczenia dla polskiego klimatu — bez rejestracji.",
    keywords: [
      "kalkulator ogrodowy",
      "kalkulatory ogrodowe",
      "nawadnianie ogrodu",
      "żywopłot kalkulator",
      "wzrost roślin",
      "ogród kalkulator",
      "ogrodelo",
      "planowanie ogrodu",
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
      description:
        "Planuj ogród mądrze: kalendarz ogrodnika, nawadnianie, żywopłoty, wzrost roślin i 10 innych narzędzi.",
    },
    twitter: {
      card: "summary_large_image",
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
    },
  };
}

export function calculatorMetadata(calc: CalculatorMeta): Metadata {
  const url = `${SITE_URL}/${calc.slug}`;
  return {
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
      card: "summary",
      title: calc.title,
      description: calc.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function presetPageMetadata(
  title: string,
  description: string,
  keywords: string[],
  path: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
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
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/#kalkulatory`,
      },
      "query-input": "required name=search_term_string",
    },
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
