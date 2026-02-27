import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import banner1 from "../assets/images/bannerBg.jpg";
import banner2 from "../assets/images/bannerBg1.jpg";
import banner3 from "../assets/images/bannerBg2.jpg";
import whychoose from "../assets/images/whychoose.jpg";
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const triggersRef = useRef([]);
  const lockRef = useRef(false);
   const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
      document.querySelectorAll(".hero-img").forEach((img) => {
        img.style.animation = "none";
        img.offsetHeight;
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
      img: whychoose,
    },
  ];


  const dishes = [
  {
    name: "Grilled Steak",
    price: "₹900",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    name: "Roasted Chicken",
    price: "₹750",
    img: "https://images.unsplash.com/photo-1604908554023-8a61c5b6ad9d",
  },
  {
    name: "Lamb Chops",
    price: "₹1200",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  },
  {
    name: "Herb Fish",
    price: "₹850",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const next = () => {
    setDirection("next");
    setIndex((prev) => (prev + 2) % dishes.length);
  };

  const prev = () => {
    setDirection("prev");
    setIndex((prev) =>
      prev - 2 < 0 ? dishes.length - 2 : prev - 2
    );
  };

  return (
    <>
      {/* HERO SLIDER */}
      <section className="relative overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <img
                src={slide.img}
                alt=""
                className="hero-img w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-6xl mx-auto px-6 text-center">
                  <h1 className="text-[26px] sm:text-[32px] md:text-[40px] font-serif font-medium text-[#E7C27D] mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                    {slide.desc}
                  </p>
                  <button className="border border-white text-white px-8 py-3 rounded-3xl uppercase tracking-widest text-sm hover:bg-white hover:text-[#3B2A22] transition-all">
                    Explore Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>


      <section className="bg-[#140A06] text-[#F4EDE6] py-28 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

    {/* LEFT IMAGE SECTION */}
    <div className="relative flex justify-center">
      {/* Oval Image */}
      <div className="w-[320px] h-[420px] md:w-[380px] md:h-[500px] rounded-[180px] overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="Cafe Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Experience Badge */}
      <div className="absolute top-10 -right-6 bg-[#C78665] text-[#140A06] px-6 py-4 rounded-2xl shadow-xl text-center">
        <p className="text-2xl font-semibold">Since 2025</p>
        <p className="text-sm tracking-wide">Crafting Coffee & Moments</p>
      </div>

      {/* Small Avatar */}
      <div className="absolute bottom-10 left-15 w-25 h-25 rounded-full overflow-hidden border-2 border-[#C78665]">
        <img
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
          alt="Our Barista"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* RIGHT CONTENT */}
    <div>
      <p className="text-[#C78665] uppercase tracking-[0.3em] text-sm mb-4">
        About Our Cafe
      </p>

      <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
        Crafted With Passion, <br /> Served With Heart
      </h2>

      <p className="text-[#D6C7BC] text-lg mb-8 max-w-xl">
        Our cafe is more than just a place for coffee — it’s a space where
        flavors, conversations, and comfort come together. Every cup and
        every dish is prepared with care, quality ingredients, and a love
        for creating memorable moments.
      </p>

      {/* Bullet Points */}
      <ul className="space-y-4 mb-10">
        <li className="flex items-center gap-3">
         <ChevronRightIcon className="w-4 h-4 text-[#C78665]" />

          Freshly Brewed Coffee & Handcrafted Beverages
        </li>
        <li className="flex items-center gap-3">
          <ChevronRightIcon className="w-4 h-4 text-[#C78665]" />

          House-Made Desserts & Comfort Savories
        </li>
        <li className="flex items-center gap-3">
          <ChevronRightIcon className="w-4 h-4 text-[#C78665]" />

          Warm Ambience for Work, Friends & Relaxation
        </li>
      </ul>

      {/* Buttons */}
    <div className="flex gap-4">

  {/* Explore Menu */}
  <button
    className="relative overflow-hidden px-8 py-3 rounded-full font-medium
      bg-[#C78665] text-white group"
  >
    {/* Hover Layer */}
    <span
      className="absolute inset-0 bg-white translate-y-full
        group-hover:translate-y-0 transition-transform duration-300 ease-out"
    ></span>

    {/* Text */}
    <span
      className="relative z-10 group-hover:text-[#C78665]
        transition-colors duration-300"
    >
      Explore Menu
    </span>
  </button>

  {/* Visit Our Cafe */}
  <button
    className="relative overflow-hidden px-8 py-3 rounded-full font-medium
      border border-[#D6C7BC] text-[#F4EDE6] group"
  >
    {/* Hover Layer */}
    <span
      className="absolute inset-0 bg-white translate-y-full
        group-hover:translate-y-0 transition-transform duration-300 ease-out"
    ></span>

    {/* Text */}
    <span
      className="relative z-10 group-hover:text-[#C78665]
        transition-colors duration-300"
    >
      Visit Our Cafe
    </span>
  </button>

</div>


    </div>

  </div>
</section>


      {/* SCROLL SECTION */}
     <section className="bg-[#140A06] text-[#F4EDE6]">

      {/* HEADING (NORMAL SCROLL) */}
      <div className=" px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C78665] tracking-[0.4em] uppercase text-sm">
            Not Our Menu — Our Identity
          </p>
          <h2 className="mt-6 text-5xl md:text-6xl font-serif">
            These Dishes Built Our Cafe
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
