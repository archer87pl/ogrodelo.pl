export type SoilType = "prochnica" | "glina" | "piasek" | "kwasna" | "nieznam";
export type SunLevel = "pelne" | "czesciowe" | "zacieniony";
export type BudgetLevel = "niski" | "sredni" | "wysoki" | "premium";
export type MaintenanceLevel = "minimalna" | "umiarkowana" | "aktywna";
export type SlopeLevel = "plaski" | "lekki" | "stromy";

export type GardenGoal =
  | "prywatnosc"
  | "warzywa"
  | "trawnik"
  | "kwiaty"
  | "relaks"
  | "niska_pielegnacja"
  | "biodiversyjnosc"
  | "dzieci"
  | "zwierzeta"
  | "zywoplot";

export interface GardenPlanInput {
  areaM2: number;
  goals: GardenGoal[];
  soil: SoilType;
  sun: SunLevel;
  slope: SlopeLevel;
  budget: BudgetLevel;
  maintenance: MaintenanceLevel;
  hasPets: boolean;
  hasChildren: boolean;
  wantsIrrigation: boolean;
  wantsRainwater: boolean;
  wantsHedge: boolean;
  wantsTrees: boolean;
  wantsVegetableBed: boolean;
  hedgeLengthM: number;
}

export interface GardenZone {
  id: string;
  name: string;
  icon: string;
  areaM2: number;
  percent: number;
  description: string;
  plants: string[];
  priority: "wysoki" | "sredni" | "niski";
}

export interface PlanPhase {
  phase: number;
  title: string;
  season: string;
  tasks: string[];
  estimatedCost: number;
}

export interface CostLine {
  category: string;
  item: string;
  quantity: string;
  unitCost: number;
  total: number;
  optional?: boolean;
}

export interface PlanRecommendation {
  title: string;
  description: string;
  link?: string;
  priority: "wysoki" | "sredni" | "niski";
}

export interface GardenPlanScores {
  sustainability: number;
  lowMaintenance: number;
  familyFriendly: number;
  biodiversity: number;
}

export interface GardenPlanResult {
  summary: string;
  profileLabel: string;
  zones: GardenZone[];
  phases: PlanPhase[];
  costs: CostLine[];
  totalMin: number;
  totalMax: number;
  yearlyMaintenance: number;
  scores: GardenPlanScores;
  recommendations: PlanRecommendation[];
  hedgeSpecies: string;
  treeSuggestions: string[];
  irrigationLitersWeek: number;
  tips: string[];
}

interface ZoneWeight {
  id: string;
  name: string;
  icon: string;
  weight: number;
  description: string;
  plants: string[];
  priority: "wysoki" | "sredni" | "niski";
  costPerM2: [number, number];
}

const GOAL_LABELS: Record<GardenGoal, string> = {
  prywatnosc: "Prywatność",
  warzywa: "Warzywa i owoce",
  trawnik: "Trawnik rekreacyjny",
  kwiaty: "Kwiaty i rabaty",
  relaks: "Strefa relaksu",
  niska_pielegnacja: "Niska pielęgnacja",
  biodiversyjnosc: "Biodiversywność",
  dzieci: "Bezpieczny dla dzieci",
  zwierzeta: "Przyjazny zwierzętom",
  zywoplot: "Żywopłot",
};

export const GARDEN_GOAL_OPTIONS = Object.entries(GOAL_LABELS).map(([value, label]) => ({
  value: value as GardenGoal,
  label,
}));

export const SOIL_OPTIONS = [
  { value: "prochnica" as const, label: "Próchnica (żyzna)", hint: "Idealna — większość roślin" },
  { value: "glina" as const, label: "Glina", hint: "Ciężka — wymaga poprawy struktury" },
  { value: "piasek" as const, label: "Piasek", hint: "Szybko wysycha — mulcz i kompost" },
  { value: "kwasna" as const, label: "Kwaśna", hint: "Wrzosy, azalie, borówki" },
  { value: "nieznam" as const, label: "Nie wiem", hint: "Zalecamy badanie pH gleby" },
];

export const SUN_OPTIONS = [
  { value: "pelne" as const, label: "Pełne słońce (6+ h)", hint: "Trawnik, warzywa, słoneczniki" },
  { value: "czesciowe" as const, label: "Częściowe (3–6 h)", hint: "Większość krzewów i bylin" },
  { value: "zacieniony" as const, label: "Zacieniony (<3 h)", hint: "Cis, paprocie, hosty" },
];

