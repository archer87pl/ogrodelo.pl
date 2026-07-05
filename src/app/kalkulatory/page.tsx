import type { Metadata } from "next";
import { ToolHubPage } from "@/components/ToolHubPage";
import { CALCULATOR_HUB_SLUGS } from "@/lib/constants/hub-pages";
import { TOOL_COUNT } from "@/lib/constants/site-stats";
import { presetPageMetadata, jsonLdBreadcrumb, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = presetPageMetadata(
  "Kalkulatory ogrodowe — pełna lista narzędzi",
  `Wszystkie kalkulatory Ogrodelo.pl w jednym miejscu: nawadnianie, trawnik, żywopłot, wapnowanie, koszty ogrodu i więcej. ${CALCULATOR_HUB_SLUGS.length} darmowych narzędzi online.`,
  ["kalkulatory ogrodowe", "lista kalkulatorów ogrodu", "narzędzia ogrodnicze online"],
  "/kalkulatory"
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
              { name: "Kalkulatory", url: `${SITE_URL}/kalkulatory` },
            ])
          ),
        }}
      />
      <ToolHubPage
        title="Kalkulatory ogrodowe"
        description={`Darmowe kalkulatory do planowania ogrodu — od wody i trawnika po ogrodzenie, kompost i koszty. Wybierz narzędzie i policz wynik w kilka sekund. Razem ${TOOL_COUNT} narzędzi na Ogrodelo.pl.`}
        slugs={CALCULATOR_HUB_SLUGS}
        breadcrumbLabel="Kalkulatory"
      />
    </>
  );
}
