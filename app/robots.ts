import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{userAgent: "*", allow: "/", disallow: ["/cirques-experience", "/cirques-access", "/cuepa-hub", "/api/"]}],
    sitemap: "https://www.makingcuepa.com/sitemap.xml"
  };
}
