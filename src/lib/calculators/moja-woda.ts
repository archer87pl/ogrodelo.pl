export type InstallationType =
  | "zbiornik-naziemny"
  | "zbiornik-podziemny"
  | "oczko-retencyjne"
  | "system-rozsaczajacy";

export const INSTALLATION_TYPES: {
  value: InstallationType;
  label: string;
}[] = [
  { value: "zbiornik-naziemny", label: "Zbiornik naziemny" },
  { value: "zbiornik-podziemny", label: "Zbiornik podziemny" },
  { value: "oczko-retencyjne", label: "Oczko wodne retencyjne" },
  { value: "system-rozsaczajacy", label: "System rozsączający" },
];

/** Parametry ostatniej edycji programu "Moja Woda" (NFOŚiGW). */
export const MOJA_WODA_PARAMS = {
  /** Maksymalny udział dotacji w kosztach kwalifikowanych. */
  grantRate: 0.8,
  /** Maksymalna kwota dotacji w PLN. */
  maxGrantPln: 6000,
  /** Minimalna wartość inwestycji (koszty kwalifikowane) w PLN. */
  minInvestmentPln: 2000,
  /** Minimalna łączna pojemność retencyjna w litrach (2 m³). */
  minCapacityLiters: 2000,
} as const;

/** Sprawność zbierania deszczówki z dachu. */
const ROOF_EFFICIENCY = 0.85;
/** Sezonowe zapotrzebowanie ogrodu na wodę do podlewania (l/m²/sezon). */
const GARDEN_WATER_NEED_L_PER_M2 = 450;
/** Orientacyjna cena wody wodociągowej z odprowadzeniem ścieków (PLN/m³). */
const WATER_PRICE_PLN_PER_M3 = 12;

export interface MojaWodaInput {
  /** Koszt zbiornika / instalacji w PLN. */
  installationCost: number;
  /** Pojemność zbiornika (łączna pojemność retencyjna) w litrach. */
  tankCapacityLiters: number;
  /** Typ instalacji retencyjnej. */
  installationType: InstallationType;
  /** Powierzchnia dachu w m². */
  roofArea: number;
  /** Roczne opady w mm. */
  annualPrecipitation: number;
  /** Powierzchnia podlewanego ogrodu w m². */
  gardenArea: number;
}

export interface MojaWodaResult {
  /** Czy inwestycja spełnia progi programu. */
  eligible: boolean;
  /** Powody braku kwalifikacji (puste, gdy eligible = true). */
  ineligibilityReasons: string[];
  /** Kwota dotacji w PLN (0, gdy brak kwalifikacji). */
  grantPln: number;
  /** Koszt inwestycji po odjęciu dotacji w PLN. */
  costAfterGrantPln: number;
  /** Zebrana deszczówka w m³ rocznie. */
  collectedRainwaterM3: number;
  /** Roczna oszczędność na wodzie w PLN. */
  annualSavingsPln: number;
  /** Zwrot inwestycji z dotacją w latach (null, gdy brak oszczędności). */
  paybackWithGrantYears: number | null;
  /** Zwrot inwestycji bez dotacji w latach (null, gdy brak oszczędności). */
  paybackWithoutGrantYears: number | null;
  /** Wskazówki dla użytkownika. */
  tips: string[];
}

