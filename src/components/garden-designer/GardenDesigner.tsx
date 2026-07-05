"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectLibrary } from "@/components/garden-designer/ObjectLibrary";
import { DesignerCanvas } from "@/components/garden-designer/DesignerCanvas";
import { MaterialsPanel } from "@/components/garden-designer/MaterialsPanel";
import type { CatalogItem } from "@/lib/garden-designer/catalog";
import { generateMaterials } from "@/lib/garden-designer/materials";
import {
  loadProjects,
  upsertProject,
  deleteProject,
} from "@/lib/garden-designer/storage";
import {
  createEmptyProject,
  type GardenProject,
  type GardenElement,
  type DesignerTool,
} from "@/lib/garden-designer/types";

export function GardenDesigner() {
  const [project, setProject] = useState<GardenProject>(() => createEmptyProject());
  const [savedProjects, setSavedProjects] = useState<GardenProject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<DesignerTool>("place");
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    setSavedProjects(loadProjects());
  }, []);

  const materials = useMemo(() => generateMaterials(project), [project]);

  const updateElements = useCallback((elements: GardenElement[]) => {
    setProject((p) => ({ ...p, elements }));
  }, []);

  const handleSelectItem = (item: CatalogItem) => {
    setActiveItem(item);
    setTool("place");
  };

  const handleSave = () => {
    const list = upsertProject(project);
    setSavedProjects(list);
    setSaveMsg("Projekt zapisany w przeglądarce");
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const handleNew = () => {
    const name = project.name || "Mój ogród";
    setProject(createEmptyProject(`${name} (kopia)`));
    setSelectedId(null);
  };

  const handleLoad = (id: string) => {
    const p = savedProjects.find((x) => x.id === id);
    if (p) {
      setProject(p);
      setSelectedId(null);
    }
  };

  const handleDeleteSaved = (id: string) => {
    const list = deleteProject(id);
    setSavedProjects(list);
    if (project.id === id) setProject(createEmptyProject(project.name));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 flex-1">
          <label className="text-sm">
            <span className="font-medium text-foreground block mb-1">Nazwa projektu</span>
            <input
              type="text"
              value={project.name}
              onChange={(e) => setProject((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-foreground block mb-1">Szerokość (m)</span>
            <input
              type="number"
              min={5}
              max={100}
              value={project.widthM}
              onChange={(e) =>
                setProject((p) => ({ ...p, widthM: Number(e.target.value) || 20 }))
              }
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-foreground block mb-1">Długość (m)</span>
            <input
              type="number"
              min={5}
              max={100}
              value={project.heightM}
              onChange={(e) =>
                setProject((p) => ({ ...p, heightM: Number(e.target.value) || 15 }))
              }
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-foreground block mb-1">Zapisane projekty</span>
            <select
              className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background"
              value=""
              onChange={(e) => e.target.value && handleLoad(e.target.value)}
            >
              <option value="">— Wczytaj —</option>
              {savedProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({new Date(p.updatedAt).toLocaleDateString("pl-PL")})
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            💾 Zapisz projekt
          </button>
          <button
            type="button"
            onClick={handleNew}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:border-primary transition-colors"
          >
            Nowy plan
          </button>
        </div>
      </div>

      {saveMsg && (
        <p className="text-sm text-primary font-medium bg-accent/50 rounded-lg px-4 py-2">
          {saveMsg}
        </p>
      )}

      {savedProjects.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {savedProjects.slice(0, 5).map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1"
            >
              <button type="button" onClick={() => handleLoad(p.id)} className="hover:text-primary">
                {p.name}
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSaved(p.id)}
                className="text-muted hover:text-red-600 ml-1"
                aria-label={`Usuń ${p.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[220px_1fr_280px]">
        <ObjectLibrary
          activeKind={activeItem?.kind ?? null}
          tool={tool}
          onSelectItem={handleSelectItem}
          onToolChange={setTool}
        />
        <DesignerCanvas
          project={project}
          selectedId={selectedId}
          tool={tool}
          activeItem={activeItem}
          onSelect={setSelectedId}
          onChange={updateElements}
        />
        <MaterialsPanel lines={materials} />
      </div>
    </div>
  );
}
