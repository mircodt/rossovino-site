import type { CSSProperties } from "react";
import type { PropertyConfig } from "./config";

/**
 * Each property pushes its accent into CSS variables on a wrapper
 * element. Children use `bg-[color:var(--accent)]` etc.
 *
 * - `--accent`: the dominant color of this property
 * - `--accent-hover`: hover state for buttons / interactive elements
 * - `--accent-light`: soft tint for backgrounds, badges
 * - `--accent-on`: contrast color (#fff or #2B2B2B) for text on accent bg
 * - `--accent-on-soft`: same color at lower alpha for secondary text
 */
export function accentCssVars(
  accent: PropertyConfig["accent"],
): CSSProperties {
  switch (accent) {
    case "vinaccia":
      return {
        "--accent": "var(--c-vinaccia)",
        "--accent-hover": "var(--c-vinaccia-hover)",
        "--accent-dark": "var(--c-vinaccia-dark)",
        "--accent-light": "var(--c-vinaccia-light)",
        "--accent-on": "#ffffff",
        "--accent-on-soft": "rgba(255,255,255,0.85)",
      } as CSSProperties;
    case "blu":
      return {
        "--accent": "var(--c-blu)",
        "--accent-hover": "var(--c-blu-hover)",
        "--accent-dark": "var(--c-blu-dark)",
        "--accent-light": "var(--c-blu-light)",
        "--accent-on": "#ffffff",
        "--accent-on-soft": "rgba(255,255,255,0.9)",
      } as CSSProperties;
    case "verde":
      return {
        "--accent": "var(--c-verde)",
        "--accent-hover": "var(--c-verde-hover)",
        "--accent-dark": "var(--c-verde-dark)",
        "--accent-light": "var(--c-verde-light)",
        "--accent-on": "#ffffff",
        "--accent-on-soft": "rgba(255,255,255,0.9)",
      } as CSSProperties;
  }
}

/** Tailwind class for plain accent background — used in JSX where CSS vars aren't applied yet. */
export const accentBgClass: Record<PropertyConfig["accent"], string> = {
  vinaccia: "bg-vinaccia",
  blu: "bg-blu",
  verde: "bg-verde",
};

export const accentTextClass: Record<PropertyConfig["accent"], string> = {
  vinaccia: "text-vinaccia",
  blu: "text-blu-dark",
  verde: "text-verde-dark",
};
