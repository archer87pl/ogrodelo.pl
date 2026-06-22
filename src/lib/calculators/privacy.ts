export interface PrivacyInput {
  fenceHeight: number;
  neighborDistance: number;
  buildingHeight: number;
}

export interface SeasonalSimulation {
  season: string;
  months: string;
  effectiveHeight: number;
  blocked: boolean;
}

export interface PrivacyResult {
  requiredPlantHeight: number;
  yearsToBlock: number;
  recommendedSpecies: string[];
  seasonalSimulation: SeasonalSimulation[];
  tips: string[];
}

const GROWTH_RATE = 0.35;
const INITIAL_HEIGHT = 1.5;

export function calculatePrivacy(input: PrivacyInput): PrivacyResult {
  const { fenceHeight, neighborDistance, buildingHeight } = input;

  const viewingAngle = Math.atan2(
    buildingHeight - fenceHeight,
    neighborDistance
  );
  const requiredPlantHeight =
    Math.round(
      (fenceHeight + neighborDistance * Math.tan(viewingAngle) * 0.8) * 10
    ) / 10;

  const yearsToBlock = Math.max(
    1,
    Math.ceil((requiredPlantHeight - INITIAL_HEIGHT) / GROWTH_RATE)
  );

  const seasonalSimulation: SeasonalSimulation[] = [
    {
      season: "Wiosna",
      months: "Mar–Maj",
      effectiveHeight: INITIAL_HEIGHT + GROWTH_RATE * yearsToBlock * 0.3,
      blocked: false,
    },
    {
      season: "Lato",
      months: "Cze–Sie",
      effectiveHeight: INITIAL_HEIGHT + GROWTH_RATE * yearsToBlock * 0.9,
      blocked: yearsToBlock <= 3,
    },
    {
      season: "Jesień",
      months: "Wrz–Lis",
      effectiveHeight: INITIAL_HEIGHT + GROWTH_RATE * yearsToBlock * 0.7,
      blocked: yearsToBlock <= 4,
    },
    {
      season: "Zima",
      months: "Gru–Lut",
      effectiveHeight: INITIAL_HEIGHT + GROWTH_RATE * yearsToBlock * 0.5,
      blocked: yearsToBlock <= 5,
    },
  ].map((s) => ({
    ...s,
    effectiveHeight: Math.round(s.effectiveHeight * 10) / 10,
    blocked: s.effectiveHeight >= requiredPlantHeight,
  }));

  const recommendedSpecies =
    requiredPlantHeight > 3
      ? ["Tuja", "Cis", "Żywotnik", "Laurowiśnia"]
      : requiredPlantHeight > 2
        ? ["Ligustr", "Grab", "Ostrokrzew", "Berberys"]
        : ["Berberys", "Róża płożąca", "Forsycja", "Pęcherznica"];

  return {
    requiredPlantHeight,
    yearsToBlock,
    recommendedSpecies,
    seasonalSimulation,
    tips: [
      "Sadź w dwóch rzędach (szachownica) dla szybszego efektu.",
      "Wybierz gatunki zimozielone dla całorocznej prywatności.",
      `Docelowa wysokość: min. ${requiredPlantHeight} m nad poziomem ogrodzenia.`,
    ],
  };
}
