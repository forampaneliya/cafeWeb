import React from "react";
import Slider from "react-slick";
import banner1 from "../assets/images/bannerBg.jpg";
import banner2 from "../assets/images/bannerBg1.jpg";
import banner3 from "../assets/images/bannerBg2.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-[#5a3e2b]/80 hover:bg-[#3e2a1d] text-amber-200 p-3 rounded-full transition"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-[#5a3e2b]/80 hover:bg-[#3e2a1d] text-amber-200 p-3 rounded-full transition"
  >
    <FaChevronRight />
  </button>
);

function Homee() {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const slides = [
    {
      img: banner1,
      title: "Freshly Brewed Coffee",
      desc: "Experience rich aroma & handcrafted flavors",
    },
    {
      img: banner2,
      title: "Warm Cafe Moments",
      desc: "Relax, sip, and enjoy every moment",
    },
    {
      img: banner3,
      title: "Taste the Perfection",
      desc: "Where coffee meets comfort",
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[90vh]">
            {/* Image */}
            <img
              src={slide.img}
              alt="Cafe Banner"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2b1b12]/80 via-[#3e2a1d]/60 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl md:text-6xl font-serif text-amber-200 mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-amber-100 max-w-xl mb-6">
                  {slide.desc}
                </p>
                <button className="bg-[#5a3e2b] hover:bg-[#3e2a1d] text-amber-200 px-6 py-3 rounded-full tracking-wide transition">
                  Explore Menu
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Homee;
