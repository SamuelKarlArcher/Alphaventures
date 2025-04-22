import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer"; // ✅ Footer
import Navbar from "@/components/Navbar"; // ✅ Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Alpha Ventures Group",
    template: "%s | Alpha Ventures Group",
  },
  description:
    "Transform your online presence with our expert website development services.",
  openGraph: {
    title: "Alpha Ventures Group",
    description:
      "Transform your online presence with our expert website development services.",
    url: "https://alphaventurergroup.biz",
    images: [{ url: "/Alpha_Ventures_finale.png" }],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#800080",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* ✅ Add Navbar here */}
        {children}
        <Footer /> {/* ✅ Footer stays at the bottom */}
      </body>
    </html>
  );
}
