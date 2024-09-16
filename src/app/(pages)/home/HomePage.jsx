import React from "react";
import BannerCarousel from "./BannerCarousel";
import About from "./About";
import Services from "./services";
import Team from "./Team";

const HomePage = () => {
  return (
    <div className="">
        <BannerCarousel />
        <About />
        <Services />
        <Team />
    </div>
  );
};

export default HomePage;
