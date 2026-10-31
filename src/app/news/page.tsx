import type { Metadata } from "next";
import DetailHero from "@/components/DetailHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsPageClient from "./NewsPageClient";

export const instant = false;

export const metadata: Metadata = {
  title: "News & Announcements | COP32 Ethiopia",
  description: "The latest announcements and updates from the COP32 Presidency.",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <DetailHero
          eyebrow="News"
          title="News & Announcements"
          summary="The latest announcements and updates from the COP32 Presidency."
          image="view"
          crumbs={[{ label: "News & Announcements" }]}
        />
        <NewsPageClient />
      </main>
      <Footer />
    </>
  );
}
