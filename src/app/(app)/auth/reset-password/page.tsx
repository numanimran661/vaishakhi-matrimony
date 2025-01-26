"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import Link from "next/link";

const ResetPassword: React.FC = () => {
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
          <h2 className="text-3xl font-bold mb-7">Reset your password</h2>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            label="Reset"
            className="mt-4 w-full"
          />
          <div className="mt-4 font-regular">
            <span>Have Your Password?</span>{" "}
            <Link href={"/auth/login"} className="text-primary">
              Log in
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
