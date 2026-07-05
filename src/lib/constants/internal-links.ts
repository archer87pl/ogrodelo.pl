import { CALCULATORS, getCalculatorBySlug } from "./calculators";
import { TOOL_COUNT } from "./site-stats";

export interface InternalLink {
  href: string;
  label: string;
  description: string;
  icon?: string;
}

export interface LinkHub {
  title: string;
  description: string;
  links: InternalLink[];
}

/** Semantyczne powiązania między narzędziami (SEO topical clusters) */
const RELATED_SLUGS: Record<string, string[]> = {
  "generator-planu-ogrodu": [
    "projektant-ogrodu",
    "kalkulator-zywoplotu",
    "kalkulator-nawadniania",
    "porownywarka-drzew",
    "porownywarka-krzewow",
    "kalkulator-trawnika",
    "kalkulator-deszczowki",
  ],
  "kalkulator-nawadniania": [
    "kalkulator-deszczowki",
    "kalkulator-trawnika",
    "kalkulator-nawozenia",
    "generator-planu-ogrodu",
    "kalkulator-robota-koszacego",
    "mapa-stref-mrozoodpornosci",
  ],
  "kalkulator-zywoplotu": [
    "kalkulator-wzrostu",
    "porownywarka-krzewow",
    "kalkulator-prywatnosci",
    "alternatywy-dla-tui",
    "generator-planu-ogrodu",
  ],
  "kalkulator-wzrostu": [
    "porownywarka-drzew",
    "porownywarka-krzewow",
    "kalkulator-zywoplotu",
    "kalkulator-cienia",
    "kalkulator-prywatnosci",
    "mapa-stref-mrozoodpornosci",
  ],
  "porownywarka-drzew": [
    "porownywarka-krzewow",
    "kalkulator-cienia",
    "kalkulator-wzrostu",
    "generator-planu-ogrodu",
    "kalkulator-prywatnosci",
  ],
  "porownywarka-krzewow": [
    "kalkulator-zywoplotu",
    "alternatywy-dla-tui",
    "kalkulator-wzrostu",
    "porownywarka-drzew",
    "generator-planu-ogrodu",
  ],
  "alternatywy-dla-tui": [
    "porownywarka-krzewow",
    "kalkulator-zywoplotu",
    "kalkulator-wzrostu",
    "porownywarka-drzew",
    "mapa-stref-mrozoodpornosci",
  ],
  "kalkulator-prywatnosci": [
    "kalkulator-zywoplotu",
    "kalkulator-wzrostu",
    "porownywarka-krzewow",
    "porownywarka-drzew",
    "generator-planu-ogrodu",
  ],
  "kalkulator-trawnika": [
    "kalkulator-nawadniania",
    "kalkulator-nawozenia",
    "kalkulator-robota-koszacego",
    "generator-planu-ogrodu",
  ],
  "kalkulator-nawozenia": [
    "kalkulator-trawnika",
    "kalkulator-nawadniania",
    "kalkulator-robota-koszacego",
  ],
  "kalkulator-deszczowki": [
    "kalkulator-nawadniania",
    "generator-planu-ogrodu",
    "kalkulator-trawnika",
  ],
  "kalkulator-cienia": [
    "porownywarka-drzew",
    "kalkulator-wzrostu",
    "generator-planu-ogrodu",
  ],
  "kalkulator-robota-koszacego": [
    "kalkulator-trawnika",
    "kalkulator-nawadniania",
    "kalkulator-nawozenia",
  ],
  "kalendarz-ogrodnika": [
    "kalkulator-nawozenia",
    "kalkulator-trawnika",
    "kalkulator-nawadniania",
    "kalkulator-zywoplotu",
    "generator-planu-ogrodu",
    "porownywarka-krzewow",
  ],
  "problemy-ogrodowe": [
    "alternatywy-dla-tui",
    "kalkulator-nawadniania",
    "kalkulator-trawnika",
    "porownywarka-krzewow",
    "kalkulator-wapnowania",
    "kalendarz-ogrodnika",
  ],
  "katalog-kwitnienia": [
    "porownywarka-krzewow",
    "porownywarka-drzew",
    "kalkulator-wzrostu",
    "kalendarz-ogrodnika",
    "generator-planu-ogrodu",
    "projektant-ogrodu",
    "alternatywy-dla-tui",
  ],
  "projektant-ogrodu": [
    "generator-planu-ogrodu",
    "kalkulator-zywoplotu",
    "kalkulator-trawnika",
    "porownywarka-drzew",
    "kalkulator-nawadniania",
  ],
  "kalkulator-ziemi-i-kory": [
    "kalkulator-trawnika",
    "kalkulator-kostki-brukowej",
    "kalkulator-laki-kwietnej",
    "generator-planu-ogrodu",
  ],
  "kalkulator-kostki-brukowej": [
    "kalkulator-ziemi-i-kory",
    "kalkulator-ogrodzenia",
    "projektant-ogrodu",
    "kalkulator-kosztow-ogrodu",
  ],
  "kalkulator-ogrodzenia": [
    "kalkulator-zywoplotu",
    "kalkulator-prywatnosci",
    "kalkulator-kostki-brukowej",
    "odleglosc-sadzenia-od-granicy",
  ],
  "kalkulator-oczka-wodnego": [
    "kalkulator-deszczowki",
    "projektant-ogrodu",
    "generator-planu-ogrodu",
    "kalkulator-budek-legowych",
  ],
  "kalkulator-kompostownika": [
    "kalkulator-nawozenia",
    "kalkulator-siewu-warzyw",
    "kalkulator-plonow-warzywnika",
    "kalkulator-laki-kwietnej",
  ],
  "kalkulator-siewu-warzyw": [
    "kalkulator-plonow-warzywnika",
    "kalkulator-kompostownika",
    "kalkulator-nawadniania",
    "kalendarz-ogrodnika",
  ],
  "kalkulator-wapnowania": [
    "kalkulator-nawozenia",
    "kalkulator-trawnika",
    "kalkulator-siewu-warzyw",
    "kalendarz-ogrodnika",
  ],
  "kalkulator-kosztow-ogrodu": [
    "kalkulator-nawadniania",
    "kalkulator-robota-koszacego",
    "kalkulator-deszczowki",
    "kalkulator-laki-kwietnej",
  ],
  "wycinka-drzewa": [
    "odleglosc-sadzenia-od-granicy",
    "porownywarka-drzew",
    "kalkulator-cienia",
    "kalkulator-wzrostu",
  ],
  "odleglosc-sadzenia-od-granicy": [
    "wycinka-drzewa",
    "kalkulator-zywoplotu",
    "kalkulator-cienia",
    "kalkulator-prywatnosci",
    "kalkulator-ogrodzenia",
  ],
  "dotacja-moja-woda": [
    "kalkulator-deszczowki",
    "kalkulator-nawadniania",
    "kalkulator-kosztow-ogrodu",
  ],
  "kalkulator-laki-kwietnej": [
    "kalkulator-trawnika",
    "katalog-kwitnienia",
    "kalkulator-ziemi-i-kory",
    "kalkulator-budek-legowych",
  ],
  "rosliny-bezpieczne-dla-zwierzat": [
    "katalog-kwitnienia",
    "porownywarka-krzewow",
    "alternatywy-dla-tui",
    "generator-planu-ogrodu",
  ],
  "kalkulator-budek-legowych": [
    "kalkulator-laki-kwietnej",
    "katalog-kwitnienia",
    "kalkulator-oczka-wodnego",
    "kalendarz-ogrodnika",
  ],
  "kalkulator-plonow-warzywnika": [
    "kalkulator-siewu-warzyw",
    "kalkulator-kompostownika",
    "kalkulator-nawadniania",
    "generator-planu-ogrodu",
  ],
  "zgadnij-rosline": [
    "katalog-kwitnienia",
    "porownywarka-krzewow",
    "porownywarka-drzew",
    "kalendarz-ogrodnika",
  ],
};

