import type { Metadata } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/outfit";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accommodation | COP32 Ethiopia",
  description:
    "Official hotels, recommended areas and the official accommodation booking platform for COP32 in Addis Ababa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-white font-sans text-cop-ink">{children}</body>
    </html>
  );
}
