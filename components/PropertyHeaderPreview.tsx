import Image from "next/image";
import Link from "next/link";
import {
  PROPERTIES,
  SITE,
  type PropertySlug,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { PhoneIcon, WhatsappIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";

/**
 * PROVA DI DESIGN — header scuro per le landing/sottopagine delle tre
 * strutture, sul modello del mockup cliente: fascia nel colore della
 * struttura, logo (senza riquadro) a sinistra, nav maiuscola spaziata,
 * telefono + "Prenota ora" a destra.
 *
 * Generalizzato per `slug`. Il colore della fascia usa i token del tema
 * (`--c-vinaccia-dark`) applicati dal wrapper della pagina, così ogni
 * struttura ha il proprio colore (verde / bordeaux / blu).
 *
 * Modifiche da riunione 24/06/2026:
 *  - logo SENZA riquadro e ~10% più grande;
 *  - su mobile il logo è centrato;
 *  - icona WhatsApp presente anche su mobile.
 */

interface Props {
  slug: PropertySlug;
}

function nav(slug: PropertySlug) {
  return [
    { href: `/${slug}`, label: "Hotel" },
    { href: `/${slug}/camere`, label: "Camere & Suite" },
    { href: `/${slug}/servizi`, label: "Servizi" },
    { href: `/${slug}/contatti`, label: "Contatti" },
  ];
}

const SUBTITLE: Record<PropertySlug, string> = {
  como: "Como",
  milano: "Milano",
  "milano-boutique": "Boutique Milano",
};

export function PropertyHeaderPreview({ slug }: Props) {
  const p = PROPERTIES[slug];
  const phone = p.phone ?? SITE.groupPhone;
  const whatsapp = p.whatsapp ?? SITE.groupWhatsapp;
  const links = nav(slug);

  return (
    <header
      className="sticky top-0 z-40 text-white border-b border-white/10"
      // Fascia nel colore profondo della struttura + icona hamburger bianca.
      style={
        {
          backgroundColor: "var(--c-vinaccia-dark)",
          "--color-ink": "#ffffff",
          "--color-text": "#ffffff",
        } as React.CSSProperties
      }
    >
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8 h-20 md:h-24 flex items-center justify-between gap-4 lg:gap-6">
        {/* Logo senza riquadro. Su mobile è centrato in modo assoluto;
            da lg in poi torna statico a sinistra. */}
        <Link
          href={`/${slug}`}
          aria-label={`${p.fullName} — pagina principale`}
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex flex-col items-center lg:items-start flex-shrink-0"
        >
          <Image
            src={assetSrc("/images/brand/logo-rossovino.png")}
            alt={p.fullName}
            width={212}
            height={32}
            priority
            className="h-5 md:h-6 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="mt-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.42em] text-white/75 leading-none">
            {SUBTITLE[slug]}
          </span>
        </Link>

        {/* Nav maiuscola spaziata, centrata (desktop) */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 hover:text-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Cluster destro */}
        <div className="ml-auto flex items-center gap-3 md:gap-4">
          {/* Telefono (solo desktop) */}
          {hasContact(phone) && (
            <a
              href={telHref(phone)}
              className="hidden lg:inline-flex items-center gap-2 font-mono text-[12px] tabular-nums text-white/85 hover:text-white transition-colors"
              title={
                p.receptionHours
                  ? `${phone} — Reception ${p.receptionHours}`
                  : phone
              }
            >
              <PhoneIcon className="w-3.5 h-3.5" aria-hidden />
              {phone}
            </a>
          )}

          {/* WhatsApp — badge verde brand, sempre visibile (desktop + mobile),
              ben leggibile su qualsiasi colore di header. */}
          {hasContact(whatsapp) && (
            <a
              href={whatsappHref(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apri WhatsApp"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shadow-sm hover:bg-[#1da851] transition-colors"
            >
              <WhatsappIcon className="w-5 h-5" aria-hidden />
            </a>
          )}

          {/* Prenota ora (solo desktop) */}
          <a
            href="#prenota"
            className="hidden lg:inline-flex items-center justify-center min-h-10 px-5 border border-white/70 text-white font-medium text-[12px] uppercase tracking-[0.14em] rounded-[2px] hover:bg-white hover:text-[color:var(--c-vinaccia-dark)] transition-colors"
          >
            Prenota ora
          </a>

          <MobileMenu property={slug} />
        </div>
      </div>
    </header>
  );
}
