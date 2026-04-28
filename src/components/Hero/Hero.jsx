import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import background from "../../assets/background.jpg";
import shipping from "../../assets/shipping.png";
import exclusive from "../../assets/Exclusive.png";
import packaging from "../../assets/packaging.png"; 
import quality from "../../assets/quality.png";
import model from "../../assets/model.jpg";
import bags from "../../assets/bags.jpg";
import bag1 from "../../assets/bag1.jpg";
import bag2 from "../../assets/bag2.jpg";
import bag3 from "../../assets/bag3.jpg";
import bag4 from "../../assets/bag4.jpg";
import bag5 from "../../assets/bag5.jpg";
import bag6 from "../../assets/bag6.jpg";
import bag7 from "../../assets/bag7.jpg";
import bag8 from "../../assets/bag8.jpg";
import bag9 from "../../assets/bag9.jpg";
import bag10 from "../../assets/bag10.jpg";
import bag11 from "../../assets/bag11.jpg";
import bag12 from "../../assets/bag12.jpg";
import bag13 from "../../assets/bag13.jpg";
import bag14 from "../../assets/bag14.jpg";
import bag15 from "../../assets/bag15.jpg";
import video from "../../assets/Bag video.mp4";

const baggs = [
  { img: bag1, name: "Luxury Bag", price: "$24.00" },
  { img: bag2, name: "Luxury Bag", price: "$24.00" },
  { img: bag3, name: "Luxury Bag", price: "$24.00" },
  { img: bag4, name: "Luxury Bag", price: "$24.00" },
  { img: bag5, name: "Luxury Bag", price: "$24.00" },
  { img: bag6, name: "Luxury Bag", price: "$24.00" },
  { img: bag7, name: "Luxury Bag", price: "$24.00" },
  { img: bag8, name: "Luxury Bag", price: "$24.00" },
  { img: bag9, name: "Luxury Bag", price: "$24.00" },
  { img: bag10, name: "Luxury Bag", price: "$24.00" },
  { img: bag11, name: "Luxury Bag", price: "$24.00" },
  { img: bag12, name: "Luxury Bag", price: "$24.00" },
  { img: bag13, name: "Luxury Bag", price: "$24.00" },
  { img: bag14, name: "Luxury Bag", price: "$24.00" },
  { img: bag15, name: "Luxury Bag", price: "$24.00" }
];

const Hero = () => {
  const [start, setStart] = useState(0);
  const [circleIndex, setCircleIndex] = useState(0);
  const navigate = useNavigate(); 

  // Updated to link to collection page
  const handleShopNowClick = () => {
    navigate("/collection");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCircleIndex((prevIndex) => (prevIndex + 1) % baggs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    if (start + 3 < baggs.length) setStart(start + 3);
  };

  const prev = () => {
    if (start - 3 >= 0) setStart(start - 3);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-[460px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-amber-900/70 pointer-events-none"></div>
        <div className="relative text-white px-6 md:ml-24 max-w-xl text-center md:text-left w-full">
          <p className="text-xs md:text-sm tracking-widest uppercase">Redefining Modern Elegance</p>
          <h1 className="text-4xl md:text-6xl font-serif mt-4 leading-tight">
            BROWNIE <br /> FORWARD
          </h1>
          <button 
            onClick={handleShopNowClick} 
            className="mt-6 border border-white px-6 py-3 hover:bg-amber-700 hover:text-white transition"
          >
            SHOP NOW 
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="p-6 md:p-12 bg-gray-100 text-white">
        <div className="flex flex-wrap justify-center md:justify-between gap-6">
          {[
            { img: shipping, title: "Free Shipping", text: "We offer free shipping to our customers" },
            { img: exclusive, title: "Exclusive Design", text: "We always have best designer bags" },
            { img: packaging, title: "Good Packaging", text: "We make sure your luxury bag is well packaged" },
            { img: quality, title: "Highest Quality", text: "We offer quality bags to our customers" }
          ].map((item, i) => (
            <div key={i} className="bg-amber-700 w-full sm:w-60 h-[200px] p-4 rounded-lg flex flex-col items-center text-center">
              <div
                className="bg-white rounded-tl-2xl w-20 h-20 bg-center bg-contain bg-no-repeat mb-4"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <h2 className="font-medium text-lg mb-2">{item.title}</h2>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REFINEMENT SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 md:py-20 gap-10">
        <div className="w-full md:w-80 h-72 md:h-96 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${model})` }}></div>
        <div className="text-center max-w-md px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">The Art of Radiant Refinement</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Brownie celebrates timeless luxury with bags crafted for the modern woman.
          </p>
          <button 
            onClick={() => navigate("/about")} 
            className="border-2 border-amber-800 text-amber-800 px-6 py-2 hover:bg-amber-800 hover:text-white transition rounded-2xl"
          >
            Learn More
          </button>
        </div>
        <div className="w-full md:w-80 h-72 md:h-96 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${bags})` }}></div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="bg-amber-900 py-12 md:py-20 px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 text-white">
        <div className="max-w-xs text-center md:text-left">
          <h1 className="text-3xl font-serif mb-4">Our Collection</h1>
          <p className="mb-6 opacity-80">Discover our finest luxury bags crafted with elegance...</p>
          <button 
            onClick={() => navigate("/about")} 
            className="bg-white border border-amber-800 px-4 py-2 text-black"
          >
            See More
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-full justify-center md:justify-start">
            <button onClick={prev} className="text-2xl md:text-3xl font-bold p-2">←</button>
            <div className="flex gap-2 sm:gap-4 md:gap-6">
              {baggs.slice(start, start + 3).map((bag, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-20 h-28 sm:w-32 sm:h-40 md:w-60 md:h-72 bg-cover bg-center rounded-2xl"
                    style={{ backgroundImage: `url(${bag.img})` }}
                  ></div>
                  <p className="mt-2 text-[10px] sm:text-xs md:text-base">{bag.name}</p>
                </div>
              ))}
            </div>
            <button onClick={next} className="text-2xl md:text-3xl font-bold p-2">→</button>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="bg-[#f5efe7] px-6 md:px-16 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-[480px] h-[200px] md:h-[280px] rounded-xl overflow-hidden shadow-lg">
          <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center text-center md:ml-12">
          <h2 className="text-xl md:text-2xl font-serif mb-2">Choose The Type!</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-xs">Discover refined styles designed to elevate every look...</p>
          <div className="flex gap-4 md:gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-cover bg-center shadow-md border-2 border-white"
                  style={{ backgroundImage: `url(${baggs[(circleIndex + i) % baggs.length].img})` }}
                ></div>
                <p className="text-xs md:text-sm mt-2">{["Pouch", "Satchel", "Backpack"][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* MARQUEE */}
      <div className="bg-[#e6ded3] h-12 overflow-hidden flex items-center">
        <div className="flex gap-16 whitespace-nowrap animate-scrollX">
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
          .animate-scrollX {
            animation: scrollX 25s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default Hero;