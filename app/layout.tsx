import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ZEKE BAWTRY — Security Researcher",
  description: "Security researcher specializing in AI/ML infrastructure. Finding what others miss.",
  keywords: ["security researcher", "bug bounty", "AI security", "ML infrastructure", "vulnerability research", "Zeke Bawtry"],
  authors: [{ name: "Zeke Bawtry" }],
  creator: "Zeke Bawtry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zekebawtry.vercel.app",
    title: "ZEKE BAWTRY — Security Researcher",
    description: "Security researcher specializing in AI/ML infrastructure. Finding what others miss.",
    siteName: "Zeke Bawtry",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEKE BAWTRY — Security Researcher",
    description: "Security researcher specializing in AI/ML infrastructure. Finding what others miss.",
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
        className={`${spaceGrotesk.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-[#191D19] text-[#F1F7ED]`}
      >
        {children}
      </body>
    </html>
  );
}
