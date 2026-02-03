import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ZEKE BAWTRY — Developer",
  description: "Full-stack developer crafting elegant solutions that solve real problems and drive impact.",
  keywords: ["developer", "full-stack", "software engineer", "TypeScript", "React", "Next.js", "Zeke Bawtry"],
  authors: [{ name: "Zeke Bawtry" }],
  creator: "Zeke Bawtry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zekebawtry.vercel.app",
    title: "ZEKE BAWTRY — Developer",
    description: "Full-stack developer crafting elegant solutions that solve real problems and drive impact.",
    siteName: "Zeke Bawtry",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEKE BAWTRY — Developer",
    description: "Full-stack developer crafting elegant solutions that solve real problems and drive impact.",
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
        className={`${spaceGrotesk.variable} font-sans antialiased bg-[#191D19] text-[#F1F7ED]`}
      >
        {children}
      </body>
    </html>
  );
}