export function calculateMojaWoda(input: MojaWodaInput): MojaWodaResult {
  const {
    installationCost,
    tankCapacityLiters,
    installationType,
    roofArea,
    annualPrecipitation,
    gardenArea,
  } = input;

  const { grantRate, maxGrantPln, minInvestmentPln, minCapacityLiters } =
    MOJA_WODA_PARAMS;

  const ineligibilityReasons: string[] = [];
  if (installationCost < minInvestmentPln) {
    ineligibilityReasons.push(
      `Koszt inwestycji jest niższy niż minimalne ${minInvestmentPln.toLocaleString("pl-PL")} PLN kosztów kwalifikowanych.`
    );
  }
  if (tankCapacityLiters < minCapacityLiters) {
    ineligibilityReasons.push(
      `Pojemność retencyjna jest mniejsza niż wymagane ${minCapacityLiters.toLocaleString("pl-PL")} l (2 m³). Możesz połączyć kilka zbiorników, aby osiągnąć minimalną pojemność.`
    );
  }
  const eligible = ineligibilityReasons.length === 0;

  const grantPln = eligible
    ? Math.round(Math.min(grantRate * installationCost, maxGrantPln))
    : 0;
  const costAfterGrantPln = Math.max(0, Math.round(installationCost - grantPln));

  // Zebrana deszczówka: dach [m²] × opady [mm = l/m²] × sprawność.
  const collectedLitersPerYear = roofArea * annualPrecipitation * ROOF_EFFICIENCY;
  // Zapotrzebowanie ogrodu w sezonie.
  const gardenNeedLiters = gardenArea * GARDEN_WATER_NEED_L_PER_M2;
  // Oszczędzasz tylko tyle, ile realnie zużyjesz.
  const usedLiters = Math.min(collectedLitersPerYear, gardenNeedLiters);
  const annualSavingsPln =
    Math.round(((usedLiters / 1000) * WATER_PRICE_PLN_PER_M3) * 100) / 100;

  const paybackWithGrantYears =
    annualSavingsPln > 0
      ? Math.round((costAfterGrantPln / annualSavingsPln) * 10) / 10
      : null;
  const paybackWithoutGrantYears =
    annualSavingsPln > 0
      ? Math.round((installationCost / annualSavingsPln) * 10) / 10
      : null;

  const typeTip =
    installationType === "zbiornik-podziemny"
      ? "Zbiornik podziemny chroni wodę przed glonami i mrozem — możesz korzystać z deszczówki przez cały rok."
      : installationType === "oczko-retencyjne"
        ? "Oczko retencyjne pełni podwójną rolę: magazynuje wodę i podnosi bioróżnorodność ogrodu."
        : installationType === "system-rozsaczajacy"
          ? "System rozsączający zatrzymuje wodę na działce i odciąża kanalizację deszczową podczas ulew."
          : "Zbiornik naziemny opróżnij przed zimą, aby mróz nie uszkodził ścianek.";

  return {
    eligible,
    ineligibilityReasons,
    grantPln,
    costAfterGrantPln,
    collectedRainwaterM3: Math.round((collectedLitersPerYear / 1000) * 10) / 10,
    annualSavingsPln,
    paybackWithGrantYears,
    paybackWithoutGrantYears,
    tips: [
      "Zbieraj faktury i protokoły montażu — to podstawa rozliczenia dotacji w WFOŚiGW.",
      typeTip,
      "Zainstaluj filtr liści na rynnie i przelew awaryjny — przedłużysz żywotność instalacji.",
    ],
  };
}

export const MOJA_WODA_FAQ: { question: string; answer: string }[] = [
  {
    question: "Ile wynosi dotacja z programu Moja Woda?",
    answer:
      "W ostatniej edycji programu Moja Woda dofinansowanie wynosiło do 80% kosztów kwalifikowanych, maksymalnie 6 000 PLN. Minimalna wartość inwestycji to 2 000 PLN, a łączna pojemność retencyjna instalacji musi wynosić co najmniej 2 m³. Nabory są ogłaszane okresowo, więc kwoty i warunki mogą się zmienić — sprawdź aktualny nabór na stronie swojego WFOŚiGW.",
  },
  {
    question: "Kto może skorzystać z programu Moja Woda?",
    answer:
      "Program jest skierowany do właścicieli i współwłaścicieli domów jednorodzinnych (także nowo budowanych, jeśli dom zostanie oddany do użytku przed rozliczeniem dotacji). Wniosek składa się elektronicznie przez portal beneficjenta właściwego Wojewódzkiego Funduszu Ochrony Środowiska i Gospodarki Wodnej (WFOŚiGW).",
  },
  {
    question: "Jakie instalacje obejmuje dofinansowanie Moja Woda?",
    answer:
      "Dotacja obejmuje m.in. zbiorniki naziemne i podziemne na deszczówkę, oczka wodne o funkcji retencyjnej, systemy rozsączające oraz elementy towarzyszące: przewody odprowadzające wodę z rynien, pompy, filtry i instalacje do wykorzystania zmagazynowanej wody. Warunkiem jest łączna pojemność retencyjna co najmniej 2 m³.",
  },
  {
    question: "Czy dotacja Moja Woda naprawdę się opłaca?",
    answer:
      "Tak — dotacja skraca okres zwrotu inwestycji nawet kilkukrotnie. Przykład: zbiornik za 6 000 PLN przy oszczędności 400 PLN rocznie zwraca się bez dotacji po 15 latach, a z dotacją 4 800 PLN — już po 3 latach. Dodatkowo podlewanie deszczówką jest lepsze dla roślin niż twarda woda wodociągowa.",
  },
  {
    question: "Kiedy jest nabór do programu Moja Woda?",
    answer:
      "Nabory do programu Moja Woda są ogłaszane okresowo przez NFOŚiGW i prowadzone przez wojewódzkie fundusze (WFOŚiGW). Środki w każdej edycji są ograniczone i często wyczerpują się przed terminem. Aktualne informacje o naborze, kwotach i wymaganych dokumentach znajdziesz na stronie WFOŚiGW właściwego dla Twojego województwa.",
  },
];
