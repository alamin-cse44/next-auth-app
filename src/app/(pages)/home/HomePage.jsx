import React from "react";
import BannerCarousel from "./BannerCarousel";
import About from "./About";
import Services from "./services";
import Team from "./Team";
import Product from "./Product";

const HomePage = () => {
  return (
    <div className="">
      <BannerCarousel />
      <About />
      <Services />
      <Product />
      <Team />
    </div>
  );
};

export default HomePage;
