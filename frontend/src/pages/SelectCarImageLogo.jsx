import SelectCar from "../components/SelectCar";

const SelectCarImageLogo = () => {
  const carBrands = [
    {
      brand: "Kia",
      logo: "/images/kiaLogo.png",
      carImage: "/images/kiaCar.png",
      accent: "border-blue-500"
    },
    {
      brand: "Tata",
      logo: "/images/tataLogo.png",
      carImage: "/images/tataCar.png",
      accent: "border-red-500"
    },
    {
      brand: "Hyundai",
      logo: "/images/hyundaiLogo.png",
      carImage: "/images/hyundaiCar.png",
      accent: "border-gray-800"
    },
    {
      brand: "Mahindra",
      logo: "/images/mahindraLogo.png",
      carImage: "/images/mahindraCar.png",
      accent: "border-amber-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-10 px-4">
      {/* Premium Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-block">
        </div>
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
          Select Your <span className="font-bold">Car Brand</span>
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

        {/* Premium Footer Note */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 text-gray-500 text-sm">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span>Certified Service Centers</span>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCarImageLogo;