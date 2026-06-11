import Image from "next/image";
import Link from "next/link";
import { PROPERTIES } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
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
  ChevronIcon,
} from "./icons";

/**
 * PROVA DI DESIGN — pagina /como ridisegnata sul mockup "verde foresta +
 * crema" inviato dal cliente. Isolata: usata SOLO da app/como/page.tsx.
 * Boutique e Milano continuano a usare PropertyPageContent.
 *
 * Revisione 3 (mockup scuro):
 *  - Tema: fondo crema, header/footer e accenti in verde foresta. I token
 *    vinaccia/verde sono sovrascritti in app/como/page.tsx, quindi i
 *    componenti condivisi (Button, BookingWidget, Footer) diventano verdi
 *    senza modifiche.
 *  - Hero: titolo COMO maiuscolo, sottotitolo su "chip" scuri, CTA outline.
 *  - Booking bar crema sovrapposta all'hero + fascia badge sotto, su crema.
 *  - Sezioni a card crema bordate; titoli serif maiuscoli con filetti.
 *  - Terrazza: foto a sinistra + pannello verde scuro con testo bianco.
 *  - CTA finale rimossa: il mockup chiude con "Perché scegliere" + footer.
 *
 * Testi e fotografie INVARIATI rispetto alla revisione precedente
 * (l'hotel è nel verde, non sul lago — copy onesto mantenuto).
 */

const SLUG = "como" as const;

/** Verde profondo per header/footer/pannelli (= --c-vinaccia-dark). */
const GREEN_DEEP = "#333D2A";
/** Superficie delle card, leggermente più chiara del fondo pagina. */
const CARD_BG = "#FAF7EB";
/** Bordo sottile delle card e dei filetti. */
const HAIRLINE = "rgba(61, 73, 49, 0.18)";

/** Hero: la foto del verde scattata sul retro dell'hotel (invariata). */
const HERO_IMG = "/images/como/hero-preview/1.jpg";

/** Badge di fiducia sotto la booking bar. La reception mostra SOLO gli
 *  orari (senza la parola "Reception"), come da feedback cliente. */
const TRUST_BADGES = [
  { Icon: ClockIcon, title: "8:00 – 24:00", detail: "" },
  { Icon: ParkingIcon, title: "Parcheggio", detail: "privato" },
  { Icon: WifiIcon, title: "Wi-Fi", detail: "gratuito" },
  { Icon: PriceTagIcon, title: "Miglior tariffa", detail: "garantita" },
  { Icon: ShieldCheckIcon, title: "Cancellazione", detail: "flessibile" },
];

/** Camere in evidenza — 3 tipologie reali di Como. I prezzi sono
 *  PLACEHOLDER (REPLACE con i prezzi reali del cliente). */
const FEATURED_ROOMS = [
  {
    name: "Camera Matrimoniale",
    subtitle: "Vista verde",
    priceFrom: "—",
    photo: "/images/como/rooms/matrimoniale/01.jpg",
  },
  {
    name: "Camera Superior",
    subtitle: "Vista montagne",
    priceFrom: "—",
    photo: "/images/como/rooms/superior/01.jpg",
  },
  {
    name: "Suite",
    subtitle: "con zona giorno",
    priceFrom: "—",
    photo: "/images/como/rooms/suite/02.jpg",
  },
];

/** "Perché scegliere Como" — 4 colonne con icona (mockup). */
const WHY_CHOOSE = [
  { Icon: MapPinIcon, label: "A pochi minuti dal centro di Como" },
  { Icon: LeafIcon, label: "Ambiente tranquillo e riservato" },
  { Icon: SunIcon, label: "Terrazze panoramiche nel verde" },
  { Icon: ParkingIcon, label: "Parcheggio privato dedicato" },
];

