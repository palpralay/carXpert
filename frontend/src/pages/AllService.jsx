import ServiceCard from "../components/Service";
import { Link } from "react-router-dom";


const services = [
  {
    title: "Engine Repair",
    image: "./service/mechinical.png",
  },
  {
    title: "Break Service",
    image: "./service/break.png",
  },
  {
    title: "Suspension Service",
    image: "./service/suspension.png",
  },
  {
    title: "Electronics Service",
    image: "./service/electronics.png",
  },
];

const AllService = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 
                    py-20 px-6"
    >
      <h1 className="text-4xl font-bold text-center mb-14 text-white">
        Our <span className="text-red-500">Services</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      <Link to="/all-services" className="flex justify-center mt-16">
        <button className="px-6 py-3 cursor-pointer bg-gray-500 flex justify-center items-center text-white rounded-lg overflow-hidden relative group mb-16">
          <div className="flex items-center justify-center gap-2 ">
            <span>Show All Services</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>
      </Link>
    </div>
  );
};

export default AllService;
