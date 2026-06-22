"use client";

import Link from "next/link";
import { CALENDAR_MONTHS } from "@/lib/constants/garden-calendar";

interface GardenCalendarMonthNavProps {
  currentSlug?: string;
}

export function GardenCalendarMonthNav({ currentSlug }: GardenCalendarMonthNavProps) {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <nav
      className="flex flex-wrap gap-2"
      aria-label="Miesiące kalendarza ogrodnika"
    >
      {CALENDAR_MONTHS.map((month) => {
        const isActive = month.slug === currentSlug;
        const isCurrent = month.number === currentMonth && !currentSlug;

        return (
          <Link
            key={month.slug}
            href={`/kalendarz-ogrodnika/${month.slug}`}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : isCurrent
                  ? "border-2 border-primary text-primary bg-accent/50"
                  : "border border-border bg-card text-muted hover:border-primary hover:text-primary"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {month.name}
          </Link>
        );
      })}
    </nav>
  );
}
