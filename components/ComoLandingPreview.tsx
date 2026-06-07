import Image from "next/image";
import Link from "next/link";
import { PROPERTIES } from "@/lib/config";
import { assetSrc } from "@/lib/asset";
import { Container } from "./Container";
import { BookingWidget } from "./BookingWidget";
import { Button } from "./Button";
import { HeroSlideshow } from "./HeroSlideshow";
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
 * PROVA DI DESIGN — pagina /como ridisegnata per imitare la struttura del
 * mockup inviato dal cliente (hero città + booking bar, badge fiducia,
 * sezione "oasi", carosello camere, sezione terrazza, "perché scegliere").
 *
 * Isolata: usata SOLO da app/como/page.tsx. Boutique e Milano continuano a
 * usare il componente condiviso PropertyPageContent.
 *
 * Nota di onestà: il mockup parlava di "vista lago / sul lago di Como", ma
 * l'hotel è a Como NON sul lago. Tutti i riferimenti al lago sono stati
 * adattati a "verde / montagne comasche" per non creare false aspettative.
 */

const SLUG = "como" as const;

/** Foto hero della prova — 3 immagini scelte dal cliente:
 *  1) balcone con vista sul verde, 2) suite (parete blu, testata rossa),
 *  3) corridoio con i poster "pasta e vino". Cross-fade via HeroSlideshow. */
const HERO_SLIDES = [
  "/images/como/hero-preview/1.jpg",
  "/images/como/hero-preview/2.jpg",
  "/images/como/hero-preview/3.jpg",
];

