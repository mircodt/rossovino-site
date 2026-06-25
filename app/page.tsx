import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HomePreview } from "@/components/HomePreview";
import { JsonLd } from "@/components/JsonLd";
import { PROPERTIES, SITE } from "@/lib/config";
import { HOME_CONTENT } from "@/lib/content";
import {
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: HOME_CONTENT.meta.title,
  description: HOME_CONTENT.meta.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: HOME_CONTENT.meta.title,
    description: HOME_CONTENT.meta.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/${PROPERTIES["milano-boutique"].ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_CONTENT.meta.title,
    description: HOME_CONTENT.meta.description,
  },
};

/**
 * PROVA DI DESIGN — homepage "Italian Hospitality" del mockup cliente
 * (vedi components/HomePreview.tsx). Header e contenuto vivono dentro
 * HomePreview; il Footer è quello condiviso (mobile: 3 sedi in orizzontale).
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE.url }])} />

      <div className="flex-grow flex flex-col">
        <main id="contenuto" className="flex-grow">
          <HomePreview />
        </main>
        <Footer />
      </div>
    </>
  );
}
