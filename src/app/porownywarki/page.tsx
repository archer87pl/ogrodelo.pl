import type { Metadata } from "next";
import { ToolHubPage } from "@/components/ToolHubPage";
import { COMPARATOR_HUB_SLUGS } from "@/lib/constants/hub-pages";
import { presetPageMetadata, jsonLdBreadcrumb, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = presetPageMetadata(
  "Porównywarki drzew i krzewów",
  "Porównaj gatunki drzew i krzewów: wzrost, woda, korzenie, żywopłot i koszt sadzonki. Wykresy i tabele parametrów.",
  ["porównywarka drzew", "porównywarka krzewów", "porównanie gatunków ogrodowych"],
  "/porownywarki"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Strona główna", url: SITE_URL },
              { name: "Porównywarki", url: `${SITE_URL}/porownywarki` },
            ])
          ),
        }}
      />
      <ToolHubPage
        title="Porównywarki roślin"
        description="Nie wiesz, co wybrać? Porównaj drzewa i krzewy obok siebie — dąb vs sosna, laurowiśnia vs tuja i dziesiątki innych par. Każde porównanie to osobna strona z wykresami."
        slugs={COMPARATOR_HUB_SLUGS}
        breadcrumbLabel="Porównywarki"
      />
    </>
  );
}
