import React from "react";
import ServicesSection from "../components/ServicesSection.tsx";
import HeroSlider from "../components/HeroSlider.tsx";
import WashIntroSection from "../components/WashIntroSection.tsx";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <WashIntroSection />
      <ServicesSection />
    </div>
  );
};

export default HomePage;
