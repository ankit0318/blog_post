// Script to create the database if it doesn't exist
const mysql = require("mysql2/promise");
require("dotenv").config();

// Update these values to match your MySQL setup
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "blog_post";

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Database '${DB_NAME}' ensured.`);
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err.message);
    process.exit(1);
  }
}

createDatabase();
