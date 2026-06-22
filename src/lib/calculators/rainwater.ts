export interface RainwaterInput {
  roofArea: number;
  annualPrecipitation: number;
  gardenArea?: number;
  dailyWaterNeed?: number;
}

export interface RainwaterResult {
  litersPerYear: number;
  recommendedTankLiters: number;
  wateringDays: number;
  efficiency: number;
  tankOptions: { size: number; label: string; price: number }[];
  tips: string[];
}

const TANK_SIZES = [500, 1000, 2000, 3000, 5000, 10000];

export function calculateRainwater(input: RainwaterInput): RainwaterResult {
  const {
    roofArea,
    annualPrecipitation,
    gardenArea = 100,
    dailyWaterNeed,
  } = input;

  const efficiency = 0.85;
  const litersPerYear = Math.round(
    roofArea * annualPrecipitation * efficiency
  );

  const dailyNeed = dailyWaterNeed ?? Math.round((gardenArea * 25) / 7);
  const wateringDays = Math.round(litersPerYear / dailyNeed / 30);

  const weeklyNeed = dailyNeed * 7;
  const recommendedTankLiters =
    TANK_SIZES.find((s) => s >= weeklyNeed * 1.5) ?? 10000;

  const tankOptions = TANK_SIZES.filter(
    (s) => s >= recommendedTankLiters * 0.5 && s <= recommendedTankLiters * 2
  ).map((size) => ({
    size,
    label: size >= 1000 ? `${size / 1000} m³` : `${size} l`,
    price: estimateTankPrice(size),
  }));

  return {
    litersPerYear,
    recommendedTankLiters,
    wateringDays,
    efficiency: Math.round(efficiency * 100),
    tankOptions,
    tips: [
      "Podłącz rynny do zbiornika przez filtr liści.",
      `Rocznie zbierzesz ok. ${(litersPerYear / 1000).toFixed(1)} m³ wody — to ${Math.round((litersPerYear / 1000) * 5)} PLN oszczędności.`,
      "Zainstaluj przelew na wypadek przepełnienia zbiornika.",
    ],
  };
}

function estimateTankPrice(liters: number): number {
  if (liters <= 500) return 800;
  if (liters <= 1000) return 1200;
  if (liters <= 2000) return 2000;
  if (liters <= 3000) return 2800;
  if (liters <= 5000) return 4000;
  return 7000;
}
