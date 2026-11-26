import type { NextConfig } from "next";
import { windowStart } from "./lib/window";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  env: {
    // Deals are shown for a rolling five years, counted back from the day the site is built.
    // The daily prune workflow deletes older records and its commit triggers a fresh build.
    DEALS_FROM: windowStart(),
  },
  // "Technologies" were renamed "Sectors": keep old links working.
  async redirects() {
    return [
      { source: "/technologies/:tech", destination: "/sectors/:tech", permanent: true },
      { source: "/technologies", destination: "/statistics", permanent: true },
      // "Methodology" was renamed "Disclosure".
      { source: "/methodology", destination: "/disclosure", permanent: true },
      // The Projects section was removed: send old links to the deal tracker.
      { source: "/projects", destination: "/deals", permanent: true },
      { source: "/projects/:slug*", destination: "/deals", permanent: true },
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
