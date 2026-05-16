/**
 * Central config — single source of truth for site data.
 *
 * Every value tagged with `// REPLACE: ...` is a *realistic placeholder*
 * so the site renders cleanly today, while making the find-and-replace
 * trivial when the client provides real data.
 */

export const SITE = {
  url: "https://www.hotelrossovino.it",
  name: "Hotel RossoVino",
  legalName: "Gruppo Hotel RossoVino",
  defaultLocale: "it-IT",
  /** Generic group-level contacts used on homepage and as fallback. */
  groupPhone: "+39 02 000 0000", // REPLACE: inserire dato reale del cliente
  groupWhatsapp: "+39 02 000 0000", // REPLACE: inserire dato reale del cliente
  groupEmail: "info@hotelrossovino.it", // REPLACE: inserire dato reale del cliente
} as const;

export type PropertySlug = "milano" | "milano-boutique" | "como";

export interface PropertyConfig {
  slug: PropertySlug;
  shortName: string;
  fullName: string;
  stars?: 2 | 3;
  accent: "vinaccia" | "sabbia-dark" | "blu";
  accentHex: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: "IT";
  };
  geo: { latitude: string; longitude: string };
  priceRange: "€" | "€€" | "€€€";
  totalRooms: string;
  checkIn: string;
  checkOut: string;
  heroImage: string;
  heroSlides: string[];
  ogImage: string;
  gallery: string[];
  roomsGallery: string[];
  roomExample: {
    name: string;
    description?: string;
    photos: string[];
  };
  pageBg: string;
  /** Vertical Booking integration. Empty until the client provides embed
   *  credentials — the booking widget will render a placeholder message. */
  verticalBooking: {
    hotelId: string;
    bookingUrl: string;
  };
}

