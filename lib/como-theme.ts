/**
 * PROVA DI DESIGN — tema "verde foresta + crema" del mockup cliente per la
 * landing /como. Va applicato come `style` su un wrapper: sovrascrive i
 * token colore usati dalle utility Tailwind, così i componenti condivisi
 * (Button, BookingWidget, Footer, sticky bar) si vestono di verde senza
 * alcuna modifica al loro codice.
 *
 * IMPORTANTE: vanno sovrascritti i token --color-* (quelli referenziati
 * dalle utility) — i --c-* sorgente sono già stati risolti su :root e un
 * override locale non si propagherebbe.
 */

import type { CSSProperties } from "react";

export const COMO_GREEN = "#3D4931";
export const COMO_GREEN_DEEP = "#333D2A";

export const COMO_THEME = {
  // Fondo pagina crema (mockup)
  "--color-bg": "#F1ECDE",
  // Testi con una punta di oliva, come il mockup
  "--color-text": "#2E3325",
  "--color-text-soft": "#5B6150",
  "--color-ink": "#2E3325",
  "--color-ink-soft": "#5B6150",
  // Vinaccia → verde foresta: colora bottoni, link, footer (bg-vinaccia-dark)
  "--c-vinaccia-light": "#6A7A57",
  "--c-vinaccia": COMO_GREEN,
  "--c-vinaccia-dark": COMO_GREEN_DEEP,
  "--c-vinaccia-hover": "#49563B",
  "--color-vinaccia-light": "#6A7A57",
  "--color-vinaccia": COMO_GREEN,
  "--color-vinaccia-dark": COMO_GREEN_DEEP,
  "--color-vinaccia-hover": "#49563B",
  // Anche gli accenti "verde" condivisi si allineano al verde del mockup
  "--c-verde-dark": COMO_GREEN,
  "--c-verde-hover": "#49563B",
  "--color-verde-dark": COMO_GREEN,
  "--color-verde-hover": "#49563B",
  color: "#2E3325",
} as CSSProperties;
