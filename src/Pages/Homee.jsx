import React from "react";
import Slider from "react-slick";
import banner1 from "../assets/images/bannerBg.jpg";
import banner2 from "../assets/images/bannerBg1.jpg";
import banner3 from "../assets/images/bannerBg2.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---- Arrows ---- */
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-8 top-1/2 -translate-y-1/2 z-20
    w-12 h-12 rounded-full border border-white/60
    flex items-center justify-center
    text-white cursor-pointer
    transition-all duration-300"
  >
    <FaChevronLeft size={16} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-1/2 -translate-y-1/2 z-20
    w-12 h-12 rounded-full border border-white/60
    flex items-center justify-center
    text-white cursor-pointer
    transition-all duration-300"
  >
    <FaChevronRight size={16} />
  </button>
);

function Homee() {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

 const slides = [
  {
    img: banner1,
    title: "Handcrafted Coffee, Brewed to Perfection",
    desc: "We carefully select premium beans and brew every cup with passion, delivering rich aroma, smooth flavor, and an unforgettable coffee experience.",
  },
  {
    img: banner2,
    title: "A Cozy Space to Relax, Sip & Connect",
    desc: "Step into a warm and welcoming atmosphere where great coffee, calm moments, and meaningful conversations come together beautifully.",
  },
  {
    img: banner3,
    title: "From Fresh Beans to Your Perfect Cup",
    desc: "Every sip tells a story of quality roasting, expert brewing, and our love for creating coffee moments worth remembering.",
  },
];

  return (
    <section className="relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[100vh]">
            {/* Image */}
            <img
              src={slide.img}
              alt=""
              className="w-full h-full object-cover hero-img"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Text */}
            <div className="absolute inset-0 top-30 flex items-center">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="max-w-3xl hero-text ">
                  <h1 className="text-[38px] md:text-[40px] font-serif font-medium 
text-[#E7C27D] mb-4 leading-tight font-heading">

                    {slide.title}
                  </h1>
                  <p className="text-[16px] md:text-[18px] font-body text-white mb-8 leading-relaxed">
                    {slide.desc}
                  </p>

                 <button
  className="border border-white text-white px-8 py-3
  rounded-3xl uppercase tracking-widest text-sm
  hover:bg-white hover:text-[#3B2A22]
  transition-all duration-300"
>
  Explore Menu
</button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Homee;
