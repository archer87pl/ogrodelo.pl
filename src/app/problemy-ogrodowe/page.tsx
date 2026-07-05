import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GardenDiagnosticWizard } from "@/components/garden-problems/GardenDiagnosticWizard";
import { GARDEN_PROBLEMS, PROBLEM_PLANT_LABELS } from "@/lib/constants/garden-problems";
import { presetPageMetadata, jsonLdBreadcrumb, jsonLdFAQ, SITE_URL } from "@/lib/seo";

const TITLE = "Problemy ogrodowe — choroby, szkodniki i diagnoza objawów";
const DESCRIPTION =
  "Brązowe tuje, mech w trawniku, dziury w funkii — poradniki z przyczynami, planem działania i kreatorem diagnozy. Choroby i szkodniki w polskim ogrodzie.";

const FAQ = [
  {
    question: "Jak zdiagnozować problem w ogrodzie?",
    answer:
      "Zacznij od rośliny i objawu — brązowe końcówki u tui to często susza lub mróz, dziury w funkii to ślimaki. Nasz kreator diagnozy dopasuje poradnik do Twojej sytuacji.",
  },
  {
    question: "Kiedy wymienić chore tuje lub bukszpan?",
    answer:
      "Gdy choroba grzybowa objęła większość żywopłotu i brak zielonych pędów po przycięciu — wymiana na odporny gatunek (ostrokrzew, berberys) jest skuteczniejsza niż wieloletnia walka.",
  },
];

export const metadata: Metadata = presetPageMetadata(
  TITLE,
  DESCRIPTION,
  ["problemy ogrodowe", "choroby roślin", "szkodniki w ogrodzie", "diagnoza ogrodu"],
  "/problemy-ogrodowe"
);

export default function GardenProblemsHubPage() {
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: "Strona główna", url: SITE_URL },
    { name: "Problemy ogrodowe", url: `${SITE_URL}/problemy-ogrodowe` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ(FAQ)) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Problemy ogrodowe" },
          ]}
        />

        <header className="mt-6 mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
            Problemy ogrodowe — diagnoza i ratunek
          </h1>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">{DESCRIPTION}</p>
        </header>

        <GardenDiagnosticWizard />

        <section id="lista-problemow" className="mt-12">
          <h2 className="text-xl font-bold text-primary-dark mb-6">
            Poradniki ({GARDEN_PROBLEMS.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {GARDEN_PROBLEMS.map((p) => (
              <Link
                key={p.slug}
                href={`/problemy-ogrodowe/${p.slug}`}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary transition-colors group"
              >
                <p className="font-semibold text-foreground group-hover:text-primary">
                  {p.title}
                </p>
                <p className="text-xs text-muted mt-2">
                  {p.plantTypes.map((t) => PROBLEM_PLANT_LABELS[t]).join(" · ")}
                </p>
                <p className="text-sm text-muted mt-2 line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-accent/30 p-5">
          <h2 className="text-lg font-bold text-primary-dark mb-3">FAQ</h2>
          <dl className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-foreground">{item.question}</dt>
                <dd className="mt-1 text-sm text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
