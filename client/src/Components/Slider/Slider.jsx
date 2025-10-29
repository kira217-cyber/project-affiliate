import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/DDtxktng/images.jpg",
    title: "আমাদের একচেটিয়া অংশীদার হয়ে উঠুন",
    subtitle: "আমাদের সাথে আরও গ্রাহক পান এবং আরও অর্থ উপার্জন করুন!",
    button1: "🪙 নিবন্ধন",
    button2: "$ কমিশন পর্যালোচনা",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/pvNnrsdQ/banner2-1024x799.png",
    title: "আজই জয় করুন এবং উপার্জন করুন",
    subtitle: "প্রতিদিন নতুন সুযোগ ও পুরস্কার আপনার জন্য!",
    button1: "🎯 এখনই শুরু করুন",
    button2: "🏆 বিস্তারিত দেখুন",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/v4czN3Sj/images.jpg",
    title: "নিরাপদ বিনিয়োগ, নিশ্চিত আয়",
    subtitle: "আমাদের পার্টনার হয়ে দীর্ঘমেয়াদে উপার্জন করুন!",
    button1: "💰 এখনই যোগ দিন",
    button2: "📊 আয় দেখুন",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true); // ✅ fade animation state

  // ✅ Auto Slide Every 5 Seconds (smooth transition)
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // fade-out
      setTimeout(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setFade(true); // fade-in
      }, 500); // fade transition সময়
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 500);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setFade(true);
    }, 500);
  };

  const { image, title, subtitle, button1, button2 } = slides[current];

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Slider Content with fade animation */}
      <div
        className={`flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-10 md:py-20 transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={image}
            alt="slide"
            className="w-full h-[400px] max-w-md md:max-w-lg object-contain drop-shadow-[0_0_25px_#99FF47]"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 text-center md:text-left mt-6 md:mt-0 space-y-5">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary leading-snug">
            {title}
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-200">
            {subtitle}
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button className="bg-primary cursor-pointer hover:bg-[#7ed637] text-black font-semibold px-2 md:px-6 py-2 rounded-full transition-all">
              {button1}
            </button>
            <button className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold px-2 md:px-6 py-2 rounded-full transition-all">
              {button2}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 cursor-pointer md:left-5 top-1/2 -translate-y-1/2 bg-[#99FF47]/30 hover:bg-[#99FF47]/50 text-white p-2 rounded-full transition"
      >
        <FiChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 cursor-pointer md:right-5 top-1/2 -translate-y-1/2 bg-[#99FF47]/30 hover:bg-[#99FF47]/50 text-white p-2 rounded-full transition"
      >
        <FiChevronRight size={28} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrent(index);
                setFade(true);
              }, 300);
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              current === index ? "bg-[#99FF47]" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
