import type {MetadataRoute} from "next";

/* Private pages (/cirques-experience, /cirques-access, /cuepa-hub) are kept out of search by
   their own noindex (page metadata + X-Robots-Tag from proxy.ts) and the Cirques password,
   so they are not named here: robots.txt is public and would only advertise them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{userAgent: "*", allow: "/", disallow: ["/api/"]}],
    sitemap: "https://www.makingcuepa.com/sitemap.xml"
  };
}
