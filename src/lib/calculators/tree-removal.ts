export type TreeRemovalWho = "prywatna" | "firma";

export type TreeSpeciesGroup =
  | "topola" // topola, wierzba, klon jesionolistny, klon srebrzysty — próg 80 cm
  | "kasztanowiec" // kasztanowiec zwyczajny, robinia akacjowa, platan klonolistny — próg 65 cm
  | "pozostale" // pozostałe gatunki drzew — próg 50 cm
  | "owocowe" // drzewa owocowe — zwolnione z formalności
  | "krzew"; // krzew lub skupisko krzewów — próg 25 m² powierzchni

export interface TreeRemovalInput {
  who: TreeRemovalWho;
  species: TreeSpeciesGroup;
  /** Obwód pnia mierzony na wysokości 5 cm nad ziemią (cm). */
  circumference5cm: number;
  /** Powierzchnia krzewu / skupiska krzewów (m²) — używana tylko dla grupy "krzew". */
  shrubArea: number;
  /** Obwód pnia na wysokości 130 cm (cm) — do szacowania opłaty przy zezwoleniu. */
  circumference130cm: number;
  /** Nieruchomość wpisana do rejestru zabytków. */
  isHeritageProperty: boolean;
  /** Drzewo jest pomnikiem przyrody. */
  isNatureMonument: boolean;
  /** Teren objęty ochroną (park krajobrazowy, rezerwat przyrody). */
  isProtectedArea: boolean;
}

export type TreeRemovalVerdict =
  | "bez-formalnosci"
  | "zgloszenie"
  | "zezwolenie"
  | "konserwator"
  | "pomnik-przyrody";

export interface TreeRemovalFee {
  min: number;
  max: number;
}

export interface TreeRemovalResult {
  verdict: TreeRemovalVerdict;
  verdictLabel: string;
  color: "green" | "yellow" | "red";
  summary: string;
  steps: string[];
  /** Próg zwolnienia dla wybranej grupy (cm obwodu na 5 cm albo m² dla krzewów). */
  threshold: number | null;
  thresholdUnit: "cm" | "m²" | null;
  /** Szacunkowa opłata za zezwolenie (tylko wariant firmowy/gospodarczy). */
  estimatedFee: TreeRemovalFee | null;
  /** Szacunkowa kara administracyjna za samowolną wycinkę (2 × opłata). */
  estimatedPenalty: TreeRemovalFee | null;
  warnings: string[];
  tips: string[];
}

export const SPECIES_GROUP_OPTIONS: {
  value: TreeSpeciesGroup;
  label: string;
}[] = [
  {
    value: "topola",
    label: "Topola, wierzba, klon jesionolistny, klon srebrzysty (próg 80 cm)",
  },
  {
    value: "kasztanowiec",
    label:
      "Kasztanowiec zwyczajny, robinia akacjowa, platan klonolistny (próg 65 cm)",
  },
  { value: "pozostale", label: "Pozostałe gatunki drzew (próg 50 cm)" },
  { value: "owocowe", label: "Drzewo owocowe (zwolnione)" },
  { value: "krzew", label: "Krzew / skupisko krzewów (próg 25 m²)" },
];

const TREE_THRESHOLDS: Record<
  Exclude<TreeSpeciesGroup, "owocowe" | "krzew">,
  number
> = {
  topola: 80,
  kasztanowiec: 65,
  pozostale: 50,
};

export const SHRUB_AREA_THRESHOLD = 25; // m²

/**
 * Uproszczone stawki opłat za usunięcie drzewa (PLN za 1 cm obwodu pnia
 * mierzonego na wysokości 130 cm) wg rozporządzenia w sprawie stawek opłat —
 * dwa progi wielkości, wartości szacunkowe. Pełny zakres stawek w
 * rozporządzeniu to ok. 12–210 PLN/cm zależnie od gatunku.
 */
const FEE_RATES: Record<
  Exclude<TreeSpeciesGroup, "owocowe" | "krzew">,
  { small: TreeRemovalFee; large: TreeRemovalFee }
