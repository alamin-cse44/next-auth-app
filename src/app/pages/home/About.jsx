import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="mt-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-4 justify-center items-center">
        <div className="relative">
          <Image
            src={"/assets/images/about_us/person.jpg"}
            className="rounded-lg"
            height={"473"}
            width={"460"}
            alt="person"
          />
          <Image
            src={"/assets/images/about_us/parts.jpg"}
            className="rounded-lg absolute left-40 top-40 border-8 border-white hidden lg:block"
            height={"330"}
            width={"330"}
            alt="parts"
          />
        </div>
        <div className="mt-20 sm:mt-0 flex flex-col gap-4">
          <p className="text-primary font-bold">About Us</p>
          <h1 className="text-black font-bold text-4xl">
            We are qualified <br /> & of experience <br /> in this field
          </h1>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. <br /> <br /> the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even slightly believable.{" "}
          </p>
          <div>
            <button className="btn btn-primary">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