/** Wysokowartościowe podstrony presetów — linkowanie głębokie */
/** Strony treściowe spoza rejestru kalkulatorów */
const STATIC_RELATED: Record<string, InternalLink> = {
  "mapa-stref-mrozoodpornosci": {
    href: "/mapa-stref-mrozoodpornosci",
    label: "Mapa stref mrozoodporności USDA",
    description: "Interaktywna mapa stref klimatycznych dla 16 województw Polski",
    icon: "🗺️",
  },
  "problemy-ogrodowe": {
    href: "/problemy-ogrodowe",
    label: "Problemy ogrodowe — diagnoza",
    description: "Choroby, szkodniki i kreator diagnozy objawów",
    icon: "🔍",
  },
  "ogrod-teraz": {
    href: "/ogrod-teraz",
    label: "Co robić w ogrodzie teraz",
    description: "Aktualne prace ogrodowe na bieżący miesiąc",
    icon: "📅",
  },
};

const PRESET_LINKS: Record<string, InternalLink[]> = {
  "generator-planu-ogrodu": [
    {
      href: "/generator-planu-ogrodu/maly-ogrod",
      label: "Plan małego ogrodu",
      description: "Optymalizacja do 200 m²",
    },
    {
      href: "/generator-planu-ogrodu/ogrod-prywatny",
      label: "Ogród z żywopłotem",
      description: "Prywatność i ekranowanie",
    },
    {
      href: "/generator-planu-ogrodu/warzywnik-domowy",
      label: "Ogród warzywniczy",
      description: "Grządki i nawadnianie",
    },
    {
      href: "/generator-planu-ogrodu/ogrod-dla-dzieci",
      label: "Ogród dla dzieci",
      description: "Bezpieczne strefy zabaw",
    },
  ],
  "kalkulator-nawadniania": [
    {
      href: "/kalkulator-nawadniania/trawnik",
      label: "Nawadnianie trawnika",
      description: "Litry, mm i harmonogram",
    },
    {
      href: "/kalkulator-nawadniania/warzywnik",
      label: "Podlewanie warzywnika",
      description: "Kroplówka i wilgotność",
    },
    {
      href: "/kalkulator-nawadniania/kroplowanie",
      label: "Nawadnianie kroplujące",
      description: "Oszczędność wody",
    },
  ],
  "kalkulator-zywoplotu": [
    {
      href: "/kalkulator-zywoplotu/grab",
      label: "Żywopłot z grabu",
      description: "Koszt i czas do pełnej wysokości",
    },
    {
      href: "/kalkulator-zywoplotu/laurowisnia",
      label: "Żywopłot laurowiśni",
      description: "Szybki zimozielony ekran",
    },
    {
      href: "/kalkulator-zywoplotu/koszt-zywoplotu",
      label: "Koszt żywopłotu",
      description: "Kosztorys za metr bieżący",
    },
  ],
  "kalkulator-wzrostu": [
    {
      href: "/mapa-stref-mrozoodpornosci",
      label: "Mapa stref USDA",
      description: "Sprawdź strefę mrozoodporności w swoim regionie",
    },
    {
      href: "/kalkulator-wzrostu/grab",
      label: "Wzrost grabu",
      description: "Wysokość po latach",
    },
    {
      href: "/kalkulator-wzrostu/tuja",
      label: "Ile rośnie tuja",
      description: "Tempo i maksymalna wysokość",
    },
    {
      href: "/kalkulator-wzrostu/porownanie",
      label: "Porównanie wzrostu",
      description: "Ranking 12 gatunków",
    },
  ],
  "porownywarka-drzew": [
    {
      href: "/porownywarka-drzew/dab-vs-sosna",
      label: "Dąb vs sosna",
      description: "Klasyk — wzrost i korzenie",
    },
    {
      href: "/porownywarka-drzew/modrzew-vs-sosna",
      label: "Modrzew vs sosna",
      description: "Iglate do ogrodu",
    },
    {
      href: "/porownywarka-drzew/kasztan-vs-lipa",
      label: "Kasztan vs lipa",
      description: "Drzewa alejowe",
    },
  ],
  "porownywarka-krzewow": [
    {
      href: "/porownywarka-krzewow/laurowisnia-vs-tuja",
      label: "Laurowiśnia vs tuja",
      description: "Który żywopłot wybrać",
    },
    {
      href: "/porownywarka-krzewow/tuja-vs-ostrokrzew",
      label: "Tuja vs ostrokrzew",
      description: "Zdrowy zamiennik tui",
    },
    {
      href: "/porownywarka-krzewow/ostrokrzew",
      label: "Ostrokrzew — profil",
      description: "Parametry i wzrost",
    },
    {
      href: "/porownywarka-krzewow/tawula",
      label: "Tawuła — profil",
      description: "Kwitnienie i pielęgnacja",
    },
    {
      href: "/porownywarka-krzewow/kalina",
      label: "Kalina — profil",
      description: "Kwiaty i jagody",
    },
    {
      href: "/porownywarka-krzewow/deren",
      label: "Deren — profil",
      description: "Zimowe pędy",
    },
  ],
  "alternatywy-dla-tui": [
    {
      href: "/porownywarka-krzewow/laurowisnia-vs-tuja",
      label: "Laurowiśnia czy tuja",
      description: "Porównanie parametrów",
    },
    {
      href: "/porownywarka-krzewow/tuja-vs-ostrokrzew",
      label: "Tuja vs ostrokrzew",
      description: "Zdrowie i wzrost",
    },
    {
      href: "/kalkulator-zywoplotu/laurowisnia",
      label: "Kalkulator laurowiśni",
      description: "Sadzonki i koszt",
    },
  ],
  "kalkulator-trawnika": [
    {
      href: "/kalkulator-nawadniania/trawnik",
      label: "Ile wody na trawnik",
      description: "Po założeniu — nawadnianie",
    },
    {
      href: "/kalkulator-robota-koszacego/trawnik-500m2",
      label: "Robot na 500 m²",
      description: "Dobór i opłacalność",
    },
    {
      href: "/generator-planu-ogrodu/maly-ogrod",
      label: "Plan małego ogrodu",
      description: "Strefy i kosztorys",
    },
  ],
  "kalkulator-robota-koszacego": [
    {
      href: "/kalkulator-robota-koszacego/trawnik-500m2",
      label: "Robot na 500 m²",
      description: "Typowy dom jednorodzinny",
    },
    {
      href: "/kalkulator-robota-koszacego/oplacalnosc",
      label: "Opłacalność robota",
      description: "Zwrot inwestycji w latach",
    },
    {
      href: "/kalkulator-robota-koszacego/husqvarna-automower",
      label: "Husqvarna Automower",
      description: "Dobór modelu",
    },
    {
      href: "/kalkulator-robota-koszacego/montaz-przewod",
      label: "Montaż przewodu",
      description: "Instalacja krok po kroku",
    },
    {
      href: "/kalkulator-robota-koszacego/robot-vs-firma",
      label: "Robot vs firma",
      description: "Porównanie kosztów",
    },
  ],
  "kalkulator-prywatnosci": [
    {
      href: "/generator-planu-ogrodu/ogrod-prywatny",
      label: "Plan ogrodu prywatnego",
      description: "Żywopłot i ekrany",
    },
    {
      href: "/kalkulator-zywoplotu",
      label: "Kalkulator żywopłotu",
      description: "Wysokość i sadzonki",
    },
  ],
  "kalendarz-ogrodnika": [
    {
      href: "/kalendarz-ogrodnika/wertykulacja-trawnika",
      label: "Wertykulacja trawnika — kiedy?",
      description: "Maj, czerwiec lub wrzesień",
    },
    {
      href: "/kalendarz-ogrodnika/przycinanie-jabloni",
      label: "Cięcie jabłoni",
      description: "Styczeń i luty — formujące cięcie",
    },
    {
      href: "/kalendarz-ogrodnika/nawozenie-hortensji",
      label: "Nawożenie hortensji",
      description: "Kwiecień, maj, lipiec",
    },
    {
      href: "/kalendarz-ogrodnika/maj",
      label: "Kalendarz — maj",
      description: "Wertykulacja i wysadzanie pomidorów",
    },
  ],
  "katalog-kwitnienia": [
    {
      href: "/katalog-kwitnienia/rosliny-kwitnace-w-maju",
      label: "Co kwitnie w maju?",
      description: "Drzewa, krzewy i byliny",
    },
    {
      href: "/katalog-kwitnienia/kwitnace-calym-latem",
      label: "Kwitnące całe lato",
      description: "Czerwiec–wrzesień",
    },
    {
      href: "/katalog-kwitnienia/rosliny-dla-pszczol",
      label: "Rośliny dla pszczół",
      description: "Miododajne gatunki",
    },
    {
      href: "/katalog-kwitnienia/biale-kwiaty-do-cienia",
      label: "Białe kwiaty do cienia",
      description: "Byliny i krzewy",
    },
  ],
};

