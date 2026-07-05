/**
 * Generuje uproszczone ścieżki SVG województw z GeoJSON (click_that_hood / OSM).
 * Uruchom: node scripts/generate-voivodeship-paths.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEO_PATH =
  process.argv[2] ??
  path.join(__dirname, "../src/lib/constants/poland-voivodeships.geojson");
const OUT_PATH = path.join(__dirname, "../src/lib/constants/poland-voivodeship-paths.ts");

const NAME_TO_ID = {
  Zachodniopomorskie: "zachodniopomorskie",
  Pomorskie: "pomorskie",
  "Warmińsko-Mazurskie": "warminsko-mazurskie",
  Podlaskie: "podlaskie",
  Lubelskie: "lubelskie",
  Mazowieckie: "mazowieckie",
  "Kujawsko-Pomorskie": "kujawsko-pomorskie",
  Wielkopolskie: "wielkopolskie",
  Łódzkie: "lodzkie",
  Lubuskie: "lubuskie",
  Dolnośląskie: "dolnoslaskie",
  Opolskie: "opolskie",
  Śląskie: "slaskie",
  Świętokrzyskie: "swietokrzyskie",
  Małopolskie: "malopolskie",
  Podkarpackie: "podkarpackie",
};

function projectPoland(lon, lat) {
  const left = 14.0;
  const right = 24.5;
  const top = 54.9;
  const bottom = 49.0;
  const x = ((lon - left) / (right - left)) * 800;
  const y = ((top - lat) / (top - bottom)) * 780;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area / 2);
}

function getLargestOuterRing(coordinates, geomType) {
  let best = [];
  let bestArea = 0;
  const polys = geomType === "Polygon" ? [coordinates] : coordinates;
  for (const poly of polys) {
    const outer = poly[0];
    if (!outer?.length) continue;
    const projected = outer.map(([lon, lat]) => projectPoland(lon, lat));
    const area = ringArea(projected);
    if (area > bestArea) {
      bestArea = area;
      best = projected;
    }
  }
  return best;
}

function perpDistance(point, lineStart, lineEnd) {
  const [x, y] = point;
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
  const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
  const px = x1 + t * dx;
  const py = y1 + t * dy;
  return Math.hypot(x - px, y - py);
}

function simplifyRDP(points, epsilon) {
  if (points.length <= 2) return points;
  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;
  for (let i = 1; i < end; i++) {
    const d = perpDistance(points[i], points[0], points[end]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = simplifyRDP(points.slice(0, index + 1), epsilon);
    const right = simplifyRDP(points.slice(index), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [points[0], points[end]];
}

function ringToPath(points) {
  return (
    points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
      .join(" ") + " Z"
  );
}

function centroid(points) {
  const cx = points.reduce((s, [x]) => s + x, 0) / points.length;
  const cy = points.reduce((s, [, y]) => s + y, 0) / points.length;
  return [Math.round(cx * 10) / 10, Math.round(cy * 10) / 10];
}

if (!fs.existsSync(GEO_PATH)) {
  console.error("Brak pliku GeoJSON:", GEO_PATH);
  process.exit(1);
}

const geo = JSON.parse(fs.readFileSync(GEO_PATH, "utf8"));
const entries = [];

for (const feature of geo.features) {
  const name = feature.properties.name;
  const id = NAME_TO_ID[name];
  if (!id) {
    console.warn("Nieznane województwo:", name);
    continue;
  }
  const ring = getLargestOuterRing(
    feature.geometry.coordinates,
    feature.geometry.type
  );
  const simplified = simplifyRDP(ring, 1.2);
  entries.push({
    id,
    path: ringToPath(simplified),
    label: centroid(simplified),
    points: simplified.length,
    original: ring.length,
  });
}

entries.sort((a, b) => a.id.localeCompare(b.id));

const ts = `/** Auto-generated — node scripts/generate-voivodeship-paths.mjs */
/** Granice: GeoJSON click_that_hood (OSM), CC BY-SA */

export interface VoivodeshipPath {
  id: string;
  path: string;
  label: [number, number];
}

export const VOIVODESHIP_PATHS: VoivodeshipPath[] = ${JSON.stringify(
  entries.map(({ id, path, label }) => ({ id, path, label })),
  null,
  2
)};

export function getVoivodeshipPath(id: string): VoivodeshipPath | undefined {
  return VOIVODESHIP_PATHS.find((v) => v.id === id);
}
`;

fs.writeFileSync(OUT_PATH, ts);
console.log(`Zapisano ${entries.length} województw → ${OUT_PATH}`);
for (const e of entries) {
  console.log(`  ${e.id}: ${e.original} → ${e.points} punktów`);
}
