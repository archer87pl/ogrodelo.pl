import type { GardenGoal, GardenPlanInput } from "@/lib/calculators/garden-plan";

export interface GardenPlanPreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  defaults: Partial<GardenPlanInput>;
  intro: string;
  faq: { question: string; answer: string }[];
  sections: { heading: string; content: string }[];
}

export const GARDEN_PLAN_PRESETS: GardenPlanPreset[] = [
  {
    slug: "maly-ogrod",
    title: "Plan małego ogrodu do 200 m²",
    description:
      "Generator planu małego ogrodu miejskiego: strefy, rośliny, kosztorys i harmonogram. Optymalizacja każdego m².",
    keywords: ["mały ogród plan", "ogród 100m2", "projekt małego ogrodu", "koszt małego ogrodu"],
    defaults: {
      areaM2: 120,
      goals: ["trawnik", "relaks", "kwiaty"],
      maintenance: "minimalna",
      wantsTrees: false,
    },
    intro: "Mały ogród wymaga priorytetów — mniej trawnika, więcej bylin i kompaktowych rozwiązań.",
    faq: [
      {
        question: "Ile kosztuje mały ogród 120 m²?",
        answer: "Orientacyjnie 10–18 tys. PLN w wariancie standardowym bez tarasu premium.",
      },
    ],
    sections: [],
  },
  {
    slug: "duzy-ogrod",
    title: "Plan dużego ogrodu 500+ m²",
    description:
      "Projekt dużej działki: strefy rekreacji, drzewa, żywopłot, kosztorys i fazy realizacji.",
    keywords: ["duży ogród projekt", "plan ogrodu 500m2", "ogrod duża działka"],
    defaults: {
      areaM2: 600,
      goals: ["trawnik", "relaks", "biodiversyjnosc", "prywatnosc"],
      wantsTrees: true,
      wantsHedge: true,
      hedgeLengthM: 80,
    },
    intro: "Duża działka pozwala na strefy specjalistyczne — łąka kwietna, alejki i pełnowymiarowy trawnik.",
    faq: [],
    sections: [],
  },
  {
    slug: "ogrod-prywatny",
    title: "Plan ogrodu z żywopłotem — prywatność",
    description:
      "Ogród zorientowany na prywatność: żywopłot, ekrany roślinne, koszt i harmonogram nasadzeń.",
    keywords: ["ogród prywatny", "żywopłot plan", "zasłonić sąsiada ogród", "prywatność w ogrodzie"],
    defaults: {
      areaM2: 350,
      goals: ["prywatnosc", "zywoplot", "trawnik"],
      wantsHedge: true,
      hedgeLengthM: 50,
      wantsTrees: true,
    },
    intro: "Priorytet: ekranowanie w 3–5 lat — dobór gatunku żywopłotu i optymalna długość.",
    faq: [],
    sections: [],
  },
  {
    slug: "warzywnik-domowy",
    title: "Plan ogrodu z warzywnikiem",
    description:
      "Ogród warzywniczy: grządki, kompost, nawadnianie, kosztorys i kalendarz prac sezonowych.",
    keywords: ["warzywnik domowy", "ogród warzywny plan", "grządki podwyższone koszt"],
    defaults: {
      areaM2: 250,
      goals: ["warzywa", "biodiversyjnosc"],
      wantsVegetableBed: true,
      maintenance: "aktywna",
      wantsIrrigation: true,
    },
    intro: "Warzywnik 25–30% powierzchni — reszta trawnik i rabaty zapylaczy.",
    faq: [],
    sections: [],
  },
  {
    slug: "ogrod-dla-dzieci",
    title: "Bezpieczny ogród dla dzieci — plan",
    description:
      "Ogród rodzinny: trawnik do zabaw, bezpieczne rośliny, piaskownica, kosztorys i strefy.",
    keywords: ["ogród dla dzieci", "bezpieczny ogród", "ogród rodzinny plan"],
    defaults: {
      areaM2: 300,
      goals: ["dzieci", "trawnik", "relaks"],
      hasChildren: true,
      wantsTrees: true,
      maintenance: "umiarkowana",
    },
    intro: "Miękkie trawniki, brak toksycznych roślin, strefa zabaw i cień od drzewa.",
    faq: [],
    sections: [],
  },
  {
    slug: "ogrod-niskich-kosztow",
    title: "Tani ogród — plan ekonomiczny",
    description:
      "Plan ogrodu przy ograniczonym budżecie: priorytety, tańsze materiały, fazy na 2 lata.",
    keywords: ["tani ogród", "ogród niskim kosztem", "budżetowy ogród plan"],
    defaults: {
      areaM2: 200,
      goals: ["trawnik", "niska_pielegnacja"],
      budget: "niski",
      maintenance: "minimalna",
      wantsTrees: false,
      wantsHedge: false,
    },
    intro: "Siew zamiast rolki, byliny zamiast dużych rabat, realizacja etapami.",
    faq: [],
    sections: [],
  },
  {
    slug: "ogrod-ekologiczny",
    title: "Eko-ogród — plan biodiversywny",
    description:
      "Ogród ekologiczny: łąka kwietna, deszczówka, kompost, zapylacze. Plan stref i kosztorys.",
    keywords: ["eko ogród", "ogród ekologiczny", "łąka kwietna ogród", "bioróżnorodność ogród"],
    defaults: {
      areaM2: 400,
      goals: ["biodiversyjnosc", "niska_pielegnacja", "warzywa"],
      wantsRainwater: true,
      maintenance: "umiarkowana",
    },
    intro: "Mniej trawnika, więcej łąki kwietnej, deszczówka i rośliny native.",
    faq: [],
    sections: [],
  },
  {
    slug: "ogrod-bez-pielegnacji",
    title: "Ogród bezobsługowy — plan minimalny",
    description:
      "Ogród niskiej pielęgnacji: byliny, żwir, automatyczne nawadnianie. Koszt i strefy.",
    keywords: ["ogród bezobsługowy", "niska pielęgnacja ogród", "ogród dla zapracowanych"],
    defaults: {
      areaM2: 280,
      goals: ["niska_pielegnacja", "relaks"],
      maintenance: "minimalna",
      wantsIrrigation: true,
      wantsTrees: false,
    },
    intro: "Mulcz zamiast trawnika, żywopłot z laurowiśni zamiast płotu, robot koszący.",
    faq: [],
    sections: [],
  },
  {
    slug: "ankieta",
    title: "Ankieta ogrodowa — spersonalizowany plan",
    description:
      "Wypełnij ankietę: wielkość, cele, gleba, budżet. Otrzymasz plan stref, kosztorys i harmonogram.",
    keywords: ["ankieta ogród", "generator planu ogrodu", "spersonalizowany plan ogrodu"],
    defaults: {},
    intro: "6 kroków ankiety — na końcu pełny plan z kosztorysem i rekomendacjami.",
    faq: [],
    sections: [],
  },
];

export function getGardenPlanPreset(slug: string): GardenPlanPreset | undefined {
  return GARDEN_PLAN_PRESETS.find((p) => p.slug === slug);
}

export function getAllGardenPlanPresetSlugs(): string[] {
  return GARDEN_PLAN_PRESETS.map((p) => p.slug);
}
