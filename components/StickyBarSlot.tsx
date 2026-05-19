"use client";

import { usePathname } from "next/navigation";
import { type PropertySlug, PROPERTY_ORDER } from "@/lib/config";
import { StickyMobileBar } from "./StickyMobileBar";
import { StickyBookingBar } from "./StickyBookingBar";

const PROPERTY_SLUGS = new Set<PropertySlug>(PROPERTY_ORDER);

/**
 * Persistent host for the mobile sticky bar and the desktop sticky booking
 * bar. Lives in `app/layout.tsx` so it survives route transitions instead
 * of unmounting/remounting on every navigation — which is what caused the
 * "bar disappears for a frame when I navigate" bug the client reported.
 *
 * Derives the current property from the URL so the bar can pre-select the
 * right destination in the modal booking form. Homepage uses the
 * single-button variant (only "Verifica disponibilità" → scroll to widget).
 */
export function StickyBarSlot() {
  const pathname = usePathname() ?? "/";
  // /milano-boutique, /milano-boutique/camere, /milano, /como/contatti, etc.
  const slug = pathname.split("/").filter(Boolean)[0] as PropertySlug | undefined;
  const property =
    slug && PROPERTY_SLUGS.has(slug) ? (slug as PropertySlug) : undefined;
  const isHome = pathname === "/" || pathname === "";

  return (
    <>
      <StickyMobileBar
        property={property}
        mode={isHome ? "single" : "full"}
      />
      <StickyBookingBar property={property} />
    </>
  );
}
