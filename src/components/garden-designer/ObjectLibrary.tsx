"use client";

import { OBJECT_CATALOG, CATALOG_CATEGORIES } from "@/lib/garden-designer/catalog";
import type { CatalogItem } from "@/lib/garden-designer/catalog";
import type { DesignerTool, GardenElementKind } from "@/lib/garden-designer/types";

interface ObjectLibraryProps {
  activeKind: GardenElementKind | null;
  tool: DesignerTool;
  onSelectItem: (item: CatalogItem) => void;
  onToolChange: (tool: DesignerTool) => void;
}

export function ObjectLibrary({
  activeKind,
  tool,
  onSelectItem,
  onToolChange,
}: ObjectLibraryProps) {
  return (
    <aside className="rounded-2xl border border-border bg-card p-4 space-y-4 h-fit">
      <div>
        <h2 className="text-sm font-bold text-primary-dark mb-2">Narzędzia</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToolChange("select")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
              tool === "select"
                ? "bg-primary text-white border-primary"
                : "border-border hover:border-primary"
            }`}
          >
            ✋ Wybierz
          </button>
          <button
            type="button"
            onClick={() => onToolChange("place")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
              tool === "place"
                ? "bg-primary text-white border-primary"
                : "border-border hover:border-primary"
            }`}
          >
            ➕ Umieść
          </button>
        </div>
      </div>

      {CATALOG_CATEGORIES.map((cat) => {
        const items = OBJECT_CATALOG.filter((i) => i.category === cat.id);
        return (
          <div key={cat.id}>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <button
                  key={item.kind}
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className={`rounded-xl border p-2.5 text-left transition-colors ${
                    activeKind === item.kind
                      ? "border-primary bg-accent ring-2 ring-primary/30"
                      : "border-border hover:border-primary bg-background"
                  }`}
                  title={item.hint}
                >
                  <span className="text-xl" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="block text-xs font-medium text-foreground mt-1 leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
