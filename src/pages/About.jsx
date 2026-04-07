import React from "react";
import model1 from "../assets/model1.jpg";
import model2 from "../assets/model2.jpg";
import model3 from "../assets/model3.jpg";
import model4 from "../assets/model4.jpg";
import model5 from "../assets/model5.jpg";
import model6 from "../assets/model6.jpg";

const aboutData = [
  {
    title: "HERVE",
    text: "Brownie luxury bags combine timeless elegance with modern craftsmanship. Designed for confident women who appreciate quality and sophistication.",
    img: model1,
    img2: model2,
  },
  {
    title: "LOEUVRE",
    text: "Every piece is crafted with attention to detail, ensuring each bag is not just an accessory, but a statement of style and personality.",
    img: model3,
    img2: model4,
  },
  {
    title: "LE ABONNE",
    text: "From day-to-day elegance to special occasions, Brownie luxury bags accompany you with versatility, style, and lasting quality.",
    img: model5,
    img2: model6,
  },
];

const About = () => {
  return (
    <>
    <div className="bg-[#f5f5f5] min-h-screen py-16 px-8">
      <h1 className="text-4xl font-serif text-center mb-12">About Brownie</h1>

      <div className="flex flex-col gap-12">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className={`grid gap-6 items-center md:grid-cols-3 ${
              index % 2 !== 0 ? "md:grid-flow-col-dense" : ""
            }`}
          >
            {/* Images */}
            {index % 2 === 0 ? (
              <>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover rounded-xl shadow-md"
                />
                <img
                  src={item.img2}
                  alt={item.title}
                  className="w-full object-cover rounded-xl shadow-md"
                />
                {/* Text Box on right */}
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center max-w-md">
                  <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
                  <p className="text-gray-700">{item.text}</p>
                  <button className="mt-6 bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 w-32">
                    Shop Now
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Text Box on left */}
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center max-w-md">
                  <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
                  <p className="text-gray-700">{item.text}</p>
                  <button className="mt-6 bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 w-32">
                    Shop Now
                  </button>
                </div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover rounded-xl shadow-md"
                />
                <img
                  src={item.img2}
                  alt={item.title}
                  className="w-full object-cover rounded-xl shadow-md"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>

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

export default About;