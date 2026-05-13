/**
 * Next.js config — supports two deploy targets:
 *   1. Static export to GitHub Pages (default when BUILD_TARGET=github)
 *      → output: 'export', images.unoptimized, basePath, trailingSlash
 *   2. Standard Vercel/Node deploy (when no env set)
 *      → next/image optimization on, no basePath
 *
 * Toggle with the BUILD_TARGET environment variable.
 */
const isGitHubPages = process.env.BUILD_TARGET === "github";
const repoName = "rossovino-site";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: `/${repoName}`,
        // GH Pages serves /page/ rather than /page — keep links consistent.
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048],
        },
      }),
};

export default nextConfig;
