import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PropertyHeaderPreview } from "@/components/PropertyHeaderPreview";
import { PropertyLandingPreview } from "@/components/PropertyLandingPreview";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { propertyTheme } from "@/lib/property-theme";
import {
  breadcrumbSchema,
  faqSchema,
  hotelSchema,
  propertyMetadata,
} from "@/lib/seo";

const SLUG = "milano-boutique" as const;

export const metadata: Metadata = propertyMetadata(SLUG);

export default function BoutiquePage() {
  const p = PROPERTIES[SLUG];
  const c = CONTENT[SLUG];

  return (
    <>
      <JsonLd data={hotelSchema(p)} />
      <JsonLd data={faqSchema(c.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: p.fullName, url: `${SITE.url}/${SLUG}` },
        ])}
      />

      {/* PROVA DI DESIGN — tema "bordeaux + crema" del mockup cliente. */}
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
