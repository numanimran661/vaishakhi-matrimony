"use client";

import React, { useState } from "react";
import Button from "@/app/components/common/buttons/Button";
import Link from "next/link";
import OtpInput from "@/app/components/common/inputFields/OtpInput";
import { showToast } from "@/app/components/ui/CustomToast";
import { verifyOtp } from "@/app/lib/api/authRoutes";
import { useRouter, useSearchParams } from "next/navigation";

const ResetMailSent: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const handleSubmit = async () => {
    if (!email) {
      showToast("Email is required", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOtp({
        email,
        code: otp,
      });

      if (response.data.status) {
        showToast(response.data.message, "success");
        router.push(`/auth/reset-password?email=${email}&otp=${otp}`)
        // optionally redirect or show success screen
      } else {
        showToast("Verification failed", "error");
      }
    } catch (error: any) {
      const msg =
      error?.response?.data?.message || "Something went wrong!";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-7">Reset OTP sent</h2>
      <p className="">
        An OTP has sent to you please check your inbox for the OTP.
      </p>
      <div className="mt-4">
        <OtpInput length={4} onChangeOtp={handleOtpChange} />
      </div>
      <Button
        label={loading ? "Verifying..." : "Verify"}
        disabled={otp.length !== 4 || loading}
        className="mt-4 w-full"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ResetMailSent;
