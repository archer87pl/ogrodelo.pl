import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { CALCULATORS } from "@/lib/constants/calculators";
import { IRRIGATION_PRESETS } from "@/lib/constants/irrigation-presets";
import { HEDGE_PRESETS } from "@/lib/constants/hedge-presets";
import { GROWTH_PRESETS } from "@/lib/constants/growth-presets";
import { TREE_PRESETS } from "@/lib/constants/tree-presets";
import { SHRUB_PRESETS } from "@/lib/constants/shrub-presets";
import { GARDEN_PLAN_PRESETS } from "@/lib/constants/garden-plan-presets";
import { CALENDAR_MONTHS } from "@/lib/constants/garden-calendar";
import { CALENDAR_TASK_PRESETS } from "@/lib/constants/calendar-task-presets";
import { GARDEN_PROBLEMS } from "@/lib/constants/garden-problems";
import { SEASONAL_GUIDES } from "@/lib/constants/seasonal-guides";
import { FLOWERING_PRESETS_UNIQUE } from "@/lib/constants/flowering-catalog-presets";
import { MOWER_PRESETS } from "@/lib/constants/mower-presets";
import { FLOWERING_PLANTS_LIST } from "@/lib/constants/flowering-plants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

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
    ...GARDEN_PLAN_PRESETS.map((p) => ({
      url: `${base}/generator-planu-ogrodu/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...CALENDAR_MONTHS.map((m) => ({
      url: `${base}/kalendarz-ogrodnika/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    ...CALENDAR_TASK_PRESETS.map((t) => ({
      url: `${base}/kalendarz-ogrodnika/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...FLOWERING_PRESETS_UNIQUE.map((p) => ({
      url: `${base}/katalog-kwitnienia/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...FLOWERING_PLANTS_LIST.map((p) => ({
      url: `${base}/katalog-kwitnienia/roslina/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...MOWER_PRESETS.map((p) => ({
      url: `${base}/kalkulator-robota-koszacego/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/kalkulatory`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${base}/porownywarki`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${base}/rosliny`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${base}/problemy-ogrodowe`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...GARDEN_PROBLEMS.map((p) => ({
      url: `${base}/problemy-ogrodowe/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    ...SEASONAL_GUIDES.map((g) => ({
      url: `${base}/ogrod-w/${g.pathSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
    {
      url: `${base}/ogrod-teraz`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.92,
    },
    {
      url: `${base}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.3,
    },
    {
      url: `${base}/mapa-stref-mrozoodpornosci`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.92,
    },
  ];
}