/** Titolo di sezione del mockup: serif, maiuscolo, centrato, con filetti
 *  orizzontali ai lati. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <span
        className="hidden sm:block h-px w-10 md:w-14 flex-shrink-0"
        style={{ backgroundColor: HAIRLINE }}
        aria-hidden
      />
      <h2 className="font-display uppercase tracking-[0.14em] text-center text-[22px] md:text-[28px] leading-snug text-vinaccia-dark [text-wrap:balance]">
        {children}
      </h2>
      <span
        className="hidden sm:block h-px w-10 md:w-14 flex-shrink-0"
        style={{ backgroundColor: HAIRLINE }}
        aria-hidden
      />
    </div>
  );
}

export function ComoLandingPreview() {
  const p = PROPERTIES[SLUG];

  return (
    <>
      {/* 1 · HERO — immagine fissa, titolo COMO maiuscolo, chip scuri */}
      <section className="relative">
        <div className="relative h-[80svh] min-h-[560px] max-h-[860px] overflow-hidden">
          <Image
            src={assetSrc(HERO_IMG)}
            alt={`${p.fullName} — vista sul verde dal retro dell'hotel`}
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
                "linear-gradient(90deg, rgba(20,24,15,0.65) 0%, rgba(20,24,15,0.35) 45%, rgba(20,24,15,0.05) 75%, rgba(20,24,15,0) 100%)",
            }}
          />

          <div className="relative z-10 h-full mx-auto w-full max-w-[1280px] px-5 md:px-8 flex flex-col justify-center pb-28 md:pb-32">
            <div className="max-w-xl text-white">
              <h1
                className="font-display font-semibold uppercase tracking-[0.02em] leading-[0.95] text-6xl md:text-7xl lg:text-[96px] mb-6 text-white"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
              >
                Como
              </h1>
              {/* Sottotitolo su chip scuri (una per riga, come nel mockup) */}
              <p className="text-lg md:text-xl leading-[1.9] max-w-md mb-9">
                <span
                  className="inline px-3 py-1.5 text-white/95 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
                  style={{ backgroundColor: "rgba(31, 38, 23, 0.82)" }}
                >
                  Tranquillità e natura, a pochi minuti dal centro.
                </span>
              </p>
              <Button href="#oasi" variant="outline-on-dark">
                Scopri di più
              </Button>
            </div>
          </div>
        </div>

        {/* 2 · BOOKING BAR — card crema sovrapposta all'hero */}
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div
            className="relative z-20 -mt-12 md:-mt-16 rounded-[6px] shadow-xl px-5 md:px-8 py-4 md:py-5"
            style={{ backgroundColor: "#FCFAF3", border: `1px solid ${HAIRLINE}` }}
          >
            <BookingWidget property={SLUG} variant="compact" />
          </div>
        </div>
      </section>

      {/* 3 · TRUST BADGES — fascia su crema sotto la booking bar (mockup):
            icona a sinistra, testo su due righe a destra. */}
      <section
        className="py-7 md:py-8"
        style={{ borderBottom: `1px solid ${HAIRLINE}` }}
      >
        <div className="mx-auto w-full max-w-[1160px] px-5 md:px-8">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 md:gap-x-6">
            {TRUST_BADGES.map(({ Icon, title, detail }, i) => (
              <li
                key={title}
                className={`flex items-center justify-center gap-3 ${
                  i === TRUST_BADGES.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <Icon
                  className="w-6 h-6 flex-shrink-0 text-vinaccia"
                  aria-hidden
                />
                <div className="leading-tight">
                  <p className="font-medium text-sm text-[var(--color-ink)] tabular-nums">
                    {title}
                  </p>
                  {detail && (
                    <p className="text-xs text-[var(--color-ink)]/65">
                      {detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · OASI — card crema bordata: testo a sinistra + foto a destra */}
      <section id="oasi" className="py-14 md:py-20">
        <Container>
          <div
            className="grid lg:grid-cols-2 overflow-hidden rounded-[4px]"
            style={{ backgroundColor: CARD_BG, border: `1px solid ${HAIRLINE}` }}
          >
            <div className="p-8 md:p-12 lg:p-14 flex flex-col items-start justify-center">
              <h2 className="font-display uppercase tracking-[0.12em] text-[22px] md:text-[28px] leading-snug text-vinaccia-dark mb-6 [text-wrap:balance]">
                La tua oasi immersa nel verde
              </h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
                Un hotel accogliente e riservato, immerso in una delle aree più
                verdi di Como. Ideale per chi cerca relax, natura e
                un&apos;ospitalità autentica, lontano dal turismo di massa.
              </p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
                Confiniamo con il parco di Villa Giovio e siamo a circa 10 minuti
                in auto o autobus dal centro storico — la fermata è proprio
                davanti all&apos;hotel.
              </p>
              <Button href={`/${SLUG}/camere`} variant="primary">
                Scopri le camere
              </Button>
            </div>
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[440px]">
              <Image
                src={assetSrc("/images/como/rooms/suite/01.jpg")}
                alt="Una camera dell'Hotel RossoVino Como"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 5 · LE NOSTRE CAMERE — titolo centrato con filetti + 3 card crema */}
      <section className="pb-14 md:pb-20">
        <Container>
          <div className="relative mb-10 md:mb-12">
            <SectionTitle>Le nostre camere</SectionTitle>
            <Link
              href={`/${SLUG}/camere`}
              className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-4 lg:mt-0 mx-auto lg:mx-0 w-fit flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-vinaccia hover:gap-2.5 transition-all"
            >
              Vedi tutte
              <ChevronIcon className="w-4 h-4 -rotate-90" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_ROOMS.map((room) => (
              <li
                key={room.name}
                className="group overflow-hidden rounded-[4px]"
                style={{ backgroundColor: CARD_BG, border: `1px solid ${HAIRLINE}` }}
              >
                <Link href={`/${SLUG}/camere`} className="block">
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
                    <h3 className="font-display text-xl text-[var(--color-ink)] leading-tight">
                      {room.name}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                      {room.subtitle}
                    </p>
                    <p className="mt-2.5 text-sm font-medium text-vinaccia tracking-wide">
                      da € {room.priceFrom}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6 · TERRAZZE — foto a sinistra + pannello verde scuro a destra */}
      <section className="pb-14 md:pb-20">
        <Container>
          <div className="grid lg:grid-cols-[1.15fr_1fr] overflow-hidden rounded-[4px] shadow-lg">
            <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[480px]">
              <Image
                src={assetSrc("/images/como/terrazza.jpg")}
                alt="Le terrazze esterne dell'Hotel RossoVino Como, immerse nel verde"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div
              className="p-8 md:p-12 lg:p-14 flex flex-col items-start justify-center text-white"
              style={{ backgroundColor: GREEN_DEEP }}
            >
              <h2 className="font-display uppercase tracking-[0.12em] text-[22px] md:text-[28px] leading-snug text-white mb-6 [text-wrap:balance]">
                Le nostre terrazze nel verde
              </h2>
              <p className="text-white/85 leading-relaxed mb-8">
                Inizia la giornata con una colazione self-service sulle nostre
                terrazze esterne, immerse nel verde e con vista sulle montagne
                comasche. Lasciati accompagnare dal silenzio della natura.
              </p>
              <Button href={`/${SLUG}/servizi`} variant="outline-on-dark">
                Scopri i servizi
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 7 · PERCHÉ SCEGLIERE COMO — su crema, icone semplici (mockup) */}
      <section
        className="py-14 md:py-20"
        style={{ borderTop: `1px solid ${HAIRLINE}` }}
      >
        <Container>
          <SectionTitle>Perché scegliere Como</SectionTitle>
          <ul className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-12">
            {WHY_CHOOSE.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center text-center gap-4"
              >
                <Icon className="w-9 h-9 text-vinaccia" aria-hidden />
                <p className="text-sm text-[var(--color-ink)] leading-snug max-w-[200px]">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
