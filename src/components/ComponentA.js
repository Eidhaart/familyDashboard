import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
  where,
  query,
  Timestamp, // Import Timestamp here
} from "firebase/firestore";

import { db } from "./firebase"; // Adjust the path as necessary
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import InfoModal from "./InfoModal";

const ComponentA = ({ userId, accentColor, addTask }) => {
  const [todos, setTodos] = useState([]);
  const currentUser = userId;
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Inside ComponentA

  const handleSomeEvent = () => {
    // Example of using addTask
    addTask("Example Task", 1, userId);
    // Similarly for addDefaultTasks, addFreeTasks, etc.
  };

  useEffect(() => {
    const cleanUpOldTasks = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      try {
        // Create a base query for todos collection
        const tasksRef = collection(db, "todos");
        const queryConstraint =
          currentUser === "admin"
            ? tasksRef
            : query(tasksRef, where("user", "in", [currentUser, "anyone"]));

        const querySnapshot = await getDocs(queryConstraint);

        const tasksToDelete = [];
        const filteredTasks = [];

        querySnapshot.forEach((doc) => {
          const task = { id: doc.id, ...doc.data() };
          if (task.createdAt && typeof task.createdAt.seconds === "number") {
            const taskDate = new Date(task.createdAt.seconds * 1000);
            taskDate.setHours(0, 0, 0, 0);
            const differenceInDays = Math.round(
              (today - taskDate) / (1000 * 60 * 60 * 24)
            );

            if (differenceInDays === 1) {
              tasksToDelete.push(doc.ref);
            } else {
              filteredTasks.push(task);
            }
          } else {
            filteredTasks.push(task);
          }
        });

        await Promise.all(tasksToDelete.map((taskRef) => deleteDoc(taskRef)));
        setTodos(filteredTasks);

        // Now that todos have been updated, check if it's empty
        if (filteredTasks.length === 0) {
          console.log("Task list is empty. Adding default tasks...");
          handleSomeEvent(); // This function should add default tasks
        }
      } catch (error) {
        console.error("Error cleaning up old tasks: ", error);
      }
    };

    cleanUpOldTasks();
  }, [currentUser]); // Depend on currentUser to refetch tasks if it changes
  // Depend on currentUser to refetch tasks if it changes

  // Dependency array includes currentUser to react to changes
  // Include currentUser in the dependency array if it might change
  // Dependency array is empty, meaning this runs once on component mount

  // Empty dependency array means this runs once on component mount

  const completedTasks = todos.filter((todo) => todo.completed);
  const notCompletedTasks = todos.filter((todo) => !todo.completed);

  const refillTasks = () => {
    // Assuming completedTasks is correctly filtered from todos
    const notCompletedCount = notCompletedTasks.length;

    // You could also add more logic here if needed, for example, checking if todos is empty
    if (notCompletedCount === 0) {
      // No completed tasks

      return "(empty).";
    } else {
      // There are some completed tasks
      return `(${notCompletedCount} tasks)`;
    }
  };

  const colorRender = (userId) => {
    switch (userId) {
      case "adam":
        return "bg-orange-800 text-white";
      case "leon":
        return "bg-purple-800 text-white";
      case "admin":
        return "bg-green-800 text-white";
      default:
        return "bg-slate-600 text-white";
    }
  };

  const renderTasks = (tasks) =>
    tasks.map((todo) => (
      <div
        key={todo.id}
        className={`rounded-xl shadow-md p-4 ${colorRender(
          todo.user
        )} mb-4 border-gray-950 border-2`}
      >
        <div className="flex items-center">
          <div
            onClick={() => toggleCompleted(todo.id, todo.completed)}
            className="cursor-pointer w-6 h-6 flex justify-center items-center mr-2"
          >
            {todo.completed ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-3xl"
              />
            ) : (
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-red-500 text-3xl"
              />
            )}
          </div>
          <div className="flex-grow ml-5">
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            {selectedTaskId === todo.id && (
              <InfoModal
                taskTitle={todo.title}
                closeModal={() => setSelectedTaskId(null)}
              />
            )}
            <p className="text-md  font-semibold">Assigned to: {todo.user}</p>
            <p className=" text-xs font-semibold">
              Reward: {todo.lvl} {todo.lvl == 1 ? "point" : "points"}
            </p>
          </div>
        </div>
        <div>
          {!todo.completed && (
            <button
              onClick={() => {
                setSelectedTaskId(todo.id);
              }}
              className="bg-slate-900 rounded-full w-6 h-6 hover:bg-slate-600"
            >
              <FontAwesomeIcon icon={faQuestion} />
            </button>
          )}
        </div>
      </div>
    ));

  const toggleCompleted = async (taskId, currentStatus) => {
    const taskRef = doc(db, "todos", taskId);

    const newUser = currentStatus ? "anyone" : userId;

    try {
      // Fetch the task details to get the 'lvl' value
      const taskDoc = await getDoc(taskRef);
      if (!taskDoc.exists()) {
        console.log("Task not found");
        return;
      }
      const taskData = taskDoc.data();
      const pointsChange = Number(taskData.lvl) || 0; // Ensure 'lvl' is treated as a number

      // Update the task's completion status
      await updateDoc(taskRef, {
        completed: !currentStatus,
        user: newUser,
      });

      // Update the local state for the tasks
      setTodos(
        todos.map((todo) =>
          todo.id === taskId
            ? { ...todo, completed: !currentStatus, user: newUser }
            : todo
        )
      );

      // Now update the points
      const pointsRef = doc(db, "points", userId); // Assuming the document ID is the userId
      const pointsDoc = await getDoc(pointsRef);

      if (pointsDoc.exists()) {
        // Calculate new points value

        const currentPoints = Number(pointsDoc.data().points) || 0; // Ensure it's a number
        const newPoints = currentStatus
          ? currentPoints - pointsChange
          : currentPoints + pointsChange;

        await updateDoc(pointsRef, { points: newPoints });
      } else {
        // Create a new document for the user with the points if it doesn't exist
        await setDoc(pointsRef, { points: pointsChange });
      }
    } catch (error) {
      console.log("Error updating document", error);
    }
  };

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 mt-10 justify-center text-center">
          Not Completed Tasks {refillTasks()}
        </h2>
        <div className="flex flex-col gap-4">
          {renderTasks(notCompletedTasks)}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 justify-center text-center">
          Completed Tasks
        </h2>
        <div className="flex flex-col gap-4">{renderTasks(completedTasks)}</div>
      </section>
    </div>
  );
};
export default ComponentA;
