// Import React and the TodoList component from the components folder
import React from "react";
import TodoList from "../components/TodoList";

// TodoPage component definition
const TodoPage = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      {/* Heading for the to-do page */}
      <h1>My To-Do App</h1>

      {/* Render the TodoList component */}
      <TodoList />
    </div>
  );
};

// Export the TodoPage component as the default export
export default TodoPage;
