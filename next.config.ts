import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Private Cirques audit review page (static HTML in public/). proxy.ts still
     gates it behind the Cirques password because it lives under /cirques-experience. */
  async rewrites() {
    return [
      {
        source: "/cirques-experience/audit-review",
        destination: "/cirques-experience/audit-review/index.html",
      },
    ];
  },
};

export default nextConfig;
