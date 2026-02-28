import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import banner1 from "../assets/images/bannerBg.jpg";
import banner2 from "../assets/images/bannerBg1.jpg";
import banner3 from "../assets/images/bannerBg2.jpg";
import whychoose from "../assets/images/whychoose.jpg";
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dish1 from "../assets/images/26.jpg"
import dish2 from "../assets/images/12.jpg"
import dish3 from "../assets/images/44.jpg"
import dish4 from "../assets/images/41.jpg"
import dish5 from "../assets/images/33.jpg"
import bg from "../assets/images/bg.jpg"

  import { Users, Clock, Utensils } from "lucide-react";





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

const dishes = [
  {
    tag: "italian special",
    title: "Classic Margherita Pizza With Fresh Basil",
    servings: 4,
    prepTime: "20 m",
    cookTime: "18 m",
    img: dish1,
    videoThumb: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&q=80",
    duration: "04:10",
  },
  {
    tag: "chef's favorite",
    title: "Creamy Alfredo Pasta With Garlic Bread",
    servings: 3,
    prepTime: "15 m",
    cookTime: "25 m",
    img: dish2,
    videoThumb: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&q=80",
    duration: "03:45",
  },
  {
    tag: "sweet delight",
    title: "Fudgy Chocolate Brownie With Choco Chips",
    servings: 2,
    prepTime: "15 m",
    cookTime: "30 m",
    img: dish3,
    videoThumb: "https://images.unsplash.com/photo-1586985289906-406988974504?w=200&q=80",
    duration: "02:50",
  },
  {
    tag: "refreshing drink",
    title: "Mint Mojito With Fresh Lime And Ice",
    servings: 2,
    prepTime: "10 m",
    cookTime: "0 m",
    img: dish4,
    videoThumb: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&q=80",
    duration: "02:20",
  },
  {
    tag: "quick bites",
    title: "Grilled Veg Sandwich With Cheese Filling",
    servings: 2,
    prepTime: "10 m",
    cookTime: "10 m",
    img: dish5,
    videoThumb: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=200&q=80",
    duration: "03:15",
  },
];

  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 400);
  };

  const prev = () => goTo(active === 0 ? dishes.length - 1 : active - 1);
  const next = () => goTo(active === dishes.length - 1 ? 0 : active + 1);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [active]);

  const dish = dishes[active];
  const padNum = (n) => String(n).padStart(2, "0");

 




  const menuItems = [
    {
      title: "Classic Latte",
      desc: "Smooth espresso blended with steamed milk and finished with delicate latte art.",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      title: "Cappuccino",
      desc: "Rich espresso with creamy foam, balanced flavor and bold aroma.",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    },
    {
      title: "Caramel Macchiato",
      desc: "Sweet caramel drizzle over perfectly layered espresso and milk.",
      img: "https://images.unsplash.com/photo-1498804103079-a6351b050096",
    },
    {
      title: "Mocha Special",
      desc: "Chocolate infused espresso topped with whipped cream delight.",
      img: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e",
    },
  ];

  const [activeMenu, setActiveMenu] = useState(0);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMenu((prev) =>
        prev === menuItems.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  

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


  

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  

  return (
    <>
      {/* HERO SLIDER */}
      <section className="relative overflow-hidden">
  <Slider {...settings}>
    {slides.map((slide, index) => (
      <div key={index} className="relative h-[85vh] sm:h-[90vh] md:h-screen">
        
        {/* Image */}
        <img
          src={slide.img}
          alt=""
          className="hero-img w-full h-[100vh] object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t h-full from-black/70 via-black/40 to-black/10"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center 
                        pt-16 sm:pt-20 md:pt-32 lg:pt-0">
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            
            {/* Title */}
            <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[48px]
                           font-serif font-medium text-[#E7C27D] mb-4 leading-tight">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-white text-sm sm:text-base md:text-lg
                          mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              {slide.desc}
            </p>

            {/* Button */}
            <button className="border border-white text-white 
                               px-6 sm:px-8 py-2.5 sm:py-3 
                               rounded-3xl uppercase tracking-widest 
                               text-[11px] sm:text-sm 
                               hover:bg-white hover:text-[#3B2A22] 
                               transition-all duration-300">
              Explore Menu
            </button>

          </div>
        </div>
      </div>
    ))}
  </Slider>

  {/* Fix Slider Arrows Position */}
  <style jsx>{`
    .slick-prev,
    .slick-next {
      z-index: 20;
    }

    /* Mobile */
    @media (max-width: 640px) {
      .slick-prev {
        left: 10px;
      }
      .slick-next {
        right: 10px;
      }
    }

    /* Tablet */
    @media (min-width: 641px) and (max-width: 1024px) {
      .slick-prev {
        left: 20px;
      }
      .slick-next {
        right: 20px;
      }
    }
  `}</style>
</section>


      <section className="bg-[#140A06] text-[#F4EDE6] py-16 md:py-20 lg:py-28 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">

    {/* LEFT IMAGE SECTION */}
    <div className="relative flex justify-center order-1 md:order-none">
      {/* Oval Image */}
      <div className="w-[280px] h-[360px] sm:w-[300px] sm:h-[400px] md:w-[450px] md:h-[500px] lg:w-[380px] lg:h-[500px] rounded-[140px] sm:rounded-[160px] md:rounded-[180px] overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="Cafe Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Experience Badge */}
      <div className="absolute top-5 sm:top-8 md:top-10 -right-3 sm:-right-4 md:-right-6 bg-[#C78665] text-[#140A06] px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">Since 2025</p>
        <p className="text-[10px] sm:text-xs md:text-sm tracking-wide">Crafting Coffee & Moments</p>
      </div>

      {/* Small Avatar */}
      <div className="absolute bottom-8 sm:bottom-10 left-5 sm:left-10 md:left-15 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-25 lg:h-25 rounded-full overflow-hidden border-2 border-[#C78665]">
        <img
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
          alt="Our Barista"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* RIGHT CONTENT */}
    <div className="order-2 md:order-none">
      <p className="text-[#C78665] uppercase tracking-[0.3em] text-xs sm:text-sm mb-3 md:mb-4">
        About Our Cafe
      </p>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4 md:mb-6">
        Crafted With Passion, <br /> Served With Heart
      </h2>

      <p className="text-[#D6C7BC] text-base sm:text-lg mb-6 md:mb-8 max-w-xl">
        Our cafe is more than just a place for coffee — it’s a space where
        flavors, conversations, and comfort come together. Every cup and
        every dish is prepared with care, quality ingredients, and a love
        for creating memorable moments.
      </p>

      {/* Bullet Points */}
      <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
        <li className="flex items-center gap-2 md:gap-3 text-sm sm:text-base">
          <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#C78665] flex-shrink-0" />
          <span>Freshly Brewed Coffee & Handcrafted Beverages</span>
        </li>
        <li className="flex items-center gap-2 md:gap-3 text-sm sm:text-base">
          <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#C78665] flex-shrink-0" />
          <span>House-Made Desserts & Comfort Savories</span>
        </li>
        <li className="flex items-center gap-2 md:gap-3 text-sm sm:text-base">
          <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#C78665] flex-shrink-0" />
          <span>Warm Ambience for Work, Friends & Relaxation</span>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Explore Menu */}
        <button
          className="relative overflow-hidden px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base
            bg-[#C78665] text-white group w-full sm:w-auto"
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
          className="relative overflow-hidden px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base
            border border-[#D6C7BC] text-[#F4EDE6] group w-full sm:w-auto"
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
      <section className="bg-[#F4EDE6] py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden relative">

  {/* Animation Styles */}
  <style>
    {`
      @keyframes fadeSlide {
        0% { opacity: 0; transform: translateY(15px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .fade-slide {
        animation: fadeSlide 0.6s ease forwards;
      }
    `}
  </style>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center">

    {/* LEFT CONTENT */}
    <div className="min-h-[220px] text-center lg:text-left">

      <p className="text-[#B88968] tracking-[0.3em] uppercase text-xs mb-4">
        Cafechino Special
      </p>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2E1F18] leading-tight">
        Morning Happy
      </h2>

      {/* Animated Changing Content */}
      <div key={activeMenu} className="fade-slide mt-6 sm:mt-8">
        <h3 className="text-xl sm:text-2xl font-serif text-[#2E1F18]">
          {menuItems[activeMenu].title}
        </h3>

        <p className="text-[#7A6A62] mt-4 leading-relaxed max-w-md mx-auto lg:mx-0">
          {menuItems[activeMenu].desc}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
        <button className="px-6 py-3 rounded-full border border-[#2E1F18] text-[#2E1F18] hover:bg-[#2E1F18] hover:text-white transition-all duration-300">
          About Roasting
        </button>

        <button className="px-6 py-3 rounded-full bg-[#5A3828] text-white hover:opacity-90 transition-all duration-300">
          Our Menu
        </button>
      </div>

    </div>

    {/* RIGHT IMAGE ROW */}
    <div className="flex gap-6 sm:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">

      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveMenu(index)}
          className="cursor-pointer min-w-[140px] sm:min-w-[160px] lg:w-[170px] text-center flex-shrink-0"
        >
          <div
            className={`rounded-2xl overflow-hidden transition-all duration-700 ease-in-out
              ${activeMenu === index
                ? "scale-105 lg:scale-110 shadow-2xl"
                : "scale-95 opacity-70"
              }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className={`w-full h-[140px] sm:h-[160px] lg:h-[170px] object-cover transition-transform duration-700
                ${activeMenu === index
                  ? "scale-105"
                  : "scale-100"
                }
              `}
            />
          </div>

          <p
            className={`mt-4 text-sm font-medium transition-all duration-300
              ${activeMenu === index
                ? "text-[#2E1F18]"
                : "text-[#9C8B82]"
              }`}
          >
            {item.title}
          </p>

          <p className="text-xs text-[#9C8B82] mt-1">
            ★ 4.{index + 5}
          </p>
        </div>
      ))}

    </div>

  </div>
</section>

      {/* SCROLL SECTION */}
      <section className="bg-[#140A06] text-[#F4EDE6]">

  {/* HEADING (NORMAL SCROLL) */}
  <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-[#C78665] tracking-[0.4em] uppercase text-xs sm:text-sm">
        Not Our Menu — Our Identity
      </p>
      <h2 className="mt-4 sm:mt-5 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
        These Dishes <br className="hidden sm:block" /> Built Our Cafe
      </h2>
      <p className=" text-base sm:text-lg text-[#D6C7BC]">
        People don’t remember tables. They remember flavors.
      </p>
    </div>
  </div>

  {/* SCROLL SPACE */}
  <div className="relative h-[400vh]">

    {/* STICKY CONTENT */}
    <div className="sticky top-0 h-screen flex items-center px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">

        {/* STATIC DESIGN */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1px_1fr] gap-6 sm:gap-8 md:gap-10 items-center overflow-hidden">

          {/* IMAGE */}
          <img
            key={`img-${activeIndex}`}
            src={items[activeIndex].img}
            alt=""
            className="
              w-[320px] h-[320px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] 
              object-cover rounded-2xl shadow-2xl mx-auto
              animate-flip-in
            "
          />

          {/* VERTICAL LINE */}
          <div className="hidden md:block h-[180px] sm:h-[200px] md:h-[220px] w-[1px] bg-[#C78665]" />

          {/* CONTENT */}
          <div
            key={`text-${activeIndex}`}
            className="text-center md:text-left animate-flip-in"
          >
            <h3 className="text-2xl sm:text-3xl font-serif text-[#C78665]">
              {items[activeIndex].title}
            </h3>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#E4D6CB]">
              {items[activeIndex].desc1}
            </p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#CFC0B6]">
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

    <section className="relative bg-[#0d0d0d] min-h-screen flex items-center justify-center px-5 py-10 overflow-hidden">

  {/* Ambient blurred bg glow */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50  z-0"
    style={{ backgroundImage: `url(${bg})` }}
  />

  {/* Glass Card */}
  <div
    className="relative z-10 w-full max-w-5xl  rounded-2xl border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
    style={{
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
    }}
  >
        {/* BODY GRID */}
        <div className="grid md:grid-cols-2 min-h-[540px]">

          {/* ── LEFT PANEL ── */}
          <div className="relative flex flex-col justify-between p-10 overflow-hidden">

            {/* Warm blob */}
            <div className="absolute -left-8 top-12 w-56 h-64 rounded-full bg-[#c88665]/20 blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-7">

              {/* Tag */}
              <p className="text-white/40 text-xs tracking-[2px] uppercase font-sans">
                {dish.tag}
              </p>

              {/* Title with red left border */}
              <div className="border-l-[3px] border-[#e63946] pl-4">
                <h1
                  key={`title-${active}`}
                  className="text-white font-serif font-bold leading-snug text-2xl md:text-[28px] transition-all duration-500"
                  style={{
                    opacity: animating ? 0 : 1,
                    transform: animating ? "translateX(-10px)" : "translateX(0)",
                  }}
                >
                  {dish.title}
                </h1>
              </div>

              {/* Stats Row */}
              <div className="flex gap-7 font-sans">
                {[
                  { Icon: Users,    label: "servings",  value: dish.servings  },
                  { Icon: Clock,    label: "prep time", value: dish.prepTime  },
                  { Icon: Utensils, label: "cook time", value: dish.cookTime  },
                ].map(({ Icon, label, value }) => (
                  <div key={label}>
                    <p className="text-white/40 text-[10px] tracking-wide mb-1 uppercase">{label}</p>
                    <div className="flex items-center gap-1.5">
                      <Icon size={13} className="text-white/60" />
                      <span className="text-white text-sm font-semibold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Watch and Cook */}
              <div>
                <p className="text-white text-sm font-semibold mb-3 font-sans">Watch and Cook</p>
                <div className="relative w-36 h-[82px] rounded-xl overflow-hidden cursor-pointer group">
                  <img
                    src={dish.videoThumb}
                    alt="Watch and cook"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Dark overlay + play */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <div
                        className="ml-0.5"
                        style={{
                          width: 0, height: 0,
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderLeft: "9px solid #111",
                        }}
                      />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <span className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-sans">
                    {dish.duration}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button className="bg-[#1a1a1a] hover:bg-[#2e2e2e] text-white text-sm font-semibold font-sans px-8 py-3.5 rounded-full tracking-wide transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* ── BOTTOM PREV / NEXT NAV ── */}
            <div className="relative z-10 flex items-center gap-4 mt-8 font-sans">
              <button
                onClick={prev}
                className="flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors duration-200"
              >
                <ChevronLeft size={14} />
                Prev
              </button>

              <span className="text-white/30 text-xs">{padNum(active + 1)}</span>

              {/* Progress bar */}
              <div className="relative flex-1 max-w-[80px] h-px bg-white/20 rounded overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded transition-all duration-500"
                  style={{ width: `${((active + 1) / dishes.length) * 100}%` }}
                />
              </div>

              <span className="text-white/30 text-xs">{padNum(dishes.length)}</span>

              <button
                onClick={next}
                className="flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors duration-200"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* ── RIGHT IMAGE PANEL ── */}
          <div className="relative overflow-hidden h-[550px]">
            <img
              key={`img-${active}`}
              src={dish.img}
              alt={dish.title}
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Left-to-right fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(13,13,13,0.65)] via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </section>






       

    
    </>
  );
}

export default Homee;