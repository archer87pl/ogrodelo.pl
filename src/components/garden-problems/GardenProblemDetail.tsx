import Link from "next/link";
import type { GardenProblem, CauseProbability } from "@/lib/constants/garden-problems";

const PROBABILITY_STYLES: Record<CauseProbability, string> = {
  wysokie: "bg-red-100 text-red-800",
  srednie: "bg-amber-100 text-amber-800",
  niskie: "bg-slate-100 text-slate-700",
};

const PROBABILITY_LABELS: Record<CauseProbability, string> = {
  wysokie: "Wysokie prawdopodobieństwo",
  srednie: "Średnie",
  niskie: "Niskie",
};

interface GardenProblemDetailProps {
  problem: GardenProblem;
}

export function GardenProblemDetail({ problem }: GardenProblemDetailProps) {
  return (
    <div className="space-y-8">
      <p className="text-muted leading-relaxed">{problem.intro}</p>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-bold text-primary-dark mb-4">Możliwe przyczyny</h2>
        <ul className="space-y-4">
          {problem.causes.map((c) => (
            <li key={c.name} className="rounded-xl bg-accent/30 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold text-foreground">{c.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${PROBABILITY_STYLES[c.probability]}`}
                >
                  {PROBABILITY_LABELS[c.probability]}
                </span>
              </div>
              <p className="text-sm text-muted">{c.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-primary-dark mb-3">Plan działania</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted">
          {problem.actionPlan.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-bold text-primary-dark mb-3">Profilaktyka</h2>
        <ul className="list-disc list-inside space-y-1 text-muted">
          {problem.prevention.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>

      {problem.relatedTools.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-primary-dark mb-3">Powiązane narzędzia</h2>
          <div className="flex flex-wrap gap-2">
            {problem.relatedTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