export const LINK_HUBS: LinkHub[] = [
  {
    title: "Zaplanuj ogród",
    description: "Od koncepcji do kosztorysu",
    links: [
      linkFromSlug("projektant-ogrodu"),
      linkFromSlug("generator-planu-ogrodu"),
      linkFromSlug("kalkulator-trawnika"),
      linkFromSlug("kalkulator-prywatnosci"),
    ],
  },
  {
    title: "Woda i trawnik",
    description: "Nawadnianie i utrzymanie",
    links: [
      linkFromSlug("kalkulator-nawadniania"),
      linkFromSlug("kalkulator-deszczowki"),
      linkFromSlug("kalkulator-nawozenia"),
      linkFromSlug("kalkulator-robota-koszacego"),
      linkFromSlug("kalendarz-ogrodnika"),
    ],
  },
  {
    title: "Rośliny i żywopłoty",
    description: "Dobór gatunków i wzrost",
    links: [
      linkFromSlug("kalkulator-zywoplotu"),
      linkFromSlug("kalkulator-wzrostu"),
      linkFromSlug("alternatywy-dla-tui"),
      linkFromSlug("porownywarka-krzewow"),
      linkFromSlug("katalog-kwitnienia"),
    ],
  },
  {
    title: "Drzewa i cień",
    description: "Porównania i nasadzenia",
    links: [
      linkFromSlug("porownywarka-drzew"),
      linkFromSlug("kalkulator-cienia"),
      linkFromSlug("wycinka-drzewa"),
      linkFromSlug("odleglosc-sadzenia-od-granicy"),
    ],
  },
  {
    title: "Budowa i materiały",
    description: "Nawierzchnie, ogrodzenia i grunt",
    links: [
      linkFromSlug("kalkulator-ziemi-i-kory"),
      linkFromSlug("kalkulator-kostki-brukowej"),
      linkFromSlug("kalkulator-ogrodzenia"),
      linkFromSlug("kalkulator-oczka-wodnego"),
      linkFromSlug("kalkulator-kosztow-ogrodu"),
    ],
  },
  {
    title: "Eko-ogród i warzywnik",
    description: "Natura, plony i oszczędności",
    links: [
      linkFromSlug("kalkulator-laki-kwietnej"),
      linkFromSlug("kalkulator-siewu-warzyw"),
      linkFromSlug("kalkulator-plonow-warzywnika"),
      linkFromSlug("kalkulator-kompostownika"),
      linkFromSlug("rosliny-bezpieczne-dla-zwierzat"),
      linkFromSlug("kalkulator-budek-legowych"),
    ],
  },
];

