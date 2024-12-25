import React, { useState } from "react";

const WashIntroSection = () => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background with water drops effect */}
      <div
        className="absolute inset-0 bg-blue-900"
        style={{
          backgroundImage: `url('/water-droplet.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-950/95" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Video Section with Loading State */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 relative">
              {isVideoLoading && (
                <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                </div>
              )}
              <video
                className="w-full h-auto object-cover"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setIsVideoLoading(false)}
              >
                <source src="/washing-video2.mp4" type="video/mp4" />
                <source src="/washing-video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content with enhanced contrast */}
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
              Don't Just Wash Your Car, CARE it!
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-100 drop-shadow">
              We've designed a premium drive thru Ethiopia car wash experience
              exclusively for you. CARE's smart technology quickly and
              affordably cleans your car, making it shine, while minimizing your
              impact on the environment and supporting our local communities.
              That's what makes CARE the smartest express car wash choice.
            </p>
            <button
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold 
              transform hover:scale-105 transition-all duration-300 
              hover:shadow-lg hover:shadow-blue-500/25"
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WashIntroSection;
