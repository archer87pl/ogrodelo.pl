export type SoilType = "piasek" | "glina" | "prochnica";
export type PlantType = "trawnik" | "kwiaty" | "warzywa" | "krzewy" | "drzewa";
export type SunExposure = "pelne" | "czesciowe" | "cien";
export type SprinklerType = "rotacyjny" | "kroplujacy" | "deszczownica";
export type WindExposure = "brak" | "umiarkowany" | "silny";
export type MulchType = "brak" | "kora" | "sloma" | "agrowloknina";

export interface IrrigationInput {
  area: number;
  soil: SoilType;
  plants: PlantType;
  sun: SunExposure;
  sprinkler: SprinklerType;
  wind?: WindExposure;
  mulch?: MulchType;
  weatherFactor?: number;
  month?: number;
  waterPricePerM3?: number;
}

export interface IrrigationSchedule {
  day: string;
  action: string;
  duration?: string;
  skip?: boolean;
}

export interface MonthlyNeed {
  month: string;
  monthNum: number;
  litersPerWeek: number;
  mmPerWeek: number;
  active: boolean;
}

export interface DailyForecast {
  day: string;
  precipMm: number;
  tempC: number;
  recommendation: "podlewaj" | "pomin" | "ogranicz";
  reason: string;
}

export interface IrrigationBreakdown {
  label: string;
  factor: number;
  effect: string;
}

export interface IrrigationResult {
  litersPerWeek: number;
  litersPerDay: number;
  litersPerMonth: number;
  litersPerYear: number;
  mmPerWeek: number;
  mmPerSession: number;
  minutesPerDay: number;
  minutesPerSession: number;
  sessionsPerWeek: number;
  schedule: IrrigationSchedule[];
  waterCostMonthly: number;
  waterCostYearly: number;
  rainTankLiters: number;
  rainTankWeeks: number;
  savingsWithMulch: number;
  savingsWithDrip: number;
  monthlyNeeds: MonthlyNeed[];
  breakdown: IrrigationBreakdown[];
  tips: string[];
  formula: string;
}

const SOIL_FACTOR: Record<SoilType, number> = {
  piasek: 1.4,
  glina: 0.8,
  prochnica: 1.0,
};

const PLANT_NEED: Record<PlantType, number> = {
  trawnik: 25,
  kwiaty: 30,
  warzywa: 35,
  krzewy: 20,
  drzewa: 15,
};

const SUN_FACTOR: Record<SunExposure, number> = {
  pelne: 1.3,
  czesciowe: 1.0,
  cien: 0.7,
};

const WIND_FACTOR: Record<WindExposure, number> = {
  brak: 1.0,
  umiarkowany: 1.1,
  silny: 1.25,
};

const MULCH_FACTOR: Record<MulchType, number> = {
  brak: 1.0,
  kora: 0.85,
  sloma: 0.8,
  agrowloknina: 0.7,
};

const SPRINKLER_FLOW: Record<SprinklerType, number> = {
  rotacyjny: 12,
  kroplujacy: 4,
  deszczownica: 8,
};

const SPRINKLER_EFFICIENCY: Record<SprinklerType, number> = {
  rotacyjny: 0.75,
  kroplujacy: 0.9,
  deszczownica: 0.7,
};

const MONTH_NAMES = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

const SEASON_FACTOR = [0.05, 0.08, 0.35, 0.65, 0.9, 1.15, 1.3, 1.2, 0.75, 0.45, 0.15, 0.05];

const SOIL_LABELS: Record<SoilType, string> = {
  piasek: "Piasek (+40%)",
  glina: "Glina (−20%)",
  prochnica: "Próchnica (norma)",
};

const PLANT_LABELS: Record<PlantType, string> = {
  trawnik: "Trawnik (25 l/m²)",
  kwiaty: "Kwiaty (30 l/m²)",
  warzywa: "Warzywa (35 l/m²)",
  krzewy: "Krzewy (20 l/m²)",
  drzewa: "Drzewa (15 l/m²)",
};

