import { PROPERTIES, type PropertySlug, telHref, whatsappHref } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { MailIcon, PhoneIcon, WhatsappIcon, BedIcon } from "./icons";

/** Final CTA block — repeats the four contact channels prominently. */
export function ContactBlock({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

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
          <a
            href="#prenota"
            className="flex items-center justify-center gap-2 min-h-14 px-5 bg-white text-vinaccia font-medium uppercase text-sm tracking-wide hover:bg-sabbia transition-colors rounded-[2px]"
          >
            <BedIcon className="w-5 h-5" aria-hidden />
            Verifica disponibilità
          </a>
          <a
            href={telHref(p.phone)}
            className="flex items-center justify-center gap-2 min-h-14 px-5 border border-white/60 text-white font-medium uppercase text-sm tracking-wide hover:bg-white hover:text-vinaccia transition-colors rounded-[2px]"
          >
            <PhoneIcon className="w-5 h-5" aria-hidden />
            Chiama ora
          </a>
          <a
            href={whatsappHref(p.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 min-h-14 px-5 border border-white/60 text-white font-medium uppercase text-sm tracking-wide hover:bg-white hover:text-vinaccia transition-colors rounded-[2px]"
          >
            <WhatsappIcon className="w-5 h-5" aria-hidden />
            WhatsApp
          </a>
          <a
            href={`mailto:${p.email}`}
            className="flex items-center justify-center gap-2 min-h-14 px-5 border border-white/60 text-white font-medium uppercase text-sm tracking-wide hover:bg-white hover:text-vinaccia transition-colors rounded-[2px]"
          >
            <MailIcon className="w-5 h-5" aria-hidden />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
