const CONTACT_EMAIL = "kontakt@ogrodelo.pl";

interface AdPlaceholderProps {
  className?: string;
  variant?: "default" | "compact";
}

export function AdPlaceholder({
  className = "",
  variant = "default",
}: AdPlaceholderProps) {
  if (variant === "compact") {
    return (
      <aside
        className={`rounded-xl border border-dashed border-border bg-accent/30 p-4 text-center ${className}`}
        aria-label="Miejsce reklamowe"
      >
        <p className="text-xs font-medium text-muted uppercase tracking-wide">
          Reklama
        </p>
        <p className="text-sm text-muted mt-1">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Reklama na Ogrodelo.pl`}
            className="text-primary font-medium hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </aside>
    );
  }

  return (
    <aside
      className={`rounded-2xl border-2 border-dashed border-border/80 bg-accent/25 p-6 sm:p-8 text-center ${className}`}
      aria-label="Miejsce reklamowe"
    >
      <p className="text-xs font-semibold text-muted uppercase tracking-widest">
        Miejsce reklamowe
      </p>
      <div
        className="mx-auto mt-4 flex min-h-[90px] max-w-md items-center justify-center rounded-xl border border-border/60 bg-card/60 px-4"
        aria-hidden="true"
      >
        <span className="text-sm text-muted/70">728 × 90 · baner</span>
      </div>
      <p className="mt-4 text-sm text-muted leading-relaxed max-w-md mx-auto">
        Chcesz promować produkty ogrodnicze, sklep lub usługi? Skontaktuj się z nami —
        wycena i dostępne formaty na życzenie.
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=Reklama na Ogrodelo.pl`}
        className="inline-block mt-4 rounded-full border border-primary bg-card px-5 py-2 text-sm font-medium text-primary hover:bg-accent transition-colors"
      >
        {CONTACT_EMAIL}
      </a>
    </aside>
  );
}
