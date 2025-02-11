"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import { GoogleLogo } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/app/lib/api/auth/route";

interface SignUpValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const initialValues: SignUpValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Form submitted", values); // Debug log
        setError(null);
        try {
          const response = await register(values);
          if (response?.token) {
            router.push("/home");
          } else {
            setError("Invalid credentials");
          }
        } catch (err: any) {
          setError(err.response?.data?.error || "Login failed");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <h2 className="text-3xl font-bold mb-7">Create new Account</h2>
          <Field
            as={InputField}
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            className="mt-4"
            error={errors.name}
            touched={touched.name}
          />
          <Field
            as={InputField}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            className="mt-4"
            error={errors.email}
            touched={touched.email}
          />
          <Field
            as={InputField}
            label="Phone"
            name="phone"
            type="text"
            placeholder="Phone"
            className="mt-4"
            error={errors.phone}
            touched={touched.phone}
          />
          <Field
            as={InputField}
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            className="mt-4"
            error={errors.password}
            touched={touched.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            label="Sign Up"
            className="mt-4 w-full"
          />
          <Button
            type="button"
            label="Sign Up with google"
            icon={GoogleLogo}
            className="mt-4 w-full bg-lightBlue"
            variant="light"
            onClick={() => router.push("/tell-us-more-about-yourself")}
          />
          <div className="mt-4 font-regular">
            <span>Already have an account?</span>{" "}
            <Link href={"/auth/login"} className="text-primary">
              Log in
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
