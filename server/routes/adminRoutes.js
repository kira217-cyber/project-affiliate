import express from "express";
import Admins from "../models/Admin.js";

const router = express.Router();

// 🔹 CREATE User
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new Admins({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 READ all Users
router.get("/", async (req, res) => {
  try {
    const users = await Admins.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 READ single User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Admins.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 UPDATE User
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await Admins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 DELETE User
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Admins.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
