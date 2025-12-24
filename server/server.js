const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/database"); // ← Đổi từ connectDB
const visitRoutes = require("./routes/visits");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Connect to Database
connectDB(); // ← Giữ nguyên

// Routes
app.use("/api", visitRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running with MySQL" });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
