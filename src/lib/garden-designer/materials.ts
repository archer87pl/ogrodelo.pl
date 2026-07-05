import type { GardenProject, MaterialLine } from "./types";
import { fenceLengthM, rectArea } from "./types";

const UNIT_PRICES: Partial<Record<string, number>> = {
  "m² trawnika (rolawnik)": 25,
  "kg nasion trawy": 0.15,
  "m² kostki brukowej": 85,
  "m³ kruszywa na ścieżkę": 120,
  "mb ogrodzenia (panel)": 180,
  "słupek ogrodzeniowy": 45,
  "szt. brama": 2500,
  "szt. sadzonka drzewa": 180,
  "szt. tuja (P9)": 35,
  "szt. krzew": 45,
  "szt. ławka ogrodowa": 450,
  "szt. donica": 120,
  "m³ ziemi kompostowej": 90,
  "m² agrowłókniny": 3.5,
};

function addLine(
  map: Map<string, MaterialLine>,
  key: string,
  line: Omit<MaterialLine, "estimatedPln"> & { estimatedPln?: number }
) {
  const existing = map.get(key);
  if (existing) {
    existing.quantity += line.quantity;
    if (line.estimatedPln !== undefined) {
      existing.estimatedPln = (existing.estimatedPln ?? 0) + line.estimatedPln;
    }
  } else {
    map.set(key, { ...line });
  }
}

function price(item: string, qty: number): number | undefined {
  const unit = UNIT_PRICES[item];
  return unit !== undefined ? Math.round(unit * qty) : undefined;
}

