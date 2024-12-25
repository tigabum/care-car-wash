import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServicesSection from "../components/ServicesSection";
import HeroSlider from "../components/HeroSlider";
import WashIntroSection from "../components/WashIntroSection";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("scrollTo=services")) {
      const servicesSection = document.getElementById("services-section");
      servicesSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div>
      <HeroSlider />
      <WashIntroSection />
      <ServicesSection />
    </div>
  );
};

export default Home;
