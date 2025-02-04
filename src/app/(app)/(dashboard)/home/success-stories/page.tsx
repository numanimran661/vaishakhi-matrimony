"use client";
import {
  ReviewIcon,
  StarIcon,
  SuccessStory,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import Pagination from "@/app/components/common/pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

const testimonials = [
  {
    image: SuccessStory,
    name: "John Doe",
    designation: "Research Manager",
    review:
      "Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur nunc vitae dolor blandit. Elit enim massa etiam. Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur nunc vitae dolor blandit. Elit enim massa etiam. Elit enim massa etiam. Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur.",
  },
  {
    image: SuccessStory,
    name: "Jane Smith",
    designation: "Software Engineer",
    review:
      "Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur nunc vitae dolor blandit. Elit enim massa etiam. Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur nunc vitae dolor blandit. Elit enim massa etiam. Elit enim massa etiam. Lorem ipsum dolor sit amet consectetur. Consequat auctor consectetur.",
  },
];

const SuccessStoriesPage = () => {
  const router = useRouter();
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-2 text-sm my-8">
          <li>
            <Link href="/home" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-gray-400">
            <span>›</span>
          </li>
          <li>
            <span className="text-orange-500">Success Stories</span>
          </li>
        </ul>
        <div className="mb-10">
          <div className="flex flex-col gap-10">
            {testimonials.map((testimonial, index) => (
              <React.Fragment key={index}>
                <div className="flex justify-center w-full">
                  <div className="bg-primary custom-rounded text-left flex justify-between">
                    <div className="lg:py-20 py-8 px-4 lg:px-12 relative">
                      <div>
                        <ReviewIcon
                          className="absolute top-14 right-20 opacity-35"
                        />
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon key={i} />
                          ))}
                      </div>
                      <p className="text-white text-xl mt-9">
                        {testimonial.review}
                      </p>
                      <h4 className="text-xl text-white font-semibold text-gray-900 mt-7">
                        {testimonial.name}
                      </h4>
                      <p className="text-white font-light text-sm mt-1">
                        {testimonial.designation}
                      </p>
                    </div>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="md:block hidden w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    label="See Detail"
                    variant="secondary"
                    className="px-10 w-full sm:w-auto"
                    onClick={() => router.push("/home/success-stories/1")}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>

          <Suspense fallback={<div>Loading pagination...</div>}>
            <Pagination />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesPage;
