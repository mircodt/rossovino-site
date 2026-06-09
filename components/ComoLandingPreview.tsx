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
  BedIcon,
} from "./icons";

/**
 * PROVA DI DESIGN — pagina /como ridisegnata per imitare la struttura del
 * mockup inviato dal cliente. Isolata: usata SOLO da app/como/page.tsx.
 * Boutique e Milano continuano a usare PropertyPageContent.
 *
 * Revisione 2 (feedback cliente):
 *  - Hero come IMMAGINE FISSA (solo la foto del verde sul retro), più alta.
 *  - Booking bar più lunga (1280) + più sottile + sovrapposta all'hero.
 *  - "Reception" rimosso dai badge: restano solo gli orari.
 *  - Verde SOLO nelle due fasce: servizi e "Perché scegliere Como".
 *  - Verde leggermente più saturo (GREEN_BAND) per togliere l'effetto sbiadito.
 *  - Parte finale rifatta: terrazza più presente + CTA di chiusura.
 *
 * Nota di onestà: il mockup parlava di "lago"; l'hotel è a Como NON sul lago,
 * quindi i riferimenti sono adattati a "verde / montagne comasche".
 */

const SLUG = "como" as const;

/** Verde leggermente più saturo del page-bg standard (#D9E3CF), usato SOLO
 *  nelle due fasce richieste (servizi + "perché scegliere"). */
const GREEN_BAND = "#C2D5AC";

/** Hero come immagine fissa: la foto del verde scattata sul retro dell'hotel. */
const HERO_IMG = "/images/como/hero-preview/1.jpg";

/** Badge di fiducia sotto la booking bar. La reception mostra SOLO gli orari
 *  (senza la parola "Reception"), come da feedback. */
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

