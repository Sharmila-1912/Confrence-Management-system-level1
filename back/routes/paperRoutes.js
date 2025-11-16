const express = require("express");
const multer = require("multer");
const path = require("path");
const Paper = require("../models/Paper");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// ---------------- Multer storage ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ---------------- Submit Paper ----------------
router.post("/submit", upload.single("file"), async (req, res) => {
  try {
    const { firstName, lastName, date, email, title, abstract } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "File is required" });

    const paperId = "IEE-" + Math.floor(1000 + Math.random() * 9000);

    const newPaper = new Paper({
      firstName,
      lastName,
      date,
      email,
      title,
      abstract,
      filePath: `/uploads/${file.filename}`, // store relative path
      fileName: file.originalname,
      paperId,
    });

    await newPaper.save();

    // ---------------- Send confirmation email ----------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmation of Paper Submission – ${paperId}`,
      text: `
Dear ${firstName} ${lastName},

We are pleased to inform you that your paper titled "${title}" has been successfully submitted for consideration at the IEE Scholar Connect Conference.

Submission Details:
• Paper ID: ${paperId}
• Authors: ${firstName} ${lastName}
• Conference Name: IEE Scholar Connect Conference
• Date of Submission: ${date}

Our review committee will evaluate your submission, and the decision will be communicated to you by 30/11/2025.

If you have any questions or wish to update your submission, please contact us at ieescholarconnect@gmail.com with your Paper ID in the subject line.

Thank you for your valuable contribution to the conference.

Best regards,  
IEE Scholar Connect Team
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent to:", email);

    res.status(201).json({
      message: "Paper submitted successfully. Confirmation email sent.",
      paperId,
      paper: newPaper,
    });
  } catch (error) {
    console.error("Error saving paper:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- Get all papers (for admin) ----------------
router.get("/", async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    console.error("Error fetching papers:", err);
    res.status(500).json({ message: "Failed to fetch papers" });
  }
});

// ---------------- Serve uploaded files ----------------
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
