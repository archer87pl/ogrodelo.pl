import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl" aria-hidden="true">
            🌿
          </span>
          <span className="text-xl font-bold text-primary-dark group-hover:text-primary transition-colors">
            Ogrodelo<span className="text-primary">.pl</span>
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted">
          <Link
            href="/kalkulator-nawadniania"
            className="hover:text-primary transition-colors"
          >
            Nawadnianie
          </Link>
          <Link
            href="/kalkulator-zywoplotu"
            className="hover:text-primary transition-colors"
          >
            Żywopłot
          </Link>
          <Link
            href="/generator-planu-ogrodu"
            className="hover:text-primary transition-colors font-semibold text-primary-dark"
          >
            Plan ogrodu
          </Link>
          <Link
            href="/porownywarka-drzew"
            className="hover:text-primary transition-colors"
          >
            Drzewa
          </Link>
          <Link
            href="/porownywarka-krzewow"
            className="hover:text-primary transition-colors"
          >
            Krzewy
          </Link>
          <Link
            href="/katalog-kwitnienia"
            className="hover:text-primary transition-colors"
          >
            Kwitnienie
          </Link>
          <Link
            href="/kalendarz-ogrodnika"
            className="hover:text-primary transition-colors"
          >
            Kalendarz
          </Link>
          <Link
            href="/alternatywy-dla-tui"
            className="hover:text-primary transition-colors"
          >
            Zamiast tui
          </Link>
          <Link
            href="/#kalkulatory"
            className="rounded-full bg-primary px-4 py-1.5 text-white hover:bg-primary-dark transition-colors"
          >
            Wszystkie
          </Link>
        </nav>
      </div>
    </header>
  );
}
