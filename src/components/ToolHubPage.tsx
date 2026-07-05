import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCalculatorBySlug } from "@/lib/constants/calculators";

interface ToolHubPageProps {
  title: string;
  description: string;
  slugs: string[];
  breadcrumbLabel: string;
}

export function ToolHubPage({
  title,
  description,
  slugs,
  breadcrumbLabel,
}: ToolHubPageProps) {
  const tools = slugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: "/" },
          { label: breadcrumbLabel },
        ]}
      />

      <header className="mt-6 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">{title}</h1>
        <p className="mt-4 max-w-3xl text-muted leading-relaxed">{description}</p>
        <p className="mt-3 text-sm text-muted">
          {tools.length} narzędzi ·{" "}
          <Link href="/#kalkulatory" className="text-primary hover:underline">
            pełna lista na stronie głównej
          </Link>
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </div>
  );
}
