export type HardinessZone = "5b" | "6a" | "6b" | "7a";

export interface VoivodeshipZone {
  id: string;
  name: string;
  capital: string;
  zone: HardinessZone;
  /** Gdy strefa zależy od wysokości / mikroklimatu */
  zoneNote?: string;
  minTempC: number;
  avgLastFrost: string;
  avgFirstFrost: string;
  description: string;
  /** Miasta do linków regionalnych */
  cities: { name: string; irrigationSlug?: string }[];
  relatedLinks: { href: string; label: string }[];
}

export const ZONE_COLORS: Record<
  HardinessZone,
  { fill: string; hover: string; stroke: string; label: string; temp: string }
> = {
  "5b": {
    fill: "#1e4d8c",
    hover: "#2563eb",
    stroke: "#1e3a5f",
    label: "Strefa 5b",
    temp: "do -26°C",
  },
  "6a": {
    fill: "#0891b2",
    hover: "#06b6d4",
    stroke: "#0e7490",
    label: "Strefa 6a",
    temp: "do -23°C",
  },
  "6b": {
    fill: "#16a34a",
    hover: "#22c55e",
    stroke: "#15803d",
    label: "Strefa 6b",
    temp: "do -20°C",
  },
  "7a": {
    fill: "#ca8a04",
    hover: "#eab308",
    stroke: "#a16207",
    label: "Strefa 7a",
    temp: "do -17°C",
  },
};

