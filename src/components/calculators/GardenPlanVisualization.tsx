import type { PlanLayout } from "@/lib/calculators/garden-plan-layout";
import type { GardenZone } from "@/lib/calculators/garden-plan";

interface GardenPlanVisualizationProps {
  layout: PlanLayout;
  zones: GardenZone[];
}

const ZONE_STYLE: Record<string, { fill: string; stroke: string; label: string; icon: string }> = {
  trawnik: { fill: "#a8d590", stroke: "#7bb35e", label: "Trawnik", icon: "🟢" },
  warzywnik: { fill: "#e8c896", stroke: "#c9a35f", label: "Warzywnik", icon: "🥕" },
  rabaty: { fill: "#f2b8cd", stroke: "#d98cab", label: "Rabaty", icon: "🌸" },
  relaks: { fill: "#ddcfb4", stroke: "#b8a67f", label: "Taras / relaks", icon: "🪑" },
  dziko: { fill: "#cede8a", stroke: "#a8bc5c", label: "Łąka kwietna", icon: "🦋" },
  sciezki: { fill: "#d9d2c5", stroke: "#b3aa97", label: "Ścieżka", icon: "🛤️" },
  zywoplot: { fill: "#3f7d3f", stroke: "#2d6a2d", label: "Żywopłot", icon: "🌿" },
};

