import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 min-h-11 px-5 font-medium text-[15px] " +
  "tracking-wide uppercase transition-colors rounded-[2px] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinaccia focus-visible:ring-offset-2";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-vinaccia text-white hover:bg-vinaccia-hover active:bg-vinaccia-dark",
  secondary:
    "bg-transparent text-vinaccia border border-vinaccia hover:bg-vinaccia hover:text-white",
  ghost:
    "bg-transparent text-[var(--color-ink)] hover:bg-sabbia",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type BtnProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkProps | BtnProps) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const cls = `${base} ${variantClass[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as LinkProps;
    // External links and tel:/mailto:/https: go through <a>, internal via <Link>.
    const isExternal = /^(https?:|tel:|mailto:|https?:\/\/)/.test(href) || href.startsWith("#");
    if (isExternal) {
      return (
        <a className={cls} href={href} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...(anchorRest as object)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
