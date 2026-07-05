"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import {
  calculateMojaWoda,
  INSTALLATION_TYPES,
  MOJA_WODA_PARAMS,
  type InstallationType,
} from "@/lib/calculators/moja-woda";

const CHECKLIST = [
  "Jesteś właścicielem lub współwłaścicielem domu jednorodzinnego",
  `Łączna pojemność retencyjna instalacji to min. ${MOJA_WODA_PARAMS.minCapacityLiters / 1000} m³`,
  "Masz faktury i dokumenty potwierdzające poniesione koszty",
  "Wniosek złożysz elektronicznie przez portal beneficjenta WFOŚiGW",
];

export function MojaWodaCalculator() {
  const [installationCost, setInstallationCost] = useState(6000);
  const [tankCapacityLiters, setTankCapacityLiters] = useState(3000);
  const [installationType, setInstallationType] =
    useState<InstallationType>("zbiornik-naziemny");
  const [roofArea, setRoofArea] = useState(100);
  const [annualPrecipitation, setAnnualPrecipitation] = useState(600);
  const [gardenArea, setGardenArea] = useState(200);

  const result = calculateMojaWoda({
    installationCost,
    tankCapacityLiters,
    installationType,
    roofArea,
    annualPrecipitation,
    gardenArea,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-primary-dark">
            Twoja inwestycja
          </h2>
          <FormField
            label="Koszt zbiornika / instalacji (PLN)"
            htmlFor="cost"
            hint={`Minimalna wartość inwestycji w programie: ${MOJA_WODA_PARAMS.minInvestmentPln.toLocaleString("pl-PL")} PLN`}
          >
            <input
              id="cost"
              type="number"
              min={0}
              step={100}
              value={installationCost}
              onChange={(e) => setInstallationCost(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Pojemność zbiornika (litry)"
            htmlFor="capacity"
            hint={`Program wymaga łącznie min. ${MOJA_WODA_PARAMS.minCapacityLiters.toLocaleString("pl-PL")} l (2 m³)`}
          >
            <input
              id="capacity"
              type="number"
              min={0}
              step={100}
              value={tankCapacityLiters}
              onChange={(e) => setTankCapacityLiters(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Typ instalacji" htmlFor="type">
            <select
              id="type"
              value={installationType}
              onChange={(e) =>
                setInstallationType(e.target.value as InstallationType)
              }
              className={selectClass}
            >
              {INSTALLATION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Powierzchnia dachu (m²)" htmlFor="roof">
            <input
              id="roof"
              type="number"
              min={0}
              value={roofArea}
              onChange={(e) => setRoofArea(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField
            label="Roczne opady (mm)"
            htmlFor="precip"
            hint="W Polsce zwykle 500–700 mm rocznie"
          >
            <input
              id="precip"
              type="number"
              min={0}
              value={annualPrecipitation}
              onChange={(e) => setAnnualPrecipitation(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
          <FormField label="Powierzchnia podlewanego ogrodu (m²)" htmlFor="garden">
            <input
              id="garden"
              type="number"
              min={0}
              value={gardenArea}
              onChange={(e) => setGardenArea(Number(e.target.value))}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Checklist: czy kwalifikujesz się do dotacji?
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>

        {!result.eligible && (
          <div
            className="rounded-xl border border-amber-300 bg-amber-50 p-5"
            role="alert"
          >
            <p className="text-sm font-semibold text-amber-800 mb-2">
              Ta inwestycja nie kwalifikuje się do dotacji
            </p>
            <ul className="space-y-1.5 text-sm text-amber-800">
              {result.ineligibilityReasons.map((reason) => (
                <li key={reason} className="flex gap-2">
                  <span className="shrink-0">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Kwota dotacji"
            value={result.grantPln.toLocaleString("pl-PL")}
            unit="PLN"
            highlight
          />
          <ResultCard
            label="Koszt po dotacji"
            value={result.costAfterGrantPln.toLocaleString("pl-PL")}
            unit="PLN"
            highlight
          />
          <ResultCard
            label="Roczna oszczędność na wodzie"
            value={result.annualSavingsPln.toLocaleString("pl-PL")}
            unit="PLN/rok"
          />
          <ResultCard
            label="Zebrana deszczówka"
            value={result.collectedRainwaterM3.toLocaleString("pl-PL")}
            unit="m³/rok"
          />
          <ResultCard
            label="Zwrot inwestycji z dotacją"
            value={
              result.paybackWithGrantYears !== null
                ? result.paybackWithGrantYears.toLocaleString("pl-PL")
                : "—"
            }
            unit={result.paybackWithGrantYears !== null ? "lat" : undefined}
          />
          <ResultCard
            label="Zwrot inwestycji bez dotacji"
            value={
              result.paybackWithoutGrantYears !== null
                ? result.paybackWithoutGrantYears.toLocaleString("pl-PL")
                : "—"
            }
            unit={result.paybackWithoutGrantYears !== null ? "lat" : undefined}
          />
        </div>

        <div className="rounded-xl border border-border bg-accent/30 p-5" role="note">
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-primary-dark">Uwaga:</strong> nabory do
            programu Moja Woda są ogłaszane okresowo, a kwoty i warunki mogą się
            zmienić w kolejnych edycjach. Powyższe wyliczenia bazują na
            parametrach ostatniej edycji (do 80% kosztów, maks. 6 000 PLN).
            Sprawdź aktualny nabór na stronie WFOŚiGW swojego województwa.
          </p>
        </div>

        <TipsList tips={result.tips} />

        <LegalDisclaimer />
      </div>
    </div>
  );
}
