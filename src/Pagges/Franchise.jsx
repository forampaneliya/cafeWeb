import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight, ChevronLeft, ArrowRight, Check,
  MapPin, TrendingUp, Shield, Users, Star, Clock,
  DollarSign, Globe, Award, Phone, Mail, ChevronDown, X
} from "lucide-react";
import bannerImg from "../assets/images/franchisebanner.png";

/* ═══════════════════ DATA ═══════════════════ */

const benefits = [
  { icon: TrendingUp, title: "Proven Revenue Model", desc: "Average franchisee ROI of 280% within 3 years. Our financial model is battle-tested across 40+ locations worldwide.", stat: "280% ROI" },
  { icon: Shield, title: "Full Brand Support", desc: "Complete operational playbook, staff training, marketing assets and ongoing mentorship from our core team.", stat: "24/7 Support" },
  { icon: Globe, title: "Global Recognition", desc: "Cafechino is a Michelin-recognised brand with presence in 12 countries and growing loyalty across continents.", stat: "12 Countries" },
  { icon: Users, title: "Training Academy", desc: "Every franchisee and their team undergoes a 6-week immersive training program at our flagship kitchen.", stat: "6-Week Program" },
  { icon: Award, title: "Award-Winning Menu", desc: "Access to our ever-evolving world cuisine menu, created by Michelin-starred chefs updated every quarter.", stat: "200+ Dishes" },
  { icon: DollarSign, title: "Low Royalty Fees", desc: "Industry-leading royalty structure at just 4% of net revenue — the lowest in the premium café segment.", stat: "Only 4% Royalty" },
];

const steps = [
  { num: "01", title: "Initial Inquiry", desc: "Fill out our expression of interest form. Our franchise team will reach out within 48 hours to schedule a discovery call." },
  { num: "02", title: "Discovery Call", desc: "A 60-minute call with our Franchise Director to understand your goals, market, and financial capacity." },
  { num: "03", title: "Due Diligence", desc: "Review our Franchise Disclosure Document, visit an existing location, and meet our operational team in person." },
  { num: "04", title: "Agreement & Training", desc: "Sign the franchise agreement and begin your 6-week training journey at Cafechino Academy." },
  { num: "05", title: "Store Setup", desc: "Our design and fit-out team manages everything from location selection to interior design and equipment sourcing." },
  { num: "06", title: "Grand Opening", desc: "We launch with you — marketing campaigns, PR support, and our team on-ground for the first 2 weeks." },
];

const tiers = [
  {
    name: "Kiosk",
    price: "$45K",
    area: "150–300 sq ft",
    roi: "18 months",
    color: "#8A7060",
    features: ["Core menu (80 dishes)", "2 staff training slots", "Basic marketing kit", "Quarterly menu updates", "Email support"],
    best: false,
  },
  {
    name: "Café",
    price: "$120K",
    area: "800–1,500 sq ft",
    roi: "24 months",
    color: "#C78665",
    features: ["Full menu (200+ dishes)", "8 staff training slots", "Full marketing suite", "Monthly menu updates", "Dedicated account manager", "Social media templates", "Annual chef visit"],
    best: true,
  },
  {
    name: "Flagship",
    price: "$280K",
    area: "2,000–4,000 sq ft",
    roi: "30 months",
    color: "#2E1F18",
    features: ["Full menu + exclusives", "Unlimited training", "Premium marketing package", "Weekly menu updates", "Dedicated franchise team", "Custom interior design", "Michelin chef collaboration", "Multi-location rights"],
    best: false,
  },
];

const locations = [
  { city: "Mumbai", country: "India", flag: "🇮🇳", status: "Open", rating: 4.9 },
  { city: "Paris", country: "France", flag: "🇫🇷", status: "Open", rating: 4.8 },
  { city: "Dubai", country: "UAE", flag: "🇦🇪", status: "Open", rating: 4.9 },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", status: "Open", rating: 4.7 },
  { city: "New York", country: "USA", flag: "🇺🇸", status: "Coming Soon", rating: null },
  { city: "London", country: "UK", flag: "🇬🇧", status: "Coming Soon", rating: null },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", status: "Coming Soon", rating: null },
  { city: "Sydney", country: "Australia", flag: "🇦🇺", status: "Available", rating: null },
];

