import React, { useState, useEffect, useRef } from "react";
import { Star, Flame, Leaf, ChevronRight, ChevronLeft, Quote, X, ZoomIn } from "lucide-react";

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const featuredMenu = [
  {
    name: "Pan-Seared Scallops with Saffron Risotto",
    price: "$38",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=85",
    tags: ["🔥", "★"],
  },
  {
    name: "Truffle Infused Wild Mushroom Pasta",
    price: "$26",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=85",
    tags: ["🌿", "★"],
  },
  {
    name: "Braised Lamb Shank with Polenta",
    price: "$42",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=85",
    tags: ["🔥"],
  },
];

const quickBites = [
  {
    name: "Wagyu Beef Sliders",
    price: "$38",
    rating: 5,
    tags: ["🔥", "🌶"],
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    name: "Lobster Mac & Cheese",
    price: "$26",
    rating: 5,
    tags: ["🌿", "🍋"],
    img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80",
  },
  {
    name: "Beetroot & Goat Cheese Salad",
    price: "$46",
    rating: 5,
    tags: ["🌿"],
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    name: "Chocolate Lava Cake",
    price: "$42",
    rating: 5,
    tags: ["🌿", "🍋"],
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  },
];

const chefsSpecials = [
  {
    name: "The Grand Seafood Platter — Ocean's Finest Selection",
    desc: "A journey of flavor, artistry and refined ambiance. Delicate sashimi, artisinal herbaceous condiments, premium restaurant de parisian.",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=700&q=85",
  },
  {
    name: "Signature Omakase — Chef's Artistic Vision",
    desc: "Consistently fabulous, textured, luxurious. Copulante saborioso, lubricants consumir, capinte saborioso, lubricants consumir lorem ipsum a rebone abore.",
    img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=700&q=85",
  },
];

const premiumDishes = [
  {
    name: "The Grand Seafood Platter Ocean's Finest Selection",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A falorum thereminus.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=85",
    large: true,
  },
  {
    name: "Black Truffle Risotto",
    desc: "Earthy truffle shaved over creamy arborio rice.",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=85",
    large: false,
  },
  {
    name: "Wagyu Beef Tenderloin",
    desc: "Grade A5 wagyu, perfectly seared.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=85",
    large: false,
  },
];

const ambience = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=85",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=85",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=500&q=85",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&q=85",
];

