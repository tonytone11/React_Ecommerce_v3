import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Initialize Express application instance
const app = express();

// Load environment variables from a .env file into process.env
dotenv.config();

// Get the current file's absolute path (works with ES modules)
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = path.dirname(__filename);

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// Parse incoming JSON payloads in request bodies
app.use(express.json());

// Serve static files from the 'build' directory (typically for React frontend)
app.use(express.static(path.join(__dirname, "../build")));

// Set server port from environment variables, fallback to 3000 if not set
const port = process.env.PORT || 3000;

// Create MySQL connection pool with configuration from environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test database connection on server startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit process on connection failure
    }
    console.log("Connected to the MySQL database!");
    connection.release(); // Return connection to pool
});

// API endpoint to fetch all products
app.get("/api/products", (req, res) => {
    // Query database for product information
    pool.query("SELECT image, name, price, description FROM Gaming_Products", function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }
        // Send query results as JSON response
        res.json(result);
        console.log(result);
    });
});

// Catch-all route to serve React app for any unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start Express server and listen on specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
