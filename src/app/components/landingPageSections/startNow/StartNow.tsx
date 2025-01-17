import Image from "next/image";
// import { useRouter } from "next/router";
import { DatingImg, PricingBg } from "../../common/allImages/AllImages";
import Button from "../../common/buttons/Button";

const StartNow = () => {
  //   const router = useRouter();

  //   const handleSignupClick = () => {
  //     router.push("/signup");
  //   };

  return (
    <section className="py-16 relative">
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
      <div className="max-w-6xl mx-auto px-8 flex flex-wrap items-center relative z-10 bg-white rounded-2xl border border-gray">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-sm font-medium text-normal uppercase">
            Start Now
          </h2>
          <h2 className="text-3xl font-bold text-gray-800 mt-0">
            Ready to find your perfect match?
          </h2>
          <Button
            // onClick={handleSignupClick}
            className="mt-6"
            label="Signup Now"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center p-1 lg:p-8 md:p-4">
          <Image
            src={DatingImg}
            alt="Perfect match illustration"
            width={400}
            height={300}
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default StartNow;
