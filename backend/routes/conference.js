// // backend/routes/conference.js
// const express = require("express");
// const router = express.Router();
// const Conference = require("../models/Conference");
// const jwt = require("jsonwebtoken");

// // Middleware to authenticate users
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Register for conference
// router.post("/register", authMiddleware, async (req, res) => {
//   try {
//     const { paperTitle, numberOfParticipants, participants, conferenceVenue, conferenceDate } = req.body;

//     if (numberOfParticipants < 1 || numberOfParticipants > 3) {
//       return res.status(400).json({ message: "Number of participants must be between 1 and 3" });
//     }

//     if (participants.length !== numberOfParticipants) {
//       return res.status(400).json({ message: "Please provide participant details correctly" });
//     }

//     const newConference = new Conference({
//       userId: req.user.id,
//       paperTitle,
//       numberOfParticipants,
//       participants,
//       conferenceVenue,
//       conferenceDate,
//     });

//     await newConference.save();
//     res.json({ message: "Conference registered successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get all conferences of logged-in user
// router.get("/my-conferences", authMiddleware, async (req, res) => {
//   try {
//     const conferences = await Conference.find({ userId: req.user.id });
//     res.json(conferences);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// module.exports = router;

// backend/routes/conference.js
const express = require("express");
const router = express.Router();
const Conference = require("../models/Conference");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Middleware to authenticate users
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Setup Nodemailer (using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Register for conference + send email
router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { paperTitle, numberOfParticipants, participants, conferenceVenue, conferenceDate } = req.body;

    if (numberOfParticipants < 1 || numberOfParticipants > 3) {
      return res.status(400).json({ message: "Number of participants must be between 1 and 3" });
    }

    if (participants.length !== numberOfParticipants) {
      return res.status(400).json({ message: "Please provide participant details correctly" });
    }

    // Save conference registration
    const newConference = new Conference({
      userId: req.user.id,
      paperTitle,
      numberOfParticipants,
      participants,
      conferenceVenue,
      conferenceDate,
    });

    await newConference.save();

    // ✅ Send confirmation emails to all participants
    for (const participant of participants) {
      const confDate = new Date(conferenceDate);
      const submissionDeadline = new Date(confDate);
      submissionDeadline.setDate(confDate.getDate() - 14); // 2 weeks before

      const mailOptions = {
        from: `"R&D Cell - Kongu Engineering College" <${process.env.EMAIL_USER}>`,
        to: participant.email,
        subject: `Conference Registration Confirmation - ${paperTitle}`,
        html: `
          <h2>Dear ${participant.name},</h2>
          <p>You have been successfully registered for the upcoming conference.</p>
          <p><b>Paper Title:</b> ${paperTitle}</p>
          <p><b>College:</b> ${participant.college || "N/A"}</p>
          <p><b>Venue:</b> ${conferenceVenue}</p>
          <p><b>Conference Date:</b> ${new Date(conferenceDate).toDateString()}</p>
          <br/>
          <p>📌 Please submit your paper as soon as possible.</p>
          <p>🗓️ <b>Last Date for Paper Submission:</b> ${submissionDeadline.toDateString()}</p>
          <br/>
          <p>Thank you,<br/>R&D Cell<br/>Kongu Engineering College</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: "Conference registered and confirmation emails sent!" });
  } catch (err) {
    console.error("Error during conference registration:", err);
    res.status(500).json({ message: "Server error while registering conference" });
  }
});

// ✅ Get all conferences of logged-in user
router.get("/my-conferences", authMiddleware, async (req, res) => {
  try {
    const conferences = await Conference.find({ userId: req.user.id });
    res.json(conferences);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
