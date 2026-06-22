export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  icon: string;
  featured?: boolean;
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "kalkulator-nawadniania",
    title: "Kalkulator nawadniania ogrodu",
    shortTitle: "Nawadnianie",
    description:
      "Najdokładniejszy kalkulator nawadniania: litry, mm, harmonogram, pogoda, koszt wody i zbiornik na deszczówkę. Trawnik, warzywnik, kroplówka i więcej.",
    keywords: [
      "nawadnianie ogrodu",
      "kalkulator podlewania",
      "ile wody na ogród",
      "harmonogram nawadniania",
      "kalkulator nawadniania trawnika",
      "ile litrów wody na trawnik",
      "koszt podlewania ogrodu",
    ],
    icon: "💧",
    featured: true,
  },
  {
    slug: "kalkulator-zywoplotu",
    title: "Kalkulator żywopłotu",
    shortTitle: "Żywopłot",
    description:
      "12 gatunków, wykres wzrostu, kosztorys i harmonogram cięcia. Policz sadzonki, koszt i czas do pełnej prywatności.",
    keywords: [
      "kalkulator żywopłotu",
      "ile sadzonek na żywopłot",
      "koszt żywopłotu",
      "wysokość żywopłotu",
      "żywopłot grab kalkulator",
      "odstępy sadzenia żywopłot",
      "porównanie żywopłotów",
    ],
    icon: "🌿",
    featured: true,
  },
  {
    slug: "kalkulator-prywatnosci",
    title: "Kalkulator prywatności ogrodu",
    shortTitle: "Prywatność",
    description:
      "Dowiedz się, jak wysokie rośliny posadzić, by zasłonić widok sąsiada. Symulacja sezonowa wzrostu.",
    keywords: [
      "prywatność w ogrodzie",
      "zasłonić sąsiada",
      "wysokość roślin prywatność",
      "ogród prywatny",
    ],
    icon: "🏡",
  },
  {
    slug: "kalkulator-nawozenia",
    title: "Kalkulator nawożenia trawnika",
    shortTitle: "Nawożenie",
    description:
      "Oblicz ilość nawozu, koszt i harmonogram nawożenia trawnika w zależności od rodzaju trawy i nawozu.",
    keywords: [
      "nawożenie trawnika",
      "ile nawozu na trawnik",
      "harmonogram nawożenia",
      "kalkulator nawozu",
    ],
    icon: "🌱",
  },
  {
    slug: "kalkulator-deszczowki",
    title: "Kalkulator zbiornika na deszczówkę",
    shortTitle: "Deszczówka",
    description:
      "Policz ile litrów deszczówki zbierzesz rocznie i jaki zbiornik wybrać. Na ile dni wystarczy na podlewanie.",
    keywords: [
      "zbiornik na deszczówkę",
      "kalkulator deszczówki",
      "ile deszczówki zebrać",
      "podlewanie deszczówką",
    ],
    icon: "🌧️",
  },
  {
    slug: "kalkulator-cienia",
    title: "Kalkulator cienia od drzewa",
    shortTitle: "Cień",
    description:
      "Oblicz powierzchnię zacienienia w różnych miesiącach na podstawie wysokości drzewa i szerokości korony.",
    keywords: [
      "cień od drzewa",
      "zacienienie ogrodu",
      "kalkulator cienia",
      "nasłonecznienie ogrodu",
    ],
    icon: "🌳",
  },
  {
    slug: "kalkulator-wzrostu",
    title: "Kalkulator wzrostu roślin",
    shortTitle: "Wzrost roślin",
    description:
      "Sprawdź wysokość grabu, tui, laurowiśni, cis, bambusa i wierzby po latach. Wykres wzrostu, porównanie 12 gatunków i harmonogram cięcia.",
    keywords: [
      "wzrost roślin",
      "ile rośnie grab",
      "wysokość tui po latach",
      "kalkulator wzrostu",
      "ile rośnie laurowiśnia",
      "porównanie wzrostu roślin",
      "wysokość roślin po latach",
    ],
    icon: "📈",
    featured: true,
  },
  {
    slug: "kalkulator-trawnika",
    title: "Kalkulator zakładania trawnika",
    shortTitle: "Trawnik",
    description:
      "Policz ilość nasion, ziemi, nawozu i całkowity koszt założenia trawnika od podstaw.",
    keywords: [
      "zakładanie trawnika",
      "ile nasion na trawnik",
      "koszt trawnika",
      "kalkulator trawnika",
    ],
    icon: "🟢",
  },
  {
    slug: "kalkulator-robota-koszacego",
    title: "Kalkulator robota koszącego",
    shortTitle: "Robot koszący",
    description:
      "Dobierz robota koszącego do powierzchni, nachylenia i przeszkód. Porównaj opłacalność z koszeniem ręcznym.",
    keywords: [
      "robot koszący",
      "kalkulator robota koszącego",
      "jaki robot koszący",
      "opłacalność robota koszącego",
    ],
    icon: "🤖",
  },
  {
    slug: "generator-planu-ogrodu",
    title: "Generator planu ogrodu — ankieta i kosztorys",
    shortTitle: "Plan ogrodu",
    description:
      "Spersonalizowany plan ogrodu: ankieta 6 kroków, strefy, rośliny, kosztorys PLN i harmonogram 4 faz. Mały ogród, warzywnik, prywatność i więcej.",
    keywords: [
      "generator planu ogrodu",
      "plan ogrodu online",
      "projekt ogrodu",
      "koszt założenia ogrodu",
      "jak zaplanować ogród",
      "ankieta ogrodowa",
      "kosztorys ogrodu",
    ],
    icon: "📋",
    featured: true,
  },
  {
    slug: "porownywarka-krzewow",
    title: "Porównywarka krzewów — laurowiśnia vs tuja i więcej",
    shortTitle: "Porównywarka krzewów",
    description:
      "Porównaj 12 krzewów: laurowiśnia, tuja, ostrokrzew, berberys, hortensja i więcej. Wzrost, żywopłot, choroby, woda — wykresy i tabela.",
    keywords: [
      "porównywarka krzewów",
      "porównanie krzewów",
      "laurowiśnia czy tuja",
      "krzew na żywopłot",
      "zamiennik tui krzew",
      "który krzew do ogrodu",
    ],
    icon: "🌿",
    featured: true,
  },
  {
    slug: "porownywarka-drzew",
    title: "Porównywarka drzew — dąb vs sosna i więcej",
    shortTitle: "Porównywarka drzew",
    description:
      "Porównaj 16 gatunków drzew: wzrost na 50 lat, woda, korzenie, cień, koszt sadzonki. Dąb vs sosna, kasztan, modrzew — wykresy i tabela.",
    keywords: [
      "porównywarka drzew",
      "porównanie drzew",
      "dąb czy sosna",
      "dab vs sosna",
      "które drzewo do ogrodu",
      "wzrost drzew porównanie",
      "drzewo przy domu",
    ],
    icon: "🌳",
    featured: true,
  },
  {
    slug: "alternatywy-dla-tui",
    title: "Co posadzić zamiast tui?",
    shortTitle: "Zamiast tui",
    description:
      "Znajdź zimozielone alternatywy dla tui — zdrowsze, odporne i piękne. Dobierz według strefy klimatycznej i wysokości.",
    keywords: [
      "zamiennik tui",
      "co zamiast tui",
      "alternatywy dla tui",
      "choroba tui zamiennik",
    ],
    icon: "🔄",
    featured: true,
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
