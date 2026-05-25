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
  groupPhone: "+39 02 8724 2410",
  groupWhatsapp: "+39 02 8724 2410",
  groupEmail: "info@hotelrossovino.it",
} as const;

export type PropertySlug = "milano" | "milano-boutique" | "como";

export interface PropertyConfig {
  slug: PropertySlug;
  shortName: string;
  fullName: string;
  stars?: 2 | 3;
  accent: "vinaccia" | "blu" | "verde";
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
  /** Orari di apertura della reception. Mostrato accanto al pulsante
   *  telefono nell'Header (desktop) e nel drawer mobile. Tieni la
   *  stringa compatta — il "·" separa periodi/giorni. */
  receptionHours: string;
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
  /** Room types offered by this property. Wine names are illustrative —
   *  client will provide the real assignment of wine names to typologies. */
  roomTypes: {
    type: "matrimoniale" | "matrimoniale-economy" | "matrimoniale-superior" | "twin" | "tripla" | "suite";
    wineName: string;
    capacity: number;
    /** Square meters (number — render as `${size} m²`). */
    size: number;
    /** 3-4 amenity short labels to render with check icons. */
    amenities: string[];
    /** First photo is used in card thumbnail. */
    photos: string[];
  }[];
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
    phone: "+39 02 8724 2410",
    whatsapp: "+39 02 8724 2410",
    email: "info@hotelrossovino.it",
    address: {
      streetAddress: "Via Privata Francesco Bartolozzi, 13",
      addressLocality: "Milano",
      postalCode: "20131",
      addressRegion: "MI",
      addressCountry: "IT",
    },
    // Coordinate ottenute dal link Google Maps fornito dal cliente.
    geo: { latitude: "45.4619979", longitude: "9.2268211" },
    priceRange: "€€€",
    totalRooms: "12", // REPLACE: numero reale di camere
    checkIn: "14:00", // Allineato con Hotel Milano** su richiesta cliente
    checkOut: "11:00", // REPLACE: orario reale
    receptionHours: "Lun–Ven 9:00–23:00 · Sab–Dom 10:00–23:00",
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
    // 3 tipologie corrispondenti alle 3 sottocartelle di
    // websizephotos/STANZE/FOTO STANZE MILANO BOUTIQUE/.
    // Nomi-vino e mq: il cliente confermerà la mappatura definitiva
    // (qui assegnati per restare nel mood RossoVino).
    roomTypes: [
      {
        type: "matrimoniale-superior",
        wineName: "Barbaresco",
        capacity: 2,
        size: 22,
        amenities: ["Letto matrimoniale", "Parete d'accento vinaccia", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/boutique/rooms/matrimoniale-superior/01.jpg",
          "/images/boutique/rooms/matrimoniale-superior/02.jpg",
          "/images/boutique/rooms/matrimoniale-superior/03.jpg",
          "/images/boutique/rooms/matrimoniale-superior/04.jpg",
          "/images/boutique/rooms/matrimoniale-superior/05.jpg",
        ],
      },
      {
        type: "twin",
        wineName: "Nebbiolo",
        capacity: 2,
        size: 20,
        amenities: ["Due letti singoli", "Parquet a spina di pesce", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/boutique/rooms/twin-superior/01.png",
          "/images/boutique/rooms/twin-superior/02.jpg",
          "/images/boutique/rooms/twin-superior/03.jpg",
          "/images/boutique/rooms/twin-superior/04.jpg",
          "/images/boutique/rooms/twin-superior/05.jpg",
        ],
      },
      {
        type: "suite",
        wineName: "Brunello di Montalcino",
        capacity: 2,
        size: 30,
        amenities: ["Vasca freestanding", "Travi a vista", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/boutique/rooms/suite-vasca/01.jpg",
          "/images/boutique/rooms/suite-vasca/02.jpg",
          "/images/boutique/rooms/suite-vasca/03.jpg",
          "/images/boutique/rooms/suite-vasca/04.jpg",
          "/images/boutique/rooms/suite-vasca/05.jpg",
        ],
      },
    ],
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
    accent: "blu",
    accentHex: "#9BAEBA",
    // Centralino condiviso con il Boutique (stesso isolato, stesso staff).
    phone: "+39 02 8724 2410",
    whatsapp: "+39 02 8724 2410",
    email: "info@hotelrossovino.it",
    address: {
      streetAddress: "Via Privata Francesco Bartolozzi, 9",
      addressLocality: "Milano",
      postalCode: "20131",
      addressRegion: "MI",
      addressCountry: "IT",
    },
    // Coordinate ottenute dal link Google Maps fornito dal cliente.
    geo: { latitude: "45.4613086", longitude: "9.2268479" },
    priceRange: "€€",
    totalRooms: "20", // REPLACE: numero reale di camere
    checkIn: "14:00", // REPLACE: orario reale
    checkOut: "11:00", // REPLACE: orario reale
    receptionHours: "Lun–Ven 9:00–23:00 · Sab–Dom 10:00–23:00",
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
        "Una camera tipo dell'Hotel RossoVino Milano — materiali curati e comfort essenziale per chi visita la città.",
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
    // 4 tipologie corrispondenti alle 4 sottocartelle di
    // websizephotos/STANZE/Milano/. Milano distingue tra matrimoniale
    // con bagno in comune (economy, prezzo più accessibile) e bagno
    // privato — il "matrimoniale-economy" è un nuovo type aggiunto al
    // union in PropertyConfig per supportare questa distinzione.
    roomTypes: [
      {
        type: "matrimoniale-economy",
        wineName: "Lambrusco",
        capacity: 2,
        size: 14,
        amenities: ["Letto matrimoniale", "Bagno in comune", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/milano/rooms/matrimoniale-economy/01.jpg",
          "/images/milano/rooms/matrimoniale-economy/02.jpg",
          "/images/milano/rooms/matrimoniale-economy/03.jpg",
          "/images/milano/rooms/matrimoniale-economy/04.jpg",
        ],
      },
      {
        type: "matrimoniale",
        wineName: "Sangiovese",
        capacity: 2,
        size: 16,
        amenities: ["Letto matrimoniale", "Bagno privato", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/milano/rooms/matrimoniale-privato/01.jpg",
          "/images/milano/rooms/matrimoniale-privato/02.jpg",
          "/images/milano/rooms/matrimoniale-privato/03.jpg",
          "/images/milano/rooms/matrimoniale-privato/04.jpg",
          "/images/milano/rooms/matrimoniale-privato/05.jpg",
        ],
      },
      {
        type: "twin",
        wineName: "Pinot Grigio",
        capacity: 2,
        size: 16,
        amenities: ["Due letti singoli", "Bagno privato", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/milano/rooms/twin/01.png",
          "/images/milano/rooms/twin/02.jpg",
        ],
      },
      {
        type: "tripla",
        wineName: "Barbera",
        capacity: 3,
        size: 22,
        amenities: ["Letto matrimoniale + singolo", "Bagno privato", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/milano/rooms/tripla/01.jpg",
          "/images/milano/rooms/tripla/02.jpg",
        ],
      },
    ],
    // Blu coordinated with the property accent. Saturated enough to read
    // visibly as blue (not "neutral / sand") while staying light enough
    // for body text legibility.
    pageBg: "#D2DCE3",
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
    accent: "verde",
    accentHex: "#A4B59B",
    phone: "+39 031 4143949",
    whatsapp: "+39 031 4143949",
    email: "como@hotelrossovino.it",
    address: {
      streetAddress: "Viale Risorgimento 18/A",
      addressLocality: "Como",
      postalCode: "22100",
      addressRegion: "CO",
      addressCountry: "IT",
    },
    // Coordinate approssimate del centro Como — la mappa embed usa
    // l'indirizzo testuale come query (vedi PropertyContactsPageContent),
    // quindi anche se le coordinate non sono esatte la mappa è accurata.
    geo: { latitude: "45.8081", longitude: "9.0852" },
    priceRange: "€€",
    totalRooms: "35", // REPLACE: numero reale di camere
    checkIn: "14:00", // REPLACE: orario reale
    checkOut: "11:00", // REPLACE: orario reale
    receptionHours: "Lun–Dom 8:00–24:00",
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
    // 5 tipologie corrispondenti alle 5 sottocartelle di
    // websizephotos/STANZE/FOTO STANZA SITO COMO/.
    // Nomi-vino: "Primitivo di Manduria" sulla Tripla è esplicito dal
    // cliente (nome cartella); per gli altri ho assegnato vini italiani
    // che restano nel mood RossoVino — il cliente può raffinarli quando
    // fornirà la mappatura definitiva camera-vino.
    // Foto: la prima di ogni array è la thumbnail della card su /como/camere;
    // /public/images/como/rooms/<tipologia>/ contiene 4-5 foto per tipologia.
    roomTypes: [
      {
        type: "matrimoniale",
        wineName: "Chianti",
        capacity: 2,
        size: 18,
        amenities: ["Letto matrimoniale", "Bagno privato", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/como/rooms/matrimoniale/01.jpg",
          "/images/como/rooms/matrimoniale/02.jpg",
          "/images/como/rooms/matrimoniale/03.jpg",
          "/images/como/rooms/matrimoniale/04.jpg",
          "/images/como/rooms/matrimoniale/05.jpg",
        ],
      },
      {
        type: "matrimoniale-superior",
        wineName: "Brunello",
        capacity: 2,
        size: 22,
        amenities: ["Letto matrimoniale", "Pannelli decorativi 3D", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/como/rooms/superior/01.jpg",
          "/images/como/rooms/superior/02.jpg",
          "/images/como/rooms/superior/03.jpg",
          "/images/como/rooms/superior/04.jpg",
          "/images/como/rooms/superior/05.jpg",
        ],
      },
      {
        type: "twin",
        wineName: "Pinot Grigio",
        capacity: 2,
        size: 20,
        amenities: ["Due letti singoli", "Bagno privato", "Wi-Fi gratuito", "Vista giardino"],
        photos: [
          "/images/como/rooms/twin/01.jpg",
          "/images/como/rooms/twin/02.jpg",
          "/images/como/rooms/twin/03.jpg",
          "/images/como/rooms/twin/04.jpg",
        ],
      },
      {
        type: "tripla",
        wineName: "Primitivo di Manduria",
        capacity: 3,
        size: 26,
        amenities: ["Letto matrimoniale + singolo", "Terrazza privata", "Wi-Fi gratuito", "Smart TV"],
        photos: [
          "/images/como/rooms/tripla/01.jpg",
          "/images/como/rooms/tripla/02.jpg",
          "/images/como/rooms/tripla/03.jpg",
          "/images/como/rooms/tripla/04.jpg",
          "/images/como/rooms/tripla/05.jpg",
        ],
      },
      {
        type: "suite",
        wineName: "Barolo Riserva",
        capacity: 4,
        size: 36,
        amenities: ["Letto matrimoniale + zona giorno", "Scrittoio dedicato", "Wi-Fi gratuito", "Vista giardino"],
        photos: [
          "/images/como/rooms/suite/01.jpg",
          "/images/como/rooms/suite/02.jpg",
          "/images/como/rooms/suite/03.jpg",
          "/images/como/rooms/suite/04.jpg",
          "/images/como/rooms/suite/05.jpg",
        ],
      },
    ],
    // Verde coordinated with the property accent. Same saturation logic as
    // Milano's blu — clearly green but readable as a page background.
    pageBg: "#D9E3CF",
    verticalBooking: {
      hotelId: "", // REPLACE: ID Vertical Booking quando disponibile
      bookingUrl: "", // REPLACE: URL Vertical Booking quando disponibile
    },
  },
};

export const PROPERTY_ORDER: PropertySlug[] = ["como", "milano-boutique", "milano"];

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
