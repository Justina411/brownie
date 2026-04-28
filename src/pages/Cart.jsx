import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { RiVisaLine, RiMastercardFill } from "react-icons/ri";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(
      savedCart.map(item => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    );
  }, []);

  const updateStorage = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));

    // update navbar cart count instantly
    window.dispatchEvent(new Event("storage"));
  };

  const updateQuantity = (index, delta) => {
    const newItems = [...cartItems];
    const newQty = newItems[index].quantity + delta;

    if (newQty > 0) {
      newItems[index].quantity = newQty;
      updateStorage(newItems);
    }
  };

  const removeItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    updateStorage(newItems);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const priceStr = item.price
          ? String(item.price).replace(/[^0-9.]/g, "")
          : "0";
        return total + parseFloat(priceStr) * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (!cardNumber) {
      alert("Please enter your card number!");
      return;
    }

    alert("Payment Successful!");

    // clear cart
    localStorage.removeItem("cart");

    // log user out
    localStorage.removeItem("userSession");
    localStorage.removeItem("userName");

    // trigger navbar update instantly (same tab)
    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col lg:flex-row font-sans text-[#1a0f0d]">
      {/* LEFT SIDE */}
      <div className="flex-[1.8] p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center gap-4 mb-12">
            <div
              className="w-10 h-10 bg-[#1a0f0d] rounded-full flex items-center justify-center text-white font-black text-sm cursor-pointer"
              onClick={() => navigate("/")}
            >
              B
            </div>
            <div className="h-6 w-px bg-zinc-300"></div>
            <h1 className="text-xl font-bold uppercase tracking-tight text-zinc-500">
              Your Shopping Cart
            </h1>
          </header>

          <div className="space-y-2">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-6 border-b border-zinc-200"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-3 border border-zinc-100 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="font-black text-sm uppercase tracking-tighter">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">
                        Ref. 00{index + 1245}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 flex-1 justify-between text-[10px] font-black uppercase">
                    <p className="text-zinc-400">{item.selectedSize}</p>

                    <div className="flex items-center gap-4">
                      <span className="w-4 text-center">
                        {item.quantity}
                      </span>

                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="bg-zinc-200 rounded-full p-1 text-[8px] hover:bg-amber-800 hover:text-white"
                        >
                          <FaPlus />
                        </button>

                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="bg-zinc-200 rounded-full p-1 text-[8px] hover:bg-amber-800 hover:text-white"
                        >
                          <FaMinus />
                        </button>
                      </div>
                    </div>

                    <p className="w-24 text-right tracking-widest">
                      {item.price}
                    </p>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-zinc-300 hover:text-red-500 ml-4 transition-colors"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center font-bold uppercase text-zinc-400 tracking-widest">
                Cart is empty
              </div>
            )}
          </div>

          <div className="mt-20 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-[#1a0f0d]"
            >
              <FaArrowLeft size={10} /> Back to Shop
            </button>

            <div className="flex items-center gap-10">
              <span className="text-[10px] font-black uppercase text-zinc-400">
                Subtotal:
              </span>
              <span className="text-xl font-black tracking-widest text-amber-800">
                ${calculateTotal()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-[#1a0f0d] text-white p-12 md:p-16 flex flex-col shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-800 mb-16 uppercase tracking-tighter">
          Card Details
        </h2>

        <div className="space-y-12 grow">
          <div className="flex gap-8 items-center text-5xl">
            <RiMastercardFill className="text-[#eb001b]" />
            <RiVisaLine className="text-[#1a1f71] bg-white rounded-md px-1" />
          </div>

          <div className="border-b-2 border-amber-800/30 pb-4 focus-within:border-amber-800">
            <p className="text-[10px] font-black uppercase text-amber-800 mb-3 tracking-[0.2em]">
              Card Number
            </p>

            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter 16-digit card number"
              className="bg-transparent w-full outline-none text-lg tracking-widest placeholder:text-zinc-700 text-[#c69a7c]"
            />
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-amber-800 hover:bg-amber-900 text-white font-black py-8 uppercase tracking-[0.4em] mt-10"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;