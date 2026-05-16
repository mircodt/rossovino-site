import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { SubPageHero } from "@/components/SubPageHero";
import { ServicesPageContent } from "@/components/ServicesPageContent";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { breadcrumbSchema, canonical, subPageMetadata } from "@/lib/seo";

const SLUG = "milano" as const;

export const metadata: Metadata = subPageMetadata(SLUG, "servizi");

export default function Page() {
  const p = PROPERTIES[SLUG];
  return (
    <>
      
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: p.fullName, url: canonical(`/${SLUG}`) },
          { name: "Servizi", url: canonical(`/${SLUG}/servizi`) },
        ])}
      />
      <div
        style={{ "--color-bg": p.pageBg } as React.CSSProperties}
        className="bg-[var(--color-bg)] flex-grow flex flex-col"
      >
        <Header property={SLUG} />
        <main id="contenuto" className="flex-grow">
          <SubPageHero
            slug={SLUG}
            eyebrow="Servizi"
            title="Servizi & dintorni"
            description="Tutto ciò che trovi in struttura e i nostri consigli per scoprire il territorio dietro la facciata turistica."
          />
          <ServicesPageContent slug={SLUG} />
        </main>
        <Footer />
      </div>
      <StickyMobileBar property={SLUG} />
      <StickyBookingBar property={SLUG} />
    </>
  );
}
