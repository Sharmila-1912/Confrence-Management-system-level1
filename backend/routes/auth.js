const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------- Register ----------------
router.post("/register", async (req, res) => {
  const { name, email, degree, upg, phone, college, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, degree, upg, phone, college, password: hashedPassword });
    await newUser.save();

    // Send registration email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration Successful",
      text: `Hi ${name},\nYour registration is successful!`,
    });

    res.status(201).json({ message: "Registration successful! Check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ---------------- Login ----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin shortcut
  if(email === "researchclub.kec@gmail.com" && password === "admin123") {
    return res.json({ role: "admin" });
  }

  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ role: "user", token, name: user.name });
  } catch(err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ---------------- Forgot Password ----------------
router.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "Email not registered" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Hi ${user.name},\nYour password has been reset successfully.`,
    });

    res.json({ message: "Password reset successful! Check your email." });
  } catch(err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
