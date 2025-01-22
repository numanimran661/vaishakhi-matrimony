"use client";

import React from "react";
import Button from "@/app/components/common/buttons/Button";
import Link from "next/link";

const ResetMailSent: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-7">Reset email sent</h2>
      <p className="">
        Check your inbox and rest your password for login into your account.
      </p>
      <Button label="Reset password" className="mt-4 w-full" />
    </div>
  );
};

export default ResetMailSent;
