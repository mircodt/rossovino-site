import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PropertyHeaderPreview } from "@/components/PropertyHeaderPreview";
import { PropertyLandingPreview } from "@/components/PropertyLandingPreview";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { propertyTheme } from "@/lib/property-theme";
import { breadcrumbSchema, hotelSchema, propertyMetadata } from "@/lib/seo";

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

      {/* PROVA DI DESIGN — tema "verde foresta + crema" del mockup cliente
          (vedi lib/property-theme.ts). */}
      <div style={propertyTheme(SLUG)} className="bg-[var(--color-bg)] flex-grow flex flex-col">
        <PropertyHeaderPreview slug={SLUG} />
        <main id="contenuto" className="flex-grow">
          <PropertyLandingPreview slug={SLUG} />
        </main>
        <Footer />
      </div>
    </>
  );
}