const testimonials = [
  { name: "Raj Mehta", city: "Mumbai, India", text: "Opening a Cafechino franchise was the best business decision I ever made. The support system is extraordinary — they treat you like a partner, not just a licensee.", since: "Franchisee since 2022", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Isabelle Moreau", city: "Lyon, France", text: "I had zero F&B experience. Within 6 weeks of training I felt completely ready. Our café turned profitable in month 14. Absolutely life-changing.", since: "Franchisee since 2021", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Ahmed Al-Rashid", city: "Dubai, UAE", text: "The brand recognition alone drives footfall. Customers seek us out. Three years in, we're opening our second location.", since: "Franchisee since 2021", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" },
];

const faqs = [
  { q: "Do I need prior restaurant experience?", a: "No prior F&B experience is required. Our 6-week training academy covers everything from operations and menu preparation to staff management and financial reporting." },
  { q: "What is the total investment required?", a: "Investment varies by tier — from $45K for a Kiosk to $280K for a Flagship location. This includes the franchise fee, fit-out, equipment, initial inventory, and working capital." },
  { q: "How long before I break even?", a: "Most Café-tier franchisees reach breakeven within 18–24 months. Our financial team provides a detailed projection based on your specific market before you sign." },
  { q: "Can I own multiple locations?", a: "Yes. Flagship tier grants multi-location rights. High-performing Café franchisees are also invited to expand after 12 months of successful operation." },
  { q: "What ongoing support do I receive?", a: "You receive a dedicated account manager, quarterly chef visits, monthly menu updates, marketing assets, a franchisee community portal, and 24/7 emergency operational support." },
];

const stats = [
  { num: "40", suffix: "+", label: "Locations" },
  { num: "12", suffix: "", label: "Countries" },
  { num: "280", suffix: "%", label: "Avg ROI" },
  { num: "98", suffix: "%", label: "Satisfaction" },
];

/* ═══════════════════ COUNTER HOOK ═══════════════════ */
function useCounter(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(cur);
      if (cur >= target) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [active, target]);
  return val;
}

