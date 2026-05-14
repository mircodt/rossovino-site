"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  PROPERTIES,
  PROPERTY_ORDER,
  type PropertySlug,
} from "@/lib/config";
import { Logo } from "./Logo";
import { MenuIcon, StarIcon, XIcon } from "./icons";

const accentBg: Record<string, string> = {
  vinaccia: "bg-vinaccia",
  "sabbia-dark": "bg-sabbia-dark",
  blu: "bg-blu",
};

interface Props {
  /** No longer used (drawer is contact-free); kept for API stability with Header. */
  property?: PropertySlug;
}

/**
 * Mobile drawer — intentionally minimal. The only purpose is to switch
 * between the three properties. Contact CTAs (phone, WhatsApp, email,
 * Prenota) intentionally live in the sticky bottom bar; duplicating them
 * here clutters the experience.
 */
export function MobileMenu({ property: _property }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

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
        aria-label="Scegli la struttura"
        className={`absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-4 px-5 h-16 border-b border-[color:var(--color-border)]">
          <Link href="/" onClick={close} aria-label="Hotel RossoVino — homepage">
            <Logo asLink={false} size="sm" />
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

        <nav aria-label="Le strutture" className="flex-1 overflow-y-auto px-5 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-soft)] mb-4">
            Scegli la struttura
          </p>
          <ul className="space-y-3">
            {PROPERTY_ORDER.map((slug) => {
              const p = PROPERTIES[slug];
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    onClick={close}
                    className="group flex items-start gap-3 p-3.5 border border-sabbia hover:border-vinaccia hover:bg-sabbia-light rounded-[2px] transition-colors"
                  >
                    <span
                      aria-hidden
                      className={`mt-1 block w-1 h-12 flex-shrink-0 ${accentBg[p.accent]}`}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-xl leading-tight text-[var(--color-ink)] group-hover:text-vinaccia transition-colors">
                        {p.fullName}
                      </span>
                      <span className="mt-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-ink-soft)]">
                        {p.stars ? (
                          <span className="inline-flex items-center gap-0.5">
                            {Array.from({ length: p.stars }).map((_, i) => (
                              <StarIcon key={i} className="w-3 h-3 text-sabbia-dark" aria-hidden />
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
        </nav>
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
