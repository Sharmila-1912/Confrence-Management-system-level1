const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const paperRoutes = require("./routes/paperRoutes");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/research_db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

app.use("/api/papers", paperRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
