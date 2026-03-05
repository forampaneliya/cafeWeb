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

import { Users, Clock, Utensils, Play } from "lucide-react";

// ─── DISHES — includes ALL fields used by both the DishShowcase section
//     AND the sticky scroll section ─────────────────────────────────────
const dishes = [
  {
    // DishShowcase fields
    tag: "Chef's Signature · Italian",
    title: "Truffle Black Pasta\nwith Burrata",
    servings: "2 – 4",
    prepTime: "15 min",
    cookTime: "25 min",
    duration: "4:32",
    country: "🇮🇹",
    cuisine: "Italian",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&q=85",
    videoThumb: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
    accent: "#C78665",
    // Sticky-scroll fields
    number: "01",
    label: "Italian · Signature",
    desc1: "A luxurious plate of hand-rolled pasta coated in earthy black truffle paste, crowned with a cloud of fresh burrata and finished with extra-virgin olive oil.",
    desc2: "Best enjoyed the moment it arrives — the truffle's aroma fades fast, and the burrata begins to melt into the warm pasta almost immediately.",
    stat1: { value: "2–4", label: "Servings" },
    stat2: { value: "40 min", label: "Total Time" },
  },
  {
    tag: "Omakase · Japanese",
    title: "Premium Salmon\nSashimi Course",
    servings: "1 – 2",
    prepTime: "20 min",
    cookTime: "0 min",
    duration: "6:10",
    country: "🇯🇵",
    cuisine: "Japanese",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=900&q=85",
    videoThumb: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80",
    accent: "#A3C4BC",
    number: "02",
    label: "Japanese · Omakase",
    desc1: "Pristine Atlantic salmon sliced to order by our itamae, served alongside housemade ponzu, freshly grated wasabi root, and a whisper of shiso.",
    desc2: "Each piece reflects the Japanese philosophy of ma — the beauty of restraint, where nothing is added and nothing is missing.",
    stat1: { value: "1–2", label: "Servings" },
    stat2: { value: "20 min", label: "Prep Time" },
  },
  {
    tag: "Heritage Recipe · Indian",
    title: "Slow-Braised\nButter Chicken",
    servings: "4 – 6",
    prepTime: "30 min",
    cookTime: "50 min",
    duration: "8:45",
    country: "🇮🇳",
    cuisine: "Indian",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=85",
    videoThumb: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80",
    accent: "#E8A87C",
    number: "03",
    label: "Indian · Heritage",
    desc1: "Free-range chicken marinated overnight in yoghurt and whole spices, then simmered low and slow in a velvety tomato-cream sauce perfumed with fenugreek.",
    desc2: "A recipe passed down three generations — the secret is patience, whole-spice tempering, and finishing with cold butter stirred in off the heat.",
    stat1: { value: "4–6", label: "Servings" },
    stat2: { value: "1 hr 20 min", label: "Total Time" },
  },
  {
    tag: "Bistro Classic · French",
    title: "Coq au Vin\nBourguignon",
    servings: "4",
    prepTime: "25 min",
    cookTime: "1 hr 20 min",
    duration: "10:22",
    country: "🇫🇷",
    cuisine: "French",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85",
    videoThumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    accent: "#C4A882",
    number: "04",
    label: "French · Bistro",
    desc1: "A true Burgundian classic — free-range cockerel braised in Pinot Noir with lardons, pearl onions, and earthy button mushrooms until impossibly tender.",
    desc2: "The wine does all the work here. Use a bottle you'd be happy to drink at the table — it becomes the backbone of every single bite.",
    stat1: { value: "4", label: "Servings" },
    stat2: { value: "1 hr 45 min", label: "Total Time" },
  },
];

