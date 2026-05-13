import type { HTMLAttributes } from "react";

/** Centered max-width container — single rule for all sections. */
export function Container({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`} {...rest}>
      {children}
    </div>
  );
}
