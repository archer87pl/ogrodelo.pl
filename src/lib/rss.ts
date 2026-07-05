import { SITE_URL } from "@/lib/seo";
import { CALCULATORS } from "@/lib/constants/calculators";
import { GARDEN_PROBLEMS } from "@/lib/constants/garden-problems";
import { SEASONAL_GUIDES } from "@/lib/constants/seasonal-guides";
import { FLOWERING_PLANTS_LIST } from "@/lib/constants/flowering-plants";
import { getPlantPageTitle, getPlantPageDescription, plantDetailPath } from "@/lib/flowering-plant-seo";

export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRssFeed(items: RssItem[]): string {
  const now = new Date().toUTCString();
  const channelItems = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ogrodelo.pl — narzędzia i poradniki ogrodowe</title>
    <link>${SITE_URL}</link>
    <description>Darmowe kalkulatory, poradniki sezonowe i encyklopedia roślin dla polskich ogrodników.</description>
    <language>pl-PL</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${channelItems}
  </channel>
</rss>`;
}

export function getRssItems(limit = 50): RssItem[] {
  const now = new Date();
  const items: RssItem[] = [];

  for (const p of GARDEN_PROBLEMS) {
    items.push({
      title: p.title,
      link: `${SITE_URL}/problemy-ogrodowe/${p.slug}`,
      description: p.description,
      pubDate: now,
    });
  }

  for (const g of SEASONAL_GUIDES) {
    items.push({
      title: g.title,
      link: `${SITE_URL}/ogrod-w/${g.pathSlug}`,
      description: g.description,
      pubDate: now,
    });
  }

  items.push({
    title: "Co robić w ogrodzie TERAZ",
    link: `${SITE_URL}/ogrod-teraz`,
    description: "Aktualne prace ogrodowe na bieżący miesiąc — priorytety i linki do kalkulatorów.",
    pubDate: now,
  });

  items.push({
    title: "Mapa stref mrozoodporności Polski — USDA",
    link: `${SITE_URL}/mapa-stref-mrozoodpornosci`,
    description:
      "Interaktywna mapa stref mrozoodporności dla 16 województw — dobierz rośliny do klimatu regionu.",
    pubDate: now,
  });

  for (const calc of CALCULATORS.filter((c) => c.featured)) {
    items.push({
      title: calc.title,
      link: `${SITE_URL}/${calc.slug}`,
      description: calc.description,
      pubDate: now,
    });
  }

  const recentPlants = FLOWERING_PLANTS_LIST.slice(-20);
  for (const plant of recentPlants) {
    items.push({
      title: getPlantPageTitle(plant),
      link: `${SITE_URL}${plantDetailPath(plant.id)}`,
      description: getPlantPageDescription(plant),
      pubDate: now,
    });
  }

  return items.slice(0, limit);
}
