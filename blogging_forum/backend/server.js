const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();


app.use(cors(
  // TIP: For production, it's safer to specify your frontend URL here:
  // { origin: ["https://your-frontend-site.netlify.app"], credentials: true }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));


app.get("/", (req, res) => {
  res.send("API is running successfully on Vercel!");
});


app.use((err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});



module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}