import { CALENDAR_MONTHS, type CalendarMonth } from "./garden-calendar";

export interface SeasonalGuide {
  monthSlug: string;
  pathSlug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  weatherNote: string;
  highlights: string[];
  priorityTools: { href: string; label: string }[];
}

function guideFromMonth(month: CalendarMonth): SeasonalGuide {
  const topTasks = month.tasks
    .filter((t) => t.priority === "wysoki")
    .slice(0, 4)
    .map((t) => t.title);

  const toolLinks: { href: string; label: string }[] = [];
  const seen = new Set<string>();
  for (const task of month.tasks) {
    if (task.relatedLink && !seen.has(task.relatedLink.href)) {
      seen.add(task.relatedLink.href);
      toolLinks.push(task.relatedLink);
    }
    if (toolLinks.length >= 4) break;
  }

  const defaultTools: Record<number, { href: string; label: string }[]> = {
    1: [
      { href: "/kalendarz-ogrodnika/styczen", label: "Kalendarz — styczeń" },
      { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
    ],
    2: [
      { href: "/kalendarz-ogrodnika/luty", label: "Kalendarz — luty" },
      { href: "/kalkulator-siewu-warzyw", label: "Kalkulator siewu" },
    ],
    3: [
      { href: "/kalkulator-wapnowania", label: "Kalkulator wapnowania" },
      { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
    ],
    4: [
      { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      { href: "/katalog-kwitnienia", label: "Katalog kwitnienia" },
    ],
    5: [
      { href: "/kalkulator-zywoplotu", label: "Kalkulator żywopłotu" },
      { href: "/porownywarka-krzewow", label: "Porównywarka krzewów" },
    ],
    6: [
      { href: "/kalkulator-nawadniania/trawnik", label: "Nawadnianie trawnika" },
      { href: "/kalkulator-deszczowki", label: "Kalkulator deszczówki" },
    ],
    7: [
      { href: "/kalkulator-nawadniania/harmonogram", label: "Harmonogram podlewania" },
      { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
    ],
    8: [
      { href: "/kalkulator-plonow-warzywnika", label: "Plony warzywnika" },
      { href: "/kalkulator-kompostu", label: "Kalkulator kompostu" },
    ],
    9: [
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu" },
      { href: "/kalkulator-laki-kwietnej", label: "Łąka kwietna" },
    ],
    10: [
      { href: "/kalkulator-ziemi-i-kory", label: "Ziemia i kora" },
      { href: "/kalkulator-wapnowania", label: "Wapnowanie" },
    ],
    11: [
      { href: "/kalkulator-ogrodzenia", label: "Kalkulator ogrodzenia" },
      { href: "/alternatywy-dla-tui", label: "Alternatywy dla tui" },
    ],
    12: [
      { href: "/kalkulator-budek-legowych", label: "Budki lęgowe" },
      { href: "/generator-planu-ogrodu", label: "Generator planu" },
    ],
  };

  const priorityTools = toolLinks.length >= 2 ? toolLinks : defaultTools[month.number] ?? [];

  const weatherNotes: Record<number, string> = {
    1: "Styczeń w Polsce: średnia temperatura ok. -1°C do +1°C, krótkie dni. Prace tylko w łagodniejsze, suche dni.",
    2: "Luty — ostatni miesiąc zimy. Coraz częściej pojawiają się dni powyżej 5°C, idealne na cięcie drzew.",
    3: "Marzec przynosi wiosenne przymrozki — nie spiesz się z wysiewem i sadzeniem bez folii.",
    4: "Kwiecień — wzrost wegetacji, ryzyko późnych przymrozków do połowy miesiąca na wschodzie Polski.",
    5: "Maj — szczyt sadzenia i siewu. Pilnuj podlewania świeżo posadzonych roślin.",
    6: "Czerwiec — pierwsze upały, start intensywnego nawadniania trawnika i rabat.",
    7: "Lipiec — najgorętszy miesiąc, susza i szkodniki. Podlewaj rano, nie kosź w upał.",
    8: "Sierpień — zbiór warzyw, cięcie żywopłotów po kwitnieniu, siew traw na ubytki.",
    9: "Wrzesień — idealny na sadzenie drzew i krzewów, wertykulację trawnika.",
    10: "Październik — jesienne liście, ostatnie okno na wapnowanie i siew traw.",
    11: "Listopad — ochrona roślin na zimę, porządki, planowanie na wiosnę.",
    12: "Grudzień — spoczynek ogrodu, dokarmianie ptaków, planowanie sezonu.",
  };

  return {
    monthSlug: month.slug,
    pathSlug: month.slug,
    title: `Ogród w ${month.nameGenitive} — co robić krok po kroku`,
    h1: `Ogród w ${month.nameGenitive}`,
    description: `Co robić w ogrodzie w ${month.nameGenitive}? Priorytetowe prace: ${topTasks.join(", ")}. Poradnik sezonowy spięty z kalendarzem ogrodnika Ogrodelo.pl.`,
    keywords: [
      `ogród w ${month.nameGenitive}`,
      `co robić w ogrodzie w ${month.nameGenitive}`,
      `prace ogrodowe ${month.nameGenitive}`,
      ...month.keywords.slice(0, 3),
    ],
    weatherNote: weatherNotes[month.number] ?? month.intro,
    highlights: topTasks.length > 0 ? topTasks : month.tasks.slice(0, 4).map((t) => t.title),
    priorityTools,
  };
}

export const SEASONAL_GUIDES: SeasonalGuide[] = CALENDAR_MONTHS.map(guideFromMonth);

export function getSeasonalGuide(slug: string): SeasonalGuide | undefined {
  return SEASONAL_GUIDES.find((g) => g.pathSlug === slug);
}

export function getCalendarMonthForGuide(slug: string) {
  return CALENDAR_MONTHS.find((m) => m.slug === slug);
}

export function getAllSeasonalGuideSlugs(): string[] {
  return SEASONAL_GUIDES.map((g) => g.pathSlug);
}

export function getCurrentSeasonalGuide(): SeasonalGuide {
  const month = new Date().getMonth() + 1;
  const cal = CALENDAR_MONTHS.find((m) => m.number === month)!;
  return guideFromMonth(cal);
}
