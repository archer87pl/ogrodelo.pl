import {
  MONTH_LABELS,
  MONTH_LOCATIVE_SLUGS,
  type FloweringCatalogFilters,
  type FlowerColor,
  type PlantCategory,
  filterFloweringPlants,
  FLOWERING_PLANTS_LIST,
} from "./flowering-plants";

export interface FloweringCatalogPreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  intro: string;
  faq: { question: string; answer: string }[];
  filters: FloweringCatalogFilters;
}

const COLOR_SLUGS: { color: FlowerColor; slug: string; adj: string }[] = [
  { color: "bialy", slug: "biale-kwiaty", adj: "białe kwiaty" },
  { color: "zolty", slug: "zolte-kwiaty", adj: "żółte kwiaty" },
  { color: "czerwony", slug: "czerwone-kwiaty", adj: "czerwone kwiaty" },
  { color: "rozowy", slug: "rozowe-kwiaty", adj: "różowe kwiaty" },
  { color: "fioletowy", slug: "fioletowe-kwiaty", adj: "fioletowe kwiaty" },
  { color: "niebieski", slug: "niebieskie-kwiaty", adj: "niebieskie kwiaty" },
  { color: "pomaranczowy", slug: "pomaranczowe-kwiaty", adj: "pomarańczowe kwiaty" },
];

function monthPresetsFixed(): FloweringCatalogPreset[] {
  return MONTH_LABELS.map((m) => {
    const locSlug = MONTH_LOCATIVE_SLUGS[m.num];
    return {
      slug: `rosliny-kwitnace-w-${locSlug}`,
      title: `Rośliny kwitnące w ${m.locative} — katalog`,
      description: `Co kwitnie w ${m.locative}? Lista drzew, krzewów i bylin z kwitnieniem w ${m.name.toLowerCase()}. Kolor, zapach, pszczoły — filtruj i porównuj.`,
      keywords: [
        `co kwitnie w ${m.locative}`,
        `rośliny kwitnące w ${m.locative}`,
        `kwiaty w ${m.locative}`,
        `kwitnienie ${m.name.toLowerCase()}`,
      ],
      intro: `Katalog roślin kwitnących w ${m.locative}. Użyj filtrów koloru i cech, by dobrać gatunek do swojego ogrodu.`,
      faq: [
        {
          question: `Co posadzić, żeby kwitnęło w ${m.locative}?`,
          answer: `Poniżej lista ${filterFloweringPlants(FLOWERING_PLANTS_LIST, { months: [m.num] }).length}+ gatunków z widocznym kwitnieniem w ${m.locative}. Sprawdź też sąsiednie miesiące, by przedłużyć sezon.`,
        },
      ],
      filters: { months: [m.num], monthsMatch: "any" as const },
    };
  });
}

function categoryMonthPresets(
  category: PlantCategory,
  plural: string,
  slugPrefix: string
): FloweringCatalogPreset[] {
  return MONTH_LABELS.map((m) => {
    const locSlug = MONTH_LOCATIVE_SLUGS[m.num];
    return {
      slug: `${slugPrefix}-w-${locSlug}`,
      title: `${plural.charAt(0).toUpperCase() + plural.slice(1)} kwitnące w ${m.locative}`,
      description: `Jakie ${plural} kwitną w ${m.locative}? Katalog z harmonogramem kwitnienia i poradami sadzenia.`,
      keywords: [
        `${plural} kwitnące w ${m.locative}`,
        `${slugPrefix} ${m.name.toLowerCase()}`,
        `kwitnienie ${plural}`,
      ],
      intro: `${plural.charAt(0).toUpperCase() + plural.slice(1)} z kwitnieniem w ${m.locative} — wybierz gatunek według koloru, wysokości i nasłonecznienia.`,
      faq: [],
      filters: { months: [m.num], monthsMatch: "any" as const, categories: [category] },
    };
  });
}

