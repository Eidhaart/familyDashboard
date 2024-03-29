import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Adjust the import path according to your project structure

const ItemsList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const startTime = new Date("2021-01-01").getTime(); // Customize the start time as needed
        const endTime = new Date().getTime(); // Represents the current time
        const snapshot = await db
          .firestore()
          .collection("todos")
          .where("createdAt", ">=", new Date(startTime))
          .where("createdAt", "<=", new Date(endTime))
          .get();

        const todosList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosList);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todos List</h2>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.name} - Added on: {todo.createdAt.toDate().toDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
};

export default ItemsList;
