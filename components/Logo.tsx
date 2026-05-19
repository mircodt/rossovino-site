import Image from "next/image";
import Link from "next/link";
import { assetSrc } from "@/lib/asset";
import type { PropertySlug } from "@/lib/config";

interface Props {
  /** When set, shows the city-specific logo. */
  property?: PropertySlug;
  /** Disable wrapping link (e.g., for footer placement). */
  asLink?: boolean;
  className?: string;
  /** Pixel size of the rendered logo height (width auto-scales).
   *  - `sm` for the mobile drawer header
   *  - `md` for the homepage / group brand header
   *  - `lg` for the property page header (≈10% bigger than `md`, per client) */
  size?: "sm" | "md" | "lg";
  /** Tiny eyebrow rendered below the logo (e.g. "Boutique" to differentiate
   *  the Milano-Boutique page from the standard Milano page, since both
   *  share the same "ROSSOVINO MILANO" PNG). */
  eyebrow?: string;
}

const sizeClass: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 md:h-7",
  md: "h-7 md:h-9",
  // 10% bumped for property pages (client request: "ingrandire un 10%")
  lg: "h-8 md:h-11",
};

/**
 * Brand logo — uses the recolored vinaccia PNGs in /public/images/brand/.
 * Picks the right variant for the current property:
 *  - Boutique + Milano** → logo-milano.png ("ROSSOVINO MILANO")
 *  - Como***            → logo-como.png   ("ROSSOVINO COMO")
 *  - no property        → logo-rossovino.png (group brand)
 *
 * `eyebrow` adds a small caption beneath the logo — used on the Boutique
 * page to write "Boutique" so the visitor knows they're not on the regular
 * Milano page even though the PNG is shared.
 */
export function Logo({
  property,
  asLink = true,
  className = "",
  size = "md",
  eyebrow,
}: Props) {
  const variant =
    property === "como"
      ? { src: "/images/brand/logo-como.png", alt: "Hotel RossoVino Como", aspect: 1974 / 481 }
      : property
      ? {
          src: "/images/brand/logo-milano.png",
          alt: property === "milano-boutique" ? "Boutique RossoVino Milano" : "Hotel RossoVino Milano",
          aspect: 1974 / 481,
        }
      : { src: "/images/brand/logo-rossovino.png", alt: "Hotel RossoVino", aspect: 2788 / 422 };

  // Width is computed from chosen height (size class). Use a generous max
  // and rely on the height class to constrain.
  const widthPx = Math.round(48 * variant.aspect);

  const inner = (
    <span className="inline-flex flex-col items-start leading-none">
      <Image
        src={assetSrc(variant.src)}
        alt={variant.alt}
        width={widthPx}
        height={48}
        priority
        className={`${sizeClass[size]} w-auto ${className}`}
      />
      {eyebrow && (
        <span
          className="mt-0.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-vinaccia font-bold"
        >
          {eyebrow}
        </span>
      )}
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link
      href={property ? `/${property}` : "/"}
      aria-label={`${variant.alt} — homepage`}
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
