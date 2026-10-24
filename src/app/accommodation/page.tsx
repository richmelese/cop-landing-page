import type { Metadata } from "next";
import AccommodationInfo from "@/components/AccommodationInfo";
import BookAccommodation from "@/components/BookAccommodation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import VisitorNav from "@/components/VisitorNav";

export const metadata: Metadata = {
  title: "Accommodation | COP32 Ethiopia",
  description:
    "Official hotels, recommended areas and the official accommodation booking platform for COP32 in Addis Ababa.",
};

export default function AccommodationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero />
        <VisitorNav current="Accommodation" />
        <AccommodationInfo />
        <BookAccommodation />
      </main>
      <Footer />
    </>
  );
}
