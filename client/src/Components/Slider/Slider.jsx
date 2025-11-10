// components/Slider.jsx
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5004";

  useEffect(() => {
    axios.get(`${API_URL}/api/sliders`)
      .then(res => setSlides(res.data))
      .catch(() => console.log("Failed to load slider"));

    const auto = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(auto);
  }, [slides.length]);

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setFade(true);
    }, 500);
  };

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1);
      setFade(true);
    }, 500);
  };

  if (slides.length === 0) return <div className="text-white text-center py-20">Loading...</div>;

  const s = slides[current];

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <div className={`flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-20 transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}>
        <div className="flex-1 flex justify-center">
          <img src={`${API_URL}${s.image}`} alt={s.title} className="w-full max-w-md h-96 object-contain drop-shadow-lg" />
        </div>
        <div className="flex-1 text-center md:text-left mt-6 md:mt-0 space-y-4">
          <h1 className={`text-3xl md:${s.titleSize} font-bold`} style={{ color: s.titleColor }}>
            {s.title}
          </h1>
          <p className={`text-lg md:${s.subtitleSize}`} style={{ color: s.subtitleColor }}>
            {s.subtitle}
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <a href={s.button1Link} className="px-2 md:px-6 py-2 rounded-full font-semibold transition"
               style={{ backgroundColor: s.button1Color, color: s.button1TextColor }}>
              {s.button1Text}
            </a>
            <a href={s.button2Link} className="px-2 md:px-6 py-2 rounded-full font-semibold transition"
               style={{ backgroundColor: s.button2Color, color: s.button2TextColor }}>
              {s.button2Text}
            </a>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute cursor-pointer left-5 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full">
        <FiChevronLeft size={28} />
      </button>
      <button onClick={next} className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full">
        <FiChevronRight size={28} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)}
               className={`w-3 h-3 rounded-full cursor-pointer transition ${current === i ? "bg-green-400" : "bg-gray-500"}`} />
        ))}
      </div>
    </div>
  );
};

export default Slider;