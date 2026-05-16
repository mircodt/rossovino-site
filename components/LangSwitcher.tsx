/**
 * Language switcher — placeholder UI only.
 * Italian site is live; English is a planned addition. Both items render
 * as <a href="#"> for the moment; flip `active` once /en/ pages exist.
 */
interface Props {
  /** "header" sits inline on desktop; "drawer" stacks for mobile menu. */
  variant?: "header" | "drawer";
}

export function LangSwitcher({ variant = "header" }: Props) {
  const wrapper =
    variant === "drawer"
      ? "inline-flex items-center gap-2"
      : "inline-flex items-center gap-2 font-mono text-xs uppercase";

  return (
    <div className={wrapper} aria-label="Lingua del sito">
      <a
        href="#"
        aria-current="page"
        className="font-mono text-xs uppercase tracking-wider text-vinaccia font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinaccia"
      >
        IT
      </a>
      <span aria-hidden className="font-mono text-xs text-vinaccia/40">
        |
      </span>
      <a
        href="#"
        className="font-mono text-xs uppercase tracking-wider text-vinaccia opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinaccia"
      >
        EN
      </a>
    </div>
  );
}
