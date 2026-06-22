import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/constants/calculators";
import { IRRIGATION_PRESETS } from "@/lib/constants/irrigation-presets";
import { HEDGE_PRESETS } from "@/lib/constants/hedge-presets";
import { GROWTH_PRESETS } from "@/lib/constants/growth-presets";
import { TREE_PRESETS } from "@/lib/constants/tree-presets";
import { SHRUB_PRESETS } from "@/lib/constants/shrub-presets";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ogrodelo.pl";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CALCULATORS.map((c) => ({
      url: `${base}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: c.featured ? 0.9 : 0.8,
    })),
    ...IRRIGATION_PRESETS.map((p) => ({
      url: `${base}/kalkulator-nawadniania/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...HEDGE_PRESETS.map((p) => ({
      url: `${base}/kalkulator-zywoplotu/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...GROWTH_PRESETS.map((p) => ({
      url: `${base}/kalkulator-wzrostu/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...TREE_PRESETS.map((p) => ({
      url: `${base}/porownywarka-drzew/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    ...SHRUB_PRESETS.map((p) => ({
      url: `${base}/porownywarka-krzewow/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
  ];
}
