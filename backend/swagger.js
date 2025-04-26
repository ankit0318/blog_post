const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API documentation for the Blog application",
      contact: {
        name: "Ankit Sharma",
        email: "ankitsharma0318@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://blog-post-ltyk.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "./routes/*.js"),
    path.resolve(__dirname, "./server.js"),
  ], // Path to the API docs with absolute paths
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

module.exports = specs;
