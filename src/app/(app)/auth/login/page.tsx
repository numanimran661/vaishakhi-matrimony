"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import { GoogleLogo } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { login } from "@/app/lib/api/auth/route";

interface LoginValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialValues: LoginValues = {
    email: "",
    password: ""
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Form submitted", values); // Debug log
        setError(null);
        try {
          const response = await login(values);
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
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold">Log in to your account</h2>

          {error && <p className="text-red-500">{error}</p>}

          <Field
            as={InputField}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
          />
          
          <Field
            as={InputField}
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />

          <div className="flex justify-end">
            <p
              className="text-primary font-regular cursor-pointer"
              onClick={() => router.push("/auth/reset-password")}
            >
              Forgot Password?
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            label={isSubmitting ? "Logging in..." : "Log in"}
            className="w-full"
          />

          <Button
            type="button"
            label="Log in with Google"
            icon={GoogleLogo}
            className="w-full bg-lightBlue"
            variant="light"
            onClick={() => signIn("google")}
          />

          <div className="font-regular">
            <span>Don't have an account?</span>{" "}
            <Link href="/auth/signup" className="text-primary">
              Sign up
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;