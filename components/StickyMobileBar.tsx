"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  PROPERTIES,
  SITE,
  type PropertySlug,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { BedIcon, PhoneIcon, WhatsappIcon, XIcon } from "./icons";
import { BookingWidget } from "./BookingWidget";
import { propertyTheme } from "@/lib/property-theme";

interface Props {
  /** When set, uses property-specific phone/whatsapp and pre-fills the
   *  modal booking form with that destination. Falls back to group. */
  property?: PropertySlug;
  /** "full" (default) = 3 cells (Chiama, WhatsApp, Prenota), used on
   *  property pages. "single" = one full-width "Verifica disponibilità"
   *  cell that scrolls to #prenota — used on the homepage where the
   *  visitor has to pick a destination first. */
  mode?: "full" | "single";
}

/**
 * Mobile-only bottom bar. Three big touch targets — Chiama, WhatsApp,
 * Prenota. The Prenota tap opens a fullscreen modal containing the
 * complete booking form (instead of just scrolling to #prenota), so the
 * action is always one tap away regardless of scroll position.
 *
 * Rendered via a React Portal so position:fixed pins to the viewport
 * even if an ancestor introduces a containing block. Modal also lives
 * in the portal so it sits above the rest of the UI.
 */
export function StickyMobileBar({ property, mode = "full" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll + Esc-to-close while the modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const p = property ? PROPERTIES[property] : null;
  const phone = p?.phone ?? SITE.groupPhone;
  const whatsapp = p?.whatsapp ?? SITE.groupWhatsapp;
  const prenotaLabel = p ? `Prenota ${p.shortName}` : "Prenota";

  if (!mounted) return null;

  /** Smooth-scroll the booking widget into view, making sure neither the
   *  sticky bar nor the sticky header end up covering it. If the widget
   *  fits in the available viewport, it's vertically centred; otherwise
   *  it's pinned to the top edge under the header. */
  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("prenota");
    if (!target) return;
    const STICKY_BAR = 60; // includes safe-area padding buffer
    const HEADER = 64; // mobile header height
    const rect = target.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const availableH = viewportH - HEADER - STICKY_BAR;
    let y: number;
    if (rect.height <= availableH) {
      // Widget fits — centre it in the visible area between header and bar
      const offset = (availableH - rect.height) / 2;
      y = window.scrollY + rect.top - HEADER - offset;
    } else {
      // Widget taller than available — top-pin it just under the header
      y = window.scrollY + rect.top - HEADER - 8;
    }
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  // Single-button bar (homepage). The button IS the bar — no white
  // wrapper around it, so the glassmorphism reads over the page below.
  if (mode === "single") {
    const singleBar = (
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 safe-bottom">
        <button
          type="button"
          onClick={scrollToBooking}
          className="
            w-full h-[52px] flex items-center justify-center gap-2
            bg-vinaccia/85 backdrop-blur-md backdrop-saturate-150
            text-white font-medium text-sm uppercase tracking-wide
            shadow-[0_-6px_24px_rgba(139,89,99,0.28)]
            border-t border-white/20
            hover:bg-vinaccia/95 active:bg-vinaccia transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70
          "
          aria-label="Verifica disponibilità"
        >
          <BedIcon className="w-5 h-5" aria-hidden />
          Verifica disponibilità
        </button>
      </div>
    );
    return createPortal(singleBar, document.body);
  }

  // Property pages (mode="full"): keep the existing 3-cell bar wrapped
  // in the original white container.
  const bar = (
    <div
      role="navigation"
      aria-label="Azioni rapide"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)] safe-bottom border-t border-[color:var(--color-border)]"
    >
      {(() => {
        const cells: React.ReactNode[] = [];
        if (hasContact(phone)) {
          cells.push(
            <a
              key="phone"
              href={telHref(phone)}
              className="flex flex-col items-center justify-center gap-1 py-3 min-h-14 text-vinaccia font-medium text-xs uppercase tracking-wide hover:bg-sabbia-light transition-colors"
              aria-label={`Chiama ${p ? p.shortName : "RossoVino"}`}
            >
              <PhoneIcon className="w-5 h-5" aria-hidden />
              Chiama
            </a>,
          );
        }
        if (hasContact(whatsapp)) {
          cells.push(
            <a
              key="wa"
              href={whatsappHref(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 py-3 min-h-14 text-verde-dark font-medium text-xs uppercase tracking-wide hover:bg-sabbia-light transition-colors"
              aria-label="Apri WhatsApp"
            >
              <WhatsappIcon className="w-5 h-5" aria-hidden />
              WhatsApp
            </a>,
          );
        }
        cells.push(
          <button
            key="book"
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-3 min-h-14 bg-vinaccia text-white font-medium text-xs uppercase tracking-wide hover:bg-vinaccia-hover transition-colors"
            aria-label={prenotaLabel}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <BedIcon className="w-5 h-5" aria-hidden />
            Prenota
          </button>,
        );
        return (
          <div
            className="grid divide-x divide-[color:var(--color-border)]"
            style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
          >
            {cells}
          </div>
        );
      })()}
    </div>
  );

  // Note: the booking modal below is unused in mode="single" (homepage uses
  // an in-page scroll target), but keeping the conditional rendering simple
  // by always defining it.

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Prenota una camera"
      className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        aria-label="Chiudi"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />

      <div
        className={`absolute bottom-0 inset-x-0 max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-t border-[color:var(--color-border)] transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <header className="sticky top-0 bg-white z-10 flex items-center justify-between gap-4 px-5 h-14 border-b border-[color:var(--color-border)]">
          <p className="font-display text-lg text-[var(--color-ink)]">
            {prenotaLabel}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Chiudi"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[2px] hover:bg-sabbia-light transition-colors"
          >
            <XIcon className="w-5 h-5" aria-hidden />
          </button>
        </header>

        <div className="p-5">
          <BookingWidget
            property={property}
            variant="compact"
            formId="prenota-mobile-modal"
          />
        </div>
      </div>
    </div>
  );

  // mode === "full" reaches here — render bar + modal. Il contenuto è
  // portalato su <body>, fuori dal wrapper a tema di /como: il div statico
  // riapplica le CSS vars del tema verde (non influisce sul layout dei
  // figli position:fixed).
  return createPortal(
    <div style={property ? propertyTheme(property) : undefined}>
      {bar}
      {modal}
    </div>,
    document.body,
  );
}
