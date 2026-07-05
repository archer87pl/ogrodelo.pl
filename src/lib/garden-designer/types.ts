export const PX_PER_M = 36;
export const STORAGE_KEY = "ogrodelo-garden-designer-projects";

export type GardenElementKind =
  | "dom"
  | "altana"
  | "sciezka"
  | "trawnik"
  | "rabata"
  | "ogrodzenie"
  | "brama"
  | "drzewo"
  | "tuja"
  | "krzew"
  | "lawka"
  | "donica";

export type DesignerTool = "select" | "place" | "fence" | "zone";

export interface GardenProject {
  id: string;
  name: string;
  widthM: number;
  heightM: number;
  elements: GardenElement[];
  updatedAt: string;
}

export interface RectElement {
  type: "rect";
  id: string;
  kind: Exclude<GardenElementKind, "ogrodzenie" | "drzewo">;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TreeElement {
  type: "tree";
  id: string;
  kind: "drzewo";
  x: number;
  y: number;
  radiusM: number;
}

export interface FenceElement {
  type: "fence";
  id: string;
  kind: "ogrodzenie";
  points: { x: number; y: number }[];
}

export type GardenElement = RectElement | TreeElement | FenceElement;

export interface MaterialLine {
  category: string;
  item: string;
  quantity: number;
  unit: string;
  note?: string;
  estimatedPln?: number;
}

export function newProjectId(): string {
  return `proj-${Date.now().toString(36)}`;
}

export function newElementId(): string {
  return `el-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptyProject(name = "Mój ogród"): GardenProject {
  return {
    id: newProjectId(),
    name,
    widthM: 20,
    heightM: 15,
    elements: [],
    updatedAt: new Date().toISOString(),
  };
}

export function fenceLengthM(points: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i]!.x - points[i - 1]!.x;
    const dy = points[i]!.y - points[i - 1]!.y;
    len += Math.hypot(dx, dy);
  }
  return len;
}

export function rectArea(el: RectElement): number {
  return el.w * el.h;
}

export function snapM(value: number, step = 0.5): number {
  return Math.round(value / step) * step;
}
