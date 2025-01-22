import AboutSection from "./components/landingPageSections/about/About";
import Banner from "./components/landingPageSections/banner/Banner";
import FAQSection from "./components/landingPageSections/faq/FAQ";
import PricingPlans from "./components/landingPageSections/membershipPlans/MembershipPlans";
import OurFeatures from "./components/landingPageSections/ourFeatures/OurFeatures";
import ProcessSection from "./components/landingPageSections/process/Process";
import StartNow from "./components/landingPageSections/startNow/StartNow";
import SuccessStories from "./components/landingPageSections/successStories/SuccessStories";

const MainPage = () => {
  return (
    <>
    <Banner />
    <AboutSection />
    <ProcessSection />
    <SuccessStories />
    <OurFeatures />
    <PricingPlans />
    <FAQSection />
    <StartNow />
    </>
  );
};

export default MainPage;
