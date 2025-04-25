const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Blog API is running");
});
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
