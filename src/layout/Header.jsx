import React from "react";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="w-full bg-[#3B2A22]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">

        {/* Logo - LEFT */}
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt="Urbanbean Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* RIGHT SIDE (Menu + Button) */}
        <div className="ml-auto flex items-center gap-10">

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "About", "Menu", "Gallery", "Become a Franchise"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative text-[#F5EFE8] text-sm font-medium tracking-wide 
                             after:absolute after:left-0 after:-bottom-1 after:w-0 
                             after:h-[2px] after:bg-[#C78665] 
                             after:transition-all after:duration-300 
                             hover:after:w-full hover:text-[#C78665]"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="#"
              className="bg-[#E6E2D9] text-[#3B2A22] px-6 py-2 rounded-full 
                         text-sm font-semibold tracking-wide
                         transition-all duration-300
                         hover:bg-[#C78665] hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button className="ml-auto md:hidden text-[#E6E2D9]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

      </div>
    </header>
  );
}

export default Header;
