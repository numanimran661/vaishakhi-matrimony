import React from "react";
import {
  AdvanceSearchIcon,
  MatchingIcon,
  MobileFriendlyIcon,
  SecureProfileIcon,
} from "../../common/allImages/AllImages";
import Image from "next/image";

const OurFeatures: React.FC = () => {
  const steps = [
    {
      icon: SecureProfileIcon,
      title: "Secure Profiles",
      description:
        "Your privacy and security are our priority. All profiles are verified.",
    },
    {
      icon: AdvanceSearchIcon,
      title: "Advanced Search",
      description:
        "Our filters help you find matches that fit your preferences efficiently.",
    },
    {
      icon: MatchingIcon,
      title: "Matching",
      description:
        "We analyze your preferences for better matches.",
    },
    {
      icon: MobileFriendlyIcon,
      title: "Mobile-Friendly",
      description: "Use our mobile app to browse matches easily on your smartphone.",
    },
  ];
  return (
    <section className="bg-gray-50 md:px-12 lg:px-20 mx-auto md:py-16 border-b border-gray">
      <div className="text-left">
        <h2 className="text-sm font-medium text-normal uppercase">our features</h2>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">Why Choose us</h3>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="px-8 py-12 border border-gray rounded-lg text-center"
          >
            <div className="flex justify-center items-center h-32 w-32 mx-auto bg-orange-100 rounded-full">
              <Image
                src={step.icon}
                alt={`${step.title} icon`}
                className="h-16 w-16"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mt-4">
              {step.title}
            </h4>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurFeatures;
