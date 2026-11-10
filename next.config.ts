import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // "Technologies" were renamed "Sectors": keep old links working.
  async redirects() {
    return [
      { source: "/technologies/:tech", destination: "/sectors/:tech", permanent: true },
      { source: "/technologies", destination: "/statistics", permanent: true },
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
