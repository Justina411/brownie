import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./pages/About"; // Make sure this import exists!
import Collection from "./pages/Collection";
import Shop from "./pages/Shop";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} /> {/* RE-ADDED THIS LINE */}
        <Route path="/collection" element={<Collection />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;