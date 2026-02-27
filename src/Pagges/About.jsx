import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight, ChevronLeft, ShoppingCart, Bookmark,
  Share2, ArrowRight, Star, Globe, Flame, Leaf, Instagram, Twitter, Facebook
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   VERTICAL LOOP ANIMATION CLASS
══════════════════════════════════════════════════════════════ */
class VerticalLoopAnimation {
  constructor(container, options = {}) {
    this.container = container;
    this.track = container.querySelector(".verticalLoop-track");
    if (!this.track) return;
    this.config = Object.assign({ speed: 1, direction: "up", pauseOnHover: false }, options);
    this.originalItems = Array.from(this.track.children);
    this.scrollPos = 0;
    this.singleSetHeight = 0;
    this.isHovering = false;
    this.animationId = null;
    this.handleMouseEnter = () => (this.isHovering = true);
    this.handleMouseLeave = () => (this.isHovering = false);
    this.init();
  }
  init() {
    if (this.config.pauseOnHover) {
      this.container.addEventListener("mouseenter", this.handleMouseEnter);
      this.container.addEventListener("mouseleave", this.handleMouseLeave);
    }
    this.setupContent();
    window.addEventListener("resize", () => this.calculateHeights());
  }
  setupContent() {
    this.originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      this.track.appendChild(clone);
    });
    const images = Array.from(this.track.querySelectorAll("img"));
    const promises = images.map((img) => new Promise((resolve) => {
      if (img.complete) return resolve();
      img.onload = resolve;
      img.onerror = resolve;
    }));
    Promise.all(promises).then(() => { this.calculateHeights(); this.start(); });
  }
  calculateHeights() {
    this.singleSetHeight = this.originalItems.reduce((sum, item) => sum + item.offsetHeight, 0);
  }
  animate = () => {
    if (!this.singleSetHeight) this.calculateHeights();
    if (!this.config.pauseOnHover || !this.isHovering) {
      this.scrollPos += this.config.speed;
      if (this.scrollPos >= this.singleSetHeight) this.scrollPos %= this.singleSetHeight;
      const translate = this.config.direction === "up" ? -this.scrollPos : -this.singleSetHeight + this.scrollPos;
      this.track.style.transform = `translate3d(0, ${translate}px, 0)`;
    }
    this.animationId = requestAnimationFrame(this.animate);
  };
  start() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animate();
  }
}

/* ══════════════════════════════════════════════════════════════
   DATA — INTERNATIONAL VEG DISHES (non-Indian)
══════════════════════════════════════════════════════════════ */
const dishes = [
  {
    name: "Caprese Pasta",
    origin: "🇮🇹 Italy",
    category: "Italian",
    price: "$14.99",
    rating: "4.9",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80",
  },
  {
    name: "Avocado Sushi Roll",
    origin: "🇯🇵 Japan",
    category: "Japanese",
    price: "$13.50",
    rating: "4.8",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80",
  },
  {
    name: "Falafel Wrap",
    origin: "🇱🇧 Lebanon",
    category: "Middle East",
    price: "$11.99",
    rating: "4.7",
    tag: "Healthy",
    img: "https://images.unsplash.com/photo-1561626423-a51b45aef0a1?w=500&q=80",
  },
  {
    name: "Mushroom Risotto",
    origin: "🇮🇹 Italy",
    category: "Italian",
    price: "$16.00",
    rating: "4.9",
    tag: "Chef's Pick",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80",
  },
  {
    name: "Greek Mezze Platter",
    origin: "🇬🇷 Greece",
    category: "Greek",
    price: "$18.50",
    rating: "4.8",
    tag: "Sharing",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80",
  },
  {
    name: "Veggie Pad Thai",
    origin: "🇹🇭 Thailand",
    category: "Thai",
    price: "$12.99",
    rating: "4.7",
    tag: "Spicy",
    img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=500&q=80",
  },
];

