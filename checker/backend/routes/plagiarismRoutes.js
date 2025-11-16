const express = require("express");
const multer = require("multer");
const getAccessToken = require("../utils/copyleaksAuth");
const submitFileToCopyleaks = require("../utils/copyleaksSubmit");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File missing" });

    const token = await getAccessToken();
    const scanId = "scan_" + Date.now();

    const result = await submitFileToCopyleaks(scanId, req.file.path, token);

    res.json({
      message: "File uploaded successfully.",
      scanId,
      result
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

module.exports = router;
