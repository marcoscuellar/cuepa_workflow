import type {MetadataRoute} from "next";

const BASE = "https://www.makingcuepa.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/contact", "/help"].map((p) => ({url: BASE + p, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.6}));
}
