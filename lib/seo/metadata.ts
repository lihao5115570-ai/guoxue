import type { Metadata } from "next";

const siteName = "禅心阁";
const baseUrl = "https://chanxinge.top";

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const canonical = `${baseUrl}${path}`;

  return {
    title: `${title} - ${siteName}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} - ${siteName}`,
      description,
      url: canonical,
      siteName,
      type: "website"
    }
  };
}

export function privateResultMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} - ${siteName}`,
    description,
    robots: { index: false, follow: false }
  };
}
