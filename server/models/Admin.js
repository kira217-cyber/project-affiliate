import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["super-affiliate", "normal-affiliate"],
    default: "super-affiliate",
  },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],

  // নতুন ফিল্ড
  isActive: { type: Boolean, default: false },
  commission: { type: Number, default: 0 },
  depositCommission: { type: Number, default: 0 },
  gameCommission: { type: Number, default: 0 },

  // পেন্ডিং রিকোয়েস্ট
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
}, { timestamps: true });

adminSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = this._id.toString().slice(-6).toUpperCase();
  }
  next();
});

export default mongoose.model("Admin", adminSchema);