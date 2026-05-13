import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, type PropertySlug } from "@/lib/config";
import { CONTENT } from "@/lib/content";
import { StarIcon } from "./icons";

const accentBg: Record<string, string> = {
  vinaccia: "bg-vinaccia",
  "sabbia-dark": "bg-sabbia-dark",
  blu: "bg-blu",
};

export function PropertyCard({ slug }: { slug: PropertySlug }) {
  const p = PROPERTIES[slug];
  const c = CONTENT[slug];

  return (
    <article className="group flex flex-col bg-white border border-sabbia rounded-[2px] overflow-hidden hover:shadow-lg transition-shadow">
      <Link
        href={`/${slug}`}
        className="block relative aspect-[4/3] overflow-hidden"
        aria-label={`Scopri ${p.fullName}`}
      >
        <Image
          src={`/${p.heroImage}`}
          alt={p.fullName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 ${accentBg[p.accent]} text-white text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-[2px]`}
        >
          {p.stars ? `${p.stars} stelle` : "Boutique"} · {p.address.addressLocality}
        </span>
      </Link>

      <div className="p-6 md:p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          {p.stars && (
            <span className="inline-flex items-center gap-0.5" aria-label={`${p.stars} stelle`}>
              {Array.from({ length: p.stars }).map((_, i) => (
                <StarIcon key={i} className="w-3.5 h-3.5 text-sabbia-dark" aria-hidden />
              ))}
            </span>
          )}
        </div>
        <h3 className="font-display text-2xl mb-3 text-[var(--color-ink)]">
          <Link href={`/${slug}`} className="hover:text-vinaccia transition-colors">
            {p.fullName}
          </Link>
        </h3>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-5 flex-grow">
          {c.hero.subtitle}
        </p>
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-1 text-vinaccia font-medium uppercase tracking-wide text-sm hover:gap-2 transition-all"
        >
          Scopri la struttura
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
