export type ComposterType = "otwarty" | "termokompostownik" | "rotacyjny";

export interface CompostInput {
  householdSize: number;
  gardenArea: number;
  lawnArea: number;
  kitchenScraps: boolean;
  composterType: ComposterType;
}

export interface CompostResult {
  annualInputLiters: number;
  recommendedCapacityLiters: number;
  capacityLabel: string;
  dimensionsLabel: string;
  readyAfterLabel: string;
  compostLitersPerYear: number;
  compostKgPerYear: number;
  savingsPlnPerYear: number;
  tips: string[];
}

/** Odpady kuchenne: ok. 0,5–1 l na osobę dziennie (przyjmujemy środek widełek). */
const KITCHEN_LITERS_PER_PERSON_PER_DAY = 0.75;
/** Skoszona trawa: ok. 1–2 l na m² trawnika rocznie (po podsuszeniu). */
const GRASS_LITERS_PER_M2_PER_YEAR = 1.5;
/** Liście i resztki ogrodowe: ok. 2 l na m² ogrodu rocznie. */
const GARDEN_LITERS_PER_M2_PER_YEAR = 2;
/** Materiał osiada w trakcie rozkładu — pryzma "kurczy się" o ok. połowę. */
const SETTLING_FACTOR = 0.5;
/** Z wsadu zostaje ok. 30% objętości gotowego kompostu. */
const COMPOST_YIELD_FACTOR = 0.3;
/** Dojrzały kompost waży ok. 0,65 kg/l (650 kg/m³). */
const COMPOST_DENSITY_KG_PER_L = 0.65;
/** Kupny kompost workowany: ok. 1,5 PLN/l (ceny 2026). */
const BAGGED_COMPOST_PRICE_PLN_PER_L = 1.5;

const TYPICAL_SIZES = [400, 600, 800, 1000, 1600] as const;

const DIMENSIONS: Record<number, string> = {
  400: "0,75 × 0,75 × 0,75 m",
  600: "0,85 × 0,85 × 0,85 m",
  800: "0,95 × 0,95 × 0,9 m",
  1000: "1 × 1 × 1 m",
  1600: "1,3 × 1,3 × 1 m",
};

const READY_AFTER: Record<ComposterType, string> = {
  otwarty: "12–24 mies.",
  termokompostownik: "6–8 mies.",
  rotacyjny: "2–3 mies.",
};

export function calculateCompost(input: CompostInput): CompostResult {
  const householdSize = Math.max(0, input.householdSize || 0);
  const gardenArea = Math.max(0, input.gardenArea || 0);
  const lawnArea = Math.max(0, input.lawnArea || 0);

  const kitchenLiters = input.kitchenScraps
    ? householdSize * KITCHEN_LITERS_PER_PERSON_PER_DAY * 365
    : 0;
  const grassLiters = lawnArea * GRASS_LITERS_PER_M2_PER_YEAR;
  const gardenLiters = gardenArea * GARDEN_LITERS_PER_M2_PER_YEAR;

  const annualInputLiters = Math.round(
    kitchenLiters + grassLiters + gardenLiters
  );

  const requiredLiters = annualInputLiters * SETTLING_FACTOR;

  const matchedSize = TYPICAL_SIZES.find((s) => s >= requiredLiters);
  let recommendedCapacityLiters: number;
  let capacityLabel: string;
  let dimensionsLabel: string;

  if (matchedSize !== undefined) {
    recommendedCapacityLiters = matchedSize;
    capacityLabel = `${matchedSize} l`;
    dimensionsLabel = DIMENSIONS[matchedSize];
  } else {
    const chambers = Math.max(2, Math.ceil(requiredLiters / 1000));
    recommendedCapacityLiters = chambers * 1000;
    capacityLabel = `${chambers} × 1000 l`;
    dimensionsLabel = `${chambers} ${chambers < 5 ? "komory" : "komór"} po 1 × 1 × 1 m`;
  }

  const compostLitersPerYear = Math.round(
    annualInputLiters * COMPOST_YIELD_FACTOR
  );
  const compostKgPerYear = Math.round(
    compostLitersPerYear * COMPOST_DENSITY_KG_PER_L
  );
  const savingsPlnPerYear = Math.round(
    compostLitersPerYear * BAGGED_COMPOST_PRICE_PLN_PER_L
  );

  return {
    annualInputLiters,
    recommendedCapacityLiters,
    capacityLabel,
    dimensionsLabel,
    readyAfterLabel: READY_AFTER[input.composterType],
    compostLitersPerYear,
    compostKgPerYear,
    savingsPlnPerYear,
    tips: [
      "Zachowuj proporcję warstw ok. 1:2 — jedna część zielonych (trawa, resztki kuchenne) na dwie części brązowych (liście, gałązki, karton).",
      "Przerzucaj pryzmę co 4–6 tygodni — napowietrzenie potrafi skrócić kompostowanie nawet o połowę.",
      "Utrzymuj wilgotność wyciśniętej gąbki: materiał ma być wilgotny w dotyku, ale woda nie może z niego kapać.",
    ],
  };
}

export const COMPOST_FAQ = [
  {
    question:
      "Jaki kompostownik na 4-osobową rodzinę z ogrodem 300 m²?",
    answer:
      "Czteroosobowa rodzina wytwarza ok. 0,5–1 l odpadów kuchennych na osobę dziennie, czyli ok. 1100 l rocznie. Do tego dochodzi ok. 600 l liści i resztek z ogrodu 300 m² oraz skoszona trawa. Po uwzględnieniu osiadania (ok. 50%) potrzebny jest kompostownik o pojemności 800–1000 l, np. skrzynia 1 × 1 × 1 m.",
  },
  {
    question: "Ile materiału do kompostowania daje trawnik 200 m²?",
    answer:
      "Trawnik koszony regularnie przez sezon daje ok. 1–2 l podsuszonej skoszonej masy z m² rocznie, czyli z 200 m² zbierzesz ok. 300 l trawy. To cenny materiał zielony (bogaty w azot) — mieszaj go z 2 razy większą ilością brązowych, np. suchych liści, żeby pryzma nie gniła.",
  },
  {
    question: "Po jakim czasie kompost jest gotowy do użycia?",
    answer:
      "W zamkniętym termokompostowniku dojrzały kompost uzyskasz po 6–8 miesiącach, w kompostowniku rotacyjnym (bębnowym) nawet po 2–3 miesiącach, a w otwartej drewnianej skrzyni proces trwa 12–24 miesiące. Regularne przerzucanie co 4–6 tygodni wyraźnie przyspiesza rozkład.",
  },
  {
    question: "Czego nie wolno wrzucać do kompostownika?",
    answer:
      "Unikaj mięsa, ryb i nabiału (przyciągają gryzonie), chorych roślin i chwastów z nasionami (patogeny i nasiona przetrwają w pryzmie poniżej 60°C), skórek cytrusów w dużych ilościach oraz popiołu z węgla. Bezpieczne są trawa, liście, fusy z kawy, skorupki jajek i rozdrobnione gałęzie do ok. 1 cm grubości.",
  },
  {
    question: "Ile pieniędzy oszczędza własny kompost?",
    answer:
      "Kupny kompost workowany kosztuje ok. 1,5 PLN za litr (ceny 2026). Przeciętny ogród 200–300 m² z 3-osobową rodziną daje ok. 300–500 l gotowego kompostu rocznie, czyli 450–750 PLN oszczędności — a przy okazji o ok. 30% mniej odpadów w brązowym pojemniku.",
  },
];
