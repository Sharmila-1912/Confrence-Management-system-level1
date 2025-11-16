const express = require("express");
const router = express.Router();

router.post("/status", (req, res) => {
  console.log("📌 Copyleaks STATUS:", req.body);
  res.sendStatus(200);
});

router.post("/completed", (req, res) => {
  console.log("✅ Copyleaks COMPLETED RESULT:", req.body);
  res.sendStatus(200);
});

module.exports = router;