export function calculateIrrigation(input: IrrigationInput): IrrigationResult {
  const {
    area,
    soil,
    plants,
    sun,
    sprinkler,
    wind = "brak",
    mulch = "brak",
    weatherFactor = 1,
    month = new Date().getMonth(),
    waterPricePerM3 = 5.5,
  } = input;

  const seasonFactor = SEASON_FACTOR[month] ?? 1;
  const baseNeed = area * PLANT_NEED[plants];
  const rawLiters = baseNeed * SOIL_FACTOR[soil] * SUN_FACTOR[sun] * WIND_FACTOR[wind] * MULCH_FACTOR[mulch] * weatherFactor * seasonFactor;
  const litersPerWeek = Math.round(rawLiters / SPRINKLER_EFFICIENCY[sprinkler]);

  const litersPerDay = Math.round(litersPerWeek / 7);
  const litersPerMonth = Math.round(litersPerWeek * 4.3);
  const litersPerYear = calculateYearlyTotal(area, soil, plants, sun, wind, mulch, sprinkler);

  const mmPerWeek = area > 0 ? Math.round((litersPerWeek / area) * 10) / 10 : 0;

  const sessionsPerWeek =
    soil === "piasek" ? 4 : soil === "glina" ? 2 : 3;
  const mmPerSession = Math.round((mmPerWeek / sessionsPerWeek) * 10) / 10;

  const flowRate = SPRINKLER_FLOW[sprinkler];
  const minutesPerDay = Math.round((litersPerDay / flowRate) * 60);
  const litersPerSession = litersPerWeek / sessionsPerWeek;
  const minutesPerSession = Math.round((litersPerSession / flowRate) * 60);

  const waterCostMonthly = Math.round((litersPerMonth / 1000) * waterPricePerM3 * 100) / 100;
  const waterCostYearly = Math.round((litersPerYear / 1000) * waterPricePerM3);

  const rainTankLiters = Math.round(litersPerWeek * 2.5);
  const rainTankWeeks = 2.5;

  const withoutMulch = Math.round(rawLiters / SPRINKLER_EFFICIENCY[sprinkler]);
  const withMulch = Math.round((rawLiters * MULCH_FACTOR.kora) / SPRINKLER_EFFICIENCY[sprinkler]);
  const savingsWithMulch = Math.max(0, withoutMulch - withMulch);

  const withDrip = Math.round(
    (baseNeed * SOIL_FACTOR[soil] * SUN_FACTOR[sun] * weatherFactor * seasonFactor) /
      SPRINKLER_EFFICIENCY.kroplujacy
  );
  const withRotary = Math.round(
    (baseNeed * SOIL_FACTOR[soil] * SUN_FACTOR[sun] * weatherFactor * seasonFactor) /
      SPRINKLER_EFFICIENCY.rotacyjny
  );
  const savingsWithDrip = Math.max(0, withRotary - withDrip);

  const monthlyNeeds = buildMonthlyNeeds(area, soil, plants, sun, wind, mulch, sprinkler, month);
  const schedule = buildSchedule(sun, soil, sprinkler, minutesPerSession, sessionsPerWeek);
  const breakdown = buildBreakdown(soil, plants, sun, wind, mulch, sprinkler, weatherFactor, seasonFactor);
  const tips = buildTips(soil, plants, sun, sprinkler, mulch, mmPerWeek);

  const formula = `${area} m² × ${PLANT_NEED[plants]} l/m² × gleba(${SOIL_FACTOR[soil]}) × słońce(${SUN_FACTOR[sun]}) × wiatr(${WIND_FACTOR[wind]}) × mulcz(${MULCH_FACTOR[mulch]}) × sezon(${seasonFactor}) × pogoda(${weatherFactor}) ÷ sprawność(${SPRINKLER_EFFICIENCY[sprinkler]})`;

  return {
    litersPerWeek,
    litersPerDay,
    litersPerMonth,
    litersPerYear,
    mmPerWeek,
    mmPerSession,
    minutesPerDay: Math.max(minutesPerDay, 3),
    minutesPerSession: Math.max(minutesPerSession, 5),
    sessionsPerWeek,
    schedule,
    waterCostMonthly,
    waterCostYearly,
    rainTankLiters,
    rainTankWeeks,
    savingsWithMulch,
    savingsWithDrip,
    monthlyNeeds,
    breakdown,
    tips,
    formula,
  };
}

