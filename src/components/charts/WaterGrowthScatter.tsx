interface ScatterPointLike {
  species: string;
  name: string;
  waterNeed: number;
  growthPerYearCm: number;
  isA?: boolean;
  isB?: boolean;
}

interface WaterGrowthScatterProps {
  points: ScatterPointLike[];
  ariaLabel?: string;
}

const W = 400;
const H = 260;
const PAD = { top: 16, right: 20, bottom: 40, left: 44 };

export function WaterGrowthScatter({
  points,
  ariaLabel = "Wykres zapotrzebowania na wodę vs tempo wzrostu",
}: WaterGrowthScatterProps) {
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const toX = (water: number) => PAD.left + ((water - 1) / 4) * plotW;
  const toY = (growth: number) => {
    const maxGrowth = Math.max(...points.map((p) => p.growthPerYearCm), 80);
    return PAD.top + plotH - (growth / maxGrowth) * plotH;
  };

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={ariaLabel}>
        {[1, 2, 3, 4, 5].map((tick) => (
          <g key={tick}>
            <line
              x1={toX(tick)}
              y1={PAD.top}
              x2={toX(tick)}
              y2={H - PAD.bottom}
              stroke="#e5e7e5"
              strokeWidth="1"
            />
            <text x={toX(tick)} y={H - 12} textAnchor="middle" fontSize="10" fill="#6b7280">
              {tick}
            </text>
          </g>
        ))}

        <text x={W / 2} y={H - 2} textAnchor="middle" fontSize="10" fill="#6b7280">
          Zapotrzebowanie na wodę (1–5)
        </text>
        <text
          x={12}
          y={H / 2}
          textAnchor="middle"
          fontSize="10"
          fill="#6b7280"
          transform={`rotate(-90, 12, ${H / 2})`}
        >
          Wzrost (cm/rok)
        </text>

        {points.map((p) => {
          const cx = toX(p.waterNeed);
          const cy = toY(p.growthPerYearCm);
          const r = p.isA || p.isB ? 7 : 4;
          const fill = p.isA ? "#2d6a2d" : p.isB ? "#4a9a4a" : "#a8c8a8";
          const stroke = p.isA || p.isB ? "#1e4a1e" : "none";

          return (
            <g key={p.species}>
              <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={p.isA || p.isB ? 2 : 0} />
              {(p.isA || p.isB) && (
                <text x={cx} y={cy - 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#2d6a2d">
                  {p.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-xs text-muted mt-1">
        Szybki wzrost często = więcej wody. Zaznaczone: porównywane gatunki.
      </p>
    </div>
  );
}
