import { FLOWERING_PLANTS_LIST } from "./flowering-plants";

const FLOWERING_PLANT_COUNT = FLOWERING_PLANTS_LIST.length;

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  icon: string;
  featured?: boolean;
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "kalkulator-nawadniania",
    title: "Kalkulator nawadniania ogrodu",
    shortTitle: "Nawadnianie",
    description:
      "Najdokładniejszy kalkulator nawadniania: litry, mm, harmonogram, pogoda, koszt wody i zbiornik na deszczówkę. Trawnik, warzywnik, kroplówka i więcej.",
    keywords: [
      "nawadnianie ogrodu",
      "kalkulator podlewania",
      "ile wody na ogród",
      "harmonogram nawadniania",
      "kalkulator nawadniania trawnika",
      "ile litrów wody na trawnik",
      "koszt podlewania ogrodu",
    ],
    icon: "💧",
    featured: true,
  },
  {
    slug: "kalkulator-zywoplotu",
    title: "Kalkulator żywopłotu",
    shortTitle: "Żywopłot",
    description:
      "12 gatunków, wykres wzrostu, kosztorys i harmonogram cięcia. Policz sadzonki, koszt i czas do pełnej prywatności.",
    keywords: [
      "kalkulator żywopłotu",
      "ile sadzonek na żywopłot",
      "koszt żywopłotu",
      "wysokość żywopłotu",
      "żywopłot grab kalkulator",
      "odstępy sadzenia żywopłot",
      "porównanie żywopłotów",
    ],
    icon: "🌿",
    featured: true,
  },
  {
    slug: "kalkulator-prywatnosci",
    title: "Kalkulator prywatności ogrodu",
    shortTitle: "Prywatność",
    description:
      "Dowiedz się, jak wysokie rośliny posadzić, by zasłonić widok sąsiada. Symulacja sezonowa wzrostu.",
    keywords: [
      "prywatność w ogrodzie",
      "zasłonić sąsiada",
      "wysokość roślin prywatność",
      "ogród prywatny",
    ],
    icon: "🏡",
  },
  {
    slug: "kalkulator-nawozenia",
    title: "Kalkulator nawożenia trawnika",
    shortTitle: "Nawożenie",
    description:
      "Oblicz ilość nawozu, koszt i harmonogram nawożenia trawnika w zależności od rodzaju trawy i nawozu.",
    keywords: [
      "nawożenie trawnika",
      "ile nawozu na trawnik",
      "harmonogram nawożenia",
      "kalkulator nawozu",
    ],
    icon: "🌱",
  },
  {
    slug: "kalkulator-deszczowki",
    title: "Kalkulator zbiornika na deszczówkę",
    shortTitle: "Deszczówka",
    description:
      "Policz ile litrów deszczówki zbierzesz rocznie i jaki zbiornik wybrać. Na ile dni wystarczy na podlewanie.",
    keywords: [
      "zbiornik na deszczówkę",
      "kalkulator deszczówki",
      "ile deszczówki zebrać",
      "podlewanie deszczówką",
    ],
    icon: "🌧️",
  },
  {
    slug: "kalkulator-cienia",
    title: "Kalkulator cienia od drzewa",
    shortTitle: "Cień",
    description:
      "Oblicz powierzchnię zacienienia w różnych miesiącach na podstawie wysokości drzewa i szerokości korony.",
    keywords: [
      "cień od drzewa",
      "zacienienie ogrodu",
      "kalkulator cienia",
      "nasłonecznienie ogrodu",
    ],
    icon: "🌳",
  },
  {
    slug: "kalkulator-wzrostu",
    title: "Kalkulator wzrostu roślin",
    shortTitle: "Wzrost roślin",
    description:
      "Sprawdź wysokość grabu, tui, laurowiśni, cis, bambusa i wierzby po latach. Wykres wzrostu, porównanie 12 gatunków i harmonogram cięcia.",
    keywords: [
      "wzrost roślin",
      "ile rośnie grab",
      "wysokość tui po latach",
      "kalkulator wzrostu",
      "ile rośnie laurowiśnia",
      "porównanie wzrostu roślin",
      "wysokość roślin po latach",
    ],
    icon: "📈",
    featured: true,
  },
  {
    slug: "kalkulator-trawnika",
    title: "Kalkulator zakładania trawnika",
    shortTitle: "Trawnik",
    description:
      "Policz ilość nasion, ziemi, nawozu i całkowity koszt założenia trawnika od podstaw.",
    keywords: [
      "zakładanie trawnika",
      "ile nasion na trawnik",
      "koszt trawnika",
      "kalkulator trawnika",
    ],
    icon: "🟢",
  },
  {
    slug: "kalkulator-robota-koszacego",
    title: "Kalkulator robota koszącego — dobór i opłacalność",
    shortTitle: "Robot koszący",
    description:
      "Dobierz robota koszącego do 200–3000 m². Porównaj Husqvarna, Worx, STIHL, Gardena. Kalkulator kosztów, zwrotu inwestycji i 20 gotowych scenariuszy.",
    keywords: [
      "robot koszący",
      "kalkulator robota koszącego",
      "jaki robot koszący",
      "opłacalność robota koszącego",
      "robot koszący cena",
      "husqvarna automower",
      "worx landroid",
      "montaż robota koszącego",
      "robot koszący 500 m2",
    ],
    icon: "🤖",
    featured: true,
  },
  {
    slug: "projektant-ogrodu",
    title: "Projektant ogrodu — rysuj plan i listę materiałów",
    shortTitle: "Projektant",
    description:
      "Narysuj plan działki na siatce: dom, altana, ścieżki, ogrodzenie, drzewa i tuje. Zapisz projekt i wygeneruj listę potrzebnych materiałów.",
    keywords: [
      "projektant ogrodu",
      "plan ogrodu online",
      "rysowanie ogrodu",
      "projekt ogrodu narzędzie",
      "lista materiałów ogród",
      "układ ogrodu",
    ],
    icon: "✏️",
    featured: true,
  },
  {
    slug: "generator-planu-ogrodu",
    title: "Generator planu ogrodu — ankieta i kosztorys",
    shortTitle: "Plan ogrodu",
    description:
      "Spersonalizowany plan ogrodu: ankieta 6 kroków, strefy, rośliny, kosztorys PLN i harmonogram 4 faz. Mały ogród, warzywnik, prywatność i więcej.",
    keywords: [
      "generator planu ogrodu",
      "plan ogrodu online",
      "projekt ogrodu",
      "koszt założenia ogrodu",
      "jak zaplanować ogród",
      "ankieta ogrodowa",
      "kosztorys ogrodu",
    ],
    icon: "📋",
    featured: true,
  },
  {
    slug: "porownywarka-krzewow",
    title: "Porównywarka krzewów — laurowiśnia vs tuja i więcej",
    shortTitle: "Porównywarka krzewów",
    description:
      "Porównaj 12 krzewów: laurowiśnia, tuja, ostrokrzew, berberys, hortensja i więcej. Wzrost, żywopłot, choroby, woda — wykresy i tabela.",
    keywords: [
      "porównywarka krzewów",
      "porównanie krzewów",
      "laurowiśnia czy tuja",
      "krzew na żywopłot",
      "zamiennik tui krzew",
      "który krzew do ogrodu",
    ],
    icon: "🌿",
    featured: true,
  },
  {
    slug: "porownywarka-drzew",
    title: "Porównywarka drzew — dąb vs sosna i więcej",
    shortTitle: "Porównywarka drzew",
    description:
      "Porównaj 16 gatunków drzew: wzrost na 50 lat, woda, korzenie, cień, koszt sadzonki. Dąb vs sosna, kasztan, modrzew — wykresy i tabela.",
    keywords: [
      "porównywarka drzew",
      "porównanie drzew",
      "dąb czy sosna",
      "dab vs sosna",
      "które drzewo do ogrodu",
      "wzrost drzew porównanie",
      "drzewo przy domu",
    ],
    icon: "🌳",
    featured: true,
  },
  {
    slug: "alternatywy-dla-tui",
    title: "Co posadzić zamiast tui?",
    shortTitle: "Zamiast tui",
    description:
      "Znajdź zimozielone alternatywy dla tui — zdrowsze, odporne i piękne. Dobierz według strefy klimatycznej i wysokości.",
    keywords: [
      "zamiennik tui",
      "co zamiast tui",
      "alternatywy dla tui",
      "choroba tui zamiennik",
    ],
    icon: "🔄",
    featured: true,
  },
  {
    slug: "kalendarz-ogrodnika",
    title: "Kalendarz ogrodnika — harmonogram prac na cały rok",
    shortTitle: "Kalendarz",
    description:
      "Co robić w ogrodzie miesiąc po miesiącu: cięcie jabłoni, nawożenie hortensji, wertykulacja trawnika. Kalendarz ogrodnika dla polskiego klimatu.",
    keywords: [
      "kalendarz ogrodnika",
      "harmonogram prac ogrodowych",
      "co robić w ogrodzie",
      "prace ogrodowe kalendarz",
      "kalendarz ogrodniczy",
      "wertykulacja trawnika kiedy",
      "nawożenie hortensji kiedy",
    ],
    icon: "📅",
    featured: true,
  },
  {
    slug: "katalog-kwitnienia",
    title: "Katalog roślin kwitnących — wyszukiwarka po miesiącu",
    shortTitle: "Kwitnienie",
    description: `Filtruj rośliny po miesiącu kwitnienia, kolorze, zapachu i pszczołach. Co kwitnie w maju, lipcu lub całe lato? Tabela I–XII i ${FLOWERING_PLANT_COUNT} gatunków.`,
    keywords: [
      "rośliny kwitnące",
      "co kwitnie w maju",
      "katalog kwiatów",
      "rośliny kwitnące całe lato",
      "krzewy kwitnące",
      "rośliny dla pszczół",
      "kwitnienie ogród",
    ],
    icon: "🌸",
    featured: true,
  },
  {
    slug: "kalkulator-ziemi-i-kory",
    title: "Kalkulator ziemi i kory",
    shortTitle: "Ziemia i kora",
    description:
      "Policz ile m³ i worków ziemi, kory lub żwiru potrzebujesz na rabatę, trawnik czy podwyższenie terenu. Liczba worków i koszt w PLN.",
    keywords: [
      "ile kory na m2",
      "kalkulator ziemi",
      "ile ziemi do podniesienia terenu",
      "kalkulator kory",
      "ile worków ziemi",
      "m3 ziemi ile worków",
      "ile żwiru na m2",
    ],
    icon: "🪴",
  },
  {
    slug: "kalkulator-kostki-brukowej",
    title: "Kalkulator kostki brukowej i ścieżek",
    shortTitle: "Kostka brukowa",
    description:
      "Oblicz ilość kostki brukowej, podbudowy, piasku i obrzeży na ścieżkę, podjazd lub taras. Kosztorys materiałów w PLN.",
    keywords: [
      "kalkulator kostki brukowej",
      "ile kostki na m2",
      "podbudowa pod kostkę",
      "koszt podjazdu z kostki",
      "ścieżka w ogrodzie",
      "obrzeża do kostki",
    ],
    icon: "🧱",
  },
  {
    slug: "kalkulator-ogrodzenia",
    title: "Kalkulator ogrodzenia — panele, siatka, sztachety",
    shortTitle: "Ogrodzenie",
    description:
      "Policz liczbę paneli, słupków i koszt ogrodzenia działki. Porównaj ogrodzenie panelowe, siatkę i sztachety za metr bieżący.",
    keywords: [
      "kalkulator ogrodzenia",
      "koszt ogrodzenia za metr",
      "ile paneli ogrodzeniowych",
      "ogrodzenie panelowe cena",
      "siatka ogrodzeniowa kalkulator",
      "ogrodzenie działki koszt",
    ],
    icon: "🚧",
  },
  {
    slug: "kalkulator-oczka-wodnego",
    title: "Kalkulator oczka wodnego",
    shortTitle: "Oczko wodne",
    description:
      "Oblicz objętość oczka wodnego, wymiar folii, moc pompy i liczbę roślin wodnych. Kosztorys budowy stawu w ogrodzie.",
    keywords: [
      "oczko wodne kalkulator",
      "folia na oczko wodne wymiar",
      "pompa do oczka wodnego jaka",
      "budowa oczka wodnego koszt",
      "rośliny do oczka wodnego",
    ],
    icon: "🪷",
  },
  {
    slug: "kalkulator-kompostownika",
    title: "Kalkulator kompostownika",
    shortTitle: "Kompostownik",
    description:
      "Dobierz wielkość kompostownika do domu i działki. Co wrzucać, czego unikać i kiedy kompost będzie gotowy — z harmonogramem.",
    keywords: [
      "kompostownik jaki rozmiar",
      "kalkulator kompostownika",
      "co wrzucać do kompostownika",
      "kiedy kompost gotowy",
      "kompostownik na działkę",
    ],
    icon: "♻️",
  },
  {
    slug: "kalkulator-siewu-warzyw",
    title: "Kalkulator siewu warzyw",
    shortTitle: "Siew warzyw",
    description:
      "Policz ile nasion i rozsady na zagon: rozstawy, terminy siewu i szacunkowy plon dla kilkunastu popularnych warzyw.",
    keywords: [
      "ile nasion na m2",
      "rozstawa warzyw",
      "kalkulator siewu",
      "kiedy siać warzywa",
      "plan warzywnika",
      "ile rozsady pomidorów",
    ],
    icon: "🥕",
  },
  {
    slug: "kalkulator-wapnowania",
    title: "Kalkulator wapnowania i pH gleby",
    shortTitle: "Wapnowanie",
    description:
      "Oblicz dawkę wapna na podstawie pH i rodzaju gleby. Kiedy wapnować trawnik i warzywnik, jaki nawóz wapniowy wybrać.",
    keywords: [
      "wapnowanie trawnika dawka",
      "kalkulator wapnowania",
      "ph gleby jak podnieść",
      "ile wapna na m2",
      "wapnowanie gleby kiedy",
    ],
    icon: "🧪",
  },
  {
    slug: "kalkulator-kosztow-ogrodu",
    title: "Kalkulator kosztów utrzymania ogrodu",
    shortTitle: "Koszty ogrodu",
    description:
      "Roczny koszt Twojego ogrodu: woda, nawozy, paliwo i prąd, usługi. Zobacz, gdzie oszczędzisz najwięcej.",
    keywords: [
      "koszt utrzymania ogrodu",
      "ile kosztuje ogród rocznie",
      "koszty ogrodu kalkulator",
      "oszczędzanie w ogrodzie",
    ],
    icon: "💰",
  },
  {
    slug: "wycinka-drzewa",
    title: "Czy mogę wyciąć drzewo? Kalkulator wycinki",
    shortTitle: "Wycinka drzewa",
    description:
      "Sprawdź, czy wycinka drzewa wymaga zgłoszenia lub zezwolenia. Obwód pnia, gatunek, cel — plus szacunkowa opłata za wycinkę.",
    keywords: [
      "czy mogę wyciąć drzewo",
      "wycinka drzewa przepisy",
      "zgłoszenie wycinki drzewa",
      "obwód pnia wycinka",
      "opłata za wycinkę drzewa",
      "wycinka drzew na własnej działce",
    ],
    icon: "🪓",
    featured: true,
  },
  {
    slug: "odleglosc-sadzenia-od-granicy",
    title: "Odległość sadzenia drzew i krzewów od granicy działki",
    shortTitle: "Odległość od granicy",
    description:
      "Policz, jak daleko od płotu posadzić drzewo, krzew lub żywopłot, aby uniknąć sporu z sąsiadem. Gałęzie, korzenie i przepisy.",
    keywords: [
      "odległość drzewa od granicy działki",
      "w jakiej odległości od płotu sadzić tuje",
      "żywopłot przy granicy przepisy",
      "gałęzie sąsiada nad moją działką",
      "krzewy przy ogrodzeniu odległość",
    ],
    icon: "📏",
    featured: true,
  },
  {
    slug: "dotacja-moja-woda",
    title: "Kalkulator dotacji Moja Woda",
    shortTitle: "Moja Woda",
    description:
      "Policz dofinansowanie do zbiornika na deszczówkę z programu Moja Woda i sprawdź, kiedy inwestycja się zwróci.",
    keywords: [
      "moja woda dotacja",
      "dofinansowanie do zbiornika na deszczówkę",
      "program moja woda kalkulator",
      "dotacja na deszczówkę",
    ],
    icon: "🏦",
  },
  {
    slug: "kalkulator-laki-kwietnej",
    title: "Kalkulator łąki kwietnej",
    shortTitle: "Łąka kwietna",
    description:
      "Ile nasion łąki kwietnej na m², koszt założenia i ile wody oraz koszenia oszczędzisz w porównaniu z trawnikiem.",
    keywords: [
      "łąka kwietna ile nasion",
      "łąka kwietna zamiast trawnika",
      "kalkulator łąki kwietnej",
      "łąka kwietna koszt",
      "kiedy siać łąkę kwietną",
    ],
    icon: "🦋",
    featured: true,
  },
  {
    slug: "rosliny-bezpieczne-dla-zwierzat",
    title: "Rośliny bezpieczne i trujące dla psa i kota",
    shortTitle: "Bezpieczne dla zwierząt",
    description:
      "Sprawdź, które rośliny ogrodowe są trujące dla psa, kota lub dzieci, a które bezpieczne. Wyszukiwarka z filtrami.",
    keywords: [
      "rośliny trujące dla psa",
      "rośliny trujące dla kota",
      "rośliny bezpieczne dla psa",
      "czy tuja jest trująca dla psa",
      "trujące rośliny ogrodowe",
    ],
    icon: "🐕",
    featured: true,
  },
  {
    slug: "kalkulator-budek-legowych",
    title: "Kalkulator budek lęgowych i karmników",
    shortTitle: "Budki lęgowe",
    description:
      "Ile budek lęgowych i poidełek zmieści Twoja działka, jakie ptaki przyciągniesz i kiedy wieszać oraz czyścić budki.",
    keywords: [
      "budki lęgowe kiedy wieszać",
      "jaka budka dla sikorki",
      "ile budek na działkę",
      "karmnik dla ptaków zimą",
      "ptaki w ogrodzie",
    ],
    icon: "🐦",
  },
  {
    slug: "kalkulator-plonow-warzywnika",
    title: "Kalkulator plonów warzywnika",
    shortTitle: "Plony warzywnika",
    description:
      "Ile kg pomidorów, ogórków i innych warzyw zbierzesz z X m² i ile to warte w sklepie. Policz roczne oszczędności.",
    keywords: [
      "ile pomidorów z jednego krzaka",
      "plon z warzywnika",
      "ile warzyw z m2",
      "warzywnik oszczędności",
      "opłacalność warzywnika",
    ],
    icon: "🍅",
  },
  {
    slug: "zgadnij-rosline",
    title: "Zgadnij roślinę — codzienna gra ogrodnicza",
    shortTitle: "Zgadnij roślinę",
    description:
      "Codzienna zagadka: odgadnij roślinę w 6 próbach. Podpowiedzi o wysokości, kwitnieniu i kolorze. Nowa roślina każdego dnia!",
    keywords: [
      "gra roślinna",
      "zgadnij roślinę",
      "quiz ogrodniczy",
      "gra ogrodnicza online",
      "zagadka roślinna",
    ],
    icon: "🎯",
    featured: true,
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
