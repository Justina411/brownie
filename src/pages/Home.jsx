import React from 'react';
import homebg from "../../public/Homebg.jpg"; // <-- fixed path

const Home = () => {
  return (
    <section
      className="relative min-h-[460px] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${homebg})` }}
    >
      <div className="absolute inset-0 bg-amber-900/70"></div>
      <div className="relative text-white ml-24 max-w-xl">
        <p className="text-sm tracking-widest uppercase">
          Redefining Modern Elegance
        </p>
        <h1 className="text-6xl font-serif mt-4 leading-tight">
          BROWNIE <br /> FORWARD
        </h1>
        <button className="mt-6 border border-white px-6 py-3 hover:bg-white hover:text-black transition">
          SHOP NOW →
        </button>
      </div>
    </section>
  );
}

export default Home;