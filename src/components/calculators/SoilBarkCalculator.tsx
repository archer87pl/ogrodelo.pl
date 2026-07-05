"use client";

import { useState } from "react";
import { FormField, inputClass, selectClass } from "@/components/FormField";
import { ResultCard, TipsList } from "@/components/ResultCard";
import {
  calculateSoilBark,
  getSoilBarkMaterial,
  SOIL_BARK_MATERIALS,
} from "@/lib/calculators/soil-bark";

const pln = (value: number) => `${value.toLocaleString("pl-PL")} PLN`;

export function SoilBarkCalculator() {
  const [area, setArea] = useState(20);
  const [depthCm, setDepthCm] = useState(
    getSoilBarkMaterial("kora-sosnowa").recommendedDepthCm
  );
  const [materialId, setMaterialId] = useState("kora-sosnowa");

  const material = getSoilBarkMaterial(materialId);
  const result = calculateSoilBark({ areaM2: area, depthCm, materialId });

  function handleMaterialChange(id: string) {
    setMaterialId(id);
    setDepthCm(getSoilBarkMaterial(id).recommendedDepthCm);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-primary-dark">Twoje dane</h2>
        <FormField label="Materiał" htmlFor="material">
          <select
            id="material"
            value={materialId}
            onChange={(e) => handleMaterialChange(e.target.value)}
            className={selectClass}
          >
            {SOIL_BARK_MATERIALS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Powierzchnia (m²)" htmlFor="area">
          <input
            id="area"
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Grubość warstwy (cm)"
          htmlFor="depth"
          hint={material.depthHint}
        >
          <input
            id="depth"
            type="number"
            min={1}
            max={50}
            value={depthCm}
            onChange={(e) => setDepthCm(Number(e.target.value))}
            className={inputClass}
          />
        </FormField>
        <p className="text-xs text-muted">
          Ceny orientacyjne 2026: worek 50 l — {pln(material.bagPrice50l)},
          luzem — {pln(material.bulkPricePerM3)}/m³ (+ transport ok.{" "}
          {pln(result.bulkDeliveryCost)}).
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-primary-dark">Wyniki</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard
            label="Potrzebna objętość"
            value={result.volumeM3.toLocaleString("pl-PL")}
            unit="m³"
            highlight
          />
          <ResultCard
            label="Liczba worków 50 l"
            value={result.bags50l.toLocaleString("pl-PL")}
            unit="szt."
            highlight
          />
          <ResultCard
            label="Waga materiału"
            value={result.weightTons.toLocaleString("pl-PL")}
            unit="t"
          />
          <ResultCard
            label="Materiał"
            value={result.material.label}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-primary-dark mb-3">
            Worki czy luzem?
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm border-b border-border/50 pb-2">
              <span className="font-medium">
                W workach ({result.bags50l.toLocaleString("pl-PL")} × 50 l)
                {result.cheaperOption === "worki" && " ✅"}
              </span>
              <span className="text-muted">~{pln(result.bagCost)}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-border/50 pb-2">
              <span className="font-medium">
                Luzem (z transportem)
                {result.cheaperOption === "luzem" && " ✅"}
              </span>
              <span className="text-muted">~{pln(result.bulkCost)}</span>
            </div>
            <p className="pt-1 text-sm text-muted">
              {result.cheaperOption === "luzem"
                ? `Taniej wychodzi zakup luzem — oszczędzasz ok. ${pln(result.savings)}.`
                : `Przy tej ilości taniej wychodzą worki — o ok. ${pln(result.savings)}.`}{" "}
              {Number.isFinite(result.breakEvenM3) &&
                `Próg opłacalności zakupu luzem dla tego materiału to ok. ${result.breakEvenM3.toLocaleString("pl-PL")} m³.`}
            </p>
          </div>
        </div>

        <TipsList tips={result.tips} />
      </div>
    </div>
  );
}
