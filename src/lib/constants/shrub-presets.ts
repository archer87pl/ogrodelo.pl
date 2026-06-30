import type { ShrubSpecies } from "@/lib/calculators/shrub-comparator";

export interface ShrubPreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  defaults: Partial<{
    speciesA: ShrubSpecies;
    speciesB: ShrubSpecies;
  }>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

export const SHRUB_PRESETS: ShrubPreset[] = [
  {
    slug: "laurowisnia-vs-tuja",
    title: "Laurowiśnia czy tuja? Porównanie żywopłotów",
    description:
      "Laurowiśnia vs tuja: wzrost, zdrowie, cień, koszt i prywatność. Który żywopłot wybrać zamiast chorej tui?",
    keywords: [
      "laurowiśnia czy tuja",
      "laurowisnia vs tuja",
      "co zamiast tui",
      "żywopłot laurowiśnia tuja",
    ],
    defaults: { speciesA: "laurowisnia", speciesB: "tuja" },
    intro:
      "Najczęstsze dylematy ogrodników: szybka laurowiśnia vs tania tuja. Sprawdź choroby, wzrost i zimozieloność.",
    faq: [
      {
        question: "Czy laurowiśnia rośnie szybciej niż tuja?",
        answer: "Tak — ok. 40 cm/rok vs 35 cm/rok. Po 3 latach laurowiśnia daje gęstszy ekran.",
      },
      {
        question: "Która zdrowsza — laurowiśnia czy tuja?",
        answer: "Laurowiśnia mniej podatna na choroby grzybowe. Tuja ma ocenę podatności 4/5 — rozważ ostrokrzew.",
      },
    ],
    sections: [
      {
        heading: "Laurowiśnia — kiedy wybrać?",
        content: "Szybki żywopłot, tolerancja cienia, zdrowa zimozielona forma. Wymaga przycinania 1–2× rocznie.",
      },
      {
        heading: "Tuja — kiedy wybrać?",
        content: "Niższy koszt, wąska forma, klasyczny wygląd. Ryzyko choroby — monitoruj i rozważ zamienniki.",
      },
    ],
  },
  {
    slug: "tuja-vs-ostrokrzew",
    title: "Tuja czy ostrokrzew? Zdrowy żywopłot",
    description:
      "Tuja vs ostrokrzew: choroby, wzrost, kolce, cena sadzonki i czas do pełnego żywopłotu.",
    keywords: ["tuja czy ostrokrzew", "ostrokrzew vs tuja", "zamiennik tui zdrowy"],
    defaults: { speciesA: "tuja", speciesB: "ostrokrzew" },
    intro: "Ostrokrzew to najzdrowsza zimozielona alternatywa dla tui — wolniejszy, ale bez chorób grzybowych.",
    faq: [],
    sections: [],
  },
  {
    slug: "laurowisnia-vs-ostrokrzew",
    title: "Laurowiśnia czy ostrokrzew? Zimozielone",
    description:
      "Porównanie dwóch zdrowych zamienników tui: wzrost, gęstość, kolce i pielęgnacja.",
    keywords: ["laurowiśnia czy ostrokrzew", "laurowisnia vs ostrokrzew", "zimozielony żywopłot"],
    defaults: { speciesA: "laurowisnia", speciesB: "ostrokrzew" },
    intro: "Obie zimozielone i zdrowe — laurowiśnia szybsza, ostrokrzew bardziej dekoracyjny zimą (jagody).",
    faq: [],
    sections: [],
  },
  {
    slug: "berberys-vs-bukszpan",
    title: "Berberys czy bukszpan? Niski żywopłot",
    description:
      "Berberys vs bukszpan: wysokość, cięcie, choroby, kolce i dopasowanie do małego ogrodu.",
    keywords: ["berberys czy bukszpan", "berberys vs bukszpan", "niski żywopłot krzewy"],
    defaults: { speciesA: "berberys", speciesB: "bukszpan" },
    intro: "Dwa krzewy na niski żywopłot — berberys szybszy i kolorowy, bukszpan elegancki ale wolny i podatny na choroby.",
    faq: [],
    sections: [],
  },
  {
    slug: "hortensja-vs-forsycja",
    title: "Hortensja czy forsycja? Krzewy kwitnące",
    description:
      "Hortensja vs forsycja: kwiaty, woda, wzrost, pielęgnacja i efekt w małym ogrodzie.",
    keywords: ["hortensja czy forsycja", "hortensja vs forsycja", "krzew kwitnący ogród"],
    defaults: { speciesA: "hortensja", speciesB: "forsycja" },
    intro: "Forsycja kwitnie pierwsza wiosną, hortensja przez całe lato — różne potrzeby wodne.",
    faq: [],
    sections: [],
  },
  {
    slug: "bez-vs-kalina",
    title: "Bez czy kalina? Pachnące krzewy",
    description:
      "Lilak (bez) vs kalina: kwiaty, wzrost, żywopłot, jagody i wymagania glebowe.",
    keywords: ["bez czy kalina", "lilak vs kalina", "krzew kwiatowy ogród"],
    defaults: { speciesA: "bez", speciesB: "kalina" },
    intro: "Bez pachnie intensywnie w maju, kalina białe kwiaty i czerwone jagody jesienią.",
    faq: [],
    sections: [],
  },
  {
    slug: "pigwowiec-vs-deren",
    title: "Pigwowiec czy deren? Kompaktowe krzewy",
    description:
      "Pigwowiec vs deren: wczesne kwiaty, wzrost, żywopłot i zimowa dekoracyjność.",
    keywords: ["pigwowiec czy deren", "pigwowiec vs deren", "krzew przy ogrodzeniu"],
    defaults: { speciesA: "pigwowiec", speciesB: "deren" },
    intro: "Pigwowiec kwitnie najwcześniej (marzec), deren ozdabia czerwonymi pędami zimą.",
    faq: [],
    sections: [],
  },
  {
    slug: "tawula-vs-berberys",
    title: "Tawuła czy berberys? Mały ogród",
    description:
      "Dwa niskie krzewy rabatowe: wzrost, kwiaty, pielęgnacja i dopasowanie do małej przestrzeni.",
    keywords: ["tawuła czy berberys", "tawula vs berberys", "krzew mały ogród"],
    defaults: { speciesA: "tawula", speciesB: "berberys" },
    intro: "Oba idealne na małą działkę — tawuła kwiaty latem, berberys kolce i jesienne barwy.",
    faq: [],
    sections: [],
  },
  {
    slug: "laurowisnia",
    title: "Laurowiśnia — parametry, wzrost i żywopłot",
    description:
      "Laurowiśnia zwyczajna: wzrost, cięcie, choroby, odległość od płotu. Porównanie z tuią.",
    keywords: ["laurowiśnia wzrost", "laurowiśnia żywopłot", "laurowisnia ogród", "ile rośnie laurowiśnia"],
    defaults: { speciesA: "laurowisnia", speciesB: "tuja" },
    intro: "Pełny profil laurowiśni — najpopularniejszy zdrowy żywopłot zimozielony w Polsce.",
    faq: [],
    sections: [],
  },
  {
    slug: "tuja",
    title: "Tuja — wzrost, choroby i pielęgnacja",
    description:
      "Tuja zachodnia: tempo wzrostu, podatność na chorobę, cięcie i alternatywy. Porównanie z laurowiśnią.",
    keywords: ["tuja wzrost", "tuja choroba", "tuja żywopłot", "ile rośnie tuja"],
    defaults: { speciesA: "tuja", speciesB: "laurowisnia" },
    intro: "Profil tui — z oceną ryzyka chorobowego i porównaniem ze zdrowszą laurowiśnią.",
    faq: [],
    sections: [],
  },
  {
    slug: "ostrokrzew",
    title: "Ostrokrzew — zdrowy zamiennik tui",
    description:
      "Ostrokrzew kolczasty: wzrost, żywopłot, kolce, mróz i koszt. Porównanie z tuią i laurowiśnią.",
    keywords: ["ostrokrzew żywopłot", "ostrokrzew wzrost", "ostrokrzew zamiennik tui"],
    defaults: { speciesA: "ostrokrzew", speciesB: "tuja" },
    intro: "Najzdrowsza zimozielona opcja na żywopłot — wolniejszy start, ale bez problemów grzybowych.",
    faq: [],
    sections: [],
  },
  {
    slug: "tawula",
    title: "Tawuła japońska — wzrost, kwitnienie i pielęgnacja",
    description:
      "Tawuła japońska: kwitnienie w czerwcu, wzrost, cięcie i zastosowanie na rabatach. Porównanie z berberysen.",
    keywords: ["tawuła japońska", "tawula kwitnienie", "tawuła ogród", "spiraea japonica"],
    defaults: { speciesA: "tawula", speciesB: "berberys" },
    intro:
      "Tawuła to niski, odporny krzew z różowymi kwiatostanami w maju i czerwcu — idealny na małe ogrody i skarpy.",
    faq: [
      {
        question: "Kiedy kwitnie tawuła japońska?",
        answer: "Głównie w maju i czerwcu — różowe kwiatostany na końcach pędów. Przycinaj zaraz po kwitnieniu.",
      },
    ],
    sections: [
      {
        heading: "Tawuła w ogrodzie",
        content:
          "Sadź w pełnym słońcu lub półcieniu. Odmiany „Goldflame” i „Anthony Waterer” różnią się kolorem liści i wysokością (30–120 cm).",
      },
    ],
  },
  {
    slug: "kalina",
    title: "Kalina koralowa — kwitnienie, owoce i uprawa",
    description:
      "Kalina koralowa: białe kwiaty w maju, czerwone jagody jesienią, wzrost i wymagania. Porównanie z bezem.",
    keywords: ["kalina koralowa", "kalina kwitnienie", "viburnum opulus", "kalina ogród"],
    defaults: { speciesA: "kalina", speciesB: "bez" },
    intro:
      "Rodzimy krzew z białymi kwiatami w maju i czerwonymi owocami jesienią — wartościowy dla ptaków i zapylaczy.",
    faq: [
      {
        question: "Kiedy kwitnie kalina koralowa?",
        answer: "W maju i czerwcu — białe kwiaty w płaskich baldachach. Jagody dojrzewają we wrześniu.",
      },
    ],
    sections: [
      {
        heading: "Kalina a gleba",
        content:
          "Rośnie na wilgotnych, żyznych glebach — nad wodą, na skrajach lasu. Toleruje półcień.",
      },
    ],
  },
  {
    slug: "deren",
    title: "Deren świdy — kwitnienie, zimowe pędy i żywopłot",
    description:
      "Deren świdy: żółte kwiaty w maju, czerwone pędy zimą, wzrost i cięcie. Porównanie z pigwowcem.",
    keywords: ["deren świdy", "deren kwitnienie", "cornus alba", "deren czerwone pędy"],
    defaults: { speciesA: "deren", speciesB: "pigwowiec" },
    intro:
      "Deren kwitnie dyskretnymi żółtymi kwiatami w maju, a jesienią i zimą dekoruje czerwonymi lub żółtymi pędami.",
    faq: [
      {
        question: "Kiedy kwitnie deren świdy?",
        answer: "W maju i czerwcu — drobne żółte kwiaty. Największą ozdobą są kolorowe pędy zimą po cięciu.",
      },
    ],
    sections: [
      {
        heading: "Cięcie derenia",
        content:
          "Co 2–3 lata usuń stare pędy u podstawy — wtedy młode pędy mają intensywniejszy kolor zimą.",
      },
    ],
  },
  {
    slug: "porownanie",
    title: "Porównaj dowolne krzewy",
    description:
      "Wybierz dwa krzewy i porównaj wzrost, wodę, żywopłot, choroby i koszt. 12 gatunków, wykresy i tabela.",
    keywords: ["porównanie krzewów", "porównywarka krzewów", "który krzew do ogrodu", "krzewy ogrodowe ranking"],
    defaults: {},
    intro: "Wybierz dwa gatunki — pełna tabela, wykres wzrostu na 20 lat i dopasowanie do ogrodu.",
    faq: [],
    sections: [],
  },
];

export function getShrubPreset(slug: string): ShrubPreset | undefined {
  return SHRUB_PRESETS.find((p) => p.slug === slug);
}

export function getAllShrubPresetSlugs(): string[] {
  return SHRUB_PRESETS.map((p) => p.slug);
}

export function getShrubPairSlug(a: ShrubSpecies, b: ShrubSpecies): string | null {
  const forward = `${a}-vs-${b}`;
  const backward = `${b}-vs-${a}`;
  if (SHRUB_PRESETS.some((p) => p.slug === forward)) return forward;
  if (SHRUB_PRESETS.some((p) => p.slug === backward)) return backward;
  return null;
}
