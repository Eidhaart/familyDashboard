// ComponentA.js
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
} from "firebase/firestore";
import { db } from "./firebase";
import InfoModal from "./InfoModal";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const ComponentA = ({
  userId,
  addTask,
  addDefaultTasks,
  addFreeTasks,
  addFridayTasks,
}) => {
  const [todos, setTodos] = useState([]);
  const currentUser = userId;
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const cleanUpOldTasks = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      try {
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

        if (
          filteredTasks.length === 0 ||
          !filteredTasks.some((task) => !task.completed)
        ) {
          startCountdownToNextDay();
        }
      } catch (error) {
        console.error("Error cleaning up old tasks: ", error);
      }
    };

    cleanUpOldTasks();
  }, [currentUser]);

  const startCountdownToNextDay = () => {
    const now = new Date();
    let targetTime = new Date();

    targetTime.setDate(now.getDate() + 1);
    targetTime.setHours(6, 0, 0, 0);

    const updateCountdown = () => {
      const now = new Date();
      const remainingTime = targetTime - now;

      if (remainingTime <= 0) {
        clearInterval(timer);
        addTasksForTheDay();
      } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  };

  const addTasksForTheDay = () => {
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 5) {
      addFridayTasks();
      addDefaultTasks();
      addFreeTasks();
    } else {
      addDefaultTasks();
      addFreeTasks();
    }
    setCountdown(null);
  };

  const toggleCompleted = async (taskId, currentStatus) => {
    const taskRef = doc(db, "todos", taskId);
    const newUser = currentStatus ? "anyone" : userId;

    try {
      const taskDoc = await getDoc(taskRef);
      if (!taskDoc.exists()) {
        console.log("Task not found");
        return;
      }
      const taskData = taskDoc.data();
      const pointsChange = Number(taskData.lvl) || 0;

      await updateDoc(taskRef, {
        completed: !currentStatus,
        user: newUser,
      });

      setTodos(
        todos.map((todo) =>
          todo.id === taskId
            ? { ...todo, completed: !currentStatus, user: newUser }
            : todo
        )
      );

      const pointsRef = doc(db, "points", userId);
      const pointsDoc = await getDoc(pointsRef);

      if (pointsDoc.exists()) {
        const currentPoints = Number(pointsDoc.data().points) || 0;
        const newPoints = currentStatus
          ? currentPoints - pointsChange
          : currentPoints + pointsChange;
        await updateDoc(pointsRef, { points: newPoints });
      } else {
        await setDoc(pointsRef, { points: pointsChange });
      }

      if (!todos.some((todo) => !todo.completed)) {
        startCountdownToNextDay();
      }
    } catch (error) {
      console.log("Error updating document", error);
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
            <p className="text-md font-semibold">Assigned to: {todo.user}</p>
            <p className="text-xs font-semibold">
              Reward: {todo.lvl} {todo.lvl === 1 ? "point" : "points"}
            </p>
          </div>
        </div>
        <div>
          {!todo.completed && (
            <button
              onClick={() => setSelectedTaskId(todo.id)}
              className="bg-slate-900 rounded-full w-6 h-6 hover:bg-slate-600"
            >
              <FontAwesomeIcon icon={faQuestion} />
            </button>
          )}
        </div>
      </div>
    ));

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

  const notCompletedTasksCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white flex flex-col items-center">
      {currentUser === "admin" && countdown && (
        <button
          onClick={addTasksForTheDay}
          className="bg-red-500 text-white py-2 px-4 rounded mb-4 hover:bg-red-600"
        >
          Skip Timer
        </button>
      )}
      {countdown ? (
        <div className="flex flex-col items-center justify-center text-center mt-32 text-3xl">
          <h2>Next tasks available in:</h2>
          <p>{countdown}</p>
        </div>
      ) : (
        <>
          <section className="mb-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4 mt-10 text-center">
              Not Completed Tasks ({notCompletedTasksCount})
            </h2>
            <div className="flex flex-col gap-4">
              {renderTasks(todos.filter((todo) => !todo.completed))}
            </div>
          </section>
          <section className="mb-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Completed Tasks
            </h2>
            <div className="flex flex-col gap-4">
              {renderTasks(todos.filter((todo) => todo.completed))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ComponentA;
