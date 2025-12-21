import ServiceCard from "../components/Service";
const services = [
  {
    title: "AC Repair",
    image: "./service/ac.png",
  },
  {
    title: "Periodic Repair",
    image: "./service/periodic.png",
  },
  {
    title: "Car Wash",
    image: "./service/carwash.png",
  },
  {
    title: "Tyre & Wheel Services",
    image: "./service/tyre.png",
  },
  {
    title: "Body & Exterior",
    image: "./service/Exterior.png",
  },
  {
    title: "Interior & Comfort",
    image: "./service/Interior.png",
  },
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
      <h1 className="text-4xl font-bold text-center mb-14 my-12 text-white">
        Our <span className="text-red-500">Services</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default AllService;
