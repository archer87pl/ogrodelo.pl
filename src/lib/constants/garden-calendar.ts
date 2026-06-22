export type CalendarCategory =
  | "drzewa"
  | "krzewy"
  | "trawnik"
  | "warzywnik"
  | "kwiaty"
  | "ogolne";

export type CalendarPriority = "wysoki" | "sredni" | "niski";

export interface CalendarTask {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: CalendarCategory;
  priority: CalendarPriority;
  timing?: string;
  relatedLink?: { href: string; label: string };
}

export interface CalendarMonth {
  slug: string;
  name: string;
  nameGenitive: string;
  number: number;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  intro: string;
  faq: { question: string; answer: string }[];
  tasks: CalendarTask[];
  sections: { heading: string; content: string }[];
}

export const CALENDAR_CATEGORIES: Record<
  CalendarCategory,
  { label: string; icon: string; color: string }
> = {
  drzewa: { label: "Drzewa", icon: "🌳", color: "bg-emerald-100 text-emerald-800" },
  krzewy: { label: "Krzewy", icon: "🌿", color: "bg-green-100 text-green-800" },
  trawnik: { label: "Trawnik", icon: "🟢", color: "bg-lime-100 text-lime-800" },
  warzywnik: { label: "Warzywnik", icon: "🥕", color: "bg-orange-100 text-orange-800" },
  kwiaty: { label: "Kwiaty", icon: "🌸", color: "bg-pink-100 text-pink-800" },
  ogolne: { label: "Ogólne", icon: "📋", color: "bg-slate-100 text-slate-700" },
};

