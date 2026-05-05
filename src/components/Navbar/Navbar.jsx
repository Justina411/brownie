import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const checkUser = () => {
    const session = localStorage.getItem("userSession");
    const name = localStorage.getItem("userName");

    if (session === "active" && name) {
      setIsLoggedIn(true);
      setUserName(name); // This now pulls the actual name
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkUser();

    // Listen for storage changes or manual auth events
    window.addEventListener("storage", checkUser);
    window.addEventListener("authChange", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("authChange", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    checkUser(); // Update UI immediately
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between p-6 bg-white shadow z-50">
      <h1 className="font-bold text-xl uppercase tracking-tighter">Brownie</h1>

      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <FaUserCircle size={20} />
              <span className="text-sm italic">Welcome, {userName}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/Signin")}
            className="bg-amber-800 text-white px-6 py-2 rounded font-bold"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;