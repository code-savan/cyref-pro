import type { MetadataRoute } from "next";

const routes = ["", "/about", "/contact", "/privacy", "/terms", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://cyref.pro${route}`,
    lastModified: new Date("2026-07-30"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
