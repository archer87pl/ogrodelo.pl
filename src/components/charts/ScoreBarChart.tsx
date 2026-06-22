interface ScoreBarChartProps {
  scoresA: { label: string; value: number }[];
  scoresB: { label: string; value: number }[];
  labelA: string;
  labelB: string;
  ariaLabel?: string;
}

export function ScoreBarChart({
  scoresA,
  scoresB,
  labelA,
  labelB,
  ariaLabel = "Dopasowanie drzewa do warunków ogrodu",
}: ScoreBarChartProps) {
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

      <div className="space-y-3">
        {scoresA.map((sa, i) => {
          const sb = scoresB[i]!;
          return (
            <div key={sa.label}>
              <p className="text-sm font-medium text-foreground mb-1.5">{sa.label}</p>
              <div className="grid grid-cols-2 gap-3">
                <ScoreBar value={sa.value} variant="a" />
                <ScoreBar value={sb.value} variant="b" />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted mt-3">Wynik 0–10: im wyżej, tym lepsze dopasowanie do scenariusza</p>
    </div>
  );
}

function ScoreBar({ value, variant }: { value: number; variant: "a" | "b" }) {
  const pct = (value / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-7 bg-accent rounded-md overflow-hidden">
        <div
          className={`h-full rounded-md flex items-center justify-end pr-2 text-xs font-semibold text-white ${
            variant === "a" ? "bg-primary-dark" : "bg-primary-light"
          }`}
          style={{ width: `${Math.max(pct, 18)}%` }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
