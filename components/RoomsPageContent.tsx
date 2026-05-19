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

  // roomTypes lives in PROPERTIES[slug].roomTypes — single source of truth.
  // Map the internal type key to a human label for the badge.
  const TYPE_LABEL: Record<string, string> = {
    matrimoniale: "Matrimoniale",
    "matrimoniale-superior": "Matrimoniale Superior",
    twin: "Twin",
    tripla: "Tripla",
    suite: "Suite",
  };

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
            {p.roomTypes.map((room) => {
              const photo = room.photos[0] ?? p.heroImage;
              return (
                <li
                  key={room.wineName}
                  className="bg-white border border-sabbia rounded-[2px] overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={assetSrc(photo.startsWith("/") ? photo : `/${photo}`)}
                      alt={`Camera ${room.wineName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-[var(--color-ink)] font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-[2px]">
                      {TYPE_LABEL[room.type] ?? room.type}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl text-[var(--color-ink)] mb-2">
                      Camera {room.wineName}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-soft)] mb-4 font-mono uppercase tracking-wider">
                      {room.capacity} {room.capacity === 1 ? "ospite" : "ospiti"} · {room.size} m²
                    </p>
                    <ul className="space-y-2 text-sm text-[var(--color-ink-soft)] flex-1">
                      {room.amenities.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-vinaccia flex-shrink-0 mt-0.5" aria-hidden />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
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
