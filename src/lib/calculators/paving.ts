export type PavingUse = "sciezka" | "taras" | "podjazd";
export type PavingStoneType =
  | "betonowa-szara"
  | "betonowa-kolorowa"
  | "behaton"
  | "granitowa";

export const PAVING_USES: {
  value: PavingUse;
  label: string;
  baseThicknessCm: number;
}[] = [
  { value: "sciezka", label: "Ścieżka piesza", baseThicknessCm: 15 },
  { value: "taras", label: "Taras", baseThicknessCm: 20 },
  { value: "podjazd", label: "Podjazd samochodowy", baseThicknessCm: 35 },
];

export const PAVING_STONE_TYPES: {
  value: PavingStoneType;
  label: string;
  pricePerM2: number;
}[] = [
  { value: "betonowa-szara", label: "Betonowa szara 6 cm", pricePerM2: 45 },
  { value: "betonowa-kolorowa", label: "Betonowa kolorowa", pricePerM2: 65 },
  { value: "behaton", label: "Behaton (podwójne T)", pricePerM2: 50 },
  { value: "granitowa", label: "Kostka granitowa", pricePerM2: 220 },
];

/** Zapas kostki na docinki i uszkodzenia. */
const WASTE_FACTOR = 1.05;
/** Gęstość nasypowa kruszywa łamanego 0–31,5 mm. */
const AGGREGATE_TONS_PER_M3 = 1.7;
/** Cena kruszywa łamanego z dostawą (PLN/t, 2026). */
const AGGREGATE_PRICE_PER_TON = 90;
/** Grubość podsypki cementowo-piaskowej (środek zakresu 3–5 cm). */
const BEDDING_THICKNESS_CM = 4;
/** Cena podsypki cementowo-piaskowej 1:4 (PLN/m³, 2026). */
const BEDDING_PRICE_PER_M3 = 280;
/** Obrzeże betonowe 100 × 20 × 6 cm (PLN/szt., 2026). */
const EDGE_PRICE_PER_PIECE = 14;
/** Robocizna brukarska (PLN/m², 2026). */
export const LABOR_PRICE_MIN = 120;
export const LABOR_PRICE_MAX = 200;

export interface PavingInput {
  /** Powierzchnia do wybrukowania w m². */
  area: number;
  /** Długość krawędzi wymagających obrzeży w m. */
  edgeLength: number;
  use: PavingUse;
  stoneType: PavingStoneType;
}

export interface PavingResult {
  /** Kostka do kupienia (m², z zapasem +5%). */
  pavingAreaM2: number;
  pavingCost: number;
  baseThicknessCm: number;
  baseVolumeM3: number;
  baseTons: number;
  baseCost: number;
  beddingThicknessCm: number;
  beddingVolumeM3: number;
  beddingCost: number;
  edgeCount: number;
  edgeCost: number;
  totalMaterialCost: number;
  laborCostMin: number;
  laborCostMax: number;
  tips: string[];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calculatePaving(input: PavingInput): PavingResult {
  const area = Math.max(0, input.area);
  const edgeLength = Math.max(0, input.edgeLength);

  const use =
    PAVING_USES.find((u) => u.value === input.use) ?? PAVING_USES[0];
  const stone =
    PAVING_STONE_TYPES.find((s) => s.value === input.stoneType) ??
    PAVING_STONE_TYPES[0];

  const pavingAreaM2 = round1(area * WASTE_FACTOR);
  const pavingCost = Math.round(pavingAreaM2 * stone.pricePerM2);

  const baseThicknessCm = use.baseThicknessCm;
  const baseVolumeM3 = round2(area * (baseThicknessCm / 100));
  const baseTons = round1(baseVolumeM3 * AGGREGATE_TONS_PER_M3);
  const baseCost = Math.round(baseTons * AGGREGATE_PRICE_PER_TON);

  const beddingVolumeM3 = round2(area * (BEDDING_THICKNESS_CM / 100));
  const beddingCost = Math.round(beddingVolumeM3 * BEDDING_PRICE_PER_M3);

  const edgeCount = Math.ceil(edgeLength);
  const edgeCost = edgeCount * EDGE_PRICE_PER_PIECE;

  const totalMaterialCost = pavingCost + baseCost + beddingCost + edgeCost;

  return {
    pavingAreaM2,
    pavingCost,
    baseThicknessCm,
    baseVolumeM3,
    baseTons,
    baseCost,
    beddingThicknessCm: BEDDING_THICKNESS_CM,
    beddingVolumeM3,
    beddingCost,
    edgeCount,
    edgeCost,
    totalMaterialCost,
    laborCostMin: Math.round(area * LABOR_PRICE_MIN),
    laborCostMax: Math.round(area * LABOR_PRICE_MAX),
    tips: [
      "Pod podbudową rozłóż geowłókninę — oddzieli kruszywo od gruntu i zapobiegnie zapadaniu się nawierzchni.",
      "Zachowaj spadek 1–2% od budynku (ok. 1–2 cm na metr), aby woda opadowa spływała poza dom.",
      `Zagęszczaj kruszywo zagęszczarką warstwami co 10 cm — przy podbudowie ${baseThicknessCm} cm to ${Math.ceil(baseThicknessCm / 10)} przejścia po całej powierzchni.`,
    ],
  };
}

export const PAVING_FAQ: { question: string; answer: string }[] = [
  {
    question: "Ile kostki brukowej kupić na 50 m² podjazdu?",
    answer:
      "Do powierzchni 50 m² dolicz zapas 5% na docinki i uszkodzenia — kupujesz więc ok. 52,5 m² kostki. Przy kostce betonowej szarej 6 cm (ok. 45 PLN/m²) to wydatek ok. 2 360 PLN, a przy granitowej (ok. 220 PLN/m²) już ok. 11 550 PLN.",
  },
  {
    question: "Jaka podbudowa pod kostkę brukową na podjazd?",
    answer:
      "Pod podjazd samochodowy potrzeba 30–40 cm zagęszczonego kruszywa łamanego 0–31,5 mm (w kalkulatorze przyjmujemy 35 cm). Na 50 m² to ok. 17,5 m³, czyli ok. 30 ton kruszywa (1,7 t/m³). Pod ścieżkę pieszą wystarczy 15 cm, pod taras 20 cm.",
  },
  {
    question: "Ile kosztuje ułożenie kostki brukowej za m² w 2026 roku?",
    answer:
      "Sama robocizna brukarska kosztuje 120–200 PLN/m² w zależności od regionu, wzoru i skomplikowania terenu. Razem z materiałami (kostka betonowa, podbudowa, podsypka, obrzeża) metr kwadratowy podjazdu to łącznie ok. 300–450 PLN.",
  },
  {
    question: "Ile podsypki cementowo-piaskowej pod kostkę?",
    answer:
      "Podsypkę układa się warstwą 3–5 cm (średnio 4 cm). Na 20 m² ścieżki potrzeba ok. 0,8 m³ podsypki cementowo-piaskowej w proporcji 1:4, co kosztuje ok. 220 PLN. Podsypki nie zagęszcza się przed ułożeniem kostki — wyrównuje się ją łatą.",
  },
  {
    question: "Ile obrzeży betonowych potrzeba i ile kosztują?",
    answer:
      "Standardowe obrzeże betonowe ma 100 cm długości, więc liczba sztuk równa się obwodowi w metrach (np. 18 m krawędzi = 18 sztuk). Obrzeże 100 × 20 × 6 cm kosztuje ok. 14 PLN/szt., czyli 18 sztuk to ok. 252 PLN. Obrzeża osadza się na półsuchym betonie.",
  },
];
