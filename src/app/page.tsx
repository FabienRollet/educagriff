"use client";
import HeroSection from "./components/HeroSection";
import ChoisirEducagriff from "./components/choisirEducagriff";
import SectionBienvenue from "./components/SectionBienvenue";
import QuestionsSection from "./components/QuestionsSection";
import Tarifs from "./tarifs/page";
// import MapSection from "./components/MapSection";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <SectionBienvenue />
      <ChoisirEducagriff />
      <QuestionsSection />
      <Tarifs />
      {/* <MapSection /> */}
    </main>
  );
}
