import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { username, email, whatsapp, password, referral } = req.body;

  try {
    // ইউজার আগে থেকে আছে কিনা?
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
      role: referral ? "master-affiliate" : "super-affiliate",
      referredBy,
      isActive: referral ? false : true, // রেফারেল হলে পেন্ডিং
    });

    const savedUser = await user.save();

    // রেফারারের pendingRequests এ নতুন ইউজার যোগ করো
    if (referredBy) {
      await Admin.findByIdAndUpdate(referredBy, {
        $push: { pendingRequests: savedUser._id },
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
        isActive: savedUser.isActive,
        referralCode: savedUser.referralCode,
        referralLink: `${process.env.VITE_API_URL}/register?ref=${savedUser.referralCode}`,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
});

// routes/auth.js
router.post("/main/register", async (req, res) => {
  const { username, email, whatsapp, password, referral } = req.body;

  try {
    // ইউজার আগে থেকে আছে?
    const exists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: "User already exists" });

    let referredBy = null;
    let newUserRole = "user"; // ডিফল্ট রোল

    if (referral) {
      const referrer = await Admin.findOne({ referralCode: referral });
      if (!referrer) return res.status(400).json({ message: "Invalid referral code" });

      referredBy = referrer._id;

      // রেফারারের রোল চেক করে নতুন ইউজারের রোল নির্ধারণ
      if (referrer.role === "super-affiliate") {
        newUserRole = "master-affiliate";
      } else if (referrer.role === "master-affiliate") {
        newUserRole = "user";
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // isActive লজিক: শুধু master-affiliate হলে false
    const isActive = newUserRole === "master-affiliate" ? false : true;

    const user = new Admin({
      username,
      email,
      whatsapp,
      password: hashedPassword,
      role: newUserRole,
      referredBy,
      isActive,
    });

    const savedUser = await user.save();

    // রেফারারের ডাটা আপডেট
    if (referredBy) {
      await Admin.findByIdAndUpdate(referredBy, {
        $push: { pendingRequests: savedUser._id },
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
        isActive: savedUser.isActive,
        referralCode: savedUser.referralCode,
        referralLink: `${process.env.VITE_API_URL}/register?ref=${savedUser.referralCode}`,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is pending approval" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        referralCode: user.referralCode,
        referralLink: `${process.env.VITE_API_URL}/register?ref=${user.referralCode}`,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// routes/admin.js
router.get("/admin", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(401).json({ message: "No user ID" });

    const user = await Admin.findById(id)
      .select("-password")
      .populate({
        path: "pendingRequests",
        select: "username email whatsapp balance password isActive commission depositCommission gameCommission",
      })
      .populate({
        path: "createdUsers",
        select: "username email whatsapp balance password isActive commission depositCommission gameCommission",
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// routes/admin.js → PATCH /approve-user/:id
router.patch("/approve-user/:id", async (req, res) => {
  const { id } = req.params;
  const { commission = 0, depositCommission = 0, gameCommission = 0 } = req.body;

  try {
    const user = await Admin.findByIdAndUpdate(
      id,
      {
        isActive: true,
        commission: Number(commission),
        depositCommission: Number(depositCommission),
        gameCommission: Number(gameCommission),
      },
      { new: true }
    ).select("username email whatsapp isActive commission depositCommission gameCommission");

    if (!user) return res.status(404).json({ message: "User not found" });

    // pendingRequests থেকে রিমুভ + createdUsers এ যোগ
    if (user.referredBy) {
      await Admin.findByIdAndUpdate(user.referredBy, {
        $pull: { pendingRequests: id },
      });
    }

    res.json({ message: "User updated & activated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /deactivate-user/:id
router.patch("/deactivate-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Admin.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deactivated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const { userId, firstName, lastName, username, email, whatsapp, password } =
      req.body;

    // userId ছাড়া হলে এরর
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // আপডেট ফিল্ড
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.whatsapp = whatsapp || user.whatsapp;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // রেসপন্স
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      whatsapp: user.whatsapp,
      referralCode: user.referralCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/update-user-credentials/:id
router.patch("/update-master-affiliate-credentials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ইউজারনেম আপডেট
    if (username && username !== user.username) {
      const existing = await Admin.findOne({ username });
      if (existing) return res.status(400).json({ message: "Username already taken" });
      user.username = username;
    }

    // পাসওয়ার্ড আপডেট (যদি দেওয়া থাকে)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// routes/admin.js
router.get("/super-affiliates", async (req, res) => {
  try {
    const superAffiliates = await Admin.find({ role: "super-affiliate" })
      .select("username email whatsapp balance password isActive commission depositCommission gameCommission");

    res.json({ users: superAffiliates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;