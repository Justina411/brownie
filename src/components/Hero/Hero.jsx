import { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCircleIndex((prev) => (prev + 1) % baggs.length);
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
     
      <section
        className="relative min-h-[460px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
       
        <div className="absolute inset-0 bg-amber-900/70 pointer-events-none"></div>
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

     
      <section className="p-12 bg-gray-100 text-white">
        <div className="flex flex-wrap justify-between gap-6">
          <div className="bg-amber-700 w-60 h-[200px] p-4 rounded-lg flex flex-col items-center text-center">
            <div
              className="bg-white rounded-tl-2xl w-20 h-20 bg-center bg-contain bg-no-repeat mb-4"
              style={{ backgroundImage: `url(${shipping})` }}
            ></div>
            <h2 className="font-medium text-lg mb-2">Free Shipping</h2>
            <p className="text-sm">We offer free shipping <br /> to our customers</p>
          </div>
          <div className="bg-amber-700 w-60 h-[200px] p-4 rounded-lg flex flex-col items-center text-center">
            <div
              className="bg-white rounded-tl-2xl w-20 h-20 bg-center bg-contain bg-no-repeat mb-4"
              style={{ backgroundImage: `url(${exclusive})` }}
            ></div>
            <h2 className="font-medium text-lg  mb-2">Exclusive Design</h2>
            <p className="text-sm">We are always have <br /> best designer bags</p>
          </div>
          <div className="bg-amber-700 w-60 h-[200px] p-4 rounded-lg flex flex-col items-center text-center">
            <div
              className="bg-white rounded-tl-2xl w-20 h-20 bg-center bg-contain bg-no-repeat mb-4"
              style={{ backgroundImage: `url(${packaging})` }}
            ></div>
            <h2 className="font-medium text-lg mb-2">Good Packaging</h2>
            <p className="text-sm">We make sure your luxury <br /> bag is well packaged</p>
          </div>
          <div className="bg-amber-700 w-60 h-[200px] p-4 rounded-lg flex flex-col items-center text-center">
            <div
              className="bg-white rounded-tl-2xl w-20 h-20 bg-center bg-contain bg-no-repeat mb-4"
              style={{ backgroundImage: `url(${quality})` }}
            ></div>
            <h2 className="font-medium text-lg mb-2">Highest Quality</h2>
            <p className="text-sm">We offer quality bags <br /> to our customers</p>
          </div>
        </div>
      </section>

     
      <section className="flex items-center justify-between px-16 py-20">
        <div className="w-80 h-96 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${model})` }}></div>

        <div className="text-center max-w-md px-8">
          <h2 className="text-3xl font-serif mb-4">
            The Art of Radiant Refinement
          </h2>
          <p className="text-gray-600 mb-6">
            Brownie celebrates timeless luxury with bags crafted for the modern
            woman. Each piece blends elegance, confidence, and sophistication,
            designed to elevate every moment with effortless style.
          </p>
          <button className="border-2 border-amber-800 text-amber-800 px-6 py-2 hover:bg-amber-800 hover:text-white transition rounded-2xl">
            Learn More
          </button>
        </div>

        <div className="w-80 h-96 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${bags})` }}></div>
      </section>

      
      <section className="bg-amber-900 py-20 px-16 flex items-center gap-10 text-white">
        <div className="max-w-xs">
          <h1 className="text-3xl font-serif mb-4">Our Collection</h1>
          <p className="mb-6">
            Discover our finest luxury bags crafted with elegance and timeless
            style for every woman.
          </p>
          <button className="bg-white border border-amber-800 px-4 py-2 text-black">
            See More
          </button>
        </div>

        <button onClick={prev} className="text-3xl font-bold ">
          ←
        </button>

        <div className="flex gap-6">
          {baggs.slice(start, start + 3).map((bag, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-60 h-72 bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url(${bag.img})` }}
              ></div>
              <p className="mt-2">{bag.name}</p>
              <button className="bg-white border border-amber-800 px-4 py-1 mt-1 text-black">
                {bag.price}
              </button>
            </div>
          ))}
        </div>

        <button onClick={next} className="text-3xl font-bold">
          →
        </button>
      </section>

     
      <section className="bg-[#f5efe7] px-16 py-14 flex items-center justify-between">
        <div className="w-[480px] h-[280px] rounded-xl overflow-hidden">
          <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col items-center text-center ml-12">
          <h2 className="text-lg font-serif mb-2">Choose The Type!</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-xs">
            Discover refined styles designed to elevate every look with elegance, confidence, and timeless luxury.
          </p>

          <div className="flex gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-28 h-28 rounded-full bg-cover bg-center shadow-md"
                  style={{
                    backgroundImage: `url(${baggs[(circleIndex + i) % baggs.length].img})`,
                  }}
                ></div>
                <p className="text-sm mt-2">
                  {["Pouch", "Satchel", "Backpack"][i]}
              
                </p>
              </div>
            ))}
          </div>
        </div>
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

export default Hero;