import Link from "next/link";
import {
  getRelatedTools,
  getPresetLinks,
  getAllToolsLink,
} from "@/lib/constants/internal-links";

interface RelatedToolsProps {
  currentSlug: string;
  /** Ukryj podstrony presetów (np. gdy już jesteś na presecie) */
  hidePresets?: boolean;
  className?: string;
}

export function RelatedTools({
  currentSlug,
  hidePresets = false,
  className = "",
}: RelatedToolsProps) {
  const related = getRelatedTools(currentSlug);
  const presets = hidePresets ? [] : getPresetLinks(currentSlug);
  const allTools = getAllToolsLink();

  if (related.length === 0 && presets.length === 0) return null;

  return (
    <aside
      className={`mt-12 sm:mt-16 border-t border-border pt-8 sm:pt-12 ${className}`}
      aria-label="Powiązane narzędzia ogrodowe"
    >
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-2">
            Powiązane narzędzia
          </h2>
          <p className="text-sm text-muted mb-5 max-w-2xl">
            Uzupełnij plan ogrodu kolejnymi kalkulatorami — wszystkie darmowe, bez rejestracji.
          </p>
          <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-border bg-card p-4 hover:border-primary hover:shadow-sm transition-all"
              >
                <span className="text-xl" aria-hidden="true">
                  {link.icon}
                </span>
                <p className="mt-2 font-semibold text-foreground group-hover:text-primary text-sm leading-snug">
                  {link.label}
                </p>
                <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                  {link.description}
                </p>
              </Link>
            ))}
          </nav>
        </section>
      )}

      {presets.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-primary-dark mb-3">
            Przydatne podstrony
          </h2>
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Podstrony tematyczne"
          >
            {presets.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.description}
                className="rounded-full border border-border bg-accent/40 px-4 py-2 text-sm text-foreground hover:border-primary hover:bg-accent hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </section>
      )}

      <p className="text-sm text-muted">
        <Link
          href={allTools.href}
          className="text-primary font-medium hover:underline"
        >
          {allTools.label}
        </Link>
        {" · "}
        <Link href="/" className="text-primary hover:underline">
          Strona główna Ogrodelo.pl
        </Link>
      </p>
    </aside>
  );
}
