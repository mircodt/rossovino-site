/**
 * Build-time helper that prepends the basePath to a static asset path.
 *
 * Why we need this:
 *   Next.js' `<Image>` does NOT prepend `basePath` when `images.unoptimized`
 *   is true (the static-export configuration we use for GitHub Pages).
 *   The optimized loader handles it automatically; the unoptimized loader
 *   passes the src through verbatim. Result on GH Pages: `<img src="/images/..">`
 *   resolves against the apex domain (404) instead of the repo subpath.
 *
 * Usage: `<Image src={assetSrc("/images/boutique/hero.jpg")} ... />`.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetSrc(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