/** Projekcja equirectangular dopasowana do Polski */
export function projectPoland(lon: number, lat: number): [number, number] {
  const left = 14.0;
  const right = 24.5;
  const top = 54.9;
  const bottom = 49.0;
  const x = ((lon - left) / (right - left)) * 800;
  const y = ((top - lat) / (top - bottom)) * 780;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

export const VOIVODESHIP_ZONES: VoivodeshipZone[] = [
  {
    id: "zachodniopomorskie",
    name: "Zachodniopomorskie",
    capital: "Szczecin",
    zone: "7a",
    minTempC: -17,
    avgLastFrost: "20–30 kwietnia",
    avgFirstFrost: "10–20 października",
    description:
      "Najłagodniejszy region Polski — wpływ Bałtyku i zachodni wiatr. Zimy łagodniejsze niż na wschodzie, ale wiatr zwiększa wysuszanie roślin zimą.",
    cities: [{ name: "Szczecin" }, { name: "Koszalin" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/gdansk", label: "Nawadnianie — wybrzeże" },
      { href: "/alternatywy-dla-tui", label: "Alternatywy dla tui" },
    ],
  },
  {
    id: "pomorskie",
    name: "Pomorskie",
    capital: "Gdańsk",
    zone: "7a",
    minTempC: -17,
    avgLastFrost: "25 kwietnia – 5 maja",
    avgFirstFrost: "5–15 października",
    description:
      "Wybrzeże i Kaszuby — strefa 7a z łagodniejszymi zimami. W głębi województwa (Tuchola) bywa chłodniej (6b). Silny wiatr od morza — osłaniaj młode nasadzenia.",
    cities: [{ name: "Gdańsk", irrigationSlug: "gdansk" }, { name: "Słupsk" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/gdansk", label: "Nawadnianie Gdańsk" },
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu" },
    ],
  },
  {
    id: "warminsko-mazurskie",
    name: "Warmińsko-mazurskie",
    capital: "Olsztyn",
    zone: "6b",
    zoneNote: "Na Mazurach i w Kotlinie Grudziądzkiej bywa 6a",
    minTempC: -20,
    avgLastFrost: "5–15 maja",
    avgFirstFrost: "25 września – 5 października",
    description:
      "Pojezierze i lasy — dłuższe zimy niż na wybrzeżu. Jeziora w moderują skrajne mrozy, ale wiosenne przymrozki do połowy maja są typowe.",
    cities: [{ name: "Olsztyn" }, { name: "Elbląg" }],
    relatedLinks: [
      { href: "/ogrod-w/maj", label: "Ogród w maju" },
      { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
    ],
  },
  {
    id: "podlaskie",
    name: "Podlaskie",
    capital: "Białystok",
    zone: "6a",
    minTempC: -23,
    avgLastFrost: "10–20 maja",
    avgFirstFrost: "20–30 września",
    description:
      "Wschodnia Polska — chłodniejsze noce i dłuższa zima. Białostocka Upland i Puszcza Białowieska mają mikroklimat lekko chłodniejszy niż centrum kraju.",
    cities: [{ name: "Białystok" }, { name: "Suwałki" }],
    relatedLinks: [
      { href: "/alternatywy-dla-tui", label: "Zimozielone na wschodzie" },
      { href: "/porownywarka-krzewow", label: "Porównywarka krzewów" },
    ],
  },
  {
    id: "lubelskie",
    name: "Lubelskie",
    capital: "Lublin",
    zone: "6a",
    zoneNote: "Na Roztoczu i wyżynach 6a, w dolinach 6b",
    minTempC: -23,
    avgLastFrost: "5–15 maja",
    avgFirstFrost: "25 września – 5 października",
    description:
      "Kontynentalny klimat — gorące lato i mroźniejsze zimy. Roztocze i wyżyny chłodniejsze, doliny Wisły i Bugu łagodniejsze.",
    cities: [{ name: "Lublin" }, { name: "Zamość" }],
    relatedLinks: [
      { href: "/kalkulator-siewu-warzyw", label: "Kalkulator siewu warzyw" },
      { href: "/kalkulator-plonow-warzywnika", label: "Plony warzywnika" },
    ],
  },
  {
    id: "mazowieckie",
    name: "Mazowieckie",
    capital: "Warszawa",
    zone: "6b",
    minTempC: -20,
    avgLastFrost: "25 kwietnia – 10 maja",
    avgFirstFrost: "5–15 października",
    description:
      "Centralna Polska — strefa 6b w Warszawie i na Nizinie Mazowieckiej. Miejska wyspa ciepła w stolicy może dawać warunki zbliżone do 7a w centrum.",
    cities: [{ name: "Warszawa", irrigationSlug: "warszawa" }, { name: "Radom" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/warszawa", label: "Nawadnianie Warszawa" },
      { href: "/generator-planu-ogrodu", label: "Generator planu ogrodu" },
    ],
  },
  {
    id: "kujawsko-pomorskie",
    name: "Kujawsko-pomorskie",
    capital: "Bydgoszcz",
    zone: "6b",
    minTempC: -20,
    avgLastFrost: "25 kwietnia – 10 maja",
    avgFirstFrost: "5–15 października",
    description:
      "Nizina Kujawsko-Pomorska — umiarkowany klimat z wpływem Wisły. Wilgotniejsze wiosny sprzyjają chorobom grzybowym na trawniku.",
    cities: [{ name: "Bydgoszcz" }, { name: "Toruń" }],
    relatedLinks: [
      { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
      { href: "/problemy-ogrodowe/mech-w-trawniku", label: "Mech w trawniku" },
    ],
  },
  {
    id: "wielkopolskie",
    name: "Wielkopolskie",
    capital: "Poznań",
    zone: "6b",
    minTempC: -20,
    avgLastFrost: "20 kwietnia – 5 maja",
    avgFirstFrost: "10–20 października",
    description:
      "Wielkopolska bywa sucha latem — deficyt wody w lipcu. Strefa 6b, z łagodniejszymi fragmentami nad Wartą (zbliżone do 7a).",
    cities: [{ name: "Poznań", irrigationSlug: "poznan" }, { name: "Kalisz" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/poznan", label: "Nawadnianie Poznań" },
      { href: "/kalkulator-deszczowki", label: "Kalkulator deszczówki" },
    ],
  },
  {
    id: "lodzkie",
    name: "Łódzkie",
    capital: "Łódź",
    zone: "6b",
    minTempC: -20,
    avgLastFrost: "25 kwietnia – 10 maja",
    avgFirstFrost: "5–15 października",
    description:
      "Centrum Polski — kontynentalny klimat z gorącymi latami. Gleby gliniaste wymagają głębokiego podlewania i aeracji trawnika.",
    cities: [{ name: "Łódź", irrigationSlug: "lodz" }, { name: "Piotrków Trybunalski" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/lodz", label: "Nawadnianie Łódź" },
      { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
    ],
  },
  {
    id: "lubuskie",
    name: "Lubuskie",
    capital: "Gorzów Wielkopolski",
    zone: "6b",
    zoneNote: "Przy granicy z Niemcami miejscami 7a",
    minTempC: -20,
    avgLastFrost: "20–30 kwietnia",
    avgFirstFrost: "10–20 października",
    description:
      "Zachodnia Polska — łagodniejsze zimy niż na wschodzie. Puszcza Notecka i doliny Odry tworzą wilgotniejsze mikroklimaty.",
    cities: [{ name: "Gorzów Wielkopolski" }, { name: "Zielona Góra" }],
    relatedLinks: [
      { href: "/kalkulator-laki-kwietnej", label: "Łąka kwietna" },
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu" },
    ],
  },
  {
    id: "dolnoslaskie",
    name: "Dolnośląskie",
    capital: "Wrocław",
    zone: "6b",
    zoneNote: "Sudety i Góry Stołowe: 5b–6a w wyższych partiach",
    minTempC: -20,
    avgLastFrost: "15–30 kwietnia",
    avgFirstFrost: "10–20 października",
    description:
      "Wrocław i Nizina Śląsko-Łódzka — strefa 6b–7a. W Sudetach co 100 m w górę temperatura spada o ok. 0,6°C — w Karpaczu i Szklarskiej Porębie sadź rośliny odporne na 6a lub 5b.",
    cities: [{ name: "Wrocław", irrigationSlug: "wroclaw" }, { name: "Wałbrzych" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/wroclaw", label: "Nawadnianie Wrocław" },
      { href: "/porownywarka-drzew", label: "Porównywarka drzew" },
    ],
  },
  {
    id: "opolskie",
    name: "Opolskie",
    capital: "Opole",
    zone: "6b",
    minTempC: -20,
    avgLastFrost: "20 kwietnia – 5 maja",
    avgFirstFrost: "10–20 października",
    description:
      "Południowa Polska — umiarkowanie łagodne zimy. Nizina Opolska sprzyja uprawie winorośli i cieplej lubianych roślin.",
    cities: [{ name: "Opole" }, { name: "Nysa" }],
    relatedLinks: [
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu" },
      { href: "/kalkulator-zywoplotu", label: "Kalkulator żywopłotu" },
    ],
  },
  {
    id: "slaskie",
    name: "Śląskie",
    capital: "Katowice",
    zone: "6b",
    zoneNote: "Wyżyna Śląska chłodniejsza, aglomeracja cieplejsza",
    minTempC: -20,
    avgLastFrost: "20 kwietnia – 5 maja",
    avgFirstFrost: "10–20 października",
    description:
      "Industrialna aglomeracja tworzy wyspę ciepła — centrum Katowic bywa o 1–2°C cieplejsze niż okolice. Na wyżynach (Beskid Śląski) strefa spada do 6a.",
    cities: [{ name: "Katowice" }, { name: "Częstochowa" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      { href: "/problemy-ogrodowe", label: "Problemy ogrodowe" },
    ],
  },
  {
    id: "swietokrzyskie",
    name: "Świętokrzyskie",
    capital: "Kielce",
    zone: "6a",
    zoneNote: "Łyse Góry i Góry Świętokrzyskie: 5b–6a",
    minTempC: -23,
    avgLastFrost: "10–20 maja",
    avgFirstFrost: "20–30 września",
    description:
      "Wyżyny świętokrzyskie — chłodniejsze noce i późne wiosenne przymrozki. W dolinach Wisły i Nidy warunki łagodniejsze (6b).",
    cities: [{ name: "Kielce" }, { name: "Sandomierz" }],
    relatedLinks: [
      { href: "/kalkulator-wapnowania", label: "Kalkulator wapnowania" },
      { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
    ],
  },
  {
    id: "malopolskie",
    name: "Małopolskie",
    capital: "Kraków",
    zone: "6b",
    zoneNote: "Tatry i Beskidy: 5b–6a; Kraków i Kotliny: 6b–7a",
    minTempC: -20,
    avgLastFrost: "20 kwietnia – 10 maja",
    avgFirstFrost: "5–15 października",
    description:
      "Duże zróżnicowanie — Kraków i Kotliny w strefie 6b–7a, góry znacznie chłodniejsze. Przy sadzeniu w górach sprawdź wysokość n.p.m. — co 100 m to ok. pół strefy USDA niżej.",
    cities: [{ name: "Kraków", irrigationSlug: "krakow" }, { name: "Tarnów" }, { name: "Zakopane" }],
    relatedLinks: [
      { href: "/kalkulator-nawadniania/krakow", label: "Nawadnianie Kraków" },
      { href: "/porownywarka-drzew", label: "Porównywarka drzew" },
    ],
  },
  {
    id: "podkarpackie",
    name: "Podkarpackie",
    capital: "Rzeszów",
    zone: "6a",
    zoneNote: "Bieszczady: 5b; Rzeszów i Pogórze: 6a–6b",
    minTempC: -23,
    avgLastFrost: "10–20 maja",
    avgFirstFrost: "20–30 września",
    description:
      "Kontynentalny klimat z gorącymi latami. Bieszczady i wyżyny — strefa 5b–6a. Kotliny i Rzeszów — 6a–6b. Późne przymrozki wiosenne w górach.",
    cities: [{ name: "Rzeszów" }, { name: "Przemyśl" }],
    relatedLinks: [
      { href: "/alternatywy-dla-tui", label: "Alternatywy dla tui" },
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu" },
    ],
  },
];

export function getVoivodeshipById(id: string): VoivodeshipZone | undefined {
  return VOIVODESHIP_ZONES.find((v) => v.id === id);
}

export const HARDINESS_MAP_FAQ = [
  {
    question: "Co to jest strefa mrozoodporności USDA?",
    answer:
      "Strefy USDA (United States Department of Agriculture) określają średnią minimalną temperaturę zimową w danym regionie. Strefa 6b oznacza mrozy do ok. -20°C, strefa 7a do -17°C. Na etykiecie sadzonki szukaj oznaczenia np. „6b–7a”.",
  },
  {
    question: "Jaka strefa mrozoodporności w Polsce?",
    answer:
      "Większość Polski leży w strefach 6a–7a. Najłagodniejsze: wybrzeże Bałtyku (7a). Najchłodniejsze: Podlasie, wyżyny i góry (6a, miejscami 5b powyżej 800–1000 m n.p.m.).",
  },
  {
    question: "Czy strefa USDA w mieście różni się od wsi?",
    answer:
      "Tak — wyspy ciepła w dużych miastach (Warszawa, Kraków, Katowice) mogą być o pół strefy łagodniejsze. Odwrotnie: doliny i strefy wietrzne wymagają ostrożniejszego doboru roślin.",
  },
  {
    question: "Jak dobrać rośliny do strefy?",
    answer:
      "Sadzonka powinna być oznaczona na co najmniej Twoją strefę lub niższą (np. 6a na terenie 6b). W górach wybieraj gatunki odporne na mrozy o 1–2 strefy niższe niż w dolinie.",
  },
  {
    question: "Jak sprawdzić strefę dla mojego miasta?",
    answer:
      "Użyj wyszukiwarki miasta na mapie — wpisz np. Kraków, Zakopane lub Suwałki. Dla miast górskich pokazujemy osobną strefę (np. Zakopane 5b), bo wysokość znacząco obniża temperaturę minimalną.",
  },
];

export const ZONE_LEGEND: { zone: HardinessZone; description: string }[] = [
  { zone: "7a", description: "Wybrzeże, łagodne zimy — lawenda, cypryśnik, winorośl" },
  { zone: "6b", description: "Centrum Polski — większość krzewów liściastych i iglastych" },
  { zone: "6a", description: "Wschód i wyżyny — wybieraj odmiany odporne, osłaniaj młode tuje" },
  { zone: "5b", description: "Góry powyżej 800 m — tylko gatunki górskie i karłowate odmiany" },
];
