import React from "react";

const SelectCar = ({ brand, logo, carImage, onSelect }) => {
  return (
    <div className="group w-56 h-64 mx-auto cursor-pointer [perspective:1000px]">
      <div>Select Your Car Brand</div>
      <div
        className="
        relative w-full h-full rounded-xl
        transition-transform duration-700
        [transform-style:preserve-3d]
        group-hover:[transform:rotateY(180deg)]
      "
      >
        {/* FRONT SIDE (Brand Logo) */}
        <div
          className="
          absolute inset-0 flex flex-col items-center justify-center gap-4
          rounded-xl bg-white border border-gray-200
          [backface-visibility:hidden]
        "
        >
          <img src={logo} alt={brand} className="h-20 object-contain" />
          <h3 className="text-lg font-semibold">{brand}</h3>
        </div>

        {/* BACK SIDE (Car Image) */}
        <div
          className="
          absolute inset-0 rounded-xl overflow-hidden
          bg-black
          [transform:rotateY(180deg)]
          [backface-visibility:hidden]
        "
        >
          <img
            src={carImage}
            alt={`${brand} car`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-4">
            <button
              onClick={onSelect}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition"
            >
              Select {brand}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCar;
