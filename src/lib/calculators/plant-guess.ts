import {
  FLOWERING_PLANTS_LIST,
  MONTH_LABELS,
  PLANT_CATEGORIES,
  FLOWER_COLORS,
  type FloweringPlant,
  type PlantCategory,
  type FlowerColor,
} from "@/lib/constants/flowering-plants";

export const MAX_GUESSES = 6;

export function getDailyPlant(date = new Date()): FloweringPlant {
  const dayIndex = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000
  );
  return FLOWERING_PLANTS_LIST[dayIndex % FLOWERING_PLANTS_LIST.length]!;
}

export function getGuessPool(): FloweringPlant[] {
  return [...FLOWERING_PLANTS_LIST].sort((a, b) =>
    a.name.localeCompare(b.name, "pl")
  );
}

export interface GuessFeedback {
  category: "match" | "miss";
  bloom: "match" | "partial" | "miss";
  color: "match" | "partial" | "miss";
  light: "match" | "partial" | "miss";
  height: "match" | "partial" | "miss";
}

function bloomMonths(plant: FloweringPlant): number[] {
  return Object.keys(plant.bloomMonths).map(Number);
}

function heightBucket(height: string): "niska" | "srednia" | "wysoka" {
  const m = height.match(/(\d+)/);
  const n = m ? Number(m[1]) : 100;
  if (n <= 50) return "niska";
  if (n <= 200) return "srednia";
  return "wysoka";
}

export function evaluateGuess(guess: FloweringPlant, target: FloweringPlant): GuessFeedback {
  const gMonths = bloomMonths(guess);
  const tMonths = bloomMonths(target);
  const monthOverlap = gMonths.some((m) => tMonths.includes(m));

  const colorOverlap = guess.colors.some((c) => target.colors.includes(c));
  const colorExact =
    guess.colors.length === target.colors.length &&
    guess.colors.every((c) => target.colors.includes(c));

  const lightOverlap = guess.light.some((l) => target.light.includes(l));
  const lightExact =
    guess.light.length === target.light.length &&
    guess.light.every((l) => target.light.includes(l));

  const gH = heightBucket(guess.height);
  const tH = heightBucket(target.height);

  return {
    category: guess.category === target.category ? "match" : "miss",
    bloom: monthOverlap
      ? gMonths.filter((m) => tMonths.includes(m)).length >= 2
        ? "match"
        : "partial"
      : "miss",
    color: colorExact ? "match" : colorOverlap ? "partial" : "miss",
    light: lightExact ? "match" : lightOverlap ? "partial" : "miss",
    height: gH === tH ? "match" : Math.abs(["niska", "srednia", "wysoka"].indexOf(gH) - ["niska", "srednia", "wysoka"].indexOf(tH)) === 1 ? "partial" : "miss",
  };
}

export function categoryLabel(cat: PlantCategory): string {
  return PLANT_CATEGORIES[cat]?.label ?? cat;
}

export function colorLabel(color: FlowerColor): string {
  return FLOWER_COLORS[color]?.label ?? color;
}

export function formatBloomMonths(plant: FloweringPlant): string {
  const months = bloomMonths(plant).sort((a, b) => a - b);
  if (months.length === 0) return "—";
  return months.map((m) => MONTH_LABELS.find((l) => l.num === m)?.name ?? String(m)).join(", ");
}

export const PLANT_GUESS_FAQ = [
  {
    question: "Jak działa codzienna gra „Zgadnij roślinę”?",
    answer:
      "Każdego dnia losujemy jedną roślinę z katalogu kwitnienia Ogrodelo.pl. Masz 6 prób — po każdej zobaczysz podpowiedzi o kategorii, kwitnieniu, kolorze, świetle i wysokości.",
  },
  {
    question: "Czy gra się resetuje?",
    answer:
      "Tak — nowa roślina każdego dnia o północy (czas polski). Możesz wracać codziennie i ćwiczyć rozpoznawanie gatunków.",
  },
  {
    question: "Skąd pochodzą dane o roślinach?",
    answer:
      "Z katalogu kwitnienia Ogrodelo.pl — te same gatunki znajdziesz w pełnych kartach roślin z opisami i tabelą kwitnienia.",
  },
];
