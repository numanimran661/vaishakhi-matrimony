"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-7xl">
        <h2 className="text-center font-medium text-normal uppercase">Contact Us</h2>
        <h2 className="text-2xl md:text-4xl font-bold mb-7 text-center">
          Get in touch today
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
          adipiscing tincidunt interdum tellus du.
        </p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            message: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string().matches(
              /^[0-9]{10}$/,
              "Phone must be 10 digits"
            ),
            message: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-5">

              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Your Name"
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Your Email"
              />
              <InputField
                label="Phone"
                name="phone"
                type="text"
                placeholder="Your Phone Number"
              />
              </div>
              <InputField
                label="Message"
                name="message"
                type="textarea"
                placeholder="Your Message"
                className="mt-4"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                label="Send message"
                className="mt-7 w-full sm:w-auto"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactPage;
