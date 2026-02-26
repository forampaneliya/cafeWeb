import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <div
        className={`fixed top-0 w-full z-50 text-white font-bold text-xs sm:text-sm hidden md:flex flex-col transition-all duration-300
        ${scrolled ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 gap-10 sm:px-6 py-2 flex items-center justify-between my-2">

  {/* Left Side */}
  <div className="flex items-center gap-2 ">
    <MapPin size={14} />
    <span>Surat, Gujarat, India</span>
  </div>

  {/* Right Side */}
    <div className="flex items-center gap-2">
      <Mail size={14} />
      <span>info@brandname.com</span>
    </div>

    <div className="flex items-center gap-2">
      <PhoneCall size={14} />
      <span>+1 213 555 7890</span>
    </div>

</div>
        <hr className="border-t border-white/40" />
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`fixed w-full z-40 transition-all duration-500
        ${
          scrolled
            ? "bg-[#0E0603] shadow-lg top-0"
            : "bg-transparent top-0 md:top-[52px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-500 ${
                scrolled ? "h-10 sm:h-12" : "h-14 sm:h-20"
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="ml-auto hidden lg:flex gap-8">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Menu", path: "/menu" },
              { name: "Gallery", path: "/gellary" },
              { name: "Franchise", path: "/franchise" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative font-bold text-[#FCE779] tracking-widest text-sm
                before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-2
                before:w-0 before:h-[1px] before:bg-white
                after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-3
                after:w-0 after:h-[1px] after:bg-white
                hover:before:w-full hover:after:w-full
                before:transition-all before:duration-300
                after:transition-all after:duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Order Button */}
          <Link
            to="/menu"
            className="ml-6 hidden lg:block relative overflow-hidden border border-white
            text-[#FCE779] px-6 py-2 rounded-full text-sm
            before:absolute before:inset-0 before:bg-white before:translate-y-full
            before:transition-transform before:duration-300
            hover:before:translate-y-0 hover:text-black"
          >
            <span className="relative z-10">Order Now</span>
          </Link>

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

          {/* Sidebar Menu */}
          <nav className="flex flex-col mb-8 lg:hidden">
            {[
              { name: "HOME", path: "/" },
              { name: "ABOUT US", path: "/about" },
              { name: "MENU", path: "/menu" },
              { name: "GALLERY", path: "/gellary" },
              { name: "FRANCHISE", path: "/franchise" },
              { name: "CONTACT", path: "/contact" },
            ].map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`text-white text-sm font-medium py-4 border-b border-gray-700 hover:text-[#FCE779] transition-colors ${
                  index === 0 ? "border-t border-gray-700" : ""
                }`}
              >
                {index === 0 && <span className="mr-2">◇</span>}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Section */}
          <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 text-center">
            Contact Us
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Surat, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>info@brandname.com</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall size={18} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall size={18} />
              <span>+1 213 555 7890</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;