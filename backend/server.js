// // backend/server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");
// const conferenceRoutes = require("./routes/conference");
// //const paperRoutes = require("./routes/paper");

// const app = express();

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // For form-data compatibility

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/conference", conferenceRoutes);


// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 API is running successfully...");
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const conferenceRoutes = require("./routes/conference");
const paperRoutes = require("../back/routes/paperRoutes"); // <-- import paper routes

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-data compatibility

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conference", conferenceRoutes);
app.use("/api/papers", paperRoutes); // <-- mount paper routes

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
