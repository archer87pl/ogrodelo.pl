export type LawnType = "sportowy" | "ozdobny" | "uczynny" | "mieszany";
export type FertilizerType = "mineralny" | "organiczny" | "plynny" | "wapniowy";

export interface FertilizationInput {
  area: number;
  lawnType: LawnType;
  fertilizer: FertilizerType;
}

export interface FertilizationSchedule {
  month: string;
  action: string;
  amount: string;
}

export interface FertilizationResult {
  kgNeeded: number;
  totalCost: number;
  schedule: FertilizationSchedule[];
  applicationsPerYear: number;
  tips: string[];
}

const LAWN_DOSE: Record<LawnType, number> = {
  sportowy: 0.04,
  ozdobny: 0.03,
  uczynny: 0.025,
  mieszany: 0.035,
};

const FERTILIZER_PRICE: Record<FertilizerType, number> = {
  mineralny: 8,
  organiczny: 12,
  plynny: 25,
  wapniowy: 6,
};

const FERTILIZER_FACTOR: Record<FertilizerType, number> = {
  mineralny: 1.0,
  organiczny: 1.5,
  plynny: 0.3,
  wapniowy: 0.8,
};

export function calculateFertilization(
  input: FertilizationInput
): FertilizationResult {
  const { area, lawnType, fertilizer } = input;

  const baseDose = area * LAWN_DOSE[lawnType];
  const kgNeeded = Math.round(baseDose * FERTILIZER_FACTOR[fertilizer] * 10) / 10;
  const totalCost = Math.round(kgNeeded * FERTILIZER_PRICE[fertilizer]);

  const schedule = buildSchedule(lawnType, fertilizer, kgNeeded);
  const applicationsPerYear = schedule.length;

  return {
    kgNeeded,
    totalCost,
    schedule,
    applicationsPerYear,
    tips: [
      "Nawoź po koszeniu, nigdy przed — unikniesz oparzeń trawy.",
      "Podlewaj po nawożeniu, by aktywować składniki.",
      fertilizer === "organiczny"
        ? "Nawóz organiczny działa wolniej, ale poprawia strukturę gleby."
        : "Nawóz mineralny działa szybko — efekt widoczny w 7–10 dni.",
    ],
  };
}

function buildSchedule(
  lawnType: LawnType,
  fertilizer: FertilizerType,
  totalKg: number
): FertilizationSchedule[] {
  const perApp = Math.round((totalKg / 3) * 10) / 10;
  const unit = fertilizer === "plynny" ? "l" : "kg";

  const base: FertilizationSchedule[] = [
    { month: "Kwiecień", action: "Nawożenie wiosenne startowe", amount: `${perApp} ${unit}` },
    { month: "Czerwiec", action: "Nawożenie letnie — wzrost i kolor", amount: `${perApp} ${unit}` },
    { month: "Wrzesień", action: "Nawożenie jesienne — wzmocnienie korzeni", amount: `${perApp} ${unit}` },
  ];

  if (lawnType === "sportowy") {
    base.splice(2, 0, {
      month: "Sierpień",
      action: "Nawożenie uzupełniające",
      amount: `${Math.round(perApp * 0.5 * 10) / 10} ${unit}`,
    });
  }

  return base;
}

export const LAWN_TYPE_OPTIONS: { value: LawnType; label: string }[] = [
  { value: "sportowy", label: "Trawnik sportowy" },
  { value: "ozdobny", label: "Trawnik ozdobny" },
  { value: "uczynny", label: "Trawnik użytkowy" },
  { value: "mieszany", label: "Trawnik mieszany" },
];

export const FERTILIZER_OPTIONS: { value: FertilizerType; label: string }[] = [
  { value: "mineralny", label: "Nawóz mineralny (granulat)" },
  { value: "organiczny", label: "Nawóz organiczny (kompost)" },
  { value: "plynny", label: "Nawóz płynny" },
  { value: "wapniowy", label: "Nawóz wapniowy" },
];
