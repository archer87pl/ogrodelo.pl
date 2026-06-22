import type { GrowthSpecies } from "@/lib/calculators/growth";

export interface GrowthPreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  defaults: Partial<{
    species: GrowthSpecies;
    targetHeight: number;
  }>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

export const GROWTH_PRESETS: GrowthPreset[] = [
  {
    slug: "grab",
    title: "Ile rośnie grab? Kalkulator wzrostu",
    description:
      "Sprawdź wysokość grabu po 1, 2, 5 i 10 latach. Tempo wzrostu, szerokość korony i harmonogram cięcia.",
    keywords: ["ile rośnie grab", "wysokość grabu po latach", "wzrost grabu", "grab żywopłot wzrost"],
    defaults: { species: "grab" },
    intro: "Grab rośnie ok. 30 cm rocznie. Z sadzonki 60 cm pełny żywopłot 180 cm uzyskasz w 4–5 lat.",
    faq: [
      {
        question: "Ile cm rocznie rośnie grab?",
        answer: "Średnio 25–35 cm rocznie w żywoplocie. Pojedyncze drzewo może rosnąć szybciej.",
      },
    ],
    sections: [
      {
        heading: "Grab jako żywopłot",
        content:
          "Grab pospolity to najpopularniejszy żywopłot w Polsce. Liście zimują brązowe na gałęziach — daje więcej prywatności zimą niż inne liściaste gatunki.",
      },
    ],
  },
  {
    slug: "tuja",
    title: "Ile rośnie tuja? Kalkulator wzrostu",
    description:
      "Wysokość tui po 1, 2, 5 i 10 latach. Sprawdź tempo wzrostu i porównaj z zdrowszymi alternatywami.",
    keywords: ["ile rośnie tuja", "wysokość tui po latach", "tuja wzrost roczny", "tuja smaragdowa wysokość"],
    defaults: { species: "tui" },
    intro: "Tuja rośnie ok. 35 cm rocznie, ale coraz częściej pada na chorobę grzybową. Rozważ ostrokrzew lub żywotnik.",
    faq: [
      {
        question: "Ile metrów rośnie tuja rocznie?",
        answer: "Ok. 30–40 cm rocznie. Po 10 latach z sadzonki 40 cm osiągnie 3,5–4 m.",
      },
    ],
    sections: [],
  },
  {
    slug: "laurowisnia",
    title: "Wzrost laurowiśni — kalkulator",
    description: "Laurowiśnia: ile rośnie rocznie i jaką wysokość osiągnie po latach.",
    keywords: ["ile rośnie laurowiśnia", "wysokość laurowiśni", "laurowiśnia wzrost"],
    defaults: { species: "laurowisnia" },
    intro: "Laurowiśnia to jeden z najszybszych zimozielonych żywopłotów — ok. 40 cm rocznie.",
    faq: [],
    sections: [],
  },
  {
    slug: "cis",
    title: "Ile rośnie cis? Kalkulator",
    description: "Cis pospolity — wolny ale wieczny wzrost. Wysokość po latach i czas do pełnego żywopłotu.",
    keywords: ["ile rośnie cis", "cis wzrost roczny", "wysokość cisu po latach"],
    defaults: { species: "cis" },
    intro: "Cis rośnie tylko ok. 20 cm rocznie, ale żyje setki lat i tworzy gęsty zimozielony żywopłot.",
    faq: [],
    sections: [],
  },
  {
    slug: "bambus",
    title: "Wzrost bambusa — kalkulator",
    description: "Bambus rośnie do 60 cm rocznie. Sprawdź wysokość po latach i szerokość kłączy.",
    keywords: ["ile rośnie bambus", "bambus wzrost", "wysokość bambusa"],
    defaults: { species: "bambus" },
    intro: "Bambus to najszybszy żywopłot — do 60 cm rocznie w pierwszych latach.",
    faq: [],
    sections: [],
  },
  {
    slug: "wierzba",
    title: "Ile rośnie wierzba? Kalkulator",
    description: "Wierzba — rekordzista wzrostu do 80 cm rocznie. Wysokość i korona po latach.",
    keywords: ["ile rośnie wierzba", "wierzba wzrost", "wysokość wierzby"],
    defaults: { species: "wierzba" },
    intro: "Wierzba rośnie do 80 cm rocznie — najszybsze drzewo w naszym kalkulatorze.",
    faq: [],
    sections: [],
  },
  {
    slug: "brzoza",
    title: "Wzrost brzozy — kalkulator",
    description: "Brzoza brodawkowata: tempo wzrostu, wysokość po 5 i 10 latach.",
    keywords: ["ile rośnie brzoza", "brzoza wysokość", "wzrost brzozy"],
    defaults: { species: "brzoza" },
    intro: "Brzoza rośnie ok. 50 cm rocznie i osiąga 15 m — szybkie drzewo ozdobne.",
    faq: [],
    sections: [],
  },
  {
    slug: "ostrokrzew",
    title: "Wzrost ostrokrzewu — kalkulator",
    description: "Ostrokrzew kolczasty jako zamiennik tui. Wysokość po latach i tempo wzrostu.",
    keywords: ["ile rośnie ostrokrzew", "ostrokrzew wzrost", "ostrokrzew wysokość"],
    defaults: { species: "ostrokrzew" },
    intro: "Ostrokrzew rośnie ok. 25 cm rocznie — wolniejszy od tui, ale zdrowszy i dłowieczny.",
    faq: [],
    sections: [],
  },
  {
    slug: "porownanie",
    title: "Porównanie wzrostu roślin ogrodowych",
    description:
      "Która roślina rośnie najszybciej? Porównaj grab, tuja, ligustr, bambus i inne gatunki.",
    keywords: ["porównanie wzrostu roślin", "co rośnie najszybciej", "ranking wzrostu roślin"],
    defaults: {},
    intro: "Wybierz gatunek i porównaj z innymi — tabela pokazuje tempo wzrostu i wysokość po 5 i 10 latach.",
    faq: [],
    sections: [],
  },
];

export function getGrowthPreset(slug: string): GrowthPreset | undefined {
  return GROWTH_PRESETS.find((p) => p.slug === slug);
}

export function getAllGrowthPresetSlugs(): string[] {
  return GROWTH_PRESETS.map((p) => p.slug);
}
