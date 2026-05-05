import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const session = localStorage.getItem("userSession");
      const name = localStorage.getItem("userName");

      if (session === "active" && name) {
        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }

      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    };

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  return (
    <>
      <div className="h-20"></div>

      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-white shadow-sm z-100">
        <h1 className="text-2xl font-bold uppercase tracking-tighter text-[#1a0f0d]">
          Brownie
        </h1>

        <ul className="hidden md:flex gap-8 font-medium text-zinc-600">
          <li><Link to="/" className="hover:text-amber-700">Home</Link></li>
          <li><Link to="/collection" className="hover:text-amber-700">Collection</Link></li>
          <li><Link to="/about" className="hover:text-amber-700">About</Link></li>
        </ul>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => isLoggedIn && navigate("/cart")}
            disabled={!isLoggedIn}
            className={`relative ${
              isLoggedIn
                ? "text-zinc-600 hover:text-amber-800"
                : "text-zinc-400 opacity-50 cursor-not-allowed"
            }`}
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <span className="text-sm italic">Welcome, {userName}</span>
              <FaUserCircle size={24} />
            </div>
          ) : (
            <button
              onClick={() => navigate("/Signin")}
              className="bg-amber-800 text-white px-6 py-2 rounded-lg font-bold"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => isLoggedIn && navigate("/cart")}
            disabled={!isLoggedIn}
            className={`relative ${
              isLoggedIn
                ? "text-amber-800"
                : "text-zinc-400 opacity-50 cursor-not-allowed"
            }`}
          >
            <FaShoppingCart size={24} />
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-amber-800">
            {isOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-white z-110 flex flex-col items-center justify-center gap-8">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-3xl text-amber-800">
              <HiX />
            </button>

            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/collection" onClick={() => setIsOpen(false)}>Collection</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>

            {isLoggedIn ? (
              <div className="flex flex-col items-center gap-2 text-amber-800">
                <FaUserCircle size={48} />
                <span>Welcome, {userName}</span>
              </div>
            ) : (
              <button onClick={() => navigate("/Signin")} className="bg-amber-800 text-white px-8 py-3 rounded-lg">
                Log In
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;