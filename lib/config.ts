/**
 * Central config — every value flagged with `__TODO__` must be confirmed by the
 * client before going live. See README §"PLACEHOLDER da compilare".
 *
 * The site code reads everything from this file: changing a phone number or
 * address here propagates everywhere (header, sticky bar, schema.org, etc).
 */

export const SITE = {
  url: "https://www.hotelrossovino.it",
  name: "Hotel RossoVino",
  legalName: "Gruppo Hotel RossoVino",
  defaultLocale: "it-IT",
  /** Generic group-level contacts used on homepage and as fallback. */
  groupPhone: "__TODO_GROUP_PHONE__",
  groupWhatsapp: "__TODO_GROUP_WHATSAPP__",
  groupEmail: "__TODO_GROUP_EMAIL__",
} as const;

export type PropertySlug = "milano" | "milano-boutique" | "como";

export interface PropertyConfig {
  slug: PropertySlug;
  /** Short label for nav, cards, sticky bar */
  shortName: string;
  /** Full legal name used in titles and schema */
  fullName: string;
  /** Star rating (boutique is undefined — it's a boutique category, not starred) */
  stars?: 2 | 3;
  /** Accent color token — see brief §5.2 */
  accent: "vinaccia" | "sabbia-dark" | "blu";
  /** Hex of the accent — used inline (gradients, schema, OG meta) */
  accentHex: string;
  /** Contact data */
  phone: string;
  whatsapp: string;
  email: string;
  /** Postal address */
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: "IT";
  };
  /** Geo coordinates (decimal degrees) — used for LocalBusiness schema */
  geo: { latitude: string; longitude: string };
  /** Price band — used for Hotel schema (€, €€, €€€) */
  priceRange: "€" | "€€" | "€€€";
  /** Total rooms — placeholder until client confirms */
  totalRooms: string;
  /** Check-in / check-out hours */
  checkIn: string;
  checkOut: string;
  /** Hero image path under /public/images (NO leading slash). */
  heroImage: string;
  /** OpenGraph image — usually identical to heroImage. */
  ogImage: string;
  /** Vertical Booking integration data (placeholder until embed arrives) */
  verticalBooking: {
    hotelId: string;
    /** URL the booking widget should redirect to after a query. */
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
    phone: "__TODO_BOUTIQUE_PHONE__",
    whatsapp: "__TODO_BOUTIQUE_WHATSAPP__",
    email: "__TODO_BOUTIQUE_EMAIL__",
    address: {
      streetAddress: "__TODO_BOUTIQUE_STREET__",
      addressLocality: "Milano",
      postalCode: "__TODO_BOUTIQUE_CAP__",
      addressRegion: "MI",
      addressCountry: "IT",
    },
    geo: { latitude: "__TODO_BOUTIQUE_LAT__", longitude: "__TODO_BOUTIQUE_LNG__" },
    priceRange: "€€€",
    totalRooms: "__TODO_BOUTIQUE_ROOMS__",
    checkIn: "__TODO_BOUTIQUE_CHECKIN__",
    checkOut: "__TODO_BOUTIQUE_CHECKOUT__",
    heroImage: "images/boutique/hero.jpg",
    ogImage: "images/boutique/og.jpg",
    verticalBooking: {
      hotelId: "__TODO_BOUTIQUE_VB_ID__",
      bookingUrl: "__TODO_BOUTIQUE_VB_URL__",
    },
  },
  milano: {
    slug: "milano",
    shortName: "Milano",
    fullName: "Hotel RossoVino Milano",
    stars: 2,
    accent: "sabbia-dark",
    accentHex: "#C4B99F",
    phone: "__TODO_MILANO_PHONE__",
    whatsapp: "__TODO_MILANO_WHATSAPP__",
    email: "__TODO_MILANO_EMAIL__",
    address: {
      streetAddress: "__TODO_MILANO_STREET__",
      addressLocality: "Milano",
      postalCode: "__TODO_MILANO_CAP__",
      addressRegion: "MI",
      addressCountry: "IT",
    },
    geo: { latitude: "__TODO_MILANO_LAT__", longitude: "__TODO_MILANO_LNG__" },
    priceRange: "€€",
    totalRooms: "__TODO_MILANO_ROOMS__",
    checkIn: "__TODO_MILANO_CHECKIN__",
    checkOut: "__TODO_MILANO_CHECKOUT__",
    heroImage: "images/milano/hero.jpg",
    ogImage: "images/milano/og.jpg",
    verticalBooking: {
      hotelId: "__TODO_MILANO_VB_ID__",
      bookingUrl: "__TODO_MILANO_VB_URL__",
    },
  },
  como: {
    slug: "como",
    shortName: "Como",
    fullName: "Hotel RossoVino Como",
    stars: 3,
    accent: "blu",
    accentHex: "#9BAEBA",
    phone: "__TODO_COMO_PHONE__",
    whatsapp: "__TODO_COMO_WHATSAPP__",
    email: "__TODO_COMO_EMAIL__",
    address: {
      streetAddress: "__TODO_COMO_STREET__",
      addressLocality: "Como",
      postalCode: "__TODO_COMO_CAP__",
      addressRegion: "CO",
      addressCountry: "IT",
    },
    geo: { latitude: "__TODO_COMO_LAT__", longitude: "__TODO_COMO_LNG__" },
    priceRange: "€€",
    totalRooms: "__TODO_COMO_ROOMS__",
    checkIn: "__TODO_COMO_CHECKIN__",
    checkOut: "__TODO_COMO_CHECKOUT__",
    heroImage: "images/como/hero.jpg",
    ogImage: "images/como/og.jpg",
    verticalBooking: {
      hotelId: "__TODO_COMO_VB_ID__",
      bookingUrl: "__TODO_COMO_VB_URL__",
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
