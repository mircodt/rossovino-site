import Image from "next/image";
import Link from "next/link";
import {
  PROPERTIES,
  PROPERTY_ORDER,
  SITE,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { assetSrc } from "@/lib/asset";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-vinaccia-dark text-white mt-24 pb-24 lg:pb-12">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            {/* Brand logo — recolored, here rendered against the dark vinaccia
                footer bg so we invert/whitened via CSS for legibility. */}
            <Image
              src={assetSrc("/images/brand/logo-rossovino.png")}
              alt="Hotel RossoVino"
              width={220}
              height={33}
              className="w-44 h-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm text-white/80 leading-relaxed max-w-xs">
              Gruppo Hotel RossoVino — tre proprietà a Milano e Como, ispirate al mondo del
              vino italiano.
            </p>
          </div>

          {PROPERTY_ORDER.map((slug) => {
            const p = PROPERTIES[slug];
            return (
              <div key={slug}>
                <div className="font-display text-lg mb-3">{p.fullName}</div>
                <ul className="space-y-2 text-sm text-white/85">
                  {hasContact(p.phone) && (
                    <li>
                      <a
                        href={telHref(p.phone)}
                        className="hover:text-sabbia transition-colors font-mono tabular-nums"
                      >
                        {p.phone}
                      </a>
                    </li>
                  )}
                  {hasContact(p.whatsapp) && (
                    <li>
                      <a
                        href={whatsappHref(p.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sabbia transition-colors"
                      >
                        WhatsApp
                      </a>
                    </li>
                  )}
                  {hasContact(p.email) && (
                    <li>
                      <a
                        href={`mailto:${p.email}`}
                        className="hover:text-sabbia transition-colors break-all"
                      >
                        {p.email}
                      </a>
                    </li>
                  )}
                  <li>
                    <Link
                      href={`/${slug}`}
                      className="hover:text-sabbia transition-colors underline-offset-2 hover:underline"
                    >
                      Scopri la struttura →
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <hr className="my-10 border-white/15" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-white/65">
          <p>
            © {year} {SITE.legalName}. Tutti i diritti riservati.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contatti" className="hover:text-white">Contatti</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/cookie" className="hover:text-white">Cookie</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
