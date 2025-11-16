// backend/models/Conference.js
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: String },
});

const conferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  paperTitle: { type: String, required: true },
  numberOfParticipants: { type: Number, required: true },
  participants: [participantSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conference", conferenceSchema);
