import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft, ChevronRight, ArrowRight, Star,
  Globe, Flame, Leaf, Instagram, Twitter, Facebook,
  Award, Clock, Heart, Users, MapPin, Play, X
} from "lucide-react";
import chef1 from "../assets/images/chef1.png"
import chef2 from "../assets/images/chef2.png"
import chef3 from "../assets/images/chef3.png"
import chef4 from "../assets/images/chef4.png"
import bannerImg from "../assets/images/aboutbanner.png";


/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */

const milestones = [
  {
    year: "2010",
    title: "The First Cup",
    desc: "What began as a small corner café in the heart of the city quickly became a neighborhood institution. A single espresso machine, two mismatched tables, and an endless passion for craft.",
    icon: "☕",
    stat: "1 Location",
  },
  {
    year: "2013",
    title: "Flavors From Afar",
    desc: "Our founders traveled through Morocco, Vietnam, and Italy — returning with spices, stories, and a global menu that transformed Cafechino into a culinary destination.",
    icon: "🌍",
    stat: "3 Continents",
  },
  {
    year: "2016",
    title: "A Culinary Name",
    desc: "Featured in 'Best Hidden Gems' by a national food magazine. Our slow-roasted lamb and cardamom tart became signatures that drew guests from across the country.",
    icon: "⭐",
    stat: "12 Awards",
  },
  {
    year: "2019",
    title: "The Second Chapter",
    desc: "We opened our second location in the arts district — a larger canvas for our culinary vision, complete with an open kitchen, wine cellar, and private dining room.",
    icon: "🏛️",
    stat: "2 Locations",
  },
  {
    year: "2023",
    title: "Present Day",
    desc: "Today Cafechino serves over 500 guests daily across two locations, hosts monthly chef collaborations, and remains fiercely committed to the warmth of that first tiny café.",
    icon: "✨",
    stat: "500+ Daily",
  },
];

const chefs = [
  {
    name: "Marco Bellini",
    role: "Executive Chef",
    origin: "Milan, Italy",
    specialty: "Italian & Mediterranean",
    exp: "14 yrs",
    img: chef1,
    quote: "Every dish is a story told through flavor.",
    awards: ["Michelin Star 2022", "Best Chef EU 2023"],
    color: "#C78665",
  },
  {
    name: "Yuki Tanaka",
    role: "Head Sushi Chef",
    origin: "Kyoto, Japan",
    specialty: "Japanese & Asian Fusion",
    exp: "11 yrs",
    img: chef2,
    quote: "Simplicity is the ultimate sophistication.",
    awards: ["Best Asian Cuisine 2023"],
    color: "#8FA68E",
  },
  {
    name: "Sofia Herrera",
    role: "Pastry Chef",
    origin: "Barcelona, Spain",
    specialty: "French Pastry & Spanish",
    exp: "9 yrs",
    img: chef3,
    quote: "Desserts are the punctuation of a great meal.",
    awards: ["Top Pastry Chef 2024"],
    color: "#B8956A",
  },
  {
    name: "Léa Fontaine",
    role: "Sous Chef",
    origin: "Lyon, France",
    specialty: "French Classics & Vegan",
    exp: "7 yrs",
    img: chef4,
    quote: "Great food is all about balance and love.",
    awards: ["Rising Star Chef 2024"],
    color: "#C4A882",
  },
];

const values = [
  { icon: Globe, title: "Global Roots", desc: "Every recipe honours the culture it came from — sourced, studied and perfected with respect." },
  { icon: Leaf, title: "Pure Ingredients", desc: "Farm-to-table philosophy. We know the name of every farmer who grows our produce." },
  { icon: Heart, title: "Made With Love", desc: "No shortcuts. Every sauce is simmered, every dough is hand-rolled, every dessert is crafted fresh daily." },
  { icon: Users, title: "Community First", desc: "Cafechino is more than food — it's a gathering space, a classroom, and a home away from home." },
];

const stats = [
  { num: "18", suffix: "+", label: "World Cuisines" },
  { num: "200", suffix: "+", label: "Unique Dishes" },
  { num: "50", suffix: "K+", label: "Guests Served" },
  { num: "98", suffix: "%", label: "Satisfaction" },
];

