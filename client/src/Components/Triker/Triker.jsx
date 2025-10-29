import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Example images — replace these with your own logo/game cover paths
const images = [
  "https://i.ibb.co.com/qMnHp8hf/ai-generated-8531096-640.webp",
  "https://i.ibb.co.com/JjGFtCTQ/download.jpg",
  "https://i.ibb.co.com/JFqB0TZR/9b26cf20bf29e663736ee8ea99936eb2.png",
  "https://i.ibb.co.com/fbKRjLp/gaming-profile-pictures-xpcd6q5uud2i45v8.jpg",
  "https://i.ibb.co.com/fYZ9mLMB/887ce3bc140bf9c3f03aedd0be21425a.jpg",
  "https://i.ibb.co.com/0RzmD9kb/abstract-facets-simple-background-justin-maller-wallpaper-preview.jpg",
  "https://i.ibb.co.com/ycQ0CgwM/gaming-is-a-great-hobby.jpg",
  "https://i.ibb.co.com/B5TdYNWc/desktop-wallpaper-cool-gaming-ps4-awesome-ps4.jpg",
];

const Triker = () => {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 30, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <div className="bg-[#0b0f10] py-10 overflow-hidden">
    <div
        className="relative overflow-hidden w-full max-w-7xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div className="flex gap-8" animate={controls}>
          {images.concat(images).map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              style={{ width: "200px" }}
            >
              <img
                src={src}
                alt={`partner-${index}`}
                className="w-full h-[280px] object-cover rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Triker;
