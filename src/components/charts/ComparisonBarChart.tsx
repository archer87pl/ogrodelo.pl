import type { BarMetric } from "@/lib/calculators/tree-comparator";

interface ComparisonBarChartProps {
  metrics: BarMetric[];
  labelA: string;
  labelB: string;
  ariaLabel?: string;
}

export function ComparisonBarChart({
  metrics,
  labelA,
  labelB,
  ariaLabel = "Porównanie parametrów drzew",
}: ComparisonBarChartProps) {
  return (
    <div role="img" aria-label={ariaLabel}>
      <div className="flex gap-4 mb-4 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary-dark" />
          {labelA}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary-light" />
          {labelB}
        </span>
      </div>

      <div className="space-y-4">
        {metrics.map((m) => {
          const max = Math.max(m.valueA, m.valueB, 1);
          const pctA = (m.valueA / max) * 100;
          const pctB = (m.valueB / max) * 100;
          const winnerA =
            m.higherIsBetter !== false
              ? m.valueA >= m.valueB
              : m.valueA <= m.valueB;
          const winnerB = !winnerA && m.valueA !== m.valueB;

          return (
            <div key={m.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">{m.label}</span>
                <span className="text-muted text-xs">
                  {m.valueA}
                  {m.unit ? ` ${m.unit}` : ""} vs {m.valueB}
                  {m.unit ? ` ${m.unit}` : ""}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-6 bg-accent rounded-md overflow-hidden relative">
                  <div
                    className={`h-full rounded-md transition-all ${
                      winnerA ? "bg-primary-dark" : "bg-primary/40"
                    }`}
                    style={{ width: `${pctA}%` }}
                  />
                </div>
                <div className="h-6 bg-accent rounded-md overflow-hidden relative">
                  <div
                    className={`h-full rounded-md transition-all ${
                      winnerB ? "bg-primary-light" : "bg-primary/25"
                    }`}
                    style={{ width: `${pctB}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