const specialties = [
  {
    label: "🇲🇽 Mexico",
    name: "Veggie Tacos",
    desc: "Crispy corn tortillas loaded with grilled peppers, black beans & salsa",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&q=80",
  },
  {
    label: "🇫🇷 France",
    name: "Ratatouille",
    desc: "Slow-roasted Provençal vegetable casserole with herb oil drizzle",
    img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=700&q=80",
  },
  {
    label: "🇯🇵 Japan",
    name: "Miso Ramen",
    desc: "Rich umami broth with silken tofu, bamboo shoots & nori",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&q=80",
  },
];

/* ─── CHEFS ─── */
const chefs = [
  {
    name: "Marco Bellini",
    role: "Executive Chef",
    origin: "Milan, Italy",
    specialty: "Italian & Mediterranean",
    exp: "14 yrs",
    img: "https://images.unsplash.com/photo-1583394293214-0b7c0cb1a8e0?w=500&q=80",
    quote: "Every dish is a story told through flavor.",
    social: { ig: "#", tw: "#", fb: "#" },
    awards: ["Michelin Star 2022", "Best Chef EU 2023"],
  },
  {
    name: "Yuki Tanaka",
    role: "Head Sushi Chef",
    origin: "Kyoto, Japan",
    specialty: "Japanese & Asian Fusion",
    exp: "11 yrs",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=80",
    quote: "Simplicity is the ultimate sophistication.",
    social: { ig: "#", tw: "#", fb: "#" },
    awards: ["Best Asian Cuisine 2023"],
  },
  {
    name: "Sofia Herrera",
    role: "Pastry & Desserts Chef",
    origin: "Barcelona, Spain",
    specialty: "French Pastry & Spanish",
    exp: "9 yrs",
    img: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500&q=80",
    quote: "Desserts are the punctuation of a great meal.",
    social: { ig: "#", tw: "#", fb: "#" },
    awards: ["Top Pastry Chef 2024"],
  },
  {
    name: "Léa Fontaine",
    role: "Sous Chef",
    origin: "Lyon, France",
    specialty: "French Classics & Vegan",
    exp: "7 yrs",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=500&q=80",
    quote: "Great food is all about balance and love.",
    social: { ig: "#", tw: "#", fb: "#" },
    awards: ["Rising Star Chef 2024"],
  },
];

