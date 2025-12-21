import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 px-6 md:px-16 lg:px-24 xl:px-32 pt-14 w-full mt-16">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-12 border-b border-gray-700/40 pb-10">
        
        {/* Brand Info */}
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-white">
            Car<span className="text-red-500">Xpert</span>
          </h1>

          <p className="mt-5 text-sm leading-relaxed">
            CarXpert is your trusted platform for car servicing, repairs,
            and instant roadside assistance. Find nearby mechanics,
            book services, and get help anytime, anywhere.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-20 flex-wrap">
          
          {/* Company */}
          <div>
            <h2 className="text-white font-semibold mb-4">Company</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/emergency" className="hover:text-white">Emergency</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-white font-semibold mb-4">Support</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-white font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-2 text-sm">
              <p>📞 +91 12345 12345</p>
              <p>📧 support@carxpert.com</p>
              <p>📍 India</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="py-6 text-center text-xs md:text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">
          Car<span className="text-red-500">Xpert</span>
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
