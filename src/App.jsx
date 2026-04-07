import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* First landing page */}
        <Route path="/" element={<Hero />} />
        {/* Other pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;