import React, { useEffect, useState } from "react";
import foodImg from "../assets/images/13.jpg";
import drinkImg from "../assets/images/39.jpg";
import dessertImg from "../assets/images/37.jpg";
import bannerImg from "../assets/images/menubanner.png";
import pastaImg from "../assets/images/11.jpg";
import burgerImg from "../assets/images/22.jpg";
import pizzaImg from "../assets/images/25.jpg";
import garlicImg from "../assets/images/30.jpg";
import chefImg from "../assets/images/11.jpg";
import { useRef } from "react";
import coffeeImg from "../assets/images/48.jpg";
import mojitoImg from "../assets/images/41.jpg";
import shakeImg from "../assets/images/53.jpg";
import teaImg from "../assets/images/42.jpg";

import brownieImg from "../assets/images/38.jpg";
import sundaeImg from "../assets/images/46.jpg";
import cheesecakeImg from "../assets/images/51.jpg";
import waffleImg from "../assets/images/56.jpg";
import { motion } from "framer-motion";

function Menu() {
  const [activeTab, setActiveTab] = useState("food");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoPlayRef = useRef(null);
  const CARD_WIDTH = 280; // card width + gap
  const VISIBLE_CARDS = 3; // how many cards visible at once

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= weeklySpecials.length - VISIBLE_CARDS ? 0 : prev + 1
      );
    }, 2500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    startAutoPlay();
    const threshold = 60;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) =>
        prev >= weeklySpecials.length - VISIBLE_CARDS ? 0 : prev + 1
      );
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev <= 0 ? weeklySpecials.length - VISIBLE_CARDS : prev - 1));
    }
  };

  const slideLeft = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const slideRight = {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const weeklySpecials = [
    { day: "Monday", dish: "Truffle Mushroom Risotto", price: "$18", note: "Earthy aromas, creamy texture", image: pastaImg, badge: "Limited" },
    { day: "Tuesday", dish: "Smoked Salmon Platter", price: "$21", note: "Cold smoked with dill cream", image: burgerImg, badge: "Chef Pick" },
    { day: "Wednesday", dish: "Lamb Kofta Bowl", price: "$19", note: "Spiced lamb over saffron rice", image: pizzaImg, badge: "New" },
    { day: "Thursday", dish: "Caprese Bruschetta", price: "$13", note: "Heirloom tomatoes, fresh basil", image: garlicImg, badge: "Trending" },
    { day: "Friday", dish: "BBQ Pulled Pork Bun", price: "$16", note: "Slow-cooked, smoky & tender", image: burgerImg, badge: "Popular" },
    { day: "Weekend", dish: "Grand Brunch Plate", price: "$24", note: "Eggs, avocado, artisan bread", image: pastaImg, badge: "Exclusive" },
  ];

  const menuData = {
    food: [
      {
        name: "Spicy Arrabbiata Pasta",
        price: "$12",
        description: "Classic Italian pasta tossed in spicy tomato basil sauce.",
        tag: "Popular",
        image: pastaImg,
      },
      {
        name: "Grilled Cheese Burger",
        price: "$10",
        description: "Juicy grilled patty layered with melted cheddar cheese.",
        tag: "Chef Special",
        image: burgerImg,
      },
      {
        name: "Farm Fresh Veggie Pizza",
        price: "$14",
        description: "Wood-fired pizza topped with seasonal vegetables.",
        tag: "Trending",
        image: pizzaImg,
      },
      {
        name: "Garlic Butter Bread",
        price: "$8",
        description: "Crispy bread slices infused with garlic herb butter.",
        tag: "New",
        image: garlicImg,
      },
    ],

    drink: [
      {
        name: "Cold Brew Coffee",
        price: "$6",
        description: "Slow brewed coffee served chilled and refreshing.",
        tag: "Popular",
        image: coffeeImg,
      },
      {
        name: "Mint Mojito",
        price: "$7",
        description: "Fresh mint, lime and soda blend for a cool taste.",
        tag: "Fresh",
        image: mojitoImg,
      },
      {
        name: "Strawberry Milkshake",
        price: "$8",
        description: "Creamy shake blended with fresh strawberries.",
        tag: "Trending",
        image: shakeImg,
      },
      {
        name: "Lemon Iced Tea",
        price: "$5",
        description: "Chilled tea infused with lemon zest and mint.",
        tag: "New",
        image: teaImg,
      },
    ],

    dessert: [
      {
        name: "Chocolate Fudge Brownie",
        price: "$9",
        description: "Rich chocolate brownie served warm with drizzle.",
        tag: "Hot",
        image: brownieImg,
      },
      {
        name: "Ice Cream Sundae",
        price: "$7",
        description: "Vanilla ice cream topped with chocolate syrup.",
        tag: "Popular",
        image: sundaeImg,
      },
      {
        name: "New York Cheesecake",
        price: "$11",
        description: "Creamy baked cheesecake with berry topping.",
        tag: "Chef Special",
        image: cheesecakeImg,
      },
      {
        name: "Belgian Waffles",
        price: "$8",
        description: "Crispy waffles served with maple syrup.",
        tag: "Trending",
        image: waffleImg,
      },
    ],
  };

  const getImage = () => {
    if (activeTab === "food") return foodImg;
    if (activeTab === "drink") return drinkImg;
    return dessertImg;
  };

  return (

    <>

      <section className="relative h-[800px] flex items-center justify-center overflow-hidden bg-[#f4efe9]">

        {/* Background Image */}
        <img
          src={bannerImg}
          alt="Menu Banner"
          className="absolute inset-0 w-full h-[700px] object-cover"
        />

        {/* Dark Overlay for readability */}
        {/* <div className="absolute inset-0 bg-black/60"></div> */}

        {/* Corner accents (same as franchise for consistency) */}
        <div className="hidden md:block absolute top-40 left-90 w-16 h-16 border-t border-l border-[#C78665]/40 z-10" />
        <div className="hidden md:block absolute bottom-50 right-80 w-16 h-16 border-b border-r border-[#C78665]/40 z-10" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-24 flex items-center justify-center">

          {/* Centered Content */}
          <div className="w-full max-w-2xl text-center mx-auto">

            {/* Small Top Label */}
            <p className="font-josefin text-[#C78665] tracking-[.4em] text-[10px] sm:text-[11px] uppercase mb-5">
              Discover Our Flavours · Crafted With Passion
            </p>

            {/* Main Heading */}
            <h1
              className="font-cormorant font-light text-[#F4EDE6] leading-[1.05] mb-6"
              style={{ fontSize: "clamp(36px, 7vw, 70px)" }}
            >
              Experience Our<br />
              <em className="text-[#C78665]">Signature Menu</em>
            </h1>

            {/* Divider Line */}
            <div className="h-px bg-[#C78665] w-24 mb-6 mx-auto" />

            {/* Description */}
            <p className="font-josefin text-[#C4A882] text-sm font-light leading-relaxed max-w-md mb-10 mx-auto">
              From handcrafted beverages to globally inspired delicacies,
              every dish on our menu is thoughtfully prepared using premium ingredients.
              Indulge in flavors designed to create unforgettable moments.
            </p>

            {/* Buttons */}
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
      <section className="bg-[#f4efe9]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* Section Title */}
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#4b2e2e]">
        Our Special Menu
      </h2>
      <p className="text-gray-500 mt-2 md:mt-3 text-sm sm:text-base">
        Taste the perfection crafted by our chefs
      </p>
    </div>

    {/* Tabs — SAME FUNCTIONALITY */}
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-10 md:mb-16">
      {["food", "drink", "dessert"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full capitalize font-semibold transition-all duration-300 text-sm sm:text-base
            ${activeTab === tab
              ? "bg-[#C78665] text-white shadow-md"
              : "bg-white text-[#4b2e2e] border border-[#C78665]"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Main Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">

      {/* MENU LIST */}
      <motion.div
        key={activeTab + "-content"}
        variants={slideLeft}
        initial="hidden"
        animate="visible"
         className={`${
              activeTab === "drink" ? "order-2 md:order-1" : ""
            }`}
      >
        {menuData[activeTab].map((item, index) => (
          <div key={index} className="flex items-start mb-6 md:mb-8">
            <img
              src={item.image}
              alt="item"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shadow flex-shrink-0"
            />

            <div className="flex-1 min-w-0 ml-2 sm:ml-3">
              {/* Name + Price */}
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-semibold text-[#3a2a2a] text-base sm:text-lg truncate">
                  {item.name}
                </h4>

                <p className="text-[#C78665] font-semibold text-sm sm:text-base whitespace-nowrap">
                  {item.price}
                </p>
              </div>

              {/* Description + Tag */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm text-gray-500 pr-2">
                  {item.description}
                </p>

                <span className="text-[10px] sm:text-xs border border-[#C78665] 
                  text-[#C78665] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                  {item.tag}
                </span>
              </div>

              <div className="border-b border-dotted border-gray-300 mt-3 sm:mt-4"></div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* IMAGE */}
      <motion.div
        key={activeTab + "-image"}
        variants={slideRight}
        initial="hidden"
        animate="visible"
        className={`flex justify-center order-1 lg:order-none mb-6 lg:mb-6 
          ${activeTab === "drink" ? "lg:order-1" : "lg:order-2 lg:justify-end"}`}
      >
        <div className="w-[280px] sm:w-[350px] md:w-[380px] lg:w-[420px] 
          h-[350px] sm:h-[400px] md:h-[450px] lg:h-[470px] 
          overflow-hidden rounded-t-full rounded-b-2xl sm:rounded-b-3xl shadow-xl md:shadow-2xl">
          <img
            src={getImage()}
            alt="menu"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

    </div>
  </div>
</section>

      <section className="bg-[#140A06] py-16 md:py-20 lg:py-24 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

    {/* Left: Image with decorative frame */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative flex justify-center order-1 lg:order-none"
    >
      <div className="relative w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[480px]">
        {/* Decorative border offset */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-full h-full border border-[#C78665]/30 rounded-2xl z-0" />
        <img
          src={chefImg}
          alt="Chef crafting food"
          className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
        />
        {/* Floating badge */}
        <div className="absolute -bottom-4 sm:-bottom-5 -right-4 sm:-right-5 z-20 bg-[#C78665] text-[#140A06] rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center shadow-xl">
          <span className="font-cormorant font-bold text-xl sm:text-2xl leading-none">15+</span>
          <span className="font-josefin text-[8px] sm:text-[9px] tracking-widest uppercase text-center leading-tight">Years of<br />Craft</span>
        </div>
      </div>
    </motion.div>

    {/* Right: Text + Feature Cards */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="order-2 lg:order-none"
    >
      <p className="font-josefin text-[#C78665] tracking-[.4em] text-[9px] sm:text-[10px] uppercase mb-3 sm:mb-4">
        Our Promise · Every Plate
      </p>
      <h2
        className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-3 sm:mb-4"
        style={{ fontSize: "clamp(28px, 5vw, 52px)" }}
      >
        Crafted With<br />
        <em className="text-[#C78665]">Love & Precision</em>
      </h2>
      <div className="h-px bg-[#C78665]/40 w-16 sm:w-20 mb-4 sm:mb-6" />
      <p className="font-josefin text-[#C4A882] text-xs sm:text-sm font-light leading-relaxed mb-8 sm:mb-10">
        Every dish that leaves our kitchen carries the dedication of our chefs,
        the freshness of hand-picked ingredients, and decades of culinary expertise
        passed down through tradition.
      </p>

      {/* Feature list */}
      {[
        { icon: "🌿", title: "Farm-Fresh Ingredients", desc: "Sourced daily from local farms for unmatched freshness." },
        { icon: "👨‍🍳", title: "Master Chef Recipes", desc: "Signature recipes developed by award-winning chefs." },
        { icon: "🔥", title: "Handcrafted Every Day", desc: "No pre-made shortcuts — everything made fresh to order." },
        { icon: "✨", title: "Plated With Artistry", desc: "Presented beautifully, because dining is an experience." },
      ].map((feat, i) => (
        <div key={i} className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#C78665]/10 border border-[#C78665]/30 flex items-center justify-center text-base sm:text-lg flex-shrink-0">
            {feat.icon}
          </div>
          <div>
            <h4 className="font-josefin text-[#F4EDE6] text-xs sm:text-sm font-semibold tracking-wide">{feat.title}</h4>
            <p className="font-josefin text-[#C4A882] text-[11px] sm:text-xs font-light mt-1 leading-relaxed">{feat.desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
</section>

{/* ===== WEEKLY SPECIALS SECTION ===== */}
<section className="bg-[#f4efe9] py-16 md:py-20 lg:py-24 overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-10 md:mb-14"
    >
      <p className="font-josefin text-[#C78665] tracking-[.4em] text-[9px] sm:text-[10px] uppercase mb-2 sm:mb-3">
        Rotating Daily · Fresh Every Week
      </p>
      <h2
        className="font-cormorant font-light text-[#140A06] leading-tight"
        style={{ fontSize: "clamp(26px, 5vw, 50px)" }}
      >
        Chef's <em className="text-[#C78665]">Weekly Specials</em>
      </h2>
      <div className="h-px bg-[#C78665] w-16 sm:w-20 mx-auto mt-4 sm:mt-5" />
    </motion.div>

    {/* Slider Viewport */}
    <div className="overflow-hidden relative">
      <motion.div
        className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragStart={() => {
          setIsDragging(true);
          stopAutoPlay();
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * CARD_WIDTH }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {weeklySpecials.map((item, i) => (
          <motion.div
            key={i}
            className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl overflow-hidden shadow-lg group flex-shrink-0 border border-[#C78665]/10 select-none"
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(199,134,101,0.18)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden pointer-events-none">
              <img
                src={item.image}
                alt={item.dish}
                draggable="false"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute top-2 sm:top-3 left-2 sm:left-3 font-josefin text-[8px] sm:text-[9px] tracking-widest uppercase bg-[#C78665] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {item.day}
              </span>
              <span className="absolute top-2 sm:top-3 right-2 sm:right-3 font-josefin text-[8px] sm:text-[9px] tracking-widest uppercase bg-white/90 text-[#C78665] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#C78665]/30">
                {item.badge}
              </span>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5">
              <h4 className="font-cormorant text-[#3a2a2a] text-lg sm:text-xl font-semibold leading-tight mb-1">
                {item.dish}
              </h4>
              <p className="font-josefin text-gray-400 text-[11px] sm:text-xs font-light mb-3 sm:mb-4 leading-relaxed">
                {item.note}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-cormorant text-[#C78665] text-xl sm:text-2xl font-bold">
                  {item.price}
                </span>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  className="font-josefin text-[8px] sm:text-[9px] tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#C78665] text-[#C78665] hover:bg-[#C78665] hover:text-white transition-all duration-300"
                >
                  Order
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Dot Indicators */}
    <div className="flex justify-center gap-2 mt-6 sm:mt-8 md:mt-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            stopAutoPlay();
            setCurrentIndex(Math.round(i * (weeklySpecials.length / 4)));
            startAutoPlay();
          }}
          className={`transition-all duration-300 rounded-full ${
            Math.min(Math.floor(currentIndex / (weeklySpecials.length / 4)), 3) === i
              ? "w-5 sm:w-6 h-1.5 sm:h-2 bg-[#C78665]"
              : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#C78665]/30"
          }`}
        />
      ))}
    </div>
  </div>
</section>

    </>
  );
}

export default Menu;