import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Heart, Users, Award, ChevronDown, Leaf, Clock, Star } from 'lucide-react';
import image1 from "../assets/images/12.jpg"
import image2 from "../assets/images/10.jpg"
import image3 from "../assets/images/15.jpg"
import image4 from "../assets/images/26.jpg"
import image5 from "../assets/images/37.jpg"
import image6 from "../assets/images/43.jpg"
import image7 from "../assets/images/44.jpg"
import image8 from "../assets/images/51.jpg"
import image9 from "../assets/images/35.jpg"
import image10 from "../assets/images/36.jpg"
import image11 from "../assets/images/45.jpg"
import image12 from "../assets/images/48.jpg"
import image13 from "../assets/images/40.jpg"
import image14 from "../assets/images/41.jpg"
import image15 from "../assets/images/49.jpg"
import image16 from "../assets/images/55.jpg"








// Mock images - replace with your actual images
const aboutImages = [
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'
];
const foodCategories = {
  snacks: [
    image1,
    image2,
    image3,
    image4
  ],
  drinks: [
   image9,
   image10,
   image11,
   image12
  ],
  coffee: [
   image5,
   image6,
   image7,
   image8
  ],
  dessert: [
   image13,
   image14,
   image15,
   image16
  ],
};
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
    const promises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) return resolve();
          img.onload = resolve;
          img.onerror = resolve;
        })
    );

    Promise.all(promises).then(() => {
      this.calculateHeights();
      this.start();
    });
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

