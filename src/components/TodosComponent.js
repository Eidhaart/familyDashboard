import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase"; // Ensure this path matches your Firebase configuration file

function TodosComponent() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Query todos collection for items associated with the current userId
        const q = query(collection(db, "todos"));
        const querySnapshot = await getDocs(q);
        const allTodos = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTodos(allTodos);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, []); // Re-fetch todos when userId changes

  const removeTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      setTodos(todos.filter((todo) => todo.id !== todoId)); // Optimistically remove the todo from UI
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <div>
      <h2>Todos List</h2>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <p>{todo.name}</p>
          </div>
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}

export default TodosComponent;
