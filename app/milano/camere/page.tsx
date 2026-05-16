import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { SubPageHero } from "@/components/SubPageHero";
import { RoomsPageContent } from "@/components/RoomsPageContent";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { breadcrumbSchema, canonical, subPageMetadata } from "@/lib/seo";

const SLUG = "milano" as const;

export const metadata: Metadata = subPageMetadata(SLUG, "camere");

export default function Page() {
  const p = PROPERTIES[SLUG];
  return (
    <>
      
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: p.fullName, url: canonical(`/${SLUG}`) },
          { name: "Camere & Suite", url: canonical(`/${SLUG}/camere`) },
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
            eyebrow="Camere & Suite"
            title="Le nostre camere"
            description="Ogni stanza porta il nome di un vino italiano. Stesso DNA RossoVino, materiali curati e comfort contemporaneo — pensate per chi cerca un soggiorno che sia anche un'esperienza."
          />
          <RoomsPageContent slug={SLUG} />
        </main>
        <Footer />
      </div>
      <StickyMobileBar property={SLUG} />
    </>
  );
}
