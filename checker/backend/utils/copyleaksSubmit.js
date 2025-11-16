const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function submitFileToCopyleaks(scanId, filePath, token) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString("base64");

    const fileName = path.basename(filePath);  // ✅ clean filename like "test.pdf"

    const body = {
      base64,
      filename: fileName,

      properties: {
        sandbox: false,
        includeHtml: true,

        // ✅ REQUIRED WEBHOOKS
        webhooks: {
          status: "http://localhost:5000/api/copyleaks/status",   // REQUIRED
          completion: "http://localhost:5000/api/copyleaks/completed"
        }
      }
    };

    const res = await axios.put(
      `https://api.copyleaks.com/v3/scans/submit/file/${scanId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data;
  } catch (err) {
    console.log("❌ Copyleaks Upload Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = submitFileToCopyleaks;