function calculateYearlyTotal(
  area: number,
  soil: SoilType,
  plants: PlantType,
  sun: SunExposure,
  wind: WindExposure,
  mulch: MulchType,
  sprinkler: SprinklerType
): number {
  let total = 0;
  for (let m = 0; m < 12; m++) {
    const weekly = Math.round(
      (area * PLANT_NEED[plants] * SOIL_FACTOR[soil] * SUN_FACTOR[sun] *
        WIND_FACTOR[wind] * MULCH_FACTOR[mulch] * SEASON_FACTOR[m]) /
        SPRINKLER_EFFICIENCY[sprinkler]
    );
    total += weekly * 4.3;
  }
  return Math.round(total);
}

function buildMonthlyNeeds(
  area: number,
  soil: SoilType,
  plants: PlantType,
  sun: SunExposure,
  wind: WindExposure,
  mulch: MulchType,
  sprinkler: SprinklerType,
  currentMonth: number
): MonthlyNeed[] {
  return MONTH_NAMES.map((month, i) => {
    const weekly = Math.round(
      (area * PLANT_NEED[plants] * SOIL_FACTOR[soil] * SUN_FACTOR[sun] *
        WIND_FACTOR[wind] * MULCH_FACTOR[mulch] * SEASON_FACTOR[i]) /
        SPRINKLER_EFFICIENCY[sprinkler]
    );
    return {
      month,
      monthNum: i + 1,
      litersPerWeek: weekly,
      mmPerWeek: area > 0 ? Math.round((weekly / area) * 10) / 10 : 0,
      active: i === currentMonth,
    };
  });
}

function buildSchedule(
  sun: SunExposure,
  soil: SoilType,
  sprinkler: SprinklerType,
  minutesPerSession: number,
  sessionsPerWeek: number
): IrrigationSchedule[] {
  const morning = sun === "pelne" ? "5:00–7:00" : "6:00–8:00";
  const evening = "19:00–21:00";

  const daySets: Record<SoilType, string[]> = {
    piasek: ["Poniedziałek", "Środa", "Piątek", "Niedziela"],
    glina: ["Wtorek", "Piątek"],
    prochnica: ["Poniedziałek", "Środa", "Sobota"],
  };

  const method =
    sprinkler === "kroplujacy"
      ? "kroplówka"
      : sprinkler === "deszczownica"
        ? "deszczownica"
        : "zraszacz rotacyjny";

  return [
    {
      day: "Zasada ogólna",
      action: `Podlewaj ${method} rano (${morning}) lub wieczorem (${evening})`,
      duration: `${minutesPerSession} min / sesja`,
    },
    ...daySets[soil].map((day) => ({
      day,
      action: `Podlewanie główne — ${method}`,
      duration: `${minutesPerSession} min (~${Math.round(minutesPerSession * SPRINKLER_FLOW[sprinkler] / 60 * 10) / 10} l)`,
    })),
    {
      day: "Po deszczu >5 mm",
      action: "Pomiń podlewanie — gleba ma wystarczającą wilgoć",
      skip: true,
    },
    {
      day: "Upał >30°C",
      action: `Dodaj ${Math.round(sessionsPerWeek * 0.25)} sesji w tygodniu lub wydłuż o 20%`,
    },
    {
      day: "Sierpień–wrzesień",
      action: "Stopniowo ograniczaj podlewanie — przygotuj rośliny na zimę",
    },
  ];
}

