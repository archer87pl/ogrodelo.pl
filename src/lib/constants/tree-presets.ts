import type { TreeSpecies } from "@/lib/calculators/tree-comparator";

export interface TreePreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  defaults: Partial<{
    speciesA: TreeSpecies;
    speciesB: TreeSpecies;
  }>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

export const TREE_PRESETS: TreePreset[] = [
  {
    slug: "dab-vs-sosna",
    title: "Dąb czy sosna? Porównanie drzew",
    description:
      "Dąb vs sosna: wzrost, korony, korzenie, woda, cień i koszt sadzonki. Które drzewo lepsze do Twojego ogrodu?",
    keywords: [
      "dąb czy sosna",
      "dab vs sosna",
      "porównanie dąb sosna",
      "co lepsze dąb czy sosna",
      "sadzenie dębu czy sosny",
    ],
    defaults: { speciesA: "dab", speciesB: "sosna" },
    intro:
      "Klasyczne porównanie: dąb liściasty na pokolenia vs sosna iglasta z szybszym efektem. Sprawdź wykres wzrostu i praktyczne różnice.",
    faq: [
      {
        question: "Czy dąb czy sosna rośnie szybciej?",
        answer: "Sosna rośnie szybciej — ok. 40 cm/rok vs 25 cm/rok u dębu. Po 10 latach sosna ma ok. 5 m, dąb ok. 3,7 m.",
      },
      {
        question: "Które drzewo bezpieczniejsze przy domu?",
        answer: "Sosna — min. 5 m od budynku. Dąb wymaga min. 8 m ze względu na agresywne korzenie i wysokie ryzyko dla fundamentów.",
      },
    ],
    sections: [
      {
        heading: "Dąb — kiedy wybrać?",
        content:
          "Duża działka, daleko od domu, chcesz drzewo na pokolenia z gęstym letnim cieniem. Dąb żyje 500+ lat.",
      },
      {
        heading: "Sosna — kiedy wybrać?",
        content:
          "Szybszy efekt, mniejsza działka, suchsze stanowisko. Sosna daje cień przez cały rok dzięki igłom.",
      },
    ],
  },
  {
    slug: "dab-vs-brzoza",
    title: "Dąb czy brzoza? Porównanie wzrostu",
    description:
      "Brzoza rośnie 2× szybciej niż dąb, ale żyje krócej. Porównaj wysokość, korzenie, bałagan i koszt sadzonki.",
    keywords: ["dąb czy brzoza", "dab vs brzoza", "brzoza czy dąb", "porównanie brzoza dąb"],
    defaults: { speciesA: "dab", speciesB: "brzoza" },
    intro: "Brzoza daje szybki efekt (60 cm/rok), dąb — trwałość na wieki. Zobacz wykres na 50 lat.",
    faq: [],
    sections: [],
  },
  {
    slug: "dab-vs-lipa",
    title: "Dąb czy lipa? Które drzewo do ogrodu",
    description:
      "Porównanie dębu i lipy: wzrost, cień, prywatność, korzenie i wymagania glebowe. Wykres i tabela parametrów.",
    keywords: ["dąb czy lipa", "lipa czy dąb", "dab vs lipa", "drzewo alejowe porównanie"],
    defaults: { speciesA: "dab", speciesB: "lipa" },
    intro: "Oba to klasyczne drzewa alejowe liściaste — ale różnią się tempem wzrostu i wpływem na ogród.",
    faq: [],
    sections: [],
  },
  {
    slug: "dab-vs-buk",
    title: "Dąb czy buk? Porównanie liściastych olbrzymów",
    description:
      "Dąb vs buk: wysokość, korona, cień, żywotność i bezpieczeństwo przy domu. Interaktywna porównywarka.",
    keywords: ["dąb czy buk", "dab vs buk", "buk czy dąb", "porównanie buk dąb"],
    defaults: { speciesA: "dab", speciesB: "buk" },
    intro: "Dwa majestatyczne drzewa liściaste — podobne wymagania, ale inna strategia wzrostu i „bałaganu”.",
    faq: [],
    sections: [],
  },
  {
    slug: "sosna-vs-jodla",
    title: "Sosna czy jodła? Porównanie iglastych",
    description:
      "Sosna vs jodła: mróz, susza, woda, wzrost i pielęgnacja. Która iglasta lepsza do polskiego ogrodu?",
    keywords: ["sosna czy jodła", "sosna vs jodla", "jodła czy sosna", "igliste drzewo porównanie"],
    defaults: { speciesA: "sosna", speciesB: "jodla" },
    intro: "Obie iglaste, ale sosna znosi suszę lepiej, jodła wymaga wilgotniejszego stanowiska.",
    faq: [],
    sections: [],
  },
  {
    slug: "brzoza-vs-wierzba",
    title: "Brzoza czy wierzba? Szybkowzrostne drzewa",
    description:
      "Które szybciej rośnie — brzoza czy wierzba? Porównanie wody, korzeni, prywatności i ryzyka przy domu.",
    keywords: ["brzoza czy wierzba", "wierzba vs brzoza", "szybko rosnące drzewo", "brzoza wierzba porównanie"],
    defaults: { speciesA: "brzoza", speciesB: "wierzba" },
    intro: "Oba dają szybki efekt wizualny — ale wierzba ma agresywniejsze korzenie i większe zapotrzebowanie na wodę.",
    faq: [],
    sections: [],
  },
  {
    slug: "lipa-vs-klon",
    title: "Lipa czy klon? Porównanie do ogrodu miejskiego",
    description:
      "Lipa vs klon jawor: cień, wzrost, bałagan, choroby i dopasowanie do małego ogrodu. Tabela i wykresy.",
    keywords: ["lipa czy klon", "klon czy lipa", "lipa vs klon", "drzewo do małego ogrodu"],
    defaults: { speciesA: "lipa", speciesB: "klon" },
    intro: "Popularne drzewa miejskie — klon szybszy w młodości, lipa bardziej długowieczna.",
    faq: [],
    sections: [],
  },
  {
    slug: "buk-vs-jesion",
    title: "Buk czy jesion? Porównanie wzrostu i chorób",
    description:
      "Buk vs jesion: tempo wzrostu, korona, podatność na choroby i bezpieczeństwo sadzenia przy domu.",
    keywords: ["buk czy jesion", "jesion vs buk", "jesion wyniosły porównanie", "buk jesion ogród"],
    defaults: { speciesA: "buk", speciesB: "jesion" },
    intro: "Jesion rośnie szybciej, ale jest podatny na zgorzel jesionowca. Buk wolniejszy, ale zdrowszy.",
    faq: [],
    sections: [],
  },
  {
    slug: "wierzba-vs-olcha",
    title: "Wierzba czy olcha? Drzewa na wilgotne stanowisko",
    description:
      "Wierzba vs olcha przy wodzie: wzrost, korzenie, woda i ryzyko dla fundamentów. Porównanie z wykresem.",
    keywords: ["wierzba czy olcha", "olcha vs wierzba", "drzewo nad wodą", "wilgotne stanowisko drzewo"],
    defaults: { speciesA: "wierzba", speciesB: "olcha" },
    intro: "Obie lubią wilgoć — ale wierzba szybsza i bardziej inwazyjna korzeniowo.",
    faq: [],
    sections: [],
  },
  {
    slug: "grab-vs-buk",
    title: "Grab czy buk? Liściaste do ogrodu",
    description:
      "Grab vs buk: wzrost, korona, żywopłot vs aleja, korzenie, cień i koszt sadzonki. Porównanie z wykresem.",
    keywords: [
      "grab czy buk",
      "grab vs buk",
      "grab pospolity buk",
      "drzewo czy żywopłot grab",
    ],
    defaults: { speciesA: "grab", speciesB: "buk" },
    intro:
      "Oba liściaste i rodzime — grab tańszy, łatwiejszy w formowaniu na żywopłot, buk majestatyczny ale wolniejszy start.",
    faq: [
      {
        question: "Grab czy buk — który szybciej rośnie?",
        answer: "Podobne tempo ok. 30 cm/rok, ale grab szybciej daje efekt żywopłotowy dzięki gęstemu cięciu. Buk lepszy jako pojedyncze drzewo alejowe.",
      },
      {
        question: "Czy grab można sadzić bliżej domu niż buk?",
        answer: "Tak — grab min. 4 m od budynku vs 6 m buk. Korzenie grabu mniej agresywne.",
      },
    ],
    sections: [
      {
        heading: "Grab — kiedy wybrać?",
        content:
          "Żywopłot, ekran przy ogrodzeniu, ograniczony budżet. Zdrowy, tani, formowany. Liście zimują brązowe na gałęziach.",
      },
      {
        heading: "Buk — kiedy wybrać?",
        content:
          "Aleja, duży ogród, drzewo na pokolenia. Gęsta korona, imponująca wysokość — ale wolniejszy efekt i większe wymagania przestrzenne.",
      },
    ],
  },
  {
    slug: "grab-vs-lipa",
    title: "Grab czy lipa? Formowany vs alejowy",
    description:
      "Grab vs lipa: żywopłot vs drzewo alejowe, wzrost, cień, korzenie i bezpieczeństwo przy domu.",
    keywords: ["grab czy lipa", "grab vs lipa", "grab pospolity lipa"],
    defaults: { speciesA: "grab", speciesB: "lipa" },
    intro: "Grab na bliskim ogrodzeniu i żywopłot, lipa na aleję i głęboki cień — różne skale ogrodu.",
    faq: [],
    sections: [],
  },
  {
    slug: "dab-vs-klon",
    title: "Dąb czy klon? Liściaste olbrzymy",
    description:
      "Dąb vs klon jawor: wzrost, korona, bałagan, korzenie i dopasowanie do ogrodu miejskiego.",
    keywords: ["dąb czy klon", "dab vs klon", "klon jawor dąb porównanie"],
    defaults: { speciesA: "dab", speciesB: "klon" },
    intro: "Klon szybszy w młodości i bardziej toleruje miasto, dąb dłuższy wiek i głębszy cień.",
    faq: [],
    sections: [],
  },
  {
    slug: "dab-vs-wierzba",
    title: "Dąb czy wierzba? Wolny olbrzym vs szybki wzrost",
    description:
      "Dąb vs wierzba: tempo wzrostu, korzenie, woda, bezpieczeństwo przy domu i żywotność.",
    keywords: ["dąb czy wierzba", "dab vs wierzba", "wierzba dąb porównanie"],
    defaults: { speciesA: "dab", speciesB: "wierzba" },
    intro: "Wierzba rośnie 3× szybciej, ale agresywne korzenie — dąb wolny, ale bezpieczniejszy długoterminowo.",
    faq: [],
    sections: [],
  },
  {
    slug: "sosna-vs-swierk",
    title: "Sosna czy świerk? Iglasta do ogrodu",
    description:
      "Sosna vs świerk: susza, mróz, wzrost, kształt korony i wymagania glebowe w Polsce.",
    keywords: ["sosna czy świerk", "sosna vs swierk", "iglate drzewo ogród"],
    defaults: { speciesA: "sosna", speciesB: "swierk" },
    intro: "Sosna znosi suszę lepiej, świerk wymaga wilgotniejszego stanowiska — oba szybko rosną.",
    faq: [],
    sections: [],
  },
  {
    slug: "klon-vs-brzoza",
    title: "Klon czy brzoza? Drzewa miejskie",
    description:
      "Klon vs brzoza: wzrost, cień, bałagan, korzenie i dopasowanie do małego ogrodu.",
    keywords: ["klon czy brzoza", "klon vs brzoza", "drzewo do małego ogrodu"],
    defaults: { speciesA: "klon", speciesB: "brzoza" },
    intro: "Brzoza szybsza i lżejsza korona, klon gęstszy cień i dłuższy wiek — oba popularne w miastach.",
    faq: [],
    sections: [],
  },
  {
    slug: "kasztan-vs-dab",
    title: "Kasztanowiec czy dąb? Alejowe olbrzymy",
    description:
      "Kasztan vs dąb: kwiaty, cień, choroby (minszczyk), wzrost i bezpieczeństwo sadzenia.",
    keywords: ["kasztanowiec czy dąb", "kasztan vs dab", "drzewo alejowe porównanie"],
    defaults: { speciesA: "kasztan", speciesB: "dab" },
    intro: "Kasztan efektowny w maju, dąb trwalszy i mniej podatny na minszczyka kasztanowca.",
    faq: [],
    sections: [],
  },
  {
    slug: "jesion-vs-klon",
    title: "Jesion czy klon? Szybkie liściaste",
    description:
      "Jesion vs klon: tempo wzrostu, choroby (zgorzel jesionowca), korona i bezpieczeństwo przy domu.",
    keywords: ["jesion czy klon", "jesion vs klon", "szybkie drzewo liściaste"],
    defaults: { speciesA: "jesion", speciesB: "klon" },
    intro: "Jesion rośnie szybciej, ale choroba zgorzel — klon bezpieczniejszy wybór do ogrodu miejskiego.",
    faq: [],
    sections: [],
  },
  {
    slug: "orzech-vs-dab",
    title: "Orzech włoski czy dąb? Liściaste z owocami",
    description:
      "Orzech vs dąb: juglon, cień, owoce, korzenie i wpływ na sąsiednie rośliny.",
    keywords: ["orzech czy dąb", "orzech włoski vs dąb", "juglon ogród"],
    defaults: { speciesA: "orzech", speciesB: "dab" },
    intro: "Orzech daje jadalne orzechy, ale juglon hamuje sąsiadów. Dąb bezpieczniejszy w mieszanych nasadzeniach.",
    faq: [],
    sections: [],
  },
  {
    slug: "modrzew-vs-jodla",
    title: "Modrzew czy jodła? Iglasta liściasta vs iglasta",
    description:
      "Modrzew vs jodła: jesienna żółć, wzrost, mróz, woda i wymagania glebowe.",
    keywords: ["modrzew czy jodła", "modrzew vs jodla", "iglate liściaste"],
    defaults: { speciesA: "modrzew", speciesB: "jodla" },
    intro: "Modrzew szybki i suszoodporny, jodła wolniejsza ale zimozielona — oba wymagają wilgotnego startu.",
    faq: [],
    sections: [],
  },
  {
    slug: "dab",
    title: "Dąb — parametry, wzrost i porównanie",
    description:
      "Ile rośnie dąb? Wysokość po latach, korona, korzenie, cień i koszt sadzonki. Porównaj dąb z innymi gatunkami.",
    keywords: ["dąb wzrost", "ile rośnie dąb", "wysokość dębu", "sadzenie dębu", "dąb w ogrodzie"],
    defaults: { speciesA: "dab", speciesB: "sosna" },
    intro: "Pełny profil dębu szypułkowego — porównany z sosną jako punkt odniesienia.",
    faq: [
      {
        question: "Ile cm rocznie rośnie dąb?",
        answer: "Średnio 20–30 cm rocznie w pierwszych dekadach. Po 50 latach może osiągnąć 13–15 m.",
      },
    ],
    sections: [],
  },
  {
    slug: "sosna",
    title: "Sosna — wzrost, pielęgnacja i porównanie",
    description:
      "Sosna zwyczajna: tempo wzrostu, odporność na mróz i suszę, odległość od domu. Porównaj z dębem i jodłą.",
    keywords: ["sosna wzrost", "ile rośnie sosna", "sosna w ogrodzie", "sadzenie sosny"],
    defaults: { speciesA: "sosna", speciesB: "dab" },
    intro: "Najpopularniejsza iglasta w Polsce — profil i porównanie z dębem.",
    faq: [],
    sections: [],
  },
  {
    slug: "brzoza",
    title: "Brzoza — szybki wzrost i wymagania",
    description:
      "Brzoza brodawkowata: wzrost do 60 cm/rok, cień, bałagan i bezpieczna odległość od domu. Porównanie z dębem.",
    keywords: ["brzoza wzrost", "ile rośnie brzoza", "brzoza w ogrodzie", "brzoza sadzonka"],
    defaults: { speciesA: "brzoza", speciesB: "dab" },
    intro: "Najszybszy efekt spośród popularnych drzew liściastych — ale krótsza żywotność.",
    faq: [],
    sections: [],
  },
  {
    slug: "kasztan-vs-lipa",
    title: "Kasztanowiec czy lipa? Porównanie alejowe",
    description:
      "Kasztan vs lipa: kwiaty, cień, choroby, wzrost i bezpieczeństwo przy domu. Które drzewo alejowe wybrać?",
    keywords: ["kasztanowiec czy lipa", "kasztan vs lipa", "drzewo alejowe porównanie"],
    defaults: { speciesA: "kasztan", speciesB: "lipa" },
    intro: "Dwa klasyczne drzewa alejowe — kasztan efektowny w maju, lipa bardziej odporna i długowieczna.",
    faq: [],
    sections: [],
  },
  {
    slug: "swierk-vs-jodla",
    title: "Świerk czy jodła? Porównanie iglastych",
    description:
      "Świerk vs jodła: wzrost, woda, mróz, kształt korony i wymagania glebowe. Która iglasta do ogrodu?",
    keywords: ["świerk czy jodła", "swierk vs jodla", "iglate drzewo ogród"],
    defaults: { speciesA: "swierk", speciesB: "jodla" },
    intro: "Obie iglaste wymagają wilgotnego stanowiska — świerk wyższy, jodła szersza u podstawy.",
    faq: [],
    sections: [],
  },
  {
    slug: "modrzew-vs-sosna",
    title: "Modrzew czy sosna? Iglate z jesienną żółcią",
    description:
      "Modrzew vs sosna: szybkość wzrostu, zimozieloność, mróz i bezpieczeństwo sadzenia. Porównanie z wykresem.",
    keywords: ["modrzew czy sosna", "modrzew vs sosna", "iglate szybki wzrost"],
    defaults: { speciesA: "modrzew", speciesB: "sosna" },
    intro: "Modrzew zrzuca igły złoto jesienią, sosna zielona cały rok — oba szybkie i odporne.",
    faq: [],
    sections: [],
  },
  {
    slug: "topola-vs-wierzba",
    title: "Topola czy wierzba? Szybkowzrostne olbrzymy",
    description:
      "Topola vs wierzba: rekordowy wzrost, korzenie, woda i ryzyko przy domu. Ostrzeżenia i porównanie.",
    keywords: ["topola czy wierzba", "topola vs wierzba", "szybko rosnące drzewo"],
    defaults: { speciesA: "topola", speciesB: "wierzba" },
    intro: "Oba rosną błyskawicznie — ale agresywne korzenie wymagają dużej odległości od budynków.",
    faq: [],
    sections: [],
  },
  {
    slug: "orzech-vs-klon",
    title: "Orzech włoski czy klon? Liściaste do ogrodu",
    description:
      "Orzech vs klon: cień, owoce, juglon, wzrost i wpływ na sąsiednie rośliny. Praktyczne porównanie.",
    keywords: ["orzech czy klon", "orzech włoski vs klon", "juglon ogród"],
    defaults: { speciesA: "orzech", speciesB: "klon" },
    intro: "Orzech daje jadalne owoce, ale juglon hamuje sąsiadów. Klon bezpieczniejszy w mieszanych nasadzeniach.",
    faq: [],
    sections: [],
  },
  {
    slug: "akacja-vs-brzoza",
    title: "Akacja czy brzoza? Szybki wzrost liściasty",
    description:
      "Robinia (akacja) vs brzoza: tempo wzrostu, susza, odrostki korzeniowe i żywotność. Porównanie parametrów.",
    keywords: ["akacja czy brzoza", "robinia vs brzoza", "szybkie drzewo liściaste"],
    defaults: { speciesA: "akacja", speciesB: "brzoza" },
    intro: "Obie rosną szybko — akacja bardziej odporna na suszę, brzoza ładniejsza kora i forma.",
    faq: [],
    sections: [],
  },
  {
    slug: "kasztan",
    title: "Kasztanowiec — wzrost, choroby i wymagania",
    description:
      "Kasztanowiec pospolity: wzrost, kwiaty, minszczyk, cień i odległość od domu. Porównanie z lipą.",
    keywords: ["kasztanowiec wzrost", "kasztan w ogrodzie", "kasztanowiec sadzonka", "choroba kasztanowca"],
    defaults: { speciesA: "kasztan", speciesB: "lipa" },
    intro: "Profil kasztanowca — porównany z lipą jako drzewem alejowym o podobnym zastosowaniu.",
    faq: [],
    sections: [],
  },
  {
    slug: "grab",
    title: "Grab — wzrost, żywopłot i porównanie",
    description:
      "Grab pospolity: tempo wzrostu, formowanie żywopłotu, odległość od domu. Porównaj grab z bukiem i lipą.",
    keywords: [
      "grab wzrost",
      "grab pospolity ogród",
      "grab drzewo",
      "grab vs buk",
      "sadzenie grabu",
    ],
    defaults: { speciesA: "grab", speciesB: "buk" },
    intro: "Profil grabu jako drzewa i żywopłotu — zdrowy, rodzimy, porównany z bukiem.",
    faq: [
      {
        question: "Grab jako drzewo czy żywopłot?",
        answer:
          "Grab sprawdza się w obu rolach — formowany co 2 cięcia daje gęsty ekran, pojedyncze drzewo rośnie do ok. 20 m.",
      },
    ],
    sections: [],
  },
  {
    slug: "porownanie",
    title: "Porównaj dowolne drzewa",
    description:
      "Wybierz dwa gatunki i porównaj wzrost, wodę, korzenie, cień i koszt. 17 drzew, wykresy i tabela parametrów.",
    keywords: ["porównanie drzew", "porównywarka drzew", "które drzewo wybrać", "ranking drzew ogrodowych"],
    defaults: {},
    intro: "Wybierz dwa gatunki z listy — zobacz pełną tabelę, wykres wzrostu na 50 lat i dopasowanie do ogrodu.",
    faq: [],
    sections: [],
  },
];

export function getTreePreset(slug: string): TreePreset | undefined {
  return TREE_PRESETS.find((p) => p.slug === slug);
}

export function getAllTreePresetSlugs(): string[] {
  return TREE_PRESETS.map((p) => p.slug);
}

export function getPairSlug(a: TreeSpecies, b: TreeSpecies): string | null {
  const forward = `${a}-vs-${b}`;
  const backward = `${b}-vs-${a}`;
  if (TREE_PRESETS.some((p) => p.slug === forward)) return forward;
  if (TREE_PRESETS.some((p) => p.slug === backward)) return backward;
  return null;
}
