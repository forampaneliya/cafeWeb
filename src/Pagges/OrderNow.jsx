import React, { useState, useEffect } from "react";
import {
  ShoppingCart, Heart, X, Plus, Minus, Star, ChevronDown,
  Search, Filter, Flame, Leaf, Award, Clock, Trash2, ShoppingBag, Check
} from "lucide-react";

/* ═══════════════════ DATA ═══════════════════ */
const categories = ["All", "Starters", "Mains", "Pasta & Pizza", "Desserts", "Beverages"];

const menuItems = [
  // Starters
  { id: 1, name: "Bruschetta al Pomodoro", cuisine: "Italian", category: "Starters", price: 12, rating: 4.8, time: "8 min", country: "🇮🇹", badge: "Chef's Pick", badgeType: "award", desc: "Toasted sourdough with heirloom tomatoes, basil & aged balsamic", tags: ["Veg"], img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80" },
  { id: 2, name: "Salmon Tataki", cuisine: "Japanese", category: "Starters", price: 18, rating: 4.9, time: "10 min", country: "🇯🇵", badge: "Bestseller", badgeType: "flame", desc: "Seared salmon with ponzu, micro herbs & sesame oil", tags: [], img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80" },
  { id: 3, name: "Mezze Platter", cuisine: "Mediterranean", category: "Starters", price: 22, rating: 4.7, time: "6 min", country: "🇬🇷", badge: "Popular", badgeType: "flame", desc: "Hummus, baba ganoush, olives, pita & seasonal dips", tags: ["Veg"], img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
  { id: 4, name: "Samosa Chaat", cuisine: "Indian", category: "Starters", price: 10, rating: 4.6, time: "7 min", country: "🇮🇳", badge: null, desc: "Crispy samosas with tamarind chutney, yogurt & pomegranate", tags: ["Veg", "Spicy"], img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },

  // Mains
  { id: 5, name: "Butter Chicken", cuisine: "Indian", category: "Mains", price: 24, rating: 4.9, time: "20 min", country: "🇮🇳", badge: "Bestseller", badgeType: "flame", desc: "Slow-cooked chicken in rich tomato-cream sauce, served with naan", tags: ["Spicy"], img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
  { id: 6, name: "Coq au Vin", cuisine: "French", category: "Mains", price: 32, rating: 4.8, time: "25 min", country: "🇫🇷", badge: "Chef's Pick", badgeType: "award", desc: "Braised chicken with burgundy wine, mushrooms & pearl onions", tags: [], img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80" },
  { id: 7, name: "Wagyu Steak", cuisine: "Japanese", category: "Mains", price: 68, rating: 5.0, time: "18 min", country: "🇯🇵", badge: "Premium", badgeType: "award", desc: "A5 Wagyu sirloin with truffle butter & seasonal vegetables", tags: [], img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80" },
  { id: 8, name: "Enchiladas Verdes", cuisine: "Mexican", category: "Mains", price: 20, rating: 4.6, time: "15 min", country: "🇲🇽", badge: null, desc: "Corn tortillas with chicken, tomatillo salsa & crema", tags: ["Spicy"], img: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&q=80" },

  // Pasta & Pizza
  { id: 9, name: "Truffle Tagliatelle", cuisine: "Italian", category: "Pasta & Pizza", price: 28, rating: 4.9, time: "15 min", country: "🇮🇹", badge: "Chef's Pick", badgeType: "award", desc: "Fresh egg pasta with black truffle, parmesan & brown butter", tags: ["Veg"], img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
  { id: 10, name: "Margherita Pizza", cuisine: "Italian", category: "Pasta & Pizza", price: 18, rating: 4.7, time: "12 min", country: "🇮🇹", badge: "Bestseller", badgeType: "flame", desc: "San Marzano tomato, buffalo mozzarella & fresh basil", tags: ["Veg"], img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
  { id: 11, name: "Seafood Risotto", cuisine: "Italian", category: "Pasta & Pizza", price: 34, rating: 4.8, time: "22 min", country: "🇮🇹", badge: null, desc: "Carnaroli rice with scallops, prawns & saffron bisque", tags: [], img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80" },

  // Desserts
  { id: 12, name: "Crème Brûlée", cuisine: "French", category: "Desserts", price: 12, rating: 4.9, time: "5 min", country: "🇫🇷", badge: "Bestseller", badgeType: "flame", desc: "Classic vanilla custard with caramelized sugar crust", tags: ["Veg"], img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80" },
  { id: 13, name: "Mango Kulfi", cuisine: "Indian", category: "Desserts", price: 9, rating: 4.7, time: "3 min", country: "🇮🇳", badge: null, desc: "Frozen Indian ice cream with alphonso mango & pistachio", tags: ["Veg"], img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
  { id: 14, name: "Tiramisu", cuisine: "Italian", category: "Desserts", price: 14, rating: 4.8, time: "4 min", country: "🇮🇹", badge: "Chef's Pick", badgeType: "award", desc: "Espresso-soaked ladyfingers with mascarpone cream", tags: ["Veg"], img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },

  // Beverages
  { id: 15, name: "Matcha Latte", cuisine: "Japanese", category: "Beverages", price: 7, rating: 4.8, time: "5 min", country: "🇯🇵", badge: "Popular", badgeType: "flame", desc: "Ceremonial grade matcha with oat milk & honey", tags: ["Veg"], img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80" },
  { id: 16, name: "Mango Lassi", cuisine: "Indian", category: "Beverages", price: 6, rating: 4.7, time: "4 min", country: "🇮🇳", badge: null, desc: "Chilled yogurt drink with Alphonso mango & cardamom", tags: ["Veg"], img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80" },
  { id: 17, name: "Café de Flore", cuisine: "French", category: "Beverages", price: 8, rating: 4.9, time: "6 min", country: "🇫🇷", badge: "Chef's Pick", badgeType: "award", desc: "Double espresso with lavender foam & vanilla syrup", tags: ["Veg"], img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
];

/* ═══════════════════ HELPERS ═══════════════════ */
const BadgeIcon = ({ type }) => {
  if (type === "flame") return <Flame size={10} className="text-orange-400" />;
  if (type === "award") return <Award size={10} className="text-yellow-400" />;
  return null;
};

/* ═══════════════════ COMPONENT ═══════════════════ */
export default function OrderNow() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [filterVeg, setFilterVeg] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`${item.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  };

  const toggleFav = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) { showToast(`Removed from favourites`); return prev.filter(f => f.id !== item.id); }
      showToast(`Added to favourites ❤️`);
      return [...prev, item];
    });
  };

  const isFav = (id) => favorites.some(f => f.id === id);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchVeg = !filterVeg || item.tags.includes("Veg");
    return matchCat && matchSearch && matchVeg;
  });

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .font-josefin   { font-family: 'Josefin Sans', sans-serif !important; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
        @keyframes toastIn { 0%{opacity:0;transform:translateY(20px)} 15%{opacity:1;transform:translateY(0)} 85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
        @keyframes heartPop { 0%{transform:scale(1)} 40%{transform:scale(1.4)} 70%{transform:scale(.85)} 100%{transform:scale(1)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .anim-up { animation: fadeUp .65s ease both; }
        .cart-panel { animation: slideRight .35s cubic-bezier(.25,.46,.45,.94) both; }
        .toast { animation: toastIn 2.2s ease forwards; }
        .heart-pop { animation: heartPop .4s ease; }

        .card-hover { transition: all .3s cubic-bezier(.25,.46,.45,.94); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,.18); }

        .dark-card-hover:hover { box-shadow: 0 24px 60px rgba(0,0,0,.65); transform: translateY(-6px); }

        .search-glow:focus { box-shadow: 0 0 0 3px rgba(199,134,101,.2); }
        .pill-active { background: #C78665; color: #140A06; font-weight: 600; }

        .cart-scrollbar::-webkit-scrollbar { width: 4px; }
        .cart-scrollbar::-webkit-scrollbar-track { background: #1a0f09; }
        .cart-scrollbar::-webkit-scrollbar-thumb { background: #C78665; border-radius: 4px; }
        html { scroll-padding-top: 160px; }
      `}</style>

      {/* ── TOAST ── */}
      {toastMsg && (
        <div className="toast fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#C78665] text-[#140A06] font-josefin text-xs tracking-widest uppercase px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
          <Check size={13} /> {toastMsg}
        </div>
      )}

      {/* ── CART PANEL ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="cart-panel w-full max-w-md bg-[#0A0502] border-l border-[#2A1A10] flex flex-col h-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-[#2A1A10]">
              <div>
                <p className="font-josefin text-[10px] tracking-[.3em] text-[#C78665] uppercase mb-1">Your Order</p>
                <h2 className="font-cormorant text-[#F4EDE6] text-2xl font-light">{cartCount} {cartCount === 1 ? "Item" : "Items"}</h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full border border-[#C78665]/30 bg-[#C78665]/10 flex items-center justify-center text-[#C78665] hover:bg-[#C78665]/20 transition-colors">
                <X size={15} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto cart-scrollbar px-7 py-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-50">
                  <ShoppingBag size={48} className="text-[#C78665]" strokeWidth={1} />
                  <p className="font-cormorant text-[#C4A882] text-xl italic">Your cart is empty</p>
                  <p className="font-josefin text-[#8A7060] text-[11px] tracking-wide">Add dishes to get started</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-[#140A06] rounded-xl p-3 border border-[#2A1A10]">
                  <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-[#F4EDE6] text-base leading-tight truncate">{item.name}</p>
                    <p className="font-josefin text-[#C78665] text-xs mt-1">${item.price} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 rounded-full border border-[#C78665]/40 text-[#C78665] flex items-center justify-center hover:bg-[#C78665]/20 transition-colors">
                        <Minus size={10} />
                      </button>
                      <span className="font-josefin text-[#F4EDE6] text-sm w-5 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 rounded-full border border-[#C78665]/40 text-[#C78665] flex items-center justify-center hover:bg-[#C78665]/20 transition-colors">
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-cormorant text-[#C78665] text-lg">${(item.price * item.qty).toFixed(0)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#8A7060] hover:text-red-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-7 py-6 border-t border-[#2A1A10] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-josefin text-[#8A7060] text-xs tracking-widest uppercase">Subtotal</span>
                  <span className="font-cormorant text-[#F4EDE6] text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-josefin text-[#8A7060] text-xs tracking-widest uppercase">Tax (5%)</span>
                  <span className="font-josefin text-[#8A7060] text-sm">${(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="h-px bg-[#2A1A10]" />
                <div className="flex justify-between items-center">
                  <span className="font-josefin text-[#C4A882] text-xs tracking-widest uppercase">Total</span>
                  <span className="font-cormorant text-[#C78665] text-3xl">${(cartTotal * 1.05).toFixed(2)}</span>
                </div>
                <button className="w-full py-4 rounded-full bg-[#C78665] text-[#140A06] font-josefin text-xs font-semibold tracking-[.2em] uppercase hover:opacity-85 transition-all active:scale-95">
                  Place Order
                </button>
                <button onClick={() => setCartOpen(false)} className="w-full py-3 rounded-full border border-[#C78665]/30 text-[#C4A882] font-josefin text-xs tracking-widest uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all">
                  Continue Ordering
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━ 1. HERO [DARK] ━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0A0502]">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          alt="Fine dining"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0502]/60 via-[#0A0502]/40 to-[#0A0502]" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto anim-up">
          <p className="font-josefin text-[#C78665] tracking-[.4em] text-[11px] uppercase mb-5">
            Dine In · Takeaway · Delivery
          </p>
          <h1 className="font-cormorant font-light text-[#F4EDE6] leading-tight mb-5"
            style={{ fontSize: "clamp(44px,8vw,80px)" }}>
            Order <em className="text-[#C78665]">Your</em><br />World
          </h1>
          <div className="mx-auto mb-6 h-px bg-[#C78665] max-w-[120px]" />
          <p className="font-josefin text-[#C4A882] text-sm font-light leading-relaxed max-w-md mx-auto">
            Curated dishes from across the globe — crafted with love, delivered with elegance.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 2. SEARCH + FILTERS [LIGHT] ━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-5 px-6 md:sticky md:top-[80px] z-30 shadow-md border-b border-[#E0D0C4]">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C78665]" />
              <input
                type="text"
                placeholder="Search dishes, cuisines…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-glow w-full pl-11 pr-5 py-3.5 rounded-full border border-[#E0D0C4] bg-white font-josefin text-[#2E1F18] text-sm placeholder:text-[#C4A882] outline-none transition-all"
              />
            </div>

            <button
              onClick={() => setFilterVeg(!filterVeg)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border font-josefin text-xs tracking-[.15em] uppercase transition-all ${filterVeg ? "bg-green-600 border-green-600 text-white" : "border-[#E0D0C4] bg-white text-[#8A7060] hover:border-[#C78665]"}`}
            >
              <Leaf size={13} /> Veg Only
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#C78665] text-[#140A06] font-josefin text-xs font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-all"
            >
              <ShoppingCart size={13} />
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-josefin text-[11px] tracking-[.15em] uppercase px-5 py-2.5 rounded-full transition-all border ${activeCategory === cat ? "pill-active border-[#C78665]" : "border-[#E0D0C4] text-[#8A7060] bg-white hover:border-[#C78665] hover:text-[#C78665]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 3. MENU GRID [DARK] ━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0A0502] py-20 px-6 scroll-mt-[160px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Our Menu</p>
            <h2 className="font-cormorant font-light text-[#F4EDE6]" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
              Crafted <em className="text-[#C78665]">Masterpieces</em>
            </h2>
            <p className="font-josefin text-[#8A7060] text-sm mt-3 font-light">
              {filtered.length} dishes available · {activeCategory === "All" ? "All cuisines" : activeCategory}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 opacity-50">
              <p className="font-cormorant text-[#C4A882] text-2xl italic">No dishes found</p>
              <p className="font-josefin text-[#8A7060] text-xs mt-2 tracking-wide">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  className="dark-card-hover group bg-[#140A06] border border-[#2A1A10] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      style={{ transform: "scale(1)", transition: "transform .5s cubic-bezier(.25,.46,.45,.94)" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140A06]/80 to-transparent" />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A0502]/80 backdrop-blur-sm border border-[#C78665]/30">
                        <BadgeIcon type={item.badgeType} />
                        <span className="font-josefin text-[9px] tracking-[.15em] uppercase text-[#C78665]">{item.badge}</span>
                      </div>
                    )}

                    {/* Fav Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFav(item); }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all border ${isFav(item.id) ? "bg-rose-500 border-rose-500" : "bg-[#0A0502]/70 border-[#C78665]/30 hover:border-rose-500"}`}
                    >
                      <Heart size={14} fill={isFav(item.id) ? "white" : "none"} className={isFav(item.id) ? "text-white" : "text-[#C78665]"} />
                    </button>

                    {/* Country + cuisine */}
                    <div className="absolute bottom-3 left-4">
                      <p className="font-josefin text-[10px] text-[#C78665] tracking-[.2em] uppercase">
                        {item.country} {item.cuisine}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-cormorant text-[#F4EDE6] text-xl font-light leading-tight flex-1 pr-2">
                        {item.name}
                      </h3>
                      <p className="font-cormorant text-[#C78665] text-2xl flex-shrink-0">${item.price}</p>
                    </div>

                    <p className="font-josefin text-[#8A7060] text-xs font-light leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {item.tags.map(tag => (
                        <span key={tag} className={`font-josefin text-[9px] tracking-[.15em] uppercase px-2 py-0.5 rounded-full border ${tag === "Veg" ? "border-green-700/50 text-green-500 bg-green-900/20" : "border-orange-700/50 text-orange-400 bg-orange-900/20"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta + Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star size={11} fill="#C78665" className="text-[#C78665]" />
                          <span className="font-josefin text-[#C4A882] text-xs">{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#8A7060]">
                          <Clock size={11} />
                          <span className="font-josefin text-xs">{item.time}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C78665] text-[#140A06] font-josefin text-[10px] font-semibold tracking-[.15em] uppercase hover:opacity-85 transition-all active:scale-95"
                      >
                        <Plus size={11} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 4. FAVOURITES [LIGHT] ━━━━━━━━━━━━━━━━━ */}
      {favorites.length > 0 && (
        <section className="bg-[#F4EDE6] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
              <div>
                <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-3">Saved with Love</p>
                <h2 className="font-cormorant text-[#2E1F18] font-light" style={{ fontSize: "clamp(30px,4vw,52px)" }}>
                  Your <em className="text-[#C78665]">Favourites</em>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={14} fill="#C78665" className="text-[#C78665]" />
                <span className="font-josefin text-[#8A7060] text-sm">{favorites.length} saved dish{favorites.length > 1 ? "es" : ""}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {favorites.map((item, i) => (
                <div key={item.id} className="card-hover group rounded-2xl overflow-hidden border border-[#E0D0C4] bg-white shadow-sm">
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <button
                      onClick={() => toggleFav(item)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors"
                    >
                      <Heart size={12} fill="white" className="text-white" />
                    </button>
                    <p className="absolute bottom-3 left-3 font-josefin text-[10px] text-white tracking-[.2em] uppercase">
                      {item.country} {item.cuisine}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-cormorant text-[#2E1F18] text-lg font-light leading-tight">{item.name}</h3>
                      <span className="font-cormorant text-[#C78665] text-xl ml-2">${item.price}</span>
                    </div>
                    <p className="font-josefin text-[#8A7060] text-xs mb-3 font-light leading-relaxed line-clamp-2">{item.desc}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-2.5 rounded-full bg-[#2E1F18] text-[#F4EDE6] font-josefin text-[10px] tracking-[.15em] uppercase hover:bg-[#C78665] hover:text-[#140A06] transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart size={11} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━ 5. BANNER CTA [DARK] ━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=85"
          alt="Dining experience"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 55%" }}
        />
        <div className="absolute inset-0 bg-[#0A0502]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-6">
          <p className="font-josefin text-[#C78665] tracking-[.4em] text-[11px] uppercase">Experience It Tonight</p>
          <h2 className="font-cormorant font-light text-[#F4EDE6]" style={{ fontSize: "clamp(36px,5.5vw,70px)" }}>
            A Table Awaits <em className="text-[#C78665]">You</em>
          </h2>
          <div className="h-px bg-[#C78665] w-20" />
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="px-8 py-3.5 rounded-full bg-[#C78665] text-[#140A06] font-josefin text-xs font-semibold tracking-[.2em] uppercase hover:opacity-85 transition-all">
              Reserve a Table
            </button>
            <button className="px-8 py-3.5 rounded-full border border-[#C78665]/40 text-[#F4EDE6] font-josefin text-xs tracking-[.2em] uppercase hover:border-[#C78665] hover:text-[#C78665] transition-all">
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━ 6. HOW IT WORKS [LIGHT] ━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4EDE6] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-josefin text-[#C78665] tracking-[.35em] text-[11px] uppercase mb-4">Simple & Seamless</p>
          <h2 className="font-cormorant text-[#2E1F18] font-light mb-16" style={{ fontSize: "clamp(30px,4vw,52px)" }}>
            How It <em className="text-[#C78665]">Works</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: <Search size={24} className="text-[#C78665]" />, title: "Browse the Menu", desc: "Filter by cuisine, category, or dietary preference to find your perfect dish." },
              { step: "02", icon: <ShoppingCart size={24} className="text-[#C78665]" />, title: "Add to Cart", desc: "Select your favourites and build your perfect order with ease." },
              { step: "03", icon: <Check size={24} className="text-[#C78665]" />, title: "Place & Enjoy", desc: "Confirm your order and let us bring world-class flavours to your table." },
            ].map((step, i) => (
              <div key={i} className="card-hover group bg-white border border-[#E0D0C4] rounded-2xl p-8 text-center shadow-sm">
                <div className="relative mb-6">
                  <span className="font-cormorant text-[8rem] leading-none text-[#E8D8CC] absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                    {step.step}
                  </span>
                  <div className="relative w-14 h-14 rounded-full bg-[#F4EDE6] border border-[#E0D0C4] flex items-center justify-center mx-auto group-hover:border-[#C78665] transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-cormorant text-[#2E1F18] text-xl mb-2">{step.title}</h3>
                <p className="font-josefin text-[#8A7060] text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}