function buildBreakdown(
  soil: SoilType,
  plants: PlantType,
  sun: SunExposure,
  wind: WindExposure,
  mulch: MulchType,
  sprinkler: SprinklerType,
  weatherFactor: number,
  seasonFactor: number
): IrrigationBreakdown[] {
  return [
    { label: "Rośliny", factor: PLANT_NEED[plants], effect: PLANT_LABELS[plants] },
    { label: "Gleba", factor: SOIL_FACTOR[soil], effect: SOIL_LABELS[soil] },
    { label: "Nasłonecznienie", factor: SUN_FACTOR[sun], effect: `×${SUN_FACTOR[sun]}` },
    { label: "Wiatr", factor: WIND_FACTOR[wind], effect: wind === "brak" ? "Brak wpływu" : `+${Math.round((WIND_FACTOR[wind] - 1) * 100)}% parowania` },
    { label: "Mulcz", factor: MULCH_FACTOR[mulch], effect: mulch === "brak" ? "Brak oszczędności" : `−${Math.round((1 - MULCH_FACTOR[mulch]) * 100)}% zużycia` },
    { label: "Sezon", factor: seasonFactor, effect: `${MONTH_NAMES[new Date().getMonth()]} (×${seasonFactor})` },
    { label: "Pogoda", factor: weatherFactor, effect: weatherFactor < 1 ? "Deszczowo — mniej podlewania" : weatherFactor > 1 ? "Gorąco — więcej podlewania" : "Typowa pogoda" },
    { label: "Sprawność systemu", factor: SPRINKLER_EFFICIENCY[sprinkler], effect: `${Math.round(SPRINKLER_EFFICIENCY[sprinkler] * 100)}% (${sprinkler})` },
  ];
}

function buildTips(
  soil: SoilType,
  plants: PlantType,
  sun: SunExposure,
  sprinkler: SprinklerType,
  mulch: MulchType,
  mmPerWeek: number
): string[] {
  const tips: string[] = [];

  if (soil === "piasek")
    tips.push("Piasek: podlewaj częściej, krócej — woda szybko spływa poniżej strefy korzeniowej.");
  if (soil === "glina")
    tips.push("Glina: unikaj podlewania na mokro — woda stoi na powierzchni i niszczy korzenie.");
  if (plants === "trawnik")
    tips.push(`Trawnik potrzebuje ok. ${mmPerWeek} mm/tydzień. Test: wbij śrubokręt — jeśli wilgotny na 10 cm, nie podlewaj.`);
  if (plants === "warzywa")
    tips.push("Warzywa: kroplówka pod korzeń chroni przed chorobami liści i oszczędza 40–60% wody.");
  if (sun === "pelne")
    tips.push("Pełne słońce: mulcz lub agrowłóknina obniżą temperaturę gleby i ograniczą parowanie.");
  if (sprinkler === "rotacyjny")
    tips.push("Zraszacz rotacyjny traci 20–30% wody na wiatr — podlewaj przy wietrze <10 km/h.");
  if (mulch === "brak")
    tips.push("Mulcz 5 cm kory oszczędzi 15–20% wody i ograniczy chwasty.");
  tips.push("Czujnik wilgotności gleby (50–150 PLN) zwraca się w jeden sezon.");
  tips.push("Deszczówka pokrywa 30–60% letniego zapotrzebowania — rozważ zbiornik 2-tygodniowy.");

  return tips;
}

export function buildDailyForecast(
  dailyPrecip: number[],
  dailyTemp: number[],
  dayNames: string[]
): DailyForecast[] {
  return dayNames.map((day, i) => {
    const precip = dailyPrecip[i] ?? 0;
    const temp = dailyTemp[i] ?? 15;

    if (precip >= 5) {
      return { day, precipMm: precip, tempC: temp, recommendation: "pomin", reason: `Opad ${precip} mm — gleba nawodniona` };
    }
    if (precip >= 2) {
      return { day, precipMm: precip, tempC: temp, recommendation: "ogranicz", reason: "Lekki deszcz — skróć sesję o 50%" };
    }
    if (temp > 28) {
      return { day, precipMm: precip, tempC: temp, recommendation: "podlewaj", reason: `Upał ${temp}°C — podlej rano` };
    }
    return { day, precipMm: precip, tempC: temp, recommendation: "podlewaj", reason: "Standardowe podlewanie" };
  });
}

export const SOIL_OPTIONS: { value: SoilType; label: string; hint: string }[] = [
  { value: "piasek", label: "Piasek", hint: "Szybko wysycha, wymaga częstszego podlewania" },
  { value: "glina", label: "Glina", hint: "Trzyma wodę, ryzyko przelewania" },
  { value: "prochnica", label: "Próchnica", hint: "Optymalna retencja wilgoci" },
];

