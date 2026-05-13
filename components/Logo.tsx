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
  /** Pixel size of the rendered logo height (width auto-scales). */
  size?: "sm" | "md" | "lg";
}

const sizeClass: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 md:h-7",
  md: "h-7 md:h-9",
  lg: "h-10 md:h-12",
};

/**
 * Brand logo — uses the recolored vinaccia PNGs in /public/images/brand/.
 * Picks the right variant for the current property:
 *  - Boutique + Milano** → logo-milano.png ("ROSSOVINO MILANO")
 *  - Como***            → logo-como.png   ("ROSSOVINO COMO")
 *  - no property        → logo-rossovino.png (group brand)
 */
export function Logo({
  property,
  asLink = true,
  className = "",
  size = "md",
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

  const img = (
    <Image
      src={assetSrc(variant.src)}
      alt={variant.alt}
      width={widthPx}
      height={48}
      priority
      className={`${sizeClass[size]} w-auto ${className}`}
    />
  );

  if (!asLink) return img;
  return (
    <Link
      href={property ? `/${property}` : "/"}
      aria-label={`${variant.alt} — homepage`}
      className="inline-flex items-center"
    >
      {img}
    </Link>
  );
}