export const BUDGET_OPTIONS = [
  { value: "niski" as const, label: "Ekonomiczny", hint: "do ~80 PLN/m²" },
  { value: "sredni" as const, label: "Standardowy", hint: "~80–150 PLN/m²" },
  { value: "wysoki" as const, label: "Komfortowy", hint: "~150–250 PLN/m²" },
  { value: "premium" as const, label: "Premium", hint: "250+ PLN/m²" },
];

export const MAINTENANCE_OPTIONS = [
  { value: "minimalna" as const, label: "Minimalna (1–2 h/tydz.)", hint: "Trawnik robot, żywopłot 1×/rok" },
  { value: "umiarkowana" as const, label: "Umiarkowana (3–5 h/tydz.)", hint: "Typowy ogród domowy" },
  { value: "aktywna" as const, label: "Aktywna (5+ h/tydz.)", hint: "Warzywnik, rabaty, kompost" },
];

const BUDGET_MULT: Record<BudgetLevel, number> = {
  niski: 0.75,
  sredni: 1,
  wysoki: 1.35,
  premium: 1.85,
};

function estimatePerimeter(area: number): number {
  const side = Math.sqrt(area);
  return Math.round(side * 4 * 0.85);
}

function pickHedgeSpecies(input: GardenPlanInput): string {
  if (input.goals.includes("niska_pielegnacja") || input.maintenance === "minimalna") {
    return "Laurowiśnia — szybki, zdrowy żywopłot";
  }
  if (input.hasPets || input.goals.includes("zwierzeta")) {
    return "Berberys lub ostrokrzew — bez toksycznych owoców dla psów";
  }
  if (input.sun === "zacieniony") {
    return "Laurowiśnia lub bukszpan — tolerują półcień";
  }
  if (input.goals.includes("prywatnosc") || input.goals.includes("zywoplot")) {
    return "Grab lub laurowiśnia — gęsty ekran w 3–5 lat";
  }
  return "Ligustr lub grab — uniwersalny żywopłot";
}

function pickTrees(input: GardenPlanInput): string[] {
  const trees: string[] = [];
  if (input.areaM2 < 200) {
    trees.push("Brzoza lub klon jawor — szybki cień, kompaktowa korona");
    if (input.hasChildren) trees.push("Jabłoń lub grusza — owoce + bezpieczna wysokość");
  } else if (input.areaM2 < 600) {
    trees.push("Lipa lub klon — alejowy cień na taras");
    trees.push("Sosna lub jodła — iglasty akcent zimą");
  } else {
    trees.push("Dąb lub buk — długowieczny, min. 8 m od domu");
    trees.push("Kasztanowiec lub lipa — szeroka korona na dużą działkę");
  }
  if (input.goals.includes("biodiversyjnosc")) {
    trees.push("Dereń, kalina, lipa — nektar i jagody dla ptaków");
  }
  if (input.sun === "zacieniony") {
    return ["Cis lub jawor — tolerują zacienienie", "Klon jawor — jesienne barwy"];
  }
  return trees.slice(0, 3);
}

