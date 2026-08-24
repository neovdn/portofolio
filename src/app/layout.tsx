import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bernhardth Neo Videan · Full-Stack Developer",
  description:
    "A monochromatic, elegant, and highly-crafted interactive portfolio presenting Neo primarily through his work, experience, and developer activity.",
  authors: [{ name: "Bernhardth Neo Videan", url: "https://github.com/neovdn" }],
  icons: {
    icon: [
      { url: "/image/logo.webp", type: "image/webp" },
    ],
    shortcut: "/image/logo.webp",
    apple: "/image/logo.webp",
  },
  keywords: [
    "Bernhardth Neo Videan",
    "Neo",
    "Full-Stack Developer",
    "Agentic AI",
    "Next.js",
    "Supabase",
    "Flutter",
    "Portfolio",
    "Software Engineer",
  ],
  openGraph: {
    title: "Bernhardth Neo Videan · Full-Stack Developer",
    description:
      "A monochromatic, elegant, and highly-crafted interactive portfolio presenting Neo primarily through his work, experience, and developer activity.",
    type: "website",
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F5F5F3] text-[#111111] font-sans">
        <SmoothScrollProvider>
          <ToastProvider>{children}</ToastProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
