import {
  FLOWERING_PLANTS,
  FLOWER_COLORS,
  LIGHT_LABELS,
  MONTH_LABELS,
  MONTH_LOCATIVE_SLUGS,
  PLANT_CATEGORIES,
  type FloweringPlant,
  type FlowerColor,
} from "@/lib/constants/flowering-plants";
import { getPlantGrowthPresetSlug } from "@/lib/constants/plant-encyclopedia-meta";

export function plantDetailPath(id: string): string {
  return `/katalog-kwitnienia/roslina/${id}`;
}

export function getFloweringPlantById(id: string): FloweringPlant | undefined {
  return FLOWERING_PLANTS.find((p) => p.id === id);
}

export function getAllFloweringPlantIds(): string[] {
  return FLOWERING_PLANTS.map((p) => p.id);
}

function monthName(num: number, lowercase = false): string {
  const name = MONTH_LABELS.find((m) => m.num === num)?.name ?? "";
  return lowercase ? name.toLowerCase() : name;
}

function formatMonthList(nums: number[]): string {
  const names = nums.map((n) => monthName(n, true));
  if (names.length === 0) return "";
  if (names.length === 1) return names[0]!;
  if (names.length === 2) return `${names[0]} i ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} i ${names[names.length - 1]}`;
}

function formatColors(colors: FlowerColor[]): string {
  return colors.map((c) => FLOWER_COLORS[c].label.toLowerCase()).join(", ");
}

export function getPlantBloomMonths(plant: FloweringPlant): number[] {
  return Object.keys(plant.bloomMonths)
    .map(Number)
    .sort((a, b) => a - b);
}

export function getPlantPeakMonths(plant: FloweringPlant): number[] {
  return getPlantBloomMonths(plant).filter((m) => plant.bloomMonths[m] === "peak");
}

export function formatPlantBloomPeriod(plant: FloweringPlant): string {
  const months = getPlantBloomMonths(plant);
  return formatMonthList(months);
}

export function getPlantPageTitle(plant: FloweringPlant): string {
  return `${plant.name} — kiedy kwitnie? Katalog kwitnienia`;
}

export function getPlantPageDescription(plant: FloweringPlant): string {
  const period = formatPlantBloomPeriod(plant);
  const colors = formatColors(plant.colors);
  const cat = PLANT_CATEGORIES[plant.category].label.toLowerCase();
  return `${plant.name} kwitnie w ${period}. ${colors} kwiaty, wys. ${plant.height}. ${cat} do polskiego ogrodu — metryka kwitnienia miesiąc po miesiącu.`;
}

export function getPlantPageKeywords(plant: FloweringPlant): string[] {
  const months = getPlantBloomMonths(plant);
  const peak = getPlantPeakMonths(plant);
  const keywords = [
    plant.name.toLowerCase(),
    `${plant.name.toLowerCase()} kwitnienie`,
    `kiedy kwitnie ${plant.name.toLowerCase()}`,
    plant.latinName.toLowerCase(),
    PLANT_CATEGORIES[plant.category].plural,
    ...plant.colors.map((c) => `${FLOWER_COLORS[c].label.toLowerCase()} kwiaty`),
    ...months.map((m) => `kwitnienie ${monthName(m, true)}`),
    ...peak.map((m) => `kwitnie w ${monthName(m, true)}`),
  ];
  if (plant.beeFriendly) keywords.push("dla pszczół");
  if (plant.winterBloom) keywords.push("kwitnienie zimą");
  if (plant.scent !== "none") keywords.push("pachnące rośliny");
  return [...new Set(keywords)];
}

export function getPlantTraits(plant: FloweringPlant): { icon: string; label: string }[] {
  const traits: { icon: string; label: string }[] = [];
  if (plant.beeFriendly) traits.push({ icon: "🐝", label: "Przyjazne pszczołom" });
  if (plant.butterflyFriendly) traits.push({ icon: "🦋", label: "Przyciąga motyle" });
  if (plant.honeyPlant) traits.push({ icon: "🍯", label: "Miododajne" });
  if (plant.winterBloom) traits.push({ icon: "❄️", label: "Kwitnie zimą" });
  if (plant.ornamentalFruit) traits.push({ icon: "🍒", label: "Owoce ozdobne" });
  if (plant.autumnColor) traits.push({ icon: "🍂", label: "Jesienne przebarwienie" });
  return traits;
}

