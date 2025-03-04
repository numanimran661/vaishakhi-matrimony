"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import { GoogleLogo } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { login, socialLogin } from "@/app/lib/api/authRoutes";
import { showToast } from "@/app/components/ui/CustomToast";
import { useAuth } from "@/context/AuthContext";

interface LoginValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { loginInternal } = useAuth();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleAuthCompleted, setGoogleAuthCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    if (session?.user?.email && !googleAuthCompleted) {
      setGoogleAuthCompleted(true);
      saveUserToBackend(session?.user?.email);
    }
  }, [session?.user?.email]);
  const saveUserToBackend = async (email: string) => {
    try {
      const obj = {
        email,
      };
      const response = await socialLogin(obj);

      if (response?.status === 200 || response?.status === 201) {
        loginInternal(response?.data?.token, response?.data?.user);
        showToast("Logged In successfully", "success");
        router.push("/home");
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await signIn("google", { redirect: false });

    if (result?.ok) {
      console.log("Google Login Successful");
    } else {
      setLoading(false);
    }
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
        setError(null);
        try {
          const response = await login(values);
          if (response?.status === 200) {
            loginInternal(response?.data?.token, response?.data?.user);

            showToast("Logged In successfully", "success");
            router.push("/home");
          } else {
            showToast("Something went wrong. Please try again.", "error");
          }
        } catch (err: any) {
          setError(err.response?.data?.error || "Login failed");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold">Log in to your account</h2>

          <Field
            as={InputField}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            error={errors.email}
            touched={touched.email}
          />

          <Field
            as={InputField}
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
            touched={touched.password}
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
            label={loading ? "Logging In..." : "Log in with Google"}
            icon={GoogleLogo}
            className="w-full bg-lightBlue"
            variant="light"
            onClick={handleGoogleLogin}
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
