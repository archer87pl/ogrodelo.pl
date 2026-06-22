export interface ShadeInput {
  treeHeight: number;
  crownWidth: number;
}

export interface MonthlyShade {
  month: string;
  monthNum: number;
  shadeArea: number;
  sunAngle: number;
  coverage: number;
}

export interface ShadeResult {
  monthlyShade: MonthlyShade[];
  maxShadeArea: number;
  minShadeArea: number;
  tips: string[];
}

const MONTHS = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const SUN_ANGLES_PL = [22, 28, 38, 50, 60, 65, 63, 58, 48, 36, 26, 20];

export function calculateShade(input: ShadeInput): ShadeResult {
  const { treeHeight, crownWidth } = input;

  const crownArea = Math.PI * Math.pow(crownWidth / 2, 2);

  const monthlyShade: MonthlyShade[] = MONTHS.map((month, i) => {
    const sunAngle = SUN_ANGLES_PL[i];
    const shadowLength = treeHeight / Math.tan((sunAngle * Math.PI) / 180);
    const shadeArea = Math.round(
      crownArea + shadowLength * crownWidth * 0.6
    );
    const coverage = Math.min(
      100,
      Math.round((shadeArea / (crownArea * 3)) * 100)
    );

    return {
      month,
      monthNum: i + 1,
      shadeArea,
      sunAngle,
      coverage,
    };
  });

  const areas = monthlyShade.map((m) => m.shadeArea);

  return {
    monthlyShade,
    maxShadeArea: Math.max(...areas),
    minShadeArea: Math.min(...areas),
    tips: [
      "W czerwcu–lipcu cień jest największy — planuj nasadzenia odpowiednio.",
      "Drzewa liściaste dają cień letni, iglaste — całoroczny.",
      `Przy koronie ${crownWidth} m maksymalny cień to ok. ${Math.max(...areas)} m².`,
    ],
  };
}
