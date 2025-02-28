'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../common/buttons/Button";
import { PricingBg } from "../../common/allImages/AllImages";
import { useRouter } from "next/navigation";
import { getPlansList } from "@/app/lib/api/membershipRoutes";

interface Subscription {
  _id: string;
  name: string;
  price: number;
  duration: string;
  messages: number;
  liveChats: string;
  profileViews: number;
}

interface Plan {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featureClr: string;
  buttonLabel: string;
  bgColor: string;
  textColor: string;
  priceColor: string;
  buttonBgColor: string;
  borderColor: string;
  buttonTextColor: string;
  variant: "primary";
}

const PricingPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlansList();
        if (data?.data?.subscriptions) {
          const formattedPlans: Plan[] = data?.data?.subscriptions.map((plan: Subscription) => ({
            title: plan.name,
            price: `${plan.price}`,
            period: "/month",
            description: `Duration: ${plan.duration}`,
            features: [
              `${plan.duration} Duration`,
              `${plan.messages} Messages`,
              `Live Chats: ${plan.liveChats}`,
              `${plan.profileViews} Profile Views`,
              "Up to 3 team members",
            ],
            featureClr: "text-darkBlue",
            buttonLabel: "Get started",
            bgColor: "bg-white",
            textColor: "text-gray-800",
            priceColor: "text-primary",
            buttonBgColor: "bg-orange-500",
            borderColor: "border-gray",
            buttonTextColor: "text-white",
            variant: "primary",
          }));
          setPlans(formattedPlans);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section className="relative py-16 border-b border-gray">
      <div className="absolute inset-0 z-0">
        <Image
          src={PricingBg}
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-sm font-medium text-normal uppercase">
          Membership Plans
        </h2>
        <h2 className="md:text-4xl text-2xl font-bold mt-2">Unlock Your Love Journey</h2>

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
              <h3 className={`text-xl font-semibold ${plan.textColor}`}>{plan.title}</h3>
              <p className={`text-4xl font-bold mt-2 pb-8 border-b ${plan.borderColor}`}>
                <span className={`${plan.priceColor} me-2`}>₹{plan.price}</span>
                <span className={`text-base font-light ${plan.textColor}`}>{plan.period}</span>
              </p>
              <p className={`mt-8 ${plan.textColor}`}>{plan.description}</p>
              <ul className="text-left mt-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`${plan.featureClr}`}>✔ {feature}</li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full`}
                label={plan.buttonLabel}
                variant={plan.variant}
                onClick={() => {
                  localStorage.setItem('selected_plan', JSON.stringify(plan))
                  router.push("/membership-plans/selected-plan")
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;







// 'use client'
// import Image from "next/image";
// import Button from "../../common/buttons/Button";
// import { PricingBg } from "../../common/allImages/AllImages";
// import { useRouter } from "next/navigation";

// type planItem = {
//   title: string;
//   price: string;
//   period: string;
//   description: string;
//   features: string[];
//   featureClr: string;
//   buttonLabel: string;
//   bgColor: string;
//   textColor: string;
//   priceColor: string;
//   buttonBgColor: string;
//   borderColor: string;
//   buttonTextColor: string;
//   variant: "primary" | "secondary" | "transparent";
// };

// type PlanItems = planItem[];

// const PricingPlans = () => {
//   const plans: PlanItems = [
//     {
//       title: "Starter",
//       price: "₹80",
//       period: "/month",
//       description: "Lorem ipsum dolor sit amet dolor sit conset cetur adip.",
//       features: [
//         "3 months Duration",
//         "213 Messages",
//         "Live Chats",
//         "2 Profile Views",
//         "Up to 3 team members",
//       ],
//       featureClr: "text-darkBlue",
//       buttonLabel: "Get started",
//       bgColor: "bg-white",
//       textColor: "text-gray-800",
//       priceColor: "text-primary",
//       buttonBgColor: "bg-orange-500",
//       borderColor: "border-gray",
//       buttonTextColor: "text-white",
//       variant: "primary",
//     },
//     {
//       title: "Basic",
//       price: "₹150",
//       period: "/month",
//       description: "Lorem ipsum dolor sit amet dolor sit conset cetur adip.",
//       features: [
//         "3 months Duration",
//         "213 Messages",
//         "Live Chats",
//         "2 Profile Views",
//         "Up to 3 team members",
//       ],
//       featureClr: "text-white",
//       buttonLabel: "Get started",
//       bgColor: "bg-darkBlue",
//       textColor: "text-white",
//       priceColor: "text-white",
//       buttonBgColor: "bg-white",
//       borderColor: "border-white",
//       buttonTextColor: "text-orange-900",
//       variant: "secondary",
//     },
//     {
//       title: "Premium",
//       price: "₹180",
//       period: "/month",
//       description: "Lorem ipsum dolor sit amet dolor sit conset cetur adip.",
//       features: [
//         "3 months Duration",
//         "213 Messages",
//         "Live Chats",
//         "2 Profile Views",
//         "Up to 3 team members",
//       ],
//       featureClr: "text-darkBlue",
//       buttonLabel: "Get started",
//       bgColor: "bg-white",
//       textColor: "text-gray-800",
//       priceColor: "text-primary",
//       buttonBgColor: "bg-orange-500",
//       borderColor: "border-gray",
//       buttonTextColor: "text-white",
//       variant: "primary",
//     },
//   ];
//   const router = useRouter()

//   return (
//     <section className="relative py-16 border-b border-gray">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src={PricingBg}
//           alt="Background Pattern"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//         />
//       </div>
//       <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
//         <h2 className="text-sm font-medium text-normal uppercase">
//           Membership Plans
//         </h2>
//         <h2 className="md:text-4xl text-2xl font-bold mt-2">Unlock Your Love Journey</h2>

//         <div className="flex justify-center gap-2 mt-6">
//           <Button label="Monthly Plan" />
//           <Button label="Annual Plan" variant="secondary" />
//         </div>

//         <div className="flex lg:flex-nowrap flex-wrap justify-center mt-12">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`${plan.bgColor} rounded-2xl text-left border border-gray w-full sm:w-1/3 md:mx-4 mx-0 my-4 px-6 py-8 `}
//             >
//               <h3 className={`text-xl font-semibold ${plan.textColor}`}>
//                 {plan.title}
//               </h3>
//               <p
//                 className={`text-4xl font-bold mt-2 pb-8 border-b ${plan.borderColor}`}
//               >
//                 <span className={`${plan.priceColor} me-2`}>{plan.price}</span>
//                 <span className={`text-base font-light ${plan.textColor}`}>
//                   {plan.period}
//                 </span>
//               </p>
//               <p className={`mt-8 ${plan.textColor}`}>{plan.description}</p>
//               <ul className="text-left mt-6 space-y-2">
//                 {plan.features.map((feature, idx) => (
//                   <li key={idx} className={`${plan.featureClr}`}>
//                     ✔ {feature}
//                   </li>
//                 ))}
//               </ul>
//               <Button
//                 className={`mt-8 w-full`}
//                 label={plan.buttonLabel}
//                 variant={plan.variant}
//                 onClick={() => router.push("/membership-plans/selected-plan")}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingPlans;
