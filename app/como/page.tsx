import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ComoHeaderPreview } from "@/components/ComoHeaderPreview";
import { ComoLandingPreview } from "@/components/ComoLandingPreview";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { COMO_THEME } from "@/lib/como-theme";
import {
  breadcrumbSchema,
  hotelSchema,
  propertyMetadata,
} from "@/lib/seo";

const SLUG = "como" as const;

export const metadata: Metadata = propertyMetadata(SLUG);

export default function ComoPage() {
  const p = PROPERTIES[SLUG];

  return (
    <>
      <JsonLd data={hotelSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: p.fullName, url: `${SITE.url}/${SLUG}` },
        ])}
      />

      {/* PROVA DI DESIGN — tema "verde foresta + crema" del mockup cliente,
          limitato alla landing /como (vedi lib/como-theme.ts). Boutique e
          Milano restano su PropertyPageContent con la palette standard. */}
      {/* [&>footer]:mt-0! annulla il mt-24 del Footer condiviso: nel mockup
          il footer segue subito l'ultima sezione. */}
      <div
        style={COMO_THEME}
        className="bg-[var(--color-bg)] flex-grow flex flex-col [&>footer]:mt-0!"
      >
        <ComoHeaderPreview />
        <main id="contenuto" className="flex-grow">
          <ComoLandingPreview />
        </main>
        <Footer property={SLUG} />
      </div>
    </>
  );
}
