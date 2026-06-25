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
import { MobileMenu } from "./MobileMenu";
import {
  PhoneIcon,
  WhatsappIcon,
  CalendarIcon,
  UsersIcon,
  ChevronIcon,
  ParkingIcon,
  WifiIcon,
  PriceTagIcon,
  ShieldCheckIcon,
} from "./icons";

/**
 * PROVA DI DESIGN — homepage "Italian Hospitality" del mockup cliente.
 * Responsive: desktop come il mockup desktop, mobile come il mockup mobile.
 * Palette crema + oro + bordeaux applicata in locale (solo questa pagina).
 *
 * Nota: la barra di prenotazione è quella provvisoria (in attesa di
 * Vertical Booking) — "Verifica disponibilità" porta alla scelta della
 * struttura. I link nav "La nostra storia / Offerte / Galleria" sono
 * placeholder finché le relative pagine non esistono.
 */

const GOLD = "#B0894E";
const BORDEAUX = "#6E1D2A";
const CREAM = "#F6F0E5";
const CREAM_2 = "#F1EADC";
const INK = "#2B2622";
const MUTED = "#6E665B";
const LINE = "rgba(43,38,34,.14)";

const CARD_TITLE: Record<PropertySlug, string[]> = {
  como: ["COMO"],
  "milano-boutique": ["MILANO", "BOUTIQUE"],
  milano: ["MILANO", "HOTEL"],
};
const CARD_TAGLINE: Record<PropertySlug, string> = {
  como: "Tranquillità e natura a pochi minuti dal centro.",
  "milano-boutique": "Design, charme e comfort nel cuore di Milano.",
  milano: "Comfort funzionale e servizi pensati per il tuo soggiorno.",
};
const CARD_IMG: Record<PropertySlug, string> = {
  como: "/images/como/hero-preview/1.jpg",
  "milano-boutique": "/images/boutique/hero/1.jpg",
  milano: "/images/milano/hero/1.jpg",
};
const REVIEWS: Record<PropertySlug, { score: string; label: string; count: string }> = {
  como: { score: "8,4", label: "Ottimo", count: "Basato su oltre 1.200 recensioni" },
  "milano-boutique": { score: "8,2", label: "Ottimo", count: "Basato su oltre 1.000 recensioni" },
  milano: { score: "7,8", label: "Molto buono", count: "Basato su oltre 800 recensioni" },
};

type Ico = (props: { className?: string; "aria-hidden"?: boolean }) => React.ReactElement;

const TRUST: { Icon: Ico; label: string }[] = [
  { Icon: ParkingIcon, label: "Parcheggio disponibile" },
  { Icon: WifiIcon, label: "Wi-Fi gratuito" },
  { Icon: PriceTagIcon, label: "Miglior tariffa garantita" },
  { Icon: ShieldCheckIcon, label: "Cancellazione flessibile" },
  { Icon: HeartIcon, label: "Ospitalità italiana" },
];

const NAV = [
  { label: "Como", href: "/como" },
  { label: "Milano Boutique", href: "/milano-boutique" },
  { label: "Milano Hotel", href: "/milano" },
  { label: "La nostra storia", href: "#" },
  { label: "Offerte", href: "#" },
  { label: "Galleria", href: "#" },
];

function Diamond({ className = "", light = false }: { className?: string; light?: boolean }) {
  const c = light ? "rgba(255,255,255,.85)" : GOLD;
  return (
    <span
      className={`relative inline-block rotate-45 ${className}`}
      style={{ width: 16, height: 16, border: `1px solid ${c}` }}
      aria-hidden
    >
      <span className="absolute" style={{ inset: 3, border: `1px solid ${c}` }} />
    </span>
  );
}

function BrandLockup({ size = "md" }: { size?: "sm" | "md" }) {
  const nameCls = size === "sm" ? "text-[20px]" : "text-[26px] md:text-[30px]";
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span
        className="relative rotate-45 mb-1.5"
        style={{ width: 12, height: 12, border: `1px solid ${INK}` }}
        aria-hidden
      >
        <span className="absolute" style={{ inset: 2.5, border: `1px solid ${INK}` }} />
      </span>
      <span className={`font-display font-semibold tracking-[0.16em] ${nameCls}`} style={{ color: INK }}>
        ROSSOVINO
      </span>
      <span className="mt-1 text-[8px] md:text-[9px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
        Italian Hospitality
      </span>
    </span>
  );
}

