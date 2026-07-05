export type PondShape = "rectangular" | "oval" | "irregular";

export interface PondShapeOption {
  value: PondShape;
  label: string;
  volumeFactor: number;
}

export const POND_SHAPES: PondShapeOption[] = [
  { value: "rectangular", label: "Prostokątne", volumeFactor: 1.0 },
  { value: "oval", label: "Owalne", volumeFactor: 0.85 },
  { value: "irregular", label: "Nieregularne", volumeFactor: 0.75 },
];

export interface PondInput {
  length: number;
  width: number;
  depth: number;
  shape: PondShape;
  hasFish: boolean;
}

export interface PondCostItem {
  label: string;
  price: number;
}

export interface PondResult {
  volumeLiters: number;
  linerLength: number;
  linerWidth: number;
  linerArea: number;
  pumpFlow: number;
  edgePlants: number;
  shallowPlants: number;
  lilies: number;
  totalPlants: number;
  costItems: PondCostItem[];
  totalPVC: number;
  totalEPDM: number;
  tips: string[];
  fishWarning: string | null;
}

const PVC_PRICE_PER_M2 = 25;
const EPDM_PRICE_PER_M2 = 45;
const GEOTEXTILE_PRICE_PER_M2 = 6;
const EDGE_PLANT_PRICE = 12;
const SHALLOW_PLANT_PRICE = 18;
const LILY_PRICE = 45;

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function estimatePumpPrice(flow: number, hasFish: boolean): number {
  if (hasFish) {
    // Zestaw: pompa + filtr ciśnieniowy z lampą UV-C
    if (flow <= 2500) return 700;
    if (flow <= 5000) return 1200;
    if (flow <= 8000) return 1800;
    return 2600;
  }
  if (flow <= 1000) return 250;
  if (flow <= 2500) return 450;
  if (flow <= 5000) return 800;
  if (flow <= 8000) return 1300;
  return 1900;
}

export function calculatePond(input: PondInput): PondResult {
  const { length, width, depth, shape, hasFish } = input;

  const shapeOption =
    POND_SHAPES.find((s) => s.value === shape) ?? POND_SHAPES[0];
  const factor = shapeOption.volumeFactor;

  // Objętość wody: dł × szer × głęb × współczynnik kształtu (1000 l = 1 m³)
  const volumeLiters = Math.round(length * width * depth * factor * 1000);

  // Folia: każdy wymiar + 2 × głębokość + 0,6 m zakładu na brzegi
  const linerLength = round1(length + 2 * depth + 0.6);
  const linerWidth = round1(width + 2 * depth + 0.6);
  const linerArea = round1(linerLength * linerWidth);

  // Pompa: cały obieg wody w 1–2 h; z rybami filtracja mocniejsza (obieg w 1 h)
  const rawFlow = hasFish ? volumeLiters : volumeLiters / 2;
  const pumpFlow = Math.max(300, Math.ceil(rawFlow / 100) * 100);

  // Rośliny wg stref
  const perimeter = 2 * (length + width) * (shape === "oval" ? 0.89 : 1);
  const surfaceArea = length * width * factor;
  const edgePlants = Math.ceil(perimeter * 3); // strefa brzegowa: ~3 szt/mb
  const shallowPlants = Math.ceil(surfaceArea * 0.3 * 2); // strefa płytka: ~30% lustra, 2 szt/m²
  const lilies = Math.max(1, Math.ceil((surfaceArea * 0.5) / 2.5)); // lilie: 1 szt/2,5 m² strefy głębokiej
  const totalPlants = edgePlants + shallowPlants + lilies;

  // Kosztorys (orientacyjne ceny 2026)
  const linerPVC = Math.round(linerArea * PVC_PRICE_PER_M2);
  const linerEPDM = Math.round(linerArea * EPDM_PRICE_PER_M2);
  const geotextile = Math.round(linerArea * GEOTEXTILE_PRICE_PER_M2);
  const pumpPrice = estimatePumpPrice(pumpFlow, hasFish);
  const plantsPrice =
    edgePlants * EDGE_PLANT_PRICE +
    shallowPlants * SHALLOW_PLANT_PRICE +
    lilies * LILY_PRICE;

  const costItems: PondCostItem[] = [
    { label: `Folia PVC 0,5 mm (${linerArea} m² × 25 PLN)`, price: linerPVC },
    { label: `Folia EPDM 1,0 mm (${linerArea} m² × 45 PLN)`, price: linerEPDM },
    {
      label: `Geowłóknina 300 g/m² (${linerArea} m² × 6 PLN)`,
      price: geotextile,
    },
    {
      label: hasFish
        ? `Pompa ${pumpFlow} l/h + filtr ciśnieniowy z UV-C`
        : `Pompa ${pumpFlow} l/h z filtrem przepływowym`,
      price: pumpPrice,
    },
    { label: `Rośliny wodne (${totalPlants} szt.)`, price: plantsPrice },
  ];

  const totalPVC = linerPVC + geotextile + pumpPrice + plantsPrice;
  const totalEPDM = linerEPDM + geotextile + pumpPrice + plantsPrice;

  const tips = [
    "Wybierz miejsce z 5–6 godzinami słońca dziennie, ale nie w pełnym południowym nasłonecznieniu — woda będzie się mniej przegrzewać i glony wolniej się rozwiną.",
    "Unikaj lokalizacji pod drzewami liściastymi — opadające jesienią liście gniją na dnie i psują jakość wody.",
    "Formuj strefy głębokości tarasowo: półki co 20–30 cm ułatwiają sadzenie roślin w koszach i bezpieczne wyjście dla zwierząt.",
  ];

  let fishWarning: string | null = null;
  if (hasFish) {
    if (depth < 0.8) {
      fishWarning = `Głębokość ${depth.toFixed(1).replace(".", ",")} m to za mało dla ryb. Do bezpiecznego zimowania ryb w polskim klimacie potrzebujesz minimum 80–100 cm głębokości — przy tej wartości dno przemarznie.`;
      tips.push(
        "Pogłęb zbiornik do min. 0,8–1,0 m, jeśli ryby mają zimować w oczku — inaczej trzeba je przenosić na zimę do akwarium lub zbiornika w budynku."
      );
    } else {
      fishWarning =
        "Pamiętaj: ryby zimują w oczku bezpiecznie tylko przy głębokości min. 80–100 cm. Twoja głębokość spełnia ten warunek — utrzymuj zimą przerębel lub napowietrzacz.";
    }
  }

  return {
    volumeLiters,
    linerLength,
    linerWidth,
    linerArea,
    pumpFlow,
    edgePlants,
    shallowPlants,
    lilies,
    totalPlants,
    costItems,
    totalPVC,
    totalEPDM,
    tips,
    fishWarning,
  };
}

