export interface VegetableCrop {
  id: string;
  name: string;
  /** Realistic amateur-garden yield, middle of the typical range */
  yieldKgPerM2: number;
  /** 2026 Polish retail price, PLN per kg (kg-equivalent for piece-sold crops) */
  pricePerKg: number;
  /** Annual cost per m²: seeds/seedlings + fertilization, PLN */
  costPerM2: number;
  /** Typical yield range shown in the UI, e.g. "4–6 kg/m²" */
  yieldRangeLabel: string;
}

export const VEGETABLE_CROPS: VegetableCrop[] = [
  {
    id: "pomidor",
    name: "Pomidor",
    yieldKgPerM2: 5,
    pricePerKg: 9,
    costPerM2: 12,
    yieldRangeLabel: "4–6 kg/m²",
  },
  {
    id: "ogorek",
    name: "Ogórek gruntowy",
    yieldKgPerM2: 3.5,
    pricePerKg: 6,
    costPerM2: 6,
    yieldRangeLabel: "3–4 kg/m²",
  },
  {
    id: "cukinia",
    name: "Cukinia",
    yieldKgPerM2: 7,
    pricePerKg: 5,
    costPerM2: 5,
    yieldRangeLabel: "6–8 kg/m²",
  },
  {
    id: "marchew",
    name: "Marchew",
    yieldKgPerM2: 3.5,
    pricePerKg: 3,
    costPerM2: 3,
    yieldRangeLabel: "3–4 kg/m²",
  },
  {
    id: "burak",
    name: "Burak ćwikłowy",
    yieldKgPerM2: 3.5,
    pricePerKg: 3.5,
    costPerM2: 3,
    yieldRangeLabel: "3–4 kg/m²",
  },
  {
    id: "salata",
    name: "Sałata",
    // 8–10 główek/m² ≈ 1,5 kg; cena ~4 PLN/szt ≈ 24 PLN/kg ekwiwalentu
    yieldKgPerM2: 1.5,
    pricePerKg: 24,
    costPerM2: 3,
    yieldRangeLabel: "8–10 szt/m² (~1,5 kg)",
  },
  {
    id: "fasola",
    name: "Fasola szparagowa",
    yieldKgPerM2: 1.75,
    pricePerKg: 12,
    costPerM2: 4,
    yieldRangeLabel: "1,5–2 kg/m²",
  },
  {
    id: "papryka",
    name: "Papryka",
    yieldKgPerM2: 2.5,
    pricePerKg: 10,
    costPerM2: 13,
    yieldRangeLabel: "2–3 kg/m²",
  },
  {
    id: "truskawka",
    name: "Truskawka",
    yieldKgPerM2: 1.25,
    pricePerKg: 15,
    costPerM2: 10,
    yieldRangeLabel: "1–1,5 kg/m²",
  },
  {
    id: "ziemniak",
    name: "Ziemniak wczesny",
    yieldKgPerM2: 2.75,
    pricePerKg: 3,
    costPerM2: 5,
    yieldRangeLabel: "2,5–3 kg/m²",
  },
];

/** Sensible crop mix for the "Typowy warzywnik 20 m²" preset (sums to 20 m²) */
export const TYPICAL_GARDEN_PRESET: Record<string, number> = {
  pomidor: 4,
  ogorek: 3,
  cukinia: 2,
  marchew: 3,
  burak: 2,
  salata: 2,
  fasola: 2,
  ziemniak: 2,
};

export interface VegetableSelection {
  cropId: string;
  areaM2: number;
}

export interface CropYieldRow {
  crop: VegetableCrop;
  areaM2: number;
  yieldKg: number;
  valuePln: number;
  costPln: number;
}

export interface VegetableYieldResult {
  totalAreaM2: number;
  totalYieldKg: number;
  totalValuePln: number;
  totalCostPln: number;
  savingsPln: number;
  returnPerM2Pln: number;
  rows: CropYieldRow[];
  tips: string[];
}

