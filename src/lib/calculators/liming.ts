export type CropType = "trawnik" | "warzywnik" | "rabata" | "iglaki";
export type SoilType = "lekka" | "srednia" | "ciezka";
export type LimeType = "kreda" | "dolomit" | "tlenkowe";

export interface LimingInput {
  currentPh: number;
  crop: CropType;
  soil: SoilType;
  area: number;
  lime: LimeType;
}

export type LimingMode = "wapnowanie" | "nie-wapnuj" | "zakwaszanie";

export interface LimingResult {
  mode: LimingMode;
  targetPhLabel: string;
  phDeficit: number;
  caoPer100m2: number;
  limePer100m2: number;
  limeTotalKg: number;
  bags25kg: number;
  costPln: number;
  bestTerm: string;
  sulfurPerM2: number;
  sulfurTotalKg: number;
  verdict: string;
  warnings: string[];
  tips: string[];
}

export const CROP_LABELS: Record<CropType, string> = {
  trawnik: "Trawnik",
  warzywnik: "Warzywnik",
  rabata: "Rabata ozdobna",
  iglaki: "Iglaki i borówki (gleba kwaśna)",
};

export const SOIL_LABELS: Record<SoilType, string> = {
  lekka: "Lekka piaszczysta",
  srednia: "Średnia",
  ciezka: "Ciężka gliniasta",
};

export const LIME_LABELS: Record<LimeType, string> = {
  kreda: "Węglan wapnia (kreda)",
  dolomit: "Dolomit (z magnezem)",
  tlenkowe: "Tlenkowe CaO — tylko gleby ciężkie",
};

interface CropTarget {
  min: number;
  max: number;
  label: string;
}

const CROP_TARGETS: Record<CropType, CropTarget> = {
  trawnik: { min: 6.0, max: 6.5, label: "6,0–6,5" },
  warzywnik: { min: 6.5, max: 6.5, label: "6,5" },
  rabata: { min: 6.0, max: 6.0, label: "6,0" },
  iglaki: { min: 4.5, max: 5.5, label: "4,5–5,5" },
};

// Dawka CaO w kg na 100 m² potrzebna do podniesienia pH o 0,5 jednostki
// (standardowe tabele agronomiczne: lekka 2–3 kg, średnia 3–5 kg, ciężka 5–7 kg).
const CAO_PER_HALF_PH: Record<SoilType, number> = {
  lekka: 2.5,
  srednia: 4,
  ciezka: 6,
};

// Przelicznik CaO -> forma handlowa (kreda ×1,79, dolomit ×~1,7, tlenkowe = czysty CaO).
const LIME_FACTOR: Record<LimeType, number> = {
  kreda: 1.79,
  dolomit: 1.7,
  tlenkowe: 1,
};

// Orientacyjne ceny detaliczne PLN/kg.
const LIME_PRICE: Record<LimeType, number> = {
  kreda: 1.2,
  dolomit: 0.9,
  tlenkowe: 1.5,
};

// Dawka siarki granulowanej (g/m²) obniżająca pH o ok. 0,5–1 jednostkę.
const SULFUR_PER_M2: Record<SoilType, number> = {
  lekka: 30,
  srednia: 40,
  ciezka: 50,
};

// Powyżej tej dawki CaO na 100 m² zalecamy rozłożenie wapnowania na 2 sezony.
const SPLIT_THRESHOLD_CAO: Record<SoilType, number> = {
  lekka: 8,
  srednia: 12,
  ciezka: 15,
};

const BAG_KG = 25;

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

const BASE_TIPS = [
  "Zbadaj pH kwasomierzem glebowym lub w stacji chemiczno-rolniczej (analiza próbki to ok. 20 PLN) — dawkowanie w ciemno łatwo prowadzi do przewapnowania.",
  "Duże dawki wapna dziel na 2 lata — jednorazowo nie podnoś pH o więcej niż 0,5–1 jednostkę.",
  "Wybierz dolomit, gdy rośliny mają niedobór magnezu (żółknięcie między nerwami starszych liści) — nawozi wapniem i magnezem jednocześnie.",
];

