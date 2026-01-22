import React from "react";
import Slider from "react-slick";
import banner1 from "../assets/images/bannerBg.jpg";
import banner2 from "../assets/images/bannerBg1.jpg";
import banner3 from "../assets/images/bannerBg2.jpg";
import whychoose from "../assets/images/whychoose.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


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
  const [prevIndex, setPrevIndex] = useState(0);
 const [activeIndex, setActiveIndex] = useState(0);
  const triggersRef = useRef([]);
  const lockRef = useRef(false);

   useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);

        // 🔒 prevent multiple triggers
        if (
          entry.isIntersecting &&
          !lockRef.current &&
          index !== activeIndex
        ) {
          lockRef.current = true;
          setActiveIndex(index);

          // unlock after animation finishes
          setTimeout(() => {
            lockRef.current = false;
          }, 800); // must match flip animation duration
        }
      });
    },
    {
      threshold: 0.7,
    }
  );

  triggersRef.current.forEach((el) => el && observer.observe(el));
  return () => observer.disconnect();
}, [activeIndex]);


  useEffect(() => {
  if (activeIndex !== prevIndex) {
    setPrevIndex(activeIndex);
  }
}, [activeIndex]);

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

const items = [
  {
    title: "The Coffee Everyone Talks About",
    desc1: "Slow-brewed with patience and precision, delivering a bold aroma.",
    desc2: "Made for mornings, meetings, and moments worth savoring.",
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
  },
  {
    title: "Our Most Ordered Dessert",
    desc1: "Freshly baked with soft textures and balanced sweetness.",
    desc2: "The dessert people come back for again and again.",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    title: "The Cafe Special Savory",
    desc1: "Warm, comforting, and crafted to pair perfectly with coffee.",
    desc2: "A dish that turns first-time visitors into regulars.",
    img: whychoose, // your image
  },
];



 


  return (
    <>
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
              <div className="absolute inset-0 bg-black/45 h-full]"></div>

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

 <section className="bg-[#140A06] text-[#F4EDE6]">

      {/* HEADING (NORMAL SCROLL) */}
      <div className="pt-15 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C78665] tracking-[0.4em] uppercase text-sm">
            Not Our Menu — Our Identity
          </p>
          <h2 className="mt-6 text-5xl md:text-[50px] font-serif">
            These Dishes <br /> Built Our Cafe
          </h2>
          <p className="mt-6 text-lg text-[#D6C7BC]">
            People don’t remember tables. They remember flavors.
          </p>
        </div>
      </div>

      {/* SCROLL SPACE */}
      <div className="relative h-[400vh]">

        {/* STICKY CONTENT */}
        <div className="sticky top-0 h-screen flex items-center px-6">
          <div className="max-w-4xl mx-auto w-full">

            {/* STATIC DESIGN */}
            <div className="grid md:grid-cols-[auto_1px_1fr] gap-10 items-center overflow-hidden">

              {/* IMAGE */}
              <img
                key={`img-${activeIndex}`}
                src={items[activeIndex].img}
                alt=""
                className="
                  w-[300px] h-[300px] object-cover rounded-2xl shadow-2xl mx-auto
                  animate-flip-in
                "
              />

              {/* VERTICAL LINE */}
              <div className="hidden md:block h-[220px] w-[1px] bg-[#C78665]" />

              {/* CONTENT */}
              <div
                key={`text-${activeIndex}`}
                className="animate-flip-in"
              >
                <h3 className="text-3xl font-serif text-[#C78665]">
                  {items[activeIndex].title}
                </h3>
                <p className="mt-4 text-lg text-[#E4D6CB]">
                  {items[activeIndex].desc1}
                </p>
                <p className="mt-3 text-base text-[#CFC0B6]">
                  {items[activeIndex].desc2}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* SCROLL TRIGGERS */}
        {items.map((_, i) => (
          <div
            key={i}
            ref={(el) => (triggersRef.current[i] = el)}
            data-index={i}
            className="h-screen"
          />
        ))}
      </div>
    </section>




    </>

  );
}

export default Homee;