function computeZoneWeights(input: GardenPlanInput): ZoneWeight[] {
  const w = {
    trawnik: 0,
    warzywnik: 0,
    rabaty: 0,
    relaks: 0,
    dziko: 0,
    sciezki: 0,
  };

  const has = (g: GardenGoal) => input.goals.includes(g);

  if (has("trawnik") || input.goals.length === 0) w.trawnik += 35;
  if (has("warzywa") || input.wantsVegetableBed) w.warzywnik += 28;
  if (has("kwiaty")) w.rabaty += 22;
  if (has("relaks")) w.relaks += 18;
  if (has("biodiversyjnosc")) w.dziko += 15;
  if (has("dzieci")) {
    w.trawnik += 15;
    w.relaks += 10;
  }
  if (has("niska_pielegnacja") || input.maintenance === "minimalna") {
    w.trawnik += 10;
    w.rabaty -= 8;
    w.warzywnik -= 5;
  }
  if (has("prywatnosc") || has("zywoplot") || input.wantsHedge) {
    w.sciezki += 5;
  }
  if (input.sun === "zacieniony") {
    w.trawnik -= 10;
    w.rabaty += 12;
    w.dziko += 8;
  }
  if (input.soil === "piasek") w.warzywnik -= 5;

  w.sciezki += 12;
  w.trawnik = Math.max(w.trawnik, 15);

  const total = Object.values(w).reduce((s, v) => s + Math.max(v, 0), 0) || 1;

  const plantsFor = (zone: string): string[] => {
    const lowMaint = input.maintenance === "minimalna" || has("niska_pielegnacja");
    const map: Record<string, string[]> = {
      trawnik: lowMaint
        ? ["Trawa krajowa odporna (np. użytkowa)", "Opcja: robot koszący"]
        : ["Mieszanka sportowo-rekreacyjna", "Nawóz jesienny + wiosenny"],
      warzywnik: has("dzieci")
        ? ["Marchew, rzodkiewka, truskawki", "Ziemia kompostowa 30 cm"]
        : ["Tomaty, papryka, cukinia, sałata", "Podwyższone grządki 80 cm"],
      rabaty: input.sun === "zacieniony"
        ? ["Hosty, paprocie, bergenia, astilbe"]
        : input.soil === "kwasna"
          ? ["Azalie, wrzosy, hortensje pH<6"]
          : ["Byliny: lawenda, szałwia, echinacea", "Mulcz kora 5 cm"],
      relaks: ["Tarasy drewniane lub kostka", "Meble ogrodowe, parasol", "Rośliny donicowe"],
      dziko: ["Łąka kwietna (mieszanka native)", "Drewniane pnie, budka lęgowa", "Kompostownik"],
      sciezki: ["Kostka brukowa lub żwir stabilizowany", "Oświetlenie LED solar"],
    };
    return map[zone] ?? [];
  };

  const defs: { key: keyof typeof w; id: string; name: string; icon: string; desc: string; cost: [number, number]; pri: "wysoki" | "sredni" | "niski" }[] = [
    {
      key: "trawnik",
      id: "trawnik",
      name: "Trawnik rekreacyjny",
      icon: "🟢",
      desc: "Strefa gry i wypoczynku — koszenie, nawadnianie w suszy.",
      cost: [18, 32],
      pri: has("trawnik") ? "wysoki" : "sredni",
    },
    {
      key: "warzywnik",
      id: "warzywnik",
      name: "Warzywnik / ogródek",
      icon: "🥕",
      desc: "Grządki podwyższone lub klasyczne — sezon od marca do października.",
      cost: [45, 75],
      pri: has("warzywa") ? "wysoki" : "niski",
    },
    {
      key: "rabaty",
      id: "rabaty",
      name: "Rabaty i kwiaty",
      icon: "🌸",
      desc: "Byliny wieloletnie — kolor od wiosny do jesieni.",
      cost: [35, 65],
      pri: has("kwiaty") ? "wysoki" : "sredni",
    },
    {
      key: "relaks",
      id: "relaks",
      name: "Strefa relaksu",
      icon: "🪑",
      desc: "Taras, pergola lub kącik z meblami — serce ogrodu.",
      cost: [120, 220],
      pri: has("relaks") ? "wysoki" : "niski",
    },
    {
      key: "dziko",
      id: "dziko",
      name: "Kącik dzikości",
      icon: "🦋",
      desc: "Łąka kwietna, owady zapylające, minimalna ingerencja.",
      cost: [12, 25],
      pri: has("biodiversyjnosc") ? "wysoki" : "niski",
    },
    {
      key: "sciezki",
      id: "sciezki",
      name: "Ścieżki i dojścia",
      icon: "🛤️",
      desc: "Połączenia między strefami — odporne na ruch.",
      cost: [90, 160],
      pri: "sredni",
    },
  ];

  return defs
    .filter((d) => w[d.key] > 0)
    .map((d) => ({
      id: d.id,
      name: d.name,
      icon: d.icon,
      weight: w[d.key] / total,
      description: d.desc,
      plants: plantsFor(d.id),
      priority: d.pri,
      costPerM2: d.cost,
    }));
}

