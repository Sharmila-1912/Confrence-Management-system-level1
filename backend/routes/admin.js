const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Conference = require("../models/Conference");
const Paper = require("../../back/models/Paper"); // <--- import Paper model from paper backend
const axios = require("axios");
// ---------------- Get all registered users ----------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v"); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ---------------- Get all conference submissions ----------------
router.get("/conferences", async (req, res) => {
  try {
    const conferences = await Conference.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(conferences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch conferences" });
  }
});

// ---------------- Get all paper submissions ----------------
router.get("/papers", async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch papers" });
  }
});



// GET all paper submissions (fetch from paper backend)
router.get("/papers", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5001/api/papers"); // paper backend
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch papers" });
  }
});


module.exports = router;
