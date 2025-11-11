// components/Commission.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHandshake, FaGift } from "react-icons/fa";
import axios from "axios";

const Commission = () => {
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/commission`)
      .then((res) => setData(res.data))
      .catch(() => console.log("Commission লোড হয়নি"));
  }, []);

  if (!data) {
    return (
      <div className="py-20 text-white text-center bg-black text-3xl">
        লোড হচ্ছে...
      </div>
    );
  }

  const totalWin = data.tableData.reduce((s, i) => s + i.win, 0);
  const totalOperation = data.tableData.reduce((s, i) => s + i.operation, 0);
  const totalBonus = data.tableData.reduce((s, i) => s + i.bonus, 0);

  return (
    <>
      <section
        id="commission"
        className="bg-black text-white py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
            className="absolute w-16 opacity-20"
            animate={{ y: [0, 600, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
              {data.title}
            </h2>
            <p className="text-lg mt-3 font-semibold">{data.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div className="bg-gradient-to-b from-primary/40 to-black rounded-2xl p-8 border border-primary">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={
                    data.leftImage.includes("http")
                      ? data.leftImage
                      : `${API_URL}${data.leftImage}`
                  }
                  className="w-48 rounded-xl"
                  alt="bonus"
                />
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {data.leftTitle}
                  </h3>
                  <p
                    className="text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: data.leftDesc.replace(/\n/g, "<br />"),
                    }}
                  />
                  <motion.button className="mt-5 bg-primary text-black font-bold px-6 py-2 rounded-full">
                    {data.buttonText}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-primary">
              <h3 className="text-2xl font-bold text-primary mb-5">
                {data.calcTitle}
              </h3>
              <div className="space-y-4 text-gray-300">
                {data.calcItems.map((item, i) => (
                  <p key={i}>
                    {item.icon.includes("http") ||
                    item.icon.includes("/uploads") ? (
                      <img
                        src={
                          item.icon.includes("http")
                            ? item.icon
                            : `${API_URL}${item.icon}`
                        }
                        className="w-6 h-6 inline mr-2"
                      />
                    ) : (
                      <span className="text-green-400 font-semibold mr-2">
                        {item.icon}
                      </span>
                    )}
                    {item.text}
                  </p>
                ))}
              </div>

              <div className="mt-8 border border-primary rounded-xl overflow-hidden">
                <div className="grid grid-cols-4 bg-primary/30 text-primary font-semibold p-3 text-center">
                  <p>{data.tierTitle}</p>
                  <p>সদস্যদের মোট নেট ক্ষতি</p>
                  <p>মোট সক্রিয় খেলোয়াড়</p>
                  <p>কমিশন হার</p>
                </div>
                <div className="grid grid-cols-4 text-center p-3 bg-black">
                  <p>১ম স্তর</p>
                  <p>{data.tierNetLoss}</p>
                  <p>{data.tierPlayers}</p>
                  <p className="text-primary font-bold">{data.tierRate}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-3 py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://i.ibb.co.com/Hp7wwCDB/3d-rendering-hexagonal-texture-background-23-2150796421.jpg')] bg-cover" />

        <motion.div className="flex flex-wrap justify-center items-center gap-6 z-10">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-black p-4 rounded-full text-3xl">
              <FaUsers />
            </div>
            <p className="mt-2 font-bold">গ্রাহকের জয়/পরাজয়</p>
          </div>
          <span className="text-primary text-4xl font-bold">+</span>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-black p-4 rounded-full text-3xl">
              <FaHandshake />
            </div>
            <p className="mt-2 font-bold">২০% অপারেশন ফি</p>
          </div>
          <span className="text-primary text-4xl font-bold">+</span>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-black p-4 rounded-full text-3xl">
              <FaGift />
            </div>
            <p className="mt-2 font-bold">বোনাস</p>
          </div>
          <span className="text-primary text-4xl font-bold">=</span>
          <div className="text-center">
            <p className="text-primary text-2xl font-bold">
              {data.formulaTitle}
            </p>
            <p className="text-4xl font-extrabold text-primary">
              {data.formulaPercent}
            </p>
            <p className="text-lime-200 font-semibold">
              {data.formulaSubtitle}
            </p>
          </div>
        </motion.div>

        <motion.div className="w-full max-w-5xl mt-10 overflow-x-auto z-10">
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
              {data.tableData.map((row, i) => (
                <tr key={i} className="odd:bg-[#1a1a1a] even:bg-[#101010]">
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
              <tr className="bg-primary text-black font-bold">
                <td>TOTAL</td>
                <td>{totalWin.toLocaleString()}</td>
                <td>{totalOperation.toLocaleString()}</td>
                <td>{totalBonus.toLocaleString()}</td>
                <td className="text-fuchsia-700">
                  {data.totalCommission.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
};

export default Commission;