export function calculateVegetableYield(
  selections: VegetableSelection[]
): VegetableYieldResult {
  const rows: CropYieldRow[] = selections
    .filter((s) => s.areaM2 > 0)
    .map((s) => {
      const crop = VEGETABLE_CROPS.find((c) => c.id === s.cropId);
      if (!crop) return null;
      const yieldKg = crop.yieldKgPerM2 * s.areaM2;
      return {
        crop,
        areaM2: s.areaM2,
        yieldKg,
        valuePln: yieldKg * crop.pricePerKg,
        costPln: crop.costPerM2 * s.areaM2,
      };
    })
    .filter((r): r is CropYieldRow => r !== null);

  const totalAreaM2 = rows.reduce((sum, r) => sum + r.areaM2, 0);
  const totalYieldKg = rows.reduce((sum, r) => sum + r.yieldKg, 0);
  const totalValuePln = rows.reduce((sum, r) => sum + r.valuePln, 0);
  const totalCostPln = rows.reduce((sum, r) => sum + r.costPln, 0);
  const savingsPln = totalValuePln - totalCostPln;
  const returnPerM2Pln = totalAreaM2 > 0 ? savingsPln / totalAreaM2 : 0;

  return {
    totalAreaM2,
    totalYieldKg: Math.round(totalYieldKg * 10) / 10,
    totalValuePln: Math.round(totalValuePln),
    totalCostPln: Math.round(totalCostPln),
    savingsPln: Math.round(savingsPln),
    returnPerM2Pln: Math.round(returnPerM2Pln * 10) / 10,
    rows,
    tips: [
      "Najbardziej opłacalne uprawy to fasola szparagowa (~12 PLN/kg w sklepie), truskawki (~15 PLN/kg) i pomidory malinowe — zacznij od nich, jeśli masz mało miejsca.",
      "Własna rozsada z nasion zamiast kupnych sadzonek tnie koszty startowe nawet o połowę — paczka nasion pomidora kosztuje 4–6 PLN i daje 20+ roślin.",
      "Kompost zamiast kupnych nawozów to 0 PLN za nawożenie — sprawdź, ile kompostu wyprodukujesz, w kalkulatorze kompostownika.",
    ],
  };
}

export const VEGETABLE_YIELD_FAQ: { question: string; answer: string }[] = [
  {
    question: "Ile kilogramów pomidorów zbiorę z 1 m² warzywnika?",
    answer:
      "W amatorskiej uprawie gruntowej realny plon pomidorów to 4–6 kg z 1 m² (2–3 rośliny po ok. 2 kg owoców). Przy cenie sklepowej ok. 9 PLN/kg oznacza to 36–54 PLN wartości plonu z każdego metra kwadratowego. W tunelu foliowym plon może być nawet o 50% wyższy.",
  },
  {
    question: "Czy warzywnik naprawdę się opłaca?",
    answer:
      "Tak, przy rozsądnym doborze upraw. Typowy warzywnik 20 m² daje rocznie ok. 60–80 kg warzyw o wartości sklepowej 400–600 PLN, przy kosztach nasion, rozsady i nawożenia rzędu 100–150 PLN. Realna oszczędność to zwykle 300–450 PLN rocznie, nie licząc lepszego smaku i braku oprysków.",
  },
  {
    question: "Które warzywa są najbardziej opłacalne w uprawie?",
    answer:
      "Najwyższy zwrot z 1 m² dają: fasola szparagowa (ok. 12 PLN/kg w sklepie przy koszcie uprawy ok. 4 PLN/m²), truskawki (ok. 15 PLN/kg), sałata (8–10 główek z 1 m² po ok. 4 PLN/szt.) oraz pomidory. Najmniej opłacalne są ziemniaki i marchew — w sklepie kosztują ok. 3 PLN/kg, więc uprawiaj je raczej dla smaku niż oszczędności.",
  },
  {
    question: "Ile kosztuje założenie warzywnika na 1 m²?",
    answer:
      "Roczny koszt nasion lub rozsady plus podstawowego nawożenia to 3–15 PLN na 1 m² w zależności od uprawy. Najtaniej wychodzą warzywa siane wprost do gruntu: marchew, burak czy sałata (ok. 3 PLN/m²). Najdrożej — uprawy z kupnej rozsady: papryka (ok. 13 PLN/m²) i pomidor (ok. 12 PLN/m²). Własna rozsada z nasion obniża te koszty o połowę.",
  },
  {
    question: "Jak duży warzywnik potrzebuję dla rodziny 4-osobowej?",
    answer:
      "Na świeże warzywa sezonowe dla 4 osób wystarczy 20–30 m². Taki warzywnik przy plonach 3–4 kg/m² średnio daje 60–120 kg warzyw rocznie. Jeśli chcesz robić też przetwory i mrozić na zimę, zaplanuj 50–80 m². Zacznij od 20 m² i powiększaj — lepiej mieć mały, zadbany warzywnik niż duży i zachwaszczony.",
  },
];
