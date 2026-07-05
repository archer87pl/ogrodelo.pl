"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { TipsList } from "@/components/ResultCard";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import {
  evaluateTreeRemoval,
  SPECIES_GROUP_OPTIONS,
  type TreeRemovalWho,
  type TreeSpeciesGroup,
} from "@/lib/calculators/tree-removal";

const VERDICT_STYLES = {
  green: "border-green-200 bg-green-50 text-green-800",
  yellow: "border-amber-200 bg-amber-50 text-amber-800",
  red: "border-red-200 bg-red-50 text-red-800",
} as const;

function formatPln(value: number): string {
  return new Intl.NumberFormat("pl-PL").format(value);
}

export function TreeRemovalCalculator() {
  const [who, setWho] = useState<TreeRemovalWho>("prywatna");
  const [species, setSpecies] = useState<TreeSpeciesGroup>("pozostale");
  const [circumference5cm, setCircumference5cm] = useState(60);
  const [shrubArea, setShrubArea] = useState(20);
  const [circumference130cm, setCircumference130cm] = useState(50);
  const [isHeritageProperty, setIsHeritageProperty] = useState(false);
  const [isNatureMonument, setIsNatureMonument] = useState(false);
  const [isProtectedArea, setIsProtectedArea] = useState(false);

  const result = evaluateTreeRemoval({
    who,
    species,
    circumference5cm,
    shrubArea,
    circumference130cm,
    isHeritageProperty,
    isNatureMonument,
    isProtectedArea,
  });

  const isShrub = species === "krzew";
  const isFruit = species === "owocowe";
  const showFeeInput = who === "firma" && !isShrub && !isFruit;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">
          Dane drzewa i wycinki
        </h2>

        <FormField label="Kto wycina i w jakim celu?" htmlFor="who">
          <select
            id="who"
            value={who}
            onChange={(e) => setWho(e.target.value as TreeRemovalWho)}
            className={selectClass}
          >
            <option value="prywatna">
              Osoba prywatna — cel niezwiązany z działalnością gospodarczą
            </option>
            <option value="firma">Firma lub cel gospodarczy</option>
          </select>
        </FormField>

        <FormField
          label="Grupa gatunkowa"
          htmlFor="species"
          hint="Progi obwodu pnia mierzonego na wysokości 5 cm nad ziemią"
        >
          <select
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value as TreeSpeciesGroup)}
            className={selectClass}
          >
            {SPECIES_GROUP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>

        {isShrub ? (
          <FormField
            label="Powierzchnia krzewu / skupiska krzewów (m²)"
            htmlFor="shrub-area"
            hint="Rzut poziomy — łączna powierzchnia zajmowana przez krzewy"
          >
            <input
              id="shrub-area"
              type="number"
              min={0}
              value={shrubArea}
              onChange={(e) => setShrubArea(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
        ) : (
          !isFruit && (
            <FormField
              label="Obwód pnia na wysokości 5 cm (cm)"
              htmlFor="circ5"
              hint="Zmierz nisko przy gruncie — to od tego obwodu zależą progi zwolnienia"
            >
              <input
                id="circ5"
                type="number"
                min={0}
                value={circumference5cm}
                onChange={(e) => setCircumference5cm(Number(e.target.value))}
                className={inputClass}
              />
            </FormField>
          )
        )}

        {showFeeInput && (
          <FormField
            label="Obwód pnia na wysokości 130 cm (cm)"
            htmlFor="circ130"
            hint="Potrzebny do oszacowania opłaty za zezwolenie"
          >
            <input
              id="circ130"
              type="number"
              min={0}
              value={circumference130cm}
              onChange={(e) => setCircumference130cm(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
        )}

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">
            Sytuacje szczególne
          </legend>
          <label className="flex items-start gap-2.5 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={isHeritageProperty}
              onChange={(e) => setIsHeritageProperty(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--color-primary,#16a34a)]"
            />
            Nieruchomość wpisana do rejestru zabytków
          </label>
          <label className="flex items-start gap-2.5 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={isNatureMonument}
              onChange={(e) => setIsNatureMonument(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--color-primary,#16a34a)]"
            />
            Drzewo jest pomnikiem przyrody
          </label>
          <label className="flex items-start gap-2.5 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={isProtectedArea}
              onChange={(e) => setIsProtectedArea(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--color-primary,#16a34a)]"
            />
            Teren objęty ochroną (park krajobrazowy, rezerwat)
          </label>
        </fieldset>

        <p className="text-xs text-muted">
          Stan prawny: 2026 (ustawa o ochronie przyrody, art. 83–83f). Progi
          dotyczą obwodu pnia mierzonego na wysokości 5 cm nad ziemią.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Werdykt</h2>

        <div
          className={`rounded-2xl border-2 p-6 ${VERDICT_STYLES[result.color]}`}
        >
          <p className="text-xl sm:text-2xl font-bold">{result.verdictLabel}</p>
          {result.threshold !== null && (
            <p className="mt-1 text-sm opacity-80">
              Próg zwolnienia dla tej grupy: {result.threshold}{" "}
              {result.thresholdUnit}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed">{result.summary}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Co zrobić krok po kroku
          </h3>
          <ol className="space-y-2 text-sm text-muted">
            {result.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="shrink-0 font-semibold text-primary">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {result.estimatedFee && (
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-primary-dark mb-2">
              Szacunkowa opłata za zezwolenie
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {formatPln(result.estimatedFee.min)}–
              {formatPln(result.estimatedFee.max)}{" "}
              <span className="text-base font-normal text-muted">PLN</span>
            </p>
            <p className="mt-2 text-xs text-muted">
              Szacunkowo: obwód pnia na 130 cm × stawka zależna od gatunku i
              wielkości drzewa (ok. 12–210 PLN/cm wg rozporządzenia).
              Ostateczną opłatę nalicza organ w decyzji.
            </p>
          </div>
        )}

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-800 mb-2">
            Kary za samowolną wycinkę
          </h3>
          <p className="text-sm text-red-800/90 leading-relaxed">
            Usunięcie drzewa lub krzewu bez wymaganego zgłoszenia albo
            zezwolenia to administracyjna kara pieniężna w wysokości{" "}
            <strong>dwukrotności opłaty</strong>, jaka byłaby naliczona za
            legalną wycinkę.
            {result.estimatedPenalty && (
              <>
                {" "}
                W tym przypadku szacunkowo{" "}
                <strong>
                  {formatPln(result.estimatedPenalty.min)}–
                  {formatPln(result.estimatedPenalty.max)} PLN
                </strong>
                .
              </>
            )}
          </p>
        </div>

        {result.warnings.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-amber-800 mb-3">
              Zwróć uwagę
            </h3>
            <ul className="space-y-2 text-sm text-amber-800/90">
              {result.warnings.map((warning, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0">⚠️</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        <TipsList tips={result.tips} />

        <LegalDisclaimer />
      </div>
    </div>
  );
}
