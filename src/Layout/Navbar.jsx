import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500
      ${scrolled ? "bg-[#3B2A22] shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-12" />

        {/* Menu */}
        <nav className="ml-auto hidden md:flex gap-8">
          {["Home", "About", "Menu", "Gallery", "Become a Franchise"].map(
            (item, i) => (
              <a
                key={i}
                href="#"
                className="text-white text-sm tracking-wide
                relative after:absolute after:left-0 after:-bottom-1
                after:w-0 after:h-[2px] after:bg-[#FCE779]
                hover:after:w-full after:transition-all duration-300"
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Button */}
        <a
          href="#"
          className="ml-8 hidden md:block border border-white text-white
          px-6 py-2 rounded-full text-sm tracking-wide
          hover:bg-white hover:text-[#3B2A22] transition"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}

export default Navbar;
