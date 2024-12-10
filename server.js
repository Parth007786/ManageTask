const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const errorHandler = require("./backend/middlewares/errorHandler");
const path = require("path");

dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 6565;
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error Handler Middleware
app.use(errorHandler);
// API Routes
app.use("/api/user", require("./backend/routes/userRoute"));
app.use("/api/auth", require("./backend/routes/auth"));

app.use("/api/tasks", require("./backend/routes/taskRoute"));
// Serve Static Frontend in Production

let NODE_ENV = "production";
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/uploads"));
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running...!!");
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
