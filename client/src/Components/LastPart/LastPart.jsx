import React from "react";
import { motion } from "framer-motion";


const LastPart = () => {
  return (
    <div id="contact" className="relative bg-gradient-to-r from-[#0d2d0d] to-black overflow-hidden py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 flex justify-between opacity-40 pointer-events-none">
        <div className="w-1/2 flex justify-start items-center">
          <motion.div
            className="bg-primary/30 w-[600px] h-[600px] rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          ></motion.div>
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <motion.div
            className="bg-primary/30 w-[600px] h-[600px] rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          ></motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-center px-6 gap-10">
        {/* Left Image (Tablet & Phone) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end w-full md:w-1/2"
        >
          <div className="relative flex justify-center items-end">
            <img
              src="https://i.ibb.co.com/Sw9GXxg9/6810b5078bf0cd001d0e57ca.jpg"
              alt="Tablet Display"
              className="w-56 sm:w-72 md:w-96 drop-shadow-2xl"
            />
            <img
              src="https://i.ibb.co.com/xth9Kzqy/phone-casino-chips-dice.jpg"
              alt="Mobile Display"
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-10 w-28 sm:w-40 md:w-48 drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left text-white w-full md:w-1/2 space-y-4"
        >
          <h3 className="text-lg sm:text-xl font-medium">
            আমাদের অংশ হতে আবেদন করুন
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            RAJABAJI অ্যাফিলিয়েট প্রোগ্রাম
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">
            আমরা ক্রমাগত আমাদের গ্রাহকদের কাছ থেকে ১০০% বিশ্বস্ততার সাথে বৃদ্ধি পাচ্ছি।
            আমাদের সাথে যোগ দিন এবং একসাথে শেয়ার করতে এবং উপার্জন করতে এখনই
            আমাদের অংশীদার হোন।
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-4"
          >
            <button className="bg-primary cursor-pointer text-black font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-primary transition-all duration-300">
              যোগাযোগ করুন
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LastPart;
