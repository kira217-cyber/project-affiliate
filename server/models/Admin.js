// models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["super-affiliate", "master-affiliate"],
    default: "super-affiliate",
  },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],

  isActive: { type: Boolean, default: false },
  balance: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  depositCommission: { type: Number, default: 0 },
  gameCommission: { type: Number, default: 0 },

  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
}, { timestamps: true });

adminSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = this._id.toString().slice(-6).toUpperCase();
  }
  next();
});

export default mongoose.model("Admin", adminSchema);