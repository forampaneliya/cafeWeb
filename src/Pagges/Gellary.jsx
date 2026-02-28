import React, { useState, useEffect, useRef  } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import bg from "../assets/images/bgGallery.png"
import img1 from "../assets/images/gallery/1.jpg"
import img2 from "../assets/images/gallery/2.jpg"
import img3 from "../assets/images/gallery/3.jpg"
import img4 from "../assets/images/gallery/4.jpg"
import img5 from "../assets/images/gallery/5.jpg"
import img6 from "../assets/images/gallery/6.jpg"
import img7 from "../assets/images/gallery/7.jpg"
import img8 from "../assets/images/gallery/8.jpg"
import img9 from "../assets/images/gallery/9.jpg"
import img10 from "../assets/images/gallery/10.jpg"
import img11 from "../assets/images/gallery/11.jpg"
import img12 from "../assets/images/gallery/12.jpg"
import img13 from "../assets/images/gallery/13.jpg"
import img14 from "../assets/images/gallery/14.png"
import img15 from "../assets/images/gallery/15.png"
import img16 from "../assets/images/gallery/16.png"
import img17 from "../assets/images/gallery/17.png"
import img18 from "../assets/images/gallery/18.png"

/* ═══════════════════ DATA ═══════════════════ */
const cuisineCategories = ["All", "Italian", "Japanese", "Indian", "Mexican", "French", "Mediterranean"];

const masonryItems = [
  { img: img1, label: "Margherita Pizza", cuisine: "Italian", country: "🇮🇹", height: "h-96" },
  { img: img2, label: "Truffle Pasta", cuisine: "Italian", country: "🇮🇹", height: "h-52" },
  { img: img3, label: "Salmon Sashimi", cuisine: "Japanese", country: "🇯🇵", height: "h-72" },
  { img: img4, label: "Omakase Course", cuisine: "Japanese", country: "🇯🇵", height: "h-96" },
  { img: img5, label: "Ramen Bowl", cuisine: "Japanese", country: "🇯🇵", height: "h-56" },
  { img: img6, label: "Butter Chicken", cuisine: "Indian", country: "🇮🇳", height: "h-64" },
  { img: img7, label: "Dal Makhani", cuisine: "Indian", country: "🇮🇳", height: "h-80" },
  { img: img8, label: "Street Tacos", cuisine: "Mexican", country: "🇲🇽", height: "h-52" },
  { img: img9, label: "Enchiladas Verdes", cuisine: "Mexican", country: "🇲🇽", height: "h-72" },
  { img: img10, label: "Coq au Vin", cuisine: "French", country: "🇫🇷", height: "h-96" },
  { img: img11, label: "Crème Brûlée", cuisine: "French", country: "🇫🇷", height: "h-56" },
  { img: img12, label: "Bouillabaisse", cuisine: "French", country: "🇫🇷", height: "h-64" },
  { img: img13, label: "Greek Salad", cuisine: "Mediterranean", country: "🇬🇷", height: "h-52" },
  { img: img14, label: "Lamb Kebab", cuisine: "Mediterranean", country: "🇹🇷", height: "h-80" },
  { img: img15, label: "Seafood Paella", cuisine: "Mediterranean", country: "🇪🇸", height: "h-64" },
  { img: img16, label: "Wagyu Burger", cuisine: "Italian", country: "🇺🇸", height: "h-56" },
  { img: img17, label: "Lobster Mac & Cheese", cuisine: "French", country: "🇺🇸", height: "h-72" },
  { img: img18, label: "Fine Dining", cuisine: "French", country: "🇫🇷", height: "h-96" },
];

