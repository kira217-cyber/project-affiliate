import React from "react";
import { motion } from "framer-motion";

const HowToProcess = () => {
  return (
    <section id="how-it-works" className="bg-black text-white py-16 relative overflow-hidden">
      {/* Green Border Top & Bottom */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
          কিভাবে এটা কাজ করে
        </h2>
      </div>

      {/* 3 Steps Section */}
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center relative z-10">
        {/* Step 1 */}
        <motion.div
          className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg hover:shadow-primary/40 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
            alt="affiliate"
            className="w-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-primary">
            আমাদের অ্যাফিলিয়েট হয়ে উঠুন
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            কয়েকটি সহজ ক্লিকের মাধ্যমে, আপনি আমাদের অ্যাফিলিয়েট পার্টনার
            হিসেবে নিবন্ধিত হবেন।
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg hover:shadow-primary/40 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
            alt="share"
            className="w-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-primary">
            প্রচার করুন RAJABAJI
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            বন্ধুদের আমন্ত্রণ করুন এবং RAJABAJI প্রমোট করুন আপনার সোশ্যাল
            মিডিয়াতে।
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-lg hover:shadow-primary/40 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/929/929473.png"
            alt="earn"
            className="w-20 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-primary">
            উপার্জন শুরু করুন
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            আপনার আমন্ত্রণ লিঙ্কের মাধ্যমে নতুন সদস্য যোগ হলে ৫০% পর্যন্ত রাজস্ব
            ভাগ পান।
          </p>
        </motion.div>
      </div>


{/* Blinking Button */}
<div className="text-center mt-12 relative z-10">
  <motion.button
    whileHover={{ scale: 1.05 }}
    animate={{ opacity: [1, 0.5, 1] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg"
  >
    আমাদের অংশীদার হয়ে উঠুন
  </motion.button>
</div>


    </section>
  );
};

export default HowToProcess;
