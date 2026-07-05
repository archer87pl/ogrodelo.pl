import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  jsonLdFAQ,
  jsonLdPresetWebApplication,
  presetBreadcrumbJsonLd,
} from "@/lib/seo";

interface PresetJsonLdProps {
  parentSlug: string;
  parentLabel: string;
  presetTitle: string;
  presetDescription: string;
  presetPath: string;
  faq?: { question: string; answer: string }[];
}

export function PresetJsonLd({
  parentSlug,
  parentLabel,
  presetTitle,
  presetDescription,
  presetPath,
  faq,
}: PresetJsonLdProps) {
  const calc = getCalculatorBySlug(parentSlug)!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdPresetWebApplication(calc, presetTitle, presetDescription, presetPath)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            presetBreadcrumbJsonLd(parentSlug, parentLabel, presetTitle, presetPath)
          ),
        }}
      />
      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(faq)) }}
        />
      )}
    </>
  );
}
