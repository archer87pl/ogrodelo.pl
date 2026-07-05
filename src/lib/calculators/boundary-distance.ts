export type PlantCategory =
  | "zywoplot-formowany"
  | "zywoplot-wysoki"
  | "krzew-ozdobny"
  | "drzewo-male"
  | "drzewo-duze";

export interface BoundaryDistanceInput {
  category: PlantCategory;
  targetHeight: number;
  crownWidth: number;
  isROD: boolean;
  nearUtilities: boolean;
}

export interface BoundaryDistanceResult {
  /** Minimalna rozsądna odległość od granicy (m) */
  recommendedDistance: number;
  /** Odległość bezkonfliktowa: połowa korony + 1 m (m) */
  conflictFreeDistance: number;
  /** Zasięg korony od pnia po osiągnięciu docelowej szerokości (m) */
  crownReach: number;
  /** Minimalna odległość wg regulaminu ROD (m) — wiążąca tylko w ROD */
  rodMinimum: number;
  /** Czy minimum ROD jest wiążące (działka w ROD) */
  rodBinding: boolean;
  /** Etykieta kategorii wg regulaminu ROD */
  rodCategoryLabel: string;
  /** Informacja o odległości od sieci — tylko gdy nearUtilities */
  utilityNote: string | null;
  /** Informacja o art. 150 KC (gałęzie i korzenie za granicą) */
  branchesNote: string;
  /** Informacja o cieniu rzucanym na działkę sąsiada */
  shadeNote: string;
  tips: string[];
}

export const PLANT_CATEGORY_OPTIONS: { value: PlantCategory; label: string }[] =
  [
    { value: "zywoplot-formowany", label: "Żywopłot formowany (do 2 m)" },
    { value: "zywoplot-wysoki", label: "Żywopłot wysoki (powyżej 2 m)" },
    { value: "krzew-ozdobny", label: "Krzew ozdobny" },
    { value: "drzewo-male", label: "Drzewo małe (do 10 m docelowo)" },
    { value: "drzewo-duze", label: "Drzewo duże (powyżej 10 m)" },
  ];

/** Zwyczajowe (praktyczne) minimum odległości od granicy dla kategorii (m). */
const CUSTOMARY_MINIMUM: Record<PlantCategory, number> = {
  "zywoplot-formowany": 0.5,
  "zywoplot-wysoki": 1,
  "krzew-ozdobny": 1,
  "drzewo-male": 2.5,
  "drzewo-duze": 4.5,
};

/**
 * Minimalne odległości od granicy działki wg regulaminu ROD:
 * drzewa słabo rosnące i karłowe min. 2 m, silnie rosnące min. 3 m,
 * krzewy ozdobne min. 1 m.
 */
const ROD_MINIMUM: Record<PlantCategory, { distance: number; label: string }> =
  {
    "zywoplot-formowany": { distance: 1, label: "krzewy ozdobne (żywopłot)" },
    "zywoplot-wysoki": { distance: 1, label: "krzewy ozdobne (żywopłot)" },
    "krzew-ozdobny": { distance: 1, label: "krzewy ozdobne" },
    "drzewo-male": {
      distance: 2,
      label: "drzewa słabo rosnące i karłowe",
    },
    "drzewo-duze": { distance: 3, label: "drzewa silnie rosnące" },
  };

/** Zaokrąglenie w górę do pół metra. */
function roundUpToHalf(value: number): number {
  return Math.ceil(value * 2) / 2;
}

