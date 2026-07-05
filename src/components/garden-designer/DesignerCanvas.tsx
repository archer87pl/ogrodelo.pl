"use client";

import { useCallback, useRef, useState } from "react";
import { ELEMENT_COLORS, getCatalogItem } from "@/lib/garden-designer/catalog";
import type { CatalogItem } from "@/lib/garden-designer/catalog";
import {
  PX_PER_M,
  snapM,
  newElementId,
  type GardenElement,
  type GardenProject,
  type DesignerTool,
  type GardenElementKind,
  type RectElement,
} from "@/lib/garden-designer/types";

interface DesignerCanvasProps {
  project: GardenProject;
  selectedId: string | null;
  tool: DesignerTool;
  activeItem: CatalogItem | null;
  onSelect: (id: string | null) => void;
  onChange: (elements: GardenElement[]) => void;
}

function toSvg(m: number): number {
  return m * PX_PER_M;
}

function fromSvg(px: number): number {
  return px / PX_PER_M;
}

export function DesignerCanvas({
  project,
  selectedId,
  tool,
  activeItem,
  onSelect,
  onChange,
}: DesignerCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<{
    id: string;
    startX: number;
    startY: number;
    elX: number;
    elY: number;
  } | null>(null);
  const [zoneDraw, setZoneDraw] = useState<{
    kind: GardenElementKind;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  } | null>(null);
  const [fencePoints, setFencePoints] = useState<{ x: number; y: number }[]>([]);

  const w = toSvg(project.widthM);
  const h = toSvg(project.heightM);

  const clientToMeters = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const svgPt = pt.matrixTransform(ctm.inverse());
      return {
        x: snapM(Math.max(0, Math.min(project.widthM, fromSvg(svgPt.x)))),
        y: snapM(Math.max(0, Math.min(project.heightM, fromSvg(svgPt.y)))),
      };
    },
    [project.widthM, project.heightM]
  );

  const updateElement = (id: string, updater: (el: GardenElement) => GardenElement) => {
    onChange(project.elements.map((el) => (el.id === id ? updater(el) : el)));
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target !== svgRef.current) return;
    const { x, y } = clientToMeters(e.clientX, e.clientY);

    if (tool === "select") {
      onSelect(null);
      return;
    }

    if (!activeItem) return;

    if (activeItem.placeAs === "tree") {
      const el: GardenElement = {
        type: "tree",
        id: newElementId(),
        kind: "drzewo",
        x,
        y,
        radiusM: activeItem.defaultRadiusM ?? 2,
      };
      onChange([...project.elements, el]);
      onSelect(el.id);
      return;
    }

    if (activeItem.placeAs === "rect") {
      const el: RectElement = {
        type: "rect",
        id: newElementId(),
        kind: activeItem.kind as RectElement["kind"],
        x: snapM(x - (activeItem.defaultW ?? 1) / 2),
        y: snapM(y - (activeItem.defaultH ?? 1) / 2),
        w: activeItem.defaultW ?? 1,
        h: activeItem.defaultH ?? 1,
      };
      onChange([...project.elements, el]);
      onSelect(el.id);
      return;
    }

    if (activeItem.placeAs === "fence-tool") {
      setFencePoints((prev) => [...prev, { x, y }]);
      return;
    }

    if (activeItem.placeAs === "zone-tool") {
      setZoneDraw({ kind: activeItem.kind, x0: x, y0: y, x1: x, y1: y });
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (zoneDraw) {
      const { x, y } = clientToMeters(e.clientX, e.clientY);
      setZoneDraw((z) => (z ? { ...z, x1: x, y1: y } : null));
    }
    if (drag) {
      const { x, y } = clientToMeters(e.clientX, e.clientY);
      const dx = x - drag.startX;
      const dy = y - drag.startY;
      updateElement(drag.id, (el) => {
        if (el.type === "rect" || el.type === "tree") {
          return { ...el, x: snapM(drag.elX + dx), y: snapM(drag.elY + dy) };
        }
        if (el.type === "fence") {
          return {
            ...el,
            points: el.points.map((p) => ({
              x: snapM(p.x + dx),
              y: snapM(p.y + dy),
            })),
          };
        }
        return el;
      });
    }
  };

  const handleSvgMouseUp = () => {
    if (zoneDraw) {
      const x = Math.min(zoneDraw.x0, zoneDraw.x1);
      const y = Math.min(zoneDraw.y0, zoneDraw.y1);
      const w = Math.abs(zoneDraw.x1 - zoneDraw.x0);
      const h = Math.abs(zoneDraw.y1 - zoneDraw.y0);
      if (w >= 0.5 && h >= 0.5) {
        const el: RectElement = {
          type: "rect",
          id: newElementId(),
          kind: zoneDraw.kind as RectElement["kind"],
          x,
          y,
          w: snapM(w),
          h: snapM(h),
        };
        onChange([...project.elements, el]);
        onSelect(el.id);
      }
      setZoneDraw(null);
    }
    setDrag(null);
  };

  const finishFence = () => {
    if (fencePoints.length >= 2) {
      const el: GardenElement = {
        type: "fence",
        id: newElementId(),
        kind: "ogrodzenie",
        points: [...fencePoints],
      };
      onChange([...project.elements, el]);
      onSelect(el.id);
    }
    setFencePoints([]);
  };

  const onElementPointerDown = (e: React.PointerEvent, el: GardenElement) => {
    e.stopPropagation();
    if (tool !== "select") return;
    onSelect(el.id);
    const { x, y } = clientToMeters(e.clientX, e.clientY);
    const elX = el.type === "fence" ? el.points[0]?.x ?? 0 : el.x;
    const elY = el.type === "fence" ? el.points[0]?.y ?? 0 : el.y;
    setDrag({ id: el.id, startX: x, startY: y, elX, elY });
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    onChange(project.elements.filter((el) => el.id !== selectedId));
    onSelect(null);
  };

  const gridLines = [];
  for (let x = 0; x <= project.widthM; x++) {
    gridLines.push(
      <line
        key={`vx-${x}`}
        x1={toSvg(x)}
        y1={0}
        x2={toSvg(x)}
        y2={h}
        stroke={x % 5 === 0 ? "#d4e4d4" : "#e8f5e0"}
        strokeWidth={x % 5 === 0 ? 1 : 0.5}
      />
    );
  }
  for (let y = 0; y <= project.heightM; y++) {
    gridLines.push(
      <line
        key={`hy-${y}`}
        x1={0}
        y1={toSvg(y)}
        x2={w}
        y2={toSvg(y)}
        stroke={y % 5 === 0 ? "#d4e4d4" : "#e8f5e0"}
        strokeWidth={y % 5 === 0 ? 1 : 0.5}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          Skala: 1 kwadrat = 1 m · Działka {project.widthM}×{project.heightM} m
        </span>
        <div className="flex gap-2">
          {fencePoints.length > 0 && (
            <>
              <span className="text-primary font-medium">
                Ogrodzenie: {fencePoints.length} pkt — kliknij „Zakończ linię”
              </span>
              <button
                type="button"
                onClick={finishFence}
                className="rounded-full bg-primary px-3 py-1 text-white text-xs font-medium"
              >
                Zakończ linię
              </button>
              <button
                type="button"
                onClick={() => setFencePoints([])}
                className="rounded-full border border-border px-3 py-1 text-xs"
              >
                Anuluj
              </button>
            </>
          )}
          {selectedId && (
            <button
              type="button"
              onClick={deleteSelected}
              className="rounded-full border border-red-300 text-red-700 px-3 py-1 text-xs hover:bg-red-50"
            >
              Usuń zaznaczone
            </button>
          )}
        </div>
      </div>

      {activeItem && tool === "place" && (
        <p className="text-xs text-primary bg-accent/50 rounded-lg px-3 py-2">
          {activeItem.hint}
          {activeItem.placeAs === "zone-tool" && " — przeciągnij prostokąt na planie"}
          {activeItem.placeAs === "fence-tool" && " — klikaj kolejne punkty"}
        </p>
      )}

      <div className="overflow-auto rounded-2xl border border-border bg-white shadow-inner max-h-[min(70vh,600px)]">
        <svg
          ref={svgRef}
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="cursor-crosshair touch-none select-none"
          onClick={handleSvgClick}
          onMouseMove={handleSvgMouseMove}
          onMouseUp={handleSvgMouseUp}
          onMouseLeave={handleSvgMouseUp}
          role="img"
          aria-label="Plan ogrodu — siatka w metrach"
        >
          <rect x={0} y={0} width={w} height={h} fill="#f0fdf4" />
          {gridLines}

          {project.elements.map((el) => renderElement(el, selectedId === el.id, onElementPointerDown))}

          {zoneDraw && (
            <rect
              x={toSvg(Math.min(zoneDraw.x0, zoneDraw.x1))}
              y={toSvg(Math.min(zoneDraw.y0, zoneDraw.y1))}
              width={toSvg(Math.abs(zoneDraw.x1 - zoneDraw.x0))}
              height={toSvg(Math.abs(zoneDraw.y1 - zoneDraw.y0))}
              fill={ELEMENT_COLORS[zoneDraw.kind].fill}
              fillOpacity={0.5}
              stroke={ELEMENT_COLORS[zoneDraw.kind].stroke}
              strokeDasharray="4 2"
            />
          )}

          {fencePoints.length > 0 && (
            <polyline
              points={fencePoints.map((p) => `${toSvg(p.x)},${toSvg(p.y)}`).join(" ")}
              fill="none"
              stroke="#57534e"
              strokeWidth={3}
              strokeDasharray="6 3"
            />
          )}
          {fencePoints.map((p, i) => (
            <circle key={i} cx={toSvg(p.x)} cy={toSvg(p.y)} r={4} fill="#57534e" />
          ))}
        </svg>
      </div>
    </div>
  );
}

