import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-blue-600 text-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Car Wash Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Professional care for your vehicle
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
