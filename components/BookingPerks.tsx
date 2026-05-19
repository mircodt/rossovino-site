import { SectionHeading } from "./SectionHeading";
import { Container } from "./Container";
import {
  PriceTagIcon,
  ParkingIcon,
  WineGlassIcon,
  ShieldCheckIcon,
} from "./icons";

/**
 * "Conviene prenotare con noi" — 4 reasons to book direct instead of via
 * OTA channels. Helps the primary business goal (move direct bookings from
 * 30-35% to 50%). Used on the homepage and on every property landing.
 */
const PERKS = [
  {
    Icon: PriceTagIcon,
    title: "Prezzo migliore garantito",
    body: "Prenotando direttamente sul nostro sito hai sempre la tariffa più conveniente.",
  },
  {
    Icon: ParkingIcon,
    title: "Parcheggio prenotabile",
    body: "Posto auto privato disponibile su richiesta, raro nel centro di Milano.",
  },
  {
    Icon: WineGlassIcon,
    title: "Calice di benvenuto incluso",
    body: "Un brindisi all'arrivo, primo gesto dell'esperienza RossoVino.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Cancellazione flessibile",
    body: "Modifica o annulla la prenotazione senza pensieri, come da policy in fase di checkout.",
  },
];

export function BookingPerks({
  eyebrow = "Conviene prenotare con noi",
  title = "Perché prenotare in diretta",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section aria-label={eyebrow} className="bg-sabbia-light py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <SectionHeading eyebrow={eyebrow}>{title}</SectionHeading>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg leading-relaxed">
            Quattro buoni motivi per prenotare direttamente con noi — niente
            intermediari, vantaggi reali per il tuo soggiorno.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map(({ Icon, title, body }) => (
            <li
              key={title}
              className="bg-white border-t-2 border-vinaccia p-6 md:p-7 rounded-[2px]"
            >
              <Icon className="w-9 h-9 text-vinaccia mb-4" aria-hidden />
              <h3 className="font-display text-xl mb-2 text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
