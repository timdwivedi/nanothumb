import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NanoThumb - Revolutionary AI-Powered Thumbnails",
  description: "Generate breathtaking YouTube thumbnails in seconds. Powered by The Nano Banana Pro API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid-bg"></div>
        {children}
      </body>
    </html>
  );
}
