import type { Metadata } from "next";
import Link from "next/link";
import { MowerCalculator } from "@/components/calculators/MowerCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedTools } from "@/components/RelatedTools";
import { CalculatorHero } from "@/components/CalculatorHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getCalculatorBySlug } from "@/lib/constants/calculators";
import {
  MOWER_PRESET_GROUPS,
  MOWER_PRESETS,
} from "@/lib/constants/mower-presets";
import {
  MAIN_MOWER_FAQ,
  MAIN_MOWER_GUIDE,
} from "@/lib/constants/mower-seo-content";
import {
  calculatorMetadata,
  jsonLdBreadcrumb,
  jsonLdCalculator,
  jsonLdFAQ,
  SITE_URL,
} from "@/lib/seo";

const calc = getCalculatorBySlug("kalkulator-robota-koszacego")!;

export const metadata: Metadata = {
  ...calculatorMetadata(calc),
  description:
    "Dobierz robota koszącego do trawnika 200–3000 m². Porównaj Husqvarna, Worx, STIHL, Gardena. Kalkulator opłacalności, kosztów rocznych i zwrotu inwestycji — 20 poradników SEO.",
  keywords: [
    ...calc.keywords,
    "husqvarna automower",
    "worx landroid",
    "robot koszący 500 m2",
    "opłacalność robota koszącego",
    "montaż robota koszącego",
    "robot koszący gps",
    "cichy robot koszący",
    "stihl imow",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator(calc)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              {
                name: "Robot koszący",
                url: `${SITE_URL}/kalkulator-robota-koszacego`,
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ(MAIN_MOWER_FAQ)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Robot koszący" },
          ]}
        />

        <CalculatorHero
          calc={calc}
          description="Policz powierzchnię, nachylenie i przeszkody — dobierz robota koszącego i porównaj koszty z koszeniem ręcznym lub firmą ogrodniczą. 14 modeli, zwrot inwestycji w latach."
        />

        <MowerCalculator />

        <article className="mt-16 border-t border-border pt-12 space-y-12 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {MAIN_MOWER_GUIDE.howItWorks.heading}
            </h2>
            {MAIN_MOWER_GUIDE.howItWorks.paragraphs.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>
                {p}
              </p>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {MAIN_MOWER_GUIDE.choosing.heading}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {MAIN_MOWER_GUIDE.choosing.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {MAIN_MOWER_GUIDE.costs.heading}
            </h2>
            {MAIN_MOWER_GUIDE.costs.paragraphs.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>
                {p}
              </p>
            ))}
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm min-w-[520px]">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary-dark">Metoda</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Zakup</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Rocznie</th>
                    <th className="text-left p-3 font-semibold text-primary-dark">Twój czas</th>
                  </tr>
                </thead>
                <tbody>
                  {MAIN_MOWER_GUIDE.costs.table.map((row) => (
                    <tr key={row.method} className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">{row.method}</td>
                      <td className="p-3">{row.purchase}</td>
                      <td className="p-3">{row.yearly}</td>
                      <td className="p-3">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {MAIN_MOWER_GUIDE.brands.heading}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {MAIN_MOWER_GUIDE.brands.items.map((b) => (
                <div
                  key={b.brand}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <p className="font-semibold text-foreground">{b.brand}</p>
                  <p className="text-sm mt-1">{b.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {MAIN_MOWER_GUIDE.install.heading}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {MAIN_MOWER_GUIDE.install.steps.map((step, i) => (
                <li key={i} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              {MAIN_MOWER_GUIDE.winter.heading}
            </h2>
            {MAIN_MOWER_GUIDE.winter.paragraphs.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>
                {p}
              </p>
            ))}
          </section>

          {MOWER_PRESET_GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="text-xl font-bold text-primary-dark mb-4">{group.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.slugs.map((slug) => {
                  const p = MOWER_PRESETS.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/kalkulator-robota-koszacego/${slug}`}
                      className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors group"
                    >
                      <p className="font-semibold text-foreground group-hover:text-primary">
                        {p.title.split("—")[0]?.trim()}
                      </p>
                      <p className="text-sm mt-1 line-clamp-2">{p.description}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">FAQ — robot koszący</h2>
            <FAQAccordion items={MAIN_MOWER_FAQ} />
          </section>
        </article>

        <RelatedTools currentSlug="kalkulator-robota-koszacego" />
      </div>
    </>
  );
}
