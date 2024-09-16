"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Team = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3, // Show 3 items at once on desktop
      slidesToSlide: 1, // Scroll one card at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <section className="py-16 container">
      <div className="text-center mb-12 flex flex-col gap-4">
        <h2 className="text-primary text-lg font-bold">Team</h2>
        <h3 className="text-4xl font-bold">Meet Our Team</h3>
        <p className="text-gray-600 mt-2">
          The Majority Have Suffered Alteration In Some Form, By Injected
          Humour, Or Randomised <br /> Words Which Don&apos;t Look Even Slightly
          Believable.
        </p>
      </div>

      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // Server-side rendering
        infinite={true}
        autoPlay={true}
        keyBoardControl={true}
        customTransition="all 300ms"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        renderButtonGroupOutside={true}
        renderDotsOutside={true}
        itemClass="px-4" // Add some padding between the cards
        customLeftArrow={
          <button className="absolute left-0 z-10 p-2 rounded-full bg-gray-200/50">
            <span className="text-2xl">❮</span>
          </button>
        }
        customRightArrow={
          <button className="absolute right-0 z-10 p-2 rounded-full bg-primary">
            <span className="text-2xl">❯</span>
          </button>
        }
      >
        {cardData.map((item, index) => (
          <div key={index} className="p-2">
            <div className="card bg-white shadow-lg rounded-lg p-6">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="rounded-lg h-48 w-full object-cover"
              />
              <div className="text-center mt-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.role}</p>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <a href="#" className="text-blue-600">
                  <FaFacebook />
                </a>
                <a href="#" className="text-blue-600">
                  <FaTwitter />
                </a>
                <a href="#" className="text-blue-600">
                  <FaLinkedin />
                </a>
                <a href="#" className="text-pink-600">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

const cardData = [
  {
    name: "Car Engine Plug",
    role: "Engine Expert",
    imageUrl: "/assets/images/team/1.jpg",
  },
  {
    name: "Car Engine Plug",
    role: "Engine Expert",
    imageUrl: "/assets/images/team/1.jpg",
  },
  {
    name: "Car Engine Plug",
    role: "Engine Expert",
    imageUrl: "/assets/images/team/1.jpg",
  },
  {
    name: "Car Engine Plug",
    role: "Engine Expert",
    imageUrl: "/assets/images/team/1.jpg",
  },
  {
    name: "Car Engine Plug",
    role: "Engine Expert",
    imageUrl: "/assets/images/team/1.jpg",
  },
];

export default Team;