const specialties = [
  { label: "🇲🇽 Mexico", name: "Veggie Tacos", desc: "Crispy corn tortillas, grilled peppers, black beans & salsa verde", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&q=80" },
  { label: "🇫🇷 France", name: "Ratatouille", desc: "Slow-roasted Provençal vegetable casserole with herb oil drizzle", img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=700&q=80" },
  { label: "🇯🇵 Japan", name: "Miso Ramen", desc: "Rich umami broth with silken tofu, bamboo shoots & nori", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&q=80" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Culinary Travel Blogger", text: "Walking into Cafechino feels like boarding a flight around the world. Every plate tells a story I didn't expect.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Marco Benedetti", role: "Michelin Inspector", text: "Technical precision married with genuine soul — that's the rarest combination, and Cafechino has cracked it.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Aiko Tanaka", role: "Food Journalist, Bon Appétit", text: "The authenticity here is staggering. This isn't fusion — it's curation. And it's magnificent.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

/* ══════════════════════════════════════════════════════
   COUNTER HOOK
══════════════════════════════════════════════════════ */
function useCounter(target, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(cur);
      if (cur >= target) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [start, target]);
  return count;
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function About() {
  const [activeChef, setActiveChef] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);
  const statsRef = useRef(null);

  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % milestones.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSelect = (i) => {
    setActive(i);
    startAuto();
  };

  const m = milestones[active];

  // counter values
  const c0 = useCounter(18, statsVisible);
  const c1 = useCounter(200, statsVisible);
  const c2 = useCounter(50, statsVisible);
  const c3 = useCounter(98, statsVisible);
  const counterValues = [c0, c1, c2, c3];

  // Stats intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4800);
    return () => clearInterval(t);
  }, []);

  // Milestone auto-advance
  useEffect(() => {
    const t = setInterval(() => setActiveMilestone(p => (p + 1) % milestones.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Lock scroll for video modal
  useEffect(() => {
    document.body.style.overflow = videoOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [videoOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .font-josefin   { font-family: 'Josefin Sans', sans-serif !important; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes slideR   { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideL   { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer  { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow { to{transform:rotate(360deg)} }
        @keyframes lbIn     { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes tSlide   { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.6);opacity:0} }

        .fu1{animation:fadeUp .8s .1s both}
        .fu2{animation:fadeUp .8s .3s both}
        .fu3{animation:fadeUp .8s .5s both}
        .fu4{animation:fadeUp .8s .7s both}
        .si{animation:scaleIn .7s .2s both}
        .sr{animation:slideR .7s .2s both}
        .sl{animation:slideL .7s .2s both}
        .t-anim{animation:tSlide .45s ease both}
        .lb-in{animation:lbIn .25s ease both}
        .pulse-line{animation:shimmer 3s ease infinite}
        .float-badge{animation:float 4s ease-in-out infinite}
        .spin-slow{animation:spin-slow 20s linear infinite}
        .pulse-ring{animation:pulse-ring 2s ease-out infinite}

        .chef-img { transition: transform .6s cubic-bezier(.25,.46,.45,.94); }
        .chef-card:hover .chef-img { transform: scale(1.05); }
        .val-card { transition: transform .3s ease, box-shadow .3s ease; }
        .val-card:hover { transform: translateY(-6px); }
        .spec-img { transition: transform .6s ease; }
        .spec-card:hover .spec-img { transform: scale(1.07); }
        .milestone-dot { transition: all .3s ease; }

        /* Timeline line fill */
        .timeline-progress {
          transition: height 1s ease;
        }

        /* Scrollbar hide */
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ━━━━━━━━ 1. HERO [DARK] ━━━━━━━━ */}
      <section className="relative h-[900px] flex items-center justify-center overflow-hidden bg-[#F4EDE6] pt-10 md:pt-10 lg:pt-20 xl:pt-0">
        {/* BG */}
       <img
           src={bannerImg}
           alt="Menu Banner"
           className="absolute inset-0 w-full h-[800px] object-cover"
         />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0A0502]/95 via-[#0A0502]/70 to-transparent" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0A0502] via-transparent to-[#0A0502]/40" /> */}

        {/* Corner accents */}
       <div className="hidden md:block absolute top-40 left-90 w-16 h-16 border-t border-l border-[#C78665]/40 z-10" />
  <div className="hidden md:block absolute bottom-50 right-80 w-16 h-16 border-b border-r border-[#C78665]/40 z-10" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-24 sm:py-32 flex items-center justify-center">
          <div className="w-full max-w-2xl text-center mx-auto">
            <p className="font-josefin text-[#C78665] tracking-[.4em] text-[10px] sm:text-[11px] uppercase mb-5">
              Our Story · Cafechino
            </p>

            <h1
              className="font-cormorant font-light text-[#F4EDE6] leading-[1.05] mb-6"
              style={{ fontSize: "clamp(36px, 7vw, 70px)" }}
            >
              Crafted With
              <br />
              <em className="text-[#C78665]">Passion,</em>
              <br />
              Served With Heart
            </h1>

            {/* Divider — centered */}
            <div className="h-px bg-[#C78665] w-24 mb-6 mx-auto" />

            <p className="font-josefin text-[#C4A882] text-sm font-light leading-relaxed max-w-md mb-10 mx-auto">
              Born from a love of global cuisines and the belief that food is the
              world's most powerful language. Every table at Cafechino is a
              journey across continents.
            </p>

            {/* Buttons — centered and wrapping nicely on small screens */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
              <button className="font-josefin w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C78665] text-[#140A06] text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-opacity">
                Our Menu
              </button>

              <button
                onClick={() => setVideoOpen(true)}
                className="font-josefin w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border border-[#C78665]/40 text-[#F4EDE6] text-xs font-light tracking-[.1em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all group"
              >
                <span className="relative flex-shrink-0">
                  <span className="absolute inset-0 rounded-full border border-[#C78665] animate-ping opacity-40" />
                  <span className="w-7 h-7 rounded-full bg-[#C78665]/20 border border-[#C78665]/50 flex items-center justify-center">
                    <Play size={10} className="text-[#C78665] ml-0.5" />
                  </span>
                </span>
                Watch Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Video modal */}
        {videoOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="bg-[#0A0502] rounded-xl overflow-hidden w-full max-w-3xl aspect-video flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[#C4A882] font-josefin text-sm tracking-widest uppercase">
                Video coming soon
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ━━━━━━━━ 2. STATS [LIGHT] ━━━━━━━━ */}
      <section ref={statsRef} className="bg-[#F4EDE6] pb-16 px-6 border-b border-[#E0D0C4]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="si" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="font-cormorant text-5xl sm:text-6xl font-light text-[#C78665] leading-none">
                {counterValues[i]}{s.suffix}
              </p>
              <div className="mx-auto mt-2 mb-2 h-px bg-[#C78665]/30 w-8" />
              <p className="font-josefin text-[10px] tracking-[.25em] text-[#8A7060] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━ 3. ABOUT / STORY [DARK] ━━━━━━━━ */}
      <section className="bg-[#140A06] py-24 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Images stack */}
          <div className="sl relative h-[480px] sm:h-[520px]">
            {/* Main image */}
            <div className="absolute top-0 right-0 w-[78%] h-[75%] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.5)]">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85"
                alt="Restaurant" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#140A06]/40 to-transparent" />
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[48%] rounded-2xl overflow-hidden shadow-xl border-2 border-[#C78665]/20">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=85"
                alt="Dining" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Badge */}
            <div className="float-badge absolute top-6 left-4 bg-[#C78665] rounded-2xl px-5 py-4 shadow-xl text-center">
              <p className="font-cormorant text-[#140A06] text-2xl font-semibold leading-none">Since</p>
              <p className="font-josefin text-[#140A06] text-xl font-bold">2019</p>
            </div>
            {/* Globe icon badge */}
            <div className="absolute bottom-8 right-4 w-14 h-14 bg-[#0A0502] border border-[#C78665]/30 rounded-full flex flex-col items-center justify-center shadow-lg">
              <Globe size={16} className="text-[#C78665]" />
              <span className="font-josefin text-[8px] text-[#C78665] mt-0.5 tracking-wide">GLOBAL</span>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="sr">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">About Cafechino</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-6"
              style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              The Brilliant Taste<br /><em className="text-[#C78665]">Behind Every Dish</em>
            </h2>
            <p className="font-josefin text-[#C4A882] text-sm font-light leading-relaxed mb-4">
              We celebrate culinary traditions from across the globe — bringing the finest creations from Italy, Japan, France, Lebanon, Mexico and beyond directly to your table.
            </p>
            <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed mb-8">
              Each dish is crafted with passion, premium ingredients, and deep respect for its cultural roots. Our mission: make the world's best food accessible, memorable, and beautiful.
            </p>
            {/* Values quick list */}
            <div className="space-y-3 mb-10">
              {["Farm-to-table sourcing from 40+ countries", "Every recipe verified with cultural chefs", "Zero compromise on freshness — daily prep only", "Sustainable packaging & zero-waste kitchen"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C78665] flex-shrink-0" />
                  <p className="font-josefin text-xs text-[#C4A882] font-light">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="font-josefin px-8 py-3.5 rounded-full bg-[#C78665] text-[#140A06] text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-opacity">
                Explore Menu
              </button>
              <button className="font-josefin flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#3A2A1E] text-[#C4A882] text-xs font-light tracking-[.15em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all">
                Our Story <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 4. VALUES [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">What We Stand For</p>
            <h2 className="font-cormorant text-[#2E1F18] font-light leading-tight"
              style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              Our Core <em className="text-[#C78665]">Philosophy</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="val-card relative bg-white rounded-2xl p-8 border border-[#E0D0C4] cursor-default shadow-sm hover:shadow-xl overflow-hidden group"
                onMouseEnter={() => setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* BG accent on hover */}
                <div className={`absolute inset-0 bg-[#C78665] transition-transform duration-500 ${hoveredValue === i ? "translate-y-0" : "translate-y-full"}`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${hoveredValue === i ? "bg-white/20" : "bg-[#F4EDE6]"}`}>
                    <v.icon size={22} className={`transition-colors duration-300 ${hoveredValue === i ? "text-white" : "text-[#C78665]"}`} />
                  </div>
                  <h3 className={`font-cormorant text-xl font-semibold mb-3 transition-colors duration-300 ${hoveredValue === i ? "text-white" : "text-[#2E1F18]"}`}>
                    {v.title}
                  </h3>
                  <p className={`font-josefin text-xs font-light leading-relaxed transition-colors duration-300 ${hoveredValue === i ? "text-white/85" : "text-[#8A7060]"}`}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 5. TIMELINE / MILESTONES [DARK] ━━━━━━━━ */}
      <section style={{ background: "#0D0D0D", padding: "80px 24px", fontFamily: "'Josefin Sans', sans-serif" }}>

  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Josefin+Sans:wght@300;400;600&display=swap');
    @keyframes fillBar { from { width: 0% } to { width: 100% } }
    .year-btn:hover { border-color: #E8956D !important; color: #E8956D !important; }
    .prev-btn:hover { border-color: #E8956D !important; color: #E8956D !important; }
    .next-btn:hover { opacity: 0.85; }
  `}</style>

  <div style={{ maxWidth: 960, margin: "0 auto" }}>

    {/* ── Header ── */}
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <p style={{ color: "#E8956D", letterSpacing: "0.35em", fontSize: 11, textTransform: "uppercase", margin: "0 0 12px" }}>
        How We Got Here
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#FFFFFF", fontSize: "clamp(36px,5vw,60px)", lineHeight: 1.1, margin: 0 }}>
        Our <em style={{ color: "#E8956D" }}>Journey</em>
      </h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20 }}>
        <div style={{ height: 1, width: 48, background: "#3A2A1E" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8956D" }} />
        <div style={{ height: 1, width: 48, background: "#3A2A1E" }} />
      </div>
    </div>

    {/* ── Body ── */}
    <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>

      {/* Year Pills */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
        {milestones.map((item, i) => (
          <button
            key={i}
            className="year-btn"
            onClick={() => handleSelect(i)}
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12,
              letterSpacing: "0.15em",
              padding: "10px 20px",
              borderRadius: 999,
              border: active === i ? "none" : "1px solid #3A2A1E",
              background: active === i ? "#E8956D" : "transparent",
              color: active === i ? "#0D0D0D" : "#B09080",
              fontWeight: active === i ? 600 : 300,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: active === i ? "scale(1.08)" : "scale(1)",
              boxShadow: active === i ? "0 0 24px rgba(232,149,109,0.35)" : "none",
              textAlign: "left",
            }}
          >
            {item.year}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{
          background: "#181818",
          border: "1px solid #2E2018",
          borderRadius: 20,
          padding: "40px 36px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Corner arc */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, borderBottomLeftRadius: "100%", borderBottom: "1px solid rgba(232,149,109,0.12)", borderLeft: "1px solid rgba(232,149,109,0.12)", pointerEvents: "none" }} />

          {/* Watermark year */}
          <div style={{ position: "absolute", top: 16, right: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(64px,10vw,100px)", fontWeight: 300, color: "rgba(232,149,109,0.10)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
            {m.year}
          </div>

          {/* Icon */}
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 14, background: "rgba(232,149,109,0.12)", border: "1px solid rgba(232,149,109,0.25)", fontSize: 22, marginBottom: 20 }}>
            {m.icon}
          </div>

          {/* Stat badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#E8956D" }} />
            <span style={{ color: "#E8956D", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 400 }}>
              {m.stat}
            </span>
          </div>

          {/* Title */}
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#FFFFFF", fontSize: "clamp(24px,3.5vw,40px)", lineHeight: 1.2, margin: "0 0 16px" }}>
            {m.title}
          </h3>

          {/* Divider */}
          <div style={{ height: 1, width: 48, background: "rgba(232,149,109,0.5)", marginBottom: 18 }} />

          {/* Description */}
          <p style={{ color: "#C8B8A8", fontSize: 13, fontWeight: 300, lineHeight: 1.9, margin: 0 }}>
            {m.desc}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
          <span style={{ color: "#E8956D", fontSize: 10, letterSpacing: "0.3em", fontWeight: 400 }}>
            {String(active + 1).padStart(2, "0")}
          </span>
          <div style={{ flex: 1, height: 1, background: "#2E2018", borderRadius: 4, overflow: "hidden", position: "relative" }}>
            <div key={active} style={{ position: "absolute", left: 0, top: 0, height: "100%", background: "#E8956D", borderRadius: 4, animation: "fillBar 4s linear forwards" }} />
          </div>
          <span style={{ color: "#5A4A3A", fontSize: 10, letterSpacing: "0.3em", fontWeight: 300 }}>
            {String(milestones.length).padStart(2, "0")}
          </span>
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
          <button
            className="prev-btn"
            onClick={() => handleSelect((active - 1 + milestones.length) % milestones.length)}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #3A2A1E", background: "transparent", color: "#B09080", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
          >
            ←
          </button>
          <button
            className="next-btn"
            onClick={() => handleSelect((active + 1) % milestones.length)}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#E8956D", color: "#0D0D0D", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
          >
            →
          </button>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ━━━━━━━━ 6. CHEFS [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-3">Meet The Team</p>
              <h2 className="font-cormorant text-[#2E1F18] font-light leading-tight"
                style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                The Culinary <em className="text-[#C78665]">Masters</em>
              </h2>
            </div>
            <p className="font-josefin text-[#8A7060] text-sm font-light max-w-xs leading-relaxed">
              World-class chefs bringing decades of international experience to every plate.
            </p>
          </div>

          {/* Active chef spotlight */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-8">
            <div key={activeChef} className="si relative rounded-2xl overflow-hidden h-[420px] shadow-xl chef-card cursor-pointer group">
              <img src={chefs[activeChef].img} alt={chefs[activeChef].name}
                className="chef-img w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140A06]/90 via-[#140A06]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="font-josefin text-[#C78665] text-[10px] tracking-[.25em] uppercase mb-1">{chefs[activeChef].role}</p>
                <h3 className="font-cormorant text-white text-3xl font-semibold mb-1">{chefs[activeChef].name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={11} className="text-[#C78665]" />
                  <p className="font-josefin text-white/60 text-xs">{chefs[activeChef].origin}</p>
                </div>
                <p className="font-cormorant italic text-white/70 text-lg">"{chefs[activeChef].quote}"</p>
                {/* Awards */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {chefs[activeChef].awards.map((a, ai) => (
                    <span key={ai} className="font-josefin text-[9px] bg-[#C78665]/20 border border-[#C78665]/30 text-[#C78665] px-3 py-1 rounded-full">
                      🏆 {a}
                    </span>
                  ))}
                </div>
              </div>
              {/* Exp badge */}
              <div className="absolute top-5 right-5 bg-[#C78665] text-[#140A06] rounded-xl px-3 py-2 text-center">
                <p className="font-josefin text-xs font-bold">{chefs[activeChef].exp}</p>
                <p className="font-josefin text-[8px] uppercase tracking-wide">Exp.</p>
              </div>
            </div>

            {/* Chef selector grid */}
            <div className="grid grid-cols-2 gap-4">
              {chefs.map((chef, i) => (
                <div
                  key={i}
                  onClick={() => setActiveChef(i)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300
                    ${activeChef === i ? "ring-2 ring-[#C78665] shadow-lg" : "opacity-70 hover:opacity-100"}`}
                  style={{ height: 190 }}
                >
                  <img src={chef.img} alt={chef.name} className="chef-img w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140A06]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-josefin text-[#C78665] text-[9px] uppercase tracking-wide">{chef.role}</p>
                    <p className="font-cormorant text-white text-base font-semibold leading-tight">{chef.name}</p>
                  </div>
                  {activeChef === i && (
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#C78665]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chef specialties strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Flame, label: "Specialty", val: chefs[activeChef].specialty },
              { icon: Clock, label: "Experience", val: chefs[activeChef].exp },
              { icon: MapPin, label: "Origin", val: chefs[activeChef].origin },
              { icon: Award, label: "Awards", val: `${chefs[activeChef].awards.length} Recognitions` },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E0D0C4] rounded-xl px-4 py-3 flex items-center gap-3">
                <item.icon size={16} className="text-[#C78665] flex-shrink-0" />
                <div>
                  <p className="font-josefin text-[9px] text-[#8A7060] uppercase tracking-wide">{item.label}</p>
                  <p className="font-josefin text-xs text-[#2E1F18] font-medium">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 7. WORLD SPECIALTIES [DARK] ━━━━━━━━ */}
      <section className="bg-[#140A06] py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Signature Dishes</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight"
              style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              World <em className="text-[#C78665]">Favorites</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specialties.map((item, i) => (
              <div
                key={i}
                className="spec-card relative rounded-2xl overflow-hidden cursor-pointer group shadow-[0_8px_40px_rgba(0,0,0,.4)] hover:shadow-[0_20px_60px_rgba(0,0,0,.6)] transition-shadow duration-300"
                style={{ height: i === 1 ? 400 : 320 }}
              >
                <img src={item.img} alt={item.name} className="spec-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0502]/90 via-[#0A0502]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-josefin inline-block bg-[#C78665] text-[#140A06] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                    {item.label}
                  </span>
                  <h3 className="font-cormorant text-white text-2xl font-semibold mb-1">{item.name}</h3>
                  <p className="font-josefin text-white/60 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 8. TESTIMONIALS [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">What Guests Say</p>
          <h2 className="font-cormorant text-[#2E1F18] font-light mb-16"
            style={{ fontSize: "clamp(32px,4vw,52px)" }}>
            Voices of <em className="text-[#C78665]">Delight</em>
          </h2>

          <div key={activeTestimonial}
            className="t-anim relative bg-white border border-[#E0D0C4] rounded-2xl px-8 md:px-14 py-14 shadow-lg mb-8">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C78665] flex items-center justify-center shadow-md">
              <Star size={14} fill="white" className="text-white" />
            </div>
            <p className="font-cormorant italic text-[#2E1F18] leading-relaxed mb-10"
              style={{ fontSize: "clamp(18px,2.5vw,22px)" }}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              <img src={testimonials[activeTestimonial].avatar} alt=""
                className="w-14 h-14 rounded-full object-cover border-2 border-[#C78665]" />
              <div className="text-left">
                <p className="font-cormorant text-[#2E1F18] text-lg">{testimonials[activeTestimonial].name}</p>
                <p className="font-josefin text-[#8A7060] text-[11px] tracking-wide">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className="rounded-full h-2.5 transition-all duration-300"
                style={{ width: i === activeTestimonial ? 28 : 10, background: i === activeTestimonial ? "#C78665" : "#D6C7BC" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 9. CTA BANNER [DARK] ━━━━━━━━ */}
      

      {/* ━━━━━━━━ VIDEO MODAL ━━━━━━━━ */}
      {videoOpen && (
        <div className="fixed inset-0 bg-[#050201]/95 z-50 flex items-center justify-center p-5 lb-in"
          onClick={() => setVideoOpen(false)}>
          <button onClick={() => setVideoOpen(false)}
            className="fixed top-6 right-6 w-11 h-11 rounded-full border border-[#C78665]/40 bg-[#C78665]/10 flex items-center justify-center text-[#C78665] hover:bg-[#C78665]/20 transition-colors z-50">
            <X size={17} />
          </button>
          <div className="lb-in max-w-3xl w-full rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,.9)] bg-[#140A06] border border-[#2A1A10]"
            onClick={e => e.stopPropagation()}>
            {/* Placeholder — swap with real <video> or YouTube embed */}
            <div className="relative h-72 sm:h-96 bg-[#0A0502] flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#C78665]/20 border-2 border-[#C78665]/40 flex items-center justify-center mb-4">
                <Play size={28} className="text-[#C78665] ml-1" />
              </div>
              <p className="font-cormorant text-[#F4EDE6] text-xl italic">Our Story — Coming Soon</p>
              <p className="font-josefin text-[#8A7060] text-xs mt-2">Video will be embedded here</p>
            </div>
            <div className="p-6 text-center">
              <p className="font-cormorant text-[#F4EDE6] text-2xl mb-1">Cafechino — A Journey of Flavors</p>
              <p className="font-josefin text-[#8A7060] text-xs">2025 · 3 min 42 sec</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}