const pad = (n) => String(n).padStart(2, "0");


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
  const [entering, setEntering] = useState(false);
  const triggersRef = useRef([]);
  const prevIndexRef = useRef(0);
  const containerRef = useRef(null);

  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [dir, setDir] = useState(1);
  const [phase, setPhase] = useState("idle");
  const timeoutRef = useRef(null);

  const [prevState, setPrev] = useState(null);

  const go = (nextIdx, direction) => {
    if (phase !== "idle") return;
    setDir(direction);
    setPrev(active);
    setPhase("exit");
    timeoutRef.current = setTimeout(() => {
      setActive(nextIdx);
      setPhase("enter");
      timeoutRef.current = setTimeout(() => {
        setPrev(null);
        setPhase("idle");
      }, 480);
    }, 320);
  };

  const goNext = () => go((active + 1) % dishes.length, 1);
  const goPrev = () => go((active - 1 + dishes.length) % dishes.length, -1);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const imgStyle = (isCurrent) => {
    if (phase === "idle") return { opacity: 1, transform: "scale(1) translateX(0)" };
    if (isCurrent && phase === "enter")
      return { opacity: 0, transform: `scale(1.04) translateX(${dir * 30}px)` };
    if (isCurrent && phase === "exit")
      return { opacity: 1, transform: "scale(1) translateX(0)" };
    if (!isCurrent && phase === "exit")
      return { opacity: 0, transform: `scale(0.97) translateX(${-dir * 30}px)` };
    return { opacity: 1, transform: "scale(1) translateX(0)" };
  };

  const textStyle = {
    opacity: phase === "idle" ? 1 : 0,
    transform: phase === "idle" ? "translateY(0)" : `translateY(${dir * 10}px)`,
    transition: "opacity 0.42s ease, transform 0.42s ease",
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMenu((prev) =>
        prev === menuItems.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      const containerHeight = containerRef.current.offsetHeight;
      const viewH = window.innerHeight;
      const scrollY = window.scrollY;
      const scrolled = scrollY - containerTop;
      const totalScrollable = containerHeight - viewH;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const idx = Math.min(dishes.length - 1, Math.floor(progress * dishes.length));
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
    handleScroll();
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
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );
    triggersRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const slides = [
    {
      img: banner1,
      eyebrow: "Signature Series",
      title: ["Handcrafted Coffee ", "Brewed to Perfection"],
      desc: "We carefully select premium beans and brew every cup with passion, delivering rich aroma, smooth flavor, and an unforgettable experience.",
      cta: "Explore Menu",
      ctaSub: "View Collection",
      tag: "Est. 2025",
      num: "01",
    },
    {
      img: banner2,
      eyebrow: "Our Ambience",
      title: ["A Cozy Space to Relax,", "Sip & Connect"],
      desc: "Step into a warm and welcoming atmosphere where great coffee, calm moments, and meaningful conversations come together beautifully.",
      cta: "Our Story",
      ctaSub: "Take a Tour",
      tag: "Premium Lounge",
      num: "02",
    },
    {
      img: banner3,
      eyebrow: "Farm to Cup",
      title: ["From Fresh Beans to", "Your Perfect Cup"],
      desc: "Every sip tells a story of quality roasting, expert brewing, and our love for creating coffee moments worth remembering.",
      cta: "Meet the Beans",
      ctaSub: "Sourcing Story",
      tag: "Single Origin",
      num: "03",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const progressRef = useRef(null);
  const DURATION = 6000;

  const goTo = (idx) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setPrevIdx(current);
    setProgress(0);
    setAnimKey((k) => k + 1);
    setTimeout(() => {
      setCurrent(idx);
      setPrevIdx(null);
      setTransitioning(false);
    }, 900);
  };

  const next = () => goTo((current + 1) % slides.length);
  const goBack = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, DURATION);
    return () => clearInterval(id);
  }, [current, transitioning]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / DURATION) * 100, 100));
    }, 30);
    return () => clearInterval(progressRef.current);
  }, [current]);

  const slide = slides[current];
  const prevSlide = prevIdx !== null ? slides[prevIdx] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .cafe-scroll-root {
          font-family: 'Jost', sans-serif;
        }

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

        .grain-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.35;
        }

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

        .h-serif { font-family: 'Cormorant Garamond', serif; }
        .h-sans  { font-family: 'Jost', sans-serif; }

        @keyframes bgIn  { from { opacity:0; transform:scale(1.07); } to { opacity:1; transform:scale(1); } }
        @keyframes bgOut { from { opacity:1; transform:scale(1);    } to { opacity:0; transform:scale(0.96); } }
        .bg-in  { animation: bgIn  0.95s cubic-bezier(0.22,1,0.36,1) forwards; }
        .bg-out { animation: bgOut 0.95s cubic-bezier(0.22,1,0.36,1) forwards; }

        @keyframes lineUp { from { transform:translateY(105%); opacity:0; } to { transform:translateY(0); opacity:1; } }
        @keyframes fadeUp { from { transform:translateY(16px);  opacity:0; } to { transform:translateY(0); opacity:1; } }

        .a-eyebrow { animation: fadeUp 0.55s 0.05s ease both; }
        .a-l0      { animation: lineUp 0.7s 0.18s cubic-bezier(0.22,1,0.36,1) both; }
        .a-l1      { animation: lineUp 0.7s 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        .a-l2      { animation: lineUp 0.7s 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .a-desc    { animation: fadeUp 0.65s 0.46s ease both; }
        .a-btns    { animation: fadeUp 0.65s 0.56s ease both; }
        .a-ghost   { animation: fadeUp 0.6s  0.08s ease both; }

        .btn-shim::after {
          content:''; position:absolute; inset:0;
          background:rgba(255,255,255,0.18);
          transform:translateX(-110%) skewX(-18deg);
          transition:transform 0.55s cubic-bezier(0.25,1,0.5,1);
        }
        .btn-shim:hover::after { transform:translateX(110%) skewX(-18deg); }

        .deco-diag::after {
          content:''; position:absolute;
          left:40%; top:-5%; width:1px; height:110%;
          background:linear-gradient(to bottom,transparent 0%,rgba(199,134,101,0.14) 40%,rgba(199,134,101,0.06) 80%,transparent 100%);
          transform:rotate(9deg); transform-origin:top center;
          pointer-events:none;
        }

        .grain {
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
          mix-blend-mode:overlay;
        }

        .arrow-btn:hover {
          background:rgba(199,134,101,0.15) !important;
          border-color:#C78665 !important;
          color:#C78665 !important;
        }

        .thumb-item:hover:not(.thumb-on) { opacity:0.72 !important; transform:scale(0.97) !important; }

        .prog-fill { transition:width 30ms linear; }

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Josefin+Sans:wght@200;300;400;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .js { font-family: 'Josefin Sans', sans-serif !important; }

        .dish-img { transition: opacity 0.48s cubic-bezier(.4,0,.2,1), transform 0.48s cubic-bezier(.4,0,.2,1); }

        @keyframes ticker { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        .ticker-inner { display:flex; gap:0; animation: ticker 18s linear infinite; white-space:nowrap; }
        .ticker-inner:hover { animation-play-state:paused; }

        @keyframes dotpulse { 0%,100%{opacity:.3;transform:scale(.85)} 50%{opacity:1;transform:scale(1)} }
        .dot-active { animation: dotpulse 2s ease infinite; }

        .num-counter { font-variant-numeric: tabular-nums; }

        @keyframes orn { from{width:0;opacity:0} to{width:48px;opacity:1} }
        .orn-line { animation: orn 1.2s ease .4s both; }

        .vert { writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); }

        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-slide { animation: fadeSlide 0.6s ease forwards; }
      `}</style>


      {/* ══════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════ */}
      <section className="h-sans relative w-full overflow-hidden bg-[#0D0705]"
        style={{ height: "100svh", minHeight: 680 }}>

        {prevSlide && (
          <div key={`p${prevIdx}`}
            className="bg-out absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${prevSlide.img})` }} />
        )}
        <div key={`c${current}`}
          className="bg-in absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.img})` }} />

        <div className="absolute inset-0"
          style={{ background:"linear-gradient(105deg,rgba(13,7,5,0.92) 0%,rgba(13,7,5,0.55) 52%,rgba(13,7,5,0.16) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background:"linear-gradient(to top,rgba(13,7,5,0.90) 0%,transparent 55%)" }} />
        <div className="absolute inset-0"
          style={{ background:"radial-gradient(ellipse at center,transparent 38%,rgba(5,2,1,0.55) 100%)" }} />

        <div className="deco-diag hidden md:block absolute inset-0 pointer-events-none z-[2] overflow-hidden" />

        <div className="hidden lg:block absolute -top-20 -right-28 w-[480px] h-[480px] rounded-full border border-[#C78665]/10 pointer-events-none z-[1]" />
        <div className="hidden lg:block absolute top-5 -right-10 w-[280px] h-[280px] rounded-full border border-[#C78665]/[0.07] pointer-events-none z-[1]" />

        <div className="grain absolute inset-0 z-[9] pointer-events-none opacity-30" />

        <div className="absolute top-0 left-0 right-0 h-px z-20"
          style={{ background:"linear-gradient(to right,transparent,rgba(199,134,101,0.45),transparent)" }} />

        <div key={animKey}
          className="absolute inset-0 z-10 flex flex-col justify-center
                     px-5 sm:px-10 md:px-16 lg:px-20 xl:px-28
                     pt-24 pb-32 max-w-[700px]">

          <span className="a-ghost h-serif absolute pointer-events-none select-none"
            style={{
              fontSize:"clamp(5rem,12vw,9rem)", fontWeight:300,
              color:"rgba(199,134,101,0.055)", lineHeight:1,
              top:"clamp(55px,11vh,108px)", left:"clamp(14px,4vw,70px)",
              letterSpacing:"-0.04em", zIndex:0,
            }}>
            {slide.num}
          </span>

          <div className="a-eyebrow flex items-center gap-3 mb-5 relative z-10">
            <span className="inline-block w-7 h-px bg-[#C78665] flex-shrink-0" />
            <span className="text-[#C78665] text-[10px] tracking-[0.35em] uppercase font-light">
              {slide.eyebrow}
            </span>
          </div>

          <h1
            className="h-serif relative z-10 mb-6"
            style={{
              fontWeight: 300,
              fontSize: "clamp(50px, 3vw, 40px)",
              lineHeight: 1.06,
              color: "#F4EDE6"
            }}
          >
            {slide.title.map((line, i) => (
              <span key={`${current}-${i}`} className="block overflow-hidden">
                <span
                  className={`block a-l${i}`}
                  style={{ color: i === 0 ? "#C78665" : "#F4EDE6" }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="a-desc relative z-10 text-[#D6C7BC]/80 leading-[1.75] mb-9 max-w-md"
            style={{ fontSize:"clamp(0.82rem,1.3vw,1rem)" }}>
            {slide.desc}
          </p>

          <div className="a-btns relative z-10 flex items-center gap-3 flex-wrap">
            <button className="btn-shim relative overflow-hidden
              bg-[#C78665] text-[#140A06] font-medium
              px-7 py-[11px] rounded-full
              text-[11px] tracking-[0.22em] uppercase
              transition-shadow duration-300
              hover:shadow-[0_0_28px_rgba(199,134,101,0.45)]
              cursor-pointer">
              <span className="relative z-10">{slide.cta}</span>
            </button>

            <button className="hidden sm:block
              border border-[#C78665]/40 text-[#F4EDE6]/75 bg-transparent
              px-7 py-[11px] rounded-full
              text-[11px] tracking-[0.22em] uppercase
              hover:border-[#C78665] hover:text-[#C78665]
              transition-all duration-300 cursor-pointer">
              {slide.ctaSub}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-2.5 absolute right-6 top-1/2 -translate-y-1/2 z-20">
          {slides.map((s, i) => (
            <div key={i} onClick={() => goTo(i)} role="button"
              className={`thumb-item w-[52px] h-[70px] rounded-lg overflow-hidden cursor-pointer
                border relative transition-all duration-300
                ${i === current
                  ? "thumb-on border-[#C78665] opacity-100 scale-100"
                  : "border-transparent opacity-45 scale-95"}`}>
              <img src={s.img} alt="" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 transition-colors duration-300
                ${i === current ? "bg-[#0D0705]/10" : "bg-[#0D0705]/40"}`} />
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-col items-center gap-2 absolute z-20"
          style={{ right:"clamp(80px,9vw,155px)", top:"clamp(28px,8vh,72px)" }}>
          <div className="w-11 h-11 rounded-full border border-[#C78665]/40 flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" stroke="#C78665" strokeWidth="1"/>
              <path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="#C78665" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[#C78665] text-[9px] tracking-[0.28em] uppercase"
            style={{ writingMode:"vertical-rl" }}>
            {slide.tag}
          </span>
        </div>

        <div className="absolute bottom-15 left-0 right-0 z-20
          flex items-end justify-between gap-4
          px-5 sm:px-10 md:px-16 lg:px-20 pb-6 sm:pb-8">

          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="h-serif text-[#C78665] leading-none"
                style={{ fontSize:"2rem", fontWeight:300 }}>
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-[#C78665]/35 text-[11px] tracking-wide">
                / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <div key={i} role="button" onClick={() => goTo(i)}
                  className="relative h-[2px] bg-[#C78665]/20 rounded-full overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ width: i === current ? 72 : 28 }}>
                  <div className="prog-fill absolute left-0 top-0 bottom-0 bg-[#C78665] rounded-full"
                    style={{
                      width: i === current ? `${progress}%` : i < current ? "100%" : "0%",
                    }} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex lg:hidden gap-2 items-center">
            {slides.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} role="button"
                className={`rounded-full cursor-pointer transition-all duration-400
                  ${i === current
                    ? "w-5 h-[5px] bg-[#C78665]"
                    : "w-[5px] h-[5px] bg-[#C78665]/30"}`} />
            ))}
          </div>

          <div className="hidden md:flex gap-2.5">
            {[{ label: "←", fn: goBack }, { label: "→", fn: next }].map(({ label, fn }) => (
              <button key={label} onClick={fn}
                className="arrow-btn w-11 h-11 rounded-full
                  border border-[#C78665]/30 bg-[#C78665]/[0.05]
                  text-[#F4EDE6]/70 text-base
                  flex items-center justify-center
                  backdrop-blur-sm cursor-pointer
                  transition-all duration-250">
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          ABOUT SECTION
      ══════════════════════════════════════ */}
      <section className="bg-[#140A06] text-[#F4EDE6] py-16 md:py-20 lg:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">

          <div className="relative flex justify-center order-1 md:order-none">
            <div className="w-[280px] h-[360px] sm:w-[300px] sm:h-[400px] md:w-[450px] md:h-[500px] lg:w-[380px] lg:h-[500px] rounded-[140px] sm:rounded-[160px] md:rounded-[180px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
                alt="Cafe Interior"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-5 sm:top-8 md:top-10 -right-3 sm:-right-4 md:-right-6 bg-[#C78665] text-[#140A06] px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl text-center">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">Since 2025</p>
              <p className="text-[10px] sm:text-xs md:text-sm tracking-wide">Crafting Coffee & Moments</p>
            </div>

            <div className="absolute bottom-8 sm:bottom-10 left-5 sm:left-10 md:left-15 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-25 lg:h-25 rounded-full overflow-hidden border-2 border-[#C78665]">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                alt="Our Barista"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-2 md:order-none">
            <p className="text-[#C78665] uppercase tracking-[0.3em] text-xs sm:text-sm mb-3 md:mb-4">
              About Our Cafe
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4 md:mb-6">
              Crafted With Passion, <br /> Served With Heart
            </h2>

            <p className="text-[#D6C7BC] text-base sm:text-lg mb-6 md:mb-8 max-w-xl">
              Our cafe is more than just a place for coffee — it's a space where
              flavors, conversations, and comfort come together. Every cup and
              every dish is prepared with care, quality ingredients, and a love
              for creating memorable moments.
            </p>

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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="relative overflow-hidden px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base bg-[#C78665] text-white group w-full sm:w-auto">
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-[#C78665] transition-colors duration-300">Explore Menu</span>
              </button>

              <button className="relative overflow-hidden px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base border border-[#D6C7BC] text-[#F4EDE6] group w-full sm:w-auto">
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-[#C78665] transition-colors duration-300">Visit Our Cafe</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          MENU HIGHLIGHT SECTION
      ══════════════════════════════════════ */}
      <section className="bg-[#F4EDE6] py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center">

          <div className="min-h-[220px] text-center lg:text-left">
            <p className="text-[#B88968] tracking-[0.3em] uppercase text-xs mb-4">
              Cafechino Special
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2E1F18] leading-tight">
              Morning Happy
            </h2>

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

          <div className="flex gap-6 sm:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveMenu(index)}
                className="cursor-pointer min-w-[140px] sm:min-w-[160px] lg:w-[170px] text-center flex-shrink-0"
              >
                <div className={`rounded-2xl overflow-hidden transition-all duration-700 ease-in-out
                  ${activeMenu === index ? "scale-105 lg:scale-110 shadow-2xl" : "scale-95 opacity-70"}`}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className={`w-full h-[140px] sm:h-[160px] lg:h-[170px] object-cover transition-transform duration-700
                      ${activeMenu === index ? "scale-105" : "scale-100"}`}
                  />
                </div>
                <p className={`mt-4 text-sm font-medium transition-all duration-300
                  ${activeMenu === index ? "text-[#2E1F18]" : "text-[#9C8B82]"}`}>
                  {item.title}
                </p>
                <p className="text-xs text-[#9C8B82] mt-1">★ 4.{index + 5}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          STICKY SCROLL SECTION
      ══════════════════════════════════════ */}
      <div className="cafe-scroll-root bg-[#140A06] text-[#F4EDE6]">

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

        {/* Mobile: Swipeable Cards */}
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
                      <p className="text-[10px] text-[#8A7A72] uppercase tracking-wider mt-0.5">{it.stat1.label}</p>
                    </div>
                    <div>
                      <p className="text-[#C78665] text-sm font-semibold">{it.stat2.value}</p>
                      <p className="text-[10px] text-[#8A7A72] uppercase tracking-wider mt-0.5">{it.stat2.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] tracking-[0.25em] text-[#8A7A72] uppercase mt-4">Swipe to explore</p>
        </div>

        {/* Tablet + Desktop: Sticky Scroll */}
        <div className="hidden sm:block">
          <div className="relative" ref={containerRef} style={{ height: `${(dishes.length + 1) * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

              <div
                key={`glow-${activeIndex}`}
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                  background: `radial-gradient(ellipse 50% 60% at 65% 50%, rgba(199,134,101,0.08) 0%, transparent 70%)`,
                }}
              />

              <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20">
                {dishes.map((_, i) => (
                  <div key={i} className={`track-dot ${i === activeIndex ? "active" : ""}`} />
                ))}
              </div>

              <div className="w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-20 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">

                {/* IMAGE SIDE */}
                <div className="relative flex justify-center order-2 lg:order-1">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140A06]/60 via-transparent to-transparent rounded-sm" />
                    <div className="grain-overlay rounded-sm" />

                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#C78665] border border-[#C78665]/40 bg-[#140A06]/70 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {item1.label}
                      </span>
                    </div>

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

                {/* TEXT SIDE */}
                <div className="order-1 lg:order-2" key={`text-${activeIndex}`}>

                  <div className="anim-label flex items-center gap-3 mb-5">
                    <span className="w-6 h-px bg-[#C78665]" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-[#C78665]">{item1.label}</span>
                    <span className="text-[10px] tracking-[0.2em] text-[#8A7A72]">— {item1.number} / 0{dishes.length}</span>
                  </div>

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

                  <div className="anim-line h-px bg-[#C78665]/40 mb-6 w-16" />

                  <p className="anim-desc1 text-[#D6C7BC] leading-relaxed mb-3" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
                    {item1.desc1}
                  </p>
                  <p className="anim-desc2 text-[#8A7A72] text-sm leading-relaxed mb-8">
                    {item1.desc2}
                  </p>

                  <div className="anim-btn flex items-center gap-5">
                    <button className="explore-btn"><span>Explore Dish</span></button>
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

              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C78665]/10">
                <div
                  className="h-full bg-[#C78665]/50 transition-all duration-700 ease-out"
                  style={{ width: `${((activeIndex + 1) / dishes.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* ══════════════════════════════════════
          DISH SHOWCASE SECTION
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#f4ede6] overflow-hidden px-0 py-0">

        <div className="absolute inset-0 z-0">
          <img
            key={`bg-${active}`}
            src={dish.img}
            alt=""
            className="dish-img w-full h-full object-cover opacity-20"
            style={imgStyle(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#271910] via-[#0A0502]/80 to-[#f4ede6]/40" />
        </div>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-[#C78665]/20" />
          <span className="js vert text-[9px] tracking-[.35em] text-[#C78665]/50 uppercase">
            World Cuisine Gallery
          </span>
          <div className="w-px h-20 bg-[#C78665]/20" />
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
          {dishes.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              className={`transition-all duration-300 rounded-full ${
                i === active
                  ? "w-1.5 h-8 bg-[#C78665] dot-active"
                  : "w-1 h-3 bg-[#C78665]/25 hover:bg-[#C78665]/50"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center">

            <div className="flex flex-col gap-8">

              <div style={textStyle}>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl">{dish.country}</span>
                  <div className="h-px w-8 bg-[#C78665]/50" />
                  <p className="js text-[#C78665] text-[10px] tracking-[.35em] uppercase">
                    {dish.tag}
                  </p>
                </div>
              </div>

              <div style={textStyle}>
                <h1
                  className="cg font-light text-[#F4EDE6] leading-[1.08]"
                  style={{ fontSize: "clamp(44px,6.5vw,88px)" }}
                >
                  {dish.title.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {i === 1 ? <em className="text-[#C78665]">{line}</em> : line}
                    </span>
                  ))}
                </h1>
                <div className="flex items-center gap-3 mt-5">
                  <div className="orn-line h-px bg-[#C78665]" style={{ width: 48 }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C78665]" />
                  <div className="h-px w-6 bg-[#C78665]/40" />
                </div>
              </div>

              <div style={textStyle} className="flex gap-8 lg:gap-12 flex-wrap">
                {[
                  { Icon: Users, label: "Servings", value: dish.servings },
                  { Icon: Clock, label: "Prep", value: dish.prepTime },
                  { Icon: Utensils, label: "Cook", value: dish.cookTime },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <p className="js text-[#8A7060] text-[9px] tracking-[.3em] uppercase">{label}</p>
                    <div className="flex items-center gap-2">
                      <Icon size={12} className="text-[#C78665]" />
                      <span className="cg text-[#F4EDE6] text-xl font-light">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={textStyle} className="flex items-center gap-5">
                <div className="relative w-40 h-24 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0 border border-[#C78665]/15 shadow-[0_8px_24px_rgba(0,0,0,.5)]">
                  <img
                    src={dish.videoThumb}
                    alt="Watch"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0A0502]/50 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#C78665] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play size={14} fill="#140A06" color="#140A06" className="ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 js bg-[#0A0502]/70 text-white text-[10px] px-1.5 py-0.5 rounded tracking-wide">
                    {dish.duration}
                  </span>
                </div>
                <div>
                  <p className="cg text-[#F4EDE6] text-base font-light mb-0.5">Watch &amp; Cook</p>
                  <p className="js text-[#8A7060] text-[11px] font-light leading-relaxed max-w-[160px]">
                    Follow along with our chef step by step
                  </p>
                </div>
              </div>

              <div style={textStyle} className="flex items-center gap-5 flex-wrap">
                <button className="js px-9 py-3.5 rounded-full bg-[#C78665] text-[#140A06] text-[11px] font-semibold tracking-[.2em] uppercase hover:opacity-85 transition-all duration-200 shadow-[0_8px_24px_rgba(199,134,101,.3)]">
                  Explore Recipe
                </button>
                <button className="js px-9 py-3.5 rounded-full border border-[#C78665]/30 text-[#C4A882] text-[11px] font-light tracking-[.2em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all duration-200">
                  Reserve Table
                </button>
              </div>

              <div style={textStyle} className="flex items-center gap-6 pt-2">
                <button
                  onClick={goPrev}
                  className="group flex items-center gap-2 text-[#8A7060] hover:text-[#C78665] transition-colors duration-200"
                >
                  <span className="w-8 h-8 rounded-full border border-[#3A2A1E] group-hover:border-[#C78665] flex items-center justify-center transition-colors duration-200">
                    <ChevronLeft size={14} />
                  </span>
                  <span className="js text-[10px] tracking-[.2em] uppercase hidden sm:block">Prev</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="cg text-[#C78665] text-2xl font-light num-counter">{pad(active + 1)}</span>
                  <div className="relative w-20 h-px bg-[#3A2A1E]">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#C78665] transition-all duration-500"
                      style={{ width: `${((active + 1) / dishes.length) * 100}%` }}
                    />
                  </div>
                  <span className="cg text-[#3A2A1E] text-2xl font-light num-counter">{pad(dishes.length)}</span>
                </div>

                <button
                  onClick={goNext}
                  className="group flex items-center gap-2 text-[#8A7060] hover:text-[#C78665] transition-colors duration-200"
                >
                  <span className="js text-[10px] tracking-[.2em] uppercase hidden sm:block">Next</span>
                  <span className="w-8 h-8 rounded-full border border-[#3A2A1E] group-hover:border-[#C78665] flex items-center justify-center transition-colors duration-200">
                    <ChevronRight size={14} />
                  </span>
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-[#C78665]/15 pointer-events-none z-0" />
              <div className="absolute -top-8 -right-8 w-3/4 h-3/4 rounded-xl border border-[#C78665]/8 pointer-events-none z-0" />

              <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,.7)] aspect-[3/4] z-10">
                <img
                  key={`card-${active}`}
                  src={dish.img}
                  alt={dish.title}
                  className="dish-img w-full h-full object-cover"
                  style={imgStyle(true)}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0502] via-[#0A0502]/70 to-transparent pt-16 pb-5 px-6">
                  <p className="js text-[#C78665] text-[9px] tracking-[.3em] uppercase mb-1">
                    {dish.country} {dish.cuisine}
                  </p>
                  <p className="cg text-[#F4EDE6] text-xl font-light">
                    {dish.title.replace("\n", " ")}
                  </p>
                </div>

                <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-[#C78665]/40 pointer-events-none" />
                <div className="absolute bottom-16 right-4 w-10 h-10 border-b border-r border-[#C78665]/40 pointer-events-none" />
              </div>

              <div className="absolute -left-6 top-1/3 z-20 bg-[#140A06] border border-[#C78665]/25 rounded-xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,.5)]">
                <p className="js text-[#8A7060] text-[9px] tracking-[.25em] uppercase mb-0.5">Cuisine</p>
                <p className="cg text-[#F4EDE6] text-base font-light">{dish.cuisine}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#1A0F08] overflow-hidden py-3 bg-[#ffff]/80 backdrop-blur-sm">
          <div className="ticker-inner">
            {[...Array(2)].map((_, rep) => (
              <span key={rep} className="flex items-center">
                {["Italian Pasta", "Japanese Sashimi", "Indian Curry", "French Coq au Vin", "Mediterranean Mezze", "Mexican Tacos", "French Crème Brûlée"].map((item, i) => (
                  <span key={i} className="js text-[#3A2A1E] text-[10px] tracking-[.25em] uppercase px-8 flex items-center gap-8">
                    {item}
                    <span className="text-[#C78665]/40 text-xs">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

      </section>

    </>
  );
}

export default Homee;