export function calculateLiming(input: LimingInput): LimingResult {
  const { currentPh, crop, soil, area, lime } = input;
  const target = CROP_TARGETS[crop];

  const base: Omit<
    LimingResult,
    "mode" | "verdict" | "warnings"
  > = {
    targetPhLabel: target.label,
    phDeficit: 0,
    caoPer100m2: 0,
    limePer100m2: 0,
    limeTotalKg: 0,
    bags25kg: 0,
    costPln: 0,
    bestTerm: "—",
    sulfurPerM2: 0,
    sulfurTotalKg: 0,
    tips: BASE_TIPS,
  };

  // Rośliny kwasolubne z pH powyżej zakresu -> zakwaszanie zamiast wapnowania.
  if (crop === "iglaki" && currentPh > target.max) {
    const sulfurPerM2 = SULFUR_PER_M2[soil];
    return {
      ...base,
      mode: "zakwaszanie",
      phDeficit: round1(currentPh - target.max),
      sulfurPerM2,
      sulfurTotalKg: round1((sulfurPerM2 * area) / 1000),
      bestTerm: "Wiosna lub wczesna jesień (gleba ciepła i wilgotna)",
      verdict:
        `Iglaki i borówki wymagają kwaśnej gleby (pH ${target.label}). Przy pH ${currentPh.toFixed(1).replace(".", ",")} nie wapnuj — zastosuj ZAKWASZANIE siarką granulowaną (ok. ${sulfurPerM2} g/m²). Efekt pojawia się po 2–3 miesiącach; przy dużej różnicy pH powtórz zabieg w kolejnym sezonie.`,
      warnings: [
        "Nie przekraczaj 50 g siarki/m² w jednym zabiegu — nadmiar uszkadza życie glebowe.",
        "Do podlewania borówek używaj deszczówki — woda wodociągowa (twarda) stopniowo podnosi pH.",
      ],
    };
  }

  // pH już w zakresie docelowym lub powyżej -> nie wapnuj.
  if (currentPh >= target.min) {
    return {
      ...base,
      mode: "nie-wapnuj",
      verdict:
        `pH ${currentPh.toFixed(1).replace(".", ",")} jest już w zakresie docelowym (${target.label}) lub powyżej — nie wapnuj. Przewapnowanie blokuje przyswajanie fosforu, żelaza, manganu i boru, powoduje chlorozy i może obniżyć plony na kilka lat. Powtórz badanie pH za 2–3 lata.`,
      warnings: [
        "Nadmiaru wapna nie da się szybko cofnąć — obniżanie pH trwa znacznie dłużej niż jego podnoszenie.",
      ],
    };
  }

  // Właściwe wapnowanie.
  const phDeficit = round1(target.min - currentPh);
  const steps = phDeficit / 0.5;
  const caoPer100m2 = round1(steps * CAO_PER_HALF_PH[soil]);
  const limePer100m2 = round1(caoPer100m2 * LIME_FACTOR[lime]);
  const limeTotalKg = round1((limePer100m2 * area) / 100);
  const bags25kg = Math.max(1, Math.ceil(limeTotalKg / BAG_KG));
  const costPln = Math.round(limeTotalKg * LIME_PRICE[lime]);

  const warnings: string[] = [
    "Nie łącz wapnowania z nawożeniem azotowym ani obornikiem — zachowaj odstęp min. 4–6 tygodni, inaczej azot ucieknie w postaci amoniaku.",
    "Wapno tlenkowe (CaO) stosuj wyłącznie jesienią i tylko na glebach ciężkich — na lekkich pali materię organiczną.",
  ];

  if (lime === "tlenkowe" && soil !== "ciezka") {
    warnings.unshift(
      "Wybrałeś wapno tlenkowe na glebie innej niż ciężka gliniasta — na glebach lekkich i średnich zastosuj zamiast niego kredę lub dolomit."
    );
  }

  if (caoPer100m2 > SPLIT_THRESHOLD_CAO[soil]) {
    warnings.push(
      `Dawka jest duża (${caoPer100m2.toFixed(1).replace(".", ",")} kg CaO/100 m²) — podziel ją na 2 sezony, wysiewając po połowie jesienią w kolejnych latach.`
    );
  }

  return {
    ...base,
    mode: "wapnowanie",
    phDeficit,
    caoPer100m2,
    limePer100m2,
    limeTotalKg,
    bags25kg,
    costPln,
    bestTerm:
      lime === "tlenkowe"
        ? "Tylko jesień (wrzesień–listopad)"
        : "Jesień (IX–XI) lub wczesna wiosna (III)",
    verdict:
      `Aby podnieść pH z ${currentPh.toFixed(1).replace(".", ",")} do ${target.label}, wysiej równomiernie ${limeTotalKg.toFixed(1).replace(".", ",")} kg wapna na ${area} m² i płytko wymieszaj z glebą.`,
    warnings,
  };
}

export const LIMING_FAQ = [
  {
    question: "Ile wapna potrzebuje trawnik o pH 5,5?",
    answer:
      "Dla trawnika docelowe pH to 6,0–6,5, więc brakuje 0,5 jednostki. Na glebie średniej odpowiada to ok. 4 kg CaO na 100 m², czyli ok. 7 kg kredy lub 7 kg dolomitu na 100 m². Dla trawnika 300 m² kupisz więc jeden worek 25 kg kredy (koszt ok. 26–30 PLN) i jeszcze trochę zostanie.",
  },
  {
    question: "Kiedy najlepiej wapnować ogród?",
    answer:
      "Najlepszy termin to jesień (wrzesień–listopad) — wapno ma całą zimę na przereagowanie z glebą. Drugi termin to wczesna wiosna (marzec), min. 4–6 tygodni przed nawożeniem azotem. Wapno tlenkowe (CaO) stosuj wyłącznie jesienią i tylko na ciężkich glebach gliniastych.",
  },
  {
    question: "Czy można wapnować i nawozić jednocześnie?",
    answer:
      "Nie. Wapno zmieszane z nawozami azotowymi (mocznik, saletra amonowa) lub obornikiem powoduje straty azotu w postaci amoniaku — nawet 30–50% dawki. Zachowaj odstęp minimum 4–6 tygodni: np. wapnuj w październiku, a obornik zastosuj wiosną.",
  },
  {
    question: "Kreda czy dolomit — co wybrać?",
    answer:
      "Kreda (węglan wapnia) działa szybciej i jest bezpieczna na każdej glebie. Dolomit zawiera dodatkowo 15–20% magnezu — wybierz go, gdy rośliny żółkną między nerwami liści (typowy objaw niedoboru Mg). Cenowo dolomit często wygrywa: ok. 0,90 PLN/kg wobec ok. 1,20 PLN/kg za kredę granulowaną.",
  },
  {
    question: "Jak sprawdzić pH gleby przed wapnowaniem?",
    answer:
      "Najprościej kwasomierzem glebowym (20–40 PLN) lub płynnym zestawem Helliga (ok. 15 PLN). Najdokładniej — w okręgowej stacji chemiczno-rolniczej, gdzie analiza próbki kosztuje ok. 20 PLN. Pobierz glebę z 5–10 punktów działki z głębokości 10–20 cm i wymieszaj w jedną próbkę zbiorczą.",
  },
];
