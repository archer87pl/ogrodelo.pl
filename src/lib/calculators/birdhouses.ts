export type Surroundings = "miasto" | "przedmiescia" | "wies" | "las";

export interface BirdhouseType {
  id: string;
  name: string;
  hole: string;
  species: string[];
  hangHeight: string;
  price: number;
}

export interface BirdhouseInput {
  area: number;
  tallTrees: number;
  surroundings: Surroundings;
  catPresent: boolean;
}

export interface BirdhouseResult {
  totalBoxes: number;
  recommendedTypes: BirdhouseType[];
  feeders: number;
  waterers: number;
  totalCost: number;
  hangingPeriod: string;
  cleaningPeriod: string;
  tips: string[];
}

export const BIRDHOUSE_TYPES: BirdhouseType[] = [
  {
    id: "A1",
    name: "Typ A1",
    hole: "28 mm",
    species: ["modraszka", "czarnogłówka"],
    hangHeight: "2–4 m",
    price: 45,
  },
  {
    id: "A",
    name: "Typ A",
    hole: "33 mm",
    species: ["bogatka", "mazurek", "wróbel", "pleszka"],
    hangHeight: "2–4 m",
    price: 50,
  },
  {
    id: "B",
    name: "Typ B",
    hole: "47 mm",
    species: ["szpak"],
    hangHeight: "3–5 m",
    price: 70,
  },
  {
    id: "D",
    name: "Typ D",
    hole: "85 mm",
    species: ["kawka", "dudek"],
    hangHeight: "4–6 m",
    price: 120,
  },
  {
    id: "polotwarta",
    name: "Półotwarta",
    hole: "przednia ścianka otwarta",
    species: ["kopciuszek", "pliszka siwa", "rudzik"],
    hangHeight: "1,5–3 m",
    price: 40,
  },
];

const FEEDER_PRICE = 80;
const WATERER_PRICE = 50;

function getTypeById(id: string): BirdhouseType {
  return BIRDHOUSE_TYPES.find((t) => t.id === id)!;
}

function typePriority(input: BirdhouseInput): string[] {
  const { surroundings, tallTrees } = input;

  // Miasto: głównie sikorki, wróble i gatunki półdziuplaste
  if (surroundings === "miasto") {
    return ["A", "polotwarta", "A1"];
  }

  if (surroundings === "przedmiescia") {
    const ids = ["A", "A1", "polotwarta"];
    if (tallTrees >= 1) ids.push("B");
    return ids;
  }

  // Wieś i okolice lasu: dochodzą szpaki, a przy dużych drzewach kawka/dudek
  const ids =
    surroundings === "las"
      ? ["A1", "A", "B", "polotwarta"]
      : ["A", "B", "A1", "polotwarta"];
  if (tallTrees >= 2) ids.push("D");
  return ids;
}

export function calculateBirdhouses(input: BirdhouseInput): BirdhouseResult {
  const area = Math.max(0, input.area);

  // Sikorki są terytorialne — budki tego samego typu muszą wisieć min. 30 m
  // od siebie, więc liczbę budek zwiększamy przez RÓŻNE typy, nie duplikaty.
  const totalBoxes = Math.min(Math.floor(area / 300) + 1, 4);

  const recommendedTypes = typePriority(input)
    .slice(0, totalBoxes)
    .map(getTypeById);

  const feeders = 1;
  const waterers = 1;

  const totalCost =
    recommendedTypes.reduce((sum, t) => sum + t.price, 0) +
    feeders * FEEDER_PRICE +
    waterers * WATERER_PRICE;

  const tips: string[] = [];
  if (input.catPresent) {
    tips.push(
      "Kot w ogrodzie: załóż na pień kołnierz z blachy (tzw. osłonę przeciw drapieżnikom) min. 1,5 m nad ziemią i wieszaj budki min. 1,5 m od gałęzi, po których kot mógłby się wspiąć."
    );
    tips.push(
      "Wybieraj budki z pogłębioną komorą i daszkiem wystającym min. 5 cm — utrudnia to kotu i kunie sięgnięcie łapą do otworu."
    );
  } else {
    tips.push(
      "Budki tego samego typu wieszaj min. 30 m od siebie — sikorki bronią terytorium i nie zniosą sąsiada za płotem."
    );
    tips.push(
      "Poidełko latem jest ważniejsze niż karmnik — płytka woda (2–5 cm) z kamieniem do lądowania ratuje ptaki w upały."
    );
  }
  tips.push(
    "Dokarmiaj tylko od pierwszych mrozów do końca marca i regularnie czyść karmnik — brudny karmnik roznosi choroby."
  );

  return {
    totalBoxes,
    recommendedTypes,
    feeders,
    waterers,
    totalCost,
    hangingPeriod: "jesień – koniec lutego",
    cleaningPeriod: "wrzesień – październik (co roku)",
    tips,
  };
}

export const BIRDHOUSES_FAQ = [
  {
    question: "Kiedy najlepiej wieszać budki lęgowe?",
    answer:
      "Budki lęgowe najlepiej wieszać od jesieni do końca lutego. Ptaki zaczynają szukać miejsc lęgowych wczesną wiosną, a budka powieszona jesienią zdąży się „opatrzyć” i może posłużyć ptakom także jako zimowe schronienie. Budka zawieszona w kwietniu ma już małe szanse na zasiedlenie w danym sezonie.",
  },
  {
    question: "Jaka budka jest odpowiednia dla sikorki?",
    answer:
      "Dla modraszki i czarnogłówki wybierz budkę typu A1 z otworem 28 mm — mniejszy otwór chroni je przed konkurencją większych ptaków. Bogatka, najpospolitsza sikora, potrzebuje budki typu A z otworem 33 mm. Obie budki wiesza się na wysokości 2–4 m, otworem na wschód lub południowy wschód.",
  },
  {
    question: "Ile budek zmieści się na mojej działce?",
    answer:
      "Sikorki są terytorialne — budki tego samego typu powinny wisieć minimum 30 m od siebie, więc na typowej działce do 1000 m² zwykle mieści się tylko jedna budka danego typu. Możesz jednak powiesić kilka budek RÓŻNYCH typów bliżej siebie, bo różne gatunki nie konkurują o to samo terytorium. W praktyce: 1–4 budki różnych typów.",
  },
  {
    question: "Czy budki lęgowe trzeba czyścić?",
    answer:
      "Tak, obowiązkowo raz w roku, najlepiej we wrześniu lub październiku, po zakończeniu lęgów. Stare gniazdo usuwamy w rękawicach, a wnętrze można wyparzyć wrzątkiem — bez chemii. W starym gnieździe zimują pasożyty (pchły, roztocza), które wiosną zaatakowałyby nowe pisklęta. Nieczyszczona budka z czasem przestaje być zasiedlana.",
  },
  {
    question: "Dlaczego budka nie powinna mieć patyczka pod otworem?",
    answer:
      "Patyczek (żerdka) pod otworem to najczęstszy błąd konstrukcyjny — ptakom jest zupełnie niepotrzebny, za to znakomicie ułatwia drapieżnikom (kotom, kunom, srokom) dostanie się do wnętrza i wybranie jaj lub piskląt. Dobra budka ma gładką ścianę frontową, daszek wystający nad otwór i jest lekko pochylona do przodu, by deszcz nie zalewał wnętrza.",
  },
];
