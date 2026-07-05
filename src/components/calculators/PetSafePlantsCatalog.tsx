"use client";

import { useMemo, useState } from "react";
import {
  PET_PLANTS,
  type PetPlant,
  type ToxicityLevel,
} from "@/lib/constants/pet-plants";

const LEVEL_ORDER: ToxicityLevel[] = ["bezpieczna", "lagodna", "umiarkowana", "wysoka"];

const LEVEL_STYLES: Record<ToxicityLevel, string> = {
  bezpieczna: "bg-green-100 text-green-800",
  lagodna: "bg-lime-100 text-lime-800",
  umiarkowana: "bg-amber-100 text-amber-800",
  wysoka: "bg-red-100 text-red-800",
};

function levelLabel(level: ToxicityLevel): string {
  const labels: Record<ToxicityLevel, string> = {
    bezpieczna: "Bezpieczna",
    lagodna: "Łagodna",
    umiarkowana: "Umiarkowana",
    wysoka: "Wysoka",
  };
  return labels[level];
}

export function PetSafePlantsCatalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "dog" | "cat" | "child">("all");
  const [maxLevel, setMaxLevel] = useState<ToxicityLevel>("wysoka");

  const filtered = useMemo(() => {
    const maxIdx = LEVEL_ORDER.indexOf(maxLevel);
    return PET_PLANTS.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !p.name.toLowerCase().includes(q) && !p.category.includes(q)) return false;
      const levels = [p.dog, p.cat, p.child];
      const relevant =
        filter === "all"
          ? levels
          : [p[filter]];
      return relevant.every((l) => LEVEL_ORDER.indexOf(l) <= maxIdx);
    });
  }, [query, filter, maxLevel]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm sm:col-span-2">
          <span className="font-medium text-foreground block mb-1">Szukaj rośliny</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="np. tuja, lilia, lawenda…"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="font-medium text-foreground block mb-1">Dla kogo</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background"
          >
            <option value="all">Pies, kot i dziecko</option>
            <option value="dog">Pies</option>
            <option value="cat">Kot</option>
            <option value="child">Dziecko</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-foreground block mb-1">Pokaż do poziomu</span>
          <select
            value={maxLevel}
            onChange={(e) => setMaxLevel(e.target.value as ToxicityLevel)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background"
          >
            <option value="bezpieczna">Tylko bezpieczne</option>
            <option value="lagodna">Do łagodnej</option>
            <option value="umiarkowana">Do umiarkowanej</option>
            <option value="wysoka">Wszystkie (w tym wysoka)</option>
          </select>
        </label>
      </div>

      <p className="text-sm text-muted">
        Znaleziono {filtered.length} gatunków. Przy silnych objawach po zjedzeniu rośliny — weterynarz lub
        szpitalny oddział toksykologii.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}

function PlantCard({ plant }: { plant: PetPlant }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold text-primary-dark">{plant.name}</h3>
      <p className="text-xs text-muted capitalize mb-3">{plant.category}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge label="Pies" level={plant.dog} />
        <Badge label="Kot" level={plant.cat} />
        <Badge label="Dziecko" level={plant.child} />
      </div>
      {plant.symptoms && (
        <p className="mt-3 text-sm text-muted">
          <strong>Objawy:</strong> {plant.symptoms}
        </p>
      )}
      {plant.note && <p className="mt-1 text-sm text-muted">{plant.note}</p>}
    </article>
  );
}

function Badge({ label, level }: { label: string; level: ToxicityLevel }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-medium ${LEVEL_STYLES[level]}`}>
      {label}: {levelLabel(level)}
    </span>
  );
}