export function GardenPlanVisualization({ layout, zones }: GardenPlanVisualizationProps) {
  const { plotW, plotL, gridStep } = layout;

  // Skala: plan mieści się w ~640 px szerokości.
  const scale = 640 / plotW;
  const margin = 34;
  const houseH = layout.house.h * scale;
  const svgW = plotW * scale + margin * 2;
  const svgH = plotL * scale + margin * 2 + houseH + 14;

  const X = (m: number) => margin + m * scale;
  const Y = (m: number) => margin + m * scale;

  const gridX: number[] = [];
  for (let g = gridStep; g < plotW; g += gridStep) gridX.push(g);
  const gridY: number[] = [];
  for (let g = gridStep; g < plotL; g += gridStep) gridY.push(g);

  const usedIds = new Set<string>([
    ...(layout.lawn ? ["trawnik"] : []),
    ...layout.zones.map((z) => z.id),
    ...layout.paths.map((p) => p.id),
    ...(layout.hedge.length ? ["zywoplot"] : []),
  ]);
  const legend = Object.entries(ZONE_STYLE).filter(([id]) => usedIds.has(id));

  const zoneAreaM2 = (id: string) => zones.find((z) => z.id === id)?.areaM2;

  return (
    <figure className="space-y-3">
      <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto min-w-[420px]"
          role="img"
          aria-label={`Schematyczny plan działki ${plotW} na ${plotL} metrów z podziałem na strefy`}
        >
          {/* Tło działki + trawnik */}
          <rect x={X(0)} y={Y(0)} width={plotW * scale} height={plotL * scale} fill="#f2f7ec" stroke="#94a894" strokeWidth={1.5} />
          {layout.lawn && (
            <rect
              x={X(layout.lawn.x)}
              y={Y(layout.lawn.y)}
              width={layout.lawn.w * scale}
              height={layout.lawn.h * scale}
              fill={ZONE_STYLE.trawnik!.fill}
            />
          )}

          {/* Siatka metrów */}
          {gridX.map((g) => (
            <line key={`gx${g}`} x1={X(g)} y1={Y(0)} x2={X(g)} y2={Y(plotL)} stroke="#ffffff" strokeOpacity={0.45} strokeWidth={1} />
          ))}
          {gridY.map((g) => (
            <line key={`gy${g}`} x1={X(0)} y1={Y(g)} x2={X(plotW)} y2={Y(g)} stroke="#ffffff" strokeOpacity={0.45} strokeWidth={1} />
          ))}

          {/* Żywopłot */}
          {layout.hedge.map((h, i) => (
            <rect
              key={`hedge${i}`}
              x={X(h.x)}
              y={Y(h.y)}
              width={h.w * scale}
              height={h.h * scale}
              fill={ZONE_STYLE.zywoplot!.fill}
              stroke={ZONE_STYLE.zywoplot!.stroke}
              strokeWidth={1}
              rx={3}
            />
          ))}

          {/* Ścieżki */}
          {layout.paths.map((p, i) => (
            <rect
              key={`path${i}`}
              x={X(p.x)}
              y={Y(p.y)}
              width={p.w * scale}
              height={p.h * scale}
              fill={ZONE_STYLE.sciezki!.fill}
              stroke={ZONE_STYLE.sciezki!.stroke}
              strokeWidth={1}
              strokeDasharray="4 3"
              rx={4}
            />
          ))}

          {/* Strefy */}
          {layout.zones.map((z, i) => {
            const st = ZONE_STYLE[z.id];
            if (!st) return null;
            const zw = z.w * scale;
            const zh = z.h * scale;
            const showText = zw > 74 && zh > 34;
            const area = zoneAreaM2(z.id);
            return (
              <g key={`zone${i}`}>
                <rect x={X(z.x)} y={Y(z.y)} width={zw} height={zh} fill={st.fill} stroke={st.stroke} strokeWidth={1.5} rx={6} />
                {showText ? (
                  <>
                    <text x={X(z.x) + zw / 2} y={Y(z.y) + zh / 2 - 4} textAnchor="middle" fontSize={13} fontWeight={600} fill="#1a2e1a">
                      {st.icon} {st.label}
                    </text>
                    {area !== undefined && (
                      <text x={X(z.x) + zw / 2} y={Y(z.y) + zh / 2 + 13} textAnchor="middle" fontSize={11} fill="#41523f">
                        ~{area} m²
                      </text>
                    )}
                  </>
                ) : (
                  <text x={X(z.x) + zw / 2} y={Y(z.y) + zh / 2 + 5} textAnchor="middle" fontSize={13}>
                    {st.icon}
                  </text>
                )}
              </g>
            );
          })}

          {/* Drzewa */}
          {layout.trees.map((tr, i) => (
            <g key={`tree${i}`}>
              <circle cx={X(tr.x)} cy={Y(tr.y)} r={tr.r * scale} fill="#5c9c50" fillOpacity={0.85} stroke="#3f7d3f" strokeWidth={1.5} />
              <circle cx={X(tr.x)} cy={Y(tr.y)} r={Math.max(2.5, tr.r * scale * 0.14)} fill="#7a5230" />
            </g>
          ))}

          {/* Dom z tarasem */}
          <rect
            x={X(layout.house.x)}
            y={Y(layout.house.y)}
            width={layout.house.w * scale}
            height={layout.house.h * scale}
            fill="#e6e1d8"
            stroke="#9a917f"
            strokeWidth={1.5}
            rx={4}
          />
          <text
            x={X(layout.house.x) + (layout.house.w * scale) / 2}
            y={Y(layout.house.y) + (layout.house.h * scale) / 2 + 5}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="#4d463a"
          >
            🏠 Dom
          </text>

          {/* Wymiary */}
          <text x={X(plotW / 2)} y={margin - 12} textAnchor="middle" fontSize={12} fill="#6b7c6b">
            ← {plotW} m →
          </text>
          <text
            x={margin - 14}
            y={Y(plotL / 2)}
            textAnchor="middle"
            fontSize={12}
            fill="#6b7c6b"
            transform={`rotate(-90 ${margin - 14} ${Y(plotL / 2)})`}
          >
            ← {plotL} m →
          </text>

          {/* Kompas: góra planu = ekspozycja ogrodu */}
          <g transform={`translate(${svgW - margin - 4} ${margin + 8})`}>
            <circle r={15} fill="#ffffff" stroke="#94a894" strokeWidth={1} />
            <g transform={`rotate(${layout.northAngle})`}>
              <path d="M0,-11 L3.5,3 L0,0.5 L-3.5,3 Z" fill="#2d6a2d" />
              <g transform={`translate(0 -20) rotate(${-layout.northAngle})`}>
                <text y={3} textAnchor="middle" fontSize={9} fontWeight={700} fill="#2d6a2d">
                  N
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      <figcaption className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted px-1">
        {legend.map(([id, st]) => (
          <span key={id} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm border" style={{ backgroundColor: st.fill, borderColor: st.stroke }} />
            {st.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border" style={{ backgroundColor: "#5c9c50", borderColor: "#3f7d3f" }} />
          Drzewo
        </span>
        <span className="text-muted/80">Siatka: {gridStep} m · plan schematyczny w skali</span>
      </figcaption>
    </figure>
  );
}
