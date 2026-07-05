import type { HardinessZone } from "./hardiness-zones";

export interface HardinessCity {
  id: string;
  name: string;
  voivodeshipId: string;
  /** Domyślna strefa z województwa; opcjonalne nadpisanie (góry, centrum miasta) */
  zoneOverride?: HardinessZone;
  zoneNote?: string;
  lat: number;
  lon: number;
  irrigationSlug?: string;
}

export const HARDINESS_CITIES: HardinessCity[] = [
  { id: "warszawa", name: "Warszawa", voivodeshipId: "mazowieckie", zoneOverride: "6b", zoneNote: "Centrum miasta — wyspa ciepła, często 6b–7a", lat: 52.23, lon: 21.01, irrigationSlug: "warszawa" },
  { id: "krakow", name: "Kraków", voivodeshipId: "malopolskie", zoneOverride: "6b", lat: 50.06, lon: 19.94, irrigationSlug: "krakow" },
  { id: "wroclaw", name: "Wrocław", voivodeshipId: "dolnoslaskie", lat: 51.11, lon: 17.04, irrigationSlug: "wroclaw" },
  { id: "gdansk", name: "Gdańsk", voivodeshipId: "pomorskie", zoneOverride: "7a", lat: 54.35, lon: 18.65, irrigationSlug: "gdansk" },
  { id: "poznan", name: "Poznań", voivodeshipId: "wielkopolskie", lat: 52.41, lon: 16.93, irrigationSlug: "poznan" },
  { id: "lodz", name: "Łódź", voivodeshipId: "lodzkie", lat: 51.76, lon: 19.46, irrigationSlug: "lodz" },
  { id: "szczecin", name: "Szczecin", voivodeshipId: "zachodniopomorskie", zoneOverride: "7a", lat: 53.43, lon: 14.55 },
  { id: "bydgoszcz", name: "Bydgoszcz", voivodeshipId: "kujawsko-pomorskie", lat: 53.12, lon: 18.01 },
  { id: "lublin", name: "Lublin", voivodeshipId: "lubelskie", lat: 51.25, lon: 22.57 },
  { id: "katowice", name: "Katowice", voivodeshipId: "slaskie", zoneOverride: "6b", zoneNote: "Aglomeracja — wyspa ciepła", lat: 50.26, lon: 19.02 },
  { id: "bialystok", name: "Białystok", voivodeshipId: "podlaskie", lat: 53.13, lon: 23.16 },
  { id: "rzeszow", name: "Rzeszów", voivodeshipId: "podkarpackie", lat: 50.04, lon: 22.00 },
  { id: "kielce", name: "Kielce", voivodeshipId: "swietokrzyskie", lat: 50.87, lon: 20.63 },
  { id: "olsztyn", name: "Olsztyn", voivodeshipId: "warminsko-mazurskie", lat: 53.78, lon: 20.48 },
  { id: "opole", name: "Opole", voivodeshipId: "opolskie", lat: 50.67, lon: 17.92 },
  { id: "gorzow", name: "Gorzów Wielkopolski", voivodeshipId: "lubuskie", lat: 52.74, lon: 15.23 },
  { id: "zielona-gora", name: "Zielona Góra", voivodeshipId: "lubuskie", lat: 51.94, lon: 15.51 },
  { id: "torun", name: "Toruń", voivodeshipId: "kujawsko-pomorskie", lat: 53.01, lon: 18.61 },
  { id: "radom", name: "Radom", voivodeshipId: "mazowieckie", lat: 51.40, lon: 21.15 },
  { id: "sosnowiec", name: "Sosnowiec", voivodeshipId: "slaskie", lat: 50.28, lon: 19.13 },
  { id: "gliwice", name: "Gliwice", voivodeshipId: "slaskie", lat: 50.29, lon: 18.67 },
  { id: "czestochowa", name: "Częstochowa", voivodeshipId: "slaskie", lat: 50.81, lon: 19.12 },
  { id: "plock", name: "Płock", voivodeshipId: "mazowieckie", lat: 52.55, lon: 19.69 },
  { id: "walbrzych", name: "Wałbrzych", voivodeshipId: "dolnoslaskie", zoneOverride: "6a", lat: 50.77, lon: 16.29 },
  { id: "tarnow", name: "Tarnów", voivodeshipId: "malopolskie", lat: 50.01, lon: 20.99 },
  { id: "chorzow", name: "Chorzów", voivodeshipId: "slaskie", lat: 50.30, lon: 18.95 },
  { id: "kalisz", name: "Kalisz", voivodeshipId: "wielkopolskie", lat: 51.76, lon: 18.08 },
  { id: "koszalin", name: "Koszalin", voivodeshipId: "zachodniopomorskie", zoneOverride: "7a", lat: 54.19, lon: 16.18 },
  { id: "legnica", name: "Legnica", voivodeshipId: "dolnoslaskie", lat: 51.21, lon: 16.16 },
  { id: "grudziadz", name: "Grudziądz", voivodeshipId: "kujawsko-pomorskie", lat: 53.48, lon: 18.75 },
  { id: "slupsk", name: "Słupsk", voivodeshipId: "pomorskie", lat: 54.46, lon: 17.03 },
  { id: "jaworzno", name: "Jaworzno", voivodeshipId: "slaskie", lat: 50.20, lon: 19.27 },
  { id: "jelenia-gora", name: "Jelenia Góra", voivodeshipId: "dolnoslaskie", zoneOverride: "6a", zoneNote: "Sudety — chłodniejsze noce", lat: 50.90, lon: 15.73 },
  { id: "nowy-sacz", name: "Nowy Sącz", voivodeshipId: "malopolskie", lat: 49.62, lon: 20.70 },
  { id: "konin", name: "Konin", voivodeshipId: "wielkopolskie", lat: 52.22, lon: 18.25 },
  { id: "piotrkow", name: "Piotrków Trybunalski", voivodeshipId: "lodzkie", lat: 51.40, lon: 19.70 },
  { id: "inowroclaw", name: "Inowrocław", voivodeshipId: "kujawsko-pomorskie", lat: 52.79, lon: 18.26 },
  { id: "lubin", name: "Lubin", voivodeshipId: "dolnoslaskie", lat: 51.40, lon: 16.20 },
  { id: "siedlce", name: "Siedlce", voivodeshipId: "mazowieckie", lat: 52.17, lon: 22.28 },
  { id: "pila", name: "Piła", voivodeshipId: "wielkopolskie", lat: 53.15, lon: 16.74 },
  { id: "mielec", name: "Mielec", voivodeshipId: "podkarpackie", lat: 50.29, lon: 21.42 },
  { id: "ostroda", name: "Ostróda", voivodeshipId: "warminsko-mazurskie", lat: 53.70, lon: 19.96 },
  { id: "elblag", name: "Elbląg", voivodeshipId: "warminsko-mazurskie", lat: 54.16, lon: 19.40 },
  { id: "suwalki", name: "Suwałki", voivodeshipId: "podlaskie", zoneOverride: "6a", zoneNote: "Polski biegun zimna — późne wiosny", lat: 54.10, lon: 22.93 },
  { id: "zamosc", name: "Zamość", voivodeshipId: "lubelskie", lat: 50.72, lon: 23.25 },
  { id: "przemysl", name: "Przemyśl", voivodeshipId: "podkarpackie", lat: 49.78, lon: 22.77 },
  { id: "stargard", name: "Stargard", voivodeshipId: "zachodniopomorskie", lat: 53.34, lon: 15.05 },
  { id: "gdynia", name: "Gdynia", voivodeshipId: "pomorskie", zoneOverride: "7a", lat: 54.52, lon: 18.53 },
  { id: "sopot", name: "Sopot", voivodeshipId: "pomorskie", zoneOverride: "7a", lat: 54.44, lon: 18.56 },
  { id: "rumia", name: "Rumia", voivodeshipId: "pomorskie", zoneOverride: "7a", lat: 54.57, lon: 18.39 },
  { id: "zakopane", name: "Zakopane", voivodeshipId: "malopolskie", zoneOverride: "5b", zoneNote: "Ok. 800–1000 m n.p.m. — strefa górska", lat: 49.30, lon: 19.95 },
  { id: "karpacz", name: "Karpacz", voivodeshipId: "dolnoslaskie", zoneOverride: "5b", zoneNote: "Karkonosze — wybieraj rośliny na 5b–6a", lat: 50.78, lon: 15.74 },
  { id: "szklarska", name: "Szklarska Poręba", voivodeshipId: "dolnoslaskie", zoneOverride: "5b", lat: 50.83, lon: 15.52 },
  { id: "wisla", name: "Wisła", voivodeshipId: "slaskie", zoneOverride: "5b", zoneNote: "Beskid Śląski — mroźniejsze zimy", lat: 49.66, lon: 18.86 },
  { id: "ustron", name: "Ustroń", voivodeshipId: "slaskie", zoneOverride: "5b", lat: 49.72, lon: 18.80 },
  { id: "sanok", name: "Sanok", voivodeshipId: "podkarpackie", zoneOverride: "6a", lat: 49.56, lon: 22.21 },
  { id: "lesko", name: "Lesko", voivodeshipId: "podkarpackie", zoneOverride: "5b", zoneNote: "Bieszczady — strefa górska", lat: 49.47, lon: 22.33 },
  { id: "sandomierz", name: "Sandomierz", voivodeshipId: "swietokrzyskie", lat: 50.68, lon: 21.75 },
  { id: "nysa", name: "Nysa", voivodeshipId: "opolskie", lat: 50.47, lon: 17.33 },
  { id: "belchatow", name: "Bełchatów", voivodeshipId: "lodzkie", lat: 51.37, lon: 19.37 },
  { id: "tczew", name: "Tczew", voivodeshipId: "pomorskie", lat: 54.09, lon: 18.80 },
  { id: "pabianice", name: "Pabianice", voivodeshipId: "lodzkie", lat: 51.66, lon: 19.36 },
  { id: "gniezno", name: "Gniezno", voivodeshipId: "wielkopolskie", lat: 52.53, lon: 17.60 },
  { id: "ostrow", name: "Ostrów Wielkopolski", voivodeshipId: "wielkopolskie", lat: 51.65, lon: 17.81 },
  { id: "stargard-gdanski", name: "Starogard Gdański", voivodeshipId: "pomorskie", lat: 53.97, lon: 18.53 },
  { id: "mragowo", name: "Mrągowo", voivodeshipId: "warminsko-mazurskie", zoneOverride: "6a", lat: 53.38, lon: 21.30 },
  { id: "augustow", name: "Augustów", voivodeshipId: "podlaskie", zoneOverride: "6a", lat: 53.86, lon: 22.98 },
  { id: "lomza", name: "Łomża", voivodeshipId: "podlaskie", lat: 53.18, lon: 22.07 },
  { id: "chelm", name: "Chełm", voivodeshipId: "lubelskie", lat: 51.13, lon: 23.47 },
  { id: "milanowek", name: "Milanówek", voivodeshipId: "mazowieckie", zoneOverride: "6b", lat: 52.12, lon: 20.67 },
  { id: "piaseczno", name: "Piaseczno", voivodeshipId: "mazowieckie", lat: 52.08, lon: 21.02 },
  { id: "pruszkow", name: "Pruszków", voivodeshipId: "mazowieckie", lat: 52.17, lon: 20.81 },
  { id: "legionowo", name: "Legionowo", voivodeshipId: "mazowieckie", lat: 52.41, lon: 20.93 },
  { id: "wloclawek", name: "Włocławek", voivodeshipId: "kujawsko-pomorskie", lat: 52.65, lon: 19.07 },
  { id: "rybnik", name: "Rybnik", voivodeshipId: "slaskie", lat: 50.10, lon: 18.54 },
  { id: "tychy", name: "Tychy", voivodeshipId: "slaskie", lat: 50.11, lon: 18.98 },
  { id: "dabrowa-gornicza", name: "Dąbrowa Górnicza", voivodeshipId: "slaskie", lat: 50.32, lon: 19.19 },
  { id: "bochnia", name: "Bochnia", voivodeshipId: "malopolskie", lat: 49.97, lon: 20.43 },
  { id: "wieliczka", name: "Wieliczka", voivodeshipId: "malopolskie", lat: 49.99, lon: 20.06 },
  { id: "olkusz", name: "Olkusz", voivodeshipId: "malopolskie", lat: 50.28, lon: 19.56 },
  { id: "swidnica", name: "Świdnica", voivodeshipId: "dolnoslaskie", lat: 50.84, lon: 16.49 },
  { id: "swiebodzin", name: "Świebodzin", voivodeshipId: "lubuskie", lat: 52.25, lon: 15.53 },
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");

export function searchHardinessCities(query: string, limit = 8): HardinessCity[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];

  return HARDINESS_CITIES.filter((c) => normalize(c.name).includes(q))
    .sort((a, b) => {
      const aStarts = normalize(a.name).startsWith(q) ? 0 : 1;
      const bStarts = normalize(b.name).startsWith(q) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return a.name.localeCompare(b.name, "pl");
    })
    .slice(0, limit);
}

export function getHardinessCityById(id: string): HardinessCity | undefined {
  return HARDINESS_CITIES.find((c) => c.id === id);
}

export function getCityZone(
  city: HardinessCity,
  voivodeshipZone: HardinessZone
): HardinessZone {
  return city.zoneOverride ?? voivodeshipZone;
}
