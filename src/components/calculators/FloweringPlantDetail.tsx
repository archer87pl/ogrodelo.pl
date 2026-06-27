import Link from "next/link";
import {
  MONTH_LABELS,
  PLANT_CATEGORIES,
  FLOWER_COLORS,
  LIGHT_LABELS,
  type FloweringPlant,
} from "@/lib/constants/flowering-plants";
import {
  formatPlantBloomPeriod,
  getPlantPeakMonths,
  getPlantTraits,
  getPlantScentLabel,
  getPlantSeoParagraphs,
  getRelatedFloweringPlants,
  getPlantMonthCatalogLinks,
  plantDetailPath,
} from "@/lib/flowering-plant-seo";

interface FloweringPlantDetailProps {
  plant: FloweringPlant;
}

export function FloweringPlantDetail({ plant }: FloweringPlantDetailProps) {
  const cat = PLANT_CATEGORIES[plant.category];
  const traits = getPlantTraits(plant);
  const peakMonths = getPlantPeakMonths(plant);
  const seoParagraphs = getPlantSeoParagraphs(plant);
  const related = getRelatedFloweringPlants(plant);
  const monthLinks = getPlantMonthCatalogLinks(plant);

  const metrics: { label: string; value: string }[] = [
    { label: "Rodzaj", value: `${cat.icon} ${cat.label}` },
    { label: "Nazwa łacińska", value: plant.latinName },
    { label: "Okres kwitnienia", value: formatPlantBloomPeriod(plant) },
    {
      label: "Szczyt kwitnienia",
      value: peakMonths.map((n) => MONTH_LABELS.find((m) => m.num === n)?.name).join(", "),
    },
    {
      label: "Kolor kwiatów",
      value: plant.colors.map((c) => FLOWER_COLORS[c].label).join(", "),
    },
    { label: "Zapach", value: getPlantScentLabel(plant) },
    { label: "Wysokość", value: plant.height },
    { label: "Nasłonecznienie", value: plant.light.map((l) => LIGHT_LABELS[l]).join(", ") },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary-dark">
          {cat.icon} {cat.label}
        </span>
        {traits.map((t) => (
          <span
            key={t.label}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted"
          >
            {t.icon} {t.label}
          </span>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-bold text-primary-dark mb-4">Metryka kwitnienia</h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          {metrics.map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-accent/40 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-bold text-primary-dark mb-4">Kalendarz kwitnienia I–XII</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {MONTH_LABELS.map((m) => {
              const intensity = plant.bloomMonths[m.num];
              return (
                <div
                  key={m.num}
                  className={`flex flex-col items-center w-12 sm:w-14 rounded-lg py-2 ${
                    intensity ? "bg-primary/15" : "bg-accent/40"
                  }`}
                >
                  <span className="text-xs font-semibold text-muted">{m.short}</span>
                  <span className="text-lg mt-1">{intensity ? "🌸" : "·"}</span>
                  <span className="text-[10px] text-muted mt-1 hidden sm:block">{m.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          Pełne kwitnienie (szczyt) i okresy z pojedynczymi kwiatami — zgodnie z polskim klimatem
          umiarkowanym.
        </p>
      </section>

      <section className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-primary-dark not-prose">Opis i uprawa</h2>
        {seoParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {monthLinks.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-primary-dark mb-3">Katalog według miesiąca</h2>
          <div className="flex flex-wrap gap-2">
            {monthLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {plant.relatedLink && (
        <p className="text-sm">
          <Link
            href={plant.relatedLink.href}
            className="text-primary font-medium hover:underline"
          >
            {plant.relatedLink.label} →
          </Link>
        </p>
      )}

      {related.length > 0 && (
        <section className="border-t border-border pt-8">
          <h2 className="text-lg font-bold text-primary-dark mb-4">Podobne rośliny</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                href={plantDetailPath(p.id)}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
              >
                <p className="font-semibold text-foreground group-hover:text-primary">{p.name}</p>
                <p className="text-xs text-muted mt-1">
                  {PLANT_CATEGORIES[p.category].icon}{" "}
                  {formatPlantBloomPeriod(p)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-sm">
        <Link href="/katalog-kwitnienia" className="text-primary font-medium hover:underline">
          ← Wróć do katalogu kwitnienia
        </Link>
      </p>
    </div>
  );
}
