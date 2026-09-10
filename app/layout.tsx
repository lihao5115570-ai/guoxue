import type { Metadata } from "next";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { CursorAura } from "@/components/CursorAura";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://chanxinge.top"),
  title: "禅心阁｜佛家祈福、求灵签、黄历、解梦与静心禅坐",
  description: "禅心阁是面向中文用户的佛家祈福与东方文化平台，提供为家人祈福、佛前供灯、今日黄历、求灵签、八字精批、周公解梦、宝宝起名、六爻占卜和静心禅坐。",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <CursorAura />
        <AmbientBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
