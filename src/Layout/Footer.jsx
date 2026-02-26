import React from "react";
import logo from "../assets/images/logo.png"
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  ChevronRight 
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#0E0603] text-[#fce779] pt-20 pb-10 px-6 border-t border-[#C78665]/20">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
         <div className="mb-6">
  <img
    src={logo}
    alt="Brew Haven Logo"
    className="h-20 w-auto object-contain"
  />
</div>
          <p className="text-[#CFC0B6] text-sm leading-relaxed">
            Crafted with passion, brewed with love. We create unforgettable
            coffee moments in a warm and welcoming atmosphere.
          </p>

          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center border border-[#fce779]/40 rounded-full
                hover:bg-[#fce779] hover:text-[#140A06] transition-all duration-300 cursor-pointer"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#fce779] mb-5 uppercase tracking-widest">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-[#D6C7BC] flex flex-col pl-16">
            {["Home", "About", "Menu", "Gallery", "Contact"].map((link, i) => (
              <li
                key={i}
                className="flex items-center gap-2 hover:text-[#C78665] transition-all duration-300 cursor-pointer group"
              >
                <ChevronRight 
                  size={14} 
                  className="text-[#fce779] group-hover:translate-x-1 transition-transform duration-300"
                />
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#fce779] mb-5 uppercase tracking-widest">
            Contact
          </h3>

          <div className="space-y-4 text-sm text-[#D6C7BC]">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#fce779] mt-1" />
              <span>Ahmedabad, Gujarat, India</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#fce779]" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#fce779]" />
              <span>info@brewhaven.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-[#fce779] mb-5 uppercase tracking-widest">
            Newsletter
          </h3>

          <p className="text-sm text-[#D6C7BC] mb-4">
            Subscribe to receive special offers and cafe updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 bg-[#140A06] border border-[#C78665]/30 rounded-l-full
              focus:outline-none focus:border-[#C78665] text-sm"
            />
            <button
              className="bg-[#fce779]/50 text-white px-5 rounded-r-full
              hover:bg-white hover:text-[#C78665] transition-all duration-300"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-[#C78665]/20 text-center text-xs text-[#A89285]">
        © {new Date().getFullYear()} Brew Haven. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;