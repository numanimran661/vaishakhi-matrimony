"use client";
import {
  basicInfo,
  partnerPref,
  personalInfo,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import { initialValuesProps } from "@/types/formTypes";
import { useFormik } from "formik";
import { useState } from "react";
import BasicInfoForm from "./components/BasicInfo";
import PersonalDetailForm from "./components/PersonalDetailForm";
import PartnerPreferences from "./components/PartnerPreferencesForm";

const initialValues: initialValuesProps = {
  fullName: "",
  age: "",
  gender: "",
  height: "",
  dob: "",
  maritalStatus: "",
  religion: "",
  motherTongue: "",
  cast: "",
  city: "",
};
const steps = [
  { id: 1, label: "Basic Info", Icon: basicInfo },
  { id: 2, label: "Personal Details", Icon: personalInfo },
  { id: 3, label: "Partner Preferences", Icon: partnerPref },
];
const TellUsMoreAboutYourself: React.FC = () => {
  const [step, setStep] = useState(1);
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (value, action) => {
      console.log(value);
    },
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(e);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
  };

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="size-full mt-16">
      <div className="w-full max-w-[972px] mx-auto px-4">
        <header className="text-center">
          <h1 className="text-[34px] font-bold text-[#1C264E] leading-[46px]">
            Tell Us About Yourself
          </h1>
          <h2 className="text-[#434343] text-[18px] leading-[30px] max-w-[566px] mx-auto">
            Please fill the form below to receive a personalized match. Add as
            much detail as needed.
          </h2>
        </header>
        <main className="w-full rounded-3xl sm:border-[0.5px] sm:border-gray mt-14 mb-40">
          <div className="px-1 sm:px-12 py-1 sm:py-9">
            {/* Progress Icons */}
            <div className="flex justify-between items-center space-x-4 px-10 sm:px-16 mb-5">
              {steps.map(({ id, Icon }) => {
                const isActive = id <= step;
                return (
                  <Icon
                    key={id}
                    className={`${
                      isActive
                        ? "text-white stroke-white"
                        : "text-gray stroke-gray"
                    }`}
                    style={{
                      fill: isActive ? "var(--themeColor)" : "var(--bgLight)",
                    }}
                  />
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="w-[94%] sm:w-[83%] h-[8px] bg-gray rounded-full mb-4 mx-auto">
              <div
                className="bg-primary h-[8px] rounded-full transition-all duration-300"
                style={{
                  width: `${
                    step === 1 ? 5 : ((step - 1) / (steps.length - 1)) * 100
                  }%`,
                }}
              ></div>
            </div>

            {/* Step Titles */}
            <div className="flex justify-between text-[14px] leading-5 sm:border-b sm:border-b-gray pb-6 font-semibold sm:px-8">
              {steps.map(({ id, label }) => (
                <h3
                  key={id}
                  className={`text-nowrap ${
                    step >= id ? "text-[#F97E27]" : "text-[#ABB7C2]"
                  }`}
                >
                  {label}
                </h3>
              ))}
            </div>
          </div>

          <div className="px-7">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-y-6 gap-x-8 pb-20 relative"
            >
              {step === 1 && (
                <BasicInfoForm
                  values={values}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              )}

              {step === 2 && (
                <PersonalDetailForm
                  values={values}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              )}
              {step === 3 && (
                <PartnerPreferences
                  values={values}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                />
              )}

              {/* Navigation Buttons */}
              <div className="w-full flex justify-between mt-6">
                <div>
                  {step > 1 && (
                    <Button
                      label="Back"
                      type="button"
                      variant="light"
                      onClick={prevStep}
                    />
                  )}
                </div>

                <Button
                  label={step === steps.length ? "Submit" : "Continue"}
                  type="button"
                  onClick={step === steps.length ? handleSubmit : nextStep}
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default TellUsMoreAboutYourself;
