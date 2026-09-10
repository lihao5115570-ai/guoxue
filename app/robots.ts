import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/user", "/bazi/result", "/marriage/result", "/divination/result", "/fortune/"]
    },
    sitemap: "https://chanxinge.top/sitemap.xml"
  };
}
