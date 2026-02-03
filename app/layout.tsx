import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zeke Bawtry | Full-Stack Developer",
  description: "I'm Zeke — a developer building software with purpose. Crafting code that solves real problems and drives impact.",
  keywords: ["developer", "full-stack", "software engineer", "open source", "bounty hunter", "Zeke Bawtry"],
  authors: [{ name: "Zeke Bawtry" }],
  creator: "Zeke Bawtry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zekebawtry.vercel.app",
    title: "Zeke Bawtry | Full-Stack Developer",
    description: "I'm Zeke — a developer building software with purpose. Crafting code that solves real problems and drives impact.",
    siteName: "Zeke Bawtry",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeke Bawtry | Full-Stack Developer",
    description: "I'm Zeke — a developer building software with purpose. Crafting code that solves real problems and drives impact.",
    creator: "@zekebawt",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} font-sans antialiased bg-[#181b18] text-[#f1f4f1]`}
      >
        {children}
      </body>
    </html>
  );
}
