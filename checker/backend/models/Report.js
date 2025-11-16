const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  scanId: String,
  filename: String,
  filepath: String,
  plagiarismScore: Number,
  status: { type: String, default: "processing" },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);
