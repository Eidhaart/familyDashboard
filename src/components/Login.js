import React, { useState } from "react";

function Login({ onUserIdSubmit, accentColor }) {
  // Initialize state
  const [userId, setUserId] = useState("");
  // Function to handle changes in the input field
  const handleInputChange = (e) => {
    // Updating the state 'userId' with the current value of the input field
    setUserId(e.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();
    // Saving the user ID to the local storage of the browser
    localStorage.setItem("userId", userId);
    // Call the passed in function with the new userId
    onUserIdSubmit(userId);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
          placeholder="Enter User ID"
          className="mb-4 p-3 rounded bg-gray-700 text-white placeholder-${accentColor}-300 focus:outline-none focus:ring-2 focus:ring-${accentColor}-500"
        />
        <button
          type="submit"
          className={`p-3 bg-${accentColor}-600 text-white rounded hover:bg-${accentColor}-700 transition-colors`}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