function buildZones(input: GardenPlanInput, weights: ZoneWeight[]): GardenZone[] {
  let remaining = input.areaM2;
  const zones = weights.map((zw, i) => {
    const isLast = i === weights.length - 1;
    const areaM2 = isLast
      ? remaining
      : Math.round(input.areaM2 * zw.weight);
    remaining -= areaM2;
    return {
      id: zw.id,
      name: zw.name,
      icon: zw.icon,
      areaM2: Math.max(areaM2, 0),
      percent: Math.round(zw.weight * 100),
      description: zw.description,
      plants: zw.plants,
      priority: zw.priority,
    };
  });
  const sum = zones.reduce((s, z) => s + z.areaM2, 0);
  if (sum !== input.areaM2 && zones.length > 0) {
    zones[0]!.areaM2 += input.areaM2 - sum;
    zones[0]!.percent = Math.round((zones[0]!.areaM2 / input.areaM2) * 100);
  }
  return zones;
}

function buildCosts(input: GardenPlanInput, zones: GardenZone[], weights: ZoneWeight[]): CostLine[] {
  const mult = BUDGET_MULT[input.budget];
  const lines: CostLine[] = [];

  for (const zone of zones) {
    const zw = weights.find((w) => w.id === zone.id);
    if (!zw || zone.areaM2 <= 0) continue;
    const [lo, hi] = zw.costPerM2;
    const unit = Math.round(((lo + hi) / 2) * mult);
    lines.push({
      category: zone.name,
      item: `Realizacja strefy (${zone.name.toLowerCase()})`,
      quantity: `${zone.areaM2} m²`,
      unitCost: unit,
      total: zone.areaM2 * unit,
    });
  }

  if (input.soil === "glina" || input.soil === "piasek" || input.soil === "nieznam") {
    const improve = Math.round(input.areaM2 * 0.4);
    lines.push({
      category: "Przygotowanie",
      item: "Poprawa gleby (kompost + piasek)",
      quantity: `${improve} m²`,
      unitCost: Math.round(15 * mult),
      total: improve * Math.round(15 * mult),
    });
  }

  const hedgeLen = input.wantsHedge || input.goals.includes("zywoplot") || input.goals.includes("prywatnosc")
    ? input.hedgeLengthM || estimatePerimeter(input.areaM2)
    : 0;

  if (hedgeLen > 0) {
    const perM = Math.round(95 * mult);
    lines.push({
      category: "Żywopłot",
      item: `${pickHedgeSpecies(input)} — sadzonki + materiał`,
      quantity: `${hedgeLen} mb`,
      unitCost: perM,
      total: hedgeLen * perM,
      optional: !input.wantsHedge && !input.goals.includes("zywoplot"),
    });
  }

  if (input.wantsTrees) {
    const count = input.areaM2 < 200 ? 1 : input.areaM2 < 500 ? 2 : 3;
    const perTree = Math.round(280 * mult);
    lines.push({
      category: "Drzewa",
      item: "Sadzonki drzew liściastych (z nasadzeniem)",
      quantity: `${count} szt.`,
      unitCost: perTree,
      total: count * perTree,
    });
  }

  if (input.wantsIrrigation) {
    const irrigArea = zones.find((z) => z.id === "trawnik")?.areaM2 ?? Math.round(input.areaM2 * 0.4);
    const perM2 = Math.round(28 * mult);
    lines.push({
      category: "Nawadnianie",
      item: "Instalacja zraszaczy / kroplówka",
      quantity: `${irrigArea} m²`,
      unitCost: perM2,
      total: irrigArea * perM2,
      optional: true,
    });
  }

  if (input.wantsRainwater) {
    const tank = input.areaM2 > 400 ? 5000 : 3000;
    const tankCost = Math.round((tank === 5000 ? 3200 : 2200) * mult);
    lines.push({
      category: "Deszczówka",
      item: `Zbiornik ${tank} l + pompa + rury`,
      quantity: "1 zestaw",
      unitCost: tankCost,
      total: tankCost,
      optional: true,
    });
  }

  lines.push({
    category: "Narzędzia",
    item: "Podstawowy zestaw startowy",
    quantity: "1 komplet",
    unitCost: Math.round(450 * mult),
    total: Math.round(450 * mult),
  });

  if (input.hasChildren) {
    lines.push({
      category: "Bezpieczeństwo",
      item: "Piasek do piaskownicy + obrzeża miękkie",
      quantity: "1 zestaw",
      unitCost: Math.round(600 * mult),
      total: Math.round(600 * mult),
      optional: true,
    });
  }

  return lines;
}

