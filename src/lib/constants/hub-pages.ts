import { CALCULATORS } from "./calculators";

const COMPARATOR_SLUGS = new Set(["porownywarka-drzew", "porownywarka-krzewow"]);

const PLANTS_SLUGS = new Set([
  "katalog-kwitnienia",
  "rosliny-bezpieczne-dla-zwierzat",
  "alternatywy-dla-tui",
  "kalkulator-wzrostu",
  "zgadnij-rosline",
]);

export const CALCULATOR_HUB_SLUGS = CALCULATORS.filter(
  (c) => !COMPARATOR_SLUGS.has(c.slug) && !PLANTS_SLUGS.has(c.slug)
).map((c) => c.slug);

export const COMPARATOR_HUB_SLUGS = [...COMPARATOR_SLUGS];

export const PLANTS_HUB_SLUGS = [...PLANTS_SLUGS];
