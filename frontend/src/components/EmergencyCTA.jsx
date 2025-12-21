import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

const EmergencyCTA = () => {
  return (
 <motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <div className="border-gray-700/40 via-gray-500 shadow-2xl p-6 sm:p-8 md:p-12">
    
    <div className="bg-red-500/20 blur-3xl" />
    <div className="bg-orange-500/20 blur-3xl" />

    <div className="relative z-10 text-center">
      <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        Need <span className="text-red-500">Emergency Service</span>?
      </h2>

      <p className="mx-auto mb-8 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-700 sm:text-gray-800 px-2 sm:px-0">
        Stuck on the road? Our 24/7 emergency response team provides fast
        roadside assistance, towing, jump-starts, and on-spot repairs.
      </p>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg transition-all duration-300 cursor-pointer">
          <FaLocationDot />
          Find Nearby Mechanics
        </button>
      </div>
    </div>
  </div>
</motion.section>

  );
};

export default EmergencyCTA;
