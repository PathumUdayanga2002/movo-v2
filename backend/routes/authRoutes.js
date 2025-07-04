const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_CODE;

router.post("/register-admin", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({
      id: new mongoose.Types.ObjectId().toString(),
      name,
      email,
      password,
      role: "admin"
    });
    await user.save();
    res.status(201).json({ message: "Admin created successfully....!", id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register-presenter", async (req, res) => {
  const { id, name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    // Check if ID already exists
    const existingId = await User.findOne({ id });
    if (existingId) {
      return res.status(400).json({ message: "ID already in use" });
    }

    const user = new User({
      id,
      name,
      email,
      password,
      role: "presenter",
    });
    await user.save();
    res.status(201).json({ message: "Presenter created successfully!" });
  } catch (error) {
    console.error("Presenter registration error:", error);
    res.status(500).json({ message: "Failed to register presenter. Please try again.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, role: user.role , name:user.name});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
