import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Service = ({ title, image }) => {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative w-80 h-96 rounded-xl p-px bg-gray-900 backdrop-blur-md text-gray-800 overflow-hidden shadow-lg "
      >
        <div
          className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-red-600 to-orange-500 size-60 absolute z-0 transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: position.y - 120, left: position.x - 120 }}
        />

        <div className="relative z-10 bg-gray-900/75 p-6 h-full w-full rounded-[11px] flex flex-col text-center">
          {/* Image at Top */}
          <img
            src={image}
            alt="Service"
            className="w-80 h-40 rounded-lg object-cover shadow-md"
          />

          {/* Content */}
          <div className="flex flex-col items-center mt-6 flex-grow">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
            <p className="text-sm text-gray-300 mb-6">
              Trusted car service with expert technicians and transparent
              pricing.
            </p>

            {/* Button */}
            <Link to="/all-cars">
              <button className="mt-auto cursor-pointer bg-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/30">
                Book Service
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
