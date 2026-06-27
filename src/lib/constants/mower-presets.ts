import type { ObstacleLevel, SlopeLevel } from "@/lib/calculators/mower";

export interface MowerPreset {
  slug: string;
  shortLabel: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  defaults: Partial<{
    area: number;
    slope: SlopeLevel;
    obstacles: ObstacleLevel;
  }>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

function areaPreset(
  slug: string,
  area: number,
  shortLabel: string,
  titleExtra: string,
  intro: string,
  faq: MowerPreset["faq"],
  sections: MowerPreset["sections"]
): MowerPreset {
  return {
    slug,
    shortLabel,
    title: `Robot koszący na ${area} m² — ${titleExtra}`,
    description: `Jaki robot koszący na trawnik ${area} m²? Porównaj modele, koszty roczne i opłacalność. Kalkulator dobiera roboty Husqvarna, Worx, STIHL i inne do Twojej powierzchni.`,
    keywords: [
      `robot koszący ${area} m2`,
      `robot koszący na ${area} metrów`,
      "jaki robot koszący",
      "kalkulator robota koszącego",
      "opłacalność robota koszącego",
    ],
    defaults: { area },
    intro,
    faq,
    sections,
  };
}

export const MOWER_PRESETS: MowerPreset[] = [
  areaPreset(
    "trawnik-300m2",
    300,
    "300 m²",
    "mały ogród",
    "Trawnik 300 m² to typowy przedni ogród w segmencie szeregowca lub bloku z ogródkiem. Wystarczy kompaktowy robot z koszem do 400 m² — cena od ok. 2500 PLN. Koszenie ręczne zajmuje ok. 20 minut tygodniowo, robot robi to sam w tle.",
    [
      {
        question: "Jaki robot na trawnik 300 m²?",
        answer:
          "Sprawdzi się Worx Landroid M500, Husqvarna Automower 105, Gardena SILENO minimo lub Robomow RX20. Szukaj modelu z limitem min. 400 m² dla rezerwy.",
      },
      {
        question: "Ile kosztuje robot na mały trawnik?",
        answer: "Od ok. 2500 PLN za nowy model. Roczny koszt prądu: ok. 80–120 PLN.",
      },
    ],
    [
      {
        heading: "Mały trawnik a częstotliwość koszenia",
        content:
          "Na 300 m² robot kończy cykl w 30–60 minut i może kosić codziennie. Częste koszenie = gęstszy, zdrowszy trawnik bez worków na trawę.",
      },
    ]
  ),
  areaPreset(
    "trawnik-500m2",
    500,
    "500 m²",
    "typowy dom jednorodzinny",
    "500 m² to najpopularniejszy rozmiar trawniku w polskich domach jednorodzinnych — ok. 25×20 m lub L-kształtny ogród. Tu zaczyna się opłacalność robota vs firma ogrodnicza (7500+ PLN/rok). Kalkulator poniżej porównuje koszty.",
    [
      {
        question: "Ile kosztuje robot koszący na 500 m²?",
        answer:
          "Robot 500–600 m²: 3200–5500 PLN. Husqvarna 105/305, Worx M500, STIHL iMow 422 to popularne wybory. Zwrot vs firma: 1–2 lata.",
      },
      {
        question: "Czy robot 500 m² wystarczy na trawnik 480 m²?",
        answer:
          "Tak, z 20 m² zapasu. Unikaj modelu dokładnie na granicy m² — po deszczu trawa rośnie szybciej i robot potrzebuje więcej cykli.",
      },
    ],
    [
      {
        heading: "500 m² — granica opłacalności",
        content:
          "Przy koszeniu własnym kosiarką oszczędzasz ok. 30 h/rok. Przy firmie zewnętrznej — 7500–10 000 PLN rocznie. Robot za 4500 PLN zwraca się szybko w obu scenariuszach.",
      },
      {
        heading: "Montaż przewodu na 500 m²",
        content:
          "Potrzebujesz ok. 80–120 m przewodu granicznego (zależy od kształtu). Koszt przewodu: 300–500 PLN + 2–4 h pracy. Wielu właścicieli robi to samodzielnie w weekend.",
      },
    ]
  ),
  areaPreset(
    "trawnik-1000m2",
    1000,
    "1000 m²",
    "duży ogród",
    "Trawnik 1000 m² wymaga robota z większą baterią i szerokością koszenia (22–28 cm). Modele do 1000–1500 m² kosztują 5500–9000 PLN. Na takiej powierzchni robot oszczędza 50+ godzin rocznie.",
    [
      {
        question: "Jaki robot na 1000 m²?",
        answer:
          "Husqvarna Automower 310/315X, STIHL iMow 5, Worx Landroid L2000, Gardena SILENO city 1000. Szukaj min. 1200 m² w specyfikacji.",
      },
      {
        question: "Czy jeden robot wystarczy na 1000 m²?",
        answer:
          "Tak, jeden dobrze dobrany model. Przy skomplikowanym kształcie podziel ogród na strefy w aplikacji — robot kosi każdą sekwencyjnie.",
      },
    ],
    [
      {
        heading: "Duży trawnik a czas ładowania",
        content:
          "Na 1000 m² robot może wracać do stacji 3–5 razy dziennie w szczycie sezonu. Ważna jest moc stacji ładowania i pojemność baterii (min. 5 Ah w klasie premium).",
      },
    ]
  ),
  areaPreset(
    "trawnik-1500m2",
    1500,
    "1500 m²",
    "bardzo duży ogród",
    "1500 m² to trawnik w dużym domu lub na wsi — często nieregularny kształt z drzewami. Potrzebujesz modelu 1500–2000 m² z GPS lub wielostrefowego programowania. Budżet: 7000–11 000 PLN.",
    [
      {
        question: "Robot koszący 1500 m² — jaka cena?",
        answer: "Od ok. 7000 PLN (Husqvarna 405X, Ambrogio L60) do 12 000 PLN z GPS i 4G.",
      },
    ],
    [
      {
        heading: "Strefy na dużym trawniku",
        content:
          "Podziel ogród na 2–4 strefy w aplikacji. Robot może kosić front i tył w różnych godzinach — np. tył w nocy, front w dzień, gdy jesteś w ogrodzie.",
      },
    ]
  ),
  areaPreset(
    "trawnik-2000m2",
    2000,
    "2000 m²",
    "ogrodzenie i park",
    "2000 m² przekracza możliwości tanich robotów. Wchodzą modele premium: Husqvarna 430X/450X, Ambrogio L250i, STIHL iMow 7. Rozważ GPS zamiast kilometrów przewodu.",
    [
      {
        question: "Czy na 2000 m² potrzebuję GPS?",
        answer:
          "Nie musisz, ale GPS ułatwia zarządzanie granicami i zmianę układu ogrodu bez przekopywania przewodu. Przy 2000 m² przewód to 150–250 m obwodu.",
      },
    ],
    [
      {
        heading: "Dwa roboty vs jeden duży",
        content:
          "Czasem tańsze są dwa roboty po 1000 m² (np. front + tył) niż jeden flagowy za 15 000 PLN. Każdy ma własną stację i strefę — prostsze serwisowanie.",
      },
    ]
  ),
  areaPreset(
    "trawnik-3000m2",
    3000,
    "3000 m²",
    "mała posiadłość",
    "3000 m² to już mała posiadłość — Ambrogio L250i Elite, Husqvarna 520/550 EPOS lub profesjonalne modele. Budżet 12 000–20 000 PLN. Warto rozważyć instalację przez autoryzowany serwis.",
    [
      {
        question: "Jaki robot na 3000 m² trawnika?",
        answer:
          "Ambrogio L250i Elite (3200 m²), Husqvarna Automower 550 EPOS (5000 m² z GPS), profesjonalne modele Robomow RS. Kluczowa jest wydajność baterii i wsparcie serwisowe.",
      },
    ],
    []
  ),
  {
    slug: "maly-ogrod",
    shortLabel: "Mały ogród",
    title: "Robot koszący do małego ogrodu — do 400 m²",
    description:
      "Najlepsze roboty koszące do małego ogrodu i ogródka szeregowego. Porównanie cen, hałasu i kosztów vs kosiarka ręczna.",
    keywords: ["robot koszący mały ogród", "robot do ogródka", "kompaktowy robot koszący"],
    defaults: { area: 250, slope: "plaski", obstacles: "male" },
    intro:
      "Mały ogród (150–400 m²) to idealny scenariusz dla robota koszącego: krótkie trasy, szybkie ładowanie, niska cena wejścia. Kosiarka spalinowa w szopie często kosztuje więcej w utrzymaniu niż robot rocznie.",
    faq: [
      {
        question: "Czy robot ma sens na 150 m²?",
        answer:
          "Tak, jeśli cenisz czas. Robot za 2500 PLN vs 15 min koszenia co tydzień = ok. 12 h/rok. Na bardzo małej powierzchni rozważ też kosiarkę akumulatorową.",
      },
    ],
    sections: [
      {
        heading: "Kompaktowe modele",
        content:
          "Worx M500, Gardena SILENO minimo, Husqvarna 105 — waga 7–9 kg, łatwy transport do garażu na zimę. Stacja ładowania mieści się na tarasie lub przy ścianie garażu.",
      },
    ],
  },
  {
    slug: "stromy-teren",
    shortLabel: "Stromy teren",
    title: "Robot koszący na stromy teren — nachylenie i trakcja",
    description:
      "Jaki robot koszący na stromy stoki? Modele do 35–45% nachylenia, koła antypoślizgowe i dobór do Twojego trawnika.",
    keywords: [
      "robot koszący stromy teren",
      "robot koszący nachylenie",
      "robot na skarpę",
      "kosiarka robot na wzniesienie",
    ],
    defaults: { area: 600, slope: "stromy", obstacles: "male" },
    intro:
      "Nachylenie powyżej 25% eliminuje tanie roboty. Sprawdź w specyfikacji maksymalny slope — Husqvarna 435X AWD (70%), STIHL iMow 7 (45%), modele AWD z napędem na wszystkie koła. Kalkulator uwzględnia nachylenie przy doborze modelu.",
    faq: [
      {
        question: "Ile % nachylenia udźwignie robot?",
        answer:
          "Podstawowe: 15–20%. Średnia klasa: 25–35%. Premium AWD: do 45–70% w zależności od modelu. Mierz nachylenie aplikacją w telefonie.",
      },
      {
        question: "Czy robot spadnie ze skarpy?",
        answer:
          "Przewód graniczny na krawędzi skarpy + czujniki nachylenia zatrzymują robota. Nie ustawiaj stacji ładowania na stromym fragmencie.",
      },
    ],
    sections: [
      {
        heading: "AWD vs standardowy napęd",
        content:
          "Roboty AWD (All Wheel Drive) maju większą przyczepność na wilgotnej trawie i stokach. Na płaskim 500 m² nie potrzebujesz AWD — przepłacisz.",
      },
    ],
  },
  {
    slug: "duzo-przeszkod",
    shortLabel: "Przeszkody",
    title: "Robot koszący z wykrywaniem przeszkód — drzewa, rabaty, piaskownica",
    description:
      "Jak robot koszący radzi sobie z przeszkodami? Czujniki, strefy wykluczone i wąskie przejścia w ogrodzie.",
    keywords: [
      "robot koszący przeszkody",
      "robot koszący drzewa",
      "strefy wykluczone robot",
    ],
    defaults: { area: 700, slope: "lekki", obstacles: "duzo" },
    intro:
      "Ogród z wieloma drzewami, rabatami i ścieżkami wymaga precyzyjnego przewodu granicznego lub mapy GPS. Wąskie przejścia (min. 60–80 cm) muszą łączyć strefy. Roboty z „obstacle detection” (Husqvarna, STIHL) zwalniają przy zidentyfikowanych obiektach.",
    faq: [
      {
        question: "Czy robot omija drzewo?",
        answer:
          "Tak — przewód wokół pnia wyznacza strefę wykluczoną. Robot jedzie wzdłuż obwodu. Średnica strefy = średnica korony + 10 cm.",
      },
    ],
    sections: [
      {
        heading: "Labirynt ogrodowy",
        content:
          "Przy wielu wyspach trawy robot traci czas na dojazdy między strefami. Czasem lepiej połączyć wyspy w jedną strefę z przewodem wokół grupy drzew.",
      },
    ],
  },
  {
    slug: "oplacalnosc",
    shortLabel: "Opłacalność",
    title: "Opłacalność robota koszącego — kalkulator zwrotu inwestycji",
    description:
      "Kiedy robot koszący się zwraca? Porównanie kosztów: robot vs kosiarka vs firma ogrodnicza. Kalkulator zwrotu w latach.",
    keywords: [
      "opłacalność robota koszącego",
      "czy robot koszący się opłaca",
      "zwrot z inwestycji robot koszący",
    ],
    defaults: { area: 500, slope: "plaski", obstacles: "brak" },
    intro:
      "Opłacalność zależy od alternatywy: firma ogrodnicza (najszybszy zwrot), własna kosiarka spalinowa (wolniejszy, ale oszczędność czasu) lub kosiarka akumulatorowa. Wpisz powierzchnię — kalkulator pokaże koszty roczne i lata zwrotu.",
    faq: [
      {
        question: "Po ilu latach robot się zwraca?",
        answer:
          "Vs firma (7500 PLN/rok na 500 m²): 1–2 lata. Vs własna kosiarka spalinowa (400 PLN/rok + czas): 3–5 lat. Vs kosiarka akumulatorowa: 4–6 lat.",
      },
      {
        question: "Co wchodzi w koszt roczny robota?",
        answer: "Prąd 80–200 PLN, ostrza 30–50 PLN/rok amortyzacja, serwis okresowy 0–200 PLN.",
      },
    ],
    sections: [
      {
        heading: "Ukryte oszczędności",
        content:
          "Mulczowanie = mniej nawozu. Codzienne koszenie = mniej chwastów. Brak spalin = brak wymiany oleju, filtrów, przechowywania benzyny. Wartość czasu: 30–50 h × stawka godzinowa.",
      },
    ],
  },
  {
    slug: "robot-vs-reczne",
    shortLabel: "Vs ręczne",
    title: "Robot koszący vs koszenie ręczne — porównanie",
    description:
      "Robot koszący czy kosiarka? Porównanie czasu, kosztów, jakości trawnika i wygody. Kalkulator dla Twojej powierzchni.",
    keywords: [
      "robot koszący vs kosiarka",
      "robot czy kosiarka spalinowa",
      "koszenie ręczne czy robot",
    ],
    defaults: { area: 500 },
    intro:
      "Koszenie ręczne daje kontrolę i niższy koszt początkowy, ale zabiera 25–40 godzin rocznie na 500 m². Robot kosztuje więcej na start, ale pracuje sam — także gdy jesteś na urlopie.",
    faq: [
      {
        question: "Czy robot daje lepszy trawnik?",
        answer:
          "Częste koszenie robota produkuje gęstszy, równomiernie zielony trawnik. Kosiarka raz w tygodnię przy upałach = żółte końcówki. Robot mulczuje — nie trzeba zbierać trawy.",
      },
    ],
    sections: [
      {
        heading: "Kiedy zostać przy kosiarce?",
        content:
          "Bardzo mały trawnik (<100 m²), brak prądu przy ogrodzie, ekstremalne nachylenia bez budżetu na AWD — wtedy kosiarka akumulatorowa może wystarczyć.",
      },
    ],
  },
  {
    slug: "robot-vs-firma",
    shortLabel: "Vs firma",
    title: "Robot koszący vs firma ogrodnicza — co taniej?",
    description:
      "Porównaj koszt robota koszącego z usługą koszenia trawnika. Kalkulator opłacalności na 300–3000 m².",
    keywords: [
      "robot koszący vs firma",
      "koszenie trawnika cena",
      "firma ogrodnicza koszt",
    ],
    defaults: { area: 800 },
    intro:
      "Firma ogrodnicza bierze 15–25 PLN/m² za sezon (kwiecień–październik). Przy 800 m² to 12 000–20 000 PLN rocznie. Robot za 6000 PLN + 200 PLN/rok zwraca się w pierwszym lub drugim sezonie.",
    faq: [
      {
        question: "Ile kosztuje koszenie trawnika przez firmę?",
        answer:
          "15–25 PLN/m²/sezon w miastach, taniej na wsi (10–18 PLN). 500 m² = 7500–12 500 PLN rocznie. Koszenie co 1–2 tygodnie w sezonie.",
      },
    ],
    sections: [],
  },
  {
    slug: "husqvarna-automower",
    shortLabel: "Husqvarna",
    title: "Robot koszący Husqvarna Automower — dobór modelu",
    description:
      "Który Husqvarna Automower wybrać? Porównanie 105, 305, 310, 405X, 435X i EPOS GPS. Kalkulator powierzchni.",
    keywords: [
      "husqvarna automower",
      "robot koszący husqvarna",
      "automower jaki model",
      "husqvarna robot koszący cena",
    ],
    defaults: { area: 600 },
    intro:
      "Husqvarna Automower to najpopularniejsza marka robotów koszących w Europie. Modele od 105 (600 m², ok. 4500 PLN) po 550 EPOS (5000 m², GPS, 15 000+ PLN). Cicha praca, dobra sieć serwisowa w Polsce.",
    faq: [
      {
        question: "Który Automower na 500 m²?",
        answer: "Automower 105 lub 305 — wystarczające. 310 daje zapas na 1000 m² jeśli planujesz powiększenie trawnika.",
      },
      {
        question: "Automower a aplikacja",
        answer:
          "Modele z Connect (315X, 405X, 435X) mają aplikację, GPS i śledzenie. Podstawowe 105/305 — panel na robocie.",
      },
    ],
    sections: [
      {
        heading: "Automower EPOS — bez przewodu",
        content:
          "System EPOS używa referencyjnej stacji GPS zamiast przewodu granicznego. Idealny przy zmianie układu ogrodu. Wyższy koszt, wymaga otwartego nieba dla sygnału.",
      },
    ],
  },
  {
    slug: "worx-landroid",
    shortLabel: "Worx",
    title: "Robot koszący Worx Landroid — modele i ceny",
    description:
      "Worx Landroid M500, L2000, Vision — porównanie robotów Worx do trawnika. Kalkulator dopasowania.",
    keywords: ["worx landroid", "robot koszący worx", "landroid m500", "worx robot cena"],
    defaults: { area: 500 },
    intro:
      "Worx Landroid to korzystny stosunek ceny do powierzchni. M500 (500 m², WiFi, ok. 3200 PLN), L2000 (2000 m²), Vision z kamerą AI omijającą przeszkody bez przewodu w niektórych scenariuszach.",
    faq: [
      {
        question: "Czy Worx Landroid ma WiFi?",
        answer: "Tak — większość modeli Landroid łączy się z aplikacją Worx. Sterowanie harmonogramem i statusem baterii z telefonu.",
      },
    ],
    sections: [],
  },
  {
    slug: "stihl-imow",
    shortLabel: "STIHL",
    title: "Robot koszący STIHL iMow — dobór i serwis",
    description:
      "STIHL iMow 422, 5, 7 — niemieckie roboty koszące. Nachylenie, aplikacja, serwis STIHL w Polsce.",
    keywords: ["stihl imow", "robot koszący stihl", "imow 422", "stihl robot cena"],
    defaults: { area: 800, slope: "sredni" },
    intro:
      "STIHL iMow znany z jakości cięcia i dobrej pracy na pochyłych trawnikach. iMow 422 (800 m²), iMow 5 (2000 m²), iMow 7 (4000 m²). Aplikacja STIHL connected, sieć dealerska w całej Polsce.",
    faq: [
      {
        question: "STIHL iMow a nachylenie",
        answer: "iMow 422: do 24%, iMow 5: do 45%. Dobre wybory na pochyłe ogrody w górach i na skarpach.",
      },
    ],
    sections: [],
  },
  {
    slug: "montaz-przewod",
    shortLabel: "Montaż",
    title: "Montaż robota koszącego — przewód graniczny krok po kroku",
    description:
      "Jak ułożyć przewód graniczny robota koszącego? Instrukcja montaťu stacji, długość przewodu i koszty DIY.",
    keywords: [
      "montaż robota koszącego",
      "przewód graniczny robot",
      "jak ułożyć przewód robot koszący",
      "instalacja automower",
    ],
    defaults: { area: 500, obstacles: "srednie" },
    intro:
      "Montaż robota to głównie ułożenie przewodu granicznego i stacji ładowania. Na 500 m² obwód to ok. 90–110 m przewodu. Możesz zrobić to sam (szpatułka do trawy, 4–6 h) lub zlecić instalatorowi (800–2000 PLN).",
    faq: [
      {
        question: "Ile kosztuje przewód graniczny?",
        answer: "Ok. 3–5 PLN/m — na 100 m to 300–500 PLN. Zestaw startowy producenta często ma 150–200 m w pudełku.",
      },
      {
        question: "Przewód na czy pod trawą?",
        answer:
          "Na trawie (kołki) — szybko, na sezon testowy. Pod trawą (szczelina 3–5 cm) — trwale, estetycznie. Po 2–4 tygodniach trawa rośnie przez szczelinę.",
      },
    ],
    sections: [
      {
        heading: "Stacja ładowania",
        content:
          "Płaskie miejsce, kabel 230 V, min. 3 m trawnika przed stacją w linii prostej. Unikaj niskich miejsc gromadzącej się wody.",
      },
    ],
  },
  {
    slug: "gps-bez-przewodu",
    shortLabel: "GPS",
    title: "Robot koszący GPS bez przewodu — EPOS, Vision, RTK",
    description:
      "Roboty koszące z GPS i bez przewodu granicznego. Husqvarna EPOS, Worx Vision, Ambrogio. Zalety i wady.",
    keywords: [
      "robot koszący gps",
      "robot bez przewodu",
      "husqvarna epos",
      "worx vision",
    ],
    defaults: { area: 1000, slope: "lekki" },
    intro:
      "GPS eliminuje układanie przewodu — robot uczy się granic przez aplikację lub stację referencyjną. Husqvarna EPOS, Worx Landroid Vision, niektóre Ambrogio. Wyższa cena, zależność od sygnału satelitarnego.",
    faq: [
      {
        question: "Czy GPS działa pod drzewami?",
        answer:
          "Gorszy sygnał w gęstym zacienieniu — producent może zalecać przewód w części ogrodu. EPOS wymaga widocznego nieba dla anteny referencyjnej.",
      },
    ],
    sections: [],
  },
  {
    slug: "zima-konserwacja",
    shortLabel: "Zima",
    title: "Robot koszący zimą — przechowywanie i konserwacja",
    description:
      "Jak przechowywać robota koszącego zimą? Ładowanie akumulatora, ostrza, serwis przed sezonem.",
    keywords: [
      "robot koszący zima",
      "przechowywanie robota koszącego",
      "konserwacja automower",
    ],
    defaults: { area: 500 },
    intro:
      "Od listopada do marca robot odpoczywa. Wyczyść, naładuj do 80%, przechowuj w 5–25°C. Wymień ostrza wiosną (ok. 50–150 PLN). Sprawdź przewód po mrozach — zimą może unieść się z gleby.",
    faq: [
      {
        question: "Czy zostawić robota na zimę na zewnątrz?",
        answer:
          "Nie — mróz i wilgoć uszkadzają elektronikę i skracają życie baterii. Stacja też do garażu lub zadaszenia.",
      },
    ],
    sections: [],
  },
  {
    slug: "cichy-robot",
    shortLabel: "Cichy",
    title: "Najcichszy robot koszący — hałas w dB i sąsiedzi",
    description:
      "Który robot koszący jest najcichszy? Porównanie hałasu 58–65 dB. Koszenie w nocy a regulacje gminne.",
    keywords: [
      "cichy robot koszący",
      "robot koszący hałas",
      "robot koszący decybel",
      "automower cichy",
    ],
    defaults: { area: 500 },
    intro:
      "Roboty koszące są cichsze niż rozmowa (60 dB) i dużo cichsze niż kosiarka spalinowa (90+ dB). Husqvarna Automower i Gardena SILENO life: 58–62 dB. Można kosić w nocy, ale sprawdź lokalne przepisy o ciszy nocnej.",
    faq: [
      {
        question: "Ile dB ma robot koszący?",
        answer: "Typowo 58–65 dB podczas pracy. Dla porównania: odkurzacz 70 dB, kosiarka spalinowa 95 dB.",
      },
    ],
    sections: [],
  },
  {
    slug: "aplikacja-wifi",
    shortLabel: "Aplikacja",
    title: "Robot koszący z aplikacją WiFi — sterowanie z telefonu",
    description:
      "Roboty koszące z WiFi i aplikacją mobilną. Harmonogram, status baterii, geofencing i powiadomienia.",
    keywords: [
      "robot koszący wifi",
      "robot koszący aplikacja",
      "sterowanie robotem z telefonu",
    ],
    defaults: { area: 600 },
    intro:
      "Aplikacja mobilna to standard w średniej i wyższej półce: harmonogram koszenia, wysokość cięcia, mapa trasy, alerty (uniesiony, utknięty, deszcz). Husqvarna Automower Connect, STIHL connected, Worx Landroid, Gardena smart.",
    faq: [
      {
        question: "Czy robot działa bez WiFi?",
        answer:
          "Tak — po skonfigurowaniu harmonogramu robot pracuje autonomicznie. WiFi daje zdalny podgląd i zmianę ustawień z urlopu.",
      },
    ],
    sections: [],
  },
  {
    slug: "gardena-sileno",
    shortLabel: "Gardena",
    title: "Robot koszący Gardena SILENO — modele life i city",
    description:
      "Gardena SILENO minimo, life, city — proste roboty koszące z serwisem Gardena w Polsce.",
    keywords: ["gardena sileno", "robot koszący gardena", "sileno life", "gardena robot"],
    defaults: { area: 400 },
    intro:
      "Gardena SILENO (Grupa Husqvarna) — prosta obsługa, ciche modele life, aplikacja smart w wyższych wersjach. SILENO minimo do 500 m², city do 1000 m². Dobry wybór dla początkujących.",
    faq: [
      {
        question: "Gardena czy Husqvarna — co wybrać?",
        answer:
          "Ta sama grupa — podobna technologia. Husqvarna ma szerszy wybór premium i GPS EPOS. Gardena — prostsze modele w niższej cenie.",
      },
    ],
    sections: [],
  },
  {
    slug: "harmonogram-koszenia",
    shortLabel: "Harmonogram",
    title: "Harmonogram koszenia robota — jak często kosić trawnik?",
    description:
      "Optymalny harmonogram robota koszącego: codziennie czy co drugi dzień? Wysokość cięcia i sezon.",
    keywords: [
      "harmonogram robota koszącego",
      "jak często kosi robot",
      "wysokość koszenia robot",
    ],
    defaults: { area: 500 },
    intro:
      "Robot najlepiej pracuje codziennie lub co 1–2 dni — ścina małe fragmenty, trawa nie żółknie. W maju–czerwcu (szybki wzrost) zwiększ czas pracy. W sierpniu przy suszy — obniż częstotliwość. Wysokość: 3–4 cm latem, 4–5 cm przy suszy.",
    faq: [
      {
        question: "Czy robot może kosić codziennie?",
        answer:
          "Tak — to zalecany tryb. Krótkie cięcie = zdrowszy trawnik. Robot sam zarządza baterią i wraca do stacji.",
      },
    ],
    sections: [],
  },
];

export function getMowerPreset(slug: string): MowerPreset | undefined {
  return MOWER_PRESETS.find((p) => p.slug === slug);
}

export function getAllMowerPresetSlugs(): string[] {
  return MOWER_PRESETS.map((p) => p.slug);
}

export const MOWER_PRESET_GROUPS = [
  {
    title: "Według powierzchni",
    slugs: [
      "trawnik-300m2",
      "trawnik-500m2",
      "trawnik-1000m2",
      "trawnik-1500m2",
      "trawnik-2000m2",
      "trawnik-3000m2",
    ],
  },
  {
    title: "Porównania i koszty",
    slugs: ["oplacalnosc", "robot-vs-reczne", "robot-vs-firma"],
  },
  {
    title: "Marki",
    slugs: [
      "husqvarna-automower",
      "worx-landroid",
      "stihl-imow",
      "gardena-sileno",
    ],
  },
  {
    title: "Montaż i użytkowanie",
    slugs: [
      "montaz-przewod",
      "gps-bez-przewodu",
      "zima-konserwacja",
      "cichy-robot",
      "aplikacja-wifi",
      "harmonogram-koszenia",
    ],
  },
  {
    title: "Typ ogrodu",
    slugs: ["maly-ogrod", "stromy-teren", "duzo-przeszkod"],
  },
] as const;
