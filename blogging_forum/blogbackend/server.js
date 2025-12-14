const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors(
  // TIP: For production, it's safer to specify your frontend URL here:
  // { origin: ["https://your-frontend-site.netlify.app"], credentials: true }
));
app.use(express.json()); // Allow sending JSON data (req.body)
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

// Test Route (Helpful to check if Vercel is working)
app.get("/", (req, res) => {
  res.send("API is running successfully on Vercel!");
});

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- VERCEL DEPLOYMENT CONFIGURATION ---

// 1. Export the app for Vercel (Required)
module.exports = app;

// 2. Only listen to port if running locally (Not on Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}