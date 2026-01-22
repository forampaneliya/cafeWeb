import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Menu, X, MapPin, Mail, PhoneCall } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= SUB HEADER ================= */}
      <div className="fixed top-0 w-full z-50 bg-transparent text-white font-bold text-xs sm:text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Surat, Gujarat</span>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>info@brandname.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall size={14} />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-white/40" />
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`fixed w-full z-40 transition-all duration-500
        ${
          scrolled
            ? "bg-black shadow-lg top-0"
            : "bg-transparent top-0 md:top-[52px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-500 ${
              scrolled ? "h-10 sm:h-12" : "h-14 sm:h-20"
            }`}
          />

          {/* Desktop Menu */}
          <nav className="ml-auto hidden lg:flex gap-8">
            {["Home", "About", "Menu", "Gallery", "Franchise"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative font-bold text-[#FCE779] text-sm tracking-wide
                before:absolute before:left-0 before:-bottom-2
                before:w-0 before:h-[1px] before:bg-white
                after:absolute after:right-0 after:-bottom-4
                after:w-0 after:h-[1px] after:bg-white
                hover:before:w-full hover:after:w-full
                transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Order Button */}
          <a
            href="#"
            className="ml-6 hidden lg:block relative overflow-hidden border border-white
            text-[#FCE779] px-6 py-2 rounded-full text-sm
            before:absolute before:inset-0 before:bg-white before:translate-y-full
            before:transition-transform before:duration-300
            hover:before:translate-y-0 hover:text-black"
          >
            <span className="relative z-10">Order Now</span>
          </a>

          {/* Toggle Button */}
          <button
            className="ml-auto lg:ml-6 text-[#FCE779] animate-pulse"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-500
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="absolute right-0 h-full w-full sm:w-[360px] bg-black text-[#FCE779] p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Logo" className="h-10" />
            <button onClick={() => setOpen(false)}>
              <X size={26} />
            </button>
          </div>

          {/* Sidebar Menu - Only visible on mobile/tablet */}
          <nav className="flex flex-col mb-8 lg:hidden">
            {["HOME", "ABOUT US", "MENU", "GALLERY", "CONTACT", "ORDER NOW"].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-white text-sm font-medium py-4 border-b border-gray-700 hover:text-[#FCE779] transition-colors ${
                  index === 0 ? "border-t border-gray-700" : ""
                }`}
              >
                {index === 0 && <span className="mr-2">◇</span>}
                {item}
              </a>
            ))}
          </nav>

          <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 lg:text-left text-center lg:border-b-0">
            Contact Us{!scrolled && <span className="lg:inline hidden">:</span>}<span className="lg:hidden">:</span>
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Surat, Gujarat</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>info@brandname.com</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall size={18} />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;