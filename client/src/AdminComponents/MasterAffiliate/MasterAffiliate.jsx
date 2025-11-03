import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import YouTube from "react-youtube";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const MasterAffiliate = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    {
      title: "My All Commission",
      value: "500 BDT",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      title: "Loss Commission (10%)",
      value: "100",
      gradient: "from-blue-500 via-cyan-400 to-green-400",
    },
    {
      title: "Deposit Bonus (5%)",
      value: "100",
      gradient: "from-indigo-500 via-purple-500 to-pink-400",
    },
    {
      title: "Reffer Bonus (10 TK)",
      value: "100",
      gradient: "from-green-500 via-lime-400 to-yellow-400",
    },
    {
      title: "Today My Player Win",
      value: "500 BDT",
      gradient: "from-orange-500 via-pink-500 to-red-500",
    },
    {
      title: "Today My Player Loss",
      value: "100",
      gradient: "from-teal-400 via-sky-400 to-blue-500",
    },
    {
      title: "My Active Player",
      value: "100",
      gradient: "from-rose-500 via-pink-400 to-purple-400",
    },
    {
      title: "My All User Balance",
      value: "100",
      gradient: "from-yellow-500 via-orange-400 to-red-400",
    },
  ];

  const referralLink = `${import.meta.env.VITE_API_URL_REFERRAL}/register?ref=${
    user?.referralCode
  }`;

  // ✅ Copy function with toast
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  // ✅ Lazy YouTube Options (optimized loading)
  const opts = {
    height: "315",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <Toaster position="top-center" reverseOrder={false} />

      {/* 🔗 Reffer Link Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-r from-green-400 via-lime-500 to-yellow-400 p-4 rounded-md flex flex-wrap justify-between items-center"
      >
        <p className="font-bold text-lg text-black">
          Your Reffer Link :
          <span className="text-red-700 ml-2">{referralLink}</span>
        </p>
        <button
          onClick={handleCopy}
          className="bg-black cursor-pointer text-white px-4 py-1 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Copy
        </button>
      </motion.div>

      {/* 💎 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 w-full">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl p-[2px] bg-gradient-to-r ${item.gradient} shadow-lg`}
          >
            <div className="bg-black rounded-2xl p-5 text-center h-full">
              <h3 className="text-gray-200 font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400">
                {item.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎬 Video Tutorial Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-10 w-full bg-gradient-to-r from-green-400 via-lime-500 to-yellow-400 text-black font-bold text-center text-xl py-3 rounded-md"
      >
        🎥 Video Tutorial — How to Use Master Affiliate System
      </motion.div>

      {/* ▶️ Lazy YouTube Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
        <LazyLoadComponent>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <YouTube videoId="ScMzIvxBSi4" opts={opts} />
          </motion.div>
        </LazyLoadComponent>

        <LazyLoadComponent>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <YouTube videoId="ScMzIvxBSi4" opts={opts} />
          </motion.div>
        </LazyLoadComponent>
      </div>
    </div>
  );
};

export default MasterAffiliate;
