import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

// Import all 16 bag images
import bag1 from "../../public/bag1.jpg";
import bag2 from "../../public/bag2.jpg";
import bag3 from "../../public/bag3.jpg";
import bag4 from "../../public/bag4.jpg";
import bag5 from "../../public/bag5.jpg";
import bag6 from "../../public/bag6.jpg";
import bag7 from "../../public/bag7.jpg";
import bag8 from "../../public/bag8.jpg";
import bag9 from "../../public/bag9.jpg";
import bag10 from "../../public/bag10.jpg";
import bag11 from "../../public/bag11.jpg";
import bag12 from "../../public/bag12.jpg";
import bag13 from "../../public/bag13.jpg";
import bag14 from "../../public/bag14.jpg";
import bag15 from "../../public/bag15.jpg";
import bag16 from "../../public/bag16.jpg";

const images = [
  bag1, bag2, bag3, bag4, bag5,
  bag6, bag7, bag8, bag9, bag10,
  bag11, bag12, bag13, bag14, bag15, bag16
];

const Collection = () => {
  const [bagsData, setBagsData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/collection.json")
      .then((res) => res.json())
      .then((data) => setBagsData(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (e, index) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleBagClick = (bag, index) => {
    navigate('/shop', { 
      state: { 
        name: bag.name, 
        price: bag.price, 
        image: images[index] 
      } 
    });
  };

  return (
    <>
      {/* COLLECTION GRID - Updated with responsive padding */}
      <section className="p-4 sm:p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bagsData.map((bag, index) => (
          <div
            key={index}
            onClick={() => handleBagClick(bag, index)}
            className="bg-[#f5f5f5] rounded-xl p-4 relative shadow-md hover:shadow-lg transition cursor-pointer"
          >
            {/* Bag Image - Added h-64 for mobile to keep a nice aspect ratio */}
            <img
              src={images[index]}
              alt={bag.name}
              className="w-full h-64 sm:h-56 object-cover rounded-lg"
            />

            {/* Clickable Love Button */}
            <button
              onClick={(e) => toggleFavorite(e, index)}
              className={`absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border transition transform hover:scale-110 shadow-sm`}
              style={{
                borderColor: favorites.includes(index) ? "brown" : "transparent",
                backgroundColor: favorites.includes(index) ? "brown" : "rgba(255, 255, 255, 0.8)",
                color: favorites.includes(index) ? "white" : "black",
              }}
            >
              <AiFillHeart size={20}/>
            </button>

            {/* Name & Price */}
            <div className="mt-4 flex flex-col gap-1">
              <h3 className="font-semibold text-lg">{bag.name}</h3>
              <p className="text-gray-700 font-medium">{bag.price}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#e6ded3] h-12 overflow-hidden flex items-center">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "scrollX 25s linear infinite" }}
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