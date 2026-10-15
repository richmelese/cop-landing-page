import AccommodationInfo from "@/components/AccommodationInfo";
import BookAccommodation from "@/components/BookAccommodation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import KeyFigures from "@/components/KeyFigures";
import PageHero from "@/components/PageHero";
import VisitorNav from "@/components/VisitorNav";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero />
        <VisitorNav />
        <AccommodationInfo />
        <BookAccommodation />
        <KeyFigures />
      </main>
      <Footer />
    </>
  );
}
