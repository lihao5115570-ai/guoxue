import type { MetadataRoute } from "next";
import { articles, topicItems, wikiItems } from "@/lib/content/articles";
import { classicItems } from "@/lib/content/classics";
import { fengshuiClassicChapters } from "@/lib/content/fengshuiClassics";
import { sizhuClassicChapters } from "@/lib/content/sizhuClassics";
import { calendarArticles, celebrityArticles } from "@/lib/content/importedArticles";
import { baziToolNav, buddhistSupportNav } from "@/lib/content/buddhist";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const publicRoutes = ["/", "/bazi", "/wuxing", "/wealth", "/love", "/fortune", "/marriage", "/divination", "/chenggu", "/calendar", "/wiki", "/topics", "/articles", "/celebrities", "/classics", "/classics/fengshui"];
  return [
    ...publicRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...[...baziToolNav, ...buddhistSupportNav].map((item) => ({ url: `${base}${item.href}`, lastModified: new Date() })),
    ...wikiItems.map((item) => ({ url: `${base}/wiki/${item.slug}`, lastModified: new Date() })),
    ...classicItems.map((item) => ({ url: `${base}/classics/${item.slug}`, lastModified: new Date() })),
    ...fengshuiClassicChapters.map((item) => ({ url: `${base}/classics/fengshui/${item.bookSlug}/${item.chapterSlug}`, lastModified: new Date() })),
    ...sizhuClassicChapters.map((item) => ({ url: `${base}/classics/${item.bookSlug}/${item.chapterSlug}`, lastModified: new Date() })),
    ...celebrityArticles.map((item) => ({ url: `${base}/celebrities/${item.slug}`, lastModified: new Date() })),
    ...calendarArticles.map((item) => ({ url: `${base}/calendar/articles/${item.slug}`, lastModified: new Date() })),
    ...topicItems.map((item) => ({ url: `${base}/topics/${item.slug}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${base}/articles/${article.slug}`, lastModified: new Date(article.publishedAt) }))
  ];
}
