const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/env.config");
const connectDb = require("./config/db.config");
const apiRoutes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDb();

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello Kairo 🚀" });
});

// API routes
app.use("/api", apiRoutes); // ONE LINE for all routes!

// Start server
app.listen(PORT, () =>
  console.log(`
    ==========================
    🚀 Server is live!
    🌐 URL: http://localhost:${PORT}
    📦 Mode: ${process.env.NODE_ENV || "development"}
    ==========================
  `)
);
