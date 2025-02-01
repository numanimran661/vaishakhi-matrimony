import Link from "next/link";
import FAQSection from "@/app/components/landingPageSections/faq/FAQ";
import PricingPlans from "@/app/components/landingPageSections/membershipPlans/MembershipPlans";
import SuccessStories from "@/app/components/landingPageSections/successStories/SuccessStories";
import Image from "next/image";
import { rightArrowWithoutBg } from "@/app/components/common/allImages/AllImages";

const BreadcrumbMain = () => {
  return (
    <nav className="hidden sm:block mb-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-darkBlue leading-4 text-[14px]">
            Home
          </Link>
        </li>
        <Image src= {rightArrowWithoutBg} alt="right-arrow"/>
        <li className="text-primary text-[14px] leading-4">Membership Plans</li>
      </ul>
    </nav>
  );
};

const MembershipPlans = () => {
  return (
    <section className="md:px-12 lg:px-24 px-6 mx-auto bg-lightgray py-10">
      <BreadcrumbMain />
      <PricingPlans />
      <FAQSection />
      <SuccessStories />
    </section>
  );
};

export default MembershipPlans;
