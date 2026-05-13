import type { PropertyContent } from "@/lib/content";
import type { PropertyConfig } from "@/lib/config";

interface Props {
  items: PropertyContent["valueProps"];
  /** Drives the small accent bar color */
  accent: PropertyConfig["accent"];
}

const accentClass: Record<PropertyConfig["accent"], string> = {
  vinaccia: "bg-vinaccia",
  "sabbia-dark": "bg-sabbia-dark",
  blu: "bg-blu",
};

export function ValuePropsRow({ items, accent }: Props) {
  return (
    <section className="bg-[var(--color-bg)] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map(({ title, body }) => (
            <li
              key={title}
              className="bg-white p-6 md:p-7 border border-sabbia rounded-[2px] flex flex-col"
            >
              <span
                className={`block h-1 w-10 ${accentClass[accent]} mb-4`}
                aria-hidden
              />
              <h3 className="font-display text-xl mb-2 text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
