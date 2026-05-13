import { PROPERTIES, type PropertyConfig, SITE } from "./config";
import { CONTENT } from "./content";

/** schema.org Organization for the group (used on homepage). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/og-default.jpg`,
    sameAs: [],
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "it-IT",
  } as const;
}

/** schema.org Hotel + LocalBusiness merged into one node (allowed). */
export function hotelSchema(p: PropertyConfig) {
  const c = CONTENT[p.slug];
  const url = `${SITE.url}/${p.slug === "milano-boutique" ? "milano-boutique" : p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LocalBusiness"],
    "@id": `${url}#hotel`,
    name: p.fullName,
    description: c.meta.description,
    url,
    image: `${SITE.url}/${p.heroImage}`,
    telephone: p.phone,
    priceRange: p.priceRange,
    petsAllowed: true,
    ...(p.stars && {
      starRating: { "@type": "Rating", ratingValue: p.stars },
    }),
    address: {
      "@type": "PostalAddress",
      streetAddress: p.address.streetAddress,
      addressLocality: p.address.addressLocality,
      postalCode: p.address.postalCode,
      addressRegion: p.address.addressRegion,
      addressCountry: p.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: p.geo.latitude,
      longitude: p.geo.longitude,
    },
    amenityFeature: c.services.map((s) => ({
      "@type": "LocationFeatureSpecification",
      name: s,
      value: true,
    })),
  } as const;
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } as const;
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  } as const;
}

/** Build canonical URL helper. */
export function canonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${p === "/" ? "" : p}`;
}

/** Pre-compute property metadata for `generateMetadata`. */
export function propertyMetadata(slug: keyof typeof PROPERTIES) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];
  const url = canonical(`/${slug}`);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url,
      siteName: SITE.name,
      images: [{ url: `${SITE.url}/${p.ogImage}`, width: 1200, height: 630, alt: p.fullName }],
      locale: "it_IT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: c.meta.title,
      description: c.meta.description,
      images: [`${SITE.url}/${p.ogImage}`],
    },
  };
}
