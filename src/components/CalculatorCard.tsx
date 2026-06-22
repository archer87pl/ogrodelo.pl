import Link from "next/link";
import type { CalculatorMeta } from "@/lib/constants/calculators";

interface CalculatorCardProps {
  calc: CalculatorMeta;
}

export function CalculatorCard({ calc }: CalculatorCardProps) {
  return (
    <Link
      href={`/${calc.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary-light hover:shadow-md hover:-translate-y-0.5"
    >
      <span className="text-3xl mb-3" aria-hidden="true">
        {calc.icon}
      </span>
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {calc.shortTitle}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
        {calc.description}
      </p>
      <span className="mt-4 text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
        Oblicz →
      </span>
    </Link>
  );
}
