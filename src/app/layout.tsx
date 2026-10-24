import type { Metadata } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/outfit";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "COP32 Ethiopia",
  },
  description: "COP32, the 32nd UN Climate Change Conference, hosted by Ethiopia in Addis Ababa in 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-white font-sans text-cop-ink">{children}</body>
    </html>
  );
}
