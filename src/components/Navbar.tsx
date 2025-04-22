"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down and past top
        setShowNavbar(false);
        setIsMobileMenuOpen(false); // Close mobile menu when scrolling down
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`bg-gray-900 text-gray-300 shadow-sm sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu Button (Visible on Mobile) */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>

          {/* Nav Links (Desktop: Inline, Mobile: Hidden unless toggled) */}
          <nav
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6 text-sm`}
          >
            <Link
              href="#focus"
              className="hover:text-white transition"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              Services
            </Link>
            <Link
              href="#about"
              className="hover:text-white transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#Case Study"
              className="hover:text-white transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Case Studies
            </Link>

            {/* CTA / WhatsApp (Inside Mobile Menu on Small Screens) */}
            <div className="md:hidden">
              <Link
                href="https://api.whatsapp.com/send/?phone=27661879993&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm inline-block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Speak to Us
              </Link>
            </div>
          </nav>

          {/* CTA / WhatsApp (Visible on Desktop) */}
          <div className="hidden md:flex">
            <Link
              href="https://api.whatsapp.com/send/?phone=27661879993&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Speak to Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

