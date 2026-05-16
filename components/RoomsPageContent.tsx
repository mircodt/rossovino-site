import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, type PropertySlug } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { assetSrc } from "@/lib/asset";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { PhotoGallery } from "./PhotoGallery";
import { RoomExample } from "./RoomExample";
import { BedIcon, CheckIcon } from "./icons";

/** Renders the full /[property]/camere page body. */
export function RoomsPageContent({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  // Placeholder room types — sourced from the existing roomsGallery
  // photos. Names use Italian wine cultivars as per brief. Confirm names
  // with the client before go-live.
  const roomTypes = [
    {
      name: p.roomExample.name,
      capacity: "2 ospiti",
      size: "20 m²", // REPLACE: dimensioni reali
      photo: p.roomExample.photos[0],
    },
    {
      name: "Nebbiolo", // REPLACE: nome reale
      capacity: "2 ospiti",
      size: "18 m²", // REPLACE
      photo: p.roomsGallery[0] ?? p.heroImage,
    },
    {
      name: "Barolo", // REPLACE
      capacity: "3 ospiti",
      size: "22 m²", // REPLACE
      photo: p.roomsGallery[1] ?? p.heroImage,
    },
    ...(p.slug === "como"
      ? [
          {
            name: "Sangiovese",
            capacity: "Familiare · 4 ospiti",
            size: "32 m²", // REPLACE
            photo: p.roomsGallery[2] ?? p.heroImage,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Intro + comforts grid */}
      <section className="bg-white py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="Comfort in camera">
            Tutto ciò che ti serve, dentro la stanza
          </SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
            {c.rooms.intro}
          </p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.rooms.comforts.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[var(--color-ink)]">
                <CheckIcon className="w-5 h-5 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Room types grid */}
      <section className="bg-[var(--color-bg)] py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="Tipologie di camere">
            Le camere come grandi vini
          </SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
            Ogni camera porta il nome di un vino italiano d&apos;autore. Stessa
            anima, dettagli diversi.
          </p>

          <ul className="mt-8 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roomTypes.map((room) => (
              <li
                key={room.name}
                className="bg-white border border-sabbia rounded-[2px] overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={assetSrc(room.photo.startsWith("/") ? room.photo : `/${room.photo}`)}
                    alt={`Camera ${room.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display text-xl text-[var(--color-ink)] mb-2">
                    Camera {room.name}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-soft)] mb-3 font-mono uppercase tracking-wider">
                    {room.capacity} · {room.size}
                  </p>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed text-sm">
                    Comfort essenziale, materiali curati e l&apos;identità RossoVino in ogni
                    dettaglio.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Detailed example room — reused component */}
      <section
        id="stanza-esempio"
        aria-label={`Camera ${p.roomExample.name}`}
        className="bg-white py-12 md:py-20"
      >
        <Container>
          <SectionHeading eyebrow="Una stanza nel dettaglio">
            Camera {p.roomExample.name}
          </SectionHeading>
          {p.roomExample.description && (
            <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
              {p.roomExample.description}
            </p>
          )}
          <div className="mt-8">
            <RoomExample room={p.roomExample} propertyName={p.fullName} />
          </div>
        </Container>
      </section>

      {/* Wider rooms gallery */}
      <section className="bg-[var(--color-bg)] py-12 md:py-20">
        <Container>
          <SectionHeading eyebrow="Galleria camere">
            Sfoglia le altre camere
          </SectionHeading>
          <div className="mt-8">
            <PhotoGallery
              images={p.roomsGallery}
              propertyName={`${p.fullName} — camere`}
            />
          </div>
        </Container>
      </section>

      {/* Final CTA back to landing's booking widget */}
      <section className="bg-vinaccia text-white py-14 md:py-20">
        <Container className="text-center">
          <h2 className="font-display text-white mb-3 [text-wrap:balance]">
            Prenota la tua camera
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
            Scegli le date e verifica la disponibilità in tempo reale.
          </p>
          <Link
            href={`/${slug}#prenota`}
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 bg-white text-vinaccia font-medium uppercase tracking-wide text-sm rounded-[2px] hover:bg-sabbia transition-colors"
          >
            <BedIcon className="w-5 h-5" aria-hidden />
            Verifica disponibilità
          </Link>
        </Container>
      </section>
    </>
  );
}
