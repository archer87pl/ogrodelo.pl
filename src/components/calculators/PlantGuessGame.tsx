"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FloweringPlant } from "@/lib/constants/flowering-plants";
import {
  MAX_GUESSES,
  categoryLabel,
  colorLabel,
  evaluateGuess,
  formatBloomMonths,
  getDailyPlant,
  getGuessPool,
  type GuessFeedback,
} from "@/lib/calculators/plant-guess";
import { LIGHT_LABELS } from "@/lib/constants/flowering-plants";

const FEEDBACK_STYLES = {
  match: "bg-green-500 text-white",
  partial: "bg-amber-400 text-white",
  miss: "bg-slate-300 text-slate-700",
};

function feedbackLabel(key: keyof GuessFeedback, value: GuessFeedback[keyof GuessFeedback]): string {
  const base: Record<keyof GuessFeedback, string> = {
    category: "Kategoria",
    bloom: "Kwitnienie",
    color: "Kolor",
    light: "Światło",
    height: "Wysokość",
  };
  const suffix =
    value === "match" ? " ✓" : value === "partial" ? " ~" : " ✗";
  return base[key] + suffix;
}

export function PlantGuessGame() {
  const target = useMemo(() => getDailyPlant(), []);
  const pool = useMemo(() => getGuessPool(), []);
  const [guesses, setGuesses] = useState<FloweringPlant[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const won = guesses.some((g) => g.id === target.id);
  const lost = guesses.length >= MAX_GUESSES && !won;

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const used = new Set(guesses.map((g) => g.id));
    return pool
      .filter((p) => !used.has(p.id) && p.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, pool, guesses]);

  function pick(plant: FloweringPlant) {
    if (won || lost || guesses.length >= MAX_GUESSES) return;
    if (guesses.some((g) => g.id === plant.id)) return;
    setGuesses((prev) => [...prev, plant]);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <p className="text-center text-sm text-muted">
        Dzisiejsza roślina: wybierz z listy (masz {MAX_GUESSES - guesses.length} prób
        {guesses.length > 0 ? ` — zostało ${MAX_GUESSES - guesses.length}` : ""})
      </p>

      {!won && !lost && (
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Wpisz nazwę rośliny…"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm"
            disabled={guesses.length >= MAX_GUESSES}
          />
          {open && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-xl border border-border bg-card shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => pick(p)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent/60"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="space-y-3">
        {guesses.map((g) => {
          const fb = evaluateGuess(g, target);
          return (
            <div key={g.id} className="rounded-xl border border-border overflow-hidden">
              <div className="bg-accent/40 px-4 py-2 font-medium text-sm">{g.name}</div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 p-2">
                {(Object.keys(fb) as (keyof GuessFeedback)[]).map((key) => (
                  <span
                    key={key}
                    className={`rounded-lg px-2 py-1.5 text-xs text-center font-medium ${FEEDBACK_STYLES[fb[key]]}`}
                  >
                    {feedbackLabel(key, fb[key])}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {won && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-2xl font-bold text-primary-dark">🎉 Trafione!</p>
          <p className="mt-2 text-muted">
            To <strong>{target.name}</strong> ({target.latinName})
          </p>
          <Link
            href={`/katalog-kwitnienia/roslina/${target.id}`}
            className="inline-block mt-4 text-primary font-medium hover:underline"
          >
            Zobacz kartę rośliny →
          </Link>
        </div>
      )}

      {lost && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-lg font-bold text-primary-dark">Koniec prób</p>
          <p className="mt-2 text-muted">
            Dzisiejsza roślina to <strong>{target.name}</strong>
          </p>
          <p className="text-sm text-muted mt-1">
            Kwitnienie: {formatBloomMonths(target)} · {categoryLabel(target.category)} ·{" "}
            {target.colors.map(colorLabel).join(", ")} · {target.light.map((l) => LIGHT_LABELS[l]).join(", ")}
          </p>
          <Link
            href={`/katalog-kwitnienia/roslina/${target.id}`}
            className="inline-block mt-4 text-primary font-medium hover:underline"
          >
            Poznaj gatunek →
          </Link>
        </div>
      )}
    </div>
  );
}
