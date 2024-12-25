import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { SlideData } from "../types/slider";

const slides: SlideData[] = [
  {
    id: 1,
    image: "/image1.jpg",
    title: "Rent a car from",
    price: "$99/day",
    features: [
      "Anywhere and anytime you want",
      "Extra limousine offer for VIPs",
      "Extra insurance included",
    ],
  },
  {
    id: 2,
    image: "/image2.jpg",
    title: "Rent a car from",
    price: "$99/day",
    features: [
      "Anywhere and anytime you want",
      "Extra limousine offer for VIPs",
      "Extra insurance included",
    ],
  },
  {
    id: 3,
    image: "/image3.jpg",
    title: "Rent a car from",
    price: "$99/day",
    features: [
      "Anywhere and anytime you want",
      "Extra limousine offer for VIPs",
      "Extra insurance included",
    ],
  },

  // Add more slides...
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-slide functionality with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSlideChange = (getNextSlide: (prev: number) => number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(getNextSlide);

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[450px] overflow-hidden bg-gradient-to-r from-gray-100 to-blue-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 flex items-center justify-between px-4 md:px-12 lg:px-24"
          >
            {/* Content with fade transition */}
            <div
              className={`w-full md:w-1/2 space-y-4 transition-opacity duration-500 ease-in-out
              ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                {slide.title} <br />
                <span className="text-blue-600">{slide.price}</span>
              </h1>
              <ul className="space-y-3">
                {slide.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-gray-600"
                  >
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                      {index === 0 ? "📍" : index === 1 ? "⭐" : "🛡️"}
                    </span>
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Image Container with reduced size */}
            <div
              className={`hidden md:block w-1/2 transition-all duration-500 ease-in-out
              ${
                isTransitioning
                  ? "opacity-0 transform translate-x-10"
                  : "opacity-100 transform translate-x-0"
              }`}
            >
              <div className="relative group max-w-[500px] mx-auto">
                {/* Background decorative elements */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300 scale-95 rotate-3"></div>

                {/* Main image container */}
                <div className="relative bg-white rounded-lg p-2 ring-1 ring-gray-200/50 shadow-xl transform group-hover:scale-[1.02] transition duration-300">
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>

                  {/* The image with reduced size */}
                  <img
                    src={slide.image}
                    alt="Car"
                    className="w-full h-auto object-contain rounded-lg transform hover:scale-[1.01] transition duration-300"
                    style={{
                      filter: "drop-shadow(0 20px 20px rgba(0, 0, 0, 0.15))",
                      maxHeight: "300px",
                    }}
                  />

                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/5"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full 
          shadow-lg backdrop-blur-sm transition-all duration-300 
          ${
            isTransitioning
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white hover:scale-110 hover:shadow-blue-500/25"
          }`}
      >
        <ChevronLeftIcon className="w-5 h-5 text-blue-600" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full 
          shadow-lg backdrop-blur-sm transition-all duration-300 
          ${
            isTransitioning
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white hover:scale-110 hover:shadow-blue-500/25"
          }`}
      >
        <ChevronRightIcon className="w-5 h-5 text-blue-600" />
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 rounded-full bg-white/30 backdrop-blur-sm">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full 
              ${
                currentSlide === index
                  ? "w-4 bg-blue-600 shadow-lg shadow-blue-500/50"
                  : "w-2 bg-gray-400 hover:bg-gray-600"
              } h-2`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