/** Badge di fiducia sotto la booking bar (5 voci come nel mockup). */
const TRUST_BADGES = [
  { Icon: ClockIcon, title: "Reception", detail: "8:00 – 24:00" },
  { Icon: ParkingIcon, title: "Parcheggio", detail: "privato disponibile" },
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
    priceFrom: "—", // REPLACE: prezzo reale "da € XX"
    photo: "/images/como/rooms/matrimoniale/01.jpg",
  },
  {
    name: "Camera Superior",
    subtitle: "Vista montagne",
    priceFrom: "—", // REPLACE: prezzo reale "da € XX"
    photo: "/images/como/rooms/superior/01.jpg",
  },
  {
    name: "Suite",
    subtitle: "con zona giorno",
    priceFrom: "—", // REPLACE: prezzo reale "da € XX"
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

export function ComoLandingPreview() {
  const p = PROPERTIES[SLUG];

  return (
    <>
      {/* 1 · HERO — foto a tutta larghezza, nome città grande a sinistra */}
      <section className="relative">
        <div className="relative h-[82svh] min-h-[560px] max-h-[860px] overflow-hidden">
          <HeroSlideshow slides={HERO_SLIDES} alt={`${p.fullName} — vista principale`} />
          {/* Scrim globale + sfumatura più scura a sinistra: le 3 foto sono
              molto chiare (verde, parete blu, corridoio), quindi serve un
              velo deciso perché "Como" in bianco resti ben leggibile. */}
          <div className="absolute inset-0 bg-black/30" aria-hidden />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, rgba(15,12,14,0.85) 0%, rgba(15,12,14,0.6) 40%, rgba(15,12,14,0.2) 72%, rgba(15,12,14,0) 100%)",
            }}
          />

          <div className="relative z-10 h-full mx-auto w-full max-w-[1200px] px-5 md:px-8 flex flex-col justify-center pb-28 md:pb-32">
            <div className="max-w-xl text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)" }}>
              <h1 className="font-display font-bold leading-[0.95] text-6xl md:text-7xl lg:text-8xl mb-5 text-white">
                Como
              </h1>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-md mb-8">
                Tranquillità e natura, a pochi minuti dal centro.
              </p>
              <Button href="#oasi" variant="primary">
                Scopri di più
              </Button>
            </div>
          </div>
        </div>

        {/* 2 · BOOKING BAR — card bianca che si sovrappone al fondo dell'hero */}
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
          <BookingWidget property={SLUG} variant="hero" />
        </div>
      </section>

      {/* 3 · TRUST BADGES — riga di 5 icone */}
      <section className="bg-[var(--color-bg)] pt-8 pb-4 md:pt-10 md:pb-6">
        <Container>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-sabbia border border-sabbia rounded-[2px] overflow-hidden">
            {TRUST_BADGES.map(({ Icon, title, detail }) => (
              <li
                key={title}
                className="flex items-center gap-3 bg-[var(--color-bg)] px-4 py-4 md:py-5"
              >
                <Icon className="w-6 h-6 text-verde-dark flex-shrink-0" aria-hidden />
                <div className="leading-tight">
                  <p className="font-medium text-sm text-[var(--color-ink)]">{title}</p>
                  <p className="font-mono text-[11px] text-[var(--color-ink-soft)] tabular-nums">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4 · OASI — testo a sinistra + foto a destra */}
      <section id="oasi" className="bg-[var(--color-bg)] py-14 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-[40px] leading-tight text-vinaccia mb-5 [text-wrap:balance]">
                La tua oasi immersa nel verde
              </h2>
              <p className="text-[var(--color-ink-soft)] text-lg leading-relaxed mb-4">
                Un hotel accogliente e riservato, immerso in una delle aree più
                verdi di Como. Ideale per chi cerca relax, natura e un&apos;ospitalità
                autentica, lontano dal turismo di massa.
              </p>
              <p className="text-[var(--color-ink-soft)] leading-relaxed mb-8">
                Confiniamo con il parco di Villa Giovio e siamo a circa 10 minuti
                in auto o autobus dal centro storico — la fermata è proprio davanti
                all&apos;hotel.
              </p>
              <Button href={`/${SLUG}/camere`} variant="secondary">
                Scopri le camere
              </Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-md">
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

      {/* 5 · LE NOSTRE CAMERE — 3 card + link "Vedi tutte" */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-[36px] text-vinaccia [text-wrap:balance]">
              Le nostre camere
            </h2>
            <Link
              href={`/${SLUG}/camere`}
              className="inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-vinaccia hover:gap-2.5 transition-all flex-shrink-0"
            >
              Vedi tutte
              <ChevronIcon className="w-4 h-4 -rotate-90" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_ROOMS.map((room) => (
              <li
                key={room.name}
                className="group bg-white border border-sabbia rounded-[2px] overflow-hidden flex flex-col"
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
                  <div className="p-5 text-center">
                    <h3 className="font-display text-xl text-[var(--color-ink)] leading-tight">
                      {room.name}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                      {room.subtitle}
                    </p>
                    <p className="mt-3 font-mono text-sm text-vinaccia uppercase tracking-wider">
                      da € {room.priceFrom}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6 · TERRAZZE — foto a sinistra + testo a destra */}
      <section className="bg-[var(--color-bg)] py-14 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-md order-1 lg:order-none">
              <Image
                src={assetSrc("/images/como/terrazza.jpg")}
                alt="Le terrazze esterne dell'Hotel RossoVino Como, immerse nel verde"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-[40px] leading-tight text-vinaccia mb-5 [text-wrap:balance]">
                Le nostre terrazze nel verde
              </h2>
              <p className="text-[var(--color-ink-soft)] text-lg leading-relaxed mb-8">
                Inizia la giornata con una colazione self-service sulle nostre
                terrazze esterne, immerse nel verde e con vista sulle montagne
                comasche. Lasciati accompagnare dal silenzio della natura.
              </p>
              <Button href={`/${SLUG}/servizi`} variant="secondary">
                Scopri i servizi
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 7 · PERCHÉ SCEGLIERE COMO — 4 colonne con icona */}
      <section className="bg-white py-14 md:py-20 border-t border-sabbia">
        <Container>
          <h2 className="font-display text-3xl md:text-[36px] text-vinaccia text-center mb-12 [text-wrap:balance]">
            Perché scegliere Como
          </h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {WHY_CHOOSE.map(({ Icon, label }) => (
              <li key={label} className="flex flex-col items-center text-center gap-4">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-verde-light/50 text-verde-dark">
                  <Icon className="w-7 h-7" aria-hidden />
                </span>
                <p className="text-[var(--color-ink)] leading-snug max-w-[180px]">
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
