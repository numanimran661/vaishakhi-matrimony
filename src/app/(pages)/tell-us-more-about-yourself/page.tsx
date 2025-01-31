"use client"; // Ensure this is at the top

import { selectFields } from "@/app/components/common/allConstants/formConstants";
import {
  basicInfo,
  partnerPref,
  personalInfo,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import InputField from "@/app/components/common/inputFields/InputField";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { initialValuesProps } from "@/types/formTypes";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
const TellUsMoreAboutYourself: React.FC = () => {
  const router = useRouter()
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (value, action) => {
      console.log(value);
    },
  });

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
          <div className="px-1 sm:px-12 py-1 sm:py-12">
            <div className="flex justify-between items-center space-x-4 px-10 sm:px-16 mb-5">
              <Image
                src={basicInfo}
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
              />
              <Image
                src={personalInfo}
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
              />
              <Image
                src={partnerPref}
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
              />
            </div>
            <div className="w-[94%] sm:w-[83%] h-[8px] bg-gray rounded-full mb-4 mx-auto">
              <div className="bg-[#F97E27] h-[8px] rounded-full w-[8%] sm:w-[7%]"></div>
            </div>
            <div className="flex justify-between text-[14px] leading-5 sm:border-b sm:border-b-gray pb-12 font-semibold sm:px-8">
              <h3 className="text-[#F97E27] text-nowrap ml-7 sm:ml-4">
                Basic Info
              </h3>
              <h3 className="text-[#CFD6DC] ml-11 sm:ml-28">
                Personal Details
              </h3>
              <h3 className="text-[#ABB7C2] ml-12">Partner Preferences</h3>
            </div>
          </div>

          <div className="px-7">
            <h2 className="text-[24px] leading-[28.8px] text-[#1C264E] font-semibold px-4 mt-4 mb-8">
              Basic Info
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-y-6 gap-x-8 pb-20 relative xsm:ml-4"
            >
              <InputField
                label="Full Name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full sm:w-[47%]"
              />
              <DatePicker
                onChange={handleChange}
                value={values.dob}
                name="dob"
                label="Date Of Birth"
                className="w-full sm:w-[47%]"
              />

              {selectFields?.map((fieldData) => (
                <SelectField
                label= {fieldData.label}
                name={fieldData.name}
                value={fieldData.name}
                onChange={handleChange}
                options={fieldData.options}
                className="w-full sm:w-[47%]"
              />
              ))}
              <Button
                label="Continue"
                type="submit"
                className="w-full sm:w-[216px] h-[50px] bg-[#F97E27] text-white rounded-full absolute -bottom-20 -right-8"
                onClick={() => router.push("/tell-us-more-about-yourself/personal-details")}
              />
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default TellUsMoreAboutYourself;
