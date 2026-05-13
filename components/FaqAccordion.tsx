"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";

interface Props {
  items: { q: string; a: string }[];
}

export function FaqAccordion({ items }: Props) {
  // Open the first item by default — improves engagement on mobile.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <dt>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-start justify-between gap-4 py-5 text-left hover:text-vinaccia transition-colors"
              >
                <span className="font-display text-lg md:text-xl">{item.q}</span>
                <ChevronIcon
                  className={`w-5 h-5 flex-shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
            </dt>
            <dd
              id={`faq-${i}`}
              hidden={!isOpen}
              className="pb-6 text-[var(--color-ink-soft)] leading-relaxed max-w-3xl"
            >
              {item.a}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
