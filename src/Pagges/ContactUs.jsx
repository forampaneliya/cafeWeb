import React, { useState, useEffect, useRef } from "react";
import {
  MapPin, Phone, Mail, Clock, Send, Check,
  Instagram, Twitter, Facebook, ChevronDown,
  Star, ArrowRight, MessageCircle
} from "lucide-react";
import bannerImg from "../assets/images/contactusbanner.png";

/* ═══════════════════ DATA ═══════════════════ */

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["12 Artisan Lane, Bandra West", "Mumbai, Maharashtra 400050"],
    link: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 98765 43210", "+91 22 1234 5678"],
    link: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@cafechino.com", "reservations@cafechino.com"],
    link: "Send Email",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Mon – Fri: 8:00 AM – 10:00 PM", "Sat – Sun: 9:00 AM – 11:00 PM"],
    link: "Book a Table",
  },
];

const faqs = [
  { q: "Do you accept walk-ins?", a: "Yes, we always welcome walk-ins. However, we recommend reservations on weekends and public holidays as tables fill up quickly." },
  { q: "Is there parking available?", a: "We have a dedicated parking lot with 40 spaces adjacent to the café. Valet parking is also available during dinner hours." },
  { q: "Do you cater to dietary restrictions?", a: "Absolutely. Our menu is designed to accommodate vegan, gluten-free, nut-free, and Jain dietary needs. Just let us know when reserving." },
  { q: "Can I host a private event?", a: "Yes! We have a private dining room that seats up to 30 guests. Contact our events team at events@cafechino.com for availability." },
  { q: "Do you offer delivery or takeaway?", a: "We partner with Swiggy and Zomato for delivery. Takeaway is available directly at the café with a 10-minute lead time." },
];

const testimonials = [
  { name: "Aarav Mehta", role: "Regular Guest", text: "The ambience is world-class and the staff always remembers my order. Cafechino isn't just a café — it's my second home.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Simone Dubois", role: "Food Critic", text: "I've dined across continents and Cafechino holds its own against the finest. The responsiveness of the team is exceptional.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Kenji Watanabe", role: "Travel Blogger", text: "Reached out for a birthday reservation — the team responded in 20 minutes and arranged everything perfectly. Truly remarkable.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" },
];

const branches = [
  { city: "Mumbai", flag: "🇮🇳", address: "12 Artisan Lane, Bandra West", phone: "+91 98765 43210", hours: "8AM – 10PM", rating: 4.9, active: true },
  { city: "Paris", flag: "🇫🇷", address: "8 Rue du Café, Le Marais", phone: "+33 1 23 45 67 89", hours: "9AM – 11PM", rating: 4.8, active: false },
  { city: "Dubai", flag: "🇦🇪", address: "DIFC Gate Village, Unit 4", phone: "+971 4 234 5678", hours: "10AM – 12AM", rating: 4.9, active: false },
];

const stats = [
  { num: "< 2hr", label: "Response Time" },
  { num: "98%", label: "Satisfaction" },
  { num: "24/7", label: "Online Support" },
  { num: "3", label: "Locations" },
];

