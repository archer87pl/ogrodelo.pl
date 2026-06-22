import type { HedgeSpecies } from "@/lib/calculators/hedge";

export interface HedgePreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  defaults: Partial<{
    species: HedgeSpecies;
    length: number;
  }>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

export const HEDGE_PRESETS: HedgePreset[] = [
  {
    slug: "grab",
    title: "Kalkulator żywopłotu z grabu",
    description:
      "Ile sadzonek grabu na żywopłot? Oblicz koszt, odstępy sadzenia i wysokość po latach. Grab — polski klasyk.",
    keywords: ["żywopłot z grabu", "ile grabu na żywopłot", "sadzenie grabu", "koszt żywopłotu grab"],
    defaults: { species: "grab", length: 10 },
    intro:
      "Grab to najpopularniejszy żywopłot w Polsce — tani, gęsty, odporny. Sadzimy co 30 cm. Liście brązowieją zimą na gałęziach.",
    faq: [
      {
        question: "Ile grabu na 10 metrów?",
        answer: "Przy odstępie 30 cm potrzebujesz 35 sadzonek (jeden rząd). Przy dwóch rzędach — 70 szt.",
      },
      {
        question: "Jak szybko rośnie grab?",
        answer: "Ok. 30 cm rocznie. Pełna prywatność (180 cm) w 4–5 lat od sadzonki 60 cm.",
      },
    ],
    sections: [
      {
        heading: "Grab liściasty czy szypułkowy?",
        content:
          "Do żywopłotów w Polsce najczęściej sadzi się grab pospolity (Carpinus betulus). Jest liściasty, ale liście zimują brązowe — daje więcej prywatności niż inne liściaste gatunki.",
      },
    ],
  },
  {
    slug: "laurowisnia",
    title: "Kalkulator żywopłotu z laurowiśni",
    description:
      "Policz sadzonki laurowiśni, koszt i czas do pełnego żywopłotu. Zimozielona, szybka, gęsta.",
    keywords: ["żywopłot laurowiśnia", "ile laurowiśni", "laurowiśnia odstępy sadzenia"],
    defaults: { species: "laurowisnia", length: 10 },
    intro:
      "Laurowiśnia to zimozielony hit — szybki wzrost (40 cm/rok), gęste liście. Sadzimy co 50 cm. Uwaga: wymaga wilgotnej gleby.",
    faq: [
      {
        question: "Ile laurowiśni na 10 metrów?",
        answer: "21 sadzonek w jednym rzędzie (co 50 cm). Dla gęstszego efektu — co 40 cm, czyli 26 szt.",
      },
    ],
    sections: [],
  },
  {
    slug: "cis",
    title: "Kalkulator żywopłotu z cisu",
    description:
      "Cis pospolity — ile sadzonek, koszt i ile lat do pełnego żywopłotu. Najtrwalszy gatunek w Polsce.",
    keywords: ["żywopłot z cisu", "cis pospolity żywopłot", "ile cisu na metr"],
    defaults: { species: "cis", length: 10 },
    intro:
      "Cis żyje setki lat, jest zimozielony i bardzo gęsty. Wolny wzrost (20 cm/rok), ale efekt na dekady. Sadzimy co 40 cm.",
    faq: [
      {
        question: "Czy cis nadaje się na żywopłot?",
        answer:
          "Tak — to jeden z najlepszych gatunków. Gęsty, zimozielony, odporny. Minus: wolny wzrost i trujące jagody.",
      },
    ],
    sections: [],
  },
  {
    slug: "ligustr",
    title: "Kalkulator żywopłotu z ligustra",
    description:
      "Ligustr — szybki, tani żywopłot. Oblicz sadzonki, koszt i wzrost roczny.",
    keywords: ["żywopłot ligustr", "ligustr pospolity", "ile ligustra na żywopłot"],
    defaults: { species: "ligustr", length: 10 },
    intro: "Ligustr rośnie 35 cm rocznie — jeden z najszybszych liściastych żywopłotów. Tani i łatwy w pielęgnacji.",
    faq: [],
    sections: [],
  },
  {
    slug: "bambus",
    title: "Kalkulator żywopłotu z bambusa",
    description:
      "Bambus na żywopłot — najszybszy wzrost. Policz sadzonki, koszt i barierę korzeniową.",
    keywords: ["żywopłot z bambusa", "bambus na płot", "ile bambusa na metr"],
    defaults: { species: "bambus", length: 10 },
    intro:
      "Bambus rośnie do 50 cm rocznie — najszybsza prywatność. Wymaga barier korzeniowych i osłoniętego miejsca.",
    faq: [
      {
        question: "Czy bambus jest mrozoodporny w Polsce?",
        answer:
          "Odmiany Phyllostachys (np. bissetii) znoszą do -20°C. Na północy Polski wybieraj mrozoodporne odmiany i osłaniaj pierwsze zimy.",
      },
    ],
    sections: [],
  },
  {
    slug: "ostrokrzew",
    title: "Żywopłot z ostrokrzewu — kalkulator",
    description:
      "Ostrokrzew kolczasty zamiast tui. Zimozielony, odporny, kolczasty. Policz sadzonki i koszt.",
    keywords: ["ostrokrzew żywopłot", "ostrokrzew kolczasty sadzenie", "zamiennik tui żywopłot"],
    defaults: { species: "ostrokrzew", length: 10 },
    intro:
      "Ostrokrzew to świetny zamiennik chorej tui — zimozielony, odporny na mróz i suszę, z jadalnymi owocami.",
    faq: [],
    sections: [],
  },
  {
    slug: "bukszpan",
    title: "Kalkulator żywopłotu z bukszpanu",
    description:
      "Bukszpan — niski, elegancki żywopłot. Ile sadzonek, koszt i czas formowania.",
    keywords: ["bukszpan żywopłot", "ile bukszpanu na metr", "niski żywopłot bukszpan"],
    defaults: { species: "bukszpan", length: 5 },
    intro: "Bukszpan idealny do niskich żywopłotów (do 1,5 m). Wolny wzrost, ale piękny i łatwy do formowania.",
    faq: [],
    sections: [],
  },
  {
    slug: "ile-sadzonek",
    title: "Ile sadzonek na żywopłot? Kalkulator",
    description:
      "Szybko oblicz liczbę sadzonek na żywopłot dowolnej długości i gatunku. Wzór i tabela odstępów.",
    keywords: ["ile sadzonek na żywopłot", "odstępy sadzenia żywopłot", "kalkulator sadzonek"],
    defaults: { length: 20 },
    intro: "Wpisz długość i gatunek — kalkulator poda dokładną liczbę sadzonek z uwzględnieniem gęstości i liczby rzędów.",
    faq: [],
    sections: [],
  },
  {
    slug: "koszt-zywoplotu",
    title: "Ile kosztuje żywopłot? Kalkulator",
    description:
      "Oblicz pełny koszt żywopłotu: sadzonki, ziemia, mulcz, nawóz. Porównaj gatunki.",
    keywords: ["koszt żywopłotu", "ile kosztuje żywopłot", "cena żywopłotu za metr"],
    defaults: { length: 20 },
    intro: "Pełny kosztorys żywopłotu — nie tylko sadzonki, ale też ziemia, mulcz i nawóz startowy.",
    faq: [],
    sections: [],
  },
];

export function getHedgePreset(slug: string): HedgePreset | undefined {
  return HEDGE_PRESETS.find((p) => p.slug === slug);
}

export function getAllHedgePresetSlugs(): string[] {
  return HEDGE_PRESETS.map((p) => p.slug);
}
