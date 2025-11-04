// src/pages/MasterAffiliate.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { toast } from "react-toastify";

const MyDownline = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("No user ID found");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin?id=${userId}`);
      return res.data.user;
    },
    onError: (err) => {
      toast.error(err.message || "Failed to load data");
    },
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, commissions }) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/api/approve-user/${id}`, commissions),
    onSuccess: () => {
      toast.success("User activated & commissions updated!");
      queryClient.invalidateQueries(["user"]);
      setModalOpen(false);
      setSelectedUser(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deactivateMutation = useMutation({
    mutationFn: (id) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/api/deactivate-user/${id}`),
    onSuccess: () => {
      toast.success("User deactivated!");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed"),
  });

  const handleActivate = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDeactivate = (userId) => {
    if (window.confirm("Deactivate this user?")) {
      deactivateMutation.mutate(userId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    approveMutation.mutate({
      id: selectedUser._id,
      commissions: {
        commission: formData.get("commission") || 0,
        depositCommission: formData.get("depositCommission") || 0,
        gameCommission: formData.get("gameCommission") || 0,
      },
    });
  };

  if (isLoading) return <div className="text-white text-center py-20 text-xl">Loading...</div>;
  if (error) return <div className="text-red-400 text-center py-20">Error: {error.message}</div>;

  // শুধু রেফারেল ইউজার (pending + created)
  const allReferredUsers = [
    ...(data?.createdUsers || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          My Referral Users
        </h1>

        {allReferredUsers.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No Referral Users</p>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-200">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 px-4">User Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Whatsapp</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Active/Deactive</th>
                  </tr>
                </thead>
                <tbody>
                  {allReferredUsers.map((user) => {
                    const isActive = user.isActive || false;
                    return (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="py-4 px-4">{user.username}</td>
                        <td className="py-4 px-4">{user.email}</td>
                        <td className="py-4 px-4">{user.whatsapp}</td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-block cursor-pointer px-3 py-1 rounded-full text-xs font-semibold ${
                              isActive
                                ? "bg-green-500/20 cursor-pointer text-green-300"
                                : "bg-red-500/20 cursor-pointer text-red-300"
                            }`}
                          >
                            {isActive ? "Active" : "Deactive"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {isActive ? (
                            <button
                              onClick={() => handleDeactivate(user._id)}
                              className="text-red-400 cursor-pointer hover:text-red-300 transition transform hover:scale-110"
                              title="Deactivate"
                            >
                              <FaToggleOn size={28} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivate(user)}
                              className="text-gray-500 cursor-pointer hover:text-green-400 transition transform hover:scale-110"
                              title="Activate"
                            >
                              <FaToggleOff size={28} />
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* মডাল - কমিশন আপডেট */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-8 rounded-2xl max-w-md w-full border border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Set Commissions: {selectedUser.username}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Commission (%)</label>
                <input
                  type="number"
                  name="commission"
                  defaultValue={selectedUser.commission || 0}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Deposit Commission (%)</label>
                <input
                  type="number"
                  name="depositCommission"
                  defaultValue={selectedUser.depositCommission || 0}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Game Commission (%)</label>
                <input
                  type="number"
                  name="gameCommission"
                  defaultValue={selectedUser.gameCommission || 0}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={approveMutation.isPending}
                  className="flex-1 bg-green-500 cursor-pointer hover:bg-green-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  {approveMutation.isPending ? "Updating..." : "Update and Active"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 bg-gray-700 cursor-pointer hover:bg-gray-600 text-white py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyDownline;