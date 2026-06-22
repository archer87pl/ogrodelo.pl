import Link from "next/link";
import {
  CALENDAR_CATEGORIES,
  CALENDAR_MONTHS,
} from "@/lib/constants/garden-calendar";
import type { CalendarTaskPreset } from "@/lib/constants/calendar-task-presets";
import { GardenCalendarMonthNav } from "@/components/calculators/GardenCalendarMonthNav";

interface GardenCalendarTaskDetailProps {
  task: CalendarTaskPreset;
}

export function GardenCalendarTaskDetail({ task }: GardenCalendarTaskDetailProps) {
  const cat = CALENDAR_CATEGORIES[task.category];
  const months = task.monthSlugs
    .map((slug) => CALENDAR_MONTHS.find((m) => m.slug === slug))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      <GardenCalendarMonthNav />

      <p className="text-muted leading-relaxed max-w-3xl">{task.intro}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.color}`}
        >
          {cat.icon} {cat.label}
        </span>
        {months.map((month) => (
          <Link
            key={month!.slug}
            href={`/kalendarz-ogrodnika/${month!.slug}`}
            className="rounded-full border border-border bg-card px-3 py-0.5 text-xs font-medium text-primary hover:border-primary transition-colors"
          >
            {month!.name}
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-bold text-primary-dark mb-4">Krok po kroku</h2>
        <ol className="space-y-2 list-decimal list-inside text-sm text-muted leading-relaxed">
          {task.steps.map((step, i) => (
            <li key={i} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {task.tips.length > 0 && (
        <section className="rounded-2xl border border-border bg-accent/30 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-primary-dark mb-3">Wskazówki</h2>
          <ul className="space-y-2 text-sm text-muted">
            {task.tips.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {task.relatedTool && (
        <p className="text-sm">
          <Link
            href={task.relatedTool.href}
            className="text-primary font-medium hover:underline"
          >
            {task.relatedTool.label} →
          </Link>
        </p>
      )}

      <section>
        <h2 className="text-lg font-bold text-primary-dark mb-3">
          W których miesiącach?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {months.map((month) => (
            <Link
              key={month!.slug}
              href={`/kalendarz-ogrodnika/${month!.slug}`}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
            >
              <p className="font-semibold text-foreground group-hover:text-primary">
                {month!.name}
              </p>
              <p className="text-xs text-muted mt-1 line-clamp-2">{month!.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