export const CALENDAR_MONTHS: CalendarMonth[] = [
  {
    slug: "styczen",
    name: "Styczeń",
    nameGenitive: "stycznia",
    number: 1,
    title: "Kalendarz ogrodnika — styczeń: cięcie jabłoni i planowanie",
    description:
      "Co robić w ogrodzie w styczniu? Formujące cięcie jabłoni i gruszy, plan ogrodu, ochrona roślin przed mrozem. Harmonogram prac na styczeń w Polsce.",
    keywords: [
      "kalendarz ogrodnika styczeń",
      "prace ogrodowe styczeń",
      "cięcie jabłoni kiedy",
      "przycinanie jabłoni zimą",
      "co robić w ogrodzie w styczniu",
    ],
    intro:
      "Styczeń to czas spokoju w ogrodzie, ale nie bezczynności. W łagodniejsze dni możesz przycinać drzewa owocowe w spoczynku i zaplanować sezon — od nasion po układ rabat.",
    faq: [
      {
        question: "Czy w styczniu można przycinać jabłonie?",
        answer:
          "Tak — styczeń i luty to optymalny termin formującego cięcia jabłoni, gruszy i innych drzew owocowych liściastych. Pracuj w suche, mroźne dni, gdy temperatura jest dodatnia.",
      },
      {
        question: "Co robić z trawnikiem w styczniu?",
        answer:
          "Nic intensywnego. Unikaj chodzenia po mroźnym lub mokrym trawniku — łamie słomkę. Możesz jedynie zaplanować wiosenne nawożenie i wertykulację.",
      },
    ],
    tasks: [
      {
        id: "styczen-jablonia",
        slug: "przycinanie-jabloni",
        title: "Formujące cięcie jabłoni i gruszy",
        description:
          "Usuń chore, krzyżujące się i pędy rosnące do wnętrza korony. Zachowaj piramidę lub kielich — zależnie od formy. Rany powyżej 2 cm zabezpiecz maścią ogrodniczą.",
        category: "drzewa",
        priority: "wysoki",
        timing: "cały miesiąc (suche dni)",
        relatedLink: { href: "/porownywarka-drzew", label: "Porównywarka drzew" },
      },
      {
        id: "styczen-plan",
        title: "Planowanie sezonu i zamówienie nasion",
        description:
          "Narysuj szkic ogrodu, wybierz odmiany warzyw i kwiatów. Zamów nasiona i sadzonki z wyprzedzeniem — popularne odmiany szybko znikają ze sklepów.",
        category: "ogolne",
        priority: "sredni",
        relatedLink: { href: "/generator-planu-ogrodu", label: "Generator planu ogrodu" },
      },
      {
        id: "styczen-ochrona",
        title: "Ochrona roślin wrażliwych przed mrozem",
        description:
          "Sprawdź okrycia róż, lawendy, wrzośców i młodych iglaków. Usuń śnieg z gałęzi, które mogą się złamać pod ciężarem.",
        category: "krzewy",
        priority: "sredni",
        relatedLink: { href: "/porownywarka-krzewow", label: "Porównywarka krzewów" },
      },
      {
        id: "styczen-narzedzia",
        title: "Przegląd i ostrzenie narzędzi",
        description:
          "Oczyść, naostrz i nasmaruj sekatory, piły i łopaty. Dobre narzędzia to połowa sukcesu przy wiosennym cięciu.",
        category: "ogolne",
        priority: "niski",
      },
      {
        id: "styczen-slipy",
        title: "Cięcie śliw i wiśni (po jabłoniach)",
        description:
          "Śliwy i wiśnie przycinaj po jabłoniach — są wrażliwsze na wyciek soku. Krótkie, zdecydowane cięcia w suche dni.",
        category: "drzewa",
        priority: "sredni",
        timing: "druga połowa stycznia",
      },
      {
        id: "styczen-kompost",
        title: "Przerabianie kompostu",
        description:
          "Wymieszaj kompost, zbierz dojrzały materiał na rabaty. Zimą kompostowanie zwalnia — dodaj warstwę liści.",
        category: "ogolne",
        priority: "niski",
      },
    ],
    sections: [
      {
        heading: "Dlaczego styczeń to dobry czas na cięcie owocówek?",
        content:
          "Drzewa są w głębokim spoczynku — sok nie płynie intensywnie, więc rany szybciej się zasklepiają. Widoczność struktury korony bez liści ułatwia precyzyjne cięcie. Unikaj przycinania w dni deszczowe i podczas silnych mrozów.",
      },
    ],
  },
  {
    slug: "luty",
    name: "Luty",
    nameGenitive: "lutego",
    number: 2,
    title: "Kalendarz ogrodnika — luty: cięcie owocówek i siewy pod osłonami",
    description:
      "Prace ogrodowe w lutym: ostatni termin cięcia jabłoni, siew pomidorów i papryki, wapnowanie trawnika. Kalendarz ogrodnika na luty w Polsce.",
    keywords: [
      "kalendarz ogrodnika luty",
      "prace ogrodowe luty",
      "cięcie drzew owocowych luty",
      "siew pomidorów luty",
      "wapnowanie trawnika kiedy",
    ],
    intro:
      "Luty kończy zimowy sezon cięć i otwiera sezon siewów pod osłonami. To ostatnia szansa na formujące cięcie owocówek przed wybudzeniem pąków.",
    faq: [
      {
        question: "Do kiedy można ciąć jabłonie?",
        answer:
          "Formujące cięcie wykonaj najpóźniej do końca lutego, zanim pąki zaczną pęcznieć. Sanitarne usuwanie chorych gałęzi można robić przez cały rok.",
      },
    ],
    tasks: [
      {
        id: "luty-owocowe",
        slug: "przycinanie-jabloni",
        title: "Ostatni termin cięcia drzew owocowych",
        description:
          "Dokończ cięcie jabłoni, gruszy, śliw i wiśni. Usuń mummifikowane owoce wiszące na gałęziach — źródło chorób grzybowych.",
        category: "drzewa",
        priority: "wysoki",
        timing: "do końca miesiąca",
      },
      {
        id: "luty-winorośl",
        slug: "ciecie-winorosli",
        title: "Cięcie winorośli",
        description:
          "Przycinaj winorośl do 2–3 pąków na pędzie owocującym. Usuń pędy chore i zeszłoroczne, które owocowały.",
        category: "drzewa",
        priority: "wysoki",
      },
      {
        id: "luty-siew",
        slug: "siew-pomidorow",
        title: "Siew pomidorów, papryki i bakłażana",
        description:
          "Wysiew pod osłonami w domu lub na parapecie. Pomidory potrzebują 8–10 tygodni przed wysadzeniem na miejsce — licz od daty ostatnich przymrozków w Twojej strefie.",
        category: "warzywnik",
        priority: "wysoki",
        timing: "druga połowa lutego",
      },
      {
        id: "luty-wapno",
        slug: "wapnowanie-trawnika",
        title: "Wapnowanie trawnika",
        description:
          "Rozsyp wapno ogrodnicze lub mączny (150–250 g/m²) na mroźnym, suchym trawniku. Obniża kwaśność gleby i hamuje mchy.",
        category: "trawnik",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
      },
      {
        id: "luty-begonia",
        title: "Siew begonii i lobelii pod osłonami",
        description:
          "Kwiaty balkonowe wymagają długiego startu — wysiew w lutym daje kwitnące sadzonki na maj.",
        category: "kwiaty",
        priority: "niski",
        timing: "koniec lutego",
      },
      {
        id: "luty-porzeczka",
        title: "Cięcie porzeczki i agrestu",
        description:
          "Usuń stare, ciemne pędy (4+ lata). Zostaw 6–8 młodych pędów na krzew. Porzeczka owocuje na 2–3-letnim drewnie.",
        category: "drzewa",
        priority: "sredni",
      },
    ],
    sections: [
      {
        heading: "Siewy pod osłonami — od czego zacząć?",
        content:
          "Pomidory, papryka i bakłażan wymagają długiego sezonu wegetacyjnego w Polsce. Wysiew w lutym daje silne sadzonki gotowe do wysadzenia w maju. Używaj żyznej ziemi do siewów i zapewnij 16–18 h światła dziennie (lampy LED ogrodnicze w razie potrzeby).",
      },
    ],
  },
  {
    slug: "marzec",
    name: "Marzec",
    nameGenitive: "marca",
    number: 3,
    title: "Kalendarz ogrodnika — marzec: siewy, nawożenie i sadzenie",
    description:
      "Co robić w ogrodzie w marcu? Siew warzyw, wczesne nawożenie trawnika, sadzenie drzew liściastych. Harmonogram prac ogrodowych na marzec.",
    keywords: [
      "kalendarz ogrodnika marzec",
      "prace ogrodowe marzec",
      "siew warzyw marzec",
      "nawożenie trawnika wiosna",
      "sadzenie drzew marzec",
    ],
    intro:
      "Marzec budzi ogród — pierwsze siewy do gruntu pod osłonami, start sezonu nawożenia i idealny moment na sadzenie drzew liściastych z bryłą.",
    faq: [
      {
        question: "Kiedy zacząć nawozić trawnik wiosną?",
        answer:
          "Pierwsze nawożenie wykonaj w marcu, gdy trawa zacznie zielenić — użyj nawozu wiosennego z wyższą zawartością azotu. Unikaj nawożenia na mroźnej lub przemoczonej murawie.",
      },
    ],
    tasks: [
      {
        id: "marzec-siew",
        title: "Siew marchewki, rzodkiewki, sałaty i szpinaku",
        description:
          "Bezpośrednio do gruntu pod tunel foliowy lub agrowłókninę. Gleba musi być przepuszczalna — marchewka nie znosi zbitej ziemi.",
        category: "warzywnik",
        priority: "wysoki",
        timing: "od połowy marca",
      },
      {
        id: "marzec-trawnik",
        slug: "nawozenie-trawnika",
        title: "Pierwsze nawożenie trawnika",
        description:
          "Nawóz wiosenny NPK (np. 15-5-10) — ok. 30–40 g/m². Po nawożeniu podlej, jeśli nie pada deszcz.",
        category: "trawnik",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia trawnika" },
      },
      {
        id: "marzec-drzewa",
        slug: "sadzenie-drzew",
        title: "Sadzenie drzew liściastych",
        description:
          "Marzec to idealny czas na sadzenie sadzonek z bryłą. Wykop dołek 2× większy od korzeni, dodaj kompost, podlej obficie.",
        category: "drzewa",
        priority: "sredni",
        relatedLink: { href: "/porownywarka-drzew", label: "Które drzewo wybrać?" },
      },
      {
        id: "marzec-zywoplot",
        title: "Lekkie cięcie żywopłotów zimozielonych",
        description:
          "Usuń uszkodzone i wystające pędy z tui, cisów i laurowiśni. Unikaj cięć przy mrozie — cięcie na mrozie może uszkodzić igły.",
        category: "krzewy",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-zywoplotu", label: "Kalkulator żywopłotu" },
      },
      {
        id: "marzec-trawnik-siew",
        slug: "zakladanie-trawnika",
        title: "Zakładanie trawnika z siewu",
        description:
          "Przygotuj glebę: usuń chwasty, zrównaj, lekko ubij. Wysiew nasion — 30–50 g/m² w zależności od mieszanki.",
        category: "trawnik",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
      },
      {
        id: "marzec-brokuly",
        title: "Siew brokułów i kalafiorów pod osłonami",
        description:
          "Wysiew do doniczek w domu — wysadzenie na grządkę w kwietniu. Wymagają chłodniejszej temperatury niż pomidory (15–18°C).",
        category: "warzywnik",
        priority: "sredni",
      },
      {
        id: "marzec-byliny",
        title: "Dzielenie i przesadzanie bylin",
        description:
          "Hosty, irysy, piwonia — podziel kępy, gdy zaczynają wypuszczać pędy. Przesadź na nowe miejsca z kompostem.",
        category: "kwiaty",
        priority: "sredni",
        timing: "od połowy marca",
      },
      {
        id: "marzec-chwasty",
        title: "Pierwsze usuwanie chwastów z rabat",
        description:
          "Wyrywaj młode chwasty dwuliścienne, zanim zakwitną. Mulcz 5 cm hamuje ich wzrost.",
        category: "ogolne",
        priority: "niski",
      },
    ],
    sections: [],
  },
  {
    slug: "kwiecien",
    name: "Kwiecień",
    nameGenitive: "kwietnia",
    number: 4,
    title: "Kalendarz ogrodnika — kwiecień: nawożenie hortensji i start sezonu",
    description:
      "Prace w ogrodzie w kwietniu: nawożenie hortensji, pierwsze koszenie, siew ciepłolubnych warzyw, cięcie róż. Kalendarz ogrodnika na kwiecień.",
    keywords: [
      "kalendarz ogrodnika kwiecień",
      "nawożenie hortensji kiedy",
      "pierwsze koszenie trawnika",
      "prace ogrodowe kwiecień",
      "siew warzyw kwiecień",
    ],
    intro:
      "Kwiecień to wybudzenie ogrodu — hortensje, trawnik i rabaty wymagają pierwszego nawożenia. To też czas na cięcie róż i forsycji po kwitnieniu.",
    faq: [
      {
        question: "Kiedy nawozić hortensje?",
        answer:
          "Pierwsze nawożenie w kwietniu — nawóz wieloskładnikowy lub specjalistyczny do roślin kwasolubnych (dla hortensji niebieskich). Drugie w maju, trzecie w lipcu. Hortensje przesuwające nawóz w maju.",
      },
      {
        question: "Kiedy po raz pierwszy kosić trawnik?",
        answer:
          "Gdy trawa osiągnie ok. 8–10 cm — zwykle w drugiej połowie kwietnia. Ustaw kosiarkę na 5–6 cm przy pierwszym koszeniu.",
      },
    ],
    tasks: [
      {
        id: "kwiecien-hortensja",
        slug: "nawozenie-hortensji",
        title: "Nawożenie hortensji (pierwsza dawka)",
        description:
          "Hortensje niebieskie i różowe: nawóz do roślin kwasolubnych lub specjalny do hortensji. Rozsyp ok. 50 g/m² wokół krzewu, nie dotykając pnia. Podlej.",
        category: "kwiaty",
        priority: "wysoki",
        timing: "początek kwietnia",
        relatedLink: { href: "/porownywarka-krzewow/hortensja-vs-forsycja", label: "Hortensja vs forsycja" },
      },
      {
        id: "kwiecien-koszenie",
        title: "Pierwsze koszenie trawnika",
        description:
          "Koszenie na wysokości 5–6 cm. Usuń filc (mchem) szczotką lub lekkim grabieniem, jeśli zimą się rozwinął.",
        category: "trawnik",
        priority: "wysoki",
      },
      {
        id: "kwiecien-roze",
        slug: "przycinanie-roz",
        title: "Cięcie róż i forsycji",
        description:
          "Róże wielkokwiatowe: usuń chore pędy, skróć zdrowe o 1/3. Forsycja: przycinaj zaraz po kwitnieniu — kwiaty na zeszłorocznym drewnie.",
        category: "krzewy",
        priority: "wysoki",
        timing: "po kwitnieniu forsycji",
      },
      {
        id: "kwiecien-ziemniaki",
        title: "Sadzenie ziemniaków",
        description:
          "Tradycyjnie w Wielkanoc lub gdy gleba osiągnie 8–10°C. Wałki w odstępie 70 cm, bulwy co 30 cm, 10 cm głęboko.",
        category: "warzywnik",
        priority: "wysoki",
      },
      {
        id: "kwiecien-trawnik-siew",
        slug: "zakladanie-trawnika",
        title: "Zakładanie trawnika (drugi termin wiosenny)",
        description:
          "Kwiecień to dobry czas na siew trawnika — gleba wilgotna, temperatura rośnie. Przygotuj jak w marcu.",
        category: "trawnik",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
      },
      {
        id: "kwiecien-groch",
        title: "Siew grochu i bobu",
        description:
          "Bezpośrednio do gruntu — groch wymaga podpór. Bob toleruje lekkie przymrozki.",
        category: "warzywnik",
        priority: "sredni",
      },
      {
        id: "kwiecien-malach",
        title: "Oprysk jabłoni przeciw parchowi",
        description:
          "Pierwszy oprysk miedziowy przy pękaniu pąków — profilaktyka chorób grzybowych po zimowym cięciu.",
        category: "drzewa",
        priority: "sredni",
        timing: "pękanie pąków",
      },
    ],
    sections: [
      {
        heading: "Nawożenie hortensji — jak dobrać nawóz?",
        content:
          "Hortensje niebieskie wymagają kwaśnej gleby (pH 4,5–5,5) — użyj nawozu z siarczanem glinu lub specjalnego preparatu „na niebieski kolor”. Hortensje różowe i czerwone tolerują neutralne pH. Hortensje przesuwające (Hydrangea arborescens, paniculata) nawoź raz w maju — za dużo azotu = liście zamiast kwiatów.",
      },
    ],
  },
  {
    slug: "maj",
    name: "Maj",
    nameGenitive: "maja",
    number: 5,
    title: "Kalendarz ogrodnika — maj: wertykulacja trawnika i nawożenie hortensji",
    description:
      "Co robić w maju w ogrodzie? Wertykulacja trawnika, druga dawka nawozu dla hortensji, cięcie żywopłotów, wysadzanie pomidorów. Kalendarz ogrodnika na maj.",
    keywords: [
      "kalendarz ogrodnika maj",
      "wertykulacja trawnika kiedy",
      "wertykulacja trawnika maj",
      "nawożenie hortensji maj",
      "prace ogrodowe maj",
    ],
    intro:
      "Maj to jeden z najbardziej pracowitych miesięcy — wertykulacja trawnika, intensywne nawożenie roślin i wysadzanie ciepłolubnych warzyw po ostatnich przymrozkach.",
    faq: [
      {
        question: "Kiedy wertykulować trawnik?",
        answer:
          "Optymalnie w maju lub wczesnym czerwcu — gdy trawa intensywnie rośnie i szybko się regeneruje. Unikaj wertykulacji w upały, suszę i tuż przed planowanym urlopem.",
      },
      {
        question: "Czy w maju można nawozić hortensje?",
        answer:
          "Tak — maj to druga (dla hortensji ogrodowych) lub główna dawka (dla hortensji przesuwających). Użyj nawozu o wolniejszym uwalnianiu.",
      },
    ],
    tasks: [
      {
        id: "maj-wertykulacja",
        slug: "wertykulacja-trawnika",
        title: "Wertykulacja trawnika",
        description:
          "Nacięcie filcu i sterty na głębokość 2–3 mm — ręczną wertykulatorą lub maszyną. Usuń materiał, nawieś 30–40 g/m² nawozu, podlej. Trawa zregeneruje się w 2–3 tygodnie.",
        category: "trawnik",
        priority: "wysoki",
        timing: "pierwsza połowa maja",
        relatedLink: { href: "/kalkulator-nawozenia", label: "Nawożenie po wertykulacji" },
      },
      {
        id: "maj-hortensja",
        slug: "nawozenie-hortensji",
        title: "Nawożenie hortensji (druga dawka)",
        description:
          "Powtórz nawożenie hortensji ogrodowych. Hortensje przesuwające (Annabelle, Limelight): pierwsza i główna dawka w maju.",
        category: "kwiaty",
        priority: "wysoki",
      },
      {
        id: "maj-zywoplot",
        slug: "ciecie-zywoplotu",
        title: "Pierwsze cięcie żywopłotów w sezonie",
        description:
          "Formujące cięcie grabu, bukszpanu, berberysu i laurowiśni. Nie przycinaj w pełnym słońcu — lepiej rano lub wieczorem.",
        category: "krzewy",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-zywoplotu", label: "Harmonogram cięcia żywopłotu" },
      },
      {
        id: "maj-pomidory",
        title: "Wysadzanie pomidorów i papryki",
        description:
          "Po „zimnej Zośce” (13–15 maja) lub gdy minie ryzyko przymrozków. Mulczuj słomą lub agrowłókniną.",
        category: "warzywnik",
        priority: "wysoki",
        timing: "od połowy maja",
      },
      {
        id: "maj-podlewanie",
        title: "Ustawienie harmonogramu nawadniania",
        description:
          "Maj bywa suchy — zaplanuj podlewanie: rano lub wieczorem, 20–30 l/m² tygodniowo dla trawnika w suszy.",
        category: "ogolne",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      },
      {
        id: "maj-truskawki",
        title: "Mulczowanie truskawek i usuwanie mustache",
        description:
          "Słoma lub agrowłóknina pod owocami — czyste jagody i mniej chorób. Usuń rozłogi (mustache), które zagęszczają grządkę.",
        category: "warzywnik",
        priority: "sredni",
      },
      {
        id: "maj-bob",
        title: "Siew kukurydzy, fasoli i dyni",
        description:
          "Po ostatnich przymrozkach — gleba min. 12°C. Kukurydza: rzędy co 70 cm. Dynia: dużo miejsca na rozrost.",
        category: "warzywnik",
        priority: "wysoki",
        timing: "druga połowa maja",
      },
    ],
    sections: [
      {
        heading: "Wertykulacja krok po kroku",
        content:
          "1) Skosz trawnik na 3–4 cm. 2) Wertykuluj w dwóch kierunkach prostopadłych. 3) Zgrabuj i usuń filc. 4) Opcjonalnie: nawieś piasku kwarcowego na gleby ciężkie (1–2 l/m²). 5) Nawóz + obfite podlewanie przez 2 tygodnie. Wertykulację wykonuj co 1–2 lata na trawnikach użytkowanych.",
      },
    ],
  },
  {
    slug: "czerwiec",
    name: "Czerwiec",
    nameGenitive: "czerwca",
    number: 6,
    title: "Kalendarz ogrodnika — czerwiec: wertykulacja, podlewanie i zbiór",
    description:
      "Prace ogrodowe w czerwcu: wertykulacja trawnika (drugi termin), intensywne podlewanie, cięcie żywopłotów, zbiór warzyw. Kalendarz ogrodnika na czerwiec.",
    keywords: [
      "kalendarz ogrodnika czerwiec",
      "wertykulacja trawnika czerwiec",
      "podlewanie ogrodu lato",
      "prace ogrodowe czerwiec",
      "kiedy kosić trawnik latem",
    ],
    intro:
      "Czerwiec przynosi upały i szybki wzrost — trawnik i rabaty wymagają regularnej pielęgnacji. To ostatni dogodny termin wertykulacji przed latem.",
    faq: [
      {
        question: "Czy w czerwcu można jeszcze wertykulować trawnik?",
        answer:
          "Tak, ale najpóźniej do połowy czerwca — później trawa regeneruje się wolno w upały. Jeśli przegapiłeś maj, zrób to teraz lub poczekaj do września.",
      },
    ],
    tasks: [
      {
        id: "czerwiec-wertykulacja",
        slug: "wertykulacja-trawnika",
        title: "Wertykulacja trawnika (ostatni termin wiosenny)",
        description:
          "Jeśli nie zrobiłeś tego w maju — wertykuluj do połowy czerwca. Po wertykulacji unikaj intensywnego użytkowania trawnika przez 3 tygodnie.",
        category: "trawnik",
        priority: "wysoki",
        timing: "do połowy miesiąca",
      },
      {
        id: "czerwiec-koszenie",
        title: "Regularne koszenie — wyżej w upały",
        description:
          "W upały kosić na 6–7 cm (nie krócej niż 4 cm). Kosić co 5–7 dni. Nie kosz mokrej trawy.",
        category: "trawnik",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-robota-koszacego", label: "Robot koszący" },
      },
      {
        id: "czerwiec-podlewanie",
        slug: "podlewanie-trawnika",
        title: "Intensywne podlewanie w okresie suszy",
        description:
          "Podlewaj rzadziej, ale obficie — 25–35 l/m² na tydzień. Lepiej rano (5–8) niż wieczorem. Sprawdź kalkulator zapotrzebowania na wodę.",
        category: "ogolne",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-nawadniania/trawnik", label: "Nawadnianie trawnika" },
      },
      {
        id: "czerwiec-zywoplot",
        slug: "ciecie-zywoplotu",
        title: "Drugie cięcie szybkorosnących żywopłotów",
        description:
          "Laurowiśnia, ostrokrzew i grab mogą wymagać drugiego cięcia w czerwcu. Formuj boki i wierzchołek.",
        category: "krzewy",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-wzrostu", label: "Tempo wzrostu roślin" },
      },
      {
        id: "czerwiec-zbiory",
        title: "Zbiór truskawek, rzodkiewki i sałaty",
        description:
          "Truskawki: zbieraj co 2–3 dni. Sałata i rzodkiewka — zanim przejdą w pęd kwiatostanowy.",
        category: "warzywnik",
        priority: "sredni",
      },
      {
        id: "czerwiec-chwasty",
        title: "Usuwanie chwastów z rabat i ścieżek",
        description:
          "Regularne pielenie co 7–10 dni — chwasty w czerwcu rosną najszybciej. Mulczuj po wysuszeniu gleby.",
        category: "ogolne",
        priority: "sredni",
      },
      {
        id: "czerwiec-borowki",
        title: "Zbiór borówek i malin",
        description:
          "Borówki: zbieraj co 2–3 dni w pełnym słońcu. Maliny letnie — zbieraj do pojemników, nie ściśkaj.",
        category: "warzywnik",
        priority: "sredni",
        timing: "od połowy czerwca",
      },
    ],
    sections: [],
  },
  {
    slug: "lipiec",
    name: "Lipiec",
    nameGenitive: "lipca",
    number: 7,
    title: "Kalendarz ogrodnika — lipiec: podlewanie, cięcie i pielęgnacja",
    description:
      "Co robić w lipcu w ogrodzie? Nawadnianie w upały, cięcie więdniętych kwiatów hortensji, drugie cięcie żywopłotów, zbiór warzyw. Kalendarz na lipiec.",
    keywords: [
      "kalendarz ogrodnika lipiec",
      "podlewanie ogrodu lipiec",
      "pielęgnacja hortensji lipiec",
      "prace ogrodowe lipiec",
    ],
    intro:
      "Lipiec to miesiąc upałów i obfitych zbiorów. Priorytet: woda, mulczowanie i usuwanie przekwitłych kwiatów.",
    faq: [
      {
        question: "Jak często podlewać ogród w lipcu?",
        answer:
          "Trawnik: 20–30 l/m² tygodniowo w suszy. Warzywnik: co 2–3 dni, głęboko. Krzewy i drzewa młode: raz w tygodniu obficie. Mulczuj — zmniejsza parowanie o 30–50%.",
      },
    ],
    tasks: [
      {
        id: "lipiec-nawadnianie",
        slug: "podlewanie-trawnika",
        title: "Nawadnianie i mulczowanie",
        description:
          "Kora, słoma lub kompost na rabatach — 5–8 cm warstwa. Podlewaj rano. Rozważ zbieranie deszczówki.",
        category: "ogolne",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-deszczowki", label: "Kalkulator deszczówki" },
      },
      {
        id: "lipiec-hortensja",
        title: "Usuwanie przekwitłych kwiatów hortensji",
        description:
          "Hortensje przesuwające: usuń brązowe kwiatostany nad pierwszym parą liści. Hortensje ogrodowe: nie przycinaj — kwiaty na zeszłorocznym drewnie.",
        category: "kwiaty",
        priority: "sredni",
      },
      {
        id: "lipiec-zywoplot",
        title: "Letnie cięcie żywopłotów",
        description:
          "Utrzymuj kształt — lekkie cięcie boków. Unikaj cięć w pełnym słońcu przy 30°C+.",
        category: "krzewy",
        priority: "sredni",
      },
      {
        id: "lipiec-nawoz",
        slug: "nawozenie-hortensji",
        title: "Trzecia dawka nawozu dla hortensji (opcjonalnie)",
        description:
          "Lekki nawóz potasowy dla hortensji ogrodowych — wspiera kwitnienie w przyszłym roku. Nie nawoź suchych roślin.",
        category: "kwiaty",
        priority: "niski",
      },
      {
        id: "lipiec-pomidory",
        title: "Usuwanie pędów bocznych u pomidorów",
        description:
          "Szypułkuj pomidory co tydzień — energia idzie w owoce, nie liście. Usuń liście przy ziemi (choroby).",
        category: "warzywnik",
        priority: "sredni",
      },
      {
        id: "lipiec-trawnik",
        title: "Koszenie trawnika w upały — wyżej i rzadziej",
        description:
          "6–7 cm wysokości, co 7–10 dni. Nie nawoź w skrajnym upale. Podlewaj rano.",
        category: "trawnik",
        priority: "wysoki",
      },
    ],
    sections: [],
  },
  {
    slug: "sierpien",
    name: "Sierpień",
    nameGenitive: "sierpnia",
    number: 8,
    title: "Kalendarz ogrodnika — sierpień: siewy jesienne i przygotowanie",
    description:
      "Prace ogrodowe w sierpniu: siew szpinaku i rukoli, sadzenie cebul kwiatowych, przygotowanie trawnika pod jesień. Kalendarz ogrodnika na sierpień.",
    keywords: [
      "kalendarz ogrodnika sierpień",
      "siew jesienny warzyw",
      "sadzenie cebul kwiatowych",
      "prace ogrodowe sierpień",
    ],
    intro:
      "Sierpień łączy letnie zbiory z planowaniem jesieni — siew warzyw liściowych na jesień i zakup cebul wiosennych.",
    faq: [
      {
        question: "Co można siać w sierpniu?",
        answer:
          "Szpinak, rukola, rzodkiewka jesienna, sałata, roszponka i kalarepa. Wysiew do połowy sierpnia — zdążą przed przymrozkami.",
      },
    ],
    tasks: [
      {
        id: "sierpien-siew",
        title: "Siew warzyw na jesień",
        description:
          "Szpinak, rukola, sałata jesienna, rzodkiewka. Wybierz miejsca po wczesnych warzywach — użyźnij kompostem.",
        category: "warzywnik",
        priority: "wysoki",
        timing: "pierwsza połowa miesiąca",
      },
      {
        id: "sierpien-cebulki",
        slug: "sadzenie-cebul-kwiatowych",
        title: "Sadzenie cebul kwiatowych",
        description:
          "Krokusy, narcyzy, tulipany — sadź od września, ale zamów cebulki teraz. Wybierz suche, twarde cebulki bez pleśni.",
        category: "kwiaty",
        priority: "sredni",
      },
      {
        id: "sierpien-trawnik",
        title: "Przygotowanie trawnika pod jesień",
        description:
          "Usuń chwasty, nawieś nawóz jesienny (niższy azot) pod koniec sierpnia. Zaplanuj aerację we wrześniu.",
        category: "trawnik",
        priority: "sredni",
      },
      {
        id: "sierpien-sadzonki",
        title: "Pędzenie sadzonek krzewów i róż",
        description:
          "Pobierz zdrowe pędy zielne, ukorzeń w perlitcie lub wodzie. Róże: sadzonki z łodyg letnich.",
        category: "krzewy",
        priority: "niski",
      },
      {
        id: "sierpien-jabłka",
        title: "Cięcie pędów wodnych jabłoni",
        description:
          "Usuń pionowe odrostki z pnia i korony — energia wraca do owoców. Nie wycinaj grubo latem.",
        category: "drzewa",
        priority: "sredni",
      },
      {
        id: "sierpien-zbiory",
        title: "Zbiór śliw, gruszek i wczesnych jabłek",
        description:
          "Zbieraj owoce w suchy dzień. Przechowuj w chłodnym miejscu — jabłka oddzielnie od innych owoców.",
        category: "warzywnik",
        priority: "sredni",
        timing: "druga połowa sierpnia",
      },
    ],
    sections: [],
  },
  {
    slug: "wrzesien",
    name: "Wrzesień",
    nameGenitive: "września",
    number: 9,
    title: "Kalendarz ogrodnika — wrzesień: sadzenie i jesienne nawożenie",
    description:
      "Co robić we wrześniu? Sadzenie żywopłotów i drzew, jesienne nawożenie trawnika, sadzenie cebul kwiatowych. Kalendarz ogrodnika na wrzesień.",
    keywords: [
      "kalendarz ogrodnika wrzesień",
      "sadzenie żywopłotu wrzesień",
      "nawożenie trawnika jesień",
      "sadzenie drzew wrzesień",
    ],
    intro:
      "Wrzesień to drugi (obok wiosny) najlepszy termin sadzeń — ciepła gleba i jesienne opady wspierają ukorzenianie.",
    faq: [
      {
        question: "Czy we wrześniu można sadzić żywopłot?",
        answer:
          "Tak — wrzesień to idealny czas. Rośliny zdążą się ukorzenić przed zimą. Podlejaj do zamrozków. Unikaj sadzenia tuż przed silnymi mrozami.",
      },
    ],
    tasks: [
      {
        id: "wrzesien-zywoplot",
        slug: "sadzenie-zywoplotu",
        title: "Sadzenie żywopłotów i krzewów",
        description:
          "Grab, bukszpan, berberys, ostrokrzew — sadzonki z gruntu lub kontenera. Odstępy wg kalkulatora żywopłotu.",
        category: "krzewy",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-zywoplotu", label: "Ile sadzonek na żywopłot?" },
      },
      {
        id: "wrzesien-trawnik",
        slug: "nawozenie-trawnika",
        title: "Jesienne nawożenie trawnika",
        description:
          "Nawóz jesienny (niski azot, wysoki potas i fosfor) — wzmacnia korzenie przed zimą. 30–40 g/m².",
        category: "trawnik",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-nawozenia", label: "Harmonogram nawożenia" },
      },
      {
        id: "wrzesien-cebulki",
        slug: "sadzenie-cebul-kwiatowych",
        title: "Sadzenie cebul wiosennych",
        description:
          "Tulipany, narcyzy, krokusy — sadź 2–3× głębiej niż wysokość cebulki. Miejsce słoneczne, gleba przepuszczalna.",
        category: "kwiaty",
        priority: "wysoki",
        timing: "cały miesiąc",
      },
      {
        id: "wrzesien-drzewa",
        slug: "sadzenie-drzew",
        title: "Sadzenie drzew i krzewów liściastych",
        description:
          "Bryły korzeniowe i rośliny z pojemników. Podlej co tydzień do listopada.",
        category: "drzewa",
        priority: "wysoki",
        relatedLink: { href: "/porownywarka-drzew", label: "Porównywarka drzew" },
      },
      {
        id: "wrzesien-liscie",
        title: "Grabienie liści z trawnika",
        description:
          "Liście zaciemiają murawę i sprzyjają mchom. Kompostuj liście liściaste — iglaste rozłóż cienko jako mulcz.",
        category: "trawnik",
        priority: "sredni",
      },
      {
        id: "wrzesien-aeracja",
        slug: "aeracja-trawnika",
        title: "Aeracja trawnika",
        description:
          "Wgłębnianie gleby na wilgotnym trawniku — rozluźnia zbitą murawę. Łącz z jesiennym nawożeniem.",
        category: "trawnik",
        priority: "sredni",
        timing: "wrzesień",
      },
      {
        id: "wrzesien-wertykulacja",
        slug: "wertykulacja-trawnika",
        title: "Jesienna wertykulacja trawnika",
        description:
          "Drugi termin wertykulacji w roku — usuwa letni filc przed zimą. Regeneracja trawy trwa 3–4 tygodnie.",
        category: "trawnik",
        priority: "sredni",
      },
    ],
    sections: [],
  },
  {
    slug: "pazdziernik",
    name: "Październik",
    nameGenitive: "października",
    number: 10,
    title: "Kalendarz ogrodnika — październik: ochrona na zimę i ostatnie koszenie",
    description:
      "Prace ogrodowe w październiku: ochrona róż na zimę, ostatnie koszenie trawnika, jesienne cięcie żywopłotów. Kalendarz ogrodnika na październik.",
    keywords: [
      "kalendarz ogrodnika październik",
      "ochrona róż na zimę",
      "ostatnie koszenie trawnika",
      "jesienne cięcie żywopłotu",
    ],
    intro:
      "Październik to czas zabezpieczania ogrodu przed zimą — okrywanie wrażliwych roślin, ostatnie koszenie i porządki.",
    faq: [
      {
        question: "Kiedy kończyć koszenie trawnika?",
        answer:
          "Ostatnie koszenie w październiku — na wysokości 5–6 cm. Zbyt nisko przed zimą osłabia trawę. Nie kosz mokrej murawy.",
      },
    ],
    tasks: [
      {
        id: "pazdziernik-roze",
        slug: "ochrona-roz-na-zime",
        title: "Ochrona róż i krzewów wrażliwych",
        description:
          "Kopczykowanie róż — usyp ziemi do 25 cm. Hortensje ogrodowe: okryj włókniną (nie folią!). Lawenda i wrzosy: lekka okrywa.",
        category: "krzewy",
        priority: "wysoki",
        timing: "po pierwszych przymrozkach",
      },
      {
        id: "pazdziernik-koszenie",
        title: "Ostatnie koszenie trawnika",
        description:
          "Koszenie na 5–6 cm. Usuń liście. Opcjonalnie: jeszcze jedno nawożenie jesienne, jeśli nie zrobiłeś we wrześniu.",
        category: "trawnik",
        priority: "wysoki",
      },
      {
        id: "pazdziernik-zywoplot",
        slug: "ciecie-zywoplotu",
        title: "Jesienne cięcie żywopłotów",
        description:
          "Ostatnia szansa na cięcie przed mrozem — grab, bukszpan, berberys. Nie tnij tuja i laurowiśni przy mrozie.",
        category: "krzewy",
        priority: "sredni",
        relatedLink: { href: "/kalkulator-zywoplotu", label: "Kalkulator żywopłotu" },
      },
      {
        id: "pazdziernik-kompost",
        title: "Kompostowanie liści i resztek roślinnych",
        description:
          "Zbierz liście do kompostownika. Nie kompostuj chorych roślin — spal lub wyrzuć.",
        category: "ogolne",
        priority: "sredni",
      },
      {
        id: "pazdziernik-cebulki",
        slug: "sadzenie-cebul-kwiatowych",
        title: "Ostatni termin sadzenia cebul wiosennych",
        description:
          "Tulipany i narcyzy — sadź do połowy października, zanim gleba zmarznie. Późne sadzenie = słabsze kwitnienie.",
        category: "kwiaty",
        priority: "sredni",
        timing: "do połowy miesiąca",
      },
      {
        id: "pazdziernik-drzewa",
        slug: "sadzenie-drzew",
        title: "Sadzenie drzew i krzewów (ostatni termin jesienny)",
        description:
          "Do listopada — liściaste z bryłą. Podlejaj co tydzień do zamrozków.",
        category: "drzewa",
        priority: "sredni",
      },
    ],
    sections: [],
  },
  {
    slug: "listopad",
    name: "Listopad",
    nameGenitive: "listopada",
    number: 11,
    title: "Kalendarz ogrodnika — listopad: zabezpieczenie ogrodu na zimę",
    description:
      "Co robić w listopadzie w ogrodzie? Zabezpieczenie systemu nawadniania, okrywanie roślin, sprzątanie narzędzi. Kalendarz ogrodnika na listopad.",
    keywords: [
      "kalendarz ogrodnika listopad",
      "przygotowanie ogrodu na zimę",
      "zabezpieczenie nawadniania zima",
      "prace ogrodowe listopad",
    ],
    intro:
      "Listopad kończy sezon wegetacyjny — zabezpiecz instalacje, okryj rośliny i posprzątaj ogród przed mrozami.",
    faq: [
      {
        question: "Jak zabezpieczyć nawadnianie na zimę?",
        answer:
          "Wyłącz wodę, spuść z instalacji podlewania automatycznego (przedmuchaj sprężonym powietrzem lub otwórz zawory spustowe). Schowaj węże i pistolety do budynku.",
      },
    ],
    tasks: [
      {
        id: "listopad-nawadnianie",
        title: "Zabezpieczenie instalacji nawadniania",
        description:
          "Spuść wodę z rur, wyłącz sterownik. Zdemontuj czujniki deszczu na zimę.",
        category: "ogolne",
        priority: "wysoki",
        relatedLink: { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      },
      {
        id: "listopad-okrywanie",
        title: "Okrywanie roślin iglastych i róż",
        description:
          "Młode iglaki: osłona z juty lub agrowłókniny. Róże: dokopczykowanie lub okrywanie.",
        category: "krzewy",
        priority: "wysoki",
      },
      {
        id: "listopad-narzedzia",
        title: "Mycie i konserwacja narzędzi",
        description:
          "Wyczyść, naostrz, nasmaruj olejem. Schowaj do suchego miejsca.",
        category: "ogolne",
        priority: "sredni",
      },
      {
        id: "listopad-drzewa",
        title: "Ochrona młodych drzew przed mrozem i słońcem",
        description:
          "Osłonki na pnie młodych drzew liściastych — chronią przed pękaniem kory przy mrozie i słońcu zimowym.",
        category: "drzewa",
        priority: "sredni",
      },
      {
        id: "listopad-liscie",
        title: "Usuwanie liści z trawnika i rabat",
        description:
          "Liście na trawniku = mchy i choroby. Kompostuj liście liściaste, iglaste rozłóż cienko.",
        category: "trawnik",
        priority: "sredni",
      },
      {
        id: "listopad-karmnik",
        title: "Karmniki i poidełka dla ptaków",
        description:
          "Ptaki zimą zjadają szkodniki w ogrodzie. Regularnie uzupełniaj pokarm i wodę.",
        category: "ogolne",
        priority: "niski",
      },
    ],
    sections: [],
  },
  {
    slug: "grudzien",
    name: "Grudzień",
    nameGenitive: "grudnia",
    number: 12,
    title: "Kalendarz ogrodnika — grudzień: planowanie i spokój",
    description:
      "Co robić w grudniu w ogrodzie? Planowanie sezonu, zamówienia nasion, lekkie cięcia w łagodne dni. Kalendarz ogrodnika na grudzień.",
    keywords: [
      "kalendarz ogrodnika grudzień",
      "planowanie ogrodu zima",
      "prace ogrodowe grudzień",
      "co robić w ogrodzie zimą",
    ],
    intro:
      "Grudzień to czas odpoczynku ogrodu i planowania. W łagodne dni możesz wykonać lekkie cięcia sanitarne i zamówić nasiona na wiosnę.",
    faq: [
      {
        question: "Czy w grudniu można coś robić w ogrodzie?",
        answer:
          "Tak — w suche, mroźne dni: cięcie sanitarne drzew owocowych, planowanie, przegląd katalogów nasion. Unikaj pracy na mokrej, zamarzniętej glebie.",
      },
    ],
    tasks: [
      {
        id: "grudzien-plan",
        title: "Planowanie ogrodu na przyszły sezon",
        description:
          "Przejrzyj zeszłoroczne notatki, zaplanuj rotację warzyw, nowe rabaty i budżet. Użyj generatora planu ogrodu.",
        category: "ogolne",
        priority: "sredni",
        relatedLink: { href: "/generator-planu-ogrodu", label: "Generator planu ogrodu" },
      },
      {
        id: "grudzien-nasiona",
        title: "Zamówienie nasion i sadzonek",
        description:
          "Popularne odmiany pomidorów i warzyw szybko znikają — zamów w grudniu lub styczniu.",
        category: "warzywnik",
        priority: "sredni",
      },
      {
        id: "grudzien-ciecie",
        slug: "przycinanie-jabloni",
        title: "Lekkie cięcie sanitarne (w łagodne dni)",
        description:
          "Usuwanie chorych i uszkodzonych gałęzi z drzew owocowych i ozdobnych — tylko w suche dni bez odwilży.",
        category: "drzewa",
        priority: "niski",
      },
      {
        id: "grudzien-ptaki",
        title: "Karmniki dla ptaków",
        description:
          "Ptaki zimą zjadają szkodniki — zawieś karmnik i zapewnij wodę (podgrzewacz lub regularna wymiana).",
        category: "ogolne",
        priority: "niski",
      },
      {
        id: "grudzien-snieg",
        title: "Usuwanie śniegu z gałęzi",
        description:
          "Strząśnij śnieg z iglaków i młodych drzew — ciężki śnieg łamie gałęzie. Nie odrywaj lodu.",
        category: "drzewa",
        priority: "sredni",
        timing: "po opadach śniegu",
      },
    ],
    sections: [],
  },
];

export const MAIN_CALENDAR_FAQ = [
  {
    question: "Czym jest kalendarz ogrodnika?",
    answer:
      "Kalendarz ogrodnika to harmonogram prac w ogrodzie podzielony na miesiące — od cięcia drzew zimą po wertykulację trawnika w maju i sadzenia jesienią. Dostosowany do polskiego klimatu i strefy USDA 6–7.",
  },
  {
    question: "Kiedy wertykulować trawnik w Polsce?",
    answer:
      "Najlepiej w maju lub do połowy czerwca — gdy trawa intensywnie rośnie. Drugi termin to wrzesień. Wertykulacja usuwa filc i poprawia dostęp powietrza do korzeni.",
  },
  {
    question: "Kiedy przycinać jabłonie?",
    answer:
      "Formujące cięcie: styczeń i luty (drzewa w spoczynku). Sanitarne cięcie chorych gałęzi: przez cały rok. Unikaj cięć podczas wiosennego pękania pąków.",
  },
  {
    question: "Kiedy nawozić hortensje?",
    answer:
      "Hortensje ogrodowe: kwiecień, maj i opcjonalnie lipiec. Hortensje przesuwające: głównie maj. Używaj nawozu do roślin kwasolubnych dla odmian niebieskich.",
  },
];

export function getCalendarMonth(slug: string): CalendarMonth | undefined {
  return CALENDAR_MONTHS.find((m) => m.slug === slug);
}

export function getAllCalendarMonthSlugs(): string[] {
  return CALENDAR_MONTHS.map((m) => m.slug);
}

export function getCurrentMonthNumber(): number {
  return new Date().getMonth() + 1;
}

export function getTasksForMonth(monthNumber: number): CalendarTask[] {
  const month = CALENDAR_MONTHS.find((m) => m.number === monthNumber);
  return month?.tasks ?? [];
}

export function getAllTasksGroupedByMonth(): CalendarMonth[] {
  return CALENDAR_MONTHS;
}
