import { CALCULATOR_ILLUSTRATIONS } from "@/components/illustrations/CalculatorIllustrations";

interface CalculatorIllustrationProps {
  slug: string;
  className?: string;
}

export function CalculatorIllustration({ slug, className = "" }: CalculatorIllustrationProps) {
  const Illustration = CALCULATOR_ILLUSTRATIONS[slug];
  if (!Illustration) return null;

  return (
    <div
      className={`relative w-full ${className}`}
      aria-hidden="true"
    >
      <Illustration />
    </div>
  );
}
