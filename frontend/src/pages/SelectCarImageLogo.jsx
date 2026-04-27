import SelectCar from "../components/SelectCar";
import { Link } from "react-router-dom";

const SelectCarImageLogo = () => {
  const carBrands = [
    {
      brand: "Suzuki",
      logo: "/images/suzukiLogo.png",
      carImage: "/images/suzukiCar.png",
      accent: "border-blue-500",
    },
    {
      brand: "Hyundai",
      logo: "/images/hyundaiLogo.png",
      carImage: "/images/hyundaiCar.png",
      accent: "border-gray-800",
    },
    {
      brand: "Kia",
      logo: "/images/kiaLogo.png",
      carImage: "/images/kiaCar.png",
      accent: "border-red-500",
    },
    {
      brand: "Toyota",
      logo: "/images/toyotaLogo.png",
      carImage: "/images/toyotaCar.png",
      accent: "border-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 pt-10 px-4">
      {/* Premium Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-block"></div>
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
          Select Your <span className="font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Car Brand</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Premium repair services tailored to your vehicle
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carBrands.map((item) => (
            <SelectCar
              key={item.brand}
              brand={item.brand}
              logo={item.logo}
              carImage={item.carImage}
              accent={item.accent}
              onSelect={() => console.log(`${item.brand} selected`)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-14 ">
          <Link to="/all-cars">
            <button className="px-6 py-3 cursor-pointer bg-gray-500 flex justify-center items-center text-white rounded-lg overflow-hidden relative group mb-16">
              <div className="flex items-center justify-center gap-2 ">
                <span>Show Available Cars</span>
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
              <div className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectCarImageLogo;
