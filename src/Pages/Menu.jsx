import React, { useState } from "react";
import foodImg from "../assets/images/13.jpg";
import drinkImg from "../assets/images/14.jpg";
import dessertImg from "../assets/images/23.jpg";
import bannerImg from "../assets/images/menubanner.png"; 

function Menu() {
  const [activeTab, setActiveTab] = useState("food");

  const menuData = {
    food: [
      { name: "Spicy Pasta", price: "$12", tag: "Popular" },
      { name: "Cheese Burger", price: "$10", tag: "Chef Special" },
      { name: "Veggie Pizza", price: "$14", tag: "Trending" },
      { name: "Garlic Bread", price: "$8", tag: "New" },
    ],
    drink: [
      { name: "Cold Coffee", price: "$6", tag: "Popular" },
      { name: "Mojito", price: "$7", tag: "Fresh" },
      { name: "Strawberry Shake", price: "$8", tag: "Trending" },
      { name: "Iced Tea", price: "$5", tag: "New" },
    ],
    dessert: [
      { name: "Chocolate Brownie", price: "$9", tag: "Hot" },
      { name: "Ice Cream Sundae", price: "$7", tag: "Popular" },
      { name: "Cheese Cake", price: "$11", tag: "Chef Special" },
      { name: "Waffles", price: "$8", tag: "Trending" },
    ],
  };

  const getImage = () => {
    if (activeTab === "food") return foodImg;
    if (activeTab === "drink") return drinkImg;
    return dessertImg;
  };

  return (

    <>

     <section className="relative w-full h-full overflow-hidden">
      
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

        <div className="flex items-center gap-2 text-sm md:text-base text-gray-200">
          <span className="hover:text-[#C78665] cursor-pointer transition">
            Home
          </span>
          <span>|</span>
          <span className="text-[#C78665]">Menu</span>
        </div>
      </div>

      {/* Bottom Wave Shape */}
     
    </section>
    <section className="py-16 bg-[#f9f5f0]">
      <div className="container mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#4b2e2e]">
            Our Special Menu
          </h2>
          <p className="text-gray-500 mt-3">
            Taste the perfection crafted by our chefs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-12">
          {["food", "drink", "dessert"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full capitalize font-semibold transition-all duration-300 
              ${
                activeTab === tab
                  ? "bg-[#C78665] text-white shadow-lg"
                  : "bg-white text-[#4b2e2e] border border-[#C78665]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            activeTab === "drink" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div
            className={`${
              activeTab === "drink" ? "order-1 md:order-2" : ""
            }`}
          >
            <img
              src={getImage()}
              alt="menu"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>

          {/* Menu List */}
          <div
            className={`${
              activeTab === "drink" ? "order-2 md:order-1" : ""
            }`}
          >
            {menuData[activeTab].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h4 className="text-lg font-semibold text-[#4b2e2e]">
                    {item.name}
                  </h4>
                  <span className="text-xs bg-[#C78665] text-white px-2 py-1 rounded-full mt-1 inline-block">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[#C78665] font-bold text-lg">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    </>
  );
}

export default Menu;