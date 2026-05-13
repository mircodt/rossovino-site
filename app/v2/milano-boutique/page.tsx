import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { PropertyPageContentV2 } from "@/components/v2/PropertyPageContentV2";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/seo";

const SLUG = "milano-boutique" as const;

export const metadata: Metadata = {
  title: CONTENT[SLUG].meta.title + " · v2",
  description: CONTENT[SLUG].meta.description,
  robots: { index: false, follow: false },
};

export default function BoutiqueV2() {
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
        style={{ "--color-bg": p.pageBg } as React.CSSProperties}
        className="bg-[var(--color-bg)] flex-grow flex flex-col"
      >
        <VersionSwitcher current="v2" otherPath={`/${SLUG}`} />
        <Header property={SLUG} />
        <main id="contenuto" className="flex-grow">
          <PropertyPageContentV2 slug={SLUG} />
        </main>
        <Footer />
      </div>
      <StickyMobileBar property={SLUG} />
    </>
  );
}