const featuredCards = [
  { img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=700&q=85", name: "Omakase Journey", desc: "Japanese precision at its finest", country: "🇯🇵" },
  { img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=85", name: "Spice Route", desc: "The depth of Indian flavors", country: "🇮🇳" },
  { img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=700&q=85", name: "Pasta al Tartufo", desc: "Italian countryside simplicity", country: "🇮🇹" },
  { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=85", name: "Fruits de Mer", desc: "French coastal excellence", country: "🇫🇷" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Culinary Travel Blogger", text: "Every frame captures the soul of its cuisine. This gallery is a passport to the world's best tables.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Marco Benedetti", role: "Michelin Inspector", text: "Rarely does photography convey not just beauty but flavor itself. An extraordinary collection of global gastronomy.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Aiko Tanaka", role: "Food Journalist, Bon Appétit", text: "From the precision of Japanese sashimi to the warmth of Indian curries — this gallery celebrates it all magnificently.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

const stats = [
  { num: 18, suffix: "+", label: "World Cuisines" },
  { num: 200, suffix: "+", label: "Dishes Captured" },
  { num: 40, suffix: "+", label: "Countries Featured" },
  { num: 98, suffix: "%", label: "Guest Satisfaction" },
];



 

/* ═══════════════════ COMPONENT ═══════════════════ */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counts, setCounts] = useState(stats.map(() => 0));
const sectionRef = useRef(null);
const [start, setStart] = useState(false);


 useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  useEffect(() => {
    if (!start) return;

    stats.forEach((stat, index) => {
      let startValue = 0;
      const endValue = stat.num;
      const duration = 1500;
      const incrementTime = 20;
      const step = Math.ceil(endValue / (duration / incrementTime));

      const counter = setInterval(() => {
        startValue += step;
        if (startValue >= endValue) {
          startValue = endValue;
          clearInterval(counter);
        }

        setCounts(prev => {
          const updated = [...prev];
          updated[index] = startValue;
          return updated;
        });

      }, incrementTime);
    });

  }, [start]);


  const filtered = activeCategory === "All"
    ? masonryItems
    : masonryItems.filter(i => i.cuisine === activeCategory);

  const lightboxPrev = () => {
    const ni = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(ni); setLightbox(filtered[ni]);
  };
  const lightboxNext = () => {
    const ni = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(ni); setLightbox(filtered[ni]);
  };

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .font-josefin   { font-family: 'Josefin Sans', sans-serif !important; }

        .masonry-col { columns: 2; column-gap: 12px; }
        @media (min-width: 768px)  { .masonry-col { columns: 3; } }
        @media (min-width: 1280px) { .masonry-col { columns: 4; } }
        .m-item { break-inside: avoid; margin-bottom: 12px; display: block; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes tSlide { from { opacity:0; transform:translateX(18px); } to { opacity:1; transform:translateX(0); } }
        @keyframes lbIn   { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }
        @keyframes pulse  { 0%,100%{opacity:.5} 50%{opacity:1} }

        .anim-1 { animation: fadeUp .8s ease .1s both; }
        .anim-2 { animation: fadeUp .8s ease .3s both; }
        .anim-3 { animation: fadeUp .8s ease .5s both; }
        .anim-4 { animation: fadeUp .8s ease .7s both; }
        .t-anim  { animation: tSlide .45s ease both; }
        .lb-anim { animation: lbIn .22s ease both; }
        .pulse-line { animation: pulse 3s ease infinite; }

        .m-item .overlay { opacity:0; transition: opacity .3s; }
        .m-item:hover .overlay { opacity:1; }
        .m-item img { transition: transform .55s cubic-bezier(.25,.46,.45,.94); }
        .m-item:hover img { transform: scale(1.06); }
      `}</style>

      {/* ━━━━━━━━━━━━━━━━━ 1. HERO  [DARK] ━━━━━━━━━━━━━━━━━ */}
     <section className="relative h-[800px] flex items-center justify-center overflow-hidden bg-[#f4efe9]">
  
  {/* BG */}
   <img
      src={bg}
      alt="Menu Banner"
      className="absolute inset-0 w-full h-full object-cover"
    />
  {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0A0502]/30 via-[#0A0502]/30 to-[#0A0502]" /> */}

  {/* Corner lines (hidden on small screens) */}
<div className="hidden md:block absolute top-40 left-90 w-16 h-16 border-t border-l border-[#C78665]/40 z-10" />
  <div className="hidden md:block absolute bottom-50 right-80 w-16 h-16 border-b border-r border-[#C78665]/40 z-10" />

  {/* Floating flags (smaller on mobile) */}
  {["🇮🇹","🇯🇵","🇮🇳","🇫🇷","🇲🇽"].map((f,i)=>(
    <span
      key={i}
      className="absolute text-xl sm:text-2xl lg:text-3xl opacity-10 select-none"
      style={{
        top:`${18+i*14}%`,
        [i%2===0?"left":"right"]:`${6+i*2}%`
      }}
    >
      {f}
    </span>
  ))}

  <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
    
    <p className="font-josefin text-[#C78665] tracking-[.3em] sm:tracking-[.4em] text-[10px] sm:text-[11px] uppercase mb-4 sm:mb-5">
      A Visual Feast · World Cuisine
    </p>

    <h1
      className="font-cormorant font-light text-[#F4EDE6] leading-tight sm:leading-[1.05] mb-5 sm:mb-6"
      style={{ fontSize:"clamp(32px,8vw,70px)" }}
    >
      Flavors Without<br/>
      <em className="text-[#C78665]">Borders</em>
    </h1>

    <div className="mx-auto mb-5 sm:mb-6 h-px bg-[#C78665] max-w-[120px] sm:max-w-[160px]" />

    <p className="font-josefin text-[#C4A882] text-xs sm:text-sm font-light leading-relaxed max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10">
      A curated journey through the world's most extraordinary cuisines — from Japanese precision
      to Indian warmth, French elegance to Mediterranean soul.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#C78665] text-[#140A06] text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition">
        Explore Gallery
      </button>
      <button className="w-full sm:w-auto px-8 py-3 rounded-full border border-[#C78665]/40 text-[#F4EDE6] text-xs font-light tracking-[.15em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all">
        Reserve a Table
      </button>
    </div>

  </div>
</section>

      {/* ━━━━━━━━━━━━━━━━━ 2. STATS  [LIGHT] ━━━━━━━━━━━━━━━━━ */}
      <section
      ref={sectionRef}
      className="bg-[#F4EDE6] py-16 px-6 border-y border-[#E0D0C4]"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="font-cormorant text-5xl font-light text-[#C78665] leading-none">
              {counts[i]}{s.suffix}
            </p>
            <p className="font-josefin text-[10px] tracking-[.25em] text-[#8A7060] uppercase mt-2">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>

      {/* ━━━━━━━━━━━━━━━━━ 3. MASONRY GALLERY  [DARK] ━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0A0502] py-24 px-4">
        <div className="max-w-screen-2xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">
              World Cuisine Gallery
            </p>
            <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-3"
              style={{ fontSize:"clamp(36px,5vw,64px)" }}>
              A Table Without <em className="text-[#C78665]">Borders</em>
            </h2>
            <p className="font-josefin text-[#8A7060] text-sm font-light max-w-md mx-auto mb-10 leading-relaxed">
              Every image tells a story of culture, tradition, and the universal language of food.
            </p>
            {/* Filter pills */}
            <div className="flex gap-2 justify-center flex-wrap">
              {cuisineCategories.map(cat=>(
                <button
                  key={cat}
                  onClick={()=>setActiveCategory(cat)}
                  className={`font-josefin text-[11px] tracking-[.15em] uppercase px-5 py-2 rounded-full transition-all
                    ${activeCategory===cat
                      ? "bg-[#C78665] text-[#140A06] font-semibold"
                      : "border border-[#3A2A1E] text-[#C4A882] hover:border-[#C78665] hover:text-[#C78665]"
                    }`}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Masonry */}
          <div className="masonry-col">
            {filtered.map((item,i)=>(
              <div
                key={`${activeCategory}-${i}`}
                className="m-item group relative rounded-xl overflow-hidden cursor-zoom-in shadow-[0_8px_32px_rgba(0,0,0,.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,.7)] hover:-translate-y-1 transition-all duration-300"
                onClick={()=>{ setLightbox(item); setLightboxIndex(i); }}
              >
                <div className="overflow-hidden">
                  <img src={item.img} alt={item.label} className={`w-full object-cover ${item.height}`} />
                </div>
                <div className="overlay absolute inset-0 bg-gradient-to-t from-[#0A0502]/90 via-[#0A0502]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                  <div>
                    <p className="font-josefin text-[10px] text-[#C78665] tracking-[.2em] uppercase mb-1">
                      {item.country} {item.cuisine}
                    </p>
                    <p className="font-cormorant text-[#F4EDE6] text-base font-light">{item.label}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#C78665]/40 bg-[#C78665]/10 flex items-center justify-center flex-shrink-0">
                    <ZoomIn size={12} className="text-[#C78665]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 4. CHEF'S PICKS  [LIGHT] ━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
            <div>
              <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-3">Handpicked Selections</p>
              <h2 className="font-cormorant text-[#2E1F18] font-light leading-tight"
                style={{ fontSize:"clamp(32px,4vw,56px)" }}>
                Chef's <em className="text-[#C78665]">Visual</em> Picks
              </h2>
            </div>
            <p className="font-josefin text-[#8A7060] text-sm font-light max-w-xs leading-relaxed">
              Dishes that define their culture, photographed at the peak of their artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCards.map((card,i)=>(
              <div key={i}
                className="group rounded-2xl overflow-hidden border border-[#E0D0C4] bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-52 overflow-hidden">
                  <img src={card.img} alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-2xl mb-1">{card.country}</p>
                  <h3 className="font-cormorant text-[#2E1F18] text-xl font-medium mb-1">{card.name}</h3>
                  <p className="font-josefin text-[#8A7060] text-xs font-light">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 5. BANNER  [DARK] ━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[420px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=85"
          alt="Dining" className="w-full h-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 bg-[#0A0502]/72" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-5">Every Cuisine, Every Culture</p>
          <h2 className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-6"
            style={{ fontSize:"clamp(40px,6vw,80px)" }}>
            The World on a <em className="text-[#C78665]">Plate</em>
          </h2>
          <div className="pulse-line mx-auto mb-5 h-px bg-[#C78665] w-24" />
          <p className="font-josefin text-[#C4A882] text-sm max-w-md font-light leading-relaxed">
            "Food is our common ground, a universal experience." — James Beard
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 6. TESTIMONIALS  [LIGHT] ━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">What Guests Say</p>
          <h2 className="font-cormorant text-[#2E1F18] font-light mb-16"
            style={{ fontSize:"clamp(32px,4vw,52px)" }}>
            Voices of <em className="text-[#C78665]">Delight</em>
          </h2>

          <div key={activeTestimonial}
            className="t-anim relative bg-white border border-[#E0D0C4] rounded-2xl px-8 md:px-14 py-14 shadow-lg">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C78665] flex items-center justify-center shadow-md">
              <Quote size={16} className="text-white" />
            </div>
            <p className="font-cormorant italic text-[#2E1F18] leading-relaxed mb-10"
              style={{ fontSize:"clamp(18px,2.5vw,22px)" }}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              <img src={testimonials[activeTestimonial].avatar} alt=""
                className="w-14 h-14 rounded-full object-cover border-2 border-[#C78665]" />
              <div className="text-left">
                <p className="font-cormorant text-[#2E1F18] text-lg">{testimonials[activeTestimonial].name}</p>
                <p className="font-josefin text-[#8A7060] text-[11px] tracking-wide">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="flex gap-1 ml-2">
                {Array(5).fill(0).map((_,si)=><Star key={si} size={13} fill="#C78665" color="#C78665" />)}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_,i)=>(
              <button key={i} onClick={()=>setActiveTestimonial(i)}
                className="rounded-full h-2.5 transition-all duration-300"
                style={{ width:i===activeTestimonial?28:10, background:i===activeTestimonial?"#C78665":"#D6C7BC" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 7. CTA  [DARK] ━━━━━━━━━━━━━━━━━ */}
      

      {/* ━━━━━━━━━━━━━━━━━ LIGHTBOX ━━━━━━━━━━━━━━━━━ */}
      {lightbox && (
        <div className="fixed inset-0 bg-[#050201]/96 z-50 flex items-center justify-center p-5"
          onClick={()=>setLightbox(null)}>
          {/* Close */}
          <button onClick={()=>setLightbox(null)}
            className="fixed top-6 right-6 w-11 h-11 rounded-full border border-[#C78665]/40 bg-[#C78665]/10 flex items-center justify-center text-[#C78665] z-50 hover:bg-[#C78665]/20 transition-colors">
            <X size={17} />
          </button>
          {/* Prev */}
          <button onClick={e=>{e.stopPropagation();lightboxPrev();}}
            className="fixed left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#C78665]/30 bg-[#C78665]/10 flex items-center justify-center text-[#C78665] z-50 hover:bg-[#C78665]/20 transition-colors">
            <ChevronLeft size={20} />
          </button>
          {/* Next */}
          <button onClick={e=>{e.stopPropagation();lightboxNext();}}
            className="fixed right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#C78665]/30 bg-[#C78665]/10 flex items-center justify-center text-[#C78665] z-50 hover:bg-[#C78665]/20 transition-colors">
            <ChevronRight size={20} />
          </button>
          {/* Image */}
          <div className="lb-anim relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,.85)]"
            onClick={e=>e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.label} className="w-full max-h-[78vh] object-cover block" />
            <div className="flex justify-between items-center px-6 py-4 bg-[#140A06]">
              <div>
                <p className="font-josefin text-[10px] text-[#C78665] tracking-[.2em] uppercase mb-1">
                  {lightbox.country} {lightbox.cuisine}
                </p>
                <p className="font-cormorant text-[#F4EDE6] text-xl">{lightbox.label}</p>
              </div>
              <p className="font-josefin text-[#8A7060] text-xs">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}