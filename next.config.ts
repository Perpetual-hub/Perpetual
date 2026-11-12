import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  env: {
    // Deals are shown for a rolling three calendar years, fixed when the site is built:
    // in 2026 that is 2024 to 2026; from January 2027 it becomes 2025 to 2027.
    DEALS_FROM: `${new Date().getFullYear() - 2}-01-01`,
  },
  // "Technologies" were renamed "Sectors": keep old links working.
  async redirects() {
    return [
      { source: "/technologies/:tech", destination: "/sectors/:tech", permanent: true },
      { source: "/technologies", destination: "/statistics", permanent: true },
      // "Methodology" was renamed "Disclosure".
      { source: "/methodology", destination: "/disclosure", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
