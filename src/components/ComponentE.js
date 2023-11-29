import React, { useState, useEffect } from "react";
import DigitalClock from "./DigitalClock";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path as necessary
import SwedishWordOfTheDay from "./SwedishWordOfTheDay";
import Store from "./Store";

function ComponentE({
  userId,
  onPointsChange,
  accentColor,
  imagePath,
  sharedValue,
}) {
  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [storeActive, setStoreActive] = useState(false);

  const closeStore = () => {
    if (storeActive) {
      setStoreActive(false);
    } else {
      setStoreActive(true);
    }
  };

  const value = sharedValue;

  const currentUser = userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "points"));
        let fetchedPoints = 0;

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.user === currentUser) {
            // Convert data.points to a number before adding
            fetchedPoints += Number(data.points) || 0;
          }
        });

        setPoints(fetchedPoints);
        onPointsChange(fetchedPoints);
      } catch {
        console.log("Error fetching data: ");
      }
    };

    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();

    fetchData();
  }, [currentUser, onPointsChange]);

  const deductPoints = async (pointsToDeduct) => {
    const pointsRef = doc(db, "points", userId); // Reference to the user's points document
    try {
      const pointsDoc = await getDoc(pointsRef);
      if (pointsDoc.exists()) {
        const currentPoints = Number(pointsDoc.data().points) || 0;
        const newPoints = Math.max(0, currentPoints - pointsToDeduct); // Prevent negative points

        await updateDoc(pointsRef, { points: newPoints });
      } else {
        // Handle the case where the user does not have a points document
        console.log("User points document does not exist");
      }
    } catch (error) {
      console.error("Error updating points", error);
    }
  };

  const userNotComplete = tasks.filter((task) => task.user === userId);
  const notCompletedCount = userNotComplete.filter(
    (task) => !task.completed
  ).length;

  const wallpaperPath = () => {
    switch (sharedValue) {
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      case 5:
        return "five";
      case 6:
        return "six";
      default:
        return "seven";
    }
  };

  const wallPath = {
    one: "bg-[url('1.png')] bg-no-repeat bg-center bg-cover",
    two: "bg-[url('2.png')] bg-no-repeat bg-center bg-cover",
    three: "bg-[url('3.png')] bg-no-repeat bg-center bg-cover",
    four: "bg-[url('4.png')] bg-no-repeat bg-center bg-cover",
    five: "bg-[url('5.png')] bg-no-repeat bg-center bg-cover",
    six: "bg-[url('6.png')] bg-no-repeat bg-center bg-cover",
    seven: "bg-slate-900 bg-no-repeat bg-center bg-cover",
    // Add more mappings as needed
  };

  return (
    <div className="space-y-2 backdrop-blur-lg w-full h-full ">
      <div
        className={` ${
          wallPath[wallpaperPath()]
        } flex flex-col items-start justify-center p-4  rounded-lg shadow-md`}
      >
        <DigitalClock className="text-2xl text-stone-900 font-bold mb-4 w-full " />

        <div className="text-3xl text-slate-300 bg-slate-900 bg-opacity-40 font-semibold  p-2 my-2 rounded-lg">
          {" "}
          Points: {points} {sharedValue}
        </div>
        <div className="text-3xl text-slate-300 bg-slate-900 bg-opacity-40 font-semibold  p-1 rounded-lg">
          Remaining Tasks: {notCompletedCount}
        </div>
      </div>
      <div>
        <SwedishWordOfTheDay />
      </div>
      <button
        className={`text-slate-300 font-bold w-full  h-20 rounded-lg bg-slate-800  hover:bg-slate-700 transition-all duration-200 `}
        onClick={closeStore}
      >
        Store
      </button>
      {storeActive && (
        <div className="fixed top-0 left-0 w-full h-full z-10">
          <Store
            points={points}
            user={userId}
            closeFunction={closeStore}
            buyFunction={deductPoints}
          />
        </div>
      )}
    </div>
  );
}

export default ComponentE;
