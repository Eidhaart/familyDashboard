import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path as necessary

function ComponentD({ addDefaultTasks, addFreeTasks, addFridayTasks }) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [day, setDay] = useState("");

  const today = new Date();
  const dayNumber = today.getDate(); // This will give you the day of the month

  const isEvenDay = dayNumber % 2 === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "todos"), {
        title,
        lvl: level,
        user: assignedUser,
        completed: false,
        createdAt: new Date(),
      });
      setTitle("");
      setLevel("");
      setAssignedUser("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleSubmitFood = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "food"), {
        name,
        altName: altName,
        day: day,
      });
      setName("");
      setAltName("");
      setDay("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addTask = async (title, lvl, user) => {
    try {
      await addDoc(collection(db, "todos"), {
        title,
        lvl: lvl,
        user: user,
        completed: false,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addFood = async (name, altName, day) => {
    try {
      await addDoc(collection(db, "food"), {
        name,
        altName: altName,
        day: day,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Level
          </label>
          <input
            type="text"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="assignedUser"
            className="block text-sm font-medium text-gray-700"
          >
            Assign To
          </label>
          <input
            type="text"
            id="assignedUser"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="flex space-x-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      </form>
      <button
        onClick={() => addDefaultTasks()}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Add Default Tasks
      </button>
      <button
        onClick={() => addFreeTasks()}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Add Free Tasks
      </button>
      <button
        onClick={() => addFridayTasks()}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Add Friday Tasks
      </button>
      <form onSubmit={handleSubmitFood}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <label
          htmlFor="altName"
          className="block text-sm font-medium text-gray-700"
        >
          Alternative Name
        </label>
        <input
          type="text"
          id="altName"
          value={altName}
          onChange={(e) => setAltName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <label
          htmlFor="day"
          className="block text-sm font-medium text-gray-700"
        >
          Day
        </label>
        <input
          type="text"
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}

export default ComponentD;
