const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  date: String,
  email: String,
  title: String,
  abstract: String,
  filePath: String,
  fileName: String,
  paperId: String,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Paper", paperSchema);
