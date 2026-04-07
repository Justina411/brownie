import React, { useEffect, useState } from "react";

// Import all 15 bag images
import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag5 from "../assets/bag5.jpg";
import bag6 from "../assets/bag6.jpg";
import bag7 from "../assets/bag7.jpg";
import bag8 from "../assets/bag8.jpg";
import bag9 from "../assets/bag9.jpg";
import bag10 from "../assets/bag10.jpg";
import bag11 from "../assets/bag11.jpg";
import bag12 from "../assets/bag12.jpg";
import bag13 from "../assets/bag13.jpg";
import bag14 from "../assets/bag14.jpg";
import bag15 from "../assets/bag15.jpg";
import bag16 from "../assets/bag16.jpg";
import { AiFillHeart } from "react-icons/ai";

const images = [
  bag1, bag2, bag3, bag4, bag5,
  bag6, bag7, bag8, bag9, bag10,
  bag11, bag12, bag13, bag14, bag15, bag16
];

const Collection = () => {
  const [bagsData, setBagsData] = useState([]);
  const [favorites, setFavorites] = useState([]); // track favorited bag indices

  useEffect(() => {
    fetch("/collection.json")
      .then((res) => res.json())
      .then((data) => setBagsData(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (index) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // remove if already favorite
        : [...prev, index] // add if not favorite
    );
  };

  return (
    <>
    

      {/* COLLECTION GRID */}
      <section className="p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bagsData.map((bag, index) => (
          <div
            key={index}
            className="bg-[#f5f5f5] rounded-xl p-4 relative shadow-md hover:shadow-lg transition"
          >
            {/* Bag Image */}
            <img
              src={images[index]}
              alt={bag.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            {/* Clickable Love Button */}
            <button
              onClick={() => toggleFavorite(index)}
              className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border transition transform hover:scale-110`}
              style={{
                borderColor: favorites.includes(index) ? "brown" : "black",
                backgroundColor: favorites.includes(index) ? "brown" : "white",
                color: favorites.includes(index) ? "white" : "black",
              }}
            >
             <AiFillHeart/>
            </button>

            {/* Name & Price */}
            <div className="mt-4 flex flex-col gap-1">
              <h3 className="font-semibold text-lg">{bag.name}</h3>
              <p className="text-gray-700">{bag.price}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="bg-[#e6ded3] h-12 overflow-hidden flex items-center">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{
            animation: "scrollX 25s linear infinite"
          }}
        >
          <span className="text-sm font-medium">Luxury Redefined</span>
          <span className="text-sm font-medium">Timeless Elegance</span>
          <span className="text-sm font-medium">Crafted for Confidence</span>
          <span className="text-sm font-medium">Premium Quality Bags</span>
          <span className="text-sm font-medium">Elegance in Every Detail</span>

          <span className="text-sm font-medium">Luxury Redefined</span>
          <span className="text-sm font-medium">Timeless Elegance</span>
          <span className="text-sm font-medium">Crafted for Confidence</span>
          <span className="text-sm font-medium">Premium Quality Bags</span>
          <span className="text-sm font-medium">Elegance in Every Detail</span>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollX {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </>
  );
};

export default Collection;