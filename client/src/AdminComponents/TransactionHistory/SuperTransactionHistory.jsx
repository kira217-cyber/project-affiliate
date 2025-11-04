// src/AdminComponents/Transaction/SuperTransactionHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  XCircle,
  AlertCircle,
  Smartphone,
  Building2,
  User,
  Store,
} from "lucide-react";
import { format } from "date-fns";

const SuperTransactionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const adminId = localStorage.getItem("userId");

  useEffect(() => {
    if (adminId) fetchHistory();
  }, [adminId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/withdraw/history/${adminId}`
      );

      // শুধু approve + refund (স্কিমায় আছে)
      const filtered = res.data.filter(
        (tx) =>
          (tx.type === "approve" || tx.type === "refund") &&
          tx.adminId.toString() === adminId
      );

      // সর্বশেষ আগে (updatedAt > createdAt)
      const sorted = filtered.sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
      );

      setHistory(sorted);
      setError("");
    } catch (err) {
      setError("ট্রানজেকশন লোড করতে সমস্যা হয়েছে");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeStyle = (type) => {
    if (type === "approve")
      return {
        color: "text-green-600",
        bg: "bg-green-100",
        icon: <ArrowUpRight size={16} />,
        text: "অ্যাপ্রুভ",
      };
    if (type === "refund")
      return {
        color: "text-red-600",
        bg: "bg-red-100",
        icon: <XCircle size={16} />,
        text: "রিজেক্ট",
      };
    return {
      color: "text-gray-600",
      bg: "bg-gray-100",
      icon: <AlertCircle size={16} />,
      text: "অজানা",
    };
  };

  const getMethodIcon = (name) => {
    const lower = (name || "").toLowerCase();
    if (
      lower.includes("bkash") ||
      lower.includes("nagad") ||
      lower.includes("rocket")
    )
      return <Smartphone className="w-4 h-4" />;
    if (lower.includes("bank")) return <Building2 className="w-4 h-4" />;
    return <Smartphone className="w-4 h-4" />;
  };

  const getPaymentTypeChip = (type) => {
    const lower = (type || "").toLowerCase();
    if (lower === "personal")
      return {
        icon: <User size={14} />,
        color: "bg-indigo-100 text-indigo-700",
      };
    if (lower === "agent")
      return { icon: <Store size={14} />, color: "bg-teal-100 text-teal-700" };
    if (lower === "merchant")
      return {
        icon: <Building2 size={14} />,
        color: "bg-purple-100 text-purple-700",
      };
    return { icon: <User size={14} />, color: "bg-gray-100 text-gray-700" };
  };

  if (!adminId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xl">
        লগইন করুন
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8"
      style={{
        background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            সুপার ট্রানজেকশন হিস্টোরি
          </h1>
          <p className="text-white/80 text-lg">
            আপনি যে রিকোয়েস্টগুলো অ্যাপ্রুভ বা রিজেক্ট করেছেন
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl text-center max-w-md mx-auto"
          >
            <AlertCircle className="inline-block mr-2" size={20} />
            {error}
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div
            layout
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/20 text-white text-left text-sm font-semibold">
                    <th className="px-4 py-4">টাইপ</th>
                    <th className="px-4 py-4">অ্যামাউন্ট</th>
                    <th className="px-4 py-4">মেথড</th>
                    <th className="px-4 py-4">নম্বর</th>
                    <th className="px-4 py-4">পেমেন্ট টাইপ</th>
                    <th className="px-4 py-4">তারিখ</th>
                    <th className="px-4 py-4">বিবরণ</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {history.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-12 text-white/70"
                        >
                          <AlertCircle
                            size={48}
                            className="mx-auto mb-3 text-white/50"
                          />
                          <p>
                            আপনি এখনো কোনো রিকোয়েস্ট অ্যাপ্রুভ/রিজেক্ট করেননি
                          </p>
                        </td>
                      </tr>
                    ) : (
                      history.map((tx, index) => {
                        const typeStyle = getTypeStyle(tx.type);
                        return (
                          <motion.tr
                            key={tx._id}
                            layout
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-t border-white/10 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.color}`}
                              >
                                {typeStyle.icon}
                                {typeStyle.text}
                              </span>
                            </td>
                            <td className="px-4 py-4 font-bold text-white">
                              ৳{tx.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                {getMethodIcon(tx.methodName)}
                                <span className="text-white/90">
                                  {tx.methodName || "—"}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-white/80 font-mono text-sm">
                              {tx.accountNumber || "—"}
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  getPaymentTypeChip(tx.paymentType).color
                                }`}
                              >
                                {getPaymentTypeChip(tx.paymentType).icon}
                                {tx.paymentType || "—"}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-white/80 text-sm">
                              {format(
                                new Date(tx.updatedAt || tx.createdAt),
                                "dd MMM, yyyy"
                              )}
                              <br />
                              <span className="text-white/60">
                                {format(
                                  new Date(tx.updatedAt || tx.createdAt),
                                  "hh:mm a"
                                )}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-white/80 text-sm max-w-xs">
                              {tx.description || "—"}
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SuperTransactionHistory;
