"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { LeftArrow, ReviewIcon, RightArrow, StarIcon, SuccessStory } from "../../common/allImages/AllImages";

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

const SuccessStories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Image src={RightArrow} alt="right arrow" />,
    prevArrow: <Image src={LeftArrow} alt="left arrow" />,
  };

  return (
    <section className="py-16 border-b border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-sm font-medium text-normal uppercase">
            Success Stories
          </h2>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            Heartwarming Journeys
          </h3>
        </div>
        <div className="mt-10"> 
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex justify-center w-full">
                <div className="bg-primary custom-rounded text-left flex justify-between">
                  <div className="lg:py-20 py-8 px-4 lg:px-12 relative">
                    <div>
                      <Image src={ReviewIcon} alt="review icon" className="absolute top-14 right-20 opacity-35" />
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <Image src={StarIcon} key={i} alt="rating star" />
                        ))}
                    </div>
                    <p className="text-white text-xl mt-9">{testimonial.review}</p>
                    <h4 className="text-xl text-white font-semibold text-gray-900 mt-7">
                      {testimonial.name}
                    </h4>
                    <p className="text-white font-light text-sm mt-1">
                      {testimonial.designation}
                    </p>
                  </div>
                  <Image src={testimonial.image} alt={testimonial.name} className="md:block hidden w-full h-full" objectFit="cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
