export type FenceType =
  | "panel2d"
  | "panel3d"
  | "siatka"
  | "sztachety"
  | "gabiony";

export interface FenceTypeData {
  id: FenceType;
  label: string;
  /** Szerokość przęsła / panelu / modułu w metrach */
  spanWidth: number;
  /** Cena materiału (przęsło/siatka) za metr bieżący, PLN */
  materialPerM: number;
  /** Cena jednego słupka, PLN */
  postPrice: number;
  /** Cena furtki z montażem zawiasów i zamka, PLN */
  wicketPrice: number;
  /** Cena bramy wjazdowej (dwuskrzydłowej), PLN */
  gatePrice: number;
  /** Szacunkowa robocizna, PLN za metr bieżący */
  laborPerM: number;
}

/** Realistyczne ceny rynkowe 2026 (średnie z hurtowni i wycen ekip) */
export const FENCE_TYPES: FenceTypeData[] = [
  {
    id: "panel2d",
    label: "Panel 2D (ocynk + RAL)",
    spanWidth: 2.5,
    materialPerM: 95,
    postPrice: 75,
    wicketPrice: 950,
    gatePrice: 2800,
    laborPerM: 120,
  },
  {
    id: "panel3d",
    label: "Panel 3D (ocynk + RAL)",
    spanWidth: 2.5,
    materialPerM: 70,
    postPrice: 65,
    wicketPrice: 850,
    gatePrice: 2500,
    laborPerM: 110,
  },
  {
    id: "siatka",
    label: "Siatka pleciona",
    spanWidth: 2.5,
    materialPerM: 38,
    postPrice: 48,
    wicketPrice: 600,
    gatePrice: 1600,
    laborPerM: 70,
  },
  {
    id: "sztachety",
    label: "Sztachety drewniane",
    spanWidth: 2.0,
    materialPerM: 150,
    postPrice: 95,
    wicketPrice: 800,
    gatePrice: 2400,
    laborPerM: 160,
  },
  {
    id: "gabiony",
    label: "Gabiony (kosz + kamień)",
    spanWidth: 2.0,
    materialPerM: 520,
    postPrice: 140,
    wicketPrice: 1500,
    gatePrice: 4500,
    laborPerM: 260,
  },
];

/** Standardowe światło furtki i bramy wjazdowej w metrach */
const WICKET_WIDTH = 1;
const GATE_WIDTH = 4;

export interface FenceInput {
  /** Całkowita długość ogrodzenia w metrach */
  length: number;
  /** Liczba furtek */
  wickets: number;
  /** Liczba bram wjazdowych */
  gates: number;
  fenceType: FenceType;
}

export interface FenceResult {
  /** Liczba paneli / przęseł do kupienia */
  panels: number;
  /** Liczba słupków (z dodatkowymi przy furtkach i bramach) */
  posts: number;
  /** Długość samego wypełnienia (bez furtek i bram), m */
  netLength: number;
  /** Koszt materiałów (przęsła + słupki + furtki + bramy), PLN */
  materialCost: number;
  /** Koszt całkowity z robocizną, PLN */
  totalCost: number;
  /** Koszt z robocizną w przeliczeniu na metr bieżący, PLN */
  costPerMeter: number;
  /** Porównanie wszystkich rodzajów ogrodzeń dla tych samych danych */
  comparison: {
    id: FenceType;
    label: string;
    materialCost: number;
    totalCost: number;
  }[];
  tips: string[];
}

export function getFenceType(id: FenceType): FenceTypeData {
  return FENCE_TYPES.find((t) => t.id === id) ?? FENCE_TYPES[0];
}

function calculateForType(
  type: FenceTypeData,
  length: number,
  wickets: number,
  gates: number
): { panels: number; posts: number; netLength: number; materialCost: number; totalCost: number } {
  const netLength = Math.max(
    0,
    length - wickets * WICKET_WIDTH - gates * GATE_WIDTH
  );
  const panels = Math.ceil(netLength / type.spanWidth);
  // Słupki: liczba przęseł + 1, plus dodatkowy słupek na każdą furtkę
  // i wzmocnione słupki (2 szt.) na każdą bramę
  const posts = panels + 1 + wickets + gates * 2;

  const materialCost = Math.round(
    panels * type.spanWidth * type.materialPerM +
      posts * type.postPrice +
      wickets * type.wicketPrice +
      gates * type.gatePrice
  );
  const totalCost = Math.round(materialCost + length * type.laborPerM);

  return { panels, posts, netLength, materialCost, totalCost };
}

