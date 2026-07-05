import type { Metadata } from "next";
import { ToolHubPage } from "@/components/ToolHubPage";
import { PLANTS_HUB_SLUGS } from "@/lib/constants/hub-pages";
import { FLOWERING_PLANT_COUNT } from "@/lib/constants/site-stats";
import { presetPageMetadata, jsonLdBreadcrumb, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = presetPageMetadata(
  "Rośliny ogrodowe — katalog, porównania i bezpieczeństwo",
  `Katalog kwitnienia ${FLOWERING_PLANT_COUNT} gatunków, porównywarki, zamienniki tui, rośliny bezpieczne dla zwierząt i gra „Zgadnij roślinę".`,
  ["rośliny ogrodowe", "katalog roślin", "dobór roślin do ogrodu"],
  "/rosliny"
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
              { name: "Rośliny", url: `${SITE_URL}/rosliny` },
            ])
          ),
        }}
      />
      <ToolHubPage
        title="Rośliny do ogrodu"
        description={`Przeglądaj rośliny według miesiąca kwitnienia, porównuj gatunki, sprawdzaj toksyczność dla psa i kota lub ćwicz rozpoznawanie w codziennej grze. Baza: ${FLOWERING_PLANT_COUNT} gatunków w katalogu kwitnienia.`}
        slugs={PLANTS_HUB_SLUGS}
        breadcrumbLabel="Rośliny"
      />
    </>
  );
}
