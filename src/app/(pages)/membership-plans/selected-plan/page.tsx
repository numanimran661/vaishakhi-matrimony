import {
  radio,
  razorpayLogo,
  rightArrowWithoutBg,
  tick,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BreadcrumbMain = () => {
  return (
    <nav className="hidden sm:block mb-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-[#434343] font-semibold leading-4 text-[14px]"
          >
            Home
          </Link>
        </li>
        <Image src={rightArrowWithoutBg} alt="right-arrow" />
        <li className="text-[#F97E27] text-[14px] font-semibold leading-4">
          Membership Plans
        </li>
      </ul>
    </nav>
  );
};

const SelectedPlans = () => {
  return (
    <section className="px-4 md:px-0 max-w-[90%] w-full sm:max-w-[707px] mx-auto my-12 sm:my-24">
      <BreadcrumbMain />
      <div className="rounded-3xl sm:border-[0.5px] sm:border-gray px-4 sm:px-10 py-6 sm:py-10">
        <div className="flex flex-col">
          <h2 className="text-[20px] font-semibold text-[#1C264E]">
            Selected Plan
          </h2>

          {/* Plan Details */}
          <div className="flex flex-wrap gap-x-8 sm:gap-x-16 md:gap-x-0 md:justify-between items-center gap-y-6 rounded-3xl sm:border-[0.5px] sm:border-gray p-4 mt-6">
            <div className="flex flex-col gap-y-4">
              <h3 className="text-[#777777] text-[16px] font-semibold">
                Start Plan
              </h3>
              <p className="text-[#434343] text-[32px] font-semibold leading-10">
                ₹226.00
              </p>
            </div>

            {/* Plan Benefits */}
            <div className="flex flex-col gap-y-3">
              {[
                "3 months Duration",
                "213 Messages",
                "Live chat",
                "2 profile views",
              ].map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Image src={tick} alt="tick" className="size-8" />
                  <p className="text-[#777777] text-[14px] font-semibold leading-5">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="transparentOrange" label="In Use" />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col my-6">
          <h3 className="text-[20px] font-semibold text-[#1C264E] py-4 sm:py-7">
            Payment Methods
          </h3>
          <div className="flex justify-between items-center rounded-2xl sm:border-[0.5px] sm:border-gray p-3">
            <div className="flex gap-2 items-center">
              <Image src={radio} alt="radio-image" className="w-5 h-5" />
              <p className="text-[#434343] font-semibold text-[18px]">
                Razorpay
              </p>
            </div>
            <Image
              src={razorpayLogo}
              alt="razorpay-logo"
              className="w-14 h-6"
            />
          </div>
        </div>

        {/* Subscription Summary */}
        <div className="flex flex-col">
          <h3 className="text-[#1C264E] text-[20px] font-semibold mb-4 sm:mb-7">
            Subscription Summary
          </h3>
          <div className="flex flex-col gap-y-4 sm:gap-y-6 rounded-3xl sm:border-[0.5px] sm:border-gray p-5">
            {[
              { label: "Total Product Prices", value: "₹226.00" },
              { label: "Discount", value: "10%" },
              { label: "Valid for", value: "3 Months" },
            ].map((item, index) => (
              <p
                key={index}
                className="flex justify-between items-center text-[#434343] font-medium text-[16px]"
              >
                {item.label} <span>{item.value}</span>
              </p>
            ))}

            {/* Total Amount */}
            <p className="flex justify-between items-center text-[#1C264E] font-semibold text-[20px] px-4">
              Total{" "}
              <span className="text-[#F97E27] font-semibold text-[20px]">
                ₹226.00
              </span>
            </p>

            <Button label="Continue To Pay" className="w-full my-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedPlans;
