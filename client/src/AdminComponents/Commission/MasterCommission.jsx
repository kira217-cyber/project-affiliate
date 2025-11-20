import React, { useContext } from "react";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AuthContext } from "../../Context/AuthContext";

const MasterCommission = () => {
  const { user, commissionBalance, referCommissionBalance } =
    useContext(AuthContext);
  const stats = [
    {
      title: "Total Withdraw Balance",
      value: commissionBalance,
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      title: "Game Loss Commission",
      value: "0.00",
      gradient: "from-blue-500 via-cyan-400 to-green-400",
    },
    {
      title: "Deposit Commission ",
      value: "0.00",
      gradient: "from-indigo-500 via-purple-500 to-pink-400",
    },
    {
      title: "Reffer Commission",
      value: referCommissionBalance,
      gradient: "from-green-500 via-lime-400 to-yellow-400",
    },
  ];

  return (
    <div className="bg-[#1e293b] text-white flex flex-col items-center p-6">
      {/* 💎 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 w-full">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl p-[2px] bg-gradient-to-r ${item.gradient} shadow-lg`}
          >
            <div className="bg-[#0f172a] rounded-2xl p-5 text-center h-full">
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
    </div>
  );
};

export default MasterCommission;
