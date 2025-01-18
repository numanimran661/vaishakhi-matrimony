import React from "react";
import {
  BrowseMatchIcon,
  ChatIcon,
  CreateProfileIcon,
  FindLoveIcon,
} from "../../common/allImages/AllImages";
import Image from "next/image";

const ProcessSection: React.FC = () => {
  const steps = [
    {
      icon: CreateProfileIcon,
      title: "Create Profile",
      description:
        "Set up your profile with photos, preferences, and a brief intro.",
    },
    {
      icon: BrowseMatchIcon,
      title: "Browse Matches",
      description:
        "Find matches that fit your preferences with our search filters.",
    },
    {
      icon: ChatIcon,
      title: "Connect & Chat",
      description:
        "Connect with interesting people through our secure messaging.",
    },
    {
      icon: FindLoveIcon,
      title: "Find Love",
      description: "Build connections & discover your ideal match.",
    },
  ];
  return (
    <section className="bg-gray-50 md:px-12 lg:px-20 px-8 mx-auto md:py-16 py-10 border-b border-gray">
      <div className="text-center">
        <h2 className="text-sm font-medium text-normal uppercase">process</h2>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">How it works</h3>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="px-8 py-12 border border-gray rounded-lg text-center"
          >
            <div className="flex justify-center items-center lg:h-32 lg:w-32 h-24 w-24 mx-auto bg-orange-100 rounded-full">
              <Image
                src={step.icon}
                alt={`${step.title} icon`}
                className="lg:h-16 lg:w-16 w-10 h-10"
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

export default ProcessSection;
