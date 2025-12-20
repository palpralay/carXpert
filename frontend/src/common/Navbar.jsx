import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Emergency", path: "/emergency" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        px-4 md:px-16 lg:px-24 xl:px-32
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-md py-3 text-gray-800"
            : "bg-gray-900 py-5 text-white"
        }`}
      >
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Car<span className="text-red-500">Xpert</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative font-medium"
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-0 
                  group-hover:w-full transition-all duration-300
                  ${isScrolled ? "bg-gray-800" : "bg-white"}`}
                />
              </Link>
            ))}
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className={`px-7 py-2.5 rounded-full font-medium transition
              ${
                isScrolled
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Login
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg
              className={`h-6 w-6 ${isScrolled ? "text-black" : "text-white"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-6
        transition-transform duration-500 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* CLOSE */}
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close Menu"
        >
          <svg
            className="h-6 w-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-6">
          Car<span className="text-red-500">Xpert</span>
        </h2>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium"
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="/emergency"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
        >
          Emergency Help
        </Link>

        <Link
          to="/login"
          className="bg-black hover:bg-gray-900 text-white px-8 py-2.5 rounded-full"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default Navbar;
