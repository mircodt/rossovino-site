import Link from "next/link";
import { PROPERTIES, type PropertySlug, SITE, telHref, whatsappHref } from "@/lib/config";
import { PhoneIcon, WhatsappIcon } from "./icons";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  /** When set, header shows the property-specific contacts. */
  property?: PropertySlug;
}

export function Header({ property }: HeaderProps) {
  const p = property ? PROPERTIES[property] : null;
  const phone = p?.phone ?? SITE.groupPhone;
  const whatsapp = p?.whatsapp ?? SITE.groupWhatsapp;

  // CSS Grid layout — fixed columns so navigating between properties never
  // shifts the menu position. Previously `justify-between` reacted to the
  // varying phone-number text width per property.
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[color:var(--color-border)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 h-16 md:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-6">
        {/* Col 1: Brand logo — width depends on variant but is fixed for
            both city logos (Milano + Como share dimensions), so going
            Boutique→Milano→Como the layout is stable. */}
        <Logo property={property} size="md" />

        {/* Col 2: Desktop nav (centered, fixed-width to keep things stable) */}
        <nav className="hidden lg:flex items-center justify-center gap-7 text-sm">
          <Link href="/milano-boutique" className="hover:text-vinaccia transition-colors">Boutique</Link>
          <Link href="/milano" className="hover:text-vinaccia transition-colors">Milano</Link>
          <Link href="/como" className="hover:text-vinaccia transition-colors">Como</Link>
          <Link href="/contatti" className="hover:text-vinaccia transition-colors">Contatti</Link>
        </nav>
        {/* Spacer for mobile — keeps the grid 3 columns and centers the
            phantom middle when nav is hidden. */}
        <span className="lg:hidden" aria-hidden />

        {/* Col 3: Right-side actions
            On desktop we now show icon-only contact buttons (no phone
            number text) so the column width is constant across pages. */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href={telHref(phone)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sabbia hover:bg-sabbia-dark text-vinaccia transition-colors"
            aria-label={`Chiama ${p ? p.shortName : "RossoVino"}`}
            title={phone}
          >
            <PhoneIcon className="w-4 h-4" aria-hidden />
          </a>
          <a
            href={whatsappHref(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-verde-dark hover:bg-verde-hover text-white transition-colors"
            aria-label="Apri WhatsApp"
          >
            <WhatsappIcon className="w-5 h-5" aria-hidden />
          </a>
          <Button href={p ? `/${p.slug}#prenota` : "/#prenota"} variant="primary">
            Prenota
          </Button>
        </div>

        {/* Mobile/tablet hamburger — only switches between properties */}
        <MobileMenu property={property} />
      </div>
    </header>
  );
}
