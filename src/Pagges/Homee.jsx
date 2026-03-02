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
// import whychoose1 from "../assets/images/whychoose.jpg";

  import { Users, Clock, Utensils } from "lucide-react";



const dishes = [
  {
    number: "01",
    label: "Signature Brew",
    title: "The Coffee Everyone\nTalks About",
    desc1: "Slow-brewed with patience and precision, delivering a bold aroma that fills every corner of the room.",
    desc2: "Made for mornings, meetings, and moments worth savoring.",
    img: dish1,
    stat1: { value: "4.9★", label: "Rating" },
    stat2: { value: "2.4k+", label: "Served Daily" },
  },
  {
    number: "02",
    label: "House Dessert",
    title: "Our Most Ordered\nDessert",
    desc1: "Freshly baked every morning with soft textures and a perfectly balanced sweetness that lingers.",
    desc2: "The dessert people come back for again and again.",
    img: dish2,
    stat1: { value: "4.8★", label: "Rating" },
    stat2: { value: "800+", label: "Orders Daily" },
  },
  {
    number: "03",
    label: "Cafe Special",
    title: "The Cafe Special\nSavory",
    desc1: "Warm, comforting, and crafted to pair perfectly with coffee. Every bite feels like home.",
    desc2: "A dish that turns first-time visitors into regulars.",
    img: dish3,
    stat1: { value: "4.7★", label: "Rating" },
    stat2: { value: "500+", label: "Orders Daily" },
  },
];

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

  const lockRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entering, setEntering] = useState(false);
  const triggersRef = useRef([]);
  const prevIndexRef = useRef(0);
  const containerRef = useRef(null);



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


  

  //  useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const idx = parseInt(entry.target.dataset.index);
  //           if (idx !== prevIndexRef.current) {
  //             prevIndexRef.current = idx;
  //             setEntering(true);
  //             setTimeout(() => {
  //               setActiveIndex(idx);
  //               setEntering(false);
  //             }, 50);
  //           }
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );
  //   triggersRef.current.forEach((el) => el && observer.observe(el));
  //   return () => observer.disconnect();
  // }, []);

   useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      const containerHeight = containerRef.current.offsetHeight;
      const viewH = window.innerHeight;
      const scrollY = window.scrollY;

      // How far we've scrolled INTO the container
      const scrolled = scrollY - containerTop;
      const totalScrollable = containerHeight - viewH;

      // Clamp progress 0..1
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Map progress to item index
      const idx = Math.min(
        dishes.length - 1,
        Math.floor(progress * dishes.length)
      );

      if (idx !== prevIndexRef.current) {
        prevIndexRef.current = idx;
        setEntering(true);
        setTimeout(() => {
          setActiveIndex(idx);
          setEntering(false);
        }, 50);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const item1 = dishes[activeIndex];

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveIndex(index);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // trigger when 50% of the zone is visible
    }
  );

  triggersRef.current.forEach((el) => el && observer.observe(el));
  return () => observer.disconnect();
}, []);

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

       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .cafe-scroll-root {
          font-family: 'Jost', sans-serif;
        }

        /* ── Clip reveal animation ── */
        @keyframes revealUp {
          from { clip-path: inset(0 0 100% 0); transform: translateY(12px); opacity: 0; }
          to   { clip-path: inset(0 0 0% 0);   transform: translateY(0);    opacity: 1; }
        }
        @keyframes revealLeft {
          from { clip-path: inset(0 100% 0 0); opacity: 0; }
          to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes scaleReveal {
          from { transform: scale(1.08); opacity: 0; filter: blur(6px); }
          to   { transform: scale(1);    opacity: 1; filter: blur(0);   }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes numberSlide {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .anim-img       { animation: scaleReveal 0.9s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-number    { animation: numberSlide 0.6s 0.05s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-label     { animation: revealUp 0.55s 0.1s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-title     { animation: revealUp 0.65s 0.18s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-line      { animation: lineGrow 0.7s 0.25s cubic-bezier(0.25,1,0.5,1) both; transform-origin: left; }
        .anim-desc1     { animation: fadeIn 0.6s 0.3s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-desc2     { animation: fadeIn 0.6s 0.4s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-stats     { animation: fadeIn 0.6s 0.45s cubic-bezier(0.25,1,0.5,1) both; }
        .anim-btn       { animation: fadeIn 0.6s 0.52s cubic-bezier(0.25,1,0.5,1) both; }

        /* Vertical track dots */
        .track-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(199,134,101,0.25);
          transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
          cursor: pointer;
        }
        .track-dot.active {
          height: 32px;
          border-radius: 3px;
          background: #C78665;
          box-shadow: 0 0 10px #C7866580;
        }

        /* Decorative corner bracket */
        .bracket::before, .bracket::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: #C78665;
          border-style: solid;
          opacity: 0.5;
        }
        .bracket-tl::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .bracket-tr::after  { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
        .bracket-bl::before { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
        .bracket-br::after  { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        /* Grain overlay on image */
        .grain-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.35;
        }

        /* Hover button */
        .explore-btn {
          position: relative;
          overflow: hidden;
          border: 1px solid #C78665;
          color: #C78665;
          padding: 10px 28px;
          border-radius: 100px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: color 0.35s ease;
          background: transparent;
          cursor: pointer;
        }
        .explore-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #C78665;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.25,1,0.5,1);
        }
        .explore-btn:hover { color: #140A06; }
        .explore-btn:hover::before { transform: translateY(0); }
        .explore-btn span { position: relative; z-index: 1; }

        /* Mobile swipe strip */
        .swipe-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .swipe-strip::-webkit-scrollbar { display: none; }
        .swipe-card {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 72vw;
          max-width: 280px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(199,134,101,0.15);
          background: rgba(255,255,255,0.02);
        }
      `}</style>


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
     {/* SCROLL SECTION */}
 <div className="cafe-scroll-root bg-[#140A06] text-[#F4EDE6]">

        {/* ── HEADING ── */}
        <div className="pt-16 sm:pt-20 md:pt-24 pb-10 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#C78665] tracking-[0.4em] uppercase text-xs sm:text-sm font-light">
              Not Our Menu — Our Identity
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              These Dishes <br className="hidden sm:block" /> Built Our Cafe
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D6C7BC] font-light">
              People don't remember tables. They remember flavors.
            </p>
          </div>
        </div>

        {/* ── MOBILE: Swipeable Cards ── */}
        <div className="sm:hidden px-5 pb-16">
          <div className="swipe-strip">
            {dishes.map((it, i) => (
              <div key={i} className="swipe-card">
                <div className="relative h-48 overflow-hidden">
                  <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140A06] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase text-[#C78665] bg-[#140A06]/70 px-2 py-1 rounded-full">{it.label}</span>
                  <span className="absolute bottom-3 right-3 text-5xl font-serif text-white/[0.07]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{it.number}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-serif leading-snug text-[#C78665]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {it.title.replace('\n', ' ')}
                  </h3>
                  <p className="mt-2 text-xs text-[#D6C7BC] leading-relaxed">{it.desc1}</p>
                  <div className="flex gap-5 mt-4">
                    <div>
                      <p className="text-[#C78665] text-sm font-semibold">{it.stat1.value}</p>
                      <p className="text-[10px] text-[#8A7A72] uppercase tracking-wider">{it.stat1.label}</p>
                    </div>
                    <div>
                      <p className="text-[#C78665] text-sm font-semibold">{it.stat2.value}</p>
                      <p className="text-[10px] text-[#8A7A72] uppercase tracking-wider">{it.stat2.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll hint */}
          <p className="text-center text-[10px] tracking-[0.25em] text-[#8A7A72] uppercase mt-4">Swipe to explore</p>
        </div>

        {/* ── TABLET + DESKTOP: Sticky Scroll ── */}
        <div className="hidden sm:block">
          <div className="relative" ref={containerRef} style={{ height: `${(dishes.length + 1) * 100}vh` }}>

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

              {/* Ambient glow */}
              <div
                key={`glow-${activeIndex}`}
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                  background: `radial-gradient(ellipse 50% 60% at 65% 50%, rgba(199,134,101,0.08) 0%, transparent 70%)`,
                }}
              />

              {/* Vertical progress track — desktop only */}
              <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20">
                {dishes.map((_, i) => (
                  <div key={i} className={`track-dot ${i === activeIndex ? "active" : ""}`} />
                ))}
              </div>

              {/* Main layout */}
              <div className="w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-20 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">

                {/* ── IMAGE SIDE ── */}
                <div className="relative flex justify-center order-2 lg:order-1">

                  {/* Decorative large number behind image */}
                  <span
                    key={`num-bg-${activeIndex}`}
                    className="anim-number absolute -top-8 -left-4 select-none pointer-events-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(6rem, 14vw, 11rem)",
                      fontWeight: 300,
                      color: "rgba(199,134,101,0.07)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {item1.number}
                  </span>

                  {/* Image with bracket corners */}
                  <div
                    key={`img-${activeIndex}`}
                    className="anim-img relative bracket bracket-tl bracket-br"
                    style={{ width: "min(340px, 80vw)", aspectRatio: "3/4" }}
                  >
                    <img
                      src={item1.img}
                      alt={item1.title}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    {/* Gradient overlay bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140A06]/60 via-transparent to-transparent rounded-sm" />
                    <div className="grain-overlay rounded-sm" />

                    {/* Label pill on image */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#C78665] border border-[#C78665]/40 bg-[#140A06]/70 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {item1.label}
                      </span>
                    </div>

                    {/* Stats badge bottom of image */}
                    <div
                      key={`stats-${activeIndex}`}
                      className="anim-stats absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] flex justify-around bg-[#1C0F09]/80 backdrop-blur-md border border-[#C78665]/20 rounded-xl py-3 px-4"
                    >
                      <div className="text-center">
                        <p className="text-[#C78665] text-sm font-semibold">{item1.stat1.value}</p>
                        <p className="text-[9px] text-[#8A7A72] uppercase tracking-wider mt-0.5">{item1.stat1.label}</p>
                      </div>
                      <div className="w-px bg-[#C78665]/20" />
                      <div className="text-center">
                        <p className="text-[#C78665] text-sm font-semibold">{item1.stat2.value}</p>
                        <p className="text-[9px] text-[#8A7A72] uppercase tracking-wider mt-0.5">{item1.stat2.label}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── TEXT SIDE ── */}
                <div className="order-1 lg:order-2" key={`text-${activeIndex}`}>

                  {/* Index label */}
                  <div className="anim-label flex items-center gap-3 mb-5">
                    <span className="w-6 h-px bg-[#C78665]" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-[#C78665]">{item1.label}</span>
                    <span className="text-[10px] tracking-[0.2em] text-[#8A7A72]">— {item1.number} / 0{dishes.length}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="anim-title font-serif leading-[1.1] mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                      color: "#F4EDE6",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item1.title}
                  </h3>

                  {/* Animated line */}
                  <div className="anim-line h-px bg-[#C78665]/40 mb-6 w-16" />

                  {/* Descriptions */}
                  <p className="anim-desc1 text-[#D6C7BC] leading-relaxed mb-3" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
                    {item1.desc1}
                  </p>
                  <p className="anim-desc2 text-[#8A7A72] text-sm leading-relaxed mb-8">
                    {item1.desc2}
                  </p>

                  {/* CTA */}
                  <div className="anim-btn flex items-center gap-5">
                    <button className="explore-btn"><span>Explore Dish</span></button>

                    {/* Dot navigation */}
                    <div className="flex gap-2 items-center ml-2">
                      {dishes.map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-full transition-all duration-500 ${
                            i === activeIndex
                              ? "w-5 h-[5px] bg-[#C78665]"
                              : "w-[5px] h-[5px] bg-[#C78665]/25"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom thin progress line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C78665]/10">
                <div
                  className="h-full bg-[#C78665]/50 transition-all duration-700 ease-out"
                  style={{ width: `${((activeIndex + 1) / dishes.length) * 100}%` }}
                />
              </div>
            </div>


          </div>
        </div>

        <div className="pb-16 sm:pb-20" />
      </div>

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