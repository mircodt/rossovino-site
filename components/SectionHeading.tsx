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
      <Tag className="font-display [text-wrap:balance] max-w-3xl">{children}</Tag>
    </header>
  );
}
