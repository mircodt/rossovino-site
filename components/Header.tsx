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
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  /** When set, header shows the property-specific nav + contacts. */
  property?: PropertySlug;
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

export function Header({ property }: HeaderProps) {
  const p = property ? PROPERTIES[property] : null;
  const phone = p?.phone ?? SITE.groupPhone;
  const whatsapp = p?.whatsapp ?? SITE.groupWhatsapp;
  const nav = p ? propertyNav(p.slug) : groupNav;

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[color:var(--color-border)]">
      {/* Tiny "back to group" strip when on a property page */}
      {p && (
        <div className="border-b border-[color:var(--color-border)]/60 bg-white/40">
          <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 py-1.5">
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] hover:text-vinaccia transition-colors inline-flex items-center gap-1"
            >
              <span aria-hidden>←</span> Tutte le strutture
            </Link>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 h-16 md:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-6">
        {/* Logo — always links to group home */}
        <Logo property={property} size="md" />

        {/* Desktop nav — group or property depending on context */}
        <nav className="hidden lg:flex items-center justify-center gap-7 text-sm">
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
        {/* Mobile spacer — keeps the 3-col grid stable when nav hides */}
        <span className="lg:hidden" aria-hidden />

        {/* Right-side actions, guarded against placeholder values */}
        <div className="hidden lg:flex items-center gap-2">
          {hasContact(phone) && (
            <a
              href={telHref(phone)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sabbia hover:bg-sabbia-dark text-vinaccia transition-colors"
              aria-label={`Chiama ${p ? p.shortName : "RossoVino"}`}
              title={phone}
            >
              <PhoneIcon className="w-4 h-4" aria-hidden />
            </a>
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

        {/* Mobile hamburger — opens the property switcher drawer */}
        <MobileMenu property={property} />
      </div>
    </header>
  );
}
