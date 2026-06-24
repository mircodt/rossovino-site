import Image from "next/image";
import Link from "next/link";
import {
  PROPERTIES,
  PROPERTY_ORDER,
  SITE,
  type PropertySlug,
  hasContact,
  telHref,
  whatsappHref,
} from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { imageDir } from "@/lib/property-theme";

interface Props {
  /** Mantenuto per compatibilità con le chiamate esistenti. Il footer
   *  mostra comunque SEMPRE tutte e tre le strutture (richiesta cliente:
   *  "immagini di tutte e tre le strutture"). */
  property?: PropertySlug;
}

export function Footer({ property }: Props) {
  const year = new Date().getFullYear();
  void property; // tutte le strutture, sempre

  return (
    <footer className="bg-vinaccia-dark text-white mt-24 pb-24 lg:pb-12">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8 py-14">
        {/* Brand */}
        <div className="mb-12 max-w-md">
          <Image
            src={assetSrc("/images/brand/logo-rossovino.png")}
            alt="Hotel RossoVino"
            width={240}
            height={36}
            className="w-48 h-auto mb-4"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm text-white/80 leading-relaxed">
            Tre strutture, una sola anima: il vino italiano. Ospitalità autentica
            a Milano e Como.
          </p>
        </div>

        {/* Le tre strutture — ognuna con la sua immagine + contatti */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTY_ORDER.map((slug) => {
            const p = PROPERTIES[slug];
            return (
              <div key={slug}>
                <Link href={`/${slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] mb-4">
                    <Image
                      src={assetSrc(`/images/${imageDir(slug)}/preview.jpg`)}
                      alt={p.fullName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-display text-lg mb-3 group-hover:text-sabbia transition-colors">
                    {p.fullName}
                  </div>
                </Link>
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
                  <li className="text-white/80">
                    {p.address.streetAddress}
                    <br />
                    {p.address.postalCode} {p.address.addressLocality} ({p.address.addressRegion})
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
