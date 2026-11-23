import type {MetadataRoute} from "next";

const BASE = "https://www.makingcuepa.com";
const PAGES = ["/", "/practice", "/room-report", "/trust", "/faq", "/contact", "/help"];
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({url: BASE + p, lastModified, changeFrequency: "monthly", priority: p === "/" ? 1 : p === "/contact" || p === "/help" ? 0.6 : 0.8}));
}
