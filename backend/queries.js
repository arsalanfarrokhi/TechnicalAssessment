// Import the pg module to use the Pool class for PostgreSQL connection pooling
const Pool = require("pg").Pool;

// Create a new instance of the Pool to manage database connections
const pool = new Pool({
  user: "arsal",         // Database username
  host: "localhost",     // Database host (localhost in this case)
  database: "api",       // Database name
  password: "134213",    // Database password
  port: 5432,            // PostgreSQL default port
});

// Function to retrieve all users from the 'users' table
const getUsers = (request, response) => {
  // Execute a query to select all rows from the 'users' table
  pool.query("SELECT * FROM users;", (error, results) => {
    if (error) {
      // If there's an error with the query, throw it
      throw error;
    }
    // If no error, send a JSON response with the query results
    response.status(200).json(results.rows);
  });
};

// Function to create a new user in the 'users' table
const createUser = (request, response) => {
  // Destructure name and email from the request body
  const { name, email } = request.body;

  // Execute an INSERT query to add a new user to the 'users' table
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", // Using parameterized queries to prevent SQL injection
    [name, email],  // Values to insert into the query
    (error, results) => {
      if (error) {
        // If there's an error with the query, throw it
        throw error;
      }
      // If no error, send a response confirming the user was added with their ID
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// Function to update an existing user in the 'users' table
const updateUser = (request, response) => {
  // Get the user ID from the request parameters and parse it as an integer
  const id = parseInt(request.params.id);
  // Destructure name and email from the request body
  const { name, email } = request.body;

  // Execute an UPDATE query to modify an existing user's details based on their ID
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],  // Values to update in the query
    (error, results) => {
      if (error) {
        // If there's an error with the query, throw it
        throw error;
      }
      // If no error, send a response confirming the user was updated
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// Function to delete a user from the 'users' table
const deleteUser = (request, response) => {
  // Get the user ID from the request parameters and parse it as an integer
  const id = parseInt(request.params.id);

  // Execute a DELETE query to remove the user with the given ID
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      // If there's an error with the query, throw it
      throw error;
    }
    // If no error, send a response confirming the user was deleted
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

// Export the functions to be used in other parts of the application
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
