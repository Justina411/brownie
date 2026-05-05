import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const images = [
  "/bag1.jpg",
  "/bag2.jpg",
  "/bag3.jpg",
  "/bag4.jpg",
  "/bag5.jpg",
  "/bag6.jpg",
  "/bag7.jpg",
  "/bag8.jpg",
  "/bag9.jpg",
  "/bag10.jpg",
  "/bag11.jpg",
  "/bag12.jpg",
  "/bag13.jpg",
  "/bag14.jpg",
  "/bag15.jpg",
  "/bag16.jpg",
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
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleBagClick = (bag, index) => {
    navigate("/shop", {
      state: {
        name: bag.name,
        price: bag.price,
        image: images[index],
      },
    });
  };

  return (
    <>
      {/* COLLECTION GRID */}
      <section className="p-4 sm:p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bagsData.map((bag, index) => (
          <div
            key={index}
            onClick={() => handleBagClick(bag, index)}
            className="bg-[#f5f5f5] rounded-xl p-4 relative shadow-md hover:shadow-lg transition cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={images[index]}
              alt={bag.name}
              className="w-full h-64 sm:h-56 object-cover rounded-lg"
            />

            {/* HEART */}
            <button
              onClick={(e) => toggleFavorite(e, index)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border transition transform hover:scale-110 shadow-sm"
              style={{
                borderColor: favorites.includes(index)
                  ? "brown"
                  : "transparent",
                backgroundColor: favorites.includes(index)
                  ? "brown"
                  : "rgba(255,255,255,0.8)",
                color: favorites.includes(index) ? "white" : "black",
              }}
            >
              <AiFillHeart size={20} />
            </button>

            {/* TEXT */}
            <div className="mt-4 flex flex-col gap-1">
              <h3 className="font-semibold text-lg">{bag.name}</h3>
              <p className="text-gray-700 font-medium">{bag.price}</p>
            </div>
          </div>
        ))}
      </section>

      {/* MARQUEE */}
      <div className="bg-[#e6ded3] h-12 overflow-hidden flex items-center">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "scrollX 25s linear infinite" }}
        >
          <span>Luxury Redefined</span>
          <span>Timeless Elegance</span>
          <span>Crafted for Confidence</span>
          <span>Premium Quality Bags</span>
          <span>Elegance in Every Detail</span>
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