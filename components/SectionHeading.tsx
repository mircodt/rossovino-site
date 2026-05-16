import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  children: ReactNode;
  as?: "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  children,
  as: Tag = "h2",
  align = "left",
  className = "",
}: Props) {
  return (
    <header className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-vinaccia mb-3">
          {eyebrow}
        </p>
      )}
      {/* Heavier visual weight than body copy: bold + vinaccia accent +
          slightly bumped size via tighter line-height. */}
      <Tag className="font-display font-bold text-vinaccia text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] leading-[1.1] [text-wrap:balance] max-w-3xl">
        {children}
      </Tag>
    </header>
  );
}