> = {
  topola: { small: { min: 12, max: 15 }, large: { min: 15, max: 25 } },
  kasztanowiec: { small: { min: 15, max: 25 }, large: { min: 25, max: 40 } },
  pozostale: { small: { min: 25, max: 55 }, large: { min: 55, max: 210 } },
};

const FEE_SIZE_BREAKPOINT = 100; // cm obwodu na 130 cm

function roundFee(value: number): number {
  return Math.round(value / 10) * 10;
}

function estimateFee(
  species: TreeSpeciesGroup,
  circumference130cm: number
): TreeRemovalFee | null {
  if (species === "owocowe" || species === "krzew") return null;
  if (circumference130cm <= 0) return null;
  const rates = FEE_RATES[species];
  const tier =
    circumference130cm <= FEE_SIZE_BREAKPOINT ? rates.small : rates.large;
  return {
    min: roundFee(circumference130cm * tier.min),
    max: roundFee(circumference130cm * tier.max),
  };
}

const BIRD_SEASON_WARNING =
  "Okres lęgowy ptaków trwa od 1 marca do 15 października — jeśli w koronie drzewa lub w krzewach są gniazda, zaplanuj wycinkę poza tym okresem.";

export function evaluateTreeRemoval(
  input: TreeRemovalInput
): TreeRemovalResult {
  const {
    who,
    species,
    circumference5cm,
    shrubArea,
    circumference130cm,
    isHeritageProperty,
    isNatureMonument,
    isProtectedArea,
  } = input;

  const warnings: string[] = [BIRD_SEASON_WARNING];
  if (isProtectedArea) {
    warnings.push(
      "Teren objęty ochroną (park krajobrazowy, rezerwat) — mogą obowiązywać dodatkowe zakazy. Przed wycinką skontaktuj się z regionalną dyrekcją ochrony środowiska (RDOŚ) lub urzędem gminy."
    );
  }

  const tips = [
    "Obwód pnia dla progów zwolnienia mierz na wysokości 5 cm nad ziemią, a nie na wysokości piersi.",
    "Zrób zdjęcia drzewa i zachowaj kopię zgłoszenia lub wniosku — przydadzą się w razie sporu z urzędem.",
    "Jeśli drzewo ma kilka pni, zmierz obwód każdego pnia osobno — próg odnosi się do każdego z nich.",
  ];

  const isShrub = species === "krzew";
  const threshold = isShrub
    ? SHRUB_AREA_THRESHOLD
    : species === "owocowe"
      ? null
      : TREE_THRESHOLDS[species];
  const thresholdUnit: "cm" | "m²" | null = isShrub
    ? "m²"
    : species === "owocowe"
      ? null
      : "cm";

  // 1. Pomnik przyrody — praktycznie brak możliwości wycinki.
  if (isNatureMonument) {
    return {
      verdict: "pomnik-przyrody",
      verdictLabel: "Pomnik przyrody — wycinka praktycznie niemożliwa",
      color: "red",
      summary:
        "Drzewo będące pomnikiem przyrody podlega ochronie na podstawie uchwały rady gminy. Wycinka wymaga wcześniejszego zniesienia ochrony przez radę gminy (w uzgodnieniu z RDOŚ) — w praktyce zgoda wydawana jest wyjątkowo, np. gdy drzewo zagraża bezpieczeństwu.",
      steps: [
        "Sprawdź w urzędzie gminy uchwałę ustanawiającą pomnik przyrody i jej zakres ochrony.",
        "Złóż do rady gminy wniosek o zniesienie formy ochrony przyrody z uzasadnieniem (np. zagrożenie bezpieczeństwa).",
        "Rada gminy uzgadnia zniesienie ochrony z regionalnym dyrektorem ochrony środowiska.",
        "Dopiero po zniesieniu ochrony przechodzisz standardową procedurę zgłoszenia lub zezwolenia.",
      ],
      threshold,
      thresholdUnit,
      estimatedFee: null,
      estimatedPenalty: null,
      warnings: [
        "Usunięcie lub uszkodzenie pomnika przyrody bez zniesienia ochrony grozi wysoką karą administracyjną, a nawet odpowiedzialnością karną.",
        ...warnings,
      ],
      tips,
    };
  }

  // 2. Nieruchomość w rejestrze zabytków — pozwolenie konserwatora.
  if (isHeritageProperty) {
    return {
      verdict: "konserwator",
      verdictLabel: "Wymagane pozwolenie konserwatora zabytków",
      color: "red",
      summary:
        "Nieruchomość jest wpisana do rejestru zabytków — usunięcie drzewa lub krzewu wymaga pozwolenia wojewódzkiego konserwatora zabytków. Dotyczy to również drzew owocowych rosnących na takim terenie.",
      steps: [
        "Złóż wniosek o pozwolenie do wojewódzkiego konserwatora zabytków właściwego dla lokalizacji nieruchomości.",
        "Dołącz opis drzewa (gatunek, obwód pnia, lokalizacja na działce) i uzasadnienie wycinki.",
        "Poczekaj na decyzję — konserwator może przeprowadzić oględziny i nałożyć warunki, np. nasadzenia zastępcze.",
        "Wycinaj dopiero po otrzymaniu prawomocnego pozwolenia i zgodnie z jego warunkami.",
      ],
      threshold,
      thresholdUnit,
      estimatedFee: null,
      estimatedPenalty: null,
      warnings: [
        "Wycinka na terenie zabytkowym bez pozwolenia konserwatora to samowola — grozi karą administracyjną (2 × opłata) oraz odpowiedzialnością z ustawy o ochronie zabytków.",
        ...warnings,
      ],
      tips,
    };
  }

  // 3. Drzewa owocowe — zwolnione z formalności.
  if (species === "owocowe") {
    return {
      verdict: "bez-formalnosci",
      verdictLabel: "Bez formalności",
      color: "green",
      summary:
        "Drzewa owocowe są zwolnione z obowiązku zgłoszenia i zezwolenia — możesz je usunąć bez formalności, o ile nieruchomość nie jest wpisana do rejestru zabytków ani drzewo nie rośnie na terenie zieleni.",
      steps: [
        "Upewnij się, że to rzeczywiście gatunek owocowy (jabłoń, grusza, śliwa, wiśnia itp.).",
        "Sprawdź, czy w koronie nie ma gniazd ptaków — w okresie lęgowym (1 III – 15 X) wycinkę przełóż.",
        "Możesz przeprowadzić wycinkę — zachowaj zasady bezpieczeństwa lub zleć ją profesjonalnej firmie.",
      ],
      threshold,
      thresholdUnit,
      estimatedFee: null,
      estimatedPenalty: null,
      warnings,
      tips,
    };
  }

  // 4. Krzewy — próg 25 m² powierzchni.
  if (isShrub) {
    if (shrubArea <= SHRUB_AREA_THRESHOLD) {
      return {
        verdict: "bez-formalnosci",
        verdictLabel: "Bez formalności",
        color: "green",
        summary: `Krzew lub skupisko krzewów o powierzchni do ${SHRUB_AREA_THRESHOLD} m² można usunąć bez zgłoszenia i bez zezwolenia.`,
        steps: [
          "Zmierz rzut poziomy krzewu lub skupiska krzewów — liczy się łączna powierzchnia.",
          "Sprawdź, czy w krzewach nie ma gniazd ptaków (okres lęgowy 1 III – 15 X).",
          "Możesz usunąć krzewy bez formalności.",
        ],
        threshold,
        thresholdUnit,
        estimatedFee: null,
        estimatedPenalty: null,
        warnings,
        tips,
      };
    }
    if (who === "prywatna") {
      return {
        verdict: "zgloszenie",
        verdictLabel: "Wymagane zgłoszenie",
        color: "yellow",
        summary: `Skupisko krzewów przekracza ${SHRUB_AREA_THRESHOLD} m² — jako osoba prywatna (cel niezwiązany z działalnością gospodarczą) musisz zgłosić zamiar usunięcia do wójta, burmistrza lub prezydenta miasta.`,
        steps: buildNotificationSteps("krzewów"),
        threshold,
        thresholdUnit,
        estimatedFee: null,
        estimatedPenalty: null,
        warnings: [
          "Usunięcie krzewów bez wymaganego zgłoszenia grozi administracyjną karą pieniężną w wysokości 2 × opłata, jaka byłaby naliczona.",
          ...warnings,
        ],
        tips,
      };
    }
    return {
      verdict: "zezwolenie",
      verdictLabel: "Wymagane zezwolenie",
      color: "red",
      summary: `Usunięcie krzewów o powierzchni ponad ${SHRUB_AREA_THRESHOLD} m² na cele związane z działalnością gospodarczą wymaga zezwolenia wójta, burmistrza lub prezydenta miasta oraz wniesienia opłaty (naliczanej od m² powierzchni krzewów).`,
      steps: buildPermitSteps("krzewów"),
      threshold,
      thresholdUnit,
      estimatedFee: null,
      estimatedPenalty: null,
      warnings: [
        "Wycinka bez zezwolenia to administracyjna kara pieniężna w wysokości 2 × należna opłata.",
        ...warnings,
      ],
      tips,
    };
  }

  // 5. Drzewa — porównanie obwodu na 5 cm z progiem grupy gatunkowej.
  const treeThreshold = TREE_THRESHOLDS[species];

  if (circumference5cm <= treeThreshold) {
    return {
      verdict: "bez-formalnosci",
      verdictLabel: "Bez formalności",
      color: "green",
      summary: `Obwód pnia (${Math.round(circumference5cm)} cm na wysokości 5 cm) nie przekracza progu ${treeThreshold} cm dla tej grupy gatunkowej — drzewo można usunąć bez zgłoszenia i bez zezwolenia.`,
      steps: [
        "Zmierz obwód pnia dokładnie na wysokości 5 cm nad ziemią — pomiar wyżej zaniża wynik.",
        "Sprawdź, czy w koronie nie ma gniazd ptaków (okres lęgowy 1 III – 15 X).",
        "Możesz przeprowadzić wycinkę — zadbaj o bezpieczeństwo swoje i sąsiadów.",
      ],
      threshold,
      thresholdUnit,
      estimatedFee: null,
      estimatedPenalty: null,
      warnings,
      tips,
    };
  }

  if (who === "prywatna") {
    return {
      verdict: "zgloszenie",
      verdictLabel: "Wymagane zgłoszenie",
      color: "yellow",
      summary: `Obwód pnia przekracza próg ${treeThreshold} cm — jako osoba prywatna usuwająca drzewo na cele niezwiązane z działalnością gospodarczą musisz zgłosić zamiar wycinki do wójta, burmistrza lub prezydenta miasta. Zgłoszenie jest bezpłatne.`,
      steps: buildNotificationSteps("drzewa"),
      threshold,
      thresholdUnit,
      estimatedFee: null,
      estimatedPenalty: null,
      warnings: [
        "Jeśli w ciągu 5 lat od oględzin wystąpisz o pozwolenie na budowę związane z działalnością gospodarczą na tej części działki, organ naliczy opłatę za usunięte drzewo z mocą wsteczną.",
        "Wycinka bez zgłoszenia lub przed upływem terminu na sprzeciw grozi administracyjną karą pieniężną (2 × opłata, jaka byłaby naliczona).",
        ...warnings,
      ],
      tips,
    };
  }

  const estimatedFee = estimateFee(species, circumference130cm);
  const estimatedPenalty = estimatedFee
    ? { min: estimatedFee.min * 2, max: estimatedFee.max * 2 }
    : null;

  return {
    verdict: "zezwolenie",
    verdictLabel: "Wymagane zezwolenie",
    color: "red",
    summary: `Obwód pnia przekracza próg ${treeThreshold} cm, a wycinka jest związana z działalnością gospodarczą — wymagane jest zezwolenie wójta, burmistrza lub prezydenta miasta oraz opłata liczona od obwodu pnia na wysokości 130 cm.`,
    steps: buildPermitSteps("drzewa"),
    threshold,
    thresholdUnit,
    estimatedFee,
    estimatedPenalty,
    warnings: [
      "Wycinka bez zezwolenia to administracyjna kara pieniężna w wysokości 2 × należna opłata.",
      ...warnings,
    ],
    tips,
  };
}

