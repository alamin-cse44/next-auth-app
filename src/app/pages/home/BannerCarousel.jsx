"use client";

import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onChangeHandler = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto mt-2">
      <div className="relative w-full h-[90vh]">
        {" "}
        {/* Set height explicitly */}
        <Carousel
          showArrows={false}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          selectedItem={currentIndex}
          onChange={onChangeHandler}
          showStatus={false}
          showIndicators={false}
        >
          {banner.map((item, index) => {
            return (
              <div key={index} className="relative w-full h-[90vh] rounded-lg">
                <Image
                  src={`/assets/images/banner/${index + 1}.jpg`}
                  alt="Slide 1"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-10 space-y-4 rounded-lg">
                  <h1 className="text-white text-4xl font-bold">
                    {item.title}
                  </h1>
                  <p className="text-white text-lg">{item.description}</p>
                  <div className="flex space-x-4">
                    <button className="btn btn-primary ">Discover More</button>

                    <button className="btn btn-outline btn-secondary">
                      Latest Project
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Add more slides as needed */}
        </Carousel>
        {/* Custom Navigation Buttons */}
        <button
          type="button"
          className="absolute right-24 bottom-5 btn btn-circle"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? banner.length - 1 : prevIndex - 1
            )
          }
        >
          ❮
        </button>
        <button
          type="button"
          className="absolute right-8 bottom-5 btn btn-circle btn-primary"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === banner.length - 1 ? 0 : prevIndex + 1
            )
          }
        >
          ❯
        </button>
      </div>
    </div>
  );
};

const banner = [
  {
    id: 1,
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form.",
  },
  {
    id: 2,
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form.",
  },
  {
    id: 3,
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form.",
  },
  {
    id: 4,
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form.",
  },
  {
    id: 5,
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form.",
  },
  {
    id: 6,
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form.",
  },
];

export default BannerCarousel;