function buildPhases(input: GardenPlanInput, costs: CostLine[]): PlanPhase[] {
  const soilCost = costs.filter((c) => c.category === "Przygotowanie").reduce((s, c) => s + c.total, 0);
  const hedgeCost = costs.filter((c) => c.category === "Żywopłot").reduce((s, c) => s + c.total, 0);
  const zoneCost = costs
    .filter((c) => !["Żywopłot", "Drzewa", "Nawadnianie", "Deszczówka", "Narzędzia", "Bezpieczeństwo", "Przygotowanie"].includes(c.category))
    .reduce((s, c) => s + c.total, 0);
  const infraCost = costs
    .filter((c) => ["Nawadnianie", "Deszczówka", "Drzewa"].includes(c.category))
    .reduce((s, c) => s + c.total, 0);

  return [
    {
      phase: 1,
      title: "Przygotowanie terenu",
      season: "Jesień lub wczesna wiosna",
      tasks: [
        "Pomiar działki i wyznaczenie stref (patrz plan)",
        input.soil !== "prochnica" ? "Poprawa gleby — kompost 5–10 kg/m²" : "Sprawdzenie pH gleby",
        "Usunięcie chwastów, wyrównanie terenu",
        input.slope === "stromy" ? "Budowa tarasów schodkowych na stoku" : "Wyznaczenie spadków od domu",
      ],
      estimatedCost: soilCost + Math.round(zoneCost * 0.15),
    },
    {
      phase: 2,
      title: "Infrastruktura i żywopłot",
      season: "Październik–listopad lub marzec–kwiecień",
      tasks: [
        ...(hedgeCost > 0 ? ["Nasadzenie żywopłotu — sadzonki co 40–50 cm", "Nawodnienie po posadzeniu"] : []),
        ...(input.wantsTrees ? ["Sadzenie drzew — zachowaj min. odległości od domu"] : []),
        "Wykonanie ścieżek i obrzeży",
        ...(input.wantsIrrigation ? ["Montaż instalacji nawadniania pod ziemią"] : []),
      ],
      estimatedCost: hedgeCost + Math.round(infraCost * 0.7),
    },
    {
      phase: 3,
      title: "Nasadzenia i trawnik",
      season: "Kwiecień–maj",
      tasks: [
        "Założenie trawniku z rolki lub siew — najlepszy czas: wrzesień/kwiecień",
        ...(input.wantsVegetableBed || input.goals.includes("warzywa")
          ? ["Grządki warzywne — kompost + agrowłóknina"]
          : []),
        "Nasadzenie bylin i krzewów ozdobnych",
        "Ściółkowanie rabat kora 5 cm",
      ],
      estimatedCost: Math.round(zoneCost * 0.6),
    },
    {
      phase: 4,
      title: "Strefa relaksu i wykończenie",
      season: "Maj–czerwiec",
      tasks: [
        ...(input.goals.includes("relaks") ? ["Tarasy, meble, oświetlenie solarne"] : []),
        ...(input.goals.includes("biodiversyjnosc") ? ["Siew łąki kwietnej", "Budka dla ptaków"] : []),
        ...(input.wantsRainwater ? ["Podłączenie zbiornika na deszczówkę"] : []),
        "Ostatnie poprawki, nawożenie startowe",
      ],
      estimatedCost: Math.round(zoneCost * 0.25 + infraCost * 0.3),
    },
  ];
}

function computeScores(input: GardenPlanInput): GardenPlanScores {
  let sustainability = 50;
  let lowMaintenance = 50;
  let familyFriendly = 50;
  let biodiversity = 40;

  if (input.goals.includes("biodiversyjnosc")) biodiversity += 30;
  if (input.wantsRainwater) sustainability += 25;
  if (input.wantsVegetableBed || input.goals.includes("warzywa")) sustainability += 15;
  if (input.goals.includes("niska_pielegnacja")) lowMaintenance += 25;
  if (input.maintenance === "minimalna") lowMaintenance += 20;
  if (input.maintenance === "aktywna") lowMaintenance -= 15;
  if (input.hasChildren || input.goals.includes("dzieci")) familyFriendly += 30;
  if (input.hasPets || input.goals.includes("zwierzeta")) familyFriendly += 15;
  if (input.wantsIrrigation) sustainability -= 5;

  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  return {
    sustainability: clamp(sustainability),
    lowMaintenance: clamp(lowMaintenance),
    familyFriendly: clamp(familyFriendly),
    biodiversity: clamp(biodiversity),
  };
}

