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
    slug: "grab-vs-bukszpan",
    title: "Grab czy bukszpan? Klasyczny vs elegancki żywopłot",
    description:
      "Grab vs bukszpan: wzrost, cięcie, choroby, koszt sadzonki i czas do pełnego żywopłotu. Który wybrać?",
    keywords: [
      "grab czy bukszpan",
      "grab vs bukszpan",
      "żywopłot grab bukszpan",
      "bukszpan czy grab",
    ],
    defaults: { speciesA: "grab", speciesB: "bukszpan" },
    intro:
      "Dwa popularne liściaste żywopłoty — grab szybszy i tańszy, bukszpan wolniejszy ale gęstszy po latach. Bukszpan podatny na pielistę.",
    faq: [
      {
        question: "Grab czy bukszpan — który zdrowszy?",
        answer:
          "Grab jest znacznie zdrowszy — ocena chorób 1/5 vs 4/5 u bukszpanu (pielista bukszpanowa). Grab to bezpieczniejszy wybór długoterminowy.",
      },
    ],
    sections: [
      {
        heading: "Grab — kiedy wybrać?",
        content:
          "Szybki efekt, niski koszt, liście brązowieją zimą na gałęziach (prywatność zimą). Wymaga 2 cięć rocznie.",
      },
      {
        heading: "Bukszpan — kiedy wybrać?",
        content:
          "Formalny, gęsty żywopłot formowy — ale wolny wzrost (15 cm/rok) i ryzyko chorób. Lepszy na niskie obwódki.",
      },
    ],
  },
  {
    slug: "grab-vs-berberys",
    title: "Grab czy berberys? Żywopłot liściasty",
    description:
      "Grab vs berberys: wysokość, gęstość, kolce, wzrost i zastosowanie na małym ogrodzie.",
    keywords: ["grab czy berberys", "grab vs berberys", "żywopłot grab berberys"],
    defaults: { speciesA: "grab", speciesB: "berberys" },
    intro: "Grab na wysoki ekran (do 4 m), berberys na niski, kolczasty żywopłot (do 1,5 m). Oba zdrowe i tanie.",
    faq: [],
    sections: [],
  },
  {
    slug: "grab-vs-laurowisnia",
    title: "Grab czy laurowiśnia? Liściasty vs zimozielony",
    description:
      "Grab vs laurowiśnia: zimozieloność, wzrost, cień, koszt i prywatność zimą. Porównanie żywopłotów.",
    keywords: [
      "grab czy laurowiśnia",
      "grab vs laurowisnia",
      "żywopłot grab laurowiśnia",
      "laurowiśnia czy grab",
    ],
    defaults: { speciesA: "grab", speciesB: "laurowisnia" },
    intro:
      "Laurowiśnia zimozielona i szybsza, grab tańszy i zdrowszy — liście brązowieją zimą, ale zostają na gałęziach.",
    faq: [
      {
        question: "Który żywopłot tańszy — grab czy laurowiśnia?",
        answer: "Grab — sadzonka od ok. 12 zł vs 18 zł laurowiśni. Przy 10 mb żywopłotu różnica to ok. 60–100 zł.",
      },
    ],
    sections: [],
  },
  {
    slug: "grab-vs-tuja",
    title: "Grab czy tuja? Zdrowa alternatywa",
    description:
      "Grab vs tuja: choroby, wzrost, zimozieloność, koszt i czas do pełnego żywopłotu. Zamiennik tui.",
    keywords: ["grab czy tuja", "grab vs tuja", "zamiennik tui grab", "żywopłot zamiast tui"],
    defaults: { speciesA: "grab", speciesB: "tuja" },
    intro:
      "Grab to najpopularniejsza zdrowa alternatywa dla tui — brak chorób grzybowych, podobny czas do pełnego ekranu.",
    faq: [],
    sections: [],
  },
  {
    slug: "hortensja-vs-tuja",
    title: "Hortensja czy tuja? Krzew kwiatowy vs żywopłot",
    description:
      "Hortensja vs tuja: cel w ogrodzie, wzrost, woda, prywatność i choroby. Kiedy kwiaty, kiedy ekran?",
    keywords: ["hortensja czy tuja", "hortensja vs tuja", "krzew czy żywopłot"],
    defaults: { speciesA: "hortensja", speciesB: "tuja" },
    intro:
      "Różne cele — hortensja ozdobna z kwiatami, tuja ekran zielony. Hortensja nie zastąpi gęstego żywopłotu.",
    faq: [],
    sections: [],
  },
  {
    slug: "ostrokrzew-vs-berberys",
    title: "Ostrokrzew czy berberys? Kolczaste krzewy",
    description:
      "Ostrokrzew vs berberys: zimozieloność, kolce, wzrost, wysokość i zastosowanie przy ogrodzeniu.",
    keywords: ["ostrokrzew czy berberys", "ostrokrzew vs berberys", "krzew kolczasty"],
    defaults: { speciesA: "ostrokrzew", speciesB: "berberys" },
    intro: "Oba kolczaste i zdrowe — ostrokrzew wyższy i zimozielony, berberys niższy z jesiennymi barwami.",
    faq: [],
    sections: [],
  },
  {
    slug: "bukszpan-vs-laurowisnia",
    title: "Bukszpan czy laurowiśnia? Zimozielone żywopłoty",
    description:
      "Bukszpan vs laurowiśnia: wzrost, cięcie, choroby, cena i efekt po 5 latach. Porównanie parametrów.",
    keywords: ["bukszpan czy laurowiśnia", "bukszpan vs laurowisnia", "zimozielony żywopłot"],
    defaults: { speciesA: "bukszpan", speciesB: "laurowisnia" },
    intro: "Laurowiśnia szybsza i łatwiejsza w uprawie, bukszpan wolniejszy ale gęstszy formowo — oba wymagają cięcia.",
    faq: [],
    sections: [],
  },
  {
    slug: "forsycja-vs-pigwowiec",
    title: "Forsycja czy pigwowiec? Wczesnowiosenne kwitnienie",
    description:
      "Forsycja vs pigwowiec: termin kwitnienia, wzrost, pielęgnacja i efekt w małym ogrodzie.",
    keywords: ["forsycja czy pigwowiec", "forsycja vs pigwowiec", "krzew kwitnący wiosną"],
    defaults: { speciesA: "forsycja", speciesB: "pigwowiec" },
    intro: "Pigwowiec kwitnie najwcześniej (marzec), forsycja żółtymi kwiatami w kwietniu — oba kompaktowe.",
    faq: [],
    sections: [],
  },
  {
    slug: "kalina-vs-deren",
    title: "Kalina czy deren? Krzewy ozdobne",
    description:
      "Kalina vs deren: kwiaty, jesienne owoce, zimowe pędy, wzrost i wymagania glebowe.",
    keywords: ["kalina czy deren", "kalina vs deren", "krzew ozdobny ogród"],
    defaults: { speciesA: "kalina", speciesB: "deren" },
    intro: "Kalina białe kwiaty i czerwone jagody, deren czerwone pędy zimą — oba rodzime i odporne.",
    faq: [],
    sections: [],
  },
  {
    slug: "bez-vs-hortensja",
    title: "Bez czy hortensja? Pachnące vs letnie kwiaty",
    description:
      "Lilak (bez) vs hortensja: zapach, okres kwitnienia, woda, wzrost i pielęgnacja.",
    keywords: ["bez czy hortensja", "lilak vs hortensja", "krzew kwitnący lato"],
    defaults: { speciesA: "bez", speciesB: "hortensja" },
    intro: "Bez pachnie w maju, hortensja kwitnie całe lato — różne potrzeby wodne i stanowisko.",
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
    slug: "grab",
    title: "Grab — parametry, wzrost i żywopłot",
    description:
      "Grab pospolity: wzrost, cięcie, choroby, odległość od płotu. Porównanie z bukszpanem i laurowiśnią.",
    keywords: [
      "grab wzrost",
      "grab żywopłot",
      "grab pospolity ogród",
      "ile rośnie grab",
      "grab vs bukszpan",
    ],
    defaults: { speciesA: "grab", speciesB: "bukszpan" },
    intro: "Pełny profil grabu — najzdrowszy polski klasyk na liściasty żywopłot. Porównany z bukszpanem.",
    faq: [
      {
        question: "Ile cm rocznie rośnie grab?",
        answer: "Średnio 25–35 cm rocznie w żywoplocie. Pełny ekran 180 cm uzyskasz w ok. 4–5 lat.",
      },
    ],
    sections: [
      {
        heading: "Grab jako żywopłot",
        content:
          "Grab pospolity to najpopularniejszy liściasty żywopłot w Polsce. Liście zimują brązowe na gałęziach — więcej prywatności zimą niż u opadających liściastych.",
      },
    ],
  },
  {
    slug: "porownanie",
    title: "Porównaj dowolne krzewy",
    description:
      "Wybierz dwa krzewy i porównaj wzrost, wodę, żywopłot, choroby i koszt. 13 gatunków, wykresy i tabela.",
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
