import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/join", "/waiver", "/privacy-policy", "/terms"],
      },
    ],
    sitemap: "https://traditionsfieldclub.com/sitemap.xml",
    host: "https://traditionsfieldclub.com",
  };
}
