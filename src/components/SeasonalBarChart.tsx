interface SeasonalBarChartProps {
  data: {
    label: string;
    value: number;
    sublabel?: string;
    active?: boolean;
  }[];
  unit?: string;
  hint?: string;
  ariaLabel?: string;
}

const BAR_AREA_PX = 140;

export function SeasonalBarChart({
  data,
  unit = "l/tydz.",
  hint,
  ariaLabel = "Wykres słupkowy",
}: SeasonalBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div>
      <div
        className="flex items-end gap-1 sm:gap-1.5 border-b border-border/60 pb-0"
        style={{ height: BAR_AREA_PX + 28 }}
        role="img"
        aria-label={ariaLabel}
      >
        {data.map((d) => {
          const ratio = d.value / max;
          const barPx = Math.round(ratio * BAR_AREA_PX);
          const displayHeight = d.value > 0 ? Math.max(barPx, 6) : 2;

          return (
            <div
              key={d.label}
              className="flex-1 flex flex-col items-center justify-end h-full min-w-0 group"
              title={`${d.label}: ${d.value.toLocaleString("pl-PL")} ${unit}${d.sublabel ? ` (${d.sublabel})` : ""}`}
            >
              <span
                className={`text-[9px] sm:text-[10px] font-medium mb-1 leading-none transition-opacity ${
                  d.active
                    ? "text-primary-dark opacity-100"
                    : "text-muted opacity-0 sm:group-hover:opacity-100"
                }`}
              >
                {d.value > 0 ? d.value.toLocaleString("pl-PL") : "—"}
              </span>
              <div
                className={`w-full rounded-t-sm sm:rounded-t transition-colors ${
                  d.active
                    ? "bg-primary"
                    : "bg-primary/45 group-hover:bg-primary/65"
                }`}
                style={{ height: displayHeight }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 sm:gap-1.5 mt-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center min-w-0">
            <span
              className={`text-[9px] sm:text-[10px] block truncate ${
                d.active ? "font-semibold text-primary-dark" : "text-muted"
              }`}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>

      {hint && <p className="text-xs text-muted mt-2">{hint}</p>}
    </div>
  );
}
