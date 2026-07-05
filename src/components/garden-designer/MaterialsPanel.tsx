"use client";

import type { MaterialLine } from "@/lib/garden-designer/types";
import { materialsTotalPln } from "@/lib/garden-designer/materials";

interface MaterialsPanelProps {
  lines: MaterialLine[];
}

export function MaterialsPanel({ lines }: MaterialsPanelProps) {
  const total = materialsTotalPln(lines);

  if (lines.length === 0) {
    return (
      <aside className="rounded-2xl border border-border bg-card p-5 h-fit">
        <h2 className="text-sm font-bold text-primary-dark mb-2">Lista materiałów</h2>
        <p className="text-sm text-muted">
          Dodaj elementy na planie — automatycznie wygenerujemy listę potrzebnych materiałów.
        </p>
      </aside>
    );
  }

  const byCategory = lines.reduce<Record<string, MaterialLine[]>>((acc, line) => {
    (acc[line.category] ??= []).push(line);
    return acc;
  }, {});

  return (
    <aside className="rounded-2xl border border-border bg-card p-5 h-fit max-h-[70vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-2 mb-4">
        <h2 className="text-sm font-bold text-primary-dark">Lista materiałów</h2>
        {total > 0 && (
          <p className="text-sm font-bold text-primary whitespace-nowrap">
            ~{total.toLocaleString("pl-PL")} PLN
          </p>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(byCategory).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-muted uppercase mb-2">{category}</h3>
            <ul className="space-y-2">
              {items.map((line) => (
                <li
                  key={`${category}-${line.item}`}
                  className="rounded-lg bg-accent/40 px-3 py-2 text-sm"
                >
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-foreground">{line.item}</span>
                    <span className="text-primary-dark font-semibold shrink-0">
                      {line.quantity} {line.unit}
                    </span>
                  </div>
                  {line.note && <p className="text-xs text-muted mt-1">{line.note}</p>}
                  {line.estimatedPln !== undefined && line.estimatedPln > 0 && (
                    <p className="text-xs text-muted mt-0.5">
                      ~{line.estimatedPln.toLocaleString("pl-PL")} PLN
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted mt-4 border-t border-border pt-3">
        Ceny orientacyjne — zweryfikuj u lokalnego dostawcy. Kalkulatory:{" "}
        <a href="/kalkulator-zywoplotu" className="text-primary hover:underline">
          żywopłot
        </a>
        ,{" "}
        <a href="/kalkulator-trawnika" className="text-primary hover:underline">
          trawnik
        </a>
        .
      </p>
    </aside>
  );
}
