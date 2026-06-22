import Link from "next/link";
import { CALCULATORS } from "@/lib/constants/calculators";
import { FOOTER_LINK_GROUPS } from "@/lib/constants/internal-links";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

export function Footer() {
  const year = new Date().getFullYear();
  const calcMap = Object.fromEntries(CALCULATORS.map((c) => [c.slug, c]));

  return (
    <footer className="border-t border-border bg-primary-dark text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-lg font-bold text-white mb-2">
              🌿 Ogrodelo.pl
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Darmowe kalkulatory i generatory ogrodowe. Planuj nawadnianie, żywopłoty,
              nasadzenia i koszty — mądrze i za darmo.
            </p>
            <Link
              href="/generator-planu-ogrodu"
              className="inline-block text-sm font-medium text-white hover:text-primary-light transition-colors"
            >
              Generator planu ogrodu →
            </Link>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-semibold text-white mb-3">{group.title}</p>
              <ul className="space-y-2 text-sm">
                {group.slugs.map((slug) => {
                  const c = calcMap[slug];
                  if (!c) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="hover:text-white transition-colors"
                      >
                        {c.icon} {c.shortTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-semibold text-white mb-3">Popularne</p>
            <ul className="space-y-2 text-sm">
              {CALCULATORS.filter((c) => c.featured).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-white mt-6 mb-3">Wszystkie</p>
            <Link
              href="/#kalkulatory"
              className="text-sm hover:text-white transition-colors"
            >
              Zobacz pełną listę narzędzi →
            </Link>
          </div>
        </div>

        <LegalDisclaimer
          variant="inline"
          className="mt-8 pt-6 border-t border-white/10 text-white/50"
        />

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <p>© {year} Ogrodelo.pl — Kalkulatory ogrodowe</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Szybkie linki">
            <Link href="/porownywarka-drzew/dab-vs-sosna" className="hover:text-white">
              Dąb vs sosna
            </Link>
            <Link href="/porownywarka-krzewow/laurowisnia-vs-tuja" className="hover:text-white">
              Laurowiśnia vs tuja
            </Link>
            <Link href="/kalkulator-nawadniania/trawnik" className="hover:text-white">
              Nawadnianie trawnika
            </Link>
            <Link href="/alternatywy-dla-tui" className="hover:text-white">
              Zamiast tui
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
