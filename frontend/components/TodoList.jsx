// Import necessary modules from React and Axios
import React, { useEffect, useState } from "react";
const axios = require("axios");

// Component for displaying and managing a to-do list
const TodoList = () => {
  // State for storing the list of items and the value of the new item input field
  const [items, setItems] = useState([]); // List of to-do items
  const [newItem, setNewItem] = useState(""); // The input for a new to-do item

  // useEffect to fetch initial data when the component is mounted
  useEffect(() => {
    // Asynchronous function to get items from a mock API
    const fetchItems = async () => {
      try {
        // Send a GET request to the mock API to retrieve items
        const response = await axios.get(
          "https://6737f0ef4eb22e24fca683bd.mockapi.io/items"
        );

        // Extract only the 'Action' values from the response data
        const actions = response.data.map((item) => item.Action);
        // Set the extracted actions in the state for items
        setItems(actions);
      } catch (err) {
        // Log an error if the fetch fails
        console.error("Failed to fetch items:", err);
      }
    };

    // Call the function to fetch items
    fetchItems();
  }, []); // Empty dependency array means this runs only once when the component is first rendered

  // Handler function to update the newItem state whenever the input changes
  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  // Handler function to add a new item to the list
  const handleAddItem = () => {
    // Only add the item if the input is not empty or whitespace
    if (newItem.trim() !== "") {
      // Update the list of items with the new item and clear the input field
      setItems([...items, newItem]);
      setNewItem(""); // Clear the input after adding the item
    }
  };

  // Render the component
  return (
    <div
      style={{
        maxWidth: "400px", // Maximum width of the container
        margin: "0 auto",  // Center the container horizontally
        padding: "20px",   // Padding inside the container
        border: "1px solid #ddd", // Light gray border
      }}
    >
      <h2>To-Do List</h2>

      {/* Input field for adding a new item */}
      <input
        type="text"
        value={newItem} // Controlled input with the current value of newItem
        onChange={handleInputChange} // Update newItem on input change
        placeholder="Add a new task" // Placeholder text
        style={{ width: "70%", padding: "10px", marginRight: "10px" }} // Styling for the input field
      />

      {/* Button to add the new item */}
      <button onClick={handleAddItem} style={{ padding: "10px" }}>
        Add
      </button>

      {/* Unordered list of to-do items */}
      <ul style={{ marginTop: "20px", listStyleType: "none", paddingLeft: 0 }}>
        {items.map((item, index) => (
          // Render each item in the list
          <li
            key={index} // Unique key for each list item
            style={{ padding: "10px 0", borderBottom: "1px solid #eee" }} // Styling for each list item
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the TodoList component as the default export
export default TodoList;
