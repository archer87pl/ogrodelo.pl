import type { HardinessZone } from "./hardiness-zones";
import {
  getAllCalendarMonthSlugs,
  getCalendarMonth,
  type CalendarMonth,
  type CalendarTask,
} from "./garden-calendar";

export type CalendarRegionId = "polnoc" | "centrum" | "poludnie" | "gory";

export interface CalendarRegion {
  id: CalendarRegionId;
  name: string;
  shortName: string;
  description: string;
  zone: HardinessZone;
  /** Ostatnie przymrozki wiosenne (orientacyjnie) */
  avgLastFrost: string;
  /** Pierwsze przymrozki jesienne */
  avgFirstFrost: string;
  /** Dni względem centrum — późniejsze (+) lub wcześniejsze (−) ostatnie przymrozki */
  lastFrostOffsetDays: number;
  exampleCities: string[];
}

export const CALENDAR_REGIONS: CalendarRegion[] = [
  {
    id: "polnoc",
    name: "Północ Polski",
    shortName: "Północ",
    description:
      "Pomorze, Warmia i Mazury — chłodniejsze wiosny, późniejsze ostatnie przymrozki i krótszy sezon wegetacyjny.",
    zone: "6a",
    avgLastFrost: "20–25 maja",
    avgFirstFrost: "25–30 września",
    lastFrostOffsetDays: 10,
    exampleCities: ["Gdańsk", "Olsztyn", "Szczecin"],
  },
  {
    id: "centrum",
    name: "Centrum Polski",
    shortName: "Centrum",
    description:
      "Mazowsze, Wielkopolska, Kujawy — punkt odniesienia dla ogólnego kalendarza ogrodnika w Polsce.",
    zone: "6b",
    avgLastFrost: "10–15 maja",
    avgFirstFrost: "5–10 października",
    lastFrostOffsetDays: 0,
    exampleCities: ["Warszawa", "Poznań", "Łódź"],
  },
  {
    id: "poludnie",
    name: "Południe Polski",
    shortName: "Południe",
    description:
      "Małopolska, Śląsk, Lubelszczyzna — dłuższy sezon, wcześniejsze wysiewy i późniejsze jesienne przymrozki.",
    zone: "6b",
    avgLastFrost: "5–10 maja",
    avgFirstFrost: "10–15 października",
    lastFrostOffsetDays: -7,
    exampleCities: ["Kraków", "Wrocław", "Lublin"],
  },
  {
    id: "gory",
    name: "Regiony górskie",
    shortName: "Góry",
    description:
      "Sudety, Beskidy, Tatry — strefa 5b–6a, późne wiosenne przymrozki i krótki sezon ciepłolubnych roślin.",
    zone: "5b",
    avgLastFrost: "25 maja – 5 czerwca",
    avgFirstFrost: "15–20 września",
    lastFrostOffsetDays: 18,
    exampleCities: ["Zakopane", "Karpacz", "Bielsko-Biała"],
  },
];

export function getCalendarRegion(id: string): CalendarRegion | undefined {
  return CALENDAR_REGIONS.find((r) => r.id === id);
}

export function parseRegionalCalendarSlug(
  slug: string
): { regionId: CalendarRegionId; monthSlug: string } | null {
  for (const region of CALENDAR_REGIONS) {
    const prefix = `${region.id}-`;
    if (slug.startsWith(prefix)) {
      const monthSlug = slug.slice(prefix.length);
      if (getCalendarMonth(monthSlug)) {
        return { regionId: region.id, monthSlug };
      }
    }
  }
  return null;
}

export function getRegionalCalendarSlug(regionId: CalendarRegionId, monthSlug: string): string {
  return `${regionId}-${monthSlug}`;
}

export function getAllRegionalCalendarSlugs(): string[] {
  const slugs: string[] = [];
  for (const region of CALENDAR_REGIONS) {
    for (const monthSlug of getAllCalendarMonthSlugs()) {
      slugs.push(getRegionalCalendarSlug(region.id, monthSlug));
    }
  }
  return slugs;
}

function shiftTiming(timing: string | undefined, offsetDays: number): string | undefined {
  if (!timing || offsetDays === 0) return timing;
  const direction = offsetDays > 0 ? "później" : "wcześniej";
  const days = Math.abs(offsetDays);
  return `${timing} (w tym regionie zwykle o ${days} dni ${direction})`;
}

function adjustTaskForRegion(task: CalendarTask, region: CalendarRegion): CalendarTask {
  return {
    ...task,
    timing: shiftTiming(task.timing, region.lastFrostOffsetDays),
    description: task.description,
  };
}

