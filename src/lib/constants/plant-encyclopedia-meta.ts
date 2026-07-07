import type { GrowthSpecies } from "@/lib/calculators/growth";
import { getGrowthPreset } from "./growth-presets";
import type { FloweringPlant, FloweringCatalogFilters, PlantCategory } from "./flowering-plants";
import { PET_PLANTS, type PetPlant, type ToxicityLevel } from "./pet-plants";
import type { HardinessZone } from "./hardiness-zones";
import { ZONE_LEGEND } from "./hardiness-zones";

/** Id gatunku w katalogu → id w bazie pet-plants (gdy różnią się) */
const PET_ID_ALIASES: Record<string, string> = {
  azalia: "rododendron",
  kasztanowiec: "kasztan",
  rozanecznik: "rododendron",
  "bluszcz-kolczasty": "bluszcz",
  jagoda: "borowka",
};

const CATEGORY_DEFAULT_ZONES: Record<PlantCategory, HardinessZone[]> = {
  drzewo: ["6a", "6b"],
  krzew: ["6a", "6b", "7a"],
  bylina: ["6a", "6b", "7a"],
  pnacze: ["6a", "6b", "7a"],
  roczna: ["6a", "6b", "7a"],
  cebula: ["6a", "6b", "7a"],
};

/** Nadpisania stref USDA dla konkretnych gatunków */
export const PLANT_HARDINESS_OVERRIDES: Partial<Record<string, HardinessZone[]>> = {
  lawenda: ["6a", "6b", "7a"],
  hortensja: ["6a", "6b"],
  budleja: ["6a", "6b", "7a"],
  roza: ["6a", "6b", "7a"],
  magnolia: ["6b", "7a"],
  wrzos: ["5b", "6a"],
  kalmia: ["5b", "6a"],
  pieris: ["6a", "6b"],
  rozanecznik: ["6a", "6b"],
  azalia: ["6a", "6b"],
  morela: ["6a", "6b"],
  brzoza: ["6a", "6b", "7a"],
  wierzba: ["6a", "6b", "7a"],
  cis: ["6a", "6b"],
  "modrzew-europejski": ["5b", "6a"],
  "jodla-pospolita": ["5b", "6a"],
  "swierk-pospolity": ["5b", "6a"],
  "sosna-zwyczajna": ["5b", "6a", "6b"],
  wrzosiec: ["5b", "6a"],
  tamaryszek: ["6a", "6b", "7a"],
  bambus: ["6a", "6b"],
  wisteria: ["6a", "6b"],
  campsis: ["6a", "6b", "7a"],
};

/** Gatunek katalogu → preset kalkulatora wzrostu */
export const PLANT_GROWTH_MAP: Partial<Record<string, GrowthSpecies>> = {
  grab: "grab",
  berberys: "berberys",
  ostrokrzew: "ostrokrzew",
  brzoza: "brzoza",
  cis: "cis",
  bukszpan: "bukszpan",
  ligustr: "ligustr",
  laurowisnia: "laurowisnia",
  tuja: "tui",
  wierzba: "wierzba",
  "wierzba-biala": "wierzba",
  bambus: "bambus",
  zywotnik: "zywotnik",
};

export const HARDINESS_ZONE_OPTIONS: { zone: HardinessZone; label: string }[] = ZONE_LEGEND.map(
  (z) => ({ zone: z.zone, label: `${z.zone} (${z.description.split("—")[0]?.trim() ?? z.zone})` })
);

export function getPlantHardinessZones(plant: FloweringPlant): HardinessZone[] {
  return PLANT_HARDINESS_OVERRIDES[plant.id] ?? CATEGORY_DEFAULT_ZONES[plant.category];
}

export function formatHardinessZones(zones: HardinessZone[]): string {
  return zones.map((z) => `strefa ${z}`).join(", ");
}

export function getPetPlantForCatalogId(plantId: string): PetPlant | undefined {
  const petId = PET_ID_ALIASES[plantId] ?? plantId;
  return PET_PLANTS.find((p) => p.id === petId);
}

export function isPetSafeLevel(level: ToxicityLevel): boolean {
  return level === "bezpieczna" || level === "lagodna";
}

export function getPlantPetSafety(plantId: string): {
  dog?: ToxicityLevel;
  cat?: ToxicityLevel;
  child?: ToxicityLevel;
  note?: string;
} | null {
  const pet = getPetPlantForCatalogId(plantId);
  if (!pet) return null;
  return { dog: pet.dog, cat: pet.cat, child: pet.child, note: pet.note };
}

export function getPlantGrowthSpecies(plantId: string): GrowthSpecies | undefined {
  return PLANT_GROWTH_MAP[plantId];
}

export function getPlantGrowthPresetSlug(plantId: string): string | undefined {
  const species = getPlantGrowthSpecies(plantId);
  if (!species) return undefined;
  const slug = species === "tui" ? "tuja" : species;
  return getGrowthPreset(slug) ? slug : undefined;
}

export function applyExtendedPlantFilters(
  plants: FloweringPlant[],
  filters: FloweringCatalogFilters
): FloweringPlant[] {
  return plants.filter((plant) => {
    if (filters.hardinessZones?.length) {
      const zones = getPlantHardinessZones(plant);
      if (!filters.hardinessZones.some((z) => zones.includes(z))) return false;
    }
    if (filters.petSafeDog) {
      const pet = getPetPlantForCatalogId(plant.id);
      if (!pet || !isPetSafeLevel(pet.dog)) return false;
    }
    if (filters.petSafeCat) {
      const pet = getPetPlantForCatalogId(plant.id);
      if (!pet || !isPetSafeLevel(pet.cat)) return false;
    }
    if (filters.petSafeChild) {
      const pet = getPetPlantForCatalogId(plant.id);
      if (!pet || !isPetSafeLevel(pet.child)) return false;
    }
    return true;
  });
}
