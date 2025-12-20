import React, { useState } from "react";

const SelectCar = ({ brand, logo, carImage, accent, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
   
      <div className={`bg-white rounded-2xl overflow-hidden border-2 ${accent} transition-all duration-500 
        shadow-lg hover:shadow-2xl hover:scale-[1.02] ${isHovered ? 'border-opacity-100' : 'border-opacity-30'}`}>
        
        {/* Car Image with Overlay */}
        <div className="h-56 overflow-hidden relative">
          <img
            src={carImage}
            alt={`${brand} car`}
            className="w-full h-full object-contain filter drop-shadow-sm saturate-150 contrast-125 transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 border border-gray-200 
              flex items-center justify-center p-3 shadow-sm">
              <img 
                src={logo} 
                alt={brand} 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-gray-900">{brand}</h3>
              <div className="text-sm text-gray-500">Automotive</div>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-6 space-y-2">
            {['Expert Mechanics', 'Genuine Parts', 'Quick Service'].map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>


          <button
            onClick={onSelect}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 
              text-white font-medium py-3.5 rounded-lg transition-all duration-300 transform 
              hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
          >
            Select Service
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent 
          rounded-2xl blur-sm opacity-50 -z-10"></div>
      )}
    </div>
  );
};

export default SelectCar;