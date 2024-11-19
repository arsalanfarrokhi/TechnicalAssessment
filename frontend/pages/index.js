// Import the Link component from Next.js to handle client-side navigation
import Link from "next/link";

// HomePage component definition
const HomePage = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      {/* Heading for the home page */}
      <h1>Welcome to My Next.js To-Do App</h1>

      {/* Link to navigate to the To-Do list page */}
      <Link href="/todo">Go to To-Do List</Link>
    </div>
  );
};

// Export the HomePage component as the default export
export default HomePage;
