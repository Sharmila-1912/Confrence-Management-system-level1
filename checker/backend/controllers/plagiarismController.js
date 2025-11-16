const path = require("path");
const checkWithCopyleaks = require("../utils/copyleaks");

exports.checkPlagiarism = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const uploadedPath = path.resolve(req.file.path);
    const report = await checkWithCopyleaks(uploadedPath);

    res.json({
      message: "Plagiarism check submitted successfully.",
      report,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking plagiarism" });
  }
};
