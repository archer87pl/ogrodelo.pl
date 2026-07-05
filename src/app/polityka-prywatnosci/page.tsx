import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  jsonLdBreadcrumb,
  privacyPageMetadata,
  SITE_URL,
} from "@/lib/seo";

export const metadata = privacyPageMetadata();

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Polityka prywatności" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              { name: "Polityka prywatności", url: `${SITE_URL}/polityka-prywatnosci` },
            ])
          ),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <article className="prose prose-green max-w-none text-muted leading-relaxed">
          <h1 className="text-3xl font-bold text-primary-dark">Polityka prywatności</h1>
          <p className="text-sm text-muted">Ostatnia aktualizacja: {new Date().getFullYear()}</p>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-primary-dark">1. Administrator</h2>
            <p>
              Serwis Ogrodelo.pl udostępnia darmowe kalkulatory ogrodowe. W sprawach dotyczących
              prywatności możesz skontaktować się przez formularz kontaktowy dostępny na stronie
              głównej serwisu.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-primary-dark">2. Jakie dane przetwarzamy</h2>
            <p>
              Kalkulatory działają w przeglądarce — wpisane wymiary, parametry ogrodu i wyniki
              obliczeń nie są domyślnie wysyłane na serwer. Nie wymagamy rejestracji ani podawania
              danych osobowych do korzystania z narzędzi.
            </p>
            <p>
              Serwer może zapisywać standardowe logi techniczne (adres IP, typ przeglądarki, data
              żądania) niezbędne do działania i bezpieczeństwa hostingu.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-primary-dark">3. Pliki cookies</h2>
            <p>
              Używamy plików cookies niezbędnych do działania serwisu oraz — za Twoją zgodą —
              cookies analitycznych (np. Google Analytics), które pomagają ulepszać treści.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Niezbędne</strong> — zapamiętanie preferencji cookies i podstawowe
                funkcje serwisu.
              </li>
              <li>
                <strong>Analityczne</strong> — anonimowe statystyki odwiedzin (włączane tylko po
                akceptacji).
              </li>
            </ul>
            <p>
              Zgody możesz zmienić w dowolnym momencie przez baner cookies lub ustawienia
              prywatności w stopce.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-primary-dark">4. Twoje prawa (RODO)</h2>
            <p>Masz prawo do:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>dostępu do danych i ich sprostowania,</li>
              <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
              <li>ograniczenia przetwarzania,</li>
              <li>sprzeciwu wobec przetwarzania,</li>
              <li>wniesienia skargi do Prezesa UODO.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-primary-dark">5. Linki zewnętrzne</h2>
            <p>
              Serwis może zawierać linki do stron trzecich. Nie odpowiadamy za politykę prywatności
              tych witryn.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-primary-dark">6. Zmiany polityki</h2>
            <p>
              Polityka może być aktualizowana. Nowa wersja zostanie opublikowana na tej stronie z
              datą aktualizacji.
            </p>
          </section>

          <p className="mt-10">
            <Link href="/" className="text-primary font-medium hover:underline">
              ← Wróć na stronę główną
            </Link>
          </p>
        </article>
      </div>
    </>
  );
}
