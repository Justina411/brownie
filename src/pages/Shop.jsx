import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import defaultBag from "../../public/bag1.jpg";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, price, image } = location.state || {
    name: "Signature Brownie",
    price: "$280.00",
    image: defaultBag
  }; 
  
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [displayPrice, setDisplayPrice] = useState(price);
  const [cartCount, setCartCount] = useState(0);

  // LOGIC: Calculate price based on size
  useEffect(() => {
    // Strip the "$" and convert to number
    const basePrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    let newPrice = basePrice;

    if (selectedSize === 'Mini') {
      newPrice = basePrice * 0.8; // 20% cheaper
    } else if (selectedSize === 'Large') {
      newPrice = basePrice * 1.3; // 30% more expensive
    }

    setDisplayPrice(`$${newPrice.toFixed(2)}`);
  }, [selectedSize, price]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(savedCart.length);
  }, []);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("userSession") === "active";

    if (isLoggedIn) {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = [...currentCart, { 
        name, 
        price: displayPrice, // Now sends the dynamic price
        image, 
        selectedSize, 
        quantity: 1, 
        refId: Date.now() 
      }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(updatedCart.length);
      alert(`${name} (${selectedSize}) added to cart at ${displayPrice}!`);
    } else {
      localStorage.setItem("pendingBag", JSON.stringify({ name, price: displayPrice, image }));
      alert("Please log in to add items to your cart.");
      navigate("/Signin");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a0f0d] font-sans py-12 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-black">
          <FaArrowLeft /> Back
        </button>
        <button onClick={() => navigate("/cart")} className="relative p-3 bg-zinc-50 rounded-full border border-zinc-100">
          <FaShoppingCart size={22} className="text-amber-800" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white">{cartCount}</span>}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-[#f6f6f6] rounded-[40px] p-10 flex justify-center items-center">
            <img src={image} alt={name} className="max-h-125 object-contain" />
        </div>
        <div className="flex flex-col pt-4">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">{name}</h1>
          {/* PRICE UPDATES HERE */}
          <div className="text-4xl font-bold mb-10 text-amber-800">{displayPrice}</div>
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-5">Select Size</p>
            <div className="grid grid-cols-3 gap-3">
              {['Mini', 'Medium', 'Large'].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setSelectedSize(s)} 
                  className={`py-4 rounded-xl border-2 font-black text-xs uppercase transition-all ${selectedSize === s ? 'border-amber-800 bg-amber-800 text-white' : 'border-zinc-100 text-zinc-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleAddToCart} className="w-full bg-amber-800 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex justify-center items-center gap-3 shadow-xl active:scale-95 transition-all">
            <FaShoppingBag /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;