import type {
  PlantType,
  SoilType,
  SprinklerType,
  SunExposure,
  WindExposure,
  MulchType,
} from "@/lib/calculators/irrigation";

export interface IrrigationPreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  /** Domyślne miasto w kalkulatorze (API pogodowe) */
  defaultLocation?: string;
  /** Strefa mrozoodporności USDA dla regionu */
  hardinessZone?: string;
  /** Orientacyjne roczne opady w regionie */
  annualPrecipitation?: string;
  defaults: Partial<{
    plants: PlantType;
    soil: SoilType;
    sun: SunExposure;
    sprinkler: SprinklerType;
    wind: WindExposure;
    mulch: MulchType;
    area: number;
  }>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

export const IRRIGATION_PRESETS: IrrigationPreset[] = [
  {
    slug: "trawnik",
    title: "Kalkulator nawadniania trawnika",
    description:
      "Ile wody potrzebuje trawnik? Oblicz litry tygodniowo, mm opadu, czas podlewania i harmonogram dla trawnika na każdej glebie.",
    keywords: [
      "nawadnianie trawnika",
      "ile wody na trawnik",
      "podlewanie trawnika kalkulator",
      "ile razy podlewać trawnik",
    ],
    defaults: { plants: "trawnik", area: 100 },
    intro:
      "Trawnik zużywa najwięcej wody w ogrodzie — nawet 25–35 litrów na m² tygodniowo w lipcu. Ten kalkulator jest ustawiony pod trawnik: podajesz powierzchnię, glebę i nasłonecznienie, a my liczymy dokładne zapotrzebowanie.",
    faq: [
      {
        question: "Ile razy w tygodniu podlewać trawnik?",
        answer:
          "Zazwyczaj 2–3 razy, głęboko (20–30 mm naraz). Lepiej rzadziej i obficiej niż codziennie po trochu — korzenie wtedy schodzą głębiej i trawnik jest bardziej odporny na suszę.",
      },
      {
        question: "Ile mm wody potrzebuje trawnik tygodniowo?",
        answer:
          "W sezonie wegetacyjnym trawnik potrzebuje ok. 25–30 mm tygodniowo. W upały do 35 mm. 1 mm na 1 m² to 1 litr wody.",
      },
      {
        question: "O której godzinie podlewać trawnik?",
        answer:
          "Najlepiej między 5:00 a 8:00 rano. Unikaj podlewania wieczorem na mokrym trawniku — sprzyja chorobom grzybowym.",
      },
    ],
    sections: [
      {
        heading: "Trawnik a typ gleby",
        content:
          "Na piasku woda ucieka szybko — trawnik na piaszczystej glebie wymaga częstszego, ale krótszego podlewania. Na glinie ryzyko przelewania jest większe; podlewaj rzadziej i kontroluj wilgotność sondą lub testem palca.",
      },
      {
        heading: "Kiedy trawnik jest przesuszony?",
        content:
          "Trawa zmienia kolor na sinozielony, odciski butów zostają na dłużej niż kilka sekund, a korzenie na głębokości 10 cm są suche. Wtedy zwiększ dawkę, nie częstotliwość.",
      },
    ],
  },
  {
    slug: "warzywnik",
    title: "Kalkulator nawadniania warzywnika",
    description:
      "Policz zapotrzebowanie na wodę w warzywniku. Pomidory, ogórki i sałata — różne potrzeby, jeden precyzyjny kalkulator.",
    keywords: [
      "podlewanie warzywnika",
      "nawadnianie warzyw",
      "ile wody na warzywnik",
      "kalkulator warzywnik",
    ],
    defaults: { plants: "warzywa", sprinkler: "kroplujacy", area: 20 },
    intro:
      "Warzywa potrzebują więcej wody niż trawnik — szczególnie w fazie owocowania. Nawadnianie kroplujące oszczędza do 50% wody i chroni liście przed chorobami.",
    faq: [
      {
        question: "Ile wody potrzebuje warzywnik?",
        answer:
          "Średnio 35 litrów na m² tygodniowo w sezonie. Pomidory i ogórki w upały mogą potrzebować nawet 45–50 l/m².",
      },
      {
        question: "Czy warzywa podlewać codziennie?",
        answer:
          "Nie zawsze. Sałata i szpinak lubią stałą wilgoć; pomidory lepiej podlewać obficie co 2–3 dni. Kroplówka pod korzeń to najlepsza metoda.",
      },
    ],
    sections: [
      {
        heading: "Kroplówka w warzywniku",
        content:
          "Nawadnianie kroplujące dostarcza wodę prosto do korzeni, bez moczenia liści. Przy warzywach redukuje choroby plamiste i oszczędza wodę o 40–60% w porównaniu ze zraszaczem.",
      },
    ],
  },
  {
    slug: "kwiaty",
    title: "Kalkulator podlewania kwiatów",
    description:
      "Oblicz ile wody potrzebują rabaty, donice i kwiaty w ogrodzie. Harmonogram i koszt podlewania.",
    keywords: [
      "podlewanie kwiatów",
      "ile wody na rabatę",
      "nawadnianie kwiatów kalkulator",
    ],
    defaults: { plants: "kwiaty", area: 30 },
    intro:
      "Rabaty kwiatowe i byliny mają umiarkowane zapotrzebowanie na wodę, ale w donicach i na pełnym słońcu potrzeby rosną szybko.",
    faq: [
      {
        question: "Ile wody potrzebują kwiaty w rabacie?",
        answer: "Około 30 litrów na m² tygodniowo w sezonie. Byliny ustanowione po 2–3 latach potrzebują mniej.",
      },
    ],
    sections: [],
  },
  {
    slug: "krzewy",
    title: "Kalkulator nawadniania krzewów",
    description:
      "Ile wody potrzebują krzewy ozdobne i żywopłoty? Oblicz podlewanie według powierzchni i gleby.",
    keywords: [
      "podlewanie krzewów",
      "nawadnianie żywopłotu woda",
      "ile wody na krzewy",
    ],
    defaults: { plants: "krzewy", area: 50 },
    intro:
      "Młode krzewy i świeżo posadzone sadzonki wymagają regularnego podlewania przez pierwsze 2 lata. Starsze rośliny są bardziej samowystarczalne.",
    faq: [
      {
        question: "Jak długo podlewać nowo posadzone krzewy?",
        answer:
          "Przez pierwszy rok co 2–3 dni w sezonie, w upały codziennie. Drugi rok — 1–2 razy w tygodniu. Potem tylko w suszy.",
      },
    ],
    sections: [],
  },
  {
    slug: "gleba-piaszczysta",
    title: "Nawadnianie gleby piaszczystej — kalkulator",
    description:
      "Piasek szybko wysycha. Dowiedz się, ile wody i jak często podlewać ogród na glebie piaszczystej.",
    keywords: [
      "nawadnianie gleby piaszczystej",
      "podlewanie piasku",
      "woda na glebie piaskowej",
    ],
    defaults: { soil: "piasek" },
    intro:
      "Gleba piaszczysta ma niską pojemność wilgotnościową — woda spłyka głęboko lub wyparowuje z powierzchni. Kalkulator zwiększa zapotrzebowanie o 40% i sugeruje częstsze, krótsze podlewania.",
    faq: [
      {
        question: "Jak poprawić retencję wody w piasku?",
        answer:
          "Dodaj kompost lub próchnicę (3–5 cm rocznie), zastosuj mulcz i rozważ nawadnianie kroplujące — dostarcza wodę wolniej, ale skuteczniej.",
      },
    ],
    sections: [],
  },
  {
    slug: "gleba-gliniasta",
    title: "Nawadnianie gleby gliniastej — kalkulator",
    description:
      "Glina trzyma wodę, ale łatwo ją przelawać. Oblicz bezpieczne dawki podlewania na glebie gliniastej.",
    keywords: [
      "nawadnianie gleby gliniastej",
      "podlewanie gliny",
      "woda na glinie",
    ],
    defaults: { soil: "glina" },
    intro:
      "Glina zatrzymuje wodę na powierzchni i w górnych warstwach. Przelewanie prowadzi do zgnilizny korzeni i chorób grzybowych — kalkulator redukuje dawkę o 20%.",
    faq: [
      {
        question: "Jak podlewać gliniastą glebę?",
        answer:
          "Rzadziej, ale dłużej — pozwól wodzie wsiąknąć powoli. Unikaj podlewania, gdy gleba jest już wilgotna w głębokości 5 cm.",
      },
    ],
    sections: [],
  },
  {
    slug: "kroplowanie",
    title: "Kalkulator nawadniania kroplującego",
    description:
      "Ile czasu włączyć kroplówkę? Oblicz przepływ, litry i harmonogram dla nawadniania kroplującego.",
    keywords: [
      "nawadnianie kroplujące kalkulator",
      "kroplówka ogród",
      "ile czasu kroplówka",
    ],
    defaults: { sprinkler: "kroplujacy" },
    intro:
      "Nawadnianie kroplujące ma najwyższą sprawność (ok. 90%) — prawie cała woda trafia do korzeni. Typowy przepływ to 2–4 l/h na linię.",
    faq: [
      {
        question: "Ile litrów na godzinę ma kroplówka?",
        answer:
          "Standardowe linie: 2 l/h (wolne), 4 l/h (średnie), 8 l/h (szybkie). Kalkulator domyślnie przyjmuje 4 l/h na strefę.",
      },
    ],
    sections: [],
  },
  {
    slug: "harmonogram",
    title: "Harmonogram podlewania ogrodu",
    description:
      "Wygeneruj tygodniowy harmonogram nawadniania dopasowany do gleby, pogody i roślin. Darmowy kalkulator online.",
    keywords: [
      "harmonogram podlewania",
      "kiedy podlewać ogród",
      "plan nawadniania ogrodu",
    ],
    defaults: {},
    intro:
      "Harmonogram zależy od gleby, roślin, pory roku i prognozy opadów. Kalkulator uwzględnia wszystkie te czynniki i proponuje konkretne dni oraz godziny.",
    faq: [
      {
        question: "Kiedy najlepiej podlewać ogród?",
        answer:
          "Rano (5:00–8:00) — mniej parowania, liście schną w ciągu dnia. Drugi termin: wieczór (19:00–21:00), ale unikaj na trawniku w wilgotne noce.",
      },
    ],
    sections: [],
  },
  {
    slug: "koszt-wody",
    title: "Kalkulator kosztu podlewania ogrodu",
    description:
      "Ile kosztuje podlewanie ogrodu miesięcznie i rocznie? Oblicz rachunek za wodę według powierzchni i taryfy.",
    keywords: [
      "koszt podlewania ogrodu",
      "ile kosztuje woda na ogród",
      "rachunek za podlewanie",
    ],
    defaults: { area: 200 },
    intro:
      "Woda ogrodowa w Polsce kosztuje średnio 5–8 PLN za m³ (zależy od gminy). Przy 200 m² trawnika rachunek w lipcu może sięgnąć 80–150 PLN miesięcznie.",
    faq: [
      {
        question: "Ile kosztuje podlewanie 100 m² trawnika?",
        answer:
          "Przy zużyciu ok. 2500 l/tydzień i cenie 5,5 PLN/m³ to ok. 55–70 PLN miesięcznie w sezonie letnim.",
      },
    ],
    sections: [],
  },
  {
    slug: "ile-litrow",
    title: "Ile litrów wody na ogród? Kalkulator",
    description:
      "Szybko oblicz ile litrów wody tygodniowo i miesięcznie zużywa Twój ogród. Litry, mm, m³ — wszystko w jednym miejscu.",
    keywords: [
      "ile litrów wody na ogród",
      "zużycie wody w ogrodzie",
      "litry wody na trawnik",
    ],
    defaults: { area: 100 },
    intro:
      "Jedno z najczęstszych pytań ogrodników: ile wody faktycznie potrzebuje mój ogród? Odpowiedź zależy od powierzchni, roślin i pogody — wpisz dane i zobacz wynik w litrach, mm i m³.",
    faq: [
      {
        question: "Ile litrów wody na 100 m² trawnika?",
        answer:
          "W czerwcu–sierpniu ok. 2000–3500 litrów tygodniowo, czyli 20–35 mm opadu. W maju i wrześniu mniej — ok. 1500–2000 l.",
      },
    ],
    sections: [],
  },
  {
    slug: "warszawa",
    title: "Nawadnianie ogrodu w Warszawie",
    h1: "Ile wody potrzebuje ogród w Warszawie?",
    description:
      "Kalkulator nawadniania z danymi pogodowymi dla Warszawy. Roczne opady ~550 mm, strefa 6b — harmonogram podlewania trawnika i rabat w stolicy.",
    keywords: [
      "nawadnianie ogrodu Warszawa",
      "podlewanie trawnika Warszawa",
      "ile wody ogród Warszawa",
    ],
    defaultLocation: "Warszawa",
    hardinessZone: "6b",
    annualPrecipitation: "~550 mm/rok",
    defaults: { area: 200, plants: "trawnik" },
    intro:
      "Warszawa ma umiarkowane opady, ale lato bywa suche — lipcowe podlewanie to często 25–35 l/m² tygodniowo na trawniku. Kalkulator pobiera aktualną pogodę dla Warszawy.",
    faq: [
      {
        question: "Kiedy podlewać trawnik w Warszawie?",
        answer:
          "Rano, 2–3× tygodniowo po 20–30 mm. W upały lipcowe sprawdzaj wilgotność gleby — piasek miejski szybciej wysycha.",
      },
    ],
    sections: [
      {
        heading: "Klimat Warszawy a nawadnianie",
        content:
          "Strefa mrozoodporności 6b, średnioroczne opady ok. 550 mm. Latem deficyt wody wzrasta — deszczówka i mulczowanie realnie obniżają rachunki.",
      },
    ],
  },
  {
    slug: "krakow",
    title: "Nawadnianie ogrodu w Krakowie",
    description:
      "Podlewanie ogrodu w Krakowie — kalkulator z lokalną pogodą, strefa 6b–7a, opady ~700 mm. Harmonogram dla trawnika i rabat.",
    keywords: ["nawadnianie Kraków", "podlewanie ogrodu Kraków", "klimat ogrodu Kraków"],
    defaultLocation: "Kraków",
    hardinessZone: "6b–7a",
    annualPrecipitation: "~700 mm/rok",
    defaults: { area: 150, plants: "trawnik" },
    intro:
      "Kraków jest nieco wilgotniejszy od Warszawy, ale doliny Wisły i Białuchy mogą wychładzać — wiosenne przymrozki wymagają ostrożności przy wczesnym podlewaniu.",
    faq: [
      {
        question: "Czy w Krakowie trzeba często podlewać?",
        answer:
          "W maju i wrześniu często wystarczą opady. Lipiec–sierpień — planuj 2–3 podlewania tygodniowo na słonecznym trawniku.",
      },
    ],
    sections: [],
  },
  {
    slug: "wroclaw",
    title: "Nawadnianie ogrodu we Wrocławiu",
    description:
      "Kalkulator nawadniania dla Wrocławia — pogoda na żywo, strefa 7a, opady ~600 mm. Ile wody na trawnik i rabaty na Dolnym Śląsku.",
    keywords: ["nawadnianie Wrocław", "podlewanie trawnika Wrocław", "ogród Wrocław woda"],
    defaultLocation: "Wrocław",
    hardinessZone: "7a",
    annualPrecipitation: "~600 mm/rok",
    defaults: { area: 180, plants: "trawnik" },
    intro:
      "Wrocław — jedna z cieplejszych metropolii w Polsce (strefa 7a). Sezon wegetacyjny zaczyna się wcześniej, ale letnie upały wymagają regularnego nawadniania.",
    faq: [],
    sections: [],
  },
  {
    slug: "gdansk",
    title: "Nawadnianie ogrodu w Gdańsku",
    description:
      "Podlewanie ogrodu na Wybrzeżu — Gdańsk, wilgotniejsze lato, wiatr od morza. Kalkulator z lokalną pogodą i harmonogramem.",
    keywords: ["nawadnianie Gdańsk", "ogród Gdańsk podlewanie", "klimat nadmorski ogród"],
    defaultLocation: "Gdańsk",
    hardinessZone: "7a",
    annualPrecipitation: "~650 mm/rok",
    defaults: { area: 120, plants: "trawnik", wind: "silny" },
    intro:
      "Klimat nadmorski — więcej wilgoci z mgły, ale silniejszy wiatr zwiększa parowanie. Ustaw wiatr na „silny” dla realniejszych wyników.",
    faq: [],
    sections: [],
  },
  {
    slug: "poznan",
    title: "Nawadnianie ogrodu w Poznaniu",
    description:
      "Ile wody na ogród w Poznaniu? Strefa 6b–7a, kalkulator z pogodą na żywo i harmonogramem podlewania trawnika.",
    keywords: ["nawadnianie Poznań", "podlewanie ogrodu Poznań"],
    defaultLocation: "Poznań",
    hardinessZone: "6b–7a",
    annualPrecipitation: "~580 mm/rok",
    defaults: { area: 200, plants: "trawnik" },
    intro:
      "Wielkopolska bywa sucha latem — Warta i niskie opady w lipcu oznaczają intensywniejsze nawadnianie niż na północy kraju.",
    faq: [],
    sections: [],
  },
  {
    slug: "lodz",
    title: "Nawadnianie ogrodu w Łodzi",
    description:
      "Kalkulator nawadniania dla Łodzi — środkowa Polska, strefa 6b, opady ~550 mm. Harmonogram podlewania na lato.",
    keywords: ["nawadnianie Łódź", "podlewanie trawnika Łódź"],
    defaultLocation: "Łódź",
    hardinessZone: "6b",
    annualPrecipitation: "~550 mm/rok",
    defaults: { area: 150, plants: "trawnik" },
    intro:
      "Łódź — klimat kontynentalny z gorącym latem. Trawniki na gliniastych glebach miejskich wymagają głębokiego, rzadszego podlewania.",
    faq: [],
    sections: [],
  },
];

export function getIrrigationPreset(slug: string): IrrigationPreset | undefined {
  return IRRIGATION_PRESETS.find((p) => p.slug === slug);
}

export function getAllIrrigationPresetSlugs(): string[] {
  return IRRIGATION_PRESETS.map((p) => p.slug);
}
