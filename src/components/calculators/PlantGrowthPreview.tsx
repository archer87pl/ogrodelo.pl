import Link from "next/link";
import { calculateGrowth } from "@/lib/calculators/growth";
import type { GrowthSpecies } from "@/lib/calculators/growth";
import { getPlantGrowthPresetSlug } from "@/lib/constants/plant-encyclopedia-meta";

interface PlantGrowthPreviewProps {
  plantId: string;
  species: GrowthSpecies;
  plantName: string;
}

export function PlantGrowthPreview({ plantId, species, plantName }: PlantGrowthPreviewProps) {
  const result = calculateGrowth({ species, saplingSize: "srednia" });
  const presetSlug = getPlantGrowthPresetSlug(plantId) ?? (species === "tui" ? "tuja" : species);
  const milestones = result.milestones.filter((m) => [1, 2, 5, 10].includes(m.years));

  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-bold text-primary-dark mb-2">Wzrost rok po roku</h2>
      <p className="text-sm text-muted mb-4">
        {result.speciesName} rośnie ok. {result.growthPerYear} cm rocznie — maks. wysokość ok.{" "}
        {result.maxHeight} cm. Szacunek dla sadzonki średniej (60 cm).
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[280px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold text-muted">Wiek</th>
              <th className="py-2 pr-4 font-semibold text-muted">Wysokość</th>
              {milestones.some((m) => m.crownWidth) && (
                <th className="py-2 font-semibold text-muted">Korona</th>
              )}
            </tr>
          </thead>
          <tbody>
            {milestones.map((m) => (
              <tr key={m.years} className="border-b border-border/60">
                <td className="py-2 pr-4 font-medium">{m.years} {m.years === 1 ? "rok" : m.years < 5 ? "lata" : "lat"}</td>
                <td className="py-2 pr-4">{Math.round(m.height)} cm</td>
                {milestones.some((x) => x.crownWidth) && (
                  <td className="py-2">{m.crownWidth ? `${Math.round(m.crownWidth)} cm` : "—"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        href={`/kalkulator-wzrostu/${presetSlug}`}
        className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
      >
        Pełny kalkulator wzrostu {plantName.toLowerCase()} →
      </Link>
    </section>
  );
}
