import Link from "next/link";
import { CALCULATORS } from "@/lib/constants/calculators";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary-dark text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white mb-2">
              🌿 Ogrodelo.pl
            </p>
            <p className="text-sm leading-relaxed">
              Darmowe kalkulatory ogrodowe. Planuj nawadnianie, żywopłoty,
              nawożenie i więcej — mądrze i za darmo.
            </p>
          </div>
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
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Wszystkie kalkulatory</p>
            <ul className="space-y-2 text-sm columns-1">
              {CALCULATORS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {c.icon} {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm">
          © {year} Ogrodelo.pl — Kalkulatory ogrodowe
        </div>
      </div>
    </footer>
  );
}
