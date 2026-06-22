import { CALCULATORS, getCalculatorBySlug } from "./calculators";

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
};

/** Wysokowartościowe podstrony presetów — linkowanie głębokie */
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
      href: "/generator-planu-ogrodu/maly-ogrod",
      label: "Plan małego ogrodu",
      description: "Strefy i kosztorys",
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
};

export const LINK_HUBS: LinkHub[] = [
  {
    title: "Zaplanuj ogród",
    description: "Od koncepcji do kosztorysu",
    links: [
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
    ],
  },
  {
    title: "Drzewa i cień",
    description: "Porównania i nasadzenia",
    links: [
      linkFromSlug("porownywarka-drzew"),
      linkFromSlug("kalkulator-cienia"),
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
    description: "Pełna lista 13 darmowych narzędzi na Ogrodelo.pl",
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
      "generator-planu-ogrodu",
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
      "alternatywy-dla-tui",
      "porownywarka-krzewow",
      "porownywarka-drzew",
      "kalkulator-cienia",
    ],
  },
];
