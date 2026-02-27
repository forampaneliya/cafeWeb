import React, { useState } from "react";
import foodImg from "../assets/images/13.jpg";
import drinkImg from "../assets/images/39.jpg";
import dessertImg from "../assets/images/37.jpg";
import bannerImg from "../assets/images/menubanner.png";
import pastaImg from "../assets/images/11.jpg";
import burgerImg from "../assets/images/22.jpg";
import pizzaImg from "../assets/images/25.jpg";
import garlicImg from "../assets/images/30.jpg";

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

  const slideLeft = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const slideRight = {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

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

      <section className="relative w-full h-full overflow-hidden ">

        {/* Background Image */}
        <img
          src={bannerImg}
          alt="Menu Banner"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 "></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4">
            Our Menu
          </h1>
          <div className="max-w-4xl mb-4">
            <p>Explore a carefully curated selection of dishes made with passion and precision. Whether you're craving something comforting or something indulgent, our menu offers a delightful experience crafted to satisfy every taste.</p>
          </div>

          <div className="flex items-center gap-2 text-sm md:text-base text-gray-200">
            <span className="hover:text-[#C78665] cursor-pointer transition">
              Home
            </span>
            <span>|</span>
            <span className="text-[#FCE779]">Menu</span>
          </div>
        </div>

        {/* Bottom Wave Shape */}

      </section>
      <section className=" bg-[#f4efe9] pb-8">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#4b2e2e]">
              Our Special Menu
            </h2>
            <p className="text-gray-500 mt-3">
              Taste the perfection crafted by our chefs
            </p>
          </div>

          {/* Tabs — SAME FUNCTIONALITY */}
          <div className="flex justify-center gap-6 mb-16">
            {["food", "drink", "dessert"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full capitalize font-semibold transition-all duration-300 
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
          {/* Main Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* MENU LIST */}
            <motion.div
              key={activeTab + "-content"}
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              className={`${activeTab === "drink" ? "lg:order-2" : "lg:order-1"
                }`}
            >
              {menuData[activeTab].map((item, index) => (
                <div key={index} className="flex items-start  mb-8">
                  <img
                    src={item.image}
                    alt="item"
                    className="w-16 h-16 rounded-full object-cover shadow"
                  />

                  <div className="flex-1">
                    {/* Name + Price */}
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-[#3a2a2a] text-lg ms-3">
                        {item.name}
                      </h4>

                      <p className="text-[#C78665] font-semibold">
                        {item.price}
                      </p>
                    </div>

                    {/* Description + Tag */}
                    <div className="flex justify-between items-center mt-2 ms-3">
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>

                      <span className="text-xs border border-[#C78665] 
                             text-[#C78665] px-3 py-1 rounded-full whitespace-nowrap">
                        {item.tag}
                      </span>
                    </div>

                    <div className="border-b border-dotted border-gray-300 mt-4"></div>
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
              className={`flex justify-center ${activeTab === "drink" ? "lg:order-1" : "lg:order-2 justify-end"
                }`}
            >
              <div className="w-[420px] h-[470px] overflow-hidden 
                    rounded-t-full rounded-b-3xl shadow-2xl">
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

    </>
  );
}

export default Menu;