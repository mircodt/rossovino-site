import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { StickyBookingBar } from "@/components/StickyBookingBar";
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

      <div
        // Page-level identity tint — overrides --color-bg for everything inside
        style={{ "--color-bg": p.pageBg } as React.CSSProperties}
        className="bg-[var(--color-bg)] flex-grow flex flex-col"
      >
        <Header property={SLUG} />
        <main id="contenuto" className="flex-grow">
          <PropertyPageContent slug={SLUG} />
        </main>
        <Footer />
      </div>
      <StickyMobileBar property={SLUG} />
      <StickyBookingBar property={SLUG} />
    </>
  );
}