export function generateMaterials(project: GardenProject): MaterialLine[] {
  const map = new Map<string, MaterialLine>();

  let lawnArea = 0;
  let pathArea = 0;
  let bedArea = 0;
  let fenceLen = 0;
  let gateCount = 0;
  let treeCount = 0;
  let thujaCount = 0;
  let shrubCount = 0;
  let benchCount = 0;
  let potCount = 0;

  for (const el of project.elements) {
    if (el.type === "rect") {
      const area = rectArea(el);
      switch (el.kind) {
        case "trawnik":
          lawnArea += area;
          break;
        case "sciezka":
          pathArea += area;
          break;
        case "rabata":
          bedArea += area;
          break;
        case "brama":
          gateCount += 1;
          break;
        case "tuja":
          thujaCount += 1;
          break;
        case "krzew":
          shrubCount += 1;
          break;
        case "lawka":
          benchCount += 1;
          break;
        case "donica":
          potCount += 1;
          break;
        default:
          break;
      }
    } else if (el.type === "fence") {
      fenceLen += fenceLengthM(el.points);
    } else if (el.type === "tree") {
      treeCount += 1;
    }
  }

  if (lawnArea > 0) {
    const qty = Math.ceil(lawnArea);
    addLine(map, "lawn-roll", {
      category: "Trawnik",
      item: "m² trawnika (rolawnik)",
      quantity: qty,
      unit: "m²",
      note: `Powierzchnia ${lawnArea.toFixed(1)} m² — alternatywnie nasiona`,
      estimatedPln: price("m² trawnika (rolawnik)", qty),
    });
    addLine(map, "lawn-seed", {
      category: "Trawnik",
      item: "kg nasion trawy",
      quantity: Math.ceil(lawnArea * 0.03),
      unit: "kg",
      note: "Opcja tańsza — ok. 30 g/m²",
      estimatedPln: price("kg nasion trawy", lawnArea * 0.03),
    });
  }

  if (pathArea > 0) {
    const pavers = Math.ceil(pathArea);
    addLine(map, "path-pavers", {
      category: "Nawierzchnie",
      item: "m² kostki brukowej",
      quantity: pavers,
      unit: "m²",
      note: `Ścieżki łącznie ${pathArea.toFixed(1)} m²`,
      estimatedPln: price("m² kostki brukowej", pavers),
    });
    const gravel = Math.ceil(pathArea * 0.08 * 10) / 10;
    addLine(map, "path-gravel", {
      category: "Nawierzchnie",
      item: "m³ kruszywa na ścieżkę",
      quantity: gravel,
      unit: "m³",
      note: "Podbudowa ok. 8 cm",
      estimatedPln: price("m³ kruszywa na ścieżkę", gravel),
    });
  }

  if (bedArea > 0) {
    const soil = Math.ceil(bedArea * 0.15 * 10) / 10;
    addLine(map, "bed-soil", {
      category: "Rabaty",
      item: "m³ ziemi kompostowej",
      quantity: soil,
      unit: "m³",
      note: `Rabaty ${bedArea.toFixed(1)} m², warstwa 15 cm`,
      estimatedPln: price("m³ ziemi kompostowej", soil),
    });
    addLine(map, "bed-mulch", {
      category: "Rabaty",
      item: "m² agrowłókniny",
      quantity: Math.ceil(bedArea),
      unit: "m²",
      estimatedPln: price("m² agrowłókniny", bedArea),
    });
  }

  if (fenceLen > 0) {
    const panels = Math.ceil(fenceLen / 2.5);
    const posts = panels + 1;
    addLine(map, "fence-panel", {
      category: "Ogrodzenie",
      item: "mb ogrodzenia (panel)",
      quantity: Math.ceil(fenceLen),
      unit: "mb",
      note: `Długość linii ${fenceLen.toFixed(1)} m`,
      estimatedPln: price("mb ogrodzenia (panel)", fenceLen),
    });
    addLine(map, "fence-post", {
      category: "Ogrodzenie",
      item: "słupek ogrodzeniowy",
      quantity: posts,
      unit: "szt.",
      note: "Co ok. 2,5 m",
      estimatedPln: price("słupek ogrodzeniowy", posts),
    });
  }

  if (gateCount > 0) {
    addLine(map, "gate", {
      category: "Ogrodzenie",
      item: "szt. brama",
      quantity: gateCount,
      unit: "szt.",
      estimatedPln: price("szt. brama", gateCount),
    });
  }

  if (treeCount > 0) {
    addLine(map, "tree", {
      category: "Rośliny",
      item: "szt. sadzonka drzewa",
      quantity: treeCount,
      unit: "szt.",
      note: "Sadzonka kontenerowa — dobierz gatunek w porównywarce drzew",
      estimatedPln: price("szt. sadzonka drzewa", treeCount),
    });
  }

  if (thujaCount > 0) {
    addLine(map, "thuja", {
      category: "Rośliny",
      item: "szt. tuja (P9)",
      quantity: thujaCount,
      unit: "szt.",
      note: "Rozstaw w żywopłocie ok. 40–60 cm",
      estimatedPln: price("szt. tuja (P9)", thujaCount),
    });
  }

  if (shrubCount > 0) {
    addLine(map, "shrub", {
      category: "Rośliny",
      item: "szt. krzew",
      quantity: shrubCount,
      unit: "szt.",
      estimatedPln: price("szt. krzew", shrubCount),
    });
  }

  if (benchCount > 0) {
    addLine(map, "bench", {
      category: "Wyposażenie",
      item: "szt. ławka ogrodowa",
      quantity: benchCount,
      unit: "szt.",
      estimatedPln: price("szt. ławka ogrodowa", benchCount),
    });
  }

  if (potCount > 0) {
    addLine(map, "pot", {
      category: "Wyposażenie",
      item: "szt. donica",
      quantity: potCount,
      unit: "szt.",
      estimatedPln: price("szt. donica", potCount),
    });
  }

  const gardenArea = project.widthM * project.heightM;
  const usedArea = lawnArea + pathArea + bedArea;
  const structureCount = project.elements.filter(
    (e) => e.type === "rect" && (e.kind === "dom" || e.kind === "altana")
  ).length;

  if (structureCount > 0) {
    addLine(map, "info-structures", {
      category: "Informacja",
      item: "Budynki na planie",
      quantity: structureCount,
      unit: "szt.",
      note: "Dom/altana — orientacyjne, bez kosztorysu konstrukcji",
    });
  }

  if (usedArea < gardenArea * 0.3 && project.elements.length > 0) {
    addLine(map, "tip-fill", {
      category: "Wskazówka",
      item: "Niewykorzystana powierzchnia",
      quantity: Math.round(gardenArea - usedArea),
      unit: "m²",
      note: "Rozważ trawnik, rabaty lub strefę relaksu",
    });
  }

  return Array.from(map.values()).sort((a, b) => a.category.localeCompare(b.category));
}

export function materialsTotalPln(lines: MaterialLine[]): number {
  return lines.reduce((sum, l) => sum + (l.estimatedPln ?? 0), 0);
}
