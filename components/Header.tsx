import Link from "next/link";
import {
  PROPERTIES,
  type PropertySlug,
  SITE,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { PhoneIcon, WhatsappIcon } from "./icons";
import { Button } from "./Button";
import { LangSwitcher } from "./LangSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  /** When set, header shows the property-specific nav + contacts. */
  property?: PropertySlug;
  /** Widens the header content to 1280px (instead of 1200px) so the logo
   *  sits a touch further left and aligns with a wider page layout. Used by
   *  the Como landing design test. Default keeps the standard 1200px. */
  wide?: boolean;
}

/** Group-level nav links shown on the homepage and on /contatti. */
const groupNav = [
  { href: "/milano-boutique", label: "Boutique" },
  { href: "/milano", label: "Milano" },
  { href: "/como", label: "Como" },
  { href: "/contatti", label: "Contatti" },
];

/** Property-level nav — used whenever the user is on a property page or
 *  any of its sub-pages (/<slug>, /<slug>/camere, /<slug>/servizi, etc). */
function propertyNav(slug: PropertySlug) {
  return [
    { href: `/${slug}`, label: "Hotel" },
    { href: `/${slug}/camere`, label: "Camere & Suite" },
    { href: `/${slug}/servizi`, label: "Servizi" },
    { href: `/${slug}/contatti`, label: "Contatti" },
  ];
}

export function Header({ property, wide = false }: HeaderProps) {
  const p = property ? PROPERTIES[property] : null;
  const phone = p?.phone ?? SITE.groupPhone;
  const whatsapp = p?.whatsapp ?? SITE.groupWhatsapp;
  const nav = p ? propertyNav(p.slug) : groupNav;
  const maxW = wide ? "max-w-[1280px]" : "max-w-[1200px]";

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[color:var(--color-border)]">
      {/* Tiny "back to group" strip when on a property page */}
      {p && (
        <div className="border-b border-[color:var(--color-border)]/60 bg-white/40">
          <div className={`mx-auto w-full ${maxW} px-5 md:px-8 py-1.5`}>
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] hover:text-vinaccia transition-colors inline-flex items-center gap-1"
            >
              <span aria-hidden>←</span> Tutte le strutture
            </Link>
          </div>
        </div>
      )}

      {/* Flex (not grid) so children that are display:none on mobile —
          desktop nav, desktop contacts cluster — don't leave gaps that
          push the hamburger toward the center. Logo on the left,
          optional centered nav, then the right cluster (which always
          ends with the mobile hamburger). */}
      <div className={`mx-auto w-full ${maxW} px-5 md:px-8 h-16 md:h-20 lg:h-24 flex items-center justify-between gap-4 lg:gap-6`}>
        <Logo property={property} size="md" />

        {/* Desktop nav — only when on a property page */}
        {p && (
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-7 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-vinaccia transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right cluster: desktop contacts (lg+) + mobile hamburger
            (lg:hidden). The cluster is always rendered, always sits on
            the right thanks to justify-between on the parent. */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            <LangSwitcher />
            <span className="h-5 w-px bg-[color:var(--color-border)]" aria-hidden />
            {hasContact(phone) && (
              <div className="flex items-center gap-2">
                {/* Reception hours — only on property pages where we
                    know which structure the visitor is looking at.
                    Hidden below xl: to avoid pushing the rest of the
                    cluster off-screen on narrow desktops. */}
                {p?.receptionHours && (
                  <div className="hidden xl:flex flex-col items-end leading-tight">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
                      Reception
                    </span>
                    <span className="font-mono text-[11px] text-[var(--color-ink)] tabular-nums text-right">
                      {p.receptionHours.split(" · ").map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                <a
                  href={telHref(phone)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sabbia hover:bg-sabbia-dark text-vinaccia transition-colors"
                  aria-label={`Chiama ${p ? p.shortName : "RossoVino"}${
                    p?.receptionHours ? ` — reception ${p.receptionHours}` : ""
                  }`}
                  title={
                    p?.receptionHours
                      ? `${phone} — Reception ${p.receptionHours}`
                      : phone
                  }
                >
                  <PhoneIcon className="w-4 h-4" aria-hidden />
                </a>
              </div>
            )}
            {hasContact(whatsapp) && (
              <a
                href={whatsappHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-verde-dark hover:bg-verde-hover text-white transition-colors"
                aria-label="Apri WhatsApp"
              >
                <WhatsappIcon className="w-5 h-5" aria-hidden />
              </a>
            )}
            <Button href={p ? `/${p.slug}#prenota` : "/#prenota"} variant="primary">
              Prenota
            </Button>
          </div>
          <MobileMenu property={property} />
        </div>
      </div>
    </header>
  );
}
