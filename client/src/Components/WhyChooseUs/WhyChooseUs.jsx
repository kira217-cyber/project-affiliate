// components/WhyChooseUs.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const WhyChooseUs = () => {
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5004";

  useEffect(() => {
    axios.get(`${API_URL}/api/why-choose-us`)
      .then(res => setData(res.data))
      .catch(() => console.log("লোড হয়নি"));
  }, [API_URL]);

  if (!data) return <div className="py-16 text-center text-white">লোড হচ্ছে...</div>;

  return (
    <div id="why-us" className="relative bg-fixed bg-center bg-cover py-16" style={{ backgroundImage: `url(${API_URL}${data.backgroundImage})` }}>
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {data.heading}
        </motion.h2>
        <motion.p
          className="text-white text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {data.subheading}
        </motion.p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((item, index) => (
            console.log(item),
            <motion.div
              key={index}
              className="bg-black/60 border border-[#99FF47]/30 backdrop-blur-lg rounded-2xl p-6 text-white hover:border-primary hover:shadow-[0_0_20px_rgba(153,255,71,0.5)] transition-all duration-500"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <img src={`${API_URL}${item.icon}`} alt={item.title} className="w-14 h-14 object-contain" />
              
              </div>
              <h3 className="text-primary text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;