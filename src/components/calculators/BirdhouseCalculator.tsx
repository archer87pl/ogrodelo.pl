"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateBirdhouses,
  type Surroundings,
} from "@/lib/calculators/birdhouses";

export function BirdhouseCalculator() {
  const [area, setArea] = useState(600);
  const [tallTrees, setTallTrees] = useState(2);
  const [surroundings, setSurroundings] = useState<Surroundings>("przedmiescia");
  const [catPresent, setCatPresent] = useState(false);

  const result = calculateBirdhouses({
    area,
    tallTrees,
    surroundings,
    catPresent,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Powierzchnia działki (m²)" htmlFor="area">
          <input
            id="area"
            type="number"
            min={0}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Liczba drzew powyżej 3 m"
          htmlFor="trees"
          hint="Wysokie drzewa pozwalają zawiesić budki typu B i D"
        >
          <input
            id="trees"
            type="number"
            min={0}
            value={tallTrees}
            onChange={(e) => setTallTrees(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField label="Otoczenie działki" htmlFor="surroundings">
          <select
            id="surroundings"
            value={surroundings}
            onChange={(e) => setSurroundings(e.target.value as Surroundings)}
            className={selectClass}
          >
            <option value="miasto">Miasto — centrum</option>
            <option value="przedmiescia">Przedmieścia</option>
            <option value="wies">Wieś</option>
            <option value="las">Przy lesie</option>
          </select>
        </FormField>
        <label className="flex items-center gap-3 cursor-pointer text-sm text-foreground">
          <input
            type="checkbox"
            checked={catPresent}
            onChange={(e) => setCatPresent(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary"
          />
          Kot bywa w ogrodzie
        </label>

        <div className="rounded-xl border border-border bg-accent/50 p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Zasady wieszania budek
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              Otwór skieruj na wschód lub południowy wschód — nigdy na pełne
              południe (przegrzewanie) ani na zachód (zacinający deszcz).
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              Budkę zawieś lekko pochyloną do przodu, by deszcz nie wpadał do
              otworu.
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              Bez patyczka pod otworem — żerdka ułatwia drapieżnikom dostęp do
              lęgu!
            </li>
            <li className="flex gap-2">
              <span className="text-primary shrink-0">•</span>
              Minimum 1,5 m od najbliższych gałęzi, po których mógłby wspiąć się
              kot.
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Budki lęgowe łącznie"
            value={result.totalBoxes}
            unit="szt."
            highlight
          />
          <ResultCard
            label="Kiedy wieszać"
            value={result.hangingPeriod}
            highlight
          />
          <ResultCard label="Kiedy czyścić" value={result.cleaningPeriod} />
          <ResultCard
            label="Koszt zestawu"
            value={`~${result.totalCost}`}
            unit="PLN"
          />
          <ResultCard label="Karmnik" value={result.feeders} unit="szt." />
          <ResultCard
            label="Poidełko"
            value={result.waterers}
            unit="szt."
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Rekomendowane typy budek
          </h3>
          <div className="space-y-3">
            {result.recommendedTypes.map((t) => (
              <div
                key={t.id}
                className="border-b border-border/50 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {t.name} — otwór {t.hole}
                  </span>
                  <span className="text-muted">~{t.price} PLN</span>
                </div>
                <p className="text-sm text-muted mt-0.5">
                  Gatunki: {t.species.join(", ")} · wysokość zawieszenia:{" "}
                  {t.hangHeight}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-3">
            Poidełko latem jest dla ptaków ważniejsze niż karmnik zimą — zadbaj
            o oba.
          </p>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
