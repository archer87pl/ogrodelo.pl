import type { CalculatorMeta } from "@/lib/constants/calculators";
import { CalculatorIllustration } from "@/components/CalculatorIllustration";
import { AdPlaceholder } from "@/components/AdPlaceholder";

interface CalculatorHeroProps {
  calc: CalculatorMeta;
  description?: string;
  title?: string;
  showAd?: boolean;
}

export function CalculatorHero({
  calc,
  description,
  title,
  showAd = true,
}: CalculatorHeroProps) {
  const desc = description ?? calc.description;
  const heading = title ?? calc.title;

  return (
    <header className="mb-8">
      {/* Mobile: compact illustration above title */}
      <div className="mb-5 max-w-[260px] mx-auto sm:hidden">
        <CalculatorIllustration slug={calc.slug} />
      </div>

      <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_minmax(220px,360px)] lg:gap-10">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-primary-dark sm:text-3xl lg:text-4xl leading-tight">
            {heading}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            {desc}
          </p>
        </div>

        {/* Tablet & desktop: illustration on the right */}
        <div className="hidden sm:block lg:pl-2">
          <CalculatorIllustration slug={calc.slug} />
        </div>
      </div>

      {showAd && <AdPlaceholder className="mt-8" variant="compact" />}
    </header>
  );
}
