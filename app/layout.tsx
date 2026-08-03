import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0910",
};

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spectralang.org"),
  title: "SpectraLang — AI/ML language and API platform",
  description: site.tagline,
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "SpectraLang",
    description: site.tagline,
    url: "https://spectralang.org",
    siteName: "SpectraLang",
    images: [{ url: "/logo.svg", width: 1254, height: 1254, alt: "SpectraLang logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SpectraLang",
    description: site.tagline,
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
