import BookAccommodation from "@/components/BookAccommodation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Rooms from "@/components/Rooms";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Welcome />
      <BookAccommodation />
      <Rooms />
      <Footer />
    </main>
  );
}