const CURATED_PRESETS: FloweringCatalogPreset[] = [
  {
    slug: "kwitnace-calym-latem",
    title: "Rośliny kwitnące całe lato — czerwiec do września",
    description:
      "Które rośliny kwitną całe lato? Budleja, hortensja, lawenda, jeżówka i więcej — katalog z tabelą kwitnienia miesiąc po miesiącu.",
    keywords: [
      "rośliny kwitnące całe lato",
      "kwiaty całe lato",
      "co kwitnie latem",
      "kwitnienie czerwiec wrzesień",
    ],
    intro:
      "Rośliny kwitnące nieprzerwanie od czerwca do września — idealne na rabaty, które mają wyglądać efektownie przez całe wakacje.",
    faq: [
      {
        question: "Co kwitnie najdłużej w ogrodzie?",
        answer:
          "Budleja i werbena kwitną do października. Hortensja, lawenda i jeżówka — czerwiec–wrzesień. Róża i powojnik przy dobrym cięciu — od czerwca do pierwszych mrozów.",
      },
    ],
    filters: { months: [6, 7, 8, 9], monthsMatch: "all" },
  },
  {
    slug: "krzewy-kwitnace-od-maja-do-sierpnia",
    title: "Krzewy kwitnące od maja do sierpnia",
    description:
      "Krzewy z długim kwitnieniem: maj–sierpień. Hortensja, budleja, lawenda, tawuła — katalog z filtrami.",
    keywords: [
      "krzewy kwitnące od maja do sierpnia",
      "krzewy kwitnące latem",
      "długie kwitnienie krzewów",
    ],
    intro: "Krzewy, które kwitną przez co najmniej cztery miesiące letnie — mniej pracy, więcej koloru.",
    faq: [],
    filters: { months: [5, 6, 7, 8], monthsMatch: "all", categories: ["krzew"] },
  },
  {
    slug: "rosliny-dla-pszczol",
    title: "Rośliny miododajne i przyjazne pszczołom",
    description:
      "Rośliny dla pszczół: miododajne drzewa, krzewy i byliny. Katalog z harmonogramem kwitnienia — wybierz miesiąc.",
    keywords: [
      "rośliny dla pszczół",
      "rośliny miododajne",
      "kwiaty dla pszczół",
      "pszczoły ogród",
    ],
    intro:
      "Ogród przyjazny pszczołom przez cały sezon — od leszczyny w lutym po wrzos we wrześniu. Zaznacz miesiąc, by uzupełnić pożytki.",
    faq: [
      {
        question: "Jakie rośliny są najlepsze dla pszczół?",
        answer:
          "Lipa, akacja, budleja, lawenda, jeżówka, wrzos, krokus i bez — to klasyki miododajne. Sadź grupy tego samego gatunku — pszczoły efektywniej zbierają pyłek.",
      },
    ],
    filters: { beeFriendly: true, honeyPlant: true },
  },
  {
    slug: "rosliny-dla-motyli",
    title: "Rośliny dla motyli — katalog kwitnienia",
    description:
      "Kwiaty przyciągające motyle: budleja, jeżówka, wrzos, werbena. Filtruj po miesiącu kwitnienia.",
    keywords: ["rośliny dla motyli", "kwiaty dla motyli", "motyle w ogrodzie"],
    intro: "Motyle szukają płaskich kwiatostanów i nektaru — budleja to numer jeden, ale jest wiele innych gatunków.",
    faq: [],
    filters: { butterflyFriendly: true },
  },
  {
    slug: "pachnace-rosliny",
    title: "Pachnące rośliny ogrodowe — katalog",
    description:
      "Najpiękniej pachnące rośliny: lilak, lawenda, róża, konwalia, pigwowiec. Kiedy kwitną i jak pachną.",
    keywords: ["pachnące rośliny", "pachnące kwiaty", "rośliny zapachowe ogród"],
    intro: "Ogród zmysłów — rośliny o wyraźnym zapachu, posegregowane według miesiąca kwitnienia.",
    faq: [],
    filters: { scent: "scented" },
  },
  {
    slug: "kwitnienie-zima",
    title: "Rośliny kwitnące zimą i wczesną wiosną",
    description:
      "Co kwitnie zimą? Oczar, ciemiernik, śnieżyczka, leszczyna. Katalog roślin kwitnących od stycznia do marca.",
    keywords: [
      "rośliny kwitnące zimą",
      "kwiaty zimą",
      "kwitnienie styczeń luty",
      "wczesna wiosna kwiaty",
    ],
    intro: "Nieliczne rośliny odważą się kwitnąć w chłodzie — ale właśnie one dają nadzieję po zimie.",
    faq: [],
    filters: { winterBloom: true },
  },
  {
    slug: "drzewa-kwitnace-na-rozowo",
    title: "Drzewa kwitnące na różowo — katalog",
    description:
      "Różowe kwiaty drzew: wiśnia piłkowana, magnolia, jabłoń ozdobna. Kiedy kwitną i jak wysokie dorastają.",
    keywords: [
      "drzewa kwitnące na różowo",
      "różowe kwiaty drzew",
      "wiśnia ozdobna",
      "magnolia różowa",
    ],
    intro: "Różowa chmura kwiatów wiosną — drzewa ozdobne do każdego ogrodu, od małych po alejowe.",
    faq: [],
    filters: { categories: ["drzewo"], colors: ["rozowy"] },
  },
  {
    slug: "biale-kwiaty-do-cienia",
    title: "Białe kwiaty do cienia — byliny i krzewy",
    description:
      "Białe kwitnące rośliny do cienia: konwalia, hosta, zawilec, ciemiernik. Katalog z harmonogramem.",
    keywords: [
      "białe kwiaty do cienia",
      "rośliny kwitnące w cieniu",
      "byliny do cienia białe",
    ],
    intro: "Biel przebija w zacienieniu — te rośliny kwitną pod drzewami i na północnych rabatach.",
    faq: [],
    filters: { colors: ["bialy"], light: ["cien", "polcien"] },
  },
  {
    slug: "owoce-ozdobne",
    title: "Rośliny z ozdobnymi owocami — katalog",
    description:
      "Krzewy i drzewa z ozdobnymi owocami: kalina, deren, pigwowiec, rokitnik. Kwitnienie + jesienne owoce.",
    keywords: ["ozdobne owoce krzewy", "rośliny z owocami ozdobnymi", "kalina owoce"],
    intro: "Podwójna ozdoba — kwiaty wiosną i kolorowe owoce jesienią.",
    faq: [],
    filters: { ornamentalFruit: true },
  },
  {
    slug: "przebarwienie-jesienne",
    title: "Rośliny z jesiennym przebarwieniem liści",
    description:
      "Drzewa i krzewy z jesienną feerią barw: deren, kalina, brzoza, berberys. Kwitnienie + jesień.",
    keywords: ["przebarwienie jesienne", "rośliny jesienne kolory", "jesienna feeria barw"],
    intro: "Kwitnienie to nie wszystko — te rośliny zachwycają też jesienią.",
    faq: [],
    filters: { autumnColor: true },
  },
  {
    slug: "pnacza-kwitnace",
    title: "Pnącza kwitnące — glicynia, powojnik i więcej",
    description:
      "Kwitnące pnącza na pergolę i mur: glicynia, powojnik, powojnik jesienny. Harmonogram kwitnienia.",
    keywords: ["pnącza kwitnące", "glicynia kwitnienie", "powojnik kiedy kwitnie"],
    intro: "Pionowy akcent kwitnienia — pergola, fasada lub płot żywy.",
    faq: [],
    filters: { categories: ["pnacze"] },
  },
  {
    slug: "byliny-kwitnace",
    title: "Byliny kwitnące — katalog z harmonogramem",
    description:
      "Byliny na rabaty: piwonia, jeżówka, floks, rudbekia, sedum. Filtruj po miesiącu i kolorze.",
    keywords: ["byliny kwitnące", "byliny kwiaty", "rabaty bylinowe"],
    intro: "Serce letnich rabat — byliny od wiosny do jesieni.",
    faq: [],
    filters: { categories: ["bylina"] },
  },
  {
    slug: "rosliny-cebulowe-wiosna",
    title: "Rośliny cebulowe kwitnące wiosną",
    description: "Tulipany, narcyzy, krokusy, lilie — katalog roślin cebulowych z kalendarzem kwitnienia.",
    keywords: ["rośliny cebulowe", "tulipany kwitnienie", "narcyzy kiedy kwitną"],
    intro: "Wiosenny wybuch koloru z cebulek posadzonych jesienią.",
    faq: [],
    filters: { categories: ["cebula"] },
  },
];

