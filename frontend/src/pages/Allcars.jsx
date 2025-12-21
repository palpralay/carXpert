import SelectCar from "../components/SelectCar";
import { useState } from "react";

const Allcars = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const carBrands = [
    {
      brand: "Tata",
      logo: "/images/tataLogo.png",
      carImage: "/images/tataCar.png",
      accent: "border-blue-500",
    },
    {
      brand: "Mahindra",
      logo: "/images/mahindraLogo.png",
      carImage: "/images/mahindraCar.png",
      accent: "border-gray-800",
    },
    {
      brand: "Skoda",
      logo: "/images/skodaLogo.png",
      carImage: "/images/skodaCar.png",
      accent: "border-red-500",
    },
    {
      brand: "MG Motor",
      logo: "/images/mgLogo.png",
      carImage: "/images/mgCar.png",
      accent: "border-amber-600",
    },
    {
      brand: "Nissan",
      logo: "/images/nissanLogo.png",
      carImage: "/images/nissanCar.png",
      accent: "border-amber-600",
    },
    {
      brand: "Renault",
      logo: "/images/renaultLogo.png",
      carImage: "/images/renaultCar.png",
      accent: "border-amber-600",
    },
    {
      brand: "Volkswagen",
      logo: "/images/volkswagenLogo.png",
      carImage: "/images/volkswagenCar.png",
      accent: "border-amber-600",
    },
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
    {
      brand: "Audi",
      logo: "/images/audiLogo.png",
      carImage: "/images/audiCar.png",
      accent: "border-amber-600",
    },
    {
      brand: "BMW",
      logo: "/images/bmwLogo.png",
      carImage: "/images/bmwCar.png",
      accent: "border-amber-600",
    },
    {
      brand: "Mercedes",
      logo: "/images/mercedesLogo.png",
      carImage: "/images/mercedesCar.png",
      accent: "border-amber-600",
    },
  ];

  const filteredBrands = carBrands.filter(({ brand }) =>
    brand.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-10 pt-10 px-4">
      {/* Premium Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-block"></div>
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
          Select Your{" "}
          <span className="font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Car Brand
          </span>
        </h1>
      </div>
     
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search Your Car Brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-500 bg-white/80 px-4 py-3 shadow-sm transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-slate-400"
        />
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBrands.map((item) => (
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
      </div>
    </div>
  );
};

export default Allcars;
