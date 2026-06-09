import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ComoLandingPreview } from "@/components/ComoLandingPreview";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import {
  breadcrumbSchema,
  hotelSchema,
  propertyMetadata,
} from "@/lib/seo";

const SLUG = "como" as const;

export const metadata: Metadata = propertyMetadata(SLUG);

// PROVA DI DESIGN: la pagina /como usa ora ComoLandingPreview (struttura
// del mockup cliente) invece del componente condiviso PropertyPageContent.
// Boutique e Milano restano su PropertyPageContent.
// faqSchema rimosso perché la FAQ non è più renderizzata in pagina.
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

      {/* Prova di design: fondo base NEUTRO (cream). Il verde compare solo
          nelle due fasce dentro ComoLandingPreview (servizi + perché
          scegliere). Header allargato (wide) per allinearsi alla booking
          bar a 1280px. */}
      <div
        style={{ "--color-bg": "#F6F3EC" } as React.CSSProperties}
        className="bg-[var(--color-bg)] flex-grow flex flex-col"
      >
        <Header property={SLUG} wide />
        <main id="contenuto" className="flex-grow">
          <ComoLandingPreview />
        </main>
        <Footer property={SLUG} />
      </div>
    </>
  );
}
