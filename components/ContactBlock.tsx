import {
  PROPERTIES,
  type PropertySlug,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { MailIcon, PhoneIcon, WhatsappIcon, BedIcon } from "./icons";

const ctaClass =
  "flex items-center justify-center gap-2 min-h-14 px-5 border border-white/60 text-white font-medium uppercase text-sm tracking-wide hover:bg-white hover:text-vinaccia transition-colors rounded-[2px]";

/** Final CTA block — only renders contact channels that look real, so we
 *  never expose `tel:` / `mailto:` / `wa.me/` links pointing at placeholder
 *  values. The "Verifica disponibilità" button always renders. */
export function ContactBlock({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  const cells: React.ReactNode[] = [
    <a key="book" href="#prenota" className={`${ctaClass} bg-white text-vinaccia border-transparent`}>
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
    <section className="bg-vinaccia text-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 text-center">
        <h2 className="font-display text-white mb-3 [text-wrap:balance]">
          {c.ctaFinal.title}
        </h2>
        <p className="max-w-2xl mx-auto text-white/85 mb-8 text-lg leading-relaxed">
          {c.ctaFinal.body}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {cells}
        </div>
      </div>
    </section>
  );
}
