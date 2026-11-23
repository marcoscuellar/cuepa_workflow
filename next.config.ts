import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Private Cirques pages: proposal + website audit (static HTML in public/). proxy.ts still
     gates it behind the Cirques password because it lives under /cirques-experience. */
  async rewrites() {
    return [
      { source: "/cirques-experience/proposal", destination: "/cirques-experience/proposal/index.html" },
      { source: "/cirques-experience/website-audit", destination: "/cirques-experience/website-audit/index.html" },
      /* old link, kept so anything already shared still opens the proposal */
      { source: "/cirques-experience/audit-review", destination: "/cirques-experience/proposal/index.html" },
    ];
  },
};

export default nextConfig;
