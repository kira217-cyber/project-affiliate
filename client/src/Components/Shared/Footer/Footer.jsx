import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5 md:px-10 border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-16">
        
        {/* Left Section - Logo and Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-3"
        >
          <img
            src="https://i.ibb.co.com/Q7Cms1cc/Footer-Logo.png"
            alt="Rajabaji Logo"
            className="w-36 sm:w-44 md:w-48"
          />
          <p className="text-gray-300 text-sm md:text-base font-medium">
            Rajabaji Trusted Casino – Best Online <br />
            Cricket Betting App
          </p>
        </motion.div>

        {/* Middle Section - Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-semibold mb-3 text-white">Payment method</h3>
          <div className="flex justify-center md:justify-start items-center gap-4 sm:gap-6">
            <img src="https://i.ibb.co.com/x8S78ZCf/300px-BKash.png" alt="bKash" className="w-12 sm:w-16 md:w-20" />
            <img src="https://i.ibb.co.com/M5SfXszD/image-42525-1643965434.png" alt="Nagad" className="w-12 sm:w-16 md:w-20" />
            <img src="https://i.ibb.co.com/TMww2j2s/5932889762496fc0e8aacd507f50aba0.png" alt="Rocket" className="w-12 sm:w-16 md:w-20" />
          </div>
        </motion.div>

        {/* Right Section - Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-semibold mb-3 text-white">Follow us</h3>
          <div className="flex justify-center md:justify-start items-center gap-4 sm:gap-6">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="bg-white text-black p-2 rounded-full"
            >
              <FaFacebookF size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="bg-white text-black p-2 rounded-full"
            >
              <FaInstagram size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="bg-white text-black p-2 rounded-full"
            >
              <FaYoutube size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="bg-white text-black p-2 rounded-full"
            >
              <FaTwitter size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4">
        <p className="text-center text-gray-400 text-sm md:text-base">
          Copyright © 2025 <span className="text-green-400 font-semibold">Rajabaji</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