function linkFromSlug(slug: string): InternalLink {
  const calc = getCalculatorBySlug(slug)!;
  return {
    href: `/${slug}`,
    label: calc.shortTitle,
    description: calc.description.slice(0, 90) + (calc.description.length > 90 ? "…" : ""),
    icon: calc.icon,
  };
}

export function getRelatedTools(currentSlug: string): InternalLink[] {
  const slugs = RELATED_SLUGS[currentSlug] ?? [];
  const links: InternalLink[] = [];
  for (const slug of slugs) {
    const staticLink = STATIC_RELATED[slug];
    if (staticLink) {
      links.push(staticLink);
      continue;
    }
    const calc = getCalculatorBySlug(slug);
    if (!calc) continue;
    links.push({
      href: `/${slug}`,
      label: calc.title,
      description: calc.description,
      icon: calc.icon,
    });
  }
  return links;
}

export function getPresetLinks(currentSlug: string): InternalLink[] {
  return PRESET_LINKS[currentSlug] ?? [];
}

export function getAllToolsLink(): InternalLink {
  return {
    href: "/#kalkulatory",
    label: "Wszystkie kalkulatory ogrodowe",
    description: `Pełna lista ${TOOL_COUNT} darmowych narzędzi na Ogrodelo.pl`,
    icon: "🌿",
  };
}