export const PLANT_OPTIONS: { value: PlantType; label: string; hint: string }[] = [
  { value: "trawnik", label: "Trawnik", hint: "25 l/m²/tydzień w sezonie" },
  { value: "kwiaty", label: "Kwiaty i rabaty", hint: "30 l/m²/tydzień" },
  { value: "warzywa", label: "Warzywa", hint: "35 l/m²/tydzień — największe zapotrzebowanie" },
  { value: "krzewy", label: "Krzewy", hint: "20 l/m²/tydzień" },
  { value: "drzewa", label: "Drzewa", hint: "15 l/m²/tydzień (strefa korony)" },
];

export const SUN_OPTIONS: { value: SunExposure; label: string; hint: string }[] = [
  { value: "pelne", label: "Pełne słońce (6+ h)", hint: "+30% parowania" },
  { value: "czesciowe", label: "Częściowe (3–6 h)", hint: "Wartość bazowa" },
  { value: "cien", label: "Cień (<3 h)", hint: "−30% zapotrzebowania" },
];

export const SPRINKLER_OPTIONS: { value: SprinklerType; label: string; hint: string }[] = [
  { value: "rotacyjny", label: "Zraszacz rotacyjny", hint: "12 l/min, sprawność 75%" },
  { value: "kroplujacy", label: "Nawadnianie kroplujące", hint: "4 l/min, sprawność 90%" },
  { value: "deszczownica", label: "Deszczownica", hint: "8 l/min, sprawność 70%" },
];

export const WIND_OPTIONS: { value: WindExposure; label: string }[] = [
  { value: "brak", label: "Osłonięty (brak wiatru)" },
  { value: "umiarkowany", label: "Umiarkowany wiatr" },
  { value: "silny", label: "Silny wiatr (otwarty teren)" },
];

export const MULCH_OPTIONS: { value: MulchType; label: string }[] = [
  { value: "brak", label: "Bez mulczu" },
  { value: "kora", label: "Kora / zrębki (−15%)" },
  { value: "sloma", label: "Słoma (−20%)" },
  { value: "agrowloknina", label: "Agrowłóknina (−30%)" },
];

export const MAIN_IRRIGATION_FAQ = [
  {
    question: "Ile wody potrzebuje ogród tygodniowo?",
    answer:
      "Zależy od powierzchni i roślin. Trawnik 100 m² to ok. 2000–3500 litrów tygodniowo w lipcu. Warzywnik 20 m² to ok. 600–900 litrów. Nasz kalkulator liczy indywidualnie na podstawie gleby, słońca i pogody.",
  },
  {
    question: "Jak przeliczyć litry na mm opadu?",
    answer:
      "1 mm opadu na 1 m² = 1 litr wody. Jeśli kalkulator pokazuje 2500 l/tydzień na 100 m², to 25 mm tygodniowo — standardowa dawka dla trawnika.",
  },
  {
    question: "Czy podlewać ogród w deszczu?",
    answer:
      "Jeśli opad przekroczył 5 mm w ciągu doby — pomiń podlewanie. Przy 2–5 mm skróć sesję o połowę. Kalkulator pobiera prognozę i podpowiada dzień po dniu.",
  },
  {
    question: "Ile kosztuje woda do ogrodu?",
    answer:
      "Średnio 5–8 PLN za m³ w Polsce. Trawnik 200 m² w lipcu to 80–150 PLN miesięcznie. Mulcz i kroplówka mogą obniżyć koszt o 30–50%.",
  },
  {
    question: "Jaki zbiornik na deszczówkę do podlewania?",
    answer:
      "Minimum na 2 tygodnie zapotrzebowania. Kalkulator podaje rekomendowaną pojemność w litrach na podstawie Twojego zużycia.",
  },
  {
    question: "Czym różni się nawadnianie kroplujące od zraszacza?",
    answer:
      "Kroplówka dostarcza wodę do korzeni (sprawność ~90%), zraszacz pokrywa powierzchnię (sprawność ~75%). Kroplówka jest tańsza w eksploatacji, zraszacz szybszy w montażu na trawniku.",
  },
];
