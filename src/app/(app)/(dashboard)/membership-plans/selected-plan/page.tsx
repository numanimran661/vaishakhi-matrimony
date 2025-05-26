"use client";

import {
  CashfreeLogo,
  Radio,
  RazorpayLogo,
  RightArrowWithoutBg,
  Tick,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import { showToast } from "@/app/components/ui/CustomToast";
import {
  createPaymentCheckout,
  verifyPayment,
} from "@/app/lib/api/membershipRoutes";
import { useAuth } from "@/context/AuthContext";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BreadcrumbMain = () => {
  return (
    <nav className="hidden sm:block mb-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-[#434343] font-semibold leading-4 text-[14px]"
          >
            Home
          </Link>
        </li>
        <RightArrowWithoutBg />
        <li className="text-[#F97E27] text-[14px] font-semibold leading-4">
          Membership Plans
        </li>
      </ul>
    </nav>
  );
};

const SelectedPlans = () => {
  const selectedPlan = localStorage.getItem("selected_plan");
  const parsedObj = selectedPlan ? JSON.parse(selectedPlan) : null;
  const [cashfree, setCashfree] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, updateUser } = useAuth();

  // Initialize Cashfree SDK
  useEffect(() => {
    const initializeSDK = async () => {
      const cashfreeInstance = await load({
        mode: "production", // Use "sandbox" for testing
      });
      setCashfree(cashfreeInstance);
    };
    initializeSDK();
  }, []);

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await verifyPayment({
        order_id: orderId,
        membership: parsedObj?.id,
        userId: user?._id,
      });
      if (response?.data?.success && response?.data?.user) {
        updateUser(response?.data?.user);
        showToast("Payment Completed Successfully", "success");
        router.push("/membership-plans");
      } else if (response?.data?.message) {
        showToast(response?.data?.message, "error");
      } else {
        showToast("Something went wrong! Please try again.", "error");
      }
    } catch (error) {}
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await createPaymentCheckout({
        amount: parsedObj?.price,
        customer_name: user?.name,
        customer_id: user?._id,
        customer_phone: user?.phone,
        customer_email: user?.email,
      });

      if (response.status === 200) {
        // Extract payment session ID from the response
        const paymentSessionId = response.data.payment_session_id;
        const order_id = response.data.order_id;
        console.log("Order created:", paymentSessionId);

        // Open Cashfree payment modal
        if (cashfree) {
          const checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal", // Open in a modal
          };

          cashfree.checkout(checkoutOptions).then((result: any) => {
            setIsLoading(false);
            if (result.error) {
              // Handle payment errors
              console.log("Payment error:", result.error);
            }
            if (result.redirect) {
              // Handle redirection (if needed)
              console.log("Payment will be redirected");
            }
            if (result.paymentDetails) {
              // Handle payment completion
              console.log("Payment completed:", result.paymentDetails);
              checkPaymentStatus(order_id);
            }
          });
        } else {
          setIsLoading(false);
          showToast("Payment gateway not initialized", "error");
        }
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      showToast("Payment initiation failed", "error");
      setIsLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-0 max-w-[90%] w-full sm:max-w-[707px] mx-auto my-6 sm:my-12">
      <BreadcrumbMain />
      <div className="rounded-3xl sm:border-[0.5px] sm:border-gray px-4 sm:px-10 py-6 sm:py-10">
        <div className="flex flex-col">
          <h2 className="text-[20px] font-semibold text-darkBlue">
            Selected Plan
          </h2>

          {/* Plan Details */}
          <div className="flex flex-wrap gap-x-8 sm:gap-x-16 md:gap-x-0 md:justify-between items-center gap-y-6 rounded-3xl sm:border-[0.5px] sm:border-gray p-4 mt-6">
            <div className="flex flex-col gap-y-4">
              <h3 className="text-[#777777] text-[16px] font-semibold">
                {parsedObj?.title}
              </h3>
              <p className="text-[#434343] text-[32px] font-semibold leading-10">
                ₹{parsedObj?.price}
              </p>
            </div>

            {/* Plan Benefits */}
            <div className="flex flex-col gap-y-3">
              {parsedObj?.features?.map((item: string, index: number) => (
                <div key={index} className="flex gap-2 items-center">
                  <Tick />
                  <p className="text-[#777777] text-[14px] font-semibold leading-5">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="transparentOrange" label="In Use" />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col my-6">
          <h3 className="text-[20px] font-semibold text-[#1C264E] py-4 sm:py-7">
            Payment Methods
          </h3>
          <div className="flex justify-between items-center rounded-2xl sm:border-[0.5px] sm:border-gray p-3">
            <div className="flex gap-2 items-center">
              <Radio />
              <p className="text-[#434343] font-semibold text-[18px]">
                Cashfree
              </p>
            </div>
            <img src={CashfreeLogo.src} alt="Cashfree logo" className="w-12" />
          </div>
        </div>

        {/* Subscription Summary */}
        <div className="flex flex-col">
          <h3 className="text-[#1C264E] text-[20px] font-semibold mb-4 sm:mb-7">
            Subscription Summary
          </h3>
          <div className="flex flex-col gap-y-4 sm:gap-y-6 rounded-3xl sm:border-[0.5px] sm:border-gray p-5">
            {[
              { label: "Total Product Prices", value: `₹${parsedObj?.price}` },
              // { label: "Discount", value: "" },
              { label: "Valid for", value: parsedObj?.description },
            ].map((item, index) => (
              <p
                key={index}
                className="flex justify-between items-center text-[#434343] font-medium text-[16px]"
              >
                {item.label} <span>{item.value}</span>
              </p>
            ))}

            {/* Total Amount */}
            <p className="flex justify-between items-center text-[#1C264E] font-semibold text-[20px] px-4">
              Total{" "}
              <span className="text-[#F97E27] font-semibold text-[20px]">
                ₹{parsedObj?.price}
              </span>
            </p>

            <Button
              label={isLoading ? "Payment processing..." : "Continue To Pay"}
              disabled={isLoading}
              className="w-full my-4"
              onClick={handlePayment}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedPlans;
