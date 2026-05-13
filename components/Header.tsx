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

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[color:var(--color-border)]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8 h-16 md:h-20">
        {/* Brand — official logo, recolored to palette vinaccia */}
        <Logo property={property} size="md" />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/milano-boutique" className="hover:text-vinaccia transition-colors">Boutique</Link>
          <Link href="/milano" className="hover:text-vinaccia transition-colors">Milano</Link>
          <Link href="/como" className="hover:text-vinaccia transition-colors">Como</Link>
          <Link href="/contatti" className="hover:text-vinaccia transition-colors">Contatti</Link>
        </nav>

        {/* Desktop contacts (lg+) — on smaller screens these live inside the mobile drawer */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href={telHref(phone)}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink)] hover:text-vinaccia transition-colors"
            aria-label={`Chiama ${p ? p.shortName : "RossoVino"}`}
          >
            <PhoneIcon className="w-4 h-4" />
            <span className="font-mono tabular-nums">{phone}</span>
          </a>
          <a
            href={whatsappHref(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-verde-dark text-white hover:bg-verde-hover transition-colors"
            aria-label="Apri WhatsApp"
          >
            <WhatsappIcon className="w-5 h-5" />
          </a>
          <Button href={p ? `/${p.slug}#prenota` : "/#prenota"} variant="primary">
            Prenota
          </Button>
        </div>

        {/* Mobile/tablet hamburger — opens the drawer */}
        <MobileMenu property={property} />
      </div>
    </header>
  );
}
