import type { HeightPoint } from "@/lib/calculators/tree-comparator";

interface GrowthLineChartProps {
  dataA: HeightPoint[];
  dataB: HeightPoint[];
  labelA: string;
  labelB: string;
  ariaLabel?: string;
}

const W = 480;
const H = 220;
const PAD = { top: 16, right: 16, bottom: 32, left: 44 };

export function GrowthLineChart({
  dataA,
  dataB,
  labelA,
  labelB,
  ariaLabel = "Wykres wzrostu wysokości drzewa w czasie",
}: GrowthLineChartProps) {
  const allHeights = [...dataA, ...dataB].map((d) => d.heightM);
  const maxY = Math.max(...allHeights, 1);
  const maxX = Math.max(...dataA.map((d) => d.years), 50);

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const toX = (years: number) => PAD.left + (years / maxX) * plotW;
  const toY = (h: number) => PAD.top + plotH - (h / maxY) * plotH;

  const lineA = dataA.map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.years).toFixed(1)},${toY(d.heightM).toFixed(1)}`).join(" ");
  const lineB = dataB.map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.years).toFixed(1)},${toY(d.heightM).toFixed(1)}`).join(" ");

  const yTicks = [0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY].map((v) =>
    Math.round(v * 10) / 10
  );
  const xTicks = [1, 10, 20, 30, 40, 50].filter((t) => t <= maxX);

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel}
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              y1={toY(tick)}
              x2={W - PAD.right}
              y2={toY(tick)}
              stroke="#e5e7e5"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 6}
              y={toY(tick) + 4}
              textAnchor="end"
              fontSize="10"
              fill="#6b7280"
            >
              {tick}m
            </text>
          </g>
        ))}

        {xTicks.map((tick) => (
          <text
            key={tick}
            x={toX(tick)}
            y={H - 8}
            textAnchor="middle"
            fontSize="10"
            fill="#6b7280"
          >
            {tick} lat
          </text>
        ))}

        <path d={lineA} fill="none" stroke="#2d6a2d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={lineB} fill="none" stroke="#4a9a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" />

        {dataA.map((d) => (
          <circle key={`a-${d.years}`} cx={toX(d.years)} cy={toY(d.heightM)} r="3.5" fill="#2d6a2d" />
        ))}
        {dataB.map((d) => (
          <circle key={`b-${d.years}`} cx={toX(d.years)} cy={toY(d.heightM)} r="3.5" fill="#4a9a4a" />
        ))}
      </svg>

      <div className="flex flex-wrap gap-4 mt-2 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-primary-dark rounded" />
          {labelA}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 border-t-2 border-dashed border-primary-light" />
          {labelB}
        </span>
      </div>
      <p className="text-xs text-muted mt-1">Oś X: lata · Oś Y: wysokość (m)</p>
    </div>
  );
}
