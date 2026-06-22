"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  CALENDAR_CATEGORIES,
  CALENDAR_MONTHS,
  getCurrentMonthNumber,
  type CalendarCategory,
  type CalendarMonth,
} from "@/lib/constants/garden-calendar";
import { GardenCalendarMonthNav } from "@/components/calculators/GardenCalendarMonthNav";

interface GardenCalendarProps {
  preset?: CalendarMonth;
}

const CATEGORY_FILTERS: { value: CalendarCategory | "wszystkie"; label: string }[] = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "trawnik", label: "Trawnik" },
  { value: "drzewa", label: "Drzewa" },
  { value: "krzewy", label: "Krzewy" },
  { value: "warzywnik", label: "Warzywnik" },
  { value: "kwiaty", label: "Kwiaty" },
  { value: "ogolne", label: "Ogólne" },
];

const PRIORITY_STYLES = {
  wysoki: "bg-red-100 text-red-800",
  sredni: "bg-amber-100 text-amber-800",
  niski: "bg-slate-100 text-slate-600",
};

export function GardenCalendar({ preset }: GardenCalendarProps) {
  const currentMonthNum = getCurrentMonthNumber();
  const [selectedMonth, setSelectedMonth] = useState(
    preset?.number ?? currentMonthNum
  );
  const [categoryFilter, setCategoryFilter] = useState<CalendarCategory | "wszystkie">(
    "wszystkie"
  );

  const activeMonth = useMemo(
    () => CALENDAR_MONTHS.find((m) => m.number === selectedMonth) ?? CALENDAR_MONTHS[0],
    [selectedMonth]
  );

  const filteredTasks = useMemo(() => {
    const tasks = preset ? preset.tasks : activeMonth.tasks;
    if (categoryFilter === "wszystkie") return tasks;
    return tasks.filter((t) => t.category === categoryFilter);
  }, [preset, activeMonth, categoryFilter]);

  const showMonthPicker = !preset;

  return (
    <div className="space-y-8">
      <GardenCalendarMonthNav currentSlug={preset?.slug} />

      {preset?.intro && (
        <p className="text-muted leading-relaxed max-w-3xl">{preset.intro}</p>
      )}

      {showMonthPicker && (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg font-bold text-primary-dark">
              Wybierz miesiąc
            </h2>
            <button
              type="button"
              onClick={() => setSelectedMonth(currentMonthNum)}
              className="text-sm text-primary font-medium hover:underline self-start"
            >
              → Bieżący miesiąc ({CALENDAR_MONTHS[currentMonthNum - 1]?.name})
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {CALENDAR_MONTHS.map((month) => (
              <button
                key={month.slug}
                type="button"
                onClick={() => setSelectedMonth(month.number)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  selectedMonth === month.number
                    ? "bg-primary text-white shadow-sm"
                    : month.number === currentMonthNum
                      ? "border-2 border-primary/50 bg-accent/40 text-primary-dark hover:bg-accent"
                      : "border border-border bg-background text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {month.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtr kategorii">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategoryFilter(cat.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              categoryFilter === cat.value
                ? "bg-primary-dark text-white"
                : "bg-accent text-muted hover:bg-accent/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-primary-dark">
            {preset ? preset.name : activeMonth.name} — zadania w ogrodzie
          </h2>
          {!preset && (
            <Link
              href={`/kalendarz-ogrodnika/${activeMonth.slug}`}
              className="text-sm text-primary font-medium hover:underline shrink-0"
            >
              Pełna strona →
            </Link>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-muted text-sm">Brak zadań w tej kategorii.</p>
        ) : (
          <ul className="space-y-4">
            {filteredTasks.map((task) => {
              const cat = CALENDAR_CATEGORIES[task.category];
              return (
                <li
                  key={task.id}
                  className="rounded-xl border border-border bg-card p-4 sm:p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.color}`}
                    >
                      {cat.icon} {cat.label}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}
                    >
                      {task.priority === "wysoki"
                        ? "Wysoki priorytet"
                        : task.priority === "sredni"
                          ? "Średni"
                          : "Niski"}
                    </span>
                    {task.timing && (
                      <span className="text-xs text-muted">· {task.timing}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {task.slug ? (
                      <Link
                        href={`/kalendarz-ogrodnika/${task.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {task.title}
                      </Link>
                    ) : (
                      task.title
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
                    {task.description}
                  </p>
                  {task.relatedLink && (
                    <Link
                      href={task.relatedLink.href}
                      className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                    >
                      {task.relatedLink.label} →
                    </Link>
                  )}
                  {task.slug && (
                    <Link
                      href={`/kalendarz-ogrodnika/${task.slug}`}
                      className="inline-block mt-2 ml-0 text-sm text-muted hover:text-primary"
                    >
                      Pełny poradnik →
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {!preset && (
        <section className="rounded-2xl border border-border bg-accent/30 p-5 sm:p-6">
          <h3 className="font-bold text-primary-dark mb-3">
            Roczny przegląd — kluczowe terminy
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <div className="rounded-lg bg-card border border-border p-3">
              <p className="font-medium text-foreground">Styczeń–luty</p>
              <p className="text-muted mt-1">Cięcie jabłoni, gruszy, winorośli</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <p className="font-medium text-foreground">Kwiecień–maj</p>
              <p className="text-muted mt-1">Nawożenie hortensji, wertykulacja trawnika</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <p className="font-medium text-foreground">Wrzesień–październik</p>
              <p className="text-muted mt-1">Sadzenia, jesienne nawożenie, ochrona na zimę</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
