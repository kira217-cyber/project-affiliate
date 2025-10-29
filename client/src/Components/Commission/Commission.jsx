import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHandshake, FaGift, FaEquals } from "react-icons/fa";

const Commission = () => {


    const tableData = [
    { id: 1, member: "সদস্য ১", win: 2400000, operation: 480000, bonus: 40000 },
    { id: 2, member: "সদস্য ২", win: 1800000, operation: 360000, bonus: 20000 },
    { id: 3, member: "সদস্য ৩", win: -900000, operation: 0, bonus: 0 },
    { id: 4, member: "সদস্য ৪", win: 2900000, operation: 580000, bonus: 50000 },
    { id: 5, member: "সদস্য ৫", win: -600000, operation: 0, bonus: 0 },
  ];

  const totalWin = tableData.reduce((sum, i) => sum + i.win, 0);
  const totalOperation = tableData.reduce((sum, i) => sum + i.operation, 0);
  const totalBonus = tableData.reduce((sum, i) => sum + i.bonus, 0);
  const totalCommission = 2035000;

  return (
   <> 
   <section id="commission" className="bg-black text-white py-16 relative overflow-hidden">
      {/* Floating Coins Animation (optional simple effect) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
          alt=""
          className="absolute w-16 opacity-20"
          initial={{ y: -100, x: 50 }}
          animate={{ y: [0, 600, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
          alt=""
          className="absolute w-20 right-20 opacity-20"
          initial={{ y: -200 }}
          animate={{ y: [0, 600, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
            সেরা কমিশন রেট, শুধু আপনার জন্য!
          </h2>
          <p className="text-lg mt-3 text-white font-semibold">
            কোন লুকানো ফি নেই, কোন লুকানো কৌশল নেই, শুধু যোগদান করুন এবং
            উপার্জন শুরু করুন!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-b from-primary/40 to-black rounded-2xl p-6 md:p-8 border border-primary"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/608/608197.png"
                alt="Commission Bonus"
                className="w-48 md:h-[300px] rounded-xl"
              />
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  প্রতিনতুন অ্যাফিলিয়েট পার্টনারের জন্য রাজস্বের ভাগ সর্বোচ্চ
                  ৫০% পর্যন্ত!
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  শুরু মাত্র রেফারালটি থেকেই আপনি পেতে পারেন সর্বোচ্চ ৫০%
                  আয়। <br /> প্রতি মাসে কমিশন — কোন প্রশ্ন ছাড়াই। এখনই যোগ দিন
                  <span className="text-primary font-semibold">
                    {" "}
                    RAJABAJI Affiliates
                  </span>{" "}
                  এর অংশ হয়ে উঠুন!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-5 bg-primary hover:bg-primary text-black font-bold px-6 py-2 rounded-full transition duration-300"
                >
                  যোগাযোগ করুন
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 md:p-8 border border-primary"
          >
            <h3 className="text-2xl font-bold text-primary mb-5">
              কমিশন হার কীভাবে গণনা করবেন
            </h3>

            <div className="space-y-4 text-gray-300 text-sm md:text-base">
              <p>
                <span className="text-green-400 font-semibold">%</span> কমিশন:
                (কোম্পানির লাভ/ক্ষতি - বোনাস - অপারেশন ফি) × ৫০%
              </p>
              <p>
                <span className="text-green-400 font-semibold">🎁</span> বোনাস:
                অনুমোদিত সদস্যদের দেওয়া আর্থিক বোনাস, রিবেট, ক্যাশব্যাক
                ইত্যাদি।
              </p>
              <p>
                <span className="text-green-400 font-semibold">💰</span>{" "}
                অপারেশন ফি: মোট লাভ/ক্ষতির উপর ভিত্তি করে ২০% প্রযোজ্য।
              </p>
            </div>

            {/* Commission Table */}
            <div className="mt-8 border border-primary rounded-xl overflow-hidden text-sm md:text-base">
              <div className="grid grid-cols-4 bg-primary/30 text-primary font-semibold p-3">
                <p className="text-center">অংশীদার</p>
                <p className="text-center">সদস্যদের মোট নেট ক্ষতি</p>
                <p className="text-center">মোট সক্রিয় খেলোয়াড়</p>
                <p className="text-center">কমিশন হার</p>
              </div>
              <div className="grid grid-cols-4 text-center p-3 bg-black">
                <p>১ম স্তর</p>
                <p>১ লাখ টাকার উপরে</p>
                <p>১০+ সদস্য</p>
                <p className="text-primary font-bold">৫০%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-3 py-10 relative overflow-hidden">
      {/* পটভূমি */}


      
      <div className="absolute inset-0 opacity-10 bg-[url('https://i.ibb.co.com/Hp7wwCDB/3d-rendering-hexagonal-texture-background-23-2150796421.jpg')] bg-cover bg-center" />

      {/* উপরের আইকন ও লেখাগুলো */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap justify-center items-center gap-6 z-10"
      >
        <div className="flex flex-col items-center">
          <div className="bg-primary text-black p-4 rounded-full text-3xl">
            <FaUsers />
          </div>
          <p className="mt-2 font-bold text-center">গ্রাহকের জয়/পরাজয়</p>
        </div>

        <span className="text-primary text-4xl font-bold">+</span>

        <div className="flex flex-col items-center">
          <div className="bg-primary text-black p-4 rounded-full text-3xl">
            <FaHandshake />
          </div>
          <p className="mt-2 font-bold text-center">২০% অপারেশন ফি</p>
        </div>

        <span className="text-primary text-4xl font-bold">+</span>

        <div className="flex flex-col items-center">
          <div className="bg-primary text-black p-4 rounded-full text-3xl">
            <FaGift />
          </div>
          <p className="mt-2 font-bold text-center">বোনাস</p>
        </div>

        <span className="text-primarytext-4xl font-bold">=</span>

        <div className="flex flex-col items-center text-center">
          <p className="text-primary text-2xl font-bold leading-tight">
            অ্যাফিলিয়েট মোট নেট লাভের
          </p>
          <p className="text-4xl font-extrabold text-primary">৪০ - ৫০%</p>
          <p className="text-lime-200 font-semibold">উপার্জন করবে</p>
        </div>
      </motion.div>

      {/* টেবিল */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-5xl mt-10 overflow-x-auto z-10"
      >
        <table className="w-full border-collapse text-center text-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-primary text-black font-bold">
              <th className="py-3 px-2">সদস্য</th>
              <th className="py-3 px-2">জয়/পরাজয়</th>
              <th className="py-3 px-2">অপারেশন ফি (২০%)</th>
              <th className="py-3 px-2">বোনাস</th>
              <th className="py-3 px-2">কমিশন (৫০%)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-[#1a1a1a] even:bg-[#101010] border-b border-gray-700"
              >
                <td className="py-3">{row.member}</td>
                <td
                  className={`py-3 ${
                    row.win < 0 ? "text-red-500" : "text-primary"
                  }`}
                >
                  {row.win.toLocaleString()}
                </td>
                <td className="py-3 text-primary">
                  {row.operation.toLocaleString()}
                </td>
                <td className="py-3 text-primary">
                  {row.bonus.toLocaleString()}
                </td>
                <td className="py-3 text-gray-400">-</td>
              </tr>
            ))}

            {/* Total */}
            <tr className="bg-primary text-black font-bold">
              <td className="py-3">TOTAL</td>
              <td className="py-3">
                {totalWin.toLocaleString("bn-BD").replace(/,/g, ",")}
              </td>
              <td className="py-3">{totalOperation.toLocaleString()}</td>
              <td className="py-3">{totalBonus.toLocaleString()}</td>
              <td className="py-3 text-fuchsia-700">
                {totalCommission.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div> </> 
  );
};

export default Commission;
