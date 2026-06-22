import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { HeroGardenIllustration } from "@/components/HeroGardenIllustration";
import { CALCULATORS } from "@/lib/constants/calculators";
import { siteMetadata, jsonLdCalculatorList } from "@/lib/seo";

export const metadata: Metadata = {
  ...siteMetadata(),
  title: "Ogrodelo.pl — Darmowe kalkulatory ogrodowe",
  description:
    "12 narzędzi ogrodowych: kalkulatory, porównywarki drzew i krzewów. Nawadnianie, żywopłot, wzrost roślin i więcej — bez rejestracji.",
  alternates: {
    canonical: "https://ogrodelo.pl",
  },
};

export default function HomePage() {
  const featured = CALCULATORS.filter((c) => c.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculatorList()),
        }}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-background">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-primary-light/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-primary-dark sm:text-5xl lg:text-6xl">
                Planuj ogród
                <br />
                <span className="text-primary">mądrze i za darmo</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
                12 narzędzi ogrodowych — kalkulatory i porównywarki drzew oraz krzewów.
                Oblicz nawadnianie, dobierz żywopłot i zaplanuj nasadzenia na podstawie
                sprawdzonych danych ogrodniczych.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/kalkulator-nawadniania"
                  className="rounded-full bg-primary px-6 py-3 font-medium text-white shadow-sm hover:bg-primary-dark transition-colors"
                >
                  Kalkulator nawadniania
                </Link>
                <Link
                  href="/porownywarka-drzew"
                  className="rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground hover:border-primary transition-colors"
                >
                  Porównaj drzewa
                </Link>
                <Link
                  href="/porownywarka-krzewow"
                  className="rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground hover:border-primary transition-colors"
                >
                  Porównaj krzewy
                </Link>
              </div>
            </div>
            <div className="lg:pl-4">
              <HeroGardenIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-primary-dark mb-6">
          Najpopularniejsze
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      </section>

      <section id="kalkulatory" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">
          Wszystkie kalkulatory
        </h2>
        <p className="text-muted mb-8">
          Wybierz kalkulator i uzyskaj wyniki w kilka sekund.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-dark">
            Dlaczego Ogrodelo.pl?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 text-left">
            <div>
              <span className="text-2xl">🎯</span>
              <h3 className="mt-2 font-semibold">Precyzyjne obliczenia</h3>
              <p className="mt-1 text-sm text-muted">
                Algorytmy oparte na danych ogrodniczych i polskim klimacie.
              </p>
            </div>
            <div>
              <span className="text-2xl">🌤️</span>
              <h3 className="mt-2 font-semibold">Dane pogodowe</h3>
              <p className="mt-1 text-sm text-muted">
                Kalkulator nawadniania uwzględnia aktualną pogodę i opady.
              </p>
            </div>
            <div>
              <span className="text-2xl">💰</span>
              <h3 className="mt-2 font-semibold">Oszczędności</h3>
              <p className="mt-1 text-sm text-muted">
                Poznaj koszty wody, nawozu i sadzonek przed inwestycją.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
