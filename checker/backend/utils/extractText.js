const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

async function extractText(filePath) {
  const ext = path.extname(filePath);
  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (ext === ".docx") {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  } else if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }
  return "";
}

module.exports = extractText;
