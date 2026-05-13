import {
  PROPERTIES,
  SITE,
  type PropertySlug,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { BedIcon, PhoneIcon, WhatsappIcon } from "./icons";

interface Props {
  /** When set, uses property-specific phone/whatsapp. Falls back to group. */
  property?: PropertySlug;
}

/** Bottom bar visible on mobile only — three big touch targets. */
export function StickyMobileBar({ property }: Props) {
  const p = property ? PROPERTIES[property] : null;
  const phone = p?.phone ?? SITE.groupPhone;
  const whatsapp = p?.whatsapp ?? SITE.groupWhatsapp;
  const bookingAnchor = p ? `/${p.slug}#prenota` : "/#prenota";

  return (
    <div
      role="navigation"
      aria-label="Azioni rapide"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)] safe-bottom border-t border-[color:var(--color-border)]"
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref(phone)}
          className="flex flex-col items-center justify-center gap-1 py-3 min-h-14 text-vinaccia font-medium text-xs uppercase tracking-wide hover:bg-sabbia-light transition-colors"
          aria-label={`Chiama ${p ? p.shortName : "RossoVino"}`}
        >
          <PhoneIcon className="w-5 h-5" aria-hidden />
          Chiama
        </a>
        <a
          href={whatsappHref(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 min-h-14 text-verde-dark font-medium text-xs uppercase tracking-wide hover:bg-sabbia-light transition-colors border-x border-[color:var(--color-border)]"
          aria-label="Apri WhatsApp"
        >
          <WhatsappIcon className="w-5 h-5" aria-hidden />
          WhatsApp
        </a>
        <a
          href={bookingAnchor}
          className="flex flex-col items-center justify-center gap-1 py-3 min-h-14 bg-vinaccia text-white font-medium text-xs uppercase tracking-wide hover:bg-vinaccia-hover transition-colors"
          aria-label="Prenota una camera"
        >
          <BedIcon className="w-5 h-5" aria-hidden />
          Prenota
        </a>
      </div>
    </div>
  );
}
