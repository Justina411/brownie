import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow">

      {/* Logo */}
      <h1 className="text-2xl font-bold">Brownie</h1>

      {/* Nav Links */}
      <ul className="flex gap-8">
        <li>
          <Link to="/" className="cursor-pointer hover:text-amber-700">Home</Link>
        </li>
        <li>
          <Link to="/collection" className="cursor-pointer hover:text-amber-700">Collection</Link>
        </li>
        <li>
          <Link to="/about" className="cursor-pointer hover:text-amber-700">About</Link>
        </li>
      </ul>

      {/* Button */}
      <Link to="/shop">
        <button className="bg-amber-700 text-white px-5 py-2 rounded-lg hover:bg-amber-800">
          Shop Now
        </button>
      </Link>

    </nav>
  );
};

export default Navbar;