function colorPresets(): FloweringCatalogPreset[] {
  return COLOR_SLUGS.map(({ color, slug, adj }) => ({
    slug,
    title: `${adj.charAt(0).toUpperCase() + adj.slice(1)} — katalog roślin`,
    description: `Rośliny z ${adj}: drzewa, krzewy i byliny. Sprawdź, w którym miesiącu kwitną.`,
    keywords: [adj, `rośliny ${adj}`, `kwiaty ${color}`],
    intro: `Katalog roślin z ${adj}. Zaznacz miesiąc, by zawęzić wyniki.`,
    faq: [],
    filters: { colors: [color] },
  }));
}

function colorShadePresets(): FloweringCatalogPreset[] {
  return COLOR_SLUGS.filter((c) => c.color === "bialy" || c.color === "rozowy" || c.color === "fioletowy").map(
    ({ color, slug, adj }) => ({
      slug: `${slug}-do-cienia`,
      title: `${adj.charAt(0).toUpperCase() + adj.slice(1)} do cienia`,
      description: `${adj.charAt(0).toUpperCase() + adj.slice(1)} rosnące w cieniu i półcieniu — katalog kwitnienia.`,
      keywords: [`${adj} cień`, `${adj} półcień`, `rośliny do cienia ${color}`],
      intro: `Rośliny z ${adj} tolerujące zacienienie — pod drzewa i na północne ściany.`,
      faq: [],
      filters: { colors: [color], light: ["cien", "polcien"] },
    })
  );
}

