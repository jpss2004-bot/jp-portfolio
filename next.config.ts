import type { NextConfig } from "next";

const retired = ["adaptive-traffic-ai", "cyber-reporting-assistant"];

const nextConfig: NextConfig = {
  images: { qualities: [75, 85] },
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      // The old Vercel address sends everyone to the real domain.
      { source: "/:path*", has: [{ type: "host", value: "jp-portfolio-beta.vercel.app" }], destination: "https://jpsamanosuarez.com/:path*", permanent: true },
      { source: "/", destination: "/en", permanent: false },
      ...retired.map((slug) => ({ source: `/:locale(en|es)/projects/${slug}`, destination: "/:locale#explorations", permanent: true })),
      { source: "/projects/:slug", destination: "/en/projects/:slug", permanent: true },
      { source: "/resume.pdf", destination: "/resume/jp-samano-resume-en.pdf", permanent: true },
    ];
  },
  async rewrites() {
    return { beforeFiles: [{ source: "/summer-2026", destination: "/summer-2026.html" }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;
