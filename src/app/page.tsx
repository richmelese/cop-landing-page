import type { Metadata } from "next";
import ActionAgenda from "@/components/ActionAgenda";
import ConferenceAreas from "@/components/ConferenceAreas";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import HostCity from "@/components/HostCity";
import KeyFigures from "@/components/KeyFigures";
import LeaderQuote from "@/components/LeaderQuote";
import Leaders from "@/components/Leaders";
import LeadersCarousel from "@/components/LeadersCarousel";
import NewsSection from "@/components/NewsSection";
import Reveal from "@/components/Reveal";
import StoryOfEthiopia from "@/components/StoryOfEthiopia";
import SuperApp from "@/components/SuperApp";
import Volunteer from "@/components/Volunteer";
import WhatIsCop from "@/components/WhatIsCop";

export const metadata: Metadata = {
  title: "COP32 Ethiopia | Addis Ababa 2027 UN Climate Summit",
  description:
    "COP32, the 32nd UN Climate Change Conference, hosted by Ethiopia in Addis Ababa in 2027. Explore the Action Agenda, host city, and visitor information.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HomeHero />
        <Reveal variant="up">
          <WhatIsCop />
        </Reveal>
        <Reveal variant="in">
          <LeaderQuote />
        </Reveal>
        <Reveal variant="up">
          <StoryOfEthiopia />
        </Reveal>
        <Reveal variant="up">
          <ActionAgenda />
        </Reveal>
        <Reveal variant="up">
          <ConferenceAreas />
        </Reveal>
        <Reveal variant="up">
          <HostCity />
        </Reveal>
        <Reveal variant="up">
          <Leaders />
        </Reveal>
        <Reveal variant="in">
          <KeyFigures />
        </Reveal>
        <Reveal variant="up">
          <SuperApp />
        </Reveal>
        <Reveal variant="up">
          <NewsSection />
        </Reveal>
        <Reveal variant="up">
          <Volunteer />
        </Reveal>
        <Reveal variant="in">
          <LeadersCarousel />
        </Reveal>
        <Reveal variant="up">
          <FAQSection />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
