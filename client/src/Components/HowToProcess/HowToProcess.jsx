// components/HowToProcess.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const HowToProcess = () => {
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/api/how-to-process`)
      .then((res) => setData(res.data))
      .catch(() => console.log("লোড হয়নি"));
  }, [API_URL]);

  if (!data)
    return (
      <div className="py-16 text-center text-white bg-black">লোড হচ্ছে...</div>
    );

  return (
    <section
      id="how-it-works"
      className="bg-black text-white py-16 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-primary"
          initial={{ y: -30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {data.mainHeading}
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center relative z-10">
        {data.steps.map((step, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg hover:shadow-primary/40 transition duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <img
              src={
                step.icon.includes("http")
                  ? step.icon
                  : `${API_URL}${step.icon}`
              }
              alt={step.title}
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-primary">
              {step.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg"
        >
          {data.buttonText}
        </motion.button>
      </div>
    </section>
  );
};

export default HowToProcess;
