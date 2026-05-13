import Link from "next/link";

interface Props {
  /** Which version is the current page. */
  current: "v1" | "v2";
  /** Equivalent path on the OTHER version, if available. */
  otherPath?: string;
}

/**
 * Slim banner at the very top of every page. Lets the client (and us)
 * jump between the v1 and v2 builds while the comparison is open.
 *
 * Removed by hand once the chosen version is approved.
 */
export function VersionSwitcher({ current, otherPath = "/" }: Props) {
  const otherLabel = current === "v1" ? "v2 (proposta)" : "v1 (originale)";
  return (
    <div className="w-full bg-[#2b2b2b] text-white text-[12px] font-mono">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-1.5 flex items-center justify-between gap-3">
        <span className="uppercase tracking-[0.16em] opacity-80">
          Anteprima · {current === "v1" ? "Versione 1" : "Versione 2"}
        </span>
        <Link
          href={otherPath}
          className="underline underline-offset-2 hover:text-sabbia transition-colors uppercase tracking-wide"
        >
          Vedi {otherLabel} →
        </Link>
      </div>
    </div>
  );
}
