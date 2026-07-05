import type { GardenElementKind } from "./types";

export interface CatalogItem {
  kind: GardenElementKind;
  label: string;
  icon: string;
  category: "budynki" | "nawierzchnie" | "ogrodzenie" | "rosliny" | "meble";
  defaultW?: number;
  defaultH?: number;
  defaultRadiusM?: number;
  placeAs: "rect" | "tree" | "fence-tool" | "zone-tool";
  hint: string;
}

export const CATALOG_CATEGORIES = [
  { id: "budynki" as const, label: "Budynki" },
  { id: "nawierzchnie" as const, label: "Nawierzchnie" },
  { id: "ogrodzenie" as const, label: "Ogrodzenie" },
  { id: "rosliny" as const, label: "Rośliny" },
  { id: "meble" as const, label: "Meble" },
];

export const OBJECT_CATALOG: CatalogItem[] = [
  {
    kind: "dom",
    label: "Dom",
    icon: "🏠",
    category: "budynki",
    defaultW: 10,
    defaultH: 8,
    placeAs: "rect",
    hint: "Kliknij na planie, aby umieścić budynek",
  },
  {
    kind: "altana",
    label: "Altana",
    icon: "🏡",
    category: "budynki",
    defaultW: 3,
    defaultH: 3,
    placeAs: "rect",
    hint: "Altana ogrodowa",
  },
  {
    kind: "sciezka",
    label: "Ścieżka",
    icon: "🛤️",
    category: "nawierzchnie",
    defaultW: 1.2,
    defaultH: 4,
    placeAs: "zone-tool",
    hint: "Przeciągnij prostokąt ścieżki",
  },
  {
    kind: "trawnik",
    label: "Trawnik",
    icon: "🟩",
    category: "nawierzchnie",
    defaultW: 6,
    defaultH: 5,
    placeAs: "zone-tool",
    hint: "Zaznacz obszar trawnika",
  },
  {
    kind: "rabata",
    label: "Rabata",
    icon: "🌺",
    category: "nawierzchnie",
    defaultW: 3,
    defaultH: 1.5,
    placeAs: "zone-tool",
    hint: "Obszar rabaty kwiatowej",
  },
  {
    kind: "ogrodzenie",
    label: "Ogrodzenie",
    icon: "🚧",
    category: "ogrodzenie",
    placeAs: "fence-tool",
    hint: "Klikaj punkty — podwójne kliknięcie kończy linię",
  },
  {
    kind: "brama",
    label: "Brama",
    icon: "🚪",
    category: "ogrodzenie",
    defaultW: 3,
    defaultH: 0.3,
    placeAs: "rect",
    hint: "Wjazd / wejście",
  },
  {
    kind: "drzewo",
    label: "Drzewo",
    icon: "🌳",
    category: "rosliny",
    defaultRadiusM: 2,
    placeAs: "tree",
    hint: "Kliknij — korona ok. 4 m średnicy",
  },
  {
    kind: "tuja",
    label: "Tuja",
    icon: "🌲",
    category: "rosliny",
    defaultW: 0.6,
    defaultH: 0.6,
    placeAs: "rect",
    hint: "Pojedyncza tuja (żywopłot)",
  },
  {
    kind: "krzew",
    label: "Krzew",
    icon: "🌿",
    category: "rosliny",
    defaultW: 1,
    defaultH: 1,
    placeAs: "rect",
    hint: "Krzew ozdobny",
  },
  {
    kind: "lawka",
    label: "Ławka",
    icon: "🪑",
    category: "meble",
    defaultW: 1.5,
    defaultH: 0.6,
    placeAs: "rect",
    hint: "Miejsce do wypoczynku",
  },
  {
    kind: "donica",
    label: "Donica",
    icon: "🪴",
    category: "meble",
    defaultW: 0.5,
    defaultH: 0.5,
    placeAs: "rect",
    hint: "Donica z rośliną",
  },
];

export function getCatalogItem(kind: GardenElementKind): CatalogItem {
  return OBJECT_CATALOG.find((c) => c.kind === kind)!;
}

export const ELEMENT_COLORS: Record<GardenElementKind, { fill: string; stroke: string }> = {
  dom: { fill: "#e2e8f0", stroke: "#64748b" },
  altana: { fill: "#fef3c7", stroke: "#d97706" },
  sciezka: { fill: "#d6d3d1", stroke: "#78716c" },
  trawnik: { fill: "#bbf7d0", stroke: "#16a34a" },
  rabata: { fill: "#fce7f3", stroke: "#db2777" },
  ogrodzenie: { fill: "none", stroke: "#57534e" },
  brama: { fill: "#fef9c3", stroke: "#ca8a04" },
  drzewo: { fill: "#86efac", stroke: "#15803d" },
  tuja: { fill: "#4ade80", stroke: "#166534" },
  krzew: { fill: "#a7f3d0", stroke: "#059669" },
  lawka: { fill: "#fde68a", stroke: "#b45309" },
  donica: { fill: "#fed7aa", stroke: "#c2410c" },
};
