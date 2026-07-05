import Link from "next/link";
import { getFrostCountdown } from "@/lib/constants/garden-calendar-regions";

export function FrostCountdownBanner() {
  const frost = getFrostCountdown();

  let headline: string;
  let detail: string;

  if (frost.seasonPhase === "before-last-frost" && frost.lastFrostDays !== null) {
    headline = `Do ostatnich przymrozków: ${frost.lastFrostDays} dni`;
    detail = `Orientacyjnie ${frost.lastFrostLabel}. Sprawdź kalendarz dla swojego regionu.`;
  } else if (frost.seasonPhase === "growing") {
    headline =
      frost.firstFrostDays !== null
        ? `Do pierwszych jesiennych przymrozków: ${frost.firstFrostDays} dni`
        : "Sezon wegetacyjny w pełni";
    detail =
      frost.lastFrostPassedDays !== null
        ? `Ostatnie wiosenne przymrozki minęły ${frost.lastFrostPassedDays} dni temu (${frost.lastFrostLabel}). ${frost.firstFrostLabel} — czas na letnie prace i przygotowanie jesieni.`
        : `Sezon ogrodniczy w centrum Polski. Pierwsze przymrozki jesienią: ${frost.firstFrostLabel}.`;
  } else {
    headline = "Zima w ogrodzie — planuj na wiosnę";
    detail = `Przymrozki jesienne za nami. Zobacz kalendarz stycznia i przygotuj narzędzia na nowy sezon.`;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-accent to-background p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
            Sezon ogrodniczy
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-primary-dark">{headline}</h2>
          <p className="text-sm text-muted mt-1 max-w-2xl">{detail}</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/ogrod-teraz"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Co robić teraz?
          </Link>
          <Link
            href="/mapa-stref-mrozoodpornosci"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary transition-colors"
          >
            Mapa stref USDA
          </Link>
        </div>
      </div>
    </section>
  );
}
