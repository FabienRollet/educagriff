"use client";
import HeroSection from "./components/HeroSection";
import ChoisirEducagriff from "./components/choisirEducagriff";
import SectionBienvenue from "./components/SectionBienvenue";
import QuestionsSection from "./components/QuestionsSection";
// import MapSection from "./components/MapSection";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <SectionBienvenue />
      <ChoisirEducagriff />
      <QuestionsSection />
      {/* <MapSection /> */}
    </main>
  );
}
