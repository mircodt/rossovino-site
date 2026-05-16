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

interface Props {
  /** When set, uses property-specific phone/whatsapp and pre-fills the
   *  modal booking form with that destination. Falls back to group. */
  property?: PropertySlug;
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
export function StickyMobileBar({ property }: Props) {
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

  return createPortal(
    <>
      {bar}
      {modal}
    </>,
    document.body,
  );
}