export function getRegionalCalendarMonth(
  regionId: CalendarRegionId,
  monthSlug: string
): CalendarMonth | undefined {
  const base = getCalendarMonth(monthSlug);
  const region = getCalendarRegion(regionId);
  if (!base || !region) return undefined;

  const frostNote =
    region.lastFrostOffsetDays > 0
      ? `W ${region.name.toLowerCase()} ostatnie przymrozki wiosenne (${region.avgLastFrost}) wypadają później niż w centrum kraju — nie spiesz się z wysadzaniem roślin ciepłolubnych.`
      : region.lastFrostOffsetDays < 0
        ? `W ${region.name.toLowerCase()} sezon startuje wcześniej (${region.avgLastFrost}) — możesz wysiewać i sadzić nieco przed terminem dla centrum Polski.`
        : `Region ${region.name.toLowerCase()} — strefa mrozoodporności ${region.zone}, ostatnie przymrozki ok. ${region.avgLastFrost}.`;

  return {
    ...base,
    slug: getRegionalCalendarSlug(regionId, monthSlug),
    title: `${base.title} — ${region.shortName}`,
    h1: `${base.h1 ?? base.name} w ${region.name.toLowerCase()}`,
    description: `${base.description} Kalendarz dostosowany do ${region.name.toLowerCase()} (strefa ${region.zone}, ostatnie przymrozki: ${region.avgLastFrost}).`,
    keywords: [
      ...base.keywords,
      `kalendarz ogrodnika ${region.shortName.toLowerCase()}`,
      `prace ogrodowe ${base.nameGenitive} ${region.exampleCities[0]}`,
      `ogród ${region.shortName.toLowerCase()} ${base.nameGenitive}`,
    ],
    intro: `${region.description} ${frostNote} ${base.intro}`,
    tasks: base.tasks.map((t) => adjustTaskForRegion(t, region)),
    faq: [
      {
        question: `Kiedy ostatnie przymrozki w ${region.name.toLowerCase()}?`,
        answer: `Orientacyjnie ${region.avgLastFrost}. Pierwsze jesienne przymrozki: ${region.avgFirstFrost}. Strefa USDA: ${region.zone}.`,
      },
      ...base.faq,
    ],
    sections: base.sections,
  };
}

/** Daty referencyjne dla licznika przymrozków (centrum Polski) */
export const FROST_REFERENCE = {
  lastFrost: { month: 5, day: 15 },
  firstFrost: { month: 10, day: 5 },
} as const;

export function getFrostCountdown(referenceDate = new Date()): {
  lastFrostDays: number | null;
  lastFrostPassedDays: number | null;
  firstFrostDays: number | null;
  lastFrostLabel: string;
  firstFrostLabel: string;
  seasonPhase: "before-last-frost" | "growing" | "after-first-frost";
} {
  const year = referenceDate.getFullYear();
  const now = referenceDate.getTime();

  let lastFrost = new Date(year, FROST_REFERENCE.lastFrost.month - 1, FROST_REFERENCE.lastFrost.day);
  if (now > lastFrost.getTime()) {
    lastFrost = new Date(year + 1, FROST_REFERENCE.lastFrost.month - 1, FROST_REFERENCE.lastFrost.day);
  }

  let firstFrost = new Date(year, FROST_REFERENCE.firstFrost.month - 1, FROST_REFERENCE.firstFrost.day);
  if (now > firstFrost.getTime()) {
    firstFrost = new Date(year + 1, FROST_REFERENCE.firstFrost.month - 1, FROST_REFERENCE.firstFrost.day);
  }

  const msDay = 1000 * 60 * 60 * 24;
  const lastFrostDays = Math.ceil((lastFrost.getTime() - now) / msDay);
  const firstFrostDays = Math.ceil((firstFrost.getTime() - now) / msDay);

  const passedLastFrostThisYear =
    referenceDate > new Date(year, FROST_REFERENCE.lastFrost.month - 1, FROST_REFERENCE.lastFrost.day);
  const passedFirstFrostThisYear =
    referenceDate > new Date(year, FROST_REFERENCE.firstFrost.month - 1, FROST_REFERENCE.firstFrost.day);

  let seasonPhase: "before-last-frost" | "growing" | "after-first-frost";
  if (!passedLastFrostThisYear) {
    seasonPhase = "before-last-frost";
  } else if (!passedFirstFrostThisYear) {
    seasonPhase = "growing";
  } else {
    seasonPhase = "after-first-frost";
  }

  const lastFrostPassedDays = passedLastFrostThisYear
    ? Math.floor(
        (now - new Date(year, FROST_REFERENCE.lastFrost.month - 1, FROST_REFERENCE.lastFrost.day).getTime()) /
          msDay
      )
    : null;

  return {
    lastFrostDays: passedLastFrostThisYear ? null : lastFrostDays,
    lastFrostPassedDays,
    firstFrostDays: passedFirstFrostThisYear ? null : firstFrostDays,
    lastFrostLabel: "10–15 maja (centrum Polski)",
    firstFrostLabel: "5–10 października (centrum Polski)",
    seasonPhase,
  };
}
