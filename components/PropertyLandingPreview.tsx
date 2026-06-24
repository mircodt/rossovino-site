import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, type PropertySlug } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { PROPERTY_PALETTE } from "@/lib/property-theme";
import { Container } from "./Container";
import { BookingWidget } from "./BookingWidget";
import { Button } from "./Button";
import {
  ClockIcon,
  ParkingIcon,
  WifiIcon,
  PriceTagIcon,
  ShieldCheckIcon,
  MapPinIcon,
  LeafIcon,
  SunIcon,
  StarIcon,
  WineGlassIcon,
  CheckIcon,
  ChevronIcon,
} from "./icons";

type IconComponent = (props: {
  className?: string;
  "aria-hidden"?: boolean;
}) => React.ReactElement;

/**
 * PROVA DI DESIGN — landing generalizzata per le tre strutture, sul
 * modello del mockup cliente. Stessa impaginazione per tutte; colore e
 * contenuti cambiano in base allo `slug`. Il colore è gestito dal tema
 * applicato dal wrapper della pagina (vedi lib/property-theme.ts).
 *
 * Testi/foto ripresi dal mockup e da lib/content.ts. I prezzi delle
 * camere restano placeholder ("—") finché il cliente fornisce i dati
 * definitivi (come da riunione).
 */

interface Props {
  slug: PropertySlug;
}

type FeaturedRoom = { name: string; subtitle: string; photo: string };
type WhyItem = { Icon: IconComponent; label: string };

interface LandingContent {
  heroImg: string;
  heroTitle: string[];
  heroSubtitle: string;
  reception: string;
  oasiTitle: string;
  oasiBody: string[];
  oasiImg: string;
  rooms: FeaturedRoom[];
  featureTitle: string;
  featureEyebrow: string;
  featureBody: string;
  featureImg: string;
  whyTitle: string;
  why: WhyItem[];
}

const CONTENT: Record<PropertySlug, LandingContent> = {
  como: {
    heroImg: "/images/como/hero-preview/1.jpg",
    heroTitle: ["Como"],
    heroSubtitle: "Tranquillità e natura, a pochi minuti dal centro.",
    reception: "8:00 – 24:00",
    oasiTitle: "La tua oasi immersa nel verde",
    oasiBody: [
      "Un hotel accogliente e riservato, immerso in una delle aree più verdi di Como. Ideale per chi cerca relax, natura e un'ospitalità autentica, lontano dal turismo di massa.",
      "Confiniamo con il parco di Villa Giovio e siamo a circa 10 minuti in auto o autobus dal centro storico — la fermata è proprio davanti all'hotel.",
    ],
    oasiImg: "/images/como/rooms/suite/01.jpg",
    rooms: [
      { name: "Camera Matrimoniale", subtitle: "Vista verde", photo: "/images/como/rooms/matrimoniale/01.jpg" },
      { name: "Camera Superior", subtitle: "Vista montagne", photo: "/images/como/rooms/superior/01.jpg" },
      { name: "Suite", subtitle: "con zona giorno", photo: "/images/como/rooms/suite/02.jpg" },
    ],
    featureEyebrow: "Colazione & relax",
    featureTitle: "Le nostre terrazze nel verde",
    featureBody:
      "Inizia la giornata con una colazione self-service sulle nostre terrazze esterne, immerse nel verde e con vista sulle montagne comasche. Lasciati accompagnare dal silenzio della natura.",
    featureImg: "/images/como/terrazza.jpg",
    whyTitle: "Perché scegliere Como",
    why: [
      { Icon: MapPinIcon, label: "A pochi minuti dal centro di Como" },
      { Icon: LeafIcon, label: "Ambiente tranquillo e riservato" },
      { Icon: SunIcon, label: "Terrazze panoramiche nel verde" },
      { Icon: ParkingIcon, label: "Parcheggio privato dedicato" },
    ],
  },
  "milano-boutique": {
    heroImg: "/images/boutique/hero/1.jpg",
    heroTitle: ["Milano", "Boutique"],
    heroSubtitle: "Design, charme e comfort nel cuore di Milano.",
    reception: "9:00 – 23:00",
    oasiTitle: "Boutique experience a Milano",
    oasiBody: [
      "Una struttura intima e di design, dove ogni dettaglio è pensato per offrirti un soggiorno esclusivo e autentico.",
      "Boutique RossoVino occupa una storica villa di fine Ottocento della famiglia Biffi: storia, design e ospitalità contemporanea convivono in un'unica identità riconoscibile.",
    ],
    oasiImg: "/images/boutique/rooms/matrimoniale-superior/02.jpg",
    rooms: [
      { name: "Camera Boutique", subtitle: "design e comfort", photo: "/images/boutique/rooms/matrimoniale-superior/01.jpg" },
      { name: "Suite Design", subtitle: "con vasca freestanding", photo: "/images/boutique/rooms/suite-vasca/01.jpg" },
      { name: "Junior Suite", subtitle: "spazio e relax", photo: "/images/boutique/rooms/twin-superior/02.jpg" },
    ],
    featureEyebrow: "Spazi & atmosfera",
    featureTitle: "Atmosfere esclusive",
    featureBody:
      "Spazi eleganti e ricercati, dove design contemporaneo e calore italiano si incontrano. Lasciati avvolgere dall'atmosfera unica della villa Biffi.",
    featureImg: "/images/boutique/atmosfera-1.jpg",
    whyTitle: "Perché scegliere Milano Boutique",
    why: [
      { Icon: StarIcon, label: "Design esclusivo e curato" },
      { Icon: MapPinIcon, label: "Posizione strategica in città" },
      { Icon: WineGlassIcon, label: "Esperienza intima e personalizzata" },
      { Icon: ParkingIcon, label: "Soluzioni parcheggio dedicate" },
    ],
  },
  milano: {
    heroImg: "/images/milano/hero/1.jpg",
    heroTitle: ["Milano", "Hotel"],
    heroSubtitle: "Comfort funzionale e servizi pensati per il tuo soggiorno.",
    reception: "9:00 – 23:00",
    oasiTitle: "Il tuo hotel a Milano",
    oasiBody: [
      "Camere confortevoli e servizi essenziali per un soggiorno pratico e piacevole, a due passi dal centro.",
      "Un hotel dal carattere riconoscibile, ispirato al mondo del vino italiano, pensato per chi vuole vivere Milano senza pensieri.",
    ],
    oasiImg: "/images/milano/rooms/matrimoniale-privato/02.jpg",
    rooms: [
      { name: "Camera Standard", subtitle: "comfort essenziale", photo: "/images/milano/rooms/matrimoniale-privato/01.jpg" },
      { name: "Camera Superior", subtitle: "più spazio", photo: "/images/milano/rooms/twin/01.jpeg" },
      { name: "Camera Tripla", subtitle: "per famiglie", photo: "/images/milano/rooms/tripla/01.jpeg" },
    ],
    featureEyebrow: "Colazione",
    featureTitle: "Inizia bene la giornata",
    featureBody:
      "Colazione a buffet con prodotti selezionati per partire al meglio ogni giorno, prima di immergerti nella città.",
    featureImg: "/images/milano/atmosfera-1.jpg",
    whyTitle: "Perché scegliere Milano Hotel",
    why: [
      { Icon: PriceTagIcon, label: "Ottimo rapporto qualità-prezzo" },
      { Icon: MapPinIcon, label: "Vicino al centro e ai trasporti" },
      { Icon: CheckIcon, label: "Servizi pratici e funzionali" },
      { Icon: ParkingIcon, label: "Soluzioni parcheggio dedicate" },
    ],
  },
};

