import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, SITE, hasContact, telHref } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { PhoneIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";

/**
 * PROVA DI DESIGN — header scuro per la landing /como, sul modello del
 * mockup cliente: fascia verde foresta, logo in cornice sottile al centro
 * sinistra, nav in maiuscolo spaziato, telefono + "Prenota ora" in
 * outline a destra. Usato SOLO da app/como/page.tsx; le altre pagine
 * restano sull'Header condiviso.
 */

const SLUG = "como" as const;

/** Verde foresta del mockup — stesso valore di --c-vinaccia-dark
 *  sovrascritto nella pagina /como. */
const HEADER_GREEN = "#333D2A";

const NAV = [
  { href: `/${SLUG}`, label: "Hotel" },
  { href: `/${SLUG}/camere`, label: "Camere & Suite" },
  { href: `/${SLUG}/servizi`, label: "Servizi" },
  { href: `/${SLUG}/contatti`, label: "Contatti" },
];

export function ComoHeaderPreview() {
  const p = PROPERTIES[SLUG];
  const phone = p.phone ?? SITE.groupPhone;

  return (
    <header
      className="sticky top-0 z-40 text-white border-b border-white/10"
      // --color-ink bianco: rende bianca anche l'icona hamburger del
      // MobileMenu (text-[var(--color-ink)]).
      style={
        {
          backgroundColor: HEADER_GREEN,
          "--color-ink": "#ffffff",
          "--color-text": "#ffffff",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 h-20 md:h-24 flex items-center justify-between gap-4 lg:gap-6">
        {/* Logo in cornice, come nel mockup */}
        <Link
          href={`/${SLUG}`}
          aria-label="Hotel RossoVino Como — pagina principale"
          className="flex flex-col items-center border border-white/60 px-4 py-2.5 md:px-5 md:py-3 flex-shrink-0"
        >
          <Image
            src={assetSrc("/images/brand/logo-rossovino.png")}
            alt="Hotel RossoVino"
            width={159}
            height={24}
            priority
            className="h-3.5 md:h-4 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="mt-1.5 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.42em] text-white/75 leading-none">
            Como
          </span>
        </Link>

        {/* Nav maiuscola spaziata, centrata */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/85 hover:text-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Telefono + Prenota ora (outline) */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-5">
            {hasContact(phone) && (
              <a
                href={telHref(phone)}
                className="inline-flex items-center gap-2 font-mono text-[12px] tabular-nums text-white/85 hover:text-white transition-colors"
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
            <a
              href="#prenota"
              className="inline-flex items-center justify-center min-h-10 px-5 border border-white/70 text-white font-medium text-[12px] uppercase tracking-[0.14em] rounded-[2px] hover:bg-white hover:text-[#333D2A] transition-colors"
            >
              Prenota ora
            </a>
          </div>
          <MobileMenu property={SLUG} />
        </div>
      </div>
    </header>
  );
}
