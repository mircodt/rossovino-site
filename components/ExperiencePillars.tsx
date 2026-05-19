import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { Container } from "./Container";
import { assetSrc } from "@/lib/asset";
import { HOME_CONTENT } from "@/lib/content";

/**
 * "L'esperienza RossoVino" section — 3 brand pillars, the first two each
 * illustrated with a photo right below the body text:
 *   - Brindisi di benvenuto → wine glass + bottles still life
 *   - Camere come grandi vini → "309 Cabernet Sauvignon" room plaque
 *   - Consigli di chi vive il territorio → no photo (kept as text-only for
 *     parity with the other pillars when the client provides a 3rd image).
 */

const PILLAR_IMAGE: (string | null)[] = [
  "/images/boutique/atmosfera-2.jpg", // calice + bottiglie su parete in pietra
  "/images/boutique/room-example/1.jpg", // plaque "309 — Cabernet Sauvignon"
  null,
];

const PILLAR_ALT: string[] = [
  "Brindisi di benvenuto: calice di vino e bottiglie su parete in pietra",
  "Camera 309 — Cabernet Sauvignon: la targhetta all'ingresso della camera",
  "",
];

export function ExperiencePillars() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow="L'identità del gruppo">
          {HOME_CONTENT.experience.h2}
        </SectionHeading>
        <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
          {HOME_CONTENT.experience.intro}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {HOME_CONTENT.experience.pillars.map((pillar, i) => {
            const photo = PILLAR_IMAGE[i];
            return (
              <article
                key={pillar.title}
                className="border-t-2 border-vinaccia pt-6 flex flex-col"
              >
                <h3 className="font-display text-xl mb-3 text-[var(--color-ink)]">
                  {pillar.title}
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-relaxed mb-5 flex-1">
                  {pillar.body}
                </p>
                {photo && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                    <Image
                      src={assetSrc(photo)}
                      alt={PILLAR_ALT[i]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