/** Titolo di sezione: serif, maiuscolo, centrato, con filetti laterali. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <span className="hidden sm:block h-px w-10 md:w-14 flex-shrink-0 bg-[color:var(--c-vinaccia)]/25" aria-hidden />
      <h2 className="font-display uppercase tracking-[0.14em] text-center text-[22px] md:text-[28px] leading-snug text-vinaccia-dark [text-wrap:balance]">
        {children}
      </h2>
      <span className="hidden sm:block h-px w-10 md:w-14 flex-shrink-0 bg-[color:var(--c-vinaccia)]/25" aria-hidden />
    </div>
  );
}

export function PropertyLandingPreview({ slug }: Props) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];
  const pal = PROPERTY_PALETTE[slug];

  const trustBadges = [
    { Icon: ClockIcon, title: c.reception, detail: "" },
    { Icon: ParkingIcon, title: "Parcheggio", detail: "privato" },
    { Icon: WifiIcon, title: "Wi-Fi", detail: "gratuito" },
    { Icon: PriceTagIcon, title: "Miglior tariffa", detail: "garantita" },
    { Icon: ShieldCheckIcon, title: "Cancellazione", detail: "flessibile" },
  ];

  return (
    <>
      {/* 1 · HERO */}
      <section className="relative">
        <div className="relative h-[80svh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={assetSrc(c.heroImg)}
            alt={`${p.fullName} — immagine principale`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, rgba(15,15,15,0.65) 0%, rgba(15,15,15,0.35) 45%, rgba(15,15,15,0.05) 75%, rgba(15,15,15,0) 100%)",
            }}
          />
          <div className="relative z-10 h-full mx-auto w-full max-w-[1280px] px-5 md:px-8 flex flex-col justify-center pb-28 md:pb-32">
            <div className="max-w-xl text-white">
              <h1
                className="font-display font-semibold uppercase tracking-[0.02em] leading-[0.95] text-5xl md:text-7xl lg:text-[88px] mb-6 text-white"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
              >
                {c.heroTitle.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl leading-[1.9] max-w-md mb-9">
                <span
                  className="inline px-3 py-1.5 text-white/95 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
                  style={{ backgroundColor: "rgba(20, 20, 20, 0.78)" }}
                >
                  {c.heroSubtitle}
                </span>
              </p>
              <Button href="#oasi" variant="outline-on-dark">
                Scopri di più
              </Button>
            </div>
          </div>
        </div>

        {/* 2 · BOOKING BAR */}
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div
            className="relative z-20 -mt-12 md:-mt-16 rounded-[6px] shadow-xl px-5 md:px-8 py-4 md:py-5"
            style={{ backgroundColor: "#FCFAF3", border: `1px solid ${pal.hairline}` }}
          >
            <BookingWidget property={slug} variant="compact" />
          </div>
        </div>
      </section>

      {/* 3 · TRUST BADGES */}
      <section className="py-7 md:py-8" style={{ borderBottom: `1px solid ${pal.hairline}` }}>
        <div className="mx-auto w-full max-w-[1160px] px-5 md:px-8">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 md:gap-x-6">
            {trustBadges.map(({ Icon, title, detail }, i) => (
              <li
                key={title}
                className={`flex items-center justify-center gap-3 ${
                  i === trustBadges.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0 text-vinaccia" aria-hidden />
                <div className="leading-tight">
                  <p className="font-medium text-sm text-[var(--color-ink)] tabular-nums">{title}</p>
                  {detail && <p className="text-xs text-[var(--color-ink)]/65">{detail}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · OASI / EXPERIENCE / HOTEL */}
      <section id="oasi" className="py-14 md:py-20">
        <Container>
          <div
            className="grid lg:grid-cols-2 overflow-hidden rounded-[4px]"
            style={{ backgroundColor: pal.card, border: `1px solid ${pal.hairline}` }}
          >
            <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start justify-center">
              <h2 className="font-display uppercase tracking-[0.12em] text-[22px] md:text-[28px] leading-snug text-vinaccia-dark mb-6 [text-wrap:balance]">
                {c.oasiTitle}
              </h2>
              {c.oasiBody.map((para, i) => (
                <p
                  key={i}
                  className={`text-[var(--color-ink-soft)] leading-relaxed ${
                    i === c.oasiBody.length - 1 ? "mb-8" : "mb-4"
                  }`}
                >
                  {para}
                </p>
              ))}
              <Button href={`/${slug}/camere`} variant="primary">
                Scopri le camere
              </Button>
            </div>
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[440px]">
              <Image
                src={assetSrc(c.oasiImg)}
                alt={`Una camera di ${p.fullName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 5 · LE NOSTRE CAMERE */}
      <section className="pb-14 md:pb-20">
        <Container>
          <div className="relative mb-10 md:mb-12">
            <SectionTitle>Le nostre camere</SectionTitle>
            <Link
              href={`/${slug}/camere`}
              className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-4 lg:mt-0 mx-auto lg:mx-0 w-fit flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-vinaccia hover:gap-2.5 transition-all"
            >
              Vedi tutte
              <ChevronIcon className="w-4 h-4 -rotate-90" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.rooms.map((room) => (
              <li
                key={room.name}
                className="group overflow-hidden rounded-[4px]"
                style={{ backgroundColor: pal.card, border: `1px solid ${pal.hairline}` }}
              >
                <Link href={`/${slug}/camere`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={assetSrc(room.photo)}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="py-5 px-4 text-center">
                    <h3 className="font-display text-xl text-[var(--color-ink)] leading-tight">{room.name}</h3>
                    <p className="text-sm text-[var(--color-ink-soft)] mt-1">{room.subtitle}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6 · FEATURE (terrazza / atmosfere / colazione) */}
      <section className="pb-14 md:pb-20">
        <Container>
          <div className="grid lg:grid-cols-[1.15fr_1fr] overflow-hidden rounded-[4px] shadow-lg">
            <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[480px]">
              <Image
                src={assetSrc(c.featureImg)}
                alt={`${c.featureTitle} — ${p.fullName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div
              className="p-8 md:p-12 lg:p-14 flex flex-col items-start justify-center text-white"
              style={{ backgroundColor: pal.deep }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 mb-4">
                {c.featureEyebrow}
              </p>
              <h2 className="font-display uppercase tracking-[0.12em] text-[22px] md:text-[28px] leading-snug text-white mb-6 [text-wrap:balance]">
                {c.featureTitle}
              </h2>
              <p className="text-white/85 leading-relaxed mb-8">{c.featureBody}</p>
              <Button href={`/${slug}/servizi`} variant="outline-on-dark">
                Scopri i servizi
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 7 · PERCHÉ SCEGLIERE … */}
      <section className="py-14 md:py-20" style={{ borderTop: `1px solid ${pal.hairline}` }}>
        <Container>
          <SectionTitle>{c.whyTitle}</SectionTitle>
          <ul className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-12">
            {c.why.map(({ Icon, label }) => (
              <li key={label} className="flex flex-col items-center text-center gap-4">
                <Icon className="w-9 h-9 text-vinaccia" aria-hidden />
                <p className="text-sm text-[var(--color-ink)] leading-snug max-w-[200px]">{label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