function buildNotificationSteps(what: string): string[] {
  return [
    `Złóż zgłoszenie zamiaru usunięcia ${what} do wójta, burmistrza lub prezydenta miasta (wydział ochrony środowiska).`,
    "Organ ma 21 dni na przeprowadzenie oględzin na Twojej działce.",
    "Po oględzinach organ ma 14 dni na wniesienie sprzeciwu — brak sprzeciwu oznacza tzw. milczącą zgodę.",
    "Wycinkę przeprowadź w ciągu 6 miesięcy od oględzin — po tym terminie zgłoszenie trzeba ponowić.",
  ];
}

function buildPermitSteps(what: string): string[] {
  return [
    `Złóż wniosek o zezwolenie na usunięcie ${what} do wójta, burmistrza lub prezydenta miasta (na terenie miejskim może to być marszałek województwa dla nieruchomości gminnych).`,
    "We wniosku podaj gatunek, obwód pnia na wysokości 130 cm, przyczynę i termin wycinki oraz mapkę z lokalizacją.",
    "Organ przeprowadza oględziny i wydaje decyzję — może naliczyć opłatę oraz uzależnić zezwolenie od nasadzeń zastępczych.",
    "Wnieś opłatę (jeśli została naliczona) i przeprowadź wycinkę w terminie wskazanym w zezwoleniu.",
  ];
}

