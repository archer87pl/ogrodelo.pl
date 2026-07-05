export interface SoilBarkMaterial {
  id: string;
  label: string;
  /** Gęstość nasypowa w t/m³ */
  density: number;
  /** Cena worka 50 l w PLN (2026) */
  bagPrice50l: number;
  /** Cena za m³ luzem w PLN (2026, bez transportu) */
  bulkPricePerM3: number;
  /** Zalecana grubość warstwy w cm */
  recommendedDepthCm: number;
  /** Podpowiedź o zalecanej warstwie */
  depthHint: string;
}

export const SOIL_BARK_MATERIALS: SoilBarkMaterial[] = [
  {
    id: "ziemia-ogrodowa",
    label: "Ziemia ogrodowa",
    density: 1.2,
    bagPrice50l: 12,
    bulkPricePerM3: 90,
    recommendedDepthCm: 15,
    depthHint: "Zalecana warstwa: 10–20 cm (rabaty, podniesienie terenu)",
  },
  {
    id: "ziemia-pod-trawnik",
    label: "Ziemia pod trawnik (przesiewana)",
    density: 1.1,
    bagPrice50l: 15,
    bulkPricePerM3: 130,
    recommendedDepthCm: 12,
    depthHint: "Zalecana warstwa: 10–15 cm pod nowy trawnik",
  },
  {
    id: "kora-sosnowa",
    label: "Kora sosnowa",
    density: 0.35,
    bagPrice50l: 15,
    bulkPricePerM3: 150,
    recommendedDepthCm: 5,
    depthHint: "Zalecana warstwa: 5 cm (min. 3 cm, by blokować chwasty)",
  },
  {
    id: "zwir-ozdobny",
    label: "Żwir ozdobny",
    density: 1.65,
    bagPrice50l: 40,
    bulkPricePerM3: 380,
    recommendedDepthCm: 6,
    depthHint: "Zalecana warstwa: 5–8 cm na agrowłókninie",
  },
  {
    id: "torf-kwasny",
    label: "Torf kwaśny",
    density: 0.4,
    bagPrice50l: 18,
    bulkPricePerM3: 220,
    recommendedDepthCm: 20,
    depthHint: "Zalecana warstwa: 20–30 cm (borówki, różaneczniki)",
  },
  {
    id: "kompost",
    label: "Kompost",
    density: 0.75,
    bagPrice50l: 14,
    bulkPricePerM3: 110,
    recommendedDepthCm: 3,
    depthHint: "Zalecana warstwa: 2–5 cm jako nawóz organiczny",
  },
];

export function getSoilBarkMaterial(id: string): SoilBarkMaterial {
  return (
    SOIL_BARK_MATERIALS.find((m) => m.id === id) ?? SOIL_BARK_MATERIALS[0]
  );
}

/** Typowy koszt transportu materiału luzem (wywrotka, lokalnie) */
export const BULK_DELIVERY_COST = 150;

const BAG_LITERS = 50;

export interface SoilBarkInput {
  areaM2: number;
  depthCm: number;
  materialId: string;
}

export interface SoilBarkResult {
  material: SoilBarkMaterial;
  volumeM3: number;
  bags50l: number;
  weightTons: number;
  bagCost: number;
  bulkCost: number;
  bulkDeliveryCost: number;
  cheaperOption: "worki" | "luzem";
  savings: number;
  /** Objętość, od której zakup luzem (z transportem) staje się tańszy */
  breakEvenM3: number;
  tips: string[];
}

