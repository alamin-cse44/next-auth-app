import React from "react";
import BannerCarousel from "./BannerCarousel";
import About from "./About";
import Services from "./services";

const HomePage = () => {
  return (
    <div className="">
        <BannerCarousel />
        <About />
        <Services />
    </div>
  );
};

export default HomePage;
