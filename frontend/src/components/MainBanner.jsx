import React from "react";

const MainBanner = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden font-[var(--font-ubuntu)]">
      
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        src="/src/assets/mainBanner2.png"
        alt="MainBanner"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        <h1 className="
        mt-2.5
          text-3xl md:text-5xl font-bold mb-4
          bg-gradient-to-r from-red-500 via-orange-500 to-cyan-400
          bg-clip-text text-transparent
        ">
          Reliable Car Repair, Right at Your Doorstep
        </h1>

        <p className="text-sm   mt-2.5 md:text-lg text-gray-200 mb-8 max-w-xl">
          Expert mechanics • Genuine parts • Affordable pricing
        </p>

        <button className="
          bg-red-600 hover:bg-red-700 cursor-pointer
          px-7 py-3 rounded-full
          text-white font-medium
          transition duration-300
        ">
          Book a Service
        </button>

      </div>
    </div>
  );
};

export default MainBanner;
