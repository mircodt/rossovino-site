import Image from "next/image";
import Link from "next/link";
import { assetSrc } from "@/lib/asset";
import type { PropertySlug } from "@/lib/config";

interface Props {
  /** When set, shows the property name as a bold subtitle under the
   *  ROSSOVINO mark. */
  property?: PropertySlug;
  /** Disable wrapping link (e.g., for footer placement). */
  asLink?: boolean;
  className?: string;
  /** Pixel size of the rendered logo height (width auto-scales).
   *  - `sm` for the mobile drawer header
   *  - `md` for the homepage / group brand header (also property pages now) */
  size?: "sm" | "md" | "lg";
}

const sizeClass: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 md:h-7",
  // Header default — bumps to 48px on desktop (lg+) so the brand is the
  // dominant element of the cleaner header.
  md: "h-7 md:h-9 lg:h-12",
  lg: "h-8 md:h-11",
};

/**
 * Brand logo. The ROSSOVINO mark (logo-rossovino.png, recolored to
 * vinaccia) is used for every page. When the visitor is on a specific
 * property, a bold subtitle ("MILANO", "COMO", "BOUTIQUE MILANO") is
 * rendered just below the mark — same vinaccia, font-display bold, big
 * enough to read at a glance.
 *
 * We dropped the city-specific PNGs (logo-milano.png / logo-como.png)
 * because their inset "MILANO" / "COMO" text was rendered too thin in
 * the source PNG to be readable in the header; an HTML subtitle gives
 * full control over weight and size.
 */
export function Logo({
  property,
  asLink = true,
  className = "",
  size = "md",
}: Props) {
  // Always the group mark. Aspect = 2788 / 422 ≈ 6.6.
  const src = "/images/brand/logo-rossovino.png";
  const aspect = 2788 / 422;
  const widthPx = Math.round(48 * aspect);

  const subtitle =
    property === "como"
      ? "Como"
      : property === "milano"
      ? "Milano"
      : property === "milano-boutique"
      ? "Boutique Milano"
      : null;

  const alt =
    property === "como"
      ? "Hotel RossoVino Como"
      : property === "milano"
      ? "Hotel RossoVino Milano"
      : property === "milano-boutique"
      ? "Boutique RossoVino Milano"
      : "Hotel RossoVino";

  const inner = (
    <span className="inline-flex flex-col items-start leading-none">
      <Image
        src={assetSrc(src)}
        alt={alt}
        width={widthPx}
        height={48}
        priority
        className={`${sizeClass[size]} w-auto ${className}`}
      />
      {subtitle && (
        <span
          className="
            mt-1.5 font-display font-bold text-vinaccia uppercase
            tracking-[0.18em] text-[13px] md:text-[15px] leading-none
            whitespace-nowrap
          "
        >
          {subtitle}
        </span>
      )}
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link
      href={property ? `/${property}` : "/"}
      aria-label={`${alt} — homepage`}
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
