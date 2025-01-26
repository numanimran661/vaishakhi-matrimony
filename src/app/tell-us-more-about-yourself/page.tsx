"use client"; // Ensure this is at the top

import Image from "next/image";
import {
  basicInfo,
  partnerPref,
  personalInfo,
} from "../components/common/allImages/AllImages";
import React, { useState } from "react";
import { Form, Formik, Field, FieldProps } from "formik"; // Import Field
import * as Yup from "yup";
import InputField from "../components/common/inputFields/InputField";
import Button from "../components/common/buttons/Button";
import SelectField from "../components/common/inputFields/SelectField";
import DatePicker from "../components/common/inputFields/DatePicker";

const TellUsMoreAboutYourself: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // Handle input change for fields like "fullName"
      console.log(`Changed ${field}:`, e.target.value);
    };

  const handleDateChange = (field: string) => (date: Date) => {
    // Handle date picker change
    console.log(`Changed ${field}:`, date);
  };

  return (
    <div className="size-full mt-16">
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
        <main className="w-full rounded-3xl border-[0.5px] border-gray mt-24 mb-40">
          <div className="px-6 py-12">
            <div className="flex justify-between items-center space-x-4 px-16 mb-5">
              <Image
                src={basicInfo}
                alt={"logo"}
                width={40}
                height={40}
                loading="lazy"
              />
              <Image
                src={personalInfo}
                alt={"logo"}
                width={40}
                height={40}
                loading="lazy"
              />
              <Image
                src={partnerPref}
                alt={"logo"}
                width={40}
                height={40}
                loading="lazy"
              />
            </div>
            <div className="w-[83%] h-[8px] bg-gray rounded-full mb-4 mx-auto">
              <div
                className="bg-[#F97E27] h-[8px] rounded-full"
                style={{ width: "7%" }}
              ></div>
            </div>
            <div className="flex justify-between text-[14px] leading-5 border-b border-b-gray pb-12 font-semibold px-8">
              <h3 className="text-[#F97E27] ml-4">Basic Info</h3>
              <h3 className="text-[#CFD6DC] ml-16">Personal Details</h3>
              <h3 className="text-[#ABB7C2]">Partner Preferences</h3>
            </div>
          </div>

          <h2 className="text-[24px] leading-[28.8px] text-[#1C264E] font-semibold px-[78px] mt-4 mb-8">
            Basic Info
          </h2>
          <Formik
            initialValues={{
              fullName: "John Doe",
              age: "option1",
              gender: "choice1",
              height: "option1",
              dob: "1990-01-01",
              maritalStatus: "option1",
              religion: "choice1",
              motherTongue: "option1",
              cast: "choice1",
              city: "choice1",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Full Name is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form Submitted", values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-wrap gap-6 px-[78px] pb-20 relative">
                <Field
                  name="fullName"
                  render={({ field, meta }: FieldProps) => (
                    <InputField
                      label="Full Name"
                      {...field}
                      placeholder="Full Name"
                      onChange={handleInputChange("fullName")}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="age"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Age"
                      {...field}
                      options={[
                        { value: "option1", label: "18-25" },
                        { value: "option2", label: "26-35" },
                        { value: "option3", label: "36-45" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="gender"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Gender"
                      {...field}
                      options={[
                        { value: "choice1", label: "Male" },
                        { value: "choice2", label: "Female" },
                        { value: "choice3", label: "Other" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="height"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Height"
                      {...field}
                      options={[
                        { value: "option1", label: "5'5" },
                        { value: "option2", label: "5'8" },
                        { value: "option3", label: "6'0" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="dob"
                  render={({ field, meta }: FieldProps) => (
                    <DatePicker
                      label="Date Of Birth"
                      {...field}
                      // onChange={handleDateChange("dob")}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="maritalStatus"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Marital Status"
                      {...field}
                      options={[
                        { value: "option1", label: "Single" },
                        { value: "option2", label: "Married" },
                        { value: "option3", label: "Divorced" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="religion"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Religion"
                      {...field}
                      options={[
                        { value: "choice1", label: "Christian" },
                        { value: "choice2", label: "Muslim" },
                        { value: "choice3", label: "Hindu" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="motherTongue"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Mother Tongue"
                      {...field}
                      options={[
                        { value: "option1", label: "English" },
                        { value: "option2", label: "Spanish" },
                        { value: "option3", label: "Hindi" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="cast"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="Cast"
                      {...field}
                      options={[
                        { value: "choice1", label: "General" },
                        { value: "choice2", label: "OBC" },
                        { value: "choice3", label: "SC/ST" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Field
                  name="city"
                  render={({ field, meta }: FieldProps) => (
                    <SelectField
                      label="City"
                      {...field}
                      options={[
                        { value: "choice1", label: "New York" },
                        { value: "choice2", label: "Los Angeles" },
                        { value: "choice3", label: "Chicago" },
                      ]}
                      // onChange={handleSelectChange}
                      className="w-full sm:w-[47%]"
                    />
                  )}
                />
                <Button
                  label="Continue"
                  type="submit"
                  className="w-full sm:w-[216px] h-[50px] bg-[#F97E27] text-white rounded-full absolute -bottom-20 right-0"
                />
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default TellUsMoreAboutYourself;