function renderElement(
  el: GardenElement,
  selected: boolean,
  onPointerDown: (e: React.PointerEvent, el: GardenElement) => void
) {
  const stroke = selected ? "#2d6a2d" : undefined;
  const strokeWidth = selected ? 3 : 2;

  if (el.type === "rect") {
    const colors = ELEMENT_COLORS[el.kind];
    const item = getCatalogItem(el.kind);
    return (
      <g
        key={el.id}
        onPointerDown={(e) => onPointerDown(e, el)}
        className="cursor-grab active:cursor-grabbing"
      >
        <rect
          x={toSvg(el.x)}
          y={toSvg(el.y)}
          width={toSvg(el.w)}
          height={toSvg(el.h)}
          fill={colors.fill}
          fillOpacity={el.kind === "trawnik" || el.kind === "sciezka" ? 0.7 : 0.9}
          stroke={stroke ?? colors.stroke}
          strokeWidth={strokeWidth}
          rx={4}
        />
        <text
          x={toSvg(el.x + el.w / 2)}
          y={toSvg(el.y + el.h / 2)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={Math.min(toSvg(el.w), toSvg(el.h)) * 0.35}
          pointerEvents="none"
        >
          {item.icon}
        </text>
        {selected && (
          <text
            x={toSvg(el.x)}
            y={toSvg(el.y) - 4}
            fontSize={10}
            fill="#1e4a1e"
            pointerEvents="none"
          >
            {item.label} ({el.w}×{el.h} m)
          </text>
        )}
      </g>
    );
  }

  if (el.type === "tree") {
    const r = toSvg(el.radiusM);
    return (
      <g
        key={el.id}
        onPointerDown={(e) => onPointerDown(e, el)}
        className="cursor-grab active:cursor-grabbing"
      >
        <circle
          cx={toSvg(el.x)}
          cy={toSvg(el.y)}
          r={r}
          fill={ELEMENT_COLORS.drzewo.fill}
          fillOpacity={0.6}
          stroke={stroke ?? ELEMENT_COLORS.drzewo.stroke}
          strokeWidth={strokeWidth}
        />
        <text
          x={toSvg(el.x)}
          y={toSvg(el.y)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={r * 0.8}
          pointerEvents="none"
        >
          🌳
        </text>
      </g>
    );
  }

  if (el.type === "fence") {
    const pts = el.points.map((p) => `${toSvg(p.x)},${toSvg(p.y)}`).join(" ");
    return (
      <g
        key={el.id}
        onPointerDown={(e) => onPointerDown(e, el)}
        className="cursor-grab active:cursor-grabbing"
      >
        <polyline
          points={pts}
          fill="none"
          stroke={stroke ?? "#57534e"}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {el.points.map((p, i) => (
          <circle key={i} cx={toSvg(p.x)} cy={toSvg(p.y)} r={3} fill="#57534e" />
        ))}
      </g>
    );
  }

  return null;
}
