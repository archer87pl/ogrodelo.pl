interface LegalDisclaimerProps {
  className?: string;
  variant?: "inline" | "box";
}

export function LegalDisclaimer({
  className = "",
  variant = "box",
}: LegalDisclaimerProps) {
  const text =
    "Kalkulatory i generatory na Ogrodelo.pl służą wyłącznie celom informacyjnym i edukacyjnym. Nie gwarantujemy dokładności danych, wyników ani przydatności do konkretnego ogrodu. Przed inwestycją skonsultuj się z ogrodnikiem lub specjalistą. Ogrodelo.pl nie ponosi odpowiedzialności za decyzje podjęte na podstawie wyników kalkulatorów.";

  if (variant === "inline") {
    return (
      <p className={`text-xs text-muted leading-relaxed ${className}`}>{text}</p>
    );
  }

  return (
    <div
      className={`rounded-xl border border-border bg-accent/20 px-4 py-3 sm:px-5 sm:py-4 ${className}`}
      role="note"
      aria-label="Zastrzeżenie prawne"
    >
      <p className="text-xs font-semibold text-primary-dark mb-1.5">
        Zastrzeżenie
      </p>
      <p className="text-xs text-muted leading-relaxed">{text}</p>
    </div>
  );
}
