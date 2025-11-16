// backend/utils/plagiarismCheck.js
const axios = require("axios");

async function checkPlagiarism(text) {
  try {
    const response = await axios.post(
      "https://api.copyleaks.com/v3/scans/submit/url",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.COPYLEAKS_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Plagiarism check error:", error.message);
    throw error;
  }
}

module.exports = checkPlagiarism;
