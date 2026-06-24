import type { CSSProperties } from "react";
import type { PropertySlug } from "./config";

/**
 * PROVA DI DESIGN — tema per-struttura del mockup cliente.
 *
 * Ogni landing (e sottopagina) viene avvolta in un wrapper con
 * `style={propertyTheme(slug)}`. Il tema sovrascrive i token colore
 * usati dalle utility Tailwind, così i componenti condivisi (Button,
 * BookingWidget, Footer, sticky bar, content delle sottopagine) si
 * vestono del colore della struttura SENZA modifiche al loro markup.
 *
 * Palette (colori "decisi" approvati dal cliente, più intensi del
 * branding pastello di partenza):
 *   - como            → verde foresta
 *   - milano-boutique → bordeaux
 *   - milano          → blu navy
 *
 * IMPORTANTE: vanno sovrascritti i token --color-* (referenziati dalle
 * utility) E i --c-* sorgente — questi ultimi sono già risolti su :root
 * e un override locale non si propagherebbe da solo a tutte le utility.
 * Rimappiamo il primario (vinaccia) sul colore struttura, e allineiamo
 * anche gli accenti decorativi verde/blu usati in alcune sottopagine.
 */

export interface PropertyPalette {
  /** Colore primario: bottoni, link, accenti. */
  primary: string;
  /** Variante profonda: header, footer, pannelli scuri. */
  deep: string;
  /** Hover dei bottoni primari. */
  hover: string;
  /** Variante chiara: tinte soft, bande decorative. */
  light: string;
  /** Fondo pagina (crema/tinta chiarissima). */
  bg: string;
  /** Testo principale. */
  text: string;
  /** Testo secondario. */
  textSoft: string;
  /** Superficie delle card, poco più chiara del fondo. */
  card: string;
  /** Bordo sottile / filetti. */
  hairline: string;
}

export const PROPERTY_PALETTE: Record<PropertySlug, PropertyPalette> = {
  como: {
    primary: "#3D4931",
    deep: "#333D2A",
    hover: "#49563B",
    light: "#6A7A57",
    bg: "#F1ECDE",
    text: "#2E3325",
    textSoft: "#5B6150",
    card: "#FAF7EB",
    hairline: "rgba(61, 73, 49, 0.18)",
  },
  "milano-boutique": {
    primary: "#7A2230",
    deep: "#5C1A24",
    hover: "#8C2C3A",
    light: "#A8505E",
    bg: "#F3EAE7",
    text: "#3A2226",
    textSoft: "#6B4F53",
    card: "#FBF4F1",
    hairline: "rgba(122, 34, 48, 0.16)",
  },
  milano: {
    primary: "#284A6E",
    deep: "#1E3A57",
    hover: "#305982",
    light: "#5E7D9E",
    bg: "#EAEEF2",
    text: "#22303D",
    textSoft: "#52606D",
    card: "#F5F8FB",
    hairline: "rgba(40, 74, 110, 0.16)",
  },
};

export function propertyTheme(slug: PropertySlug): CSSProperties {
  const pal = PROPERTY_PALETTE[slug];
  return {
    "--color-bg": pal.bg,
    "--color-text": pal.text,
    "--color-text-soft": pal.textSoft,
    "--color-ink": pal.text,
    "--color-ink-soft": pal.textSoft,
    // Primario (vinaccia) → colore struttura: Button, link, footer.
    "--c-vinaccia-light": pal.light,
    "--c-vinaccia": pal.primary,
    "--c-vinaccia-dark": pal.deep,
    "--c-vinaccia-hover": pal.hover,
    "--color-vinaccia-light": pal.light,
    "--color-vinaccia": pal.primary,
    "--color-vinaccia-dark": pal.deep,
    "--color-vinaccia-hover": pal.hover,
    // Accenti decorativi verde/blu (bande "sostenibilità", icone WhatsApp,
    // ecc. in alcune sottopagine) allineati al colore struttura.
    "--c-verde-light": pal.light,
    "--c-verde": pal.primary,
    "--c-verde-dark": pal.primary,
    "--c-verde-hover": pal.hover,
    "--color-verde-light": pal.light,
    "--color-verde": pal.primary,
    "--color-verde-dark": pal.primary,
    "--color-verde-hover": pal.hover,
    "--c-blu-light": pal.light,
    "--c-blu": pal.primary,
    "--c-blu-dark": pal.primary,
    "--c-blu-hover": pal.hover,
    "--color-blu-light": pal.light,
    "--color-blu": pal.primary,
    "--color-blu-dark": pal.primary,
    "--color-blu-hover": pal.hover,
    color: pal.text,
  } as CSSProperties;
}

/** Cartella immagini per slug (milano-boutique usa la cartella "boutique"). */
export function imageDir(slug: PropertySlug): string {
  return slug === "milano-boutique" ? "boutique" : slug;
}
