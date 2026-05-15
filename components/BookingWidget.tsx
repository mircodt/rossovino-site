"use client";

import { useState, useId, useMemo } from "react";
import { PROPERTIES, PROPERTY_ORDER, type PropertySlug } from "@/lib/config";
import { BedIcon, CalendarIcon, MapPinIcon, UsersIcon } from "./icons";

interface Props {
  /** Pre-selected property. If undefined, shows destination picker. */
  property?: PropertySlug;
  variant?: "hero" | "inline";
}

/**
 * Vertical Booking integration — PLACEHOLDER.
 *
 * When the client provides the embed code (iframe or script), replace
 * the inner form with the real widget. The interface (property + variant)
 * is the public API: keep it stable.
 *
 * Until then, the placeholder collects the four pieces of data Vertical
 * Booking expects (destination, dates, guests) and submits to the
 * property's `verticalBooking.bookingUrl` — also a placeholder.
 *
 * See: https://www.verticalbooking.com/
 */
export function BookingWidget({ property, variant = "inline" }: Props) {
  const id = useId();
  const [destination, setDestination] = useState<PropertySlug>(
    property ?? "milano-boutique",
  );
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  const targetUrl = PROPERTIES[destination].verticalBooking.bookingUrl;

  const wrapperBase =
    "w-full max-w-[1200px] mx-auto bg-white/95 backdrop-blur-sm rounded-[2px] shadow-lg border border-sabbia";
  const wrapperVariant =
    variant === "hero"
      ? "p-5 md:p-6 -mt-12 md:-mt-16 relative z-10"
      : "p-5 md:p-6";

  return (
    <form
      action={targetUrl}
      method="get"
      className={`${wrapperBase} ${wrapperVariant}`}
      aria-label="Prenotazione camera"
      id="prenota"
    >
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-end">
        {/* Destination picker (only when property not pre-set) */}
        {property ? (
          <input type="hidden" name="hotel" value={PROPERTIES[property].verticalBooking.hotelId} />
        ) : (
          <Field id={`${id}-dest`} label="Destinazione" icon={<MapPinIcon className="w-4 h-4" />}>
            <select
              id={`${id}-dest`}
              name="hotel"
              value={destination}
              onChange={(e) => setDestination(e.target.value as PropertySlug)}
              className="w-full bg-transparent text-base font-medium outline-none border-none pr-2 cursor-pointer min-h-11"
            >
              {PROPERTY_ORDER.map((slug) => (
                <option key={slug} value={slug}>
                  {PROPERTIES[slug].fullName}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field id={`${id}-in`} label="Check-in" icon={<CalendarIcon className="w-4 h-4" />}>
          <input
            id={`${id}-in`}
            name="checkin"
            type="date"
            defaultValue={today}
            className="w-full bg-transparent text-base font-medium outline-none border-none pr-2 min-h-11"
            required
          />
        </Field>

        <Field id={`${id}-out`} label="Check-out" icon={<CalendarIcon className="w-4 h-4" />}>
          <input
            id={`${id}-out`}
            name="checkout"
            type="date"
            defaultValue={tomorrow}
            className="w-full bg-transparent text-base font-medium outline-none border-none pr-2 min-h-11"
            required
          />
        </Field>

        <Field id={`${id}-guests`} label="Ospiti" icon={<UsersIcon className="w-4 h-4" />}>
          <select
            id={`${id}-guests`}
            name="guests"
            defaultValue="2"
            className="w-full bg-transparent text-base font-medium outline-none border-none pr-2 cursor-pointer min-h-11"
          >
            <option value="1">1 ospite</option>
            <option value="2">2 ospiti</option>
            <option value="3">3 ospiti</option>
            <option value="4">4 ospiti</option>
          </select>
        </Field>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 min-h-12 px-6 bg-vinaccia text-white font-medium uppercase tracking-wide text-sm rounded-[2px] hover:bg-vinaccia-hover transition-colors"
        >
          <BedIcon className="w-4 h-4" aria-hidden />
          Verifica disponibilità
        </button>
      </div>

      {/* Dev-only hint while the real embed is missing */}
      <p className="mt-3 text-xs text-[var(--color-ink-soft)] italic">
        Widget di prenotazione — verrà sostituito con l&apos;embed Vertical Booking.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  icon,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-soft)] mb-1">
        {icon}
        {label}
      </span>
      <div className="border-b border-[var(--color-ink)]/20 pb-1">{children}</div>
    </label>
  );
}
