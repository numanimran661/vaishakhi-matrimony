"use client"
import Image from "next/image";
import Button from "../../common/buttons/Button";
import { PricingBg } from "../../common/allImages/AllImages";
import { plans } from "../../common/allConstants/landingSectionConstants";
import { useRouter } from "next/navigation";

const PricingPlans = () => {
  const router = useRouter()
  return (
    <section className="relative py-16 border-b border-gray">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={PricingBg}
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <h2 className="text-sm font-medium text-normal uppercase">
          Membership Plans
        </h2>
        <h2 className="text-4xl font-bold mt-2">Unlock Your Love Journey</h2>

        <div className="flex justify-center gap-2 mt-6">
          <Button label="Monthly Plan" />
          <Button label="Annual Plan" variant="secondary" />
        </div>

        <div className="flex lg:flex-nowrap flex-wrap justify-center mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.bgColor} rounded-2xl text-left border border-gray w-full sm:w-1/3 md:mx-4 mx-0 my-4 px-6 py-8 `}
            >
              <h3 className={`text-xl font-semibold ${plan.textColor}`}>
                {plan.title}
              </h3>
              <p
                className={`text-4xl font-bold mt-2 pb-8 border-b ${plan.borderColor}`}
              >
                <span className={`${plan.priceColor} me-2`}>{plan.price}</span>
                <span className={`text-base font-light ${plan.textColor}`}>
                  {plan.period}
                </span>
              </p>
              <p className={`mt-8 ${plan.textColor}`}>{plan.description}</p>
              <ul className="text-left mt-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`${plan.featureClr}`}>
                    ✔ {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full`}
                label={plan.buttonLabel}
                variant={plan.variant}
                onClick={() => router.push("/membership-plans/selected-plan")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