/* ═══════════════════ COMPONENT ═══════════════════ */
export default function ContactUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeBranch, setActiveBranch] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "General Enquiry", message: "", guests: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const statsRef = useRef(null);
  const [statsVis, setStatsVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase = (field) =>
    `font-josefin w-full border rounded-xl px-4 py-3.5 text-sm text-[#2E1F18] placeholder:text-[#C4B8B0] transition-all duration-200 outline-none bg-white
     ${focused === field ? "border-[#C78665] shadow-[0_0_0_3px_rgba(199,134,101,.12)]" : "border-[#E0D0C4]"}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .font-josefin   { font-family: 'Josefin Sans', sans-serif !important; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideL   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideR   { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes tSlide   { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
        @keyframes pulse    { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow{ to{transform:rotate(360deg)} }
        @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes ping-soft{ 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.8);opacity:0} }
        @keyframes lbIn     { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }

        .fu1{animation:fadeUp .8s .1s both}
        .fu2{animation:fadeUp .8s .3s both}
        .fu3{animation:fadeUp .8s .5s both}
        .fu4{animation:fadeUp .8s .7s both}
        .sl{animation:slideL .7s .25s both}
        .sr{animation:slideR .7s .25s both}
        .si{animation:scaleIn .6s .15s both}
        .t-anim{animation:tSlide .45s ease both}
        .pulse-line{animation:pulse 3s ease infinite}
        .float-el{animation:float 4s ease-in-out infinite}
        .spin-slow-el{animation:spin-slow 22s linear infinite}
        .lb-in{animation:lbIn .22s ease both}

        .shimmer-btn {
          background: linear-gradient(90deg,#C78665 0%,#E8A882 40%,#C78665 60%,#C78665 100%);
          background-size:200% 100%;
          animation:shimmer 3s ease infinite;
        }

        .ping-dot::after {
          content:'';
          position:absolute;
          inset:0;
          border-radius:9999px;
          background:#22c55e;
          animation:ping-soft 1.8s ease-out infinite;
        }

        .info-card { transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .info-card:hover { transform: translateY(-5px); }

        .branch-tab { transition: all .25s ease; }
        .faq-body { overflow: hidden; transition: max-height .4s ease, opacity .3s ease; }

        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: #F4EDE6; }
        textarea::-webkit-scrollbar-thumb { background: #C78665; border-radius: 4px; }
      `}</style>

      {/* ━━━━━━━━ 1. HERO [DARK] ━━━━━━━━ */}
      <section className="relative h-[800px] flex items-center justify-center overflow-hidden bg-[#f4efe9]">
        {/* BG image */}
        <img
                 src={bannerImg}
                 alt="Menu Banner"
                 className="absolute inset-0 w-full h-[800px] object-cover"
               />

        {/* Corner accents */}
                <div className="hidden md:block absolute top-40 left-90 w-16 h-16 border-t border-l border-[#C78665]/40 z-10" />
        <div className="hidden md:block absolute bottom-50 right-80 w-16 h-16 border-b border-r border-[#C78665]/40 z-10" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-24 flex items-center justify-center">
          <div className="w-full max-w-2xl text-center mx-auto">
            <p className="font-josefin text-[#C78665] tracking-[.4em] text-[10px] sm:text-[11px] uppercase mb-5">
              Get In Touch · Cafechino
            </p>
           <h1
              className="font-cormorant font-light text-[#F4EDE6] leading-[1.05] mb-6"
              style={{ fontSize: "clamp(36px, 7vw, 70px)" }}
            >
              We'd Love to<br />
              <em className="text-[#C78665]">Hear From You</em>
            </h1>
            <div className="h-px bg-[#C78665] w-24 mb-6 mx-auto" />
            <p className="font-josefin text-[#C4A882] text-sm font-light leading-relaxed max-w-md mb-10 mx-auto">
              Whether it's a reservation, a catering enquiry, feedback, or just a hello — our team is ready and waiting. Reach out the way that works best for you.
            </p>
             <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">

              <button className="font-josefin w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C78665] text-[#140A06] text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-opacity">
                View Full Menu
              </button>

              <button className="font-josefin px-8 py-3.5 rounded-full border border-[#C78665]/40 text-[#F4EDE6] text-xs font-light tracking-[.15em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all duration-300">
                Book a Table
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 2. QUICK STATS [LIGHT] ━━━━━━━━ */}
      <section ref={statsRef} className="bg-[#F4EDE6] pb-14 px-6 border-b border-[#E0D0C4]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className={`si`} style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="font-cormorant text-4xl sm:text-5xl font-light text-[#C78665] leading-none">{s.num}</p>
              <div className="mx-auto mt-2 mb-2 h-px bg-[#C78665]/30 w-8" />
              <p className="font-josefin text-[10px] tracking-[.25em] text-[#8A7060] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━ 3. CONTACT INFO CARDS [DARK] ━━━━━━━━ */}
      <section className="bg-[#140A06] py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Reach Us</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight"
              style={{ fontSize: "clamp(32px,4vw,58px)" }}>
              Multiple Ways to <em className="text-[#C78665]">Connect</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item, i) => (
              <div
  key={i}
  className="info-card group border border-[#C78665]/20 hover:border-[#C78665]/50 rounded-2xl p-7 cursor-default transition-all duration-300 hover:shadow-[0_20px_60px_rgba(199,134,101,0.1)]"
  style={{
    background: "linear-gradient(135deg, rgba(199,134,101,0.08) 0%, rgba(255,255,255,0.03) 100%)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
  }}
>
                <div className="w-12 h-12 rounded-xl bg-[#C78665]/10 border border-[#C78665]/20 flex items-center justify-center mb-6 group-hover:bg-[#C78665]/20 transition-colors">
                  <item.icon size={20} className="text-[#C78665]" />
                </div>
                <h3 className="font-cormorant text-[#F4EDE6] text-xl font-semibold mb-3">{item.title}</h3>
                {item.lines.map((line, li) => (
                  <p key={li} className="font-josefin text-[#8A7060] text-xs font-light leading-relaxed">{line}</p>
                ))}
                <button className="font-josefin mt-5 flex items-center gap-1.5 text-[#C78665] text-[10px] uppercase tracking-[.15em] hover:gap-3 transition-all duration-200">
                  {item.link} <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 4. CONTACT FORM + MAP [LIGHT] ━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">

          {/* ── FORM (Light theme) ── */}
          <div className="sl bg-white rounded-3xl border border-[#E0D0C4] shadow-xl p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-14">
                <div className="w-20 h-20 rounded-full bg-[#C78665]/10 border-2 border-[#C78665] flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-[#C78665]" />
                </div>
                <h3 className="font-cormorant text-[#2E1F18] text-3xl mb-3">Message Sent!</h3>
                <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed max-w-xs mx-auto mb-8">
                  Thank you for reaching out. Our team will respond within 2 hours during working hours.
                </p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "General Enquiry", message: "", guests: "" }); setCharCount(0); }}
                  className="font-josefin px-8 py-3 rounded-full bg-[#C78665] text-white text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-opacity">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="font-josefin text-[#C78665] tracking-[.3em] text-[10px] uppercase mb-2">Contact Form</p>
                  <h3 className="font-cormorant text-[#2E1F18] font-light" style={{ fontSize: "clamp(26px,3vw,38px)" }}>
                    Send Us a <em className="text-[#C78665]">Message</em>
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Full Name *</label>
                      <input type="text" required placeholder="Your full name"
                        value={formData.name}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={inputBase("name")} />
                    </div>
                    <div>
                      <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Phone</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={inputBase("phone")} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Email Address *</label>
                    <input type="email" required placeholder="you@email.com"
                      value={formData.email}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={inputBase("email")} />
                  </div>

                  {/* Subject + Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">Subject</label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                          className={`${inputBase("subject")} appearance-none pr-10`}>
                          <option>General Enquiry</option>
                          <option>Table Reservation</option>
                          <option>Private Event</option>
                          <option>Catering</option>
                          <option>Franchise</option>
                          <option>Feedback</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7060] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-1.5">No. of Guests</label>
                      <input type="number" min="1" max="100" placeholder="e.g. 4"
                        value={formData.guests}
                        onFocus={() => setFocused("guests")} onBlur={() => setFocused(null)}
                        onChange={e => setFormData({ ...formData, guests: e.target.value })}
                        className={inputBase("guests")} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide">Message *</label>
                      <span className="font-josefin text-[10px] text-[#C4B8B0]">{charCount}/500</span>
                    </div>
                    <textarea rows={5} required placeholder="Tell us how we can help..."
                      value={formData.message}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      onChange={e => { setFormData({ ...formData, message: e.target.value }); setCharCount(e.target.value.length); }}
                      maxLength={500}
                      className={`${inputBase("message")} resize-none`} />
                  </div>

                  {/* Preferred contact */}
                  <div>
                    <label className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-wide block mb-3">Preferred Contact Method</label>
                    <div className="flex gap-3 flex-wrap">
                      {["Email", "Phone", "WhatsApp"].map(method => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="contact_method" value={method} defaultChecked={method === "Email"} className="accent-[#C78665]" />
                          <span className="font-josefin text-xs text-[#6A5A50] group-hover:text-[#C78665] transition-colors">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit"
                    className="shimmer-btn font-josefin w-full py-4 rounded-full text-[#140A06] text-xs font-bold tracking-[.2em] uppercase flex items-center justify-center gap-2 mt-2">
                    <Send size={14} /> Send Message
                  </button>
                  <p className="font-josefin text-[#C4B8B0] text-[10px] text-center">
                    We'll respond within 2 hours. Your data is safe with us.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* ── RIGHT: Branch Selector + Info ── */}
          <div className="sr flex flex-col gap-6">
            {/* Heading */}
            <div>
              <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-3">Our Locations</p>
              <h3 className="font-cormorant text-[#2E1F18] font-light leading-tight"
                style={{ fontSize: "clamp(28px,3vw,46px)" }}>
                Find Us <em className="text-[#C78665]">Nearby</em>
              </h3>
            </div>

            {/* Branch tabs */}
            <div className="flex gap-2 flex-wrap">
              {branches.map((b, i) => (
                <button key={i} onClick={() => setActiveBranch(i)}
                  className={`branch-tab font-josefin text-xs tracking-[.12em] uppercase px-5 py-2.5 rounded-full border
                    ${activeBranch === i ? "bg-[#C78665] border-[#C78665] text-[#140A06] font-semibold" : "border-[#E0D0C4] text-[#8A7060] hover:border-[#C78665] hover:text-[#C78665]"}`}>
                  {b.flag} {b.city}
                </button>
              ))}
            </div>

            {/* Branch detail card */}
            <div key={activeBranch} className="t-anim bg-white border border-[#E0D0C4] rounded-2xl p-7 shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-cormorant text-[#2E1F18] text-2xl font-semibold">{branches[activeBranch].flag} {branches[activeBranch].city}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} fill="#C78665" className="text-[#C78665]" />
                    <span className="font-josefin text-xs text-[#C78665] font-semibold">{branches[activeBranch].rating}</span>
                    <span className="font-josefin text-xs text-[#C4B8B0] ml-1">/ 5.0</span>
                  </div>
                </div>
                <span className="font-josefin text-[9px] uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full">Open Now</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: MapPin, val: branches[activeBranch].address },
                  { icon: Phone, val: branches[activeBranch].phone },
                  { icon: Clock, val: branches[activeBranch].hours },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F4EDE6] flex items-center justify-center flex-shrink-0">
                      <row.icon size={13} className="text-[#C78665]" />
                    </div>
                    <p className="font-josefin text-xs text-[#6A5A50]">{row.val}</p>
                  </div>
                ))}
              </div>
              <button className="font-josefin mt-6 w-full py-3 rounded-xl bg-[#F4EDE6] text-[#C78665] text-xs font-semibold tracking-[.15em] uppercase hover:bg-[#C78665] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <MapPin size={12} /> Get Directions
              </button>
            </div>

            {/* Map embed placeholder */}
            <div className="relative rounded-2xl overflow-hidden h-52 border border-[#E0D0C4] shadow-sm bg-[#F4EDE6]">
              <iframe
                title="Cafechino Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7!2d72.8347!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNTAnMDQuOSJF!5e0!3m2!1sen!2sin!4v1000000000000"
                className="w-full h-full"
                style={{ border: 0, filter: "sepia(20%) saturate(80%)" }}
                allowFullScreen=""
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#C78665]/20 rounded-2xl" />
            </div>

            {/* Social links */}
            <div className="bg-white border border-[#E0D0C4] rounded-2xl p-6">
              <p className="font-josefin text-[10px] text-[#8A7060] uppercase tracking-[.25em] mb-4">Follow Our Journey</p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "@cafechino", href: "#" },
                  { icon: Twitter, label: "@cafechino", href: "#" },
                  { icon: Facebook, label: "Cafechino", href: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.href}
                    className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border border-[#E0D0C4] hover:border-[#C78665] hover:bg-[#FBF7F3] transition-all group">
                    <s.icon size={18} className="text-[#8A7060] group-hover:text-[#C78665] transition-colors" />
                    <span className="font-josefin text-[9px] text-[#8A7060] group-hover:text-[#C78665] tracking-wide">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 5. FAQ [DARK] ━━━━━━━━ */}
      <section className="bg-[#0A0502] py-24 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Common Questions</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6]"
              style={{ fontSize: "clamp(32px,4vw,52px)" }}>
              Frequently <em className="text-[#C78665]">Asked</em>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#C78665]/40 bg-[#140A06]" : "border-[#1A0E08] bg-[#140A06]/50"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left">
                  <span className="font-cormorant text-[#F4EDE6] text-lg font-medium pr-4">{faq.q}</span>
                  <ChevronDown size={17} className="text-[#C78665] flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }} />
                </button>
                <div className="faq-body" style={{ maxHeight: openFaq === i ? "160px" : "0", opacity: openFaq === i ? 1 : 0 }}>
                  <p className="font-josefin text-[#8A7060] text-sm font-light leading-relaxed px-7 pb-6">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 bg-[#140A06] border border-[#2A1A10] rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-[#C78665]/10 border border-[#C78665]/30 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={22} className="text-[#C78665]" />
            </div>
            <div className="flex-1">
              <p className="font-cormorant text-[#F4EDE6] text-xl font-semibold mb-1">Still have questions?</p>
              <p className="font-josefin text-[#8A7060] text-xs font-light">Our team is happy to help via live chat, email, or a quick call.</p>
            </div>
            <button className="font-josefin px-7 py-3 rounded-full bg-[#C78665] text-[#140A06] text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-opacity flex-shrink-0">
              Chat With Us
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━ 6. TESTIMONIALS [LIGHT] ━━━━━━━━ */}
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
                <p className="font-cormorant text-[#2E1F18] text-xl">{testimonials[activeTestimonial].name}</p>
                <p className="font-josefin text-[#8A7060] text-[11px] tracking-wide">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="flex gap-1 ml-2">
                {Array(5).fill(0).map((_, si) => <Star key={si} size={13} fill="#C78665" color="#C78665" />)}
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

      {/* ━━━━━━━━ 7. FINAL CTA [DARK] ━━━━━━━━ */}
      <section className="relative bg-[#140A06] py-24 px-6 text-center overflow-hidden border-t border-[#2A1A10]">
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=85)" }} />
        <div className="hidden md:block absolute top-8 left-8 w-14 h-14 border-t border-l border-[#C78665]/30" />
        <div className="hidden md:block absolute bottom-8 right-8 w-14 h-14 border-b border-r border-[#C78665]/30" />

        <div className="relative z-10 max-w-xl mx-auto">
          <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Come See Us</p>
          <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-5"
            style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            A Table Awaits <em className="text-[#C78665]">You</em>
          </h2>
          <div className="pulse-line mx-auto mb-6 h-px bg-[#C78665] w-20" />
          <p className="font-josefin text-[#8A7060] text-sm font-light max-w-sm mx-auto leading-relaxed mb-10">
            Walk in or reserve ahead. Either way, we're ready to make your experience unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="shimmer-btn font-josefin px-10 py-4 rounded-full text-[#140A06] text-xs font-bold tracking-[.15em] uppercase">
              Reserve a Table
            </button>
            <button className="font-josefin px-10 py-4 rounded-full border border-[#3A2A1E] text-[#C4A882] text-xs font-light tracking-[.15em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all">
              View Menu
            </button>
          </div>
        </div>
      </section>
    </>
  );
}