export function HomePreview() {
  const phone = SITE.groupPhone;
  const whatsapp = SITE.groupWhatsapp;

  return (
    <div style={{ backgroundColor: CREAM, color: INK }}>
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: CREAM, borderBottom: `1px solid ${LINE}` }}>
        <div className="relative mx-auto w-full max-w-[1280px] px-4 md:px-8 h-[68px] lg:h-24 flex items-center justify-between gap-4">
          {/* mobile hamburger */}
          <div className="lg:hidden" style={{ ["--color-ink" as string]: INK } as React.CSSProperties}>
            <MobileMenu />
          </div>

          {/* logo: centered on mobile, left on desktop */}
          <Link
            href="/"
            aria-label="Hotel RossoVino — home"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <BrandLockup />
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="text-[13px] uppercase tracking-[0.12em] hover:opacity-70 transition-opacity whitespace-nowrap"
                style={{ color: INK }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* right cluster */}
          <div className="flex items-center gap-3 lg:gap-4">
            {hasContact(phone) && (
              <a href={telHref(phone)} className="hidden lg:flex items-center gap-2 text-[14px]" style={{ color: INK }}>
                <PhoneIcon className="w-4 h-4" aria-hidden />
                {phone}
              </a>
            )}
            {hasContact(whatsapp) && (
              <a
                href={whatsappHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri WhatsApp"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-black/5"
                style={{ border: `1px solid ${LINE}`, color: INK }}
              >
                <WhatsappIcon className="w-[18px] h-[18px]" aria-hidden />
              </a>
            )}
            <span className="hidden lg:inline-flex items-center gap-1 text-[13px]" style={{ color: INK }}>
              IT <ChevronIcon className="w-3 h-3" aria-hidden />
            </span>
            <a
              href="#strutture"
              className="hidden sm:inline-flex items-center justify-center text-[12px] uppercase tracking-[0.14em] font-medium text-white rounded-[3px] px-5 py-3"
              style={{ backgroundColor: GOLD }}
            >
              Prenota ora
            </a>
          </div>
        </div>
      </header>

      {/* ============ BOOKING BAR ============ */}
      <div className="pt-5 md:pt-7">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div
            className="rounded-lg md:rounded-md p-2 md:p-3 md:flex md:items-stretch"
            style={{ backgroundColor: "#FBF8F2", border: `1px solid ${LINE}`, boxShadow: "0 10px 30px rgba(43,38,34,.06)" }}
          >
            {[
              { lab: "Check-in", val: "Data di arrivo", Icon: CalendarIcon, ph: true },
              { lab: "Check-out", val: "Data di partenza", Icon: CalendarIcon, ph: true },
              { lab: "Ospiti", val: "2 ospiti", Icon: UsersIcon, ph: false },
            ].map((f, i) => (
              <div
                key={f.lab}
                className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2.5"
                style={{ borderBottom: i < 2 ? `1px solid ${LINE}` : "none" }}
              >
                <f.Icon className="w-5 h-5 flex-shrink-0 text-[#9A763E]" aria-hidden />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>{f.lab}</div>
                  <div className="text-[15px] mt-0.5" style={{ color: f.ph ? "#9b9387" : INK }}>{f.val}</div>
                </div>
                <ChevronIcon className="w-3.5 h-3.5 ml-auto text-[#9b9387]" aria-hidden />
              </div>
            ))}
            <div className="p-2 md:pl-3 md:flex md:items-center">
              <a
                href="#strutture"
                className="flex items-center justify-center w-full md:w-auto text-[12px] uppercase tracking-[0.14em] font-medium text-white rounded-[4px] px-7 py-4"
                style={{ backgroundColor: BORDEAUX }}
              >
                Verifica disponibilità
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============ INTRO ============ */}
      <section className="text-center px-4 pt-9 md:pt-11 pb-7 md:pb-9">
        <Diamond className="mb-4 md:mb-5" />
        <h1 className="font-display font-medium uppercase tracking-[0.06em] md:tracking-[0.1em] leading-[1.05] text-[33px] md:text-[54px]" style={{ color: INK }}>
          Italian Hospitality
        </h1>
        <div className="font-display italic text-[25px] md:text-[34px] mt-1" style={{ color: GOLD }}>
          inspired by wine
        </div>
        <p className="text-[14.5px] md:text-base leading-[1.7] mt-4" style={{ color: MUTED }}>
          Tre strutture. Tre identità.
          <br />
          Un&apos;unica esperienza di ospitalità italiana.
        </p>
      </section>

      {/* ============ CARDS ============ */}
      <section id="strutture" className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        <div className="grid gap-4 md:gap-[18px] lg:grid-cols-3">
          {PROPERTY_ORDER.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="group relative block overflow-hidden rounded-[5px] h-[235px] lg:h-[330px]"
            >
              <Image
                src={assetSrc(CARD_IMG[slug])}
                alt={PROPERTIES[slug].fullName}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(20,16,14,.05) 28%, rgba(20,16,14,.8) 100%)" }}
                aria-hidden
              />
              <div className="absolute left-6 right-6 bottom-6 text-white">
                <Diamond light className="mb-3" />
                <h3 className="font-display font-medium leading-[1.05] text-[30px] lg:text-[34px]">
                  {CARD_TITLE[slug].map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </h3>
                <p className="text-[13.5px] md:text-sm text-white/90 mt-2 mb-4 leading-snug">
                  {CARD_TAGLINE[slug]}
                </p>
                <span className="inline-flex items-center justify-center text-[12px] uppercase tracking-[0.14em] font-medium text-white rounded-[3px] px-5 py-2.5 border border-white/80 group-hover:bg-white/10 transition-colors">
                  Scopri di più
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ TRUST BADGES ============ */}
      <section className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-7 md:py-8">
        <ul className="grid grid-cols-2 lg:flex lg:justify-center lg:items-center gap-y-5 gap-x-4">
          {TRUST.map(({ Icon, label }, i, arr) => (
            <li
              key={label}
              className={`flex items-center justify-center lg:justify-start gap-2.5 text-[13px] md:text-sm lg:px-7 ${
                i === arr.length - 1 ? "col-span-2 lg:col-span-1" : ""
              } ${i > 0 ? "lg:border-l" : ""}`}
              style={{ color: INK, borderColor: LINE }}
            >
              <Icon className="w-5 h-5 flex-shrink-0 text-[#9A763E]" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* ============ REVIEWS ============ */}
      <section style={{ backgroundColor: CREAM_2, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }} className="py-7 md:py-8">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div className="flex items-center justify-center gap-3 md:gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.24em] mb-5 md:mb-6" style={{ color: MUTED }}>
            <span className="h-px w-6 md:w-10" style={{ backgroundColor: LINE }} aria-hidden />
            Scelto ogni anno da migliaia di ospiti
            <span className="h-px w-6 md:w-10" style={{ backgroundColor: LINE }} aria-hidden />
          </div>
          <div className="grid lg:grid-cols-3">
            {PROPERTY_ORDER.map((slug, i) => {
              const r = REVIEWS[slug];
              return (
                <div
                  key={slug}
                  className={`flex items-center gap-4 py-3.5 md:py-1 lg:px-8 ${i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""}`}
                  style={{ borderColor: LINE }}
                >
                  <Image
                    src={assetSrc(`/images/${imageDir(slug)}/preview.jpg`)}
                    alt={PROPERTIES[slug].fullName}
                    width={60}
                    height={60}
                    className="w-[58px] h-[58px] rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="font-display text-[18px] tracking-[0.03em]" style={{ color: INK }}>
                      {CARD_TITLE[slug].join(" ")}
                    </div>
                    <div className="text-[12.5px]" style={{ color: "#3b5bbf" }}>Booking.com</div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <b className="font-display text-[22px] font-semibold" style={{ color: INK }}>{r.score}</b>
                      <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: MUTED }}>{r.label}</span>
                    </div>
                    <div className="text-[11.5px] mt-1" style={{ color: MUTED }}>{r.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <path d="M12 20s-7-4.3-7-9.3A4 4 0 0 1 12 7a4 4 0 0 1 7 3.7c0 5-7 9.3-7 9.3Z" />
    </svg>
  );
}
