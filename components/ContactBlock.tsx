import {
  PROPERTIES,
  type PropertyConfig,
  type PropertySlug,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { MailIcon, PhoneIcon, WhatsappIcon, BedIcon } from "./icons";

/** Section background — accent-dark per property so white text stays
 *  legible. Boutique keeps vinaccia (already dark); Milano and Como
 *  use the dark variant of their accent. */
const sectionBgClass: Record<PropertyConfig["accent"], string> = {
  vinaccia: "bg-vinaccia",
  blu: "bg-blu-dark",
  verde: "bg-verde-dark",
};

/** Text color used on white buttons — the property accent, in its
 *  most readable shade. */
const accentTextOnWhite: Record<PropertyConfig["accent"], string> = {
  vinaccia: "text-vinaccia",
  blu: "text-blu-dark",
  verde: "text-verde-dark",
};

/** Final CTA block — section background follows the property accent
 *  (verde for Como, blu for Milano, vinaccia for Boutique). All four
 *  CTA buttons are solid white with text in the accent color, so they
 *  stand out evenly on the colored backdrop. */
export function ContactBlock({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  const ctaClass =
    `flex items-center justify-center gap-2 min-h-14 px-5 bg-white ${accentTextOnWhite[p.accent]} ` +
    "font-medium uppercase text-sm tracking-wide hover:bg-sabbia transition-colors rounded-[2px] shadow-md " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2";

  const cells: React.ReactNode[] = [
    <a key="book" href="#prenota" className={ctaClass}>
      <BedIcon className="w-5 h-5" aria-hidden />
      Verifica disponibilità
    </a>,
  ];
  if (hasContact(p.phone)) {
    cells.push(
      <a key="phone" href={telHref(p.phone)} className={ctaClass}>
        <PhoneIcon className="w-5 h-5" aria-hidden />
        Chiama ora
      </a>,
    );
  }
  if (hasContact(p.whatsapp)) {
    cells.push(
      <a
        key="wa"
        href={whatsappHref(p.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className={ctaClass}
      >
        <WhatsappIcon className="w-5 h-5" aria-hidden />
        WhatsApp
      </a>,
    );
  }
  if (hasContact(p.email)) {
    cells.push(
      <a key="mail" href={`mailto:${p.email}`} className={ctaClass}>
        <MailIcon className="w-5 h-5" aria-hidden />
        Email
      </a>,
    );
  }

  return (
    <section className={`${sectionBgClass[p.accent]} text-white py-16 md:py-24`}>
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 text-center">
        <h2 className="font-display text-white mb-3 [text-wrap:balance]">
          {c.ctaFinal.title}
        </h2>
        <p className="max-w-2xl mx-auto text-white/90 mb-8 text-lg leading-relaxed">
          {c.ctaFinal.body}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {cells}
        </div>
      </div>
    </section>
  );
}