function rangePresets(): FloweringCatalogPreset[] {
  const ranges: { slug: string; title: string; months: number[]; label: string }[] = [
    { slug: "kwitnace-wiosna", title: "Rośliny kwitnące wiosną", months: [3, 4, 5], label: "wiosną" },
    { slug: "kwitnace-latem", title: "Rośliny kwitnące latem", months: [6, 7, 8], label: "latem" },
    { slug: "kwitnace-jesienia", title: "Rośliny kwitnące jesienią", months: [9, 10, 11], label: "jesienią" },
    { slug: "kwitnace-od-maja-do-wrzesnia", title: "Rośliny kwitnące od maja do września", months: [5, 6, 7, 8, 9], label: "maj–wrzesień" },
  ];
  return ranges.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: `Katalog roślin kwitnących ${r.label}. Harmonogram miesiąc po miesiącu z filtrami koloru i cech.`,
    keywords: [r.title.toLowerCase(), `kwitnienie ${r.label}`, "katalog kwiatów"],
    intro: `Rośliny z kwitnieniem w okresie ${r.label} — zaznacz dodatkowe cechy, by znaleźć idealny gatunek.`,
    faq: [],
    filters: { months: r.months, monthsMatch: "any" as const },
  }));
}

export const FLOWERING_CATALOG_PRESETS: FloweringCatalogPreset[] = [
  ...monthPresetsFixed(),
  ...categoryMonthPresets("drzewo", "drzewa", "drzewa-kwitnace"),
  ...categoryMonthPresets("krzew", "krzewy", "krzewy-kwitnace"),
  ...colorPresets(),
  ...colorShadePresets(),
  ...rangePresets(),
  ...CURATED_PRESETS,
];

// Deduplicate by slug (safety)
const seen = new Set<string>();
export const FLOWERING_PRESETS_UNIQUE = FLOWERING_CATALOG_PRESETS.filter((p) => {
  if (seen.has(p.slug)) return false;
  seen.add(p.slug);
  return true;
});

export function getFloweringPreset(slug: string): FloweringCatalogPreset | undefined {
  return FLOWERING_PRESETS_UNIQUE.find((p) => p.slug === slug);
}

export function getAllFloweringPresetSlugs(): string[] {
  return FLOWERING_PRESETS_UNIQUE.map((p) => p.slug);
}
