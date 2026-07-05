import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strona nie znaleziona",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 text-center">
      <p className="text-6xl font-bold text-primary/30">404</p>
      <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-primary-dark">
        Nie znaleźliśmy tej strony
      </h1>
      <p className="mt-4 text-muted max-w-md mx-auto">
        Adres mógł się zmienić lub strona została usunięta. Sprawdź katalog narzędzi ogrodowych.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Strona główna
        </Link>
        <Link
          href="/#kalkulatory"
          className="rounded-full border border-border bg-card px-6 py-3 font-medium text-foreground hover:border-primary transition-colors"
        >
          Wszystkie narzędzia
        </Link>
      </div>
    </div>
  );
}