function buildRecommendations(input: GardenPlanInput, scores: GardenPlanScores): PlanRecommendation[] {
  const recs: PlanRecommendation[] = [];

  if (input.goals.includes("prywatnosc") || input.wantsHedge) {
    recs.push({
      title: "Dobierz żywopłot precyzyjnie",
      description: `Rekomendacja: ${pickHedgeSpecies(input)}. Policz sadzonki i koszt w kalkulatorze żywopłotu.`,
      link: "/kalkulator-zywoplotu",
      priority: "wysoki",
    });
  }

  if (input.wantsIrrigation || input.goals.includes("trawnik")) {
    recs.push({
      title: "Oblicz zapotrzebowanie na wodę",
      description: "Sprawdź litry/tydzień, koszt podlewania i harmonogram z prognozą pogody.",
      link: "/kalkulator-nawadniania",
      priority: "wysoki",
    });
  }

  if (input.wantsTrees) {
    recs.push({
      title: "Porównaj drzewa przed sadzeniem",
      description: "Sprawdź wzrost, korzenie i odległość od domu — dąb vs sosna i 14 innych.",
      link: "/porownywarka-drzew",
      priority: "sredni",
    });
  }

  if (input.wantsHedge || input.goals.includes("zywoplot")) {
    recs.push({
      title: "Laurowiśnia vs tuja",
      description: "Porównaj zdrowie, wzrost i koszt — ważne przy wyborze żywopłotu.",
      link: "/porownywarka-krzewow/laurowisnia-vs-tuja",
      priority: "sredni",
    });
  }

  if (input.wantsRainwater) {
    recs.push({
      title: "Dobierz zbiornik na deszczówkę",
      description: "Policz ile litrów rocznie zbierzesz z dachu i na ile dni wystarczy.",
      link: "/kalkulator-deszczowki",
      priority: "sredni",
    });
  }

  if (scores.biodiversity < 60 && !input.goals.includes("biodiversyjnosc")) {
    recs.push({
      title: "Rozważ kącik biodiversywny",
      description: "Nawet 5 m² łąki kwietnej przyciąga pszczoły i zmniejsza koszty koszenia.",
      priority: "niski",
    });
  }

  if (input.soil === "nieznam") {
    recs.push({
      title: "Zbadaj glebę przed inwestycją",
      description: "Test pH (ok. 30 PLN) pozwoli dobrać rośliny i uniknąć przesadzenia.",
      priority: "wysoki",
    });
  }

  return recs.sort((a, b) => {
    const p = { wysoki: 0, sredni: 1, niski: 2 };
    return p[a.priority] - p[b.priority];
  });
}

function buildSummary(input: GardenPlanInput, profileLabel: string): string {
  const goals = input.goals.length
    ? input.goals.map((g) => GOAL_LABELS[g]).join(", ")
    : "uniwersalny ogród rekreacyjny";
  return `Plan dla działki ${input.areaM2} m² (${profileLabel}). Priorytety: ${goals}. Gleba: ${SOIL_OPTIONS.find((s) => s.value === input.soil)?.label ?? input.soil}, nasłonecznienie: ${SUN_OPTIONS.find((s) => s.value === input.sun)?.label ?? input.sun}. Budżet: ${BUDGET_OPTIONS.find((b) => b.value === input.budget)?.label ?? input.budget}.`;
}

function profileLabel(input: GardenPlanInput): string {
  if (input.areaM2 < 150) return "mały ogród miejski";
  if (input.areaM2 < 400) return "średni ogród rodzinny";
  if (input.areaM2 < 800) return "duży ogród działkowy";
  return "rozległa posesja";
}

function estimateIrrigation(input: GardenPlanInput, lawnM2: number): number {
  const base = lawnM2 * 0.25;
  const veg = input.goals.includes("warzywa") ? 35 : 0;
  const sunMult = input.sun === "pelne" ? 1.2 : input.sun === "zacieniony" ? 0.75 : 1;
  return Math.round((base + veg) * sunMult);
}

