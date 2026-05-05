import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const name = data.name || "Signature Brownie";
  const price = data.price || "$280.00";
  const image = data.image || "/bag1.jpg";

  const [selectedSize, setSelectedSize] = useState("Medium");
  const [displayPrice, setDisplayPrice] = useState(price);
  const [cartCount, setCartCount] = useState(0);

  // ✅ PRICE CALCULATION
  useEffect(() => {
    const basePrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

    let newPrice = basePrice;

    if (selectedSize === "Mini") newPrice = basePrice * 0.8;
    if (selectedSize === "Large") newPrice = basePrice * 1.3;

    setDisplayPrice(`$${newPrice.toFixed(2)}`);
  }, [selectedSize, price]);

  // ✅ CART COUNT
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(savedCart.length);
  }, []);

  // ✅ ADD TO CART
  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("userSession") === "active";

    const product = {
      name,
      price: displayPrice,
      image,
      selectedSize,
      quantity: 1,
      refId: Date.now(),
    };

    if (!isLoggedIn) {
      localStorage.setItem("pendingBag", JSON.stringify(product));
      alert("Please log in to continue.");
      navigate("/Signin");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);

    alert(`${name} (${selectedSize}) added to cart at ${displayPrice}!`);
  };

  return (
    <div className="min-h-screen bg-white text-[#1a0f0d] py-12 px-6 md:px-20">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-400 hover:text-black"
        >
          <FaArrowLeft /> Back
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="relative p-3 bg-zinc-50 rounded-full border"
        >
          <FaShoppingCart size={22} className="text-amber-800" />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div className="bg-[#f6f6f6] rounded-[40px] p-10 flex justify-center">
          <img src={image} alt={name} className="max-h-[500px] object-contain" />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col pt-4">

          <h1 className="text-5xl font-black mb-4 uppercase tracking-tight">
            {name}
          </h1>

          <div className="text-4xl font-bold mb-10 text-amber-800">
            {displayPrice}
          </div>

          {/* SIZE */}
          <div className="mb-12">
            <p className="text-xs font-bold uppercase text-zinc-400 mb-5">
              Select Size
            </p>

            <div className="grid grid-cols-3 gap-3">
              {["Mini", "Medium", "Large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-4 rounded-xl border-2 text-xs font-bold uppercase transition ${
                    selectedSize === s
                      ? "border-amber-800 bg-amber-800 text-white"
                      : "border-zinc-200 text-zinc-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-amber-800 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest flex justify-center items-center gap-3"
          >
            <FaShoppingBag /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;