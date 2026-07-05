"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PROBLEM_PLANT_LABELS,
  diagnoseProblems,
  getDiagnosticSymptoms,
  type ProblemPlantType,
} from "@/lib/constants/garden-problems";

const PLANT_TYPES = Object.keys(PROBLEM_PLANT_LABELS) as ProblemPlantType[];

export function GardenDiagnosticWizard() {
  const [plantType, setPlantType] = useState<ProblemPlantType | "">("");
  const [symptom, setSymptom] = useState("");

  const symptoms = useMemo(
    () => (plantType ? getDiagnosticSymptoms(plantType) : []),
    [plantType]
  );

  const results = useMemo(() => {
    if (!plantType || !symptom) return [];
    return diagnoseProblems(plantType, symptom);
  }, [plantType, symptom]);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-bold text-primary-dark mb-2">Kreator diagnozy</h2>
      <p className="text-sm text-muted mb-5">
        Wybierz roślinę i objaw — pokażemy najbardziej prawdopodobne przyczyny i linki do poradników.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diag-plant" className="block text-sm font-medium text-foreground mb-1">
            Roślina
          </label>
          <select
            id="diag-plant"
            value={plantType}
            onChange={(e) => {
              setPlantType(e.target.value as ProblemPlantType);
              setSymptom("");
            }}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">— wybierz —</option>
            {PLANT_TYPES.map((t) => (
              <option key={t} value={t}>
                {PROBLEM_PLANT_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="diag-symptom" className="block text-sm font-medium text-foreground mb-1">
            Objaw
          </label>
          <select
            id="diag-symptom"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            disabled={!plantType}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
          >
            <option value="">— wybierz objaw —</option>
            {symptoms.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-primary-dark">
            Znalezione poradniki ({results.length}):
          </p>
          {results.map((p) => (
            <Link
              key={p.slug}
              href={`/problemy-ogrodowe/${p.slug}`}
              className="block rounded-xl border border-border bg-accent/30 px-4 py-3 hover:border-primary transition-colors"
            >
              <p className="font-medium text-foreground">{p.title}</p>
              <p className="text-xs text-muted mt-1 line-clamp-2">{p.intro}</p>
            </Link>
          ))}
        </div>
      )}

      {plantType && symptom && results.length === 0 && (
        <p className="mt-4 text-sm text-muted">
          Brak dopasowania — przejrzyj{" "}
          <Link href="#lista-problemow" className="text-primary hover:underline">
            pełną listę problemów
          </Link>{" "}
          lub skontaktuj się z lokalnym doradcą ogrodniczym.
        </p>
      )}
    </section>
  );
}