export function ComoLandingPreview() {
  const p = PROPERTIES[SLUG];

  return (
    <>
      {/* 1 · HERO — immagine fissa (verde sul retro), più alta per dare impatto */}
      <section className="relative">
        <div className="relative h-[88svh] min-h-[620px] max-h-[940px] overflow-hidden">
          <Image
            src={assetSrc(HERO_IMG)}
            alt={`${p.fullName} — vista sul verde dal retro dell'hotel`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Velo deciso: la foto è chiara, così "Como" in bianco resta leggibile */}
          <div className="absolute inset-0 bg-black/30" aria-hidden />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, rgba(15,12,14,0.85) 0%, rgba(15,12,14,0.6) 40%, rgba(15,12,14,0.2) 72%, rgba(15,12,14,0) 100%)",
            }}
          />

          <div className="relative z-10 h-full mx-auto w-full max-w-[1280px] px-5 md:px-8 flex flex-col justify-center pb-32 md:pb-36">
            <div
              className="max-w-xl text-white"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)" }}
            >
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

        {/* 2 · BOOKING BAR — più lunga (1280), più sottile, sovrapposta all'hero */}
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div className="relative z-20 -mt-12 md:-mt-16 bg-white rounded-[2px] shadow-xl border border-sabbia px-5 md:px-8 py-3 md:py-3.5">
            <BookingWidget property={SLUG} variant="compact" />
          </div>
        </div>
      </section>

      {/* 3 · TRUST BADGES — UNICA fascia verde (1 di 2). Reception = solo orari.
            Badge verticali centrati (icona sopra, testo sotto): celle
            simmetriche, allineamento pulito a ogni breakpoint. In mobile
            (2 col) l'ultimo badge si centra su tutta la larghezza. */}
      <section style={{ backgroundColor: GREEN_BAND }} className="py-7 md:py-8">
        <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-7 gap-x-4 md:gap-x-6">
            {TRUST_BADGES.map(({ Icon, title, detail }, i) => (
              <li
                key={title}
                className={`flex flex-col items-center text-center gap-1.5 ${
                  i === TRUST_BADGES.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <Icon className="w-6 h-6 text-verde-dark mb-1" aria-hidden />
                <p className="font-medium text-sm text-[var(--color-ink)] tabular-nums leading-tight">
                  {title}
                </p>
                {detail && (
                  <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-ink)]/65 leading-tight">
                    {detail}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · OASI — testo a sinistra + foto a destra (fondo neutro) */}
      <section id="oasi" className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-verde-dark mb-4">
                Hotel RossoVino Como
              </p>
              <h2 className="font-display text-3xl md:text-[42px] leading-tight text-vinaccia mb-5 [text-wrap:balance]">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] shadow-lg">
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

      {/* 5 · LE NOSTRE CAMERE — 3 card + link "Vedi tutte" (fondo neutro) */}
      <section className="bg-[var(--color-bg)] py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-verde-dark mb-3">
                Soggiorna con noi
              </p>
              <h2 className="font-display text-3xl md:text-[40px] text-vinaccia leading-tight [text-wrap:balance]">
                Le nostre camere
              </h2>
            </div>
            <Link
              href={`/${SLUG}/camere`}
              className="inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-vinaccia hover:gap-2.5 transition-all flex-shrink-0 pb-1"
            >
              Vedi tutte
              <ChevronIcon className="w-4 h-4 -rotate-90" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_ROOMS.map((room) => (
              <li key={room.name} className="group">
                <Link href={`/${SLUG}/camere`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] shadow-md">
                    <Image
                      src={assetSrc(room.photo)}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-4 text-center">
                    <h3 className="font-display text-xl text-[var(--color-ink)] leading-tight">
                      {room.name}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                      {room.subtitle}
                    </p>
                    <p className="mt-2 font-mono text-sm text-vinaccia uppercase tracking-wider">
                      da € {room.priceFrom}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6 · TERRAZZE — foto grande a sinistra + testo a destra (fondo neutro) */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[3px] shadow-lg order-1 lg:order-none">
              <Image
                src={assetSrc("/images/como/terrazza.jpg")}
                alt="Le terrazze esterne dell'Hotel RossoVino Como, immerse nel verde"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-verde-dark mb-4">
                Colazione &amp; relax
              </p>
              <h2 className="font-display text-3xl md:text-[42px] leading-tight text-vinaccia mb-5 [text-wrap:balance]">
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

      {/* 7 · PERCHÉ SCEGLIERE COMO — UNICA fascia verde (2 di 2) */}
      <section style={{ backgroundColor: GREEN_BAND }} className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-verde-dark mb-3">
              La tua scelta
            </p>
            <h2 className="font-display text-3xl md:text-[40px] text-vinaccia leading-tight [text-wrap:balance]">
              Perché scegliere Como
            </h2>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {WHY_CHOOSE.map(({ Icon, label }) => (
              <li key={label} className="flex flex-col items-center text-center gap-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/70 text-verde-dark shadow-sm">
                  <Icon className="w-8 h-8" aria-hidden />
                </span>
                <p className="text-[var(--color-ink)] leading-snug max-w-[180px]">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8 · CTA FINALE — fascia immagine con overlay, chiusura forte */}
      <section className="relative overflow-hidden">
        <div className="relative h-[46svh] min-h-[360px] max-h-[520px]">
          <Image
            src={assetSrc(HERO_IMG)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
          <div className="relative z-10 h-full mx-auto w-full max-w-[1280px] px-5 md:px-8 flex flex-col items-center justify-center text-center text-white">
            <h2
              className="font-display text-white text-3xl md:text-[44px] leading-tight mb-4 [text-wrap:balance]"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
            >
              Pronto a vivere Como con noi?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mb-8 leading-relaxed">
              Verifica la disponibilità in tempo reale, oppure contattaci
              direttamente — siamo a un click di distanza.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="#prenota" variant="primary">
                <BedIcon className="w-5 h-5" aria-hidden />
                Verifica disponibilità
              </Button>
              <Button href={`/${SLUG}/contatti`} variant="outline-on-dark">
                Contattaci
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
