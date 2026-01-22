import React from "react";
import Slider from "react-slick";
import banner1 from "../assets/images/bannerBg.jpg";
import banner2 from "../assets/images/bannerBg1.jpg";
import banner3 from "../assets/images/bannerBg2.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


/* ---------- Custom Arrows ---------- */
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20
    w-10 h-10 md:w-12 md:h-12
    border border-white/80
    rotate-45 flex items-center justify-center
    transition-all duration-300 hover:bg-white/10"
  >
    <ChevronLeft className="-rotate-45 text-white" size={18} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
    w-10 h-10 md:w-12 md:h-12
    border border-white/80
    rotate-45 flex items-center justify-center
    transition-all duration-300 hover:bg-white/10"
  >
    <ChevronRight className="-rotate-45 text-white" size={18} />
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
    cssEase: "ease-in-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: () => {
      const images = document.querySelectorAll(".hero-img");
      images.forEach((img) => {
        img.style.animation = "none";
        img.offsetHeight; // force reflow
        img.style.animation = "";
      });
    },
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
          <div key={index} className="relative h-screen">
            {/* Image */}
            <img
              src={slide.img}
              alt=""
              className="hero-img w-full h-full object-cover"
            />

            {/* Overlay layers for readability */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center mt-15">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center ">
                <div className="max-w-3xl mx-auto">
                  <h1
                    className="text-[26px] sm:text-[32px] md:text-[40px]
                    font-serif font-medium text-[#E7C27D]
                    mb-4 leading-tight"
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="text-[14px] sm:text-[16px] md:text-[18px]
                    text-white mb-8 leading-relaxed"
                  >
                    {slide.desc}
                  </p>

                  <button
                    className="relative overflow-hidden
                    border border-white text-white
                    px-8 py-3 rounded-3xl
                    uppercase tracking-widest text-sm
                    transition-all duration-300
                    before:absolute before:inset-0
                    before:bg-white before:translate-y-full
                    before:transition-transform before:duration-300
                    hover:before:translate-y-0
                    hover:text-[#3B2A22]"
                  >
                    <span className="relative z-10">Explore Menu</span>
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
