// Import required libraries
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
var cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
var express = require("express"); // Web framework for building the server
const db = require("./queries"); // Import database query functions from queries.js
var app = express(); // Create an Express app instance

// Define the port where the server will listen
const port = 3000;

// Apply middleware
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use(
  bodyParser.urlencoded({
    extended: true, // Parse URL-encoded bodies, e.g., form data
  })
);

// Define a route to check if the server is running
app.get("/", (request, response) => {
  // Send a simple JSON response to confirm server is running
  response.json({ info: "Server is running" });
});

// Define routes for handling user-related requests
app.get("/users", db.getUsers); // Handle GET request to retrieve all users
app.post("/users", db.createUser); // Handle POST request to create a new user
app.put("/users/:id", db.updateUser); // Handle PUT request to update an existing user by ID
app.delete("/users/:id", db.deleteUser); // Handle DELETE request to delete a user by ID

// Error handling middleware for general server errors
app.use((req, res, next) => {
  const error = new Error("Something went wrong");
  next(error); // Pass the error to the next error-handling middleware
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message); // Log the error message to the console
  res.status(500).send("Internal Server Error"); // Send a 500 response with a generic error message
});

// Start the Express app and listen on the specified port
app.listen(port, () => {
  console.log(`App running on port ${port}.`); // Log a message confirming the app is running
});
