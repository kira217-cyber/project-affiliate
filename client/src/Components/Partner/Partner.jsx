import React from "react";
import { motion } from "framer-motion";
import Triker from "../Triker/Triker";



const Partner = () => {

  return (
    <div className="bg-black text-white py-12 px-4 flex flex-col items-center justify-center overflow-hidden relative">
      {/* ব্যাকগ্রাউন্ড */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('https://i.ibb.co.com/cKsgJMVB/photo-1689443111130-6e9c7dfd8f9e.jpg')] bg-cover bg-center"
      />

      {/* শিরোনাম */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 z-10"
      >
        <span className="text-primary">Special Partner</span>{" "}
        <span className="text-white">বিশেষ অংশীদার</span>
      </motion.h2>

     
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-center z-10"
      >
        {/* বাম দিকের ইমেজ */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/WNkZ1WWz/casino-illustration-vector-3d-elements-theme-casinos-gambling-396616-1541.jpg"
            alt="RajaBaji Promo"
            className="w-64 md:w-80 lg:w-96"
          />
        </motion.div>

        {/* ডান দিকের টেক্সট ও বাটন */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
            এখনই নিবন্ধন করুন এবং <span className="text-primary font-semibold">৫০% পর্যন্ত রাজস্ব ভাগ</span> সহ আমাদের নতুন অ্যাফিলিয়েট সদস্য হিসেবে উপার্জন শুরু করুন!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-primary hover:bg-primary cursor-pointer text-black font-semibold px-6 py-3 rounded-full shadow-lg"
          >
            আমাদের অংশীদার হোন
          </motion.button>
        </motion.div>
      </motion.div>

       {/* স্লাইডার */}
    <div className="mt-5">
       <Triker></Triker>
    </div>
    </div>
  );
};

export default Partner;
