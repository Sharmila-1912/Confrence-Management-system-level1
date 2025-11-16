const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const plagiarismRoutes = require("./routes/plagiarismRoutes");
const copyleaksWebhook = require("./routes/copyleaksWebhook");   // ✅ ADDED

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Upload directory
const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use("/uploads", express.static(path.join(__dirname, uploadDir)));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Main plagiarism routes
app.use("/api/plagiarism", plagiarismRoutes);

// ✅ Copyleaks webhook listener routes
app.use("/api/copyleaks", copyleaksWebhook);   // ✅ REQUIRED!!

app.get("/", (req, res) => res.send("Plagiarism Checker Backend Running"));

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