/* ═══════════════════ COMPONENT ═══════════════════ */
export default function Franchise() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTier, setActiveTier] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [statsOn, setStatsOn] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", city: "", tier: "Café", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const statsRef = useRef(null);

  const c0 = useCounter(40, statsOn);
  const c1 = useCounter(12, statsOn);
  const c2 = useCounter(280, statsOn);
  const c3 = useCounter(98, statsOn);
  const counters = [c0, c1, c2, c3];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsOn(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .font-josefin   { font-family: 'Josefin Sans', sans-serif !important; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideR   { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideL   { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulse    { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow{ to{transform:rotate(360deg)} }
        @keyframes tSlide   { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }

        .fu1{animation:fadeUp .8s .1s both}
        .fu2{animation:fadeUp .8s .3s both}
        .fu3{animation:fadeUp .8s .5s both}
        .fu4{animation:fadeUp .8s .7s both}
        .sl{animation:slideL .7s .2s both}
        .sr{animation:slideR .7s .2s both}
        .si{animation:scaleIn .6s .15s both}
        .t-anim{animation:tSlide .45s ease both}
        .pulse-line{animation:pulse 3s ease infinite}
        .float-el{animation:float 4s ease-in-out infinite}
        .spin-slow{animation:spin-slow 22s linear infinite}
        .pulse-ring-anim{animation:pulse-ring 2s ease-out infinite}

        .shimmer-btn {
          background: linear-gradient(90deg, #C78665 0%, #E8A882 40%, #C78665 60%, #C78665 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease infinite;
        }

        .tier-card { transition: transform .3s ease, box-shadow .3s ease; }
        .tier-card:hover { transform: translateY(-8px); }
        .tier-active { transform: translateY(-12px) !important; }

        .step-bar { transition: width .6s ease; }
        .benefit-card { transition: transform .3s ease, box-shadow .3s ease, background .3s ease; }
        .benefit-card:hover { transform: translateY(-6px); }

        .faq-answer { overflow: hidden; transition: max-height .4s ease, opacity .3s ease; }

        .loc-chip { transition: all .25s ease; }
        .loc-chip:hover { transform: scale(1.04); }

        input, textarea, select {
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #C78665 !important;
          box-shadow: 0 0 0 3px rgba(199,134,101,.15);
        }
      `}</style>

      {/* ━━━━━━━━ 1. HERO [DARK] ━━━━━━━━ */}
      {/* <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0502]"> */}
    <section className="relative h-[800px] flex items-center justify-center overflow-hidden bg-[#F4EDE6]">

  {/* Background Image */}
  <img
    src={bannerImg}
    alt="Menu Banner"
    className="absolute inset-0 w-full h-[800px] object-cover"
  />

  {/* Dark Overlay (Important for readability) */}
  {/* <div className="absolute inset-0 bg-black/60"></div> */}

  {/* Corner accents */}
  <div className="hidden md:block absolute top-40 left-90 w-16 h-16 border-t border-l border-[#C78665]/40 z-10" />
  <div className="hidden md:block absolute bottom-50 right-80 w-16 h-16 border-b border-r border-[#C78665]/40 z-10" />

  {/* Content Wrapper */}
  <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-24 sm:py-30 flex items-center justify-center">

    {/* Centered Content */}
    <div className="w-full max-w-2xl text-center mx-auto">

      <p className="font-josefin text-[#C78665] tracking-[.4em] text-[10px] sm:text-[11px] uppercase mb-5">
        Partner With Us · Cafechino Franchise
      </p>

      <h1
        className="font-cormorant font-light text-[#F4EDE6] leading-[1.05] mb-6"
         style={{ fontSize: "clamp(36px, 7vw, 70px)" }}
      >
        Own a Piece of<br />
        <em className="text-[#C78665]">Culinary History</em>
      </h1>

      <div className="h-px bg-[#C78665] w-24 mb-6 mx-auto" />

      <p className="font-josefin text-[#C4A882] text-sm font-light leading-relaxed max-w-md mb-10 mx-auto">
        Join a Michelin-recognised brand bringing world cuisines under one roof.
        With proven systems, dedicated support, and a menu guests fall in love with —
        your success is our mission.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
       <button className="font-josefin w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C78665] text-[#140A06] text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-opacity">
                Apply Now
              </button>

        <button className="font-josefin px-9 py-4 rounded-full border border-[#C78665]/40 text-[#F4EDE6] text-xs font-light tracking-[.15em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all duration-300">
          Download Brochure
        </button>
      </div>

    </div>

  </div>
</section>

      {/* ━━━━━━━━ 2. STATS [LIGHT] ━━━━━━━━ */}
      <section ref={statsRef} className="bg-[#F4EDE6] pb-16 px-6 border-b border-[#E0D0C4]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="si" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="font-cormorant text-5xl sm:text-6xl font-light text-[#C78665] leading-none">
                {counters[i]}{s.suffix}
              </p>
              <div className="mx-auto mt-2 mb-2 h-px bg-[#C78665]/30 w-8" />
              <p className="font-josefin text-[10px] tracking-[.25em] text-[#8A7060] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━ 3. WHY CAFECHINO [DARK] ━━━━━━━━ */}
      <section className="bg-[#140A06] py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Why Partner With Us</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight"
              style={{ fontSize: "clamp(32px,4vw,58px)" }}>
              Built For Your <em className="text-[#C78665]">Success</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card group bg-[#0A0502] border border-[#2A1A10] rounded-2xl p-7 cursor-default hover:border-[#C78665]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,.5)]">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#C78665]/10 border border-[#C78665]/20 flex items-center justify-center group-hover:bg-[#C78665]/20 transition-colors">
                    <b.icon size={20} className="text-[#C78665]" />
                  </div>
                  <span className="font-josefin text-[10px] text-[#C78665] bg-[#C78665]/10 border border-[#C78665]/20 px-3 py-1 rounded-full tracking-wide">
                    {b.stat}
                  </span>
                </div>
                <h3 className="font-cormorant text-[#F4EDE6] text-xl font-semibold mb-3">{b.title}</h3>
                <p className="font-josefin text-[#8A7060] text-xs font-light leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 4. INVESTMENT TIERS [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Choose Your Model</p>
            <h2 className="font-cormorant text-[#2E1F18] font-light leading-tight"
              style={{ fontSize: "clamp(32px,4vw,58px)" }}>
              Investment <em className="text-[#C78665]">Tiers</em>
            </h2>
            <p className="font-josefin text-[#8A7060] text-sm font-light max-w-md mx-auto mt-4 leading-relaxed">
              Three models designed for different ambitions, budgets, and markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {tiers.map((tier, i) => (
              <div
                key={i}
                onClick={() => setActiveTier(i)}
                className={`tier-card relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all
                  ${activeTier === i
                    ? "tier-active shadow-2xl border-[#C78665]"
                    : "border-[#E0D0C4] hover:border-[#C78665]/40 shadow-sm"
                  }
                  ${tier.best ? "md:scale-105" : ""}
                `}
              >
                {tier.best && (
                  <div className="absolute top-0 left-0 right-0 bg-[#C78665] text-[#140A06] text-center py-2">
                    <p className="font-josefin text-[10px] font-bold tracking-[.2em] uppercase">Most Popular</p>
                  </div>
                )}
                <div className={`${tier.best ? "pt-10" : "pt-7"} pb-7 px-7 ${activeTier === i ? "bg-[#140A06]" : "bg-white"}`}>
                  <p className="font-josefin text-[10px] tracking-[.25em] uppercase mb-2"
                    style={{ color: activeTier === i ? "#C78665" : "#8A7060" }}>
                    {tier.area}
                  </p>
                  <h3 className="font-cormorant text-3xl font-semibold mb-1"
                    style={{ color: activeTier === i ? "#F4EDE6" : "#2E1F18" }}>
                    {tier.name}
                  </h3>
                  <p className="font-cormorant text-5xl font-light mb-1"
                    style={{ color: "#C78665" }}>
                    {tier.price}
                  </p>
                  <p className="font-josefin text-[10px] uppercase tracking-wide mb-6"
                    style={{ color: activeTier === i ? "#8A7060" : "#B0A090" }}>
                    Est. ROI in {tier.roi}
                  </p>
                  <div className="space-y-2.5 mb-7">
                    {tier.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: activeTier === i ? "rgba(199,134,101,.2)" : "#F4EDE6" }}>
                          <Check size={10} className="text-[#C78665]" />
                        </div>
                        <p className="font-josefin text-xs font-light"
                          style={{ color: activeTier === i ? "#C4A882" : "#6A5A50" }}>
                          {f}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full font-josefin py-3 rounded-full text-xs font-semibold tracking-[.15em] uppercase transition-all
                    ${activeTier === i ? "bg-[#C78665] text-[#140A06] hover:opacity-85" : "border border-[#C78665] text-[#C78665] hover:bg-[#C78665] hover:text-[#140A06]"}`}>
                    Select {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 5. HOW IT WORKS [DARK] ━━━━━━━━ */}
      <section className="bg-[#0A0502] py-24 px-6 sm:px-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">The Journey</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight"
              style={{ fontSize: "clamp(32px,4vw,58px)" }}>
              How It <em className="text-[#C78665]">Works</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            {/* Step selector */}
            <div className="space-y-3">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 flex items-center gap-4
                    ${activeStep === i
                      ? "bg-[#140A06] border-[#C78665]/50 shadow-lg"
                      : "bg-transparent border-[#1A0E08] hover:border-[#C78665]/20"
                    }`}
                >
                  <span className="font-cormorant text-3xl font-light flex-shrink-0"
                    style={{ color: activeStep === i ? "#C78665" : "#3A2A1E" }}>
                    {s.num}
                  </span>
                  <div>
                    <p className="font-josefin text-xs font-semibold uppercase tracking-wide"
                      style={{ color: activeStep === i ? "#F4EDE6" : "#8A7060" }}>
                      {s.title}
                    </p>
                    {/* Progress bar */}
                    {activeStep === i && (
                      <div className="mt-2 h-0.5 bg-[#2A1A10] rounded-full w-full overflow-hidden">
                        <div className="step-bar h-full bg-[#C78665] rounded-full w-full" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div key={activeStep} className="t-anim">
              <div className="relative bg-[#140A06] border border-[#2A1A10] rounded-2xl p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 border-b border-l border-[#C78665]/8 rounded-bl-full" />
                <p className="font-cormorant text-[100px] font-light text-[#C78665]/10 leading-none -mt-4 mb-2">
                  {steps[activeStep].num}
                </p>
                <h3 className="font-cormorant text-3xl text-[#F4EDE6] font-semibold mb-4">
                  {steps[activeStep].title}
                </h3>
                <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed mb-8">
                  {steps[activeStep].desc}
                </p>
                <div className="flex gap-2">
                  {steps.map((_, i) => (
                    <div key={i} onClick={() => setActiveStep(i)}
                      className="h-1 rounded-full cursor-pointer transition-all duration-300"
                      style={{ width: i === activeStep ? 28 : 8, background: i === activeStep ? "#C78665" : "#2A1A10" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 6. LOCATIONS MAP [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-3">Our Presence</p>
              <h2 className="font-cormorant text-[#2E1F18] font-light leading-tight"
                style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                Global <em className="text-[#C78665]">Locations</em>
              </h2>
            </div>
            <p className="font-josefin text-[#8A7060] text-sm font-light max-w-xs leading-relaxed">
              Join our growing family of franchisees across the globe. New markets opening every quarter.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((loc, i) => (
              <div key={i} className={`loc-chip rounded-2xl p-5 border cursor-default
                ${loc.status === "Open" ? "bg-white border-[#E0D0C4] hover:border-[#C78665] hover:shadow-lg" :
                  loc.status === "Coming Soon" ? "bg-[#F9F5F1] border-[#EDE0D4] opacity-70" :
                  "bg-white border-dashed border-[#C78665]/50 hover:border-[#C78665] hover:shadow-lg"}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{loc.flag}</span>
                  <span className={`font-josefin text-[9px] tracking-wide uppercase px-2.5 py-1 rounded-full font-semibold
                    ${loc.status === "Open" ? "bg-emerald-50 text-emerald-700" :
                      loc.status === "Coming Soon" ? "bg-[#F0E8E0] text-[#8A7060]" :
                      "bg-[#C78665]/10 text-[#C78665]"}`}>
                    {loc.status}
                  </span>
                </div>
                <h4 className="font-cormorant text-[#2E1F18] text-xl font-semibold">{loc.city}</h4>
                <p className="font-josefin text-[#8A7060] text-xs mt-0.5">{loc.country}</p>
                {loc.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={11} fill="#C78665" className="text-[#C78665]" />
                    <span className="font-josefin text-[11px] text-[#C78665] font-semibold">{loc.rating}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 7. TESTIMONIALS [DARK] ━━━━━━━━ */}
      <section className="bg-[#140A06] py-24 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Franchisee Stories</p>
          <h2 className="font-cormorant font-light text-[#F4EDE6] mb-16"
            style={{ fontSize: "clamp(32px,4vw,52px)" }}>
            Voices of <em className="text-[#C78665]">Partners</em>
          </h2>

          <div key={activeTestimonial}
            className="t-anim relative bg-[#0A0502] border border-[#2A1A10] rounded-2xl px-8 md:px-14 py-14 mb-8">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C78665] flex items-center justify-center shadow-lg">
              <Star size={14} fill="white" className="text-white" />
            </div>
            <p className="font-cormorant italic text-[#E8D9CC] leading-relaxed mb-10"
              style={{ fontSize: "clamp(18px,2.5vw,22px)" }}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              <img src={testimonials[activeTestimonial].img} alt=""
                className="w-14 h-14 rounded-full object-cover border-2 border-[#C78665]" />
              <div className="text-left">
                <p className="font-cormorant text-[#F4EDE6] text-xl">{testimonials[activeTestimonial].name}</p>
                <p className="font-josefin text-[#8A7060] text-[11px]">{testimonials[activeTestimonial].city}</p>
                <p className="font-josefin text-[#C78665] text-[10px] uppercase tracking-wide mt-0.5">{testimonials[activeTestimonial].since}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className="rounded-full h-2.5 transition-all duration-300"
                style={{ width: i === activeTestimonial ? 28 : 10, background: i === activeTestimonial ? "#C78665" : "#2A1A10" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 8. FAQ [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Common Questions</p>
            <h2 className="font-cormorant text-[#2E1F18] font-light"
              style={{ fontSize: "clamp(32px,4vw,52px)" }}>
              Frequently <em className="text-[#C78665]">Asked</em>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#C78665]/40 shadow-lg" : "border-[#E0D0C4]"}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >
                  <span className="font-cormorant text-[#2E1F18] text-lg font-medium pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-[#C78665] flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>
                <div className="faq-answer" style={{ maxHeight: openFaq === i ? "200px" : "0", opacity: openFaq === i ? 1 : 0 }}>
                  <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed px-7 pb-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 9. APPLICATION FORM [DARK] ━━━━━━━━ */}
      <section className="bg-[#0A0502] py-24 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">

          {/* Left info */}
          <div className="sl">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Ready to Begin?</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-6"
              style={{ fontSize: "clamp(32px,4vw,56px)" }}>
              Start Your <em className="text-[#C78665]">Application</em>
            </h2>
            <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed mb-10">
              Fill out the form and our franchise team will be in touch within 48 hours. No commitment required at this stage.
            </p>

            <div className="space-y-5">
              {[
                { icon: Clock, label: "48-hour response guarantee" },
                { icon: Phone, label: "Free discovery call included" },
                { icon: Shield, label: "NDA available on request" },
                { icon: Mail, label: "franchise@cafechino.com" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C78665]/10 border border-[#C78665]/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-[#C78665]" />
                  </div>
                  <p className="font-josefin text-sm text-[#C4A882] font-light">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="sr bg-[#140A06] border border-[#2A1A10] rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#C78665]/20 border-2 border-[#C78665] flex items-center justify-center mx-auto mb-6">
                  <Check size={24} className="text-[#C78665]" />
                </div>
                <h3 className="font-cormorant text-[#F4EDE6] text-3xl mb-3">Application Received!</h3>
                <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed max-w-xs mx-auto">
                  Our franchise team will contact you within 48 hours. Welcome to the Cafechino family.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-cormorant text-[#F4EDE6] text-2xl mb-6">Express Your Interest</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Full Name *</label>
                    <input
                      type="text" required placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="font-josefin w-full bg-[#0A0502] border border-[#2A1A10] rounded-xl px-4 py-3 text-[#F4EDE6] text-sm placeholder:text-[#3A2A1E]"
                    />
                  </div>
                  <div>
                    <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Email Address *</label>
                    <input
                      type="email" required placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="font-josefin w-full bg-[#0A0502] border border-[#2A1A10] rounded-xl px-4 py-3 text-[#F4EDE6] text-sm placeholder:text-[#3A2A1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">City / Market</label>
                    <input
                      type="text" placeholder="e.g. Mumbai, Paris"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="font-josefin w-full bg-[#0A0502] border border-[#2A1A10] rounded-xl px-4 py-3 text-[#F4EDE6] text-sm placeholder:text-[#3A2A1E]"
                    />
                  </div>
                  <div>
                    <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Preferred Tier</label>
                    <select
                      value={formData.tier}
                      onChange={e => setFormData({ ...formData, tier: e.target.value })}
                      className="font-josefin w-full bg-[#0A0502] border border-[#2A1A10] rounded-xl px-4 py-3 text-[#F4EDE6] text-sm"
                    >
                      <option>Kiosk</option>
                      <option>Café</option>
                      <option>Flagship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Tell Us About Yourself</label>
                  <textarea
                    rows={4} placeholder="Your background, goals, and why Cafechino..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="font-josefin w-full bg-[#0A0502] border border-[#2A1A10] rounded-xl px-4 py-3 text-[#F4EDE6] text-sm placeholder:text-[#3A2A1E] resize-none"
                  />
                </div>

                <button type="submit"
                  className="shimmer-btn font-josefin w-full py-4 rounded-full text-[#140A06] text-xs font-bold tracking-[.2em] uppercase mt-2">
                  Submit Application
                </button>
                <p className="font-josefin text-[#3A2A1E] text-[10px] text-center">
                  By submitting you agree to our privacy policy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 10. FINAL CTA [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6 text-center border-t border-[#E0D0C4]">
        <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">The Time Is Now</p>
        <h2 className="font-cormorant text-[#2E1F18] font-light leading-tight mb-5"
          style={{ fontSize: "clamp(36px,5vw,68px)" }}>
          Your Cafechino Story<br /><em className="text-[#C78665]">Starts Today</em>
        </h2>
        <div className="pulse-line mx-auto mb-6 h-px bg-[#C78665] w-20" />
        <p className="font-josefin text-[#8A7060] text-sm font-light max-w-sm mx-auto leading-relaxed mb-10">
          Limited territories available. Markets are filling fast — secure yours before someone else does.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="shimmer-btn font-josefin px-10 py-4 rounded-full text-[#140A06] text-xs font-bold tracking-[.15em] uppercase">
            Apply For Franchise
          </button>
          <button className="font-josefin flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-[#C78665] text-[#C78665] text-xs font-light tracking-[.15em] uppercase hover:bg-[#C78665] hover:text-[#140A06] transition-all">
            <Phone size={13} /> Schedule a Call
          </button>
        </div>
      </section>
    </>
  );
}