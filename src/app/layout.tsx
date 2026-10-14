import type { Metadata } from "next";
import { Noto_Serif, Open_Sans, Outfit } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COP Hotel Resort",
  description: "Stylish, modern hotels and resorts with authentic hospitality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${openSans.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-600">
        {children}
      </body>
    </html>
  );
}
