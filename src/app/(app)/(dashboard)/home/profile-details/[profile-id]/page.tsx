"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  BriefcaseIcon,
  DummyProfile,
  FemalePlaceholder,
  LocationMarker,
  MalePlaceholder,
  MessageIcon,
  ReqSendIcon,
  VerifiedIcon,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import Slider from "react-slick";
import GlobalModal from "@/app/components/common/modals/InitialModal";
import Link from "next/link";

const ProfileDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileImages = [MalePlaceholder, FemalePlaceholder, DummyProfile];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode) => (
      <div className="dots-container">
        <ul>{dots}</ul>
      </div>
    ),
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <ul className="flex items-center gap-2 text-sm my-8">
        <li>
          <Link href="/home" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li className="text-gray-400">
          <span>›</span>
        </li>
        <li>
          <span className="text-primary">Profile Detail</span>
        </li>
      </ul>

      <div className="bg-white border border-gray rounded-2xl py-3 md:py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section */}
        <div className="space-y-4 border-r border-gray px-3 md:px-6 lg:px-10">
          <div className="relative rounded-3xl overflow-hidden mb-10">
            <Slider {...sliderSettings}>
              {profileImages.map((image, index) => (
                <div key={index} className="">
                  <Image
                    src={image}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-96 object-cover"
                    // layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </Slider>
            <div
              className={`text-sm text-white p-2 rounded-full absolute top-3 right-2 bg-gray`}
            >
              <VerifiedIcon
                width={20}
                height={20}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">Gabrielle Fiana</h2>
            <p className="text-sm text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua{" "}
              <span className="text-orange-500 cursor-pointer">
                see more...
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-sm bg-slate-100 p-2 rounded-lg">
              <BriefcaseIcon />
              Sales Manager
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-1 bg-slate-100 p-2 rounded-lg">
              <LocationMarker />
              Mumbai, India
            </span>
          </div>

          <div>
            <h3 className="font-bold text-lg mt-4">Basic Information</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid grid-cols-2 gap-5">
              <li className="flex flex-col">
                <span className="text-normal mb-1">Name</span> Ayesha Khan
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Age</span> 23
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Marital Status</span> Never
                Married
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Height</span> 6 Ft 7 Inch
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Profile Created for</span>{" "}
                Own
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 gap-6 px-4 md:px-8">
          {/* Contact Details */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Contact Details</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid grid-cols-2 gap-5">
              <li className="flex flex-col">
                <span className="text-normal mb-1">Phone Number:</span> +91
                34********
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Email:</span>{" "}
                ******@email.com
              </li>
            </ul>
          </div>

          {/* Location Information */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Location Information</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid grid-cols-2 gap-5">
              <li className="flex flex-col">
                <span className="text-normal mb-1">Present Address:</span>{" "}
                Gwalior, Madhya Pradesh, India
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Permanent Address:</span>{" "}
                Gwalior, Madhya Pradesh, India
              </li>
            </ul>
          </div>

          {/* Education Career */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Education Career</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid grid-cols-2 gap-5">
              <li className="flex flex-col">
                <span className="text-normal mb-1">Highest Education:</span>{" "}
                M.Phil Chemistry
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Employed in:</span> Not
                Working
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Occupation:</span> Student
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Annual Income:</span> 2 Lac
              </li>
            </ul>
          </div>

          {/* Partner Expectation */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Partner Expectation</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid grid-cols-2 gap-5">
              <li className="flex flex-col">
                <span className="text-normal mb-1">Marital Expectation:</span>{" "}
                Never Married
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Age:</span> 25 to 40
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Height:</span> 5 Ft 8 Inch
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Education:</span> Business
                Administrator
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Mother Tongue:</span> Hindi
              </li>
              <li className="flex flex-col">
                <span className="text-normal mb-1">Annual Income:</span> Rs.
                20-35 Lakh
              </li>
            </ul>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              icon={ReqSendIcon}
              label="Send Request"
              variant="dark"
              onClick={() => setIsModalOpen(true)}
            />
            <Button icon={MessageIcon} label="Chat Now" />
          </div>
        </div>
      </div>
      <GlobalModal
        isOpen={isModalOpen}
        title="Upgrade Membership"
        onClose={() => setIsModalOpen(false)}
      >
        <p>
          Become a premium member to view contacts of this profile and unlock
          all the amazing features we offer!
        </p>
        <div className="flex justify-end mt-4 gap-4 border-t border-gray pt-3">
          <Button
            onClick={() => setIsModalOpen(false)}
            label="Cancel"
            variant="light"
          />
          <Button label="Upgrade Now" />
        </div>
      </GlobalModal>
    </div>
  );
};

export default ProfileDetail;