function buildTips(input: GardenPlanInput): string[] {
  const tips: string[] = [];

  if (input.slope === "stromy") {
    tips.push("Na stromym terenie stosuj tarasy — zapobiega spływowi wody i erozji gleby.");
  }
  if (input.soil === "glina") {
    tips.push("Do gliny dodaj piasek i kompost (1:1:1) — poprawia drenaż i strukturę.");
  }
  if (input.hasPets) {
    tips.push("Unikaj cis, bukszpanu i tui w zasięgu psów — niektóre części są toksyczne.");
  }
  if (input.maintenance === "minimalna") {
    tips.push("Zamień część trawnika na byliny z mulczem — mniej koszenia, mniej wody.");
  }
  if (input.budget === "niski") {
    tips.push("Realizuj plan w 4 fazach — rozłóż koszty na 2 sezony.");
  }
  tips.push("Zacznij od żywopłotu i drzew — rośliny wieloletnie najlepiej sadzić jesienią.");

  return tips;
}

export function getDefaultGardenPlanInput(partial?: Partial<GardenPlanInput>): GardenPlanInput {
  return {
    areaM2: 300,
    goals: ["trawnik", "relaks"],
    soil: "prochnica",
    sun: "pelne",
    slope: "plaski",
    budget: "sredni",
    maintenance: "umiarkowana",
    hasPets: false,
    hasChildren: false,
    wantsIrrigation: false,
    wantsRainwater: false,
    wantsHedge: false,
    wantsTrees: true,
    wantsVegetableBed: false,
    hedgeLengthM: 40,
    ...partial,
  };
}

export function generateGardenPlan(input: GardenPlanInput): GardenPlanResult {
  const weights = computeZoneWeights(input);
  const zones = buildZones(input, weights);
  const costs = buildCosts(input, zones, weights);
  const required = costs.filter((c) => !c.optional);
  const optional = costs.filter((c) => c.optional);
  const reqTotal = required.reduce((s, c) => s + c.total, 0);
  const optTotal = optional.reduce((s, c) => s + c.total, 0);
  const scores = computeScores(input);
  const lawnM2 = zones.find((z) => z.id === "trawnik")?.areaM2 ?? 0;
  const label = profileLabel(input);

  return {
    summary: buildSummary(input, label),
    profileLabel: label,
    zones,
    phases: buildPhases(input, costs),
    costs,
    totalMin: Math.round(reqTotal * 0.9),
    totalMax: Math.round(reqTotal + optTotal * 0.85),
    yearlyMaintenance: Math.round(
      input.areaM2 * (input.maintenance === "minimalna" ? 2 : input.maintenance === "aktywna" ? 8 : 4.5)
    ),
    scores,
    recommendations: buildRecommendations(input, scores),
    hedgeSpecies: pickHedgeSpecies(input),
    treeSuggestions: pickTrees(input),
    irrigationLitersWeek: estimateIrrigation(input, lawnM2),
    tips: buildTips(input),
  };
}

export const MAIN_GARDEN_PLAN_FAQ: { question: string; answer: string }[] = [
  {
    question: "Ile kosztuje założenie ogrodu od zera?",
    answer:
      "Orientacyjnie 80–150 PLN/m² w wariancie standardowym (gleba, trawnik, rabaty). Mały ogród 200 m²: 16–30 tys. PLN. Żywopłot, nawadnianie i taras podnoszą koszt.",
  },
  {
    question: "Od czego zacząć planowanie ogrodu?",
    answer:
      "Od pomiaru działki i określenia priorytetów (trawnik, warzywa, prywatność). Następnie poprawa gleby, żywopłot/drzewa, trawnik i rabaty — w tej kolejności.",
  },
  {
    question: "Jak podzielić ogród na strefy?",
    answer:
      "Typowy podział: 40% trawnik, 15% rabaty, 10% warzywnik, 10% relaks, 12% ścieżki, reszta żywopłot i drzewa. Generator dostosowuje proporcje do Twoich celów.",
  },
  {
    question: "Czy generator uwzględnia mój budżet?",
    answer:
      "Tak — wybierasz poziom budżetu (ekonomiczny do premium), a kosztorys mnoży ceny materiałów odpowiednim współczynnikiem. Opcjonalne pozycje (nawadnianie, deszczówka) widać osobno.",
  },
  {
    question: "Czy plan można realizować etapami?",
    answer:
      "Tak — generator tworzy 4 fazy (przygotowanie → infrastruktura → nasadzenia → wykończenie) z szacunkiem kosztów każdej fazy i harmonogramem sezonowym.",
  },
];

export { GOAL_LABELS, estimatePerimeter };
