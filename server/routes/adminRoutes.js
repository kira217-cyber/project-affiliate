import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { username, email, whatsapp, password, referral } = req.body;

  try {
    const exists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: "User already exists" });

    let referredBy = null;
    if (referral) {
      const referrer = await Admin.findOne({ referralCode: referral });
      if (!referrer) return res.status(400).json({ message: "Invalid referral code" });
      referredBy = referrer._id;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Admin({
      username,
      email,
      whatsapp,
      password: hashedPassword,
      role: referral ? "normal-affiliate" : "super-affiliate",
      referredBy,
    });

    const savedUser = await user.save();

    if (referredBy) {
      await Admin.findByIdAndUpdate(referredBy, {
        $push: { createdUsers: savedUser._id },
      });
    }

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        referralCode: savedUser.referralCode,
        referralLink: `${process.env.VITE_API_URL}/register?ref=${savedUser.referralCode}`,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // ১. ইউজার খুঁজো
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // ২. পাসওয়ার্ড মিলছে কিনা চেক
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // ৩. লগইন সফল → ইউজার ডাটা রিটার্ন (পাসওয়ার্ড বাদ)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        referralLink: `${process.env.VITE_API_URL}/register?ref=${user.referralCode}`,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /me — লগইন ইউজার (localStorage থেকে userId নেয়া)
router.get("/admin", async (req, res) => {
  try {
    // পরিবর্তে: ফ্রন্টএন্ড থেকে query param দিয়ে পাঠাবে
    const id = req.query.id;
    if (!id) return res.status(401).json({ message: "No user ID" });

    const user = await Admin.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        referralLink: `${process.env.VITE_API_URL}/register?ref=${user.referralCode}`,
        createdUsers: user.createdUsers,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;