export function calculateFence(input: FenceInput): FenceResult {
  const length = Math.max(0, input.length);
  const wickets = Math.max(0, Math.round(input.wickets));
  const gates = Math.max(0, Math.round(input.gates));
  const type = getFenceType(input.fenceType);

  const base = calculateForType(type, length, wickets, gates);
  const costPerMeter =
    length > 0 ? Math.round(base.totalCost / length) : 0;

  const comparison = FENCE_TYPES.map((t) => {
    const r = calculateForType(t, length, wickets, gates);
    return {
      id: t.id,
      label: t.label,
      materialCost: r.materialCost,
      totalCost: r.totalCost,
    };
  });

  return {
    ...base,
    netLength: Math.round(base.netLength * 10) / 10,
    costPerMeter,
    comparison,
    tips: [
      "Podmurówka prefabrykowana (deska 20–25 cm + łączniki) to dodatkowo ok. 70–100 PLN za metr bieżący — nie jest wliczona w wycenę.",
      "Ogrodzenie o wysokości powyżej 2,2 m wymaga zgłoszenia do starostwa. Do 2,2 m od strony sąsiada i drogi budujesz bez formalności.",
      "Panele ocynkowane ogniowo i malowane proszkowo (RAL) wytrzymują 25–30 lat bez konserwacji — dopłata ok. 15–20% do surowego ocynku szybko się zwraca.",
    ],
  };
}

export const FENCE_FAQ = [
  {
    question: "Ile kosztuje ogrodzenie panelowe za metr bieżący?",
    answer:
      "Ogrodzenie z paneli 3D (najpopularniejsze) kosztuje ok. 180–220 PLN/mb z montażem: panel ok. 70 PLN/mb, słupek 65 PLN co 2,5 m i robocizna ok. 110 PLN/mb. Panel 2D z grubszych prętów to ok. 220–280 PLN/mb. Podmurówka prefabrykowana dolicza kolejne 70–100 PLN/mb.",
  },
  {
    question: "Ile paneli ogrodzeniowych potrzebuję na 100 m ogrodzenia?",
    answer:
      "Standardowy panel ma 2,5 m szerokości. Na 100 m (po odjęciu furtki 1 m i bramy 4 m zostaje 95 m) potrzebujesz 38 paneli i ok. 42 słupków — 39 do przęseł plus dodatkowe przy furtce i bramie. Zawsze kupuj 1–2 panele zapasu na docinki przy narożnikach.",
  },
  {
    question: "Co jest tańsze: siatka czy panele ogrodzeniowe?",
    answer:
      "Siatka pleciona jest wyraźnie tańsza: materiał ok. 38 PLN/mb plus słupek 48 PLN, czyli z robocizną ok. 120–130 PLN/mb wobec 180–220 PLN/mb dla paneli 3D. Na 100 m ogrodzenia różnica to ok. 6 000–9 000 PLN. Panele są jednak sztywniejsze, trwalsze i lepiej wyglądają.",
  },
  {
    question: "Czy budowa ogrodzenia wymaga pozwolenia lub zgłoszenia?",
    answer:
      "Ogrodzenie do 2,2 m wysokości nie wymaga ani pozwolenia, ani zgłoszenia — również od strony drogi. Powyżej 2,2 m konieczne jest zgłoszenie do starostwa (organ ma 21 dni na sprzeciw). Uwaga: ogrodzenie stawiasz w osi granicy tylko za zgodą sąsiada, inaczej całe na swojej działce.",
  },
  {
    question: "Ile kosztuje brama wjazdowa i furtka do ogrodzenia panelowego?",
    answer:
      "Furtka systemowa (szer. 1 m) z zamkiem to ok. 850–950 PLN, brama dwuskrzydłowa 4 m ok. 2 500–2 800 PLN, a przesuwna 4 m ok. 4 500–6 000 PLN. Do tego napęd elektryczny to wydatek 1 500–3 000 PLN. Przy bramie montuje się wzmocnione słupki (min. 80×80 mm) w betonowych fundamentach.",
  },
];