function About() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
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

      const instance = new VerticalLoopAnimation(container, {
        speed: 1 + index * 0.3,
        direction: index % 2 === 0 ? "up" : "down",
        pauseOnHover: true,
      });
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight * 0.3;
      
      const newPage = Math.min(
        Math.floor(scrollPosition / scrollThreshold),
        aboutImages.length - 1
      );
      
      if (newPage !== currentPage && !isFlipping) {
        setIsFlipping(true);
        setCurrentPage(newPage);
        setTimeout(() => setIsFlipping(false), 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, isFlipping]);

  const features = [
    {
      icon: Coffee,
      title: 'Premium Beans',
      desc: 'Sourced from finest coffee plantations worldwide'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      desc: 'Every cup crafted with passion and dedication'
    },
    {
      icon: Users,
      title: 'Community Hub',
      desc: 'A welcoming space for everyone to connect'
    },
    {
      icon: Award,
      title: 'Award Winning',
      desc: 'Recognized for excellence in coffee craftsmanship'
    }
  ];

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '15+', label: 'Coffee Varieties' },
    { number: '100%', label: 'Organic Beans' }
  ];

  const values = [
    { icon: Leaf, title: 'Sustainability', desc: 'Committed to eco-friendly practices' },
    { icon: Clock, title: 'Freshness', desc: 'Roasted daily for peak flavor' },
    { icon: Star, title: 'Quality', desc: 'Never compromising on excellence' }
  ];

  return (
    <div className="bg-[#1A1410] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#1A1410]/80 z-0"></div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200)",
          filter: "brightness(0.35)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-[#E7C27D] mb-4 sm:mb-6 animate-fade-in font-bold">
          Our Story
        </h1>
        <p className="text-white text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 leading-relaxed animate-fade-in delay-200">
          A journey of passion, quality, and community. We craft experiences
          that connect people and leave a lasting impression.
        </p>
        {/* CTA Scroll Indicator */}
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <ChevronDown className="text-[#FCE779]" size={40} />
          <span className="text-sm text-[#FCE779] uppercase tracking-widest">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Optional floating shapes or particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-3 h-3 bg-[#E7C27D] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-[#FCE779] rounded-full animate-pulse delay-500"></div>
      </div>
    </section>

      {/* Book Flip Slider Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#E7C27D] text-center mb-16">
            Coffee Through Our Lens
          </h2>
          
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] perspective-1000">
            <div className="relative w-full h-full max-w-4xl mx-auto">
              {aboutImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 transform-style-3d ${
                    index === currentPage
                      ? 'z-20 opacity-100 rotate-x-0'
                      : index < currentPage
                      ? 'z-10 opacity-0 -rotate-x-90 origin-bottom'
                      : 'z-0 opacity-0 rotate-x-90 origin-top'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={img}
                      alt={`Coffee story ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <p className="text-white text-lg sm:text-xl md:text-2xl font-serif">
                        {index === 0 && "Where passion meets perfection"}
                        {index === 1 && "Crafting moments, one cup at a time"}
                        {index === 2 && "Your daily dose of happiness"}
                        {index === 3 && "Experience the art of coffee"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Page Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
              {aboutImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPage ? 'bg-[#E7C27D] w-8' : 'bg-white/50'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          
          <p className="text-center text-[#FCE779] mt-8 text-sm sm:text-base">
            Scroll to explore our journey
          </p>
        </div>
      </section>

      {/* Our Story Text */}
       <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1410] via-[#2A1F1A] to-[#3B2A22]"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#E7C27D]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FCE779]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-[#E7C27D]/10 rounded-full mb-6">
                <span className="text-[#E7C27D] text-sm font-semibold tracking-wider">EST. 2014</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                Brewing Excellence, 
                <span className="text-[#E7C27D]"> One Cup at a Time</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Our journey began in the highlands of Ethiopia, where we discovered beans that would change everything. Today, we're more than a coffee shop—we're a sanctuary for coffee lovers, a meeting place for dreamers, and a home for those who believe great coffee is an art form.
              </p>
              <p className="text-[#E7C27D]/90 text-lg leading-relaxed italic">
                "Every bean has a story. Every cup creates a memory."
              </p>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600" 
                  alt="Coffee beans"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/80 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#E7C27D] rounded-full flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1A1410]">10+</div>
                  <div className="text-sm text-[#1A1410]/80 font-semibold">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Features Showcase */}
      <section className="py-24 px-4 bg-[#1A1410]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif text-[#E7C27D] mb-4">
              The Art of Coffee
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E7C27D] to-transparent mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A1F1A] to-[#1A1410] border border-[#E7C27D]/10 hover:border-[#E7C27D]/30 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7C27D]/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative p-10">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#E7C27D] to-[#FCE779] rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <feature.icon className="text-[#1A1410]" size={28} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#E7C27D] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E7C27D] to-[#FCE779] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Counter */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#2A1F1A]"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E7C27D] to-[#FCE779] group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="absolute -inset-4 bg-[#E7C27D]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-white/90 text-base md:text-lg font-semibold tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values with Image Overlays */}
      <section className="py-24 px-4 bg-[#1A1410]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif text-[#E7C27D] mb-4">
              Our Philosophy
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Three pillars that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl aspect-square bg-[#2A1F1A] hover:shadow-2xl hover:shadow-[#E7C27D]/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1410]/50 to-[#1A1410] z-10"></div>
                
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-${index === 0 ? '1518430173161-a8c57e7f9c90' : index === 1 ? '1497935586351-b67a49e012bf' : '1514432324607-a09d9b4aefdd'}?w=600)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                
                <div className="relative z-20 p-10 h-full flex flex-col justify-end">
                  <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                    <value.icon className="text-[#E7C27D]" size={56} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#FCE779] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {value.desc}
                  </p>
                  
                  <div className="mt-6 w-16 h-1 bg-[#E7C27D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA */}
        <section className="py-20 px-4 bg-[#1A1410]">
      <h2 className="text-4xl md:text-5xl font-serif text-[#E7C27D] text-center mb-12">
        Our Food Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.keys(foodCategories).map((category) => (
          <div
            key={category}
            className="verticalLoop-wrap h-[300px] overflow-hidden rounded-xl border border-[#E7C27D]/20 relative"
            ref={containerRefs[category]}
          >
            <div className="verticalLoop-track flex flex-col">
              {foodCategories[category].map((img, i) => (
                <div key={i} className="verticalLoop-item p-1">
                  <img
                    src={img}
                    alt={category}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}

export default About;