const testimonials = [
  {
    name: "Alexandra Moore",
    role: "Food Critic, The Times",
    text: "An extraordinary dining experience that transcends the ordinary. Every dish tells a story of passion, craftsmanship, and culinary mastery.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "James Whitfield",
    role: "Executive, Forbes",
    text: "From the first bite to the final dessert, this restaurant delivered an impeccably curated symphony of flavors. Truly world-class.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Sophia Laurent",
    role: "Chef & Author",
    text: "Rarely does one find such technical excellence married with soul. The truffle pasta alone is worth the trip across continents.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

/* masonry items — mix of portrait, landscape, square */
const masonryItems = [
  { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85", label: "Dining Hall", span: "row-span-2" },
  { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=85", label: "Scallop Risotto", span: "" },
  { img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=85", label: "Omakase", span: "" },
  { img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=85", label: "Lava Cake", span: "row-span-2" },
  { img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=85", label: "Truffle Risotto", span: "" },
  { img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=85", label: "Pasta", span: "" },
  { img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=85", label: "Bar Area", span: "row-span-2" },
  { img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=85", label: "Seafood Platter", span: "" },
  { img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=85", label: "Private Dining", span: "" },
  { img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=85", label: "Wine Corner", span: "" },
  { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85", label: "Wagyu Burger", span: "" },
  { img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=85", label: "Lamb Shank", span: "row-span-2" },
];

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div
      className="min-h-screen bg-[#0d0b09] text-white"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp .7s ease both; }
        .fu1 { animation-delay:.1s }
        .fu2 { animation-delay:.25s }
        .fu3 { animation-delay:.4s }
        .gold { color: #C9A84C; }
        .gold-bg { background: #C9A84C; }
        .card-hover { transition: transform .35s, box-shadow .35s; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba(0,0,0,.55); }
        .img-zoom img { transition: transform .55s ease; }
        .img-zoom:hover img { transform: scale(1.07); }
        .masonry { columns: 2; column-gap: 12px; }
        @media(min-width:768px){ .masonry { columns: 3; } }
        @media(min-width:1024px){ .masonry { columns: 4; } }
        .masonry-item { break-inside: avoid; margin-bottom: 12px; }
        .shine::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.06) 50%, transparent 60%);
          opacity:0; transition: opacity .4s;
        }
        .shine:hover::after { opacity:1; }
      `}</style>

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-50">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=90"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ animation: "none" }}
        />
        {/* layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0d0b09]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/80 via-transparent to-transparent" />

        {/* Decorative gold lines */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
        <div className="absolute top-1/3 translate-y-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-8 pb-24 grid md:grid-cols-2 gap-10 items-end">
          {/* Left content */}
          <div>
            <p className="fu fu1 text-[#C9A84C] text-[11px] tracking-[4px] uppercase mb-4 font-sans">
              Fine Dining Experience
            </p>
            <h1 className="fu fu2 text-5xl md:text-6xl font-serif font-bold leading-[1.1] mb-6">
              Experience<br />
              <span className="text-[#C9A84C] italic">Culinary</span><br />
              Excellence.
            </h1>
            <p className="fu fu3 text-white/50 text-base font-sans mb-8 max-w-sm leading-relaxed">
              A journey of flavor, artistry, and refined ambiance,<br />crafted for the discerning palate.
            </p>
            <div className="fu fu3 flex gap-4">
              <button className="px-7 py-3.5 rounded-full border border-[#C9A84C] text-[#C9A84C] text-sm font-sans font-semibold hover:bg-[#C9A84C] hover:text-[#0d0b09] transition-all duration-300 uppercase tracking-widest">
                Reserve a Table
              </button>
              <button className="px-7 py-3.5 rounded-full bg-white/10 backdrop-blur text-white text-sm font-sans font-semibold hover:bg-white/20 transition-all duration-300 uppercase tracking-widest">
                Explore Menu
              </button>
            </div>
          </div>

          {/* Right — decorative stat bubbles */}
          <div className="hidden md:flex justify-end gap-4 items-end pb-4">
            {[
              { num: "15+", label: "Michelin Stars" },
              { num: "200+", label: "Menu Items" },
              { num: "98%", label: "Guest Satisfaction" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 text-center">
                <p className="text-[#C9A84C] text-2xl font-bold font-sans">{s.num}</p>
                <p className="text-white/40 text-xs font-sans mt-1 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          FEATURED MENU
      ══════════════════════════ */}
      <section className="py-20 px-6 md:px-14 bg-[#0d0b09]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-2">Signature Creations</p>
            <h2 className="text-4xl font-serif font-bold">Featured Menu</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMenu.map((item, i) => (
              <div key={i} className="card-hover img-zoom bg-[#131110] rounded-2xl overflow-hidden border border-white/5 cursor-pointer shine relative">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131110] to-transparent" />
                  <div className="absolute top-3 right-3 bg-[#C9A84C] text-[#0d0b09] text-sm font-bold px-3 py-1 rounded-full font-sans">
                    {item.price}
                  </div>
                  <div className="absolute top-3 left-3 flex gap-1">
                    {item.tags.map((t, ti) => (
                      <span key={ti} className="text-base">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-serif text-base font-semibold leading-snug mb-2">{item.name}</h3>
                  <p className="text-white/35 text-xs font-sans leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. More en dolestrim.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          TWO COLUMN — QUICK BITES + CHEF SPECIALS
      ══════════════════════════ */}
      <section className="py-4 pb-20 px-6 md:px-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Quick bites grid */}
          <div>
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-6">Quick Bites</p>
            <div className="grid grid-cols-2 gap-4">
              {quickBites.map((item, i) => (
                <div key={i} className="card-hover img-zoom bg-[#131110] rounded-xl overflow-hidden border border-white/5 cursor-pointer">
                  <div className="relative h-32 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <h4 className="text-white text-xs font-serif font-semibold leading-tight flex-1">{item.name}</h4>
                      <span className="text-[#C9A84C] text-xs font-bold font-sans flex-shrink-0">{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array(item.rating).fill(0).map((_, si) => (
                          <Star key={si} size={9} className="text-[#C9A84C] fill-[#C9A84C]" />
                        ))}
                      </div>
                      <div className="flex gap-1">
                        {item.tags.map((t, ti) => <span key={ti} className="text-xs">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef's Specials */}
          <div>
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-6">Chef's Specials</p>
            <div className="flex flex-col gap-4">
              {chefsSpecials.map((item, i) => (
                <div key={i} className="card-hover img-zoom bg-[#131110] rounded-xl overflow-hidden border border-white/5 cursor-pointer flex gap-4">
                  <div className="relative w-32 flex-shrink-0 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#131110]/30" />
                  </div>
                  <div className="py-4 pr-4 flex flex-col justify-center">
                    <h4 className="text-white font-serif text-sm font-semibold leading-snug mb-2">{item.name}</h4>
                    <p className="text-white/35 text-xs font-sans leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          PREMIUM DISHES
      ══════════════════════════ */}
      <section className="py-10 pb-20 px-6 md:px-14 bg-[#0a0908]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-2">Elevated Cuisine</p>
            <h2 className="text-4xl font-serif font-bold">Premium Dishes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large featured */}
            <div className="card-hover img-zoom md:col-span-1 md:row-span-2 bg-[#131110] rounded-2xl overflow-hidden border border-white/5 cursor-pointer relative h-72 md:h-full" style={{ minHeight: "360px" }}>
              <img src={premiumDishes[0].img} alt={premiumDishes[0].name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl font-bold leading-snug mb-2">{premiumDishes[0].name}</h3>
                <p className="text-white/50 text-xs font-sans leading-relaxed">{premiumDishes[0].desc}</p>
              </div>
            </div>
            {premiumDishes.slice(1).map((dish, i) => (
              <div key={i} className="card-hover img-zoom bg-[#131110] rounded-2xl overflow-hidden border border-white/5 cursor-pointer relative h-44">
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-serif text-sm font-bold">{dish.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          DINING AMBIENCE GALLERY
      ══════════════════════════ */}
      <section className="py-16 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-2">Inside Our World</p>
            <h2 className="text-4xl font-serif font-bold">Dining Ambience Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ambience.map((img, i) => (
              <div
                key={i}
                className="img-zoom relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ height: i % 2 === 0 ? "200px" : "160px" }}
                onClick={() => setLightbox(img)}
              >
                <img src={img} alt="ambience" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          MASONRY GALLERY
      ══════════════════════════ */}
      <section className="py-16 px-6 md:px-14 bg-[#0a0908]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-2">Visual Journey</p>
            <h2 className="text-4xl font-serif font-bold">Masonry Gallery</h2>
            <p className="text-white/40 text-sm font-sans mt-2">Every frame tells a story of flavor, craft & elegance</p>
          </div>

          <div className="masonry">
            {masonryItems.map((item, i) => (
              <div
                key={i}
                className="masonry-item img-zoom relative rounded-2xl overflow-hidden cursor-pointer group border border-white/5"
                onClick={() => setLightbox(item.img)}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full object-cover"
                  style={{ height: i % 3 === 0 ? "280px" : i % 3 === 1 ? "200px" : "240px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350 flex flex-col justify-end p-4">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest font-sans">{item.label}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/15 backdrop-blur rounded-full flex items-center justify-center">
                    <ZoomIn size={13} className="text-white" />
                  </div>
                </div>
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]/30 rounded-br-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CUSTOMER TESTIMONIALS
      ══════════════════════════ */}
      <section className="py-20 px-6 md:px-14">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-[11px] tracking-[4px] uppercase font-sans mb-2">What Guests Say</p>
            <h2 className="text-4xl font-serif font-bold">Customer Testimonials</h2>
          </div>

          <div className="relative">
            {/* Active testimonial */}
            <div className="bg-[#131110] rounded-3xl border border-white/5 p-10 md:p-14 text-center">
              <Quote size={36} className="text-[#C9A84C]/30 mx-auto mb-6" />
              <p className="text-white/80 text-lg font-serif italic leading-relaxed mb-8 max-w-2xl mx-auto">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A84C]"
                />
                <div className="text-left">
                  <p className="text-white font-semibold font-serif">{testimonials[activeTestimonial].name}</p>
                  <p className="text-[#C9A84C] text-xs font-sans">{testimonials[activeTestimonial].role}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={10} className="text-[#C9A84C] fill-[#C9A84C]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-7 h-2.5 bg-[#C9A84C]" : "w-2.5 h-2.5 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          LIGHTBOX
      ══════════════════════════ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
            onClick={() => setLightbox(null)}
          >
            <X size={18} className="text-white" />
          </button>
          <img
            src={lightbox}
            alt="lightbox"
            className="max-w-full max-h-[88vh] rounded-2xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}