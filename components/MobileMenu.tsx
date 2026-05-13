"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  PROPERTIES,
  PROPERTY_ORDER,
  SITE,
  telHref,
  whatsappHref,
  type PropertySlug,
} from "@/lib/config";
import { Button } from "./Button";
import {
  MailIcon,
  MenuIcon,
  PhoneIcon,
  StarIcon,
  WhatsappIcon,
  XIcon,
} from "./icons";

const accentBg: Record<string, string> = {
  vinaccia: "bg-vinaccia",
  "sabbia-dark": "bg-sabbia-dark",
  blu: "bg-blu",
};

interface Props {
  /** When set, footer of the drawer surfaces this property's direct contacts. */
  property?: PropertySlug;
}

export function MobileMenu({ property }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount before using createPortal.
  useEffect(() => setMounted(true), []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);
  const contactPhone = property ? PROPERTIES[property].phone : SITE.groupPhone;
  const contactWA = property ? PROPERTIES[property].whatsapp : SITE.groupWhatsapp;
  const contactEmail = property ? PROPERTIES[property].email : SITE.groupEmail;

  // Drawer JSX, rendered into document.body via portal so that ancestor
  // CSS containing blocks (the header's backdrop-blur creates one) don't
  // collapse our `fixed` positioning.
  const drawer = (
    <div
      className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={close}
          aria-label="Chiudi menu"
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        />

        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
          className={`absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <header className="flex items-center justify-between gap-4 px-5 h-16 border-b border-[color:var(--color-border)]">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2 font-display text-xl text-vinaccia"
            >
              <span className="block h-2 w-2 rounded-full bg-vinaccia" aria-hidden />
              <span className="font-semibold">RossoVino</span>
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Chiudi menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-[2px] text-[var(--color-ink)] hover:bg-sabbia-light transition-colors"
            >
              <XIcon className="w-6 h-6" aria-hidden />
            </button>
          </header>

          {/* Property list — the main nav */}
          <nav aria-label="Le strutture" className="flex-1 overflow-y-auto px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-soft)] mb-3">
              Le strutture
            </p>
            <ul className="space-y-2 mb-6">
              {PROPERTY_ORDER.map((slug) => {
                const p = PROPERTIES[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      onClick={close}
                      className="group flex items-start gap-3 p-3 border border-sabbia hover:border-vinaccia hover:bg-sabbia-light rounded-[2px] transition-colors"
                    >
                      <span
                        aria-hidden
                        className={`mt-1 block w-1 h-10 flex-shrink-0 ${accentBg[p.accent]}`}
                      />
                      <span className="flex-1 min-w-0">
                        <span className="block font-display text-lg leading-tight text-[var(--color-ink)] group-hover:text-vinaccia transition-colors">
                          {p.fullName}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                          {p.stars ? (
                            <span className="inline-flex items-center gap-0.5">
                              {Array.from({ length: p.stars }).map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className="w-3 h-3 text-sabbia-dark"
                                  aria-hidden
                                />
                              ))}
                              <span className="ml-1">{p.stars} stelle</span>
                            </span>
                          ) : (
                            <span>Boutique</span>
                          )}
                          <span aria-hidden>·</span>
                          <span>{p.address.addressLocality}</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-soft)] mb-3">
              Naviga
            </p>
            <ul className="space-y-1 mb-4">
              <li>
                <Link
                  href="/"
                  onClick={close}
                  className="flex items-center min-h-11 px-3 hover:bg-sabbia-light hover:text-vinaccia rounded-[2px] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  onClick={close}
                  className="flex items-center min-h-11 px-3 hover:bg-sabbia-light hover:text-vinaccia rounded-[2px] transition-colors"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sticky drawer footer: direct contacts of current context */}
          <footer className="border-t border-[color:var(--color-border)] p-5 space-y-3 bg-sabbia-light">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
              {property ? PROPERTIES[property].shortName : "Contatti gruppo"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={telHref(contactPhone)}
                onClick={close}
                className="flex items-center justify-center gap-2 min-h-11 bg-white border border-sabbia hover:border-vinaccia text-[var(--color-ink)] rounded-[2px] text-sm font-medium"
              >
                <PhoneIcon className="w-4 h-4 text-vinaccia" aria-hidden />
                Chiama
              </a>
              <a
                href={whatsappHref(contactWA)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center gap-2 min-h-11 bg-white border border-sabbia hover:border-verde-dark text-[var(--color-ink)] rounded-[2px] text-sm font-medium"
              >
                <WhatsappIcon className="w-4 h-4 text-verde-dark" aria-hidden />
                WhatsApp
              </a>
            </div>
            <a
              href={`mailto:${contactEmail}`}
              onClick={close}
              className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] hover:text-vinaccia min-h-9"
            >
              <MailIcon className="w-4 h-4" aria-hidden />
              <span className="break-all">{contactEmail}</span>
            </a>
            <div className="pt-2">
              <Button
                href={property ? `/${property}#prenota` : "/#prenota"}
                variant="primary"
                className="w-full"
                onClick={close}
              >
                Prenota una camera
              </Button>
            </div>
          </footer>
        </aside>
      </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Apri menu di navigazione"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[2px] text-[var(--color-ink)] hover:bg-sabbia-light transition-colors"
      >
        <MenuIcon className="w-6 h-6" aria-hidden />
      </button>
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
