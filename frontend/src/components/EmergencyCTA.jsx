import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

const EmergencyCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 md:px-12 py-12 rounded-2xl shadow-2xl border border-gray-700/40">
     
        <div className="text-center">
          <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Need <span className="text-red-500">Emergency Service</span>?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300 px-2 sm:px-0">
            Stuck on the road? Our 24/7 emergency response team provides fast
            roadside assistance, towing, jump-starts, and on-spot repairs.
          </p>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 rounded-full
                         bg-gradient-to-r from-red-600 to-orange-500
                         px-8 py-4 font-semibold text-white shadow-lg
                         transition-all duration-300 cursor-pointer"
            >
              <FaLocationDot className="text-lg" />
              Find Nearby Mechanics
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default EmergencyCTA;
