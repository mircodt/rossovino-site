"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookingWidget } from "./BookingWidget";
import { COMO_THEME } from "@/lib/como-theme";
import type { PropertySlug } from "@/lib/config";

interface Props {
  /** When set, the compact bar pre-fills its destination. */
  property?: PropertySlug;
}

/**
 * Desktop-only sticky compact booking bar.
 *
 * It slides down below the header as soon as the main #prenota widget
 * has scrolled out of view, so the booking action is always one click
 * away. When the visitor scrolls back up and the original widget comes
 * back into view, the bar slides away.
 *
 * Rendered via a portal so the fixed positioning isn't trapped by any
 * containing block higher up the tree.
 */
export function StickyBookingBar({ property }: Props) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const target = document.getElementById("prenota");
    if (!target) {
      // No page-level widget (sub-pages) — show the sticky bar from the
      // top so booking is always one click away.
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
      },
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  // Header height on lg = 96px (h-24).
  // On property pages a thin "← Tutte le strutture" strip adds ~32px
  // above the header, so the sticky bar must sit below at 128px,
  // otherwise it gets covered by the strip+header and looks like it
  // "doesn't appear" while scrolling. Eccezione: il nuovo header della
  // prova di design /como NON ha la strip → la barra torna a 96px.
  const topClass =
    property && property !== "como" ? "top-[128px]" : "top-[96px]";

  const bar = (
    <div
      className={`hidden lg:block fixed ${topClass} inset-x-0 z-30 transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "-translate-y-[calc(100%+2px)] pointer-events-none"
      }`}
      // La barra è portalata su <body>, fuori dal wrapper a tema di
      // /como: il tema verde della prova di design va riapplicato qui.
      style={property === "como" ? COMO_THEME : undefined}
      aria-hidden={!show}
    >
      <div className="bg-white border-b border-sabbia shadow-[0_4px_18px_rgba(0,0,0,0.08)]">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 py-3">
          {/* Slim variant, distinct DOM id so the IntersectionObserver
              still locks onto the page-level #prenota widget. */}
          <BookingWidget
            property={property}
            variant="compact"
            formId="prenota-sticky"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(bar, document.body);
}