export function getPlantScentLabel(plant: FloweringPlant): string {
  if (plant.scent === "strong") return "Intensywny zapach";
  if (plant.scent === "mild") return "Delikatny zapach";
  return "Bez zapachu";
}

export function getPlantSeoParagraphs(plant: FloweringPlant): string[] {
  const cat = PLANT_CATEGORIES[plant.category];
  const period = formatPlantBloomPeriod(plant);
  const peak = getPlantPeakMonths(plant);
  const peakText = peak.length ? formatMonthList(peak) : period;
  const colors = formatColors(plant.colors);
  const light = plant.light.map((l) => LIGHT_LABELS[l].toLowerCase()).join(" lub ");

  const paragraphs = [
    `${plant.name} (${plant.latinName}) to ${cat.label.toLowerCase()} kwitnące w Polsce od ${period}. Szczyt kwitnienia przypada na ${peakText}. W katalogu oznaczamy miesiące pełnego kwitnienia (🌸) oraz okresy z pojedynczymi kwiatami.`,
    `Kwiaty w odcieniach: ${colors}. ${getPlantScentLabel(plant)}. Roślina osiąga wysokość ${plant.height} i najlepiej rośnie w warunkach: ${light}. ${plant.description}`,
  ];

  const traits = getPlantTraits(plant);
  if (traits.length > 0) {
    paragraphs.push(
      `Cechy ogrodnicze: ${traits.map((t) => t.label.toLowerCase()).join(", ")}. ${
        plant.beeFriendly
          ? `${plant.name} warto sadzić w ogrodach przyjaznych zapylaczom.`
          : ""
      }`.trim()
    );
  }

  return paragraphs;
}

export function getPlantFaq(plant: FloweringPlant): { question: string; answer: string }[] {
  const period = formatPlantBloomPeriod(plant);
  const peakMonths = getPlantPeakMonths(plant);
  const peak = peakMonths.length ? formatMonthList(peakMonths) : period;
  const colors = formatColors(plant.colors);
  const light = plant.light.map((l) => LIGHT_LABELS[l].toLowerCase()).join(", ");

  return [
    {
      question: `Kiedy kwitnie ${plant.name}?`,
      answer: `${plant.name} kwitnie w ${period}. Najobfitsze kwitnienie (szczyt) występuje w ${peak}.`,
    },
    {
      question: `Jakiego koloru są kwiaty ${plant.name}?`,
      answer: `Kwiaty ${plant.name} występują w kolorach: ${colors}. ${plant.scent !== "none" ? "Roślina ma wyczuwalny zapach." : "Kwiaty nie wyróżniają się zapachem."}`,
    },
    {
      question: `Gdzie posadzić ${plant.name} w ogrodzie?`,
      answer: `${plant.name} to ${PLANT_CATEGORIES[plant.category].label.toLowerCase()} o wysokości ${plant.height}. Preferuje stanowisko: ${light}.`,
    },
  ];
}