export function calculateBoundaryDistance(
  input: BoundaryDistanceInput
): BoundaryDistanceResult {
  const { category, crownWidth, isROD, nearUtilities } = input;

  const safeCrownWidth = Math.max(0, crownWidth);
  const crownReach = Math.round((safeCrownWidth / 2) * 10) / 10;

  const customaryMin = CUSTOMARY_MINIMUM[category];
  const crownBased = safeCrownWidth / 2 + 0.5;

  let recommendedDistance = roundUpToHalf(Math.max(customaryMin, crownBased));

  const rod = ROD_MINIMUM[category];
  if (isROD && rod.distance > recommendedDistance) {
    recommendedDistance = rod.distance;
  }

  const conflictFreeDistance = roundUpToHalf(
    Math.max(recommendedDistance, safeCrownWidth / 2 + 1)
  );

  return {
    recommendedDistance,
    conflictFreeDistance,
    crownReach,
    rodMinimum: rod.distance,
    rodBinding: isROD,
    rodCategoryLabel: rod.label,
    utilityNote: nearUtilities
      ? "W pobliżu sieci wodociągowej lub gazowej zachowaj zwykle 1,5–2 m od osi przewodu. Dokładne odległości określają warunki techniczne i gestor sieci — przed sadzeniem sprawdź przebieg instalacji na mapie zasadniczej."
      : null,
    branchesNote:
      "Jeśli gałęzie lub korzenie przejdą na grunt sąsiada, sąsiad może wyznaczyć Ci odpowiedni termin na ich usunięcie, a po jego bezskutecznym upływie — obciąć je sam i zachować dla siebie (art. 150 KC).",
    shadeNote:
      "Wysokie rośliny przy granicy mogą nadmiernie zacieniać działkę sąsiada — uporczywe zacienienie bywa uznawane za immisję (art. 144 KC). Sprawdź zasięg cienia w kalkulatorze cienia.",
    tips: [
      "Porozmawiaj z sąsiadem przed sadzeniem — wspólne ustalenia są tańsze niż każdy spór.",
      "Przy samej granicy wybieraj odmiany kolumnowe i wolno rosnące — wąska korona to mniejsze ryzyko konfliktu.",
      "Dokumentuj ustalenia z sąsiadem (choćby krótką wiadomością) i zachowaj je na przyszłość.",
    ],
  };
}

export const BOUNDARY_DISTANCE_FAQ: { question: string; answer: string }[] = [
  {
    question:
      "Jaka jest przepisowa odległość sadzenia drzew od granicy działki?",
    answer:
      "Kodeks cywilny nie podaje żadnych sztywnych odległości sadzenia drzew ani krzewów od granicy działki. Obowiązuje ogólny zakaz immisji (art. 144 KC) oraz przepisy o owocach, gałęziach i korzeniach przechodzących na grunt sąsiada (art. 148–150 KC). Konkretne minimalne odległości obowiązują tylko w Rodzinnych Ogrodach Działkowych (regulamin ROD) oraz w pobliżu sieci i infrastruktury.",
  },
  {
    question: "W jakiej odległości od granicy sadzić drzewa w ROD?",
    answer:
      "Regulamin Rodzinnych Ogrodów Działkowych określa minimalne odległości od granicy działki: drzewa słabo rosnące i karłowe min. 2 m, drzewa silnie rosnące min. 3 m, a krzewy ozdobne min. 1 m. Na działce w ROD te wartości są wiążące — w przeciwieństwie do działek prywatnych, gdzie obowiązują tylko zasady ogólne.",
  },
  {
    question: "Co mogę zrobić, gdy gałęzie sąsiada wiszą nad moją działką?",
    answer:
      "Zgodnie z art. 150 KC możesz wezwać sąsiada do usunięcia gałęzi lub korzeni przechodzących na Twoją działkę i wyznaczyć mu odpowiedni termin. Jeśli termin minie bezskutecznie, możesz samodzielnie obciąć gałęzie i korzenie oraz zachować je dla siebie. Warto wezwanie wysłać na piśmie, aby mieć dowód.",
  },
  {
    question: "Do kogo należą owoce, które spadły na moją działkę?",
    answer:
      "Owoce, które spadły z drzewa lub krzewu sąsiada na Twój grunt, stanowią Twój pożytek — należą do Ciebie (art. 148 KC). Zasada nie dotyczy jednak sytuacji, gdy grunt sąsiedni jest przeznaczony na użytek publiczny. Owoce wiszące jeszcze na gałęziach pozostają własnością właściciela drzewa.",
  },
  {
    question: "Czy sąsiad może wejść na moją działkę po gałęzie lub owoce?",
    answer:
      "Tak — art. 149 KC pozwala właścicielowi gruntu wejść na grunt sąsiedni w celu usunięcia zwieszających się z jego drzew gałęzi lub owoców. Sąsiad musi to jednak zrobić w sposób jak najmniej uciążliwy, a jeśli wyrządzi przy tym szkodę, właściciel działki może żądać jej naprawienia.",
  },
  {
    question: "Czy sąsiad może żądać wycięcia mojego drzewa przy granicy?",
    answer:
      "Sam fakt, że drzewo rośnie blisko granicy, nie daje sąsiadowi prawa żądania wycinki. Jeżeli jednak drzewo powoduje ponadprzeciętne zakłócenia — silne zacienienie, zawilgocenie czy zniszczenia korzeniowe — sąsiad może powołać się na art. 144 KC i żądać przywrócenia stanu zgodnego z prawem. Pamiętaj też, że wycinka własnego drzewa często wymaga zgłoszenia do gminy.",
  },
];
