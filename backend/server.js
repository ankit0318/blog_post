const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Swagger docs

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); // Add alternative route for docs

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: API health check
 *     description: Returns a simple message to confirm the API is running
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Blog API is running
 */
app.get("/", (req, res) => {
  res.send("Blog API is running");
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     description: Simple test endpoint that logs to console and returns a response
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Test OK
 */
app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("Test OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/docs`
  );
});