export function calculateSoilBark(input: SoilBarkInput): SoilBarkResult {
  const material = getSoilBarkMaterial(input.materialId);
  const areaM2 = Math.max(0, input.areaM2);
  const depthCm = Math.max(0, input.depthCm);

  const volumeM3 = Math.round(areaM2 * (depthCm / 100) * 100) / 100;
  const bags50l = Math.ceil((volumeM3 * 1000) / BAG_LITERS);
  const weightTons = Math.round(volumeM3 * material.density * 100) / 100;

  const bagCost = Math.round(bags50l * material.bagPrice50l);
  const bulkCost = Math.round(
    volumeM3 * material.bulkPricePerM3 + (volumeM3 > 0 ? BULK_DELIVERY_COST : 0)
  );

  const cheaperOption: "worki" | "luzem" =
    bagCost <= bulkCost ? "worki" : "luzem";
  const savings = Math.abs(bagCost - bulkCost);

  const bagPricePerM3 = material.bagPrice50l * (1000 / BAG_LITERS);
  const priceDiffPerM3 = bagPricePerM3 - material.bulkPricePerM3;
  const breakEvenM3 =
    priceDiffPerM3 > 0
      ? Math.round((BULK_DELIVERY_COST / priceDiffPerM3) * 10) / 10
      : Infinity;

  const tips: string[] = [
    Number.isFinite(breakEvenM3)
      ? `Dla materiału „${material.label}” zakup luzem opłaca się od ok. ${breakEvenM3.toLocaleString("pl-PL")} m³ — poniżej tego progu transport (ok. ${BULK_DELIVERY_COST} PLN) zjada oszczędność.`
      : `Przy tych cenach worki wychodzą korzystniej niż zakup luzem z transportem.`,
    material.id === "kora-sosnowa"
      ? "Kora osiada i częściowo się rozkłada — zamów ok. 10% zapasu i uzupełniaj warstwę co 1–2 sezony."
      : "Ziemia i kompost osiadają po rozłożeniu — dodaj 10–15% zapasu, a przy podnoszeniu terenu ubijaj warstwami co 10 cm.",
    `Sprawdź wagę przed transportem własnym: Twoje ${volumeM3.toLocaleString("pl-PL")} m³ waży ok. ${weightTons.toLocaleString("pl-PL")} t — typowa przyczepka samochodowa mieści maks. 0,5–0,75 t.`,
  ];

  return {
    material,
    volumeM3,
    bags50l,
    weightTons,
    bagCost,
    bulkCost,
    bulkDeliveryCost: BULK_DELIVERY_COST,
    cheaperOption,
    savings,
    breakEvenM3,
    tips,
  };
}

export const SOIL_BARK_FAQ = [
  {
    question: "Ile worków 50 l mieści się w 1 m³?",
    answer:
      "W 1 m³ mieści się dokładnie 20 worków po 50 l (1000 l ÷ 50 l). Przykład: rabata 10 m² wysypana korą warstwą 5 cm to 0,5 m³, czyli 10 worków 50 l. Przy cenie ok. 15 PLN za worek zapłacisz ok. 150 PLN.",
  },
  {
    question: "Ile kory potrzeba na 1 m² rabaty?",
    answer:
      "Przy zalecanej warstwie 5 cm potrzebujesz 50 l kory na 1 m², czyli równo 1 worek 50 l. Na rabatę 20 m² to 1 m³ (20 worków). Cieńsza warstwa niż 3 cm nie zatrzyma chwastów, a grubsza niż 8 cm może dusić korzenie płytko korzeniących się roślin.",
  },
  {
    question: "Ile waży 1 m³ ziemi ogrodowej?",
    answer:
      "Sucha ziemia ogrodowa waży ok. 1,2 t/m³, a mokra nawet 1,5–1,6 t/m³. Dla porównania: kora sosnowa to tylko ok. 0,35 t/m³, a żwir ozdobny aż 1,6–1,7 t/m³. Worek 50 l ziemi waży ok. 40–60 kg — standardowa przyczepka samochodowa (750 kg DMC) pomieści tylko ok. 0,5 m³ ziemi.",
  },
  {
    question: "Kiedy opłaca się kupować ziemię luzem zamiast w workach?",
    answer:
      "Zwykle już od ok. 1–1,5 m³. Przykład: 2 m³ ziemi ogrodowej w workach to 40 worków × 12 PLN = 480 PLN, a luzem 2 × 90 PLN + ok. 150 PLN transportu = 330 PLN — oszczędzasz ok. 150 PLN. Przy małych ilościach (poniżej 1 m³) koszt transportu sprawia, że worki wychodzą taniej.",
  },
  {
    question: "Ile ziemi potrzeba do podniesienia terenu o 10 cm?",
    answer:
      "Na każde 100 m² działki potrzebujesz 10 m³ ziemi (100 m² × 0,10 m), co waży ok. 12 t. To ładunek jednej wywrotki 8–10 m³. Pamiętaj o zapasie 10–15% na osiadanie — realnie zamów ok. 11–11,5 m³ i ubijaj ziemię warstwami co 10 cm.",
  },
];