export function getCalculatorLinks(): InternalLink[] {
  return CALCULATORS.map((c) => ({
    href: `/${c.slug}`,
    label: c.shortTitle,
    description: c.description,
    icon: c.icon,
  }));
}

/** Grupy do stopki — klastry tematyczne */
export const FOOTER_LINK_GROUPS: { title: string; slugs: string[] }[] = [
  {
    title: "Planowanie",
    slugs: [
      "projektant-ogrodu",
      "generator-planu-ogrodu",
      "kalendarz-ogrodnika",
      "kalkulator-prywatnosci",
      "kalkulator-trawnika",
    ],
  },
  {
    title: "Woda i trawnik",
    slugs: [
      "kalkulator-nawadniania",
      "kalkulator-deszczowki",
      "kalkulator-nawozenia",
      "kalkulator-robota-koszacego",
    ],
  },
  {
    title: "Rośliny",
    slugs: [
      "kalkulator-zywoplotu",
      "kalkulator-wzrostu",
      "katalog-kwitnienia",
      "alternatywy-dla-tui",
      "porownywarka-krzewow",
      "porownywarka-drzew",
      "kalkulator-cienia",
    ],
  },
  {
    title: "Budowa i prawo",
    slugs: [
      "kalkulator-ziemi-i-kory",
      "kalkulator-kostki-brukowej",
      "kalkulator-ogrodzenia",
      "kalkulator-oczka-wodnego",
      "wycinka-drzewa",
      "odleglosc-sadzenia-od-granicy",
      "dotacja-moja-woda",
    ],
  },
  {
    title: "Eko i warzywnik",
    slugs: [
      "kalkulator-laki-kwietnej",
      "kalkulator-siewu-warzyw",
      "kalkulator-plonow-warzywnika",
      "kalkulator-kompostownika",
      "kalkulator-wapnowania",
      "kalkulator-kosztow-ogrodu",
      "rosliny-bezpieczne-dla-zwierzat",
      "kalkulator-budek-legowych",
      "zgadnij-rosline",
    ],
  },
];
