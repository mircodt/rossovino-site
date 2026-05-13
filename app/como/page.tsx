import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { PropertyPageContent } from "@/components/PropertyPageContent";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import {
  breadcrumbSchema,
  faqSchema,
  hotelSchema,
  propertyMetadata,
} from "@/lib/seo";

const SLUG = "como" as const;

export const metadata: Metadata = propertyMetadata(SLUG);

export default function ComoPage() {
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

      <Header property={SLUG} />
      <main id="contenuto" className="flex-grow">
        <PropertyPageContent slug={SLUG} />
      </main>
      <Footer />
      <StickyMobileBar property={SLUG} />
    </>
  );
}