export const PROPERTIES: Record<PropertySlug, PropertyConfig> = {
  "milano-boutique": {
    slug: "milano-boutique",
    shortName: "Boutique",
    fullName: "Boutique RossoVino Milano",
    accent: "vinaccia",
    accentHex: "#8B5963",
    phone: "+39 02 000 0001", // REPLACE: inserire dato reale del cliente
    whatsapp: "+39 02 000 0001", // REPLACE: inserire dato reale del cliente
    email: "boutique@hotelrossovino.it", // REPLACE: inserire dato reale del cliente
    address: {
      streetAddress: "Via della Villa, 1", // REPLACE: inserire dato reale del cliente
      addressLocality: "Milano",
      postalCode: "20100", // REPLACE: CAP reale
      addressRegion: "MI",
      addressCountry: "IT",
    },
    geo: { latitude: "45.4642", longitude: "9.1900" }, // REPLACE: coordinate reali
    priceRange: "€€€",
    totalRooms: "12", // REPLACE: numero reale di camere
    checkIn: "15:00", // REPLACE: orario reale
    checkOut: "11:00", // REPLACE: orario reale
    heroImage: "images/boutique/hero.jpg",
    heroSlides: [
      "/images/boutique/hero/1.jpg",
      "/images/boutique/hero/2.jpg",
      "/images/boutique/hero/3.jpg",
      "/images/boutique/hero/4.jpg",
    ],
    ogImage: "images/boutique/og.jpg",
    gallery: [
      "/images/boutique/gallery/01.jpg",
      "/images/boutique/gallery/02.jpg",
      "/images/boutique/gallery/03.jpg",
      "/images/boutique/gallery/04.jpg",
      "/images/boutique/gallery/05.jpg",
      "/images/boutique/gallery/06.jpg",
      "/images/boutique/atmosfera-1.jpg",
      "/images/boutique/atmosfera-2.jpg",
      "/images/boutique/atmosfera-3.jpg",
      "/images/boutique/banner.jpg",
    ],
    roomsGallery: [
      "/images/boutique/rooms/01.jpg",
      "/images/boutique/rooms/02.jpg",
      "/images/boutique/rooms/03.jpg",
      "/images/boutique/rooms/04.jpg",
      "/images/boutique/rooms/05.jpg",
      "/images/boutique/rooms/06.jpg",
    ],
    roomExample: {
      name: "Cabernet Sauvignon",
      description:
        "Camera 309 — soffitto a travi a vista, parete d'accento vinaccia, lucernario sul tetto della villa.",
      photos: [
        "/images/boutique/room-example/1.jpg",
        "/images/boutique/room-example/2.jpg",
        "/images/boutique/room-example/3.jpg",
        "/images/boutique/room-example/4.jpg",
        "/images/boutique/room-example/5.jpg",
        "/images/boutique/room-example/6.jpg",
        "/images/boutique/room-example/7.jpg",
      ],
    },
    pageBg: "#F4ECEE",
    verticalBooking: {
      hotelId: "", // REPLACE: ID Vertical Booking quando disponibile
      bookingUrl: "", // REPLACE: URL Vertical Booking quando disponibile
    },
  },
  milano: {
    slug: "milano",
    shortName: "Milano",
    fullName: "Hotel RossoVino Milano",
    stars: 2,
    accent: "sabbia-dark",
    accentHex: "#C4B99F",
    phone: "+39 02 000 0002", // REPLACE: inserire dato reale del cliente
    whatsapp: "+39 02 000 0002", // REPLACE: inserire dato reale del cliente
    email: "milano@hotelrossovino.it", // REPLACE: inserire dato reale del cliente
    address: {
      streetAddress: "Via Milano, 1", // REPLACE: inserire dato reale del cliente
      addressLocality: "Milano",
      postalCode: "20100", // REPLACE: CAP reale
      addressRegion: "MI",
      addressCountry: "IT",
    },
    geo: { latitude: "45.4642", longitude: "9.1900" }, // REPLACE: coordinate reali
    priceRange: "€€",
    totalRooms: "20", // REPLACE: numero reale di camere
    checkIn: "14:00", // REPLACE: orario reale
    checkOut: "11:00", // REPLACE: orario reale
    heroImage: "images/milano/hero.jpg",
    heroSlides: [
      "/images/milano/hero/1.jpg",
      "/images/milano/hero/2.jpg",
      "/images/milano/hero/3.jpg",
      "/images/milano/hero/4.jpg",
    ],
    ogImage: "images/milano/og.jpg",
    gallery: [
      "/images/milano/gallery/01.jpg",
      "/images/milano/gallery/02.jpg",
      "/images/milano/gallery/03.jpg",
      "/images/milano/gallery/04.jpg",
      "/images/milano/gallery/05.jpg",
      "/images/milano/gallery/06.jpg",
      "/images/milano/atmosfera-1.jpg",
      "/images/milano/atmosfera-2.jpg",
      "/images/milano/atmosfera-3.jpg",
      "/images/milano/banner.jpg",
    ],
    roomsGallery: [
      "/images/milano/rooms/01.jpg",
      "/images/milano/rooms/02.jpg",
      "/images/milano/rooms/03.jpg",
      "/images/milano/rooms/04.jpg",
      "/images/milano/rooms/05.jpg",
      "/images/milano/rooms/06.jpg",
    ],
    roomExample: {
      name: "Nebbiolo", // REPLACE: confermare nome con il cliente
      description:
        "Una camera tipo dell'Hotel RossoVino Milano — design contemporaneo, materiali curati, comfort essenziale per chi visita la città.",
      photos: [
        "/images/milano/room-example/1.jpg",
        "/images/milano/room-example/2.jpg",
        "/images/milano/room-example/3.jpg",
        "/images/milano/room-example/4.jpg",
        "/images/milano/room-example/5.jpg",
        "/images/milano/room-example/6.jpg",
        "/images/milano/room-example/7.jpg",
      ],
    },
    pageBg: "#F0E6D0",
    verticalBooking: {
      hotelId: "", // REPLACE: ID Vertical Booking quando disponibile
      bookingUrl: "", // REPLACE: URL Vertical Booking quando disponibile
    },
  },
  como: {
    slug: "como",
    shortName: "Como",
    fullName: "Hotel RossoVino Como",
    stars: 3,
    accent: "blu",
    accentHex: "#9BAEBA",
    phone: "+39 031 000 0003", // REPLACE: inserire dato reale del cliente
    whatsapp: "+39 031 000 0003", // REPLACE: inserire dato reale del cliente
    email: "como@hotelrossovino.it", // REPLACE: inserire dato reale del cliente
    address: {
      streetAddress: "Via di Sant'Abbondio, 1", // REPLACE: inserire dato reale del cliente
      addressLocality: "Como",
      postalCode: "22100", // REPLACE: CAP reale
      addressRegion: "CO",
      addressCountry: "IT",
    },
    geo: { latitude: "45.8081", longitude: "9.0852" }, // REPLACE: coordinate reali
    priceRange: "€€",
    totalRooms: "35", // REPLACE: numero reale di camere
    checkIn: "14:00", // REPLACE: orario reale
    checkOut: "11:00", // REPLACE: orario reale
    heroImage: "images/como/hero.jpg",
    heroSlides: [
      "/images/como/hero/1.jpg",
      "/images/como/hero/2.jpg",
      "/images/como/hero/3.jpg",
      "/images/como/hero/4.jpg",
    ],
    ogImage: "images/como/og.jpg",
    gallery: [
      "/images/como/gallery/01.jpg",
      "/images/como/gallery/02.jpg",
      "/images/como/gallery/03.jpg",
      "/images/como/gallery/04.jpg",
      "/images/como/gallery/05.jpg",
      "/images/como/gallery/06.jpg",
      "/images/como/gallery/07.jpg",
      "/images/como/atmosfera-1.jpg",
      "/images/como/atmosfera-2.jpg",
      "/images/como/atmosfera-3.jpg",
      "/images/como/banner.jpg",
    ],
    roomsGallery: [
      "/images/como/rooms/01.jpg",
      "/images/como/rooms/02.jpg",
      "/images/como/rooms/03.jpg",
      "/images/como/rooms/04.jpg",
      "/images/como/rooms/05.jpg",
      "/images/como/rooms/06.jpg",
      "/images/como/rooms/07.jpg",
    ],
    roomExample: {
      name: "Chianti", // REPLACE: confermare nome con il cliente
      description:
        "Camera doppia comfort — parete d'accento verde-acqua, intestata in vinaccia, vista sul giardino di Villa Giovio.",
      photos: [
        "/images/como/room-example/1.jpg",
        "/images/como/room-example/2.jpg",
        "/images/como/room-example/3.jpg",
        "/images/como/room-example/4.jpg",
        "/images/como/room-example/5.jpg",
        "/images/como/room-example/6.jpg",
        "/images/como/room-example/7.jpg",
      ],
    },
    pageBg: "#E4ECF1",
    verticalBooking: {
      hotelId: "", // REPLACE: ID Vertical Booking quando disponibile
      bookingUrl: "", // REPLACE: URL Vertical Booking quando disponibile
    },
  },
};

export const PROPERTY_ORDER: PropertySlug[] = ["milano-boutique", "milano", "como"];

/** Helper: turn a phone string into a `tel:` href, stripping spaces/parens. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+0-9]/g, "")}`;
}

/** Helper: turn a phone string into a wa.me href. */
export function whatsappHref(phone: string, prefill?: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : "";
  return `https://wa.me/${digits}${text}`;
}

/** Guard: returns true only if the contact value looks like real data
 *  (non-empty and not a legacy `__TODO__` placeholder). The whole site
 *  uses this to hide CTAs that would otherwise produce broken links. */
export function hasContact(value: string | undefined | null): boolean {
  if (!value) return false;
  if (value.includes("__TODO")) return false;
  return value.trim().length > 0;
}

/** True if the Vertical Booking embed is wired for this property. */
export function hasBookingIntegration(vb: { hotelId: string; bookingUrl: string }): boolean {
  return vb.hotelId.trim().length > 0 && vb.bookingUrl.trim().length > 0;
}