/* ─── FOOD CATEGORIES ─── */
const foodCategories = {
  snacks: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80",
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80",
  ],
  drinks: [
    "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80",
    "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400&q=80",
    "https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?w=400&q=80",
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
  ],
  coffee: [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80",
  ],
  dessert: [
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80",
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80",
  ],
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function About() {
  const [dishPage, setDishPage] = useState(0);
  const [activeChef, setActiveChef] = useState(0);
  const dishesPerPage = 3;
  const totalPages = Math.ceil(dishes.length / dishesPerPage);
  const visibleDishes = dishes.slice(dishPage * dishesPerPage, dishPage * dishesPerPage + dishesPerPage);

  const containerRefs = {
    snacks: useRef(),
    drinks: useRef(),
    coffee: useRef(),
    dessert: useRef(),
  };

  useEffect(() => {
    Object.keys(containerRefs).forEach((category, index) => {
      const container = containerRefs[category].current;
      if (!container) return;
      new VerticalLoopAnimation(container, {
        speed: 0.8 + index * 0.25,
        direction: index % 2 === 0 ? "up" : "down",
        pauseOnHover: true,
      });
    });
  }, []);

  return (
    <div className="bg-[#F7F2EC] min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ══════════════════════════════════════
          § 1 · HERO
      ══════════════════════════════════════ */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          alt="Restaurant"
          className="w-full h-full object-cover scale-105"
          style={{ animation: "heroZoom 8s ease-in-out infinite alternate" }}
        />
        <style>{`
          @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1); } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
          .fade-up { animation: fadeUp 0.7s ease forwards; }
          .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
          .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
          .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
          .dish-card:hover .dish-img { transform: scale(1.07); }
          .chef-card { transition: box-shadow 0.3s, transform 0.3s; }
          .chef-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.13); }
        `}</style>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Chef image fading in from right */}
        <img
          src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=700&q=85"
          alt="Chef"
          className="absolute right-0 bottom-0 h-[95%] object-cover object-top w-[42%] pointer-events-none"
          style={{
            maskImage: "linear-gradient(to left, black 55%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 95%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-center px-14 max-w-2xl">
          <p className="fade-up-1 text-[#E7C27D] text-[11px] tracking-[4px] uppercase mb-3 font-sans">Welcome to Cafechino</p>
          <h1 className="fade-up-2 text-white text-4xl md:text-5xl font-serif font-bold leading-[1.15] mb-6">
            We Live Your Best<br />Flavoring And Taste
          </h1>
          <button className="fade-up-3 bg-[#E7C27D] text-[#1A1410] text-xs font-bold px-8 py-3.5 rounded-full w-fit hover:bg-white transition-all duration-300 uppercase tracking-widest font-sans shadow-lg">
            See Menu
          </button>
        </div>

        <button className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/30 transition">
          <ChevronLeft size={17} className="text-white" />
        </button>
        <button className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/30 transition">
          <ChevronRight size={17} className="text-white" />
        </button>

        {/* Scroll indicator dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className={`rounded-full transition-all ${i === 0 ? "w-6 h-2 bg-[#E7C27D]" : "w-2 h-2 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          § 2 · YOUR DISHES
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F2EC] py-14 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#C78665] text-[11px] tracking-[3px] uppercase mb-2 font-sans">Food Menu</p>
              <h2 className="text-[#1A1410] text-3xl font-serif font-bold">Your Dishes</h2>
              <p className="text-[#9A8070] text-sm mt-1 font-sans">International vegetarian cuisine from around the world</p>
            </div>
            <div className="flex items-center gap-3 font-sans">
              <span className="text-xs text-[#9A8070]">{dishPage + 1} / {totalPages}</span>
              <button
                onClick={() => setDishPage(p => Math.max(0, p - 1))}
                disabled={dishPage === 0}
                className="w-9 h-9 rounded-full border border-[#C78665] flex items-center justify-center hover:bg-[#C78665] hover:text-white disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setDishPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={dishPage === totalPages - 1}
                className="w-9 h-9 rounded-full bg-[#C78665] text-white flex items-center justify-center hover:bg-[#1A1410] disabled:opacity-30 transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Dish cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleDishes.map((dish, i) => (
              <div key={i} className="dish-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group cursor-pointer">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="dish-img w-full h-full object-cover transition-transform duration-500"
                  />
                  {/* Tag */}
                  <div className="absolute top-3 left-3 bg-[#E7C27D] text-[#1A1410] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest font-sans shadow">
                    {dish.tag}
                  </div>
                  {/* Origin */}
                  <div className="absolute top-3 right-10 bg-white/90 backdrop-blur text-[10px] font-semibold text-[#7A6A62] px-2 py-1 rounded-full font-sans">
                    {dish.origin}
                  </div>
                  <button className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
                    <Bookmark size={11} className="text-[#C78665]" />
                  </button>
                  {/* Category chip */}
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur text-white text-[10px] px-2.5 py-1 rounded-full font-sans tracking-wide">
                    {dish.category}
                  </div>
                </div>
                {/* Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[#1A1410] font-bold text-base leading-tight">{dish.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={10} className={s <= 4 ? "text-[#E7C27D] fill-[#E7C27D]" : "text-[#E7C27D] fill-[#E7C27D]"} />
                        ))}
                        <span className="text-[11px] text-[#9A8070] ml-1 font-sans">{dish.rating}</span>
                      </div>
                    </div>
                    <span className="text-[#C78665] font-bold text-lg font-sans">{dish.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#1A1410] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#C78665] transition-colors duration-200 font-sans uppercase tracking-wide">
                      <ShoppingCart size={13} /> Add to Cart
                    </button>
                    <button className="w-10 h-10 border border-[#ebe0d5] rounded-xl flex items-center justify-center hover:border-[#C78665] transition-colors">
                      <Share2 size={13} className="text-[#9A8070]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          § 3 · ABOUT / FEATURED TWO-COLUMN
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 px-6 md:px-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#C78665]" />
              <p className="text-[#C78665] text-[11px] tracking-[3px] uppercase font-sans">About Us</p>
            </div>
            <h2 className="text-[#1A1410] text-3xl md:text-4xl font-serif font-bold leading-tight mb-5">
              The Brilliant Taste<br />Behind Every Dish
            </h2>
            <p className="text-[#7A6A62] text-[15px] leading-relaxed mb-4 font-sans">
              We celebrate culinary traditions from across the globe — bringing the finest vegetarian creations from Italy, Japan, France, Lebanon, Mexico, and beyond directly to your table.
            </p>
            <p className="text-[#7A6A62] text-[15px] leading-relaxed mb-8 font-sans">
              Each dish is crafted with passion, premium ingredients, and deep respect for its cultural roots. Our mission is simple: make the world's best vegetarian food accessible, memorable, and beautiful.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { num: "12+", label: "Countries" },
                { num: "60+", label: "Dishes" },
                { num: "50K+", label: "Guests Served" },
              ].map((s, i) => (
                <div key={i} className="text-center py-4 bg-[#FBF7F3] rounded-2xl border border-[#F0E6DB]">
                  <p className="text-[#C78665] text-2xl font-bold font-sans">{s.num}</p>
                  <p className="text-[#9A8070] text-xs mt-1 font-sans uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

            <button className="bg-[#E7C27D] text-[#1A1410] text-xs font-bold px-8 py-3.5 rounded-full uppercase tracking-widest hover:bg-[#1A1410] hover:text-white transition-all duration-300 flex items-center gap-2 font-sans shadow-md">
              Explore Our Story <ArrowRight size={14} />
            </button>
          </div>

          {/* Right — stacked images */}
          <div className="relative h-[420px]">
            <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85"
                alt="Restaurant"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=85"
                alt="Dining"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-4 left-4 bg-[#1A1410] text-white rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-[#E7C27D] text-xl font-bold font-sans">Since 2025</p>
              <p className="text-white/60 text-[11px] font-sans">Crafting Moments</p>
            </div>
            {/* Globe badge */}
            <div className="absolute bottom-12 right-2 bg-[#E7C27D] rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-lg">
              <Globe size={18} className="text-[#1A1410]" />
              <span className="text-[9px] font-bold text-[#1A1410] font-sans mt-0.5">GLOBAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          § 4 · SPECIALTIES GRID
      ══════════════════════════════════════ */}
      <section className="bg-[#F7F2EC] py-16 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#C78665]" />
              <p className="text-[#C78665] text-[11px] tracking-[3px] uppercase font-sans">Cuisine Line</p>
              <div className="w-8 h-px bg-[#C78665]" />
            </div>
            <h2 className="text-[#1A1410] text-3xl md:text-4xl font-serif font-bold">World Favorites</h2>
            <p className="text-[#9A8070] text-sm mt-2 font-sans">Hand-picked signature dishes from our global kitchen</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialties.map((item, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                style={{ height: i === 1 ? "360px" : "300px" }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                  style={{ transition: "transform 0.6s ease" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block bg-[#E7C27D]/90 text-[#1A1410] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-sans mb-2">
                    {item.label}
                  </span>
                  <h3 className="text-white text-xl font-serif font-bold">{item.name}</h3>
                  <p className="text-white/70 text-xs mt-1 font-sans leading-relaxed">{item.desc}</p>
                </div>

                {/* Hover actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition">
                    <Bookmark size={13} className="text-white" />
                  </button>
                  <button className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition">
                    <Share2 size={13} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          § 5 · OUR CHEFS — FULL SECTION
      ══════════════════════════════════════ */}
      <section className="bg-[#1A1410] py-20 px-6 md:px-14 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#E7C27D]" />
                <p className="text-[#E7C27D] text-[11px] tracking-[3px] uppercase font-sans">Meet The Team</p>
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-serif font-bold leading-tight">
                The Culinary<br />
                <span className="text-[#E7C27D]">Masters</span> Behind<br />
                Every Bite
              </h2>
            </div>
            <p className="text-white/50 text-sm font-sans max-w-xs leading-relaxed">
              Our world-class chefs bring decades of international experience, passion, and cultural expertise to create extraordinary vegetarian experiences.
            </p>
          </div>

          {/* Chef cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefs.map((chef, i) => (
              <div
                key={i}
                className="chef-card bg-[#221810] rounded-2xl overflow-hidden border border-white/5 cursor-pointer group"
                onClick={() => setActiveChef(i)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={chef.img}
                    alt={chef.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221810] via-transparent to-transparent" />

                  {/* Experience badge */}
                  <div className="absolute top-3 right-3 bg-[#E7C27D] text-[#1A1410] text-[10px] font-bold px-2.5 py-1 rounded-full font-sans uppercase">
                    {chef.exp}
                  </div>

                  {/* Social icons — appear on hover */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {[Instagram, Twitter, Facebook].map((Icon, si) => (
                      <a key={si} href="#" className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#E7C27D] transition-colors">
                        <Icon size={12} className="text-white" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-[#E7C27D] text-[10px] tracking-[2px] uppercase font-sans mb-1">{chef.role}</p>
                  <h3 className="text-white text-lg font-serif font-bold">{chef.name}</h3>
                  <p className="text-white/40 text-xs font-sans mt-0.5">📍 {chef.origin}</p>

                  <div className="mt-3 pt-3 border-t border-white/8">
                    <p className="text-white/50 text-xs font-sans mb-2 flex items-center gap-1.5">
                      <Flame size={11} className="text-[#E7C27D]" />
                      {chef.specialty}
                    </p>
                    <p className="text-white/30 text-xs italic font-serif">"{chef.quote}"</p>
                  </div>

                  {/* Awards */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {chef.awards.map((award, ai) => (
                      <span key={ai} className="text-[9px] bg-[#E7C27D]/10 text-[#E7C27D] border border-[#E7C27D]/20 px-2 py-0.5 rounded-full font-sans">
                        🏆 {award}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <button className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/60 text-xs font-sans py-2.5 rounded-xl hover:border-[#E7C27D] hover:text-[#E7C27D] transition-all duration-200 uppercase tracking-wide">
                    View Profile <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chef quick-view strip */}
          <div className="mt-10 bg-[#221810] rounded-2xl border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5 grid grid-cols-1 md:grid-cols-4">
            {chefs.map((chef, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-6 py-5 cursor-pointer transition-all duration-200 ${activeChef === i ? "bg-[#E7C27D]/10" : "hover:bg-white/3"}`}
                onClick={() => setActiveChef(i)}
              >
                <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 transition-all ${activeChef === i ? "border-[#E7C27D]" : "border-white/10"}`}>
                  <img src={chef.img} alt={chef.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#E7C27D] text-[10px] uppercase tracking-wide font-sans mb-0.5">{chef.role}</p>
                  <p className="text-white text-sm font-semibold truncate">{chef.name}</p>
                </div>
                <ArrowRight size={14} className={`flex-shrink-0 transition-colors ${activeChef === i ? "text-[#E7C27D]" : "text-white/20"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          § 6 · FOOD CATEGORIES (original — kept)
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-14 bg-[#1A1410] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#E7C27D]" />
              <p className="text-[#E7C27D] text-[11px] tracking-[3px] uppercase font-sans">Browse By Type</p>
              <div className="w-8 h-px bg-[#E7C27D]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">
              Our Food <span className="text-[#E7C27D]">Categories</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(foodCategories).map((category, index) => (
              <div
                key={category}
                className="verticalLoop-wrap h-[320px] overflow-hidden rounded-2xl border border-[#E7C27D]/15 relative group"
                ref={containerRefs[category]}
              >
                <div className="verticalLoop-track flex flex-col">
                  {foodCategories[category].map((img, i) => (
                    <div key={i} className="verticalLoop-item p-1">
                      <img
                        src={img}
                        alt={category}
                        className="w-full h-[210px] object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </div>
                {/* Category overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent pt-12 pb-4 px-4 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <Leaf size={13} className="text-[#E7C27D]" />
                    <p className="text-[#E7C27D] text-sm font-bold uppercase tracking-widest capitalize font-sans">{category}</p>
                  </div>
                </div>
                {/* Top hover tint */}
                <div className="absolute inset-0 bg-[#E7C27D]/0 group-hover:bg-[#E7C27D]/5 transition-colors duration-300 pointer-events-none rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}