export const POND_FAQ = [
  {
    question: "Ile litrów wody mieści oczko wodne 3 × 2 m?",
    answer:
      "Przy głębokości 1 m owalne oczko 3 × 2 m mieści ok. 5100 l (3 × 2 × 1 × 0,85 × 1000). Prostokątne o tych samych wymiarach to ok. 6000 l, a nieregularne ok. 4500 l. Kalkulator uwzględnia współczynnik kształtu automatycznie.",
  },
  {
    question: "Jak obliczyć wymiar folii na oczko wodne?",
    answer:
      "Do każdego wymiaru dodaj podwójną głębokość i 0,6 m zakładu na brzegi: (długość + 2 × głębokość + 0,6) × (szerokość + 2 × głębokość + 0,6). Dla oczka 3 × 2 m o głębokości 1 m potrzebujesz folii 5,6 × 4,6 m, czyli ok. 26 m².",
  },
  {
    question: "Jaką pompę wybrać do oczka wodnego?",
    answer:
      "Pompa powinna przepompować całą objętość wody w 1–2 godziny. Dla oczka 4000 l wystarczy pompa 2000–4000 l/h. Jeśli trzymasz ryby, wybierz mocniejszy zestaw z filtrem ciśnieniowym i lampą UV-C — obieg całej wody w 1 godzinę, czyli min. 4000 l/h.",
  },
  {
    question: "Ile kosztuje budowa oczka wodnego w 2026 roku?",
    answer:
      "Małe oczko 6 m² (3 × 2 m) z folią PVC to ok. 1500–2500 PLN (folia ok. 650 PLN, geowłóknina ok. 160 PLN, pompa z filtrem 450–1200 PLN, rośliny 400–700 PLN). Z trwalszą folią EPDM (ok. 45 PLN/m²) budżet rośnie o 500–600 PLN, ale folia wytrzyma 30–40 lat zamiast 10–15.",
  },
  {
    question: "Jak głębokie musi być oczko wodne dla ryb?",
    answer:
      "Minimum 80–100 cm, aby ryby przetrwały zimę poniżej strefy przemarzania. Dla karpi koi zaleca się nawet 120–150 cm. W płytszym zbiorniku (np. 50 cm) ryby trzeba na zimę przenosić do pomieszczenia, a latem woda przegrzewa się powyżej 25°C.",
  },
];
