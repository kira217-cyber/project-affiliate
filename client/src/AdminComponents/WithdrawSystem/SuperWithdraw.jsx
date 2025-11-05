// src/AdminComponents/WithdrawSystem/SuperWithdraw.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, X, Save, Loader2, 
  Smartphone, Building2, User, Store, Trash2 // Delete আইকন
} from 'lucide-react';
import { toast } from 'react-toastify';

const SuperWithdraw = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ methodName: '', paymentTypes: '', minAmount: '', maxAmount: '' });
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false); // নতুন
  const [deleteId, setDeleteId] = useState(null); // নতুন
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false); // নতুন
  const adminId = localStorage.getItem('userId');

  useEffect(() => {
    if (adminId) fetchMethods();
  }, [adminId]);

  const fetchMethods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/withdraw/methods/${adminId}`);
      setMethods(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name.includes('Amount') ? value : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        adminId,
        methodName: form.methodName.trim(),
        paymentTypes: form.paymentTypes.split(',').map(t => t.trim()).filter(t => t),
        minAmount: Number(form.minAmount),
        maxAmount: Number(form.maxAmount),
      };

      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/withdraw/method/${editId}`, data);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/withdraw/method`, data);
      }

      fetchMethods();
      toast.success(editId ? "মেথড আপডেট হয়েছে" : "নতুন মেথড যোগ হয়েছে");
      closeModal();
    } catch (err) {
      toast.error("সেভ করতে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (method) => {
    setForm({
      methodName: method.methodName,
      paymentTypes: method.paymentTypes.join(', '),
      minAmount: method.minAmount,
      maxAmount: method.maxAmount,
    });
    setEditId(method._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ methodName: '', paymentTypes: '', minAmount: '', maxAmount: '' });
  };

  // Delete ফাংশন
  const openDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const closeDelete = () => {
    setDeleteModal(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/withdraw/method/${deleteId}`);
      fetchMethods();
      toast.success("মেথড ডিলিট হয়েছে");
      closeDelete();
    } catch (err) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
    } finally {
      setDeleting(false);
    }
  };

  const getMethodIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('bkash')) return <Smartphone className="w-6 h-6" />;
    if (lower.includes('nagad')) return <Smartphone className="w-6 h-6" />;
    if (lower.includes('rocket')) return <Smartphone className="w-6 h-6" />;
    if (lower.includes('bank')) return <Building2 className="w-6 h-6" />;
    return <Smartphone className="w-6 h-6" />;
  };

  const getTypeChip = (type) => {
    const lower = type.toLowerCase();
    if (lower === 'personal') return { icon: <User size={14} />, color: 'bg-blue-100 text-blue-700' };
    if (lower === 'agent') return { icon: <Store size={14} />, color: 'bg-green-100 text-green-700' };
    if (lower === 'merchant') return { icon: <Building2 size={14} />, color: 'bg-purple-100 text-purple-700' };
    return { icon: <User size={14} />, color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <>
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-6"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
              সুপার উইথড্র সিস্টেম
            </h1>
            <p className="text-white/80 text-lg">পেমেন্ট মেথড ম্যানেজ করুন</p>
          </motion.div>

          {/* Add Button */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 text-center"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Plus size={24} />
              নতুন মেথড যোগ করুন
            </button>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}

          {/* Methods Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {methods.map((method, index) => (
                <motion.div
                  key={method._id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-xl flex items-center justify-center">
                        {getMethodIcon(method.methodName)}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(method)}
                          className="bg-white/20 backdrop-blur p-2 rounded-lg hover:bg-white/30"
                        >
                          <Edit2 size={18} className="text-white" />
                        </button>
                        <button
                          onClick={() => openDelete(method._id)}
                          className="bg-red-500/20 backdrop-blur p-2 rounded-lg hover:bg-red-500/30"
                        >
                          <Trash2 size={18} className="text-red-300" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{method.methodName}</h3>

                    <div className="space-y-3 text-white/90">
                      <p className="flex justify-between">
                        <span>মিনিমাম:</span>
                        <span className="font-semibold">৳{method.minAmount}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>ম্যাক্সিমাম:</span>
                        <span className="font-semibold">৳{method.maxAmount}</span>
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {method.paymentTypes.map((type, i) => {
                          const chip = getTypeChip(type);
                          return (
                            <span
                              key={i}
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${chip.color}`}
                            >
                              {chip.icon}
                              {type}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {!loading && methods.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white/10 backdrop-blur rounded-3xl p-12 max-w-md mx-auto">
                <div className="bg-white/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Plus size={48} className="text-white/60" />
                </div>
                <p className="text-white/80 text-lg">কোনো পেমেন্ট মেথড যোগ করা হয়নি</p>
                <p className="text-white/60 text-sm mt-2">নতুন মেথড যোগ করতে উপরের বাটনে ক্লিক করুন</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full max-h-screen overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {editId ? 'মেথড এডিট করুন' : 'নতুন মেথড যোগ করুন'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    মেথড নাম
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    name="methodName"
                    type="text"
                    required
                    value={form.methodName}
                    onChange={handleChange}
                    placeholder="যেমন: bKash, Nagad, Rocket"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পেমেন্ট টাইপ (কমা দিয়ে আলাদা করুন)
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    name="paymentTypes"
                    type="text"
                    required
                    value={form.paymentTypes}
                    onChange={handleChange}
                    placeholder="personal, agent, merchant"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">উদাহরণ: personal, agent, merchant</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      মিনিমাম অ্যামাউন্ট
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      name="minAmount"
                      type="number"
                      required
                      value={form.minAmount}
                      onChange={handleChange}
                      placeholder="100"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ম্যাক্সিমাম অ্যামাউন্ট
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      name="maxAmount"
                      type="number"
                      required
                      value={form.maxAmount}
                      onChange={handleChange}
                      placeholder="50000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-800"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      সেভ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {editId ? 'আপডেট করুন' : 'সেভ করুন'}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
            onClick={closeDelete}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Trash2 size={32} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">ডিলিট করবেন?</h3>
                <p className="text-gray-600">এই মেথড স্থায়ীভাবে মুছে যাবে।</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeDelete}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  বাতিল
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      ডিলিট হচ্ছে...
                    </>
                  ) : (
                    'হ্যাঁ, ডিলিট করুন'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SuperWithdraw;