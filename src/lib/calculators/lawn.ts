export interface LawnInput {
  area: number;
}

export interface LawnResult {
  seedKg: number;
  soilM3: number;
  fertilizerKg: number;
  totalCost: number;
  breakdown: { item: string; amount: string; cost: number }[];
  tips: string[];
}

export function calculateLawn(input: LawnInput): LawnResult {
  const { area } = input;

  const seedKg = Math.round(area * 0.035 * 10) / 10;
  const soilM3 = Math.round(area * 0.05 * 10) / 10;
  const fertilizerKg = Math.round(area * 0.03 * 10) / 10;

  const seedCost = Math.round(seedKg * 40);
  const soilCost = Math.round(soilM3 * 80);
  const fertilizerCost = Math.round(fertilizerKg * 8);
  const toolsCost = 150;
  const totalCost = seedCost + soilCost + fertilizerCost + toolsCost;

  return {
    seedKg,
    soilM3,
    fertilizerKg,
    totalCost,
    breakdown: [
      { item: "Nasiona trawy", amount: `${seedKg} kg`, cost: seedCost },
      { item: "Ziemia ogrodowa", amount: `${soilM3} m³`, cost: soilCost },
      { item: "Nawóz startowy", amount: `${fertilizerKg} kg`, cost: fertilizerCost },
      { item: "Narzędzia (grabie, wał)", amount: "1 komplet", cost: toolsCost },
    ],
    tips: [
      "Najlepszy czas na siew: wrzesień lub kwiecień.",
      "Przygotuj glebę — usuń kamienie, zrównaj, zagęszczaj lekko.",
      "Po siewie podlewaj delikatnie 2× dziennie przez 2 tygodnie.",
    ],
  };
}
