"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import { GoogleLogo } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-3xl font-bold mb-7">Log in to your account</h2>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            className="mt-4"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            className="mt-4"
          />
          <div className="flex justify-end mt-3">
            <p className="text-primary font-regular cursor-pointer" onClick={() => router.push("/auth/reset-password")}>Forgot Password?</p>
          </div>
          <Button
            // type="submit"
            disabled={isSubmitting}
            label="Log in"
            className="mt-4 w-full"
            onClick={() => router.push("/home")}
          />
          <Button
            type="button"
            label="Log in with google"
            icon={GoogleLogo}
            className="mt-4 w-full bg-lightBlue"
            variant="light"
            onClick={() => router.push("/home")}
          />
          <div className="mt-4 font-regular">
            <span>Don't have an account?</span>{" "}
            <Link href={"/auth/signup"} className="text-primary">
              Sign up
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