export const TREE_REMOVAL_FAQ = [
  {
    question: "Czy mogę wyciąć drzewo na własnej działce bez zgłoszenia?",
    answer:
      "Tak, jeśli obwód pnia mierzony na wysokości 5 cm nie przekracza progu dla danego gatunku: 80 cm dla topoli, wierzby, klonu jesionolistnego i klonu srebrzystego, 65 cm dla kasztanowca zwyczajnego, robinii akacjowej i platanu klonolistnego oraz 50 cm dla pozostałych gatunków. Drzewa owocowe są zwolnione z formalności niezależnie od obwodu.",
  },
  {
    question: "Jak zmierzyć obwód pnia do wycinki?",
    answer:
      "Do progów zwolnienia obwód pnia mierzy się na wysokości 5 cm nad ziemią — nisko przy gruncie, nie na wysokości piersi. Do naliczenia opłaty przy zezwoleniu obwód mierzy się z kolei na wysokości 130 cm. Jeśli drzewo ma kilka pni, każdy pień mierzy się osobno.",
  },
  {
    question: "Ile czeka się na zgodę na wycinkę drzewa po zgłoszeniu?",
    answer:
      "Po złożeniu zgłoszenia urząd ma 21 dni na przeprowadzenie oględzin drzewa, a następnie 14 dni na wniesienie sprzeciwu. Jeśli sprzeciwu nie będzie, obowiązuje tzw. milcząca zgoda i możesz wyciąć drzewo w ciągu 6 miesięcy od daty oględzin.",
  },
  {
    question: "Ile kosztuje zezwolenie na wycinkę drzewa dla firmy?",
    answer:
      "Opłatę nalicza się mnożąc obwód pnia na wysokości 130 cm przez stawkę zależną od gatunku i wielkości drzewa — stawki wynoszą od kilkunastu do ponad 200 zł za centymetr. Dla drzewa o obwodzie 100 cm opłata może wynieść od ok. 1200 do nawet 20 000 zł. Samo zgłoszenie wycinki przez osobę prywatną jest bezpłatne.",
  },
  {
    question: "Jaka kara grozi za wycinkę drzewa bez zezwolenia?",
    answer:
      "Za usunięcie drzewa bez wymaganego zgłoszenia lub zezwolenia organ nakłada administracyjną karę pieniężną w wysokości dwukrotności opłaty, jaka byłaby naliczona za legalną wycinkę. Przy dużych drzewach kara może sięgać kilkudziesięciu tysięcy złotych.",
  },
  {
    question: "Czy można wycinać drzewa w okresie lęgowym ptaków?",
    answer:
      "Przepisy nie zakazują wprost wycinki od 1 marca do 15 października, ale w tym okresie obowiązuje ochrona gniazd i lęgów ptaków. Jeśli w koronie drzewa są zasiedlone gniazda, wycinka może naruszać przepisy o ochronie gatunkowej — bezpieczniej zaplanować ją między 16 października a końcem lutego.",
  },
];
