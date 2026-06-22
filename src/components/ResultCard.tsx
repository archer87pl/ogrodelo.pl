interface ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export function ResultCard({ label, value, unit, highlight }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-primary bg-accent"
          : "border-border bg-card"
      }`}
    >
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${highlight ? "text-primary-dark" : "text-foreground"}`}>
        {value}
        {unit && (
          <span className="ml-1 text-base font-normal text-muted">{unit}</span>
        )}
      </p>
    </div>
  );
}

interface TipsListProps {
  tips: string[];
}

export function TipsList({ tips }: TipsListProps) {
  return (
    <div className="rounded-xl border border-border bg-accent/50 p-5">
      <h3 className="font-semibold text-primary-dark mb-3">💡 Wskazówki</h3>
      <ul className="space-y-2 text-sm text-muted">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary shrink-0">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