export function getRelatedFloweringPlants(
  plant: FloweringPlant,
  limit = 6
): FloweringPlant[] {
  const bloomMonths = new Set(getPlantBloomMonths(plant));
  return FLOWERING_PLANTS.filter((p) => p.id !== plant.id)
    .map((p) => {
      const overlap = getPlantBloomMonths(p).filter((m) => bloomMonths.has(m)).length;
      const sameCategory = p.category === plant.category ? 2 : 0;
      return { plant: p, score: overlap + sameCategory };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.plant);
}

export function getPlantCalculatorLinks(
  plant: FloweringPlant
): { href: string; label: string }[] {
  const links: { href: string; label: string }[] = [];
  const name = plant.name.toLowerCase();

  links.push({
    href: "/kalkulator-nawadniania",
    label: `Ile wody potrzebuje ${name}?`,
  });

  if (plant.category === "drzewo" || plant.category === "krzew") {
    const growthSlug = getPlantGrowthPresetSlug(plant.id);
    links.push({
      href: growthSlug ? `/kalkulator-wzrostu/${growthSlug}` : "/kalkulator-wzrostu",
      label: `Wzrost ${name} rok po roku`,
    });
  }

  if (plant.category === "krzew") {
    links.push({
      href: "/kalkulator-zywoplotu",
      label: `Żywopłot z ${name}`,
    });
    links.push({
      href: "/porownywarka-krzewow",
      label: `Porównaj ${name} z innymi krzewami`,
    });
  }

  if (plant.category === "drzewo") {
    links.push({
      href: "/kalkulator-cienia",
      label: `Ile cienia daje ${name}?`,
    });
    links.push({
      href: "/porownywarka-drzew",
      label: `Porównaj ${name} z innymi drzewami`,
    });
  }

  if (plant.light.includes("cien") || plant.light.includes("polcien")) {
    links.push({
      href: "/kalkulator-cienia",
      label: "Kalkulator cienia",
    });
  }

  if (plant.beeFriendly) {
    links.push({
      href: "/kalkulator-laki-kwietnej",
      label: "Łąka kwietna dla pszczół",
    });
  }

  return links.slice(0, 5);
}

export function getPlantCareTips(plant: FloweringPlant): string[] {
  const light = plant.light.map((l) => LIGHT_LABELS[l].toLowerCase()).join(" lub ");
  const tips: string[] = [`Stanowisko: ${light}. Wysokość dorosła: ${plant.height}.`];

  if (plant.category === "krzew" || plant.category === "drzewo") {
    tips.push(
      "Sadzenie najlepiej wiosną lub jesienią — unikaj suszy letniej przy świeżo posadzonych okazach."
    );
  }

  if (plant.category === "krzew") {
    tips.push(
      "Formujące cięcie po kwitnieniu — nie przycinaj zimą roślin kwitnących na zeszłorocznych pędach."
    );
  }

  if (plant.light.includes("pelne-slonce")) {
    tips.push("W pełnym słońcu zapewnij regularne podlewanie w pierwszym sezonie po sadzeniu.");
  }

  if (plant.light.includes("cien")) {
    tips.push("W głębokim cieniu kwitnienie bywa słabsze — wybierz stanowisko z porannym słońcem.");
  }

  if (plant.beeFriendly) {
    tips.push("Nie stosuj insektycydów w okresie kwitnienia — roślina jest cenna dla zapylaczy.");
  }

  if (plant.winterBloom) {
    tips.push("Kwitnienie zimowe — osłoń korzenie ściółką, unikaj wietrznych miejsc.");
  }

  if (plant.autumnColor) {
    tips.push("Jesienne przebarwienie liści — warto sadzić w widocznym miejscu rabaty.");
  }

  return tips;
}

export function getPlantMonthCatalogLinks(plant: FloweringPlant) {
  const months =
    getPlantPeakMonths(plant).length > 0
      ? getPlantPeakMonths(plant)
      : getPlantBloomMonths(plant);
  return months.map((num) => {
    const month = MONTH_LABELS.find((m) => m.num === num)!;
    return {
      href: `/katalog-kwitnienia/rosliny-kwitnace-w-${MONTH_LOCATIVE_SLUGS[num]}`,
      label: `Co kwitnie w ${month.locative}?`,
    };
  });
}

export function jsonLdFloweringPlant(plant: FloweringPlant, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: getPlantPageTitle(plant),
    description: getPlantPageDescription(plant),
    url,
    inLanguage: "pl-PL",
    about: {
      "@type": "Thing",
      name: plant.latinName,
      alternateName: plant.name,
    },
    author: {
      "@type": "Organization",
      name: "Ogrodelo.pl",
      url: "https://www.ogrodelo.pl",
    },
  };
}
