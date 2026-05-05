import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const baggs = [
  { img: "/bag1.jpg", name: "Luxury Bag", price: "$24.00" },
  { img: "/bag2.jpg", name: "Luxury Bag", price: "$28.00" },
  { img: "/bag3.jpg", name: "Luxury Bag", price: "$30.00" },
  { img: "/bag4.jpg", name: "Luxury Bag", price: "$35.00" },
  { img: "/bag5.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag6.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag7.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag8.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag9.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag10.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag11.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag12.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag13.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag14.jpg", name: "Luxury Bag", price: "$40.00" },
  { img: "/bag15.jpg", name: "Luxury Bag", price: "$40.00" },
];

const Hero = () => {
  const [start, setStart] = useState(0);
  const [circleIndex, setCircleIndex] = useState(0);
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/collection");
  };

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
      {/* HERO */}
      <section
        className="relative min-h-[70vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url(/background.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-white px-6 md:ml-24 max-w-xl">
          <p className="text-xs md:text-sm tracking-widest uppercase">
            Redefining Modern Elegance
          </p>

          <h1 className="text-4xl md:text-6xl font-serif mt-4">
            BROWNIE FORWARD
          </h1>

          <button
            onClick={handleShopNowClick}
            className="mt-6 border px-6 py-3 hover:bg-white hover:text-black transition"
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="bg-amber-900 py-12 px-6 text-white">
        <div className="flex items-center justify-center gap-4">
          <button onClick={prev}>←</button>

          {baggs.slice(start, start + 3).map((bag, i) => (
            <div key={i} className="text-center">
              <div
                className="w-32 h-40 bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${bag.img})` }}
              />
              <p className="text-sm mt-2">{bag.name}</p>
            </div>
          ))}

          <button onClick={next}>→</button>
        </div>
      </section>

      {/* FEATURE CIRCLE IMAGES */}
      <section className="bg-[#f5efe7] py-10 flex justify-center gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="text-center">
            <div
              className="w-20 h-20 rounded-full bg-cover bg-center border"
              style={{
                backgroundImage: `url(${
                  baggs[(circleIndex + i) % baggs.length].img
                })`,
              }}
            />
            <p className="text-xs mt-2">Luxury</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Hero;