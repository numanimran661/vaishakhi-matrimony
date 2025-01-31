import FAQSection from "@/app/components/landingPageSections/faq/FAQ";
import StartNow from "@/app/components/landingPageSections/startNow/StartNow";
import React from "react";
import AboutBanner from "./components/AboutBanner";
import MissionVision from "./components/MissionVision";
import CoreValues from "./components/CoreValues";
import FounderSection from "./components/FounderSection";

const page = () => {
  return (
    <>
      <AboutBanner />
      <MissionVision />
      <CoreValues />
      <FounderSection />
      <FAQSection />
      <StartNow />
    </>
  );
};

export default page;
