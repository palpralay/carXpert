import SelectCar from "../components/SelectCar";

const SelectCarImageLogo = () => {
  const carBrands = [
    {
      brand: "Kia",
      logo: "/images/kiaLogo.png",
      carImage: "/images/kiaCar.png",
    },
    {
      brand: "Tata",
      logo: "/images/tataLogo.png",
      carImage: "/images/tataCar.png",
    },
    {
      brand: "Hyundai",
      logo: "/images/hyundaiLogo.png",
      carImage: "/images/hyundaiCar.png",
    },
    {
      brand: "Mahindra",
      logo: "/images/mahindraLogo.png",
      carImage: "/images/mahindraCar.png",
    },
  ];

  return (
    <div className="pt-28 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-20">
        {carBrands.map((item) => (
          <SelectCar
            key={item.brand}
            brand={item.brand}
            logo={item.logo}
            carImage={item.carImage}
            onSelect={() => console.log(`${item.brand} selected`)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectCarImageLogo;
