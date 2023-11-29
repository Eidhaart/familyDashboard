// App.js
import React, { useState, useEffect } from "react";
import CompA from "./components/ComponentA";
import CompB from "./components/ComponentB";
import CompC from "./components/ComponentC";
import CompD from "./components/ComponentD";
import CompE from "./components/ComponentE";
import Login from "./components/Login";
import DigitalClock from "./components/DigitalClock";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./components/firebase";
import Achievements from "./components/Achievements";

const App = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [activeComponent, setActiveComponent] = useState("E");
  const [loginScreen, setLoginScreen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [adamPoints, setAdamPoints] = useState(0);
  const [leonP, setLeonPoints] = useState(0);
  const [accentColor, setAccentColot] = useState(
    localStorage.getItem("accentColor") || ""
  );

  const [sharedValue, setSharedValue] = useState(
    localStorage.getItem("sharedValue") || ""
  );

  const colorClasses = {
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    green: "bg-green-500 hover:bg-green-600",
    // Add more mappings as needed
  };
  const colorClassesText = {
    red: "text-red-500 ",
    blue: "text-blue-500 ",
    purple: "text-purple-500",
    orange: "text-orange-500 ",
    green: "text-green-500 ",
    // Add more mappings as needed
  };

  const handlePointsChange = (newPoints) => {
    setTotalPoints(newPoints);
  };

  useEffect(() => {
    if (userId) {
      // Listener for real-time updates
      const unsubscribe = onSnapshot(
        collection(db, "points"),
        (querySnapshot) => {
          let fetchedPoints = 0;
          let adamPoints = 0;
          let leonPoints = 0;

          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();

            if (data.user === userId) {
              fetchedPoints += Number(data.points) || 0;
            }

            if (data.user === "adam") {
              adamPoints += Number(data.points) || 0;
            }

            if (data.user === "leon") {
              leonPoints += Number(data.points) || 0;
            }
          });

          const savedValue = localStorage.getItem("sharedValue");
          if (savedValue) {
            setSharedValue(savedValue); // Assuming setSharedValue is your state setter function
          }
          setTotalPoints(fetchedPoints);
          setAdamPoints(adamPoints);
          setLeonPoints(leonPoints);
          localStorage.setItem("sharedValue", sharedValue);
        },
        [sharedValue]
      );

      return () => unsubscribe(); // Clean up the listener when the component unmounts or userId changes
    }
  }, [userId]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "A":
        return <CompA accentColor={accentColor} userId={userId} />;
      case "B":
        return (
          <div className="flex flex-col justify-center items-center h-screen pt-1  ">
            <Achievements
              accentColor={accentColor}
              pointsAdam={adamPoints}
              pointsLeon={leonP}
            />
          </div>
        );
      case "C":
        return <CompC accentColor={accentColor} />;
      case "D":
        return <CompD accentColor={accentColor} userId={userId} />;
      case "E":
        return (
          <CompE
            className="h-screen"
            accentColor={accentColor}
            userId={userId}
            onPointsChange={handlePointsChange}
            sharedValue={sharedValue}
          />
        );
      case "F":
        return (
          <CompB
            setAccent={handleAccentChange}
            accentColor={accentColor}
            logout={clearUserId}
            setSharedValue={handleWallpaperChange}
          />
        );
      default:
        return (
          <CompE
            accentColor={accentColor}
            userId={userId}
            onPointsChange={handlePointsChange}
            sharedValue={sharedValue}
          />
        );
    }
  };

  const handleUserId = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
    // Additional actions can be performed here with the userId
  };

  const handleAccentChange = (color) => {
    setAccentColot(color);
    localStorage.setItem("accentColor", color);
  };
  const handleWallpaperChange = (value) => {
    setSharedValue(value);
    localStorage.setItem("sharedValue", value);
  };

  const isActive = (componenName) => {
    return activeComponent === componenName
      ? `${colorClassesText[accentColor]}`
      : `${colorClassesText[accentColor]}`;
  };

  const clearUserId = () => {
    setUserId(""); // Clear the user ID from state
    localStorage.removeItem("userId"); // Clear the user ID from localStorage
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
    <div className={`flex flex-col min-h-screen  ${wallPath[sharedValue]}`}>
      {userId && <div className="flex-grow">{renderComponent()}</div>}

      <div>
        {!userId && <Login onUserIdSubmit={handleUserId} />}

        <div className="flex-col fixed top-0 right-0 rounded-bl-xl bg-slate-700 flex rounded-tr-lg  px-5 py-2 text-white font-bold uppercase ">
          <button className="uppercase" onClick={() => setActiveComponent("E")}>
            {userId}
          </button>
          <p className="text-center rounded-xl bg-slate-500">{totalPoints}</p>
        </div>

        {/* Optionally render something using the userId */}
      </div>
      <nav className=" fixed bottom-0 left-0 right-0 flex justify-center items-center bg-gray-800 p-2 sm:p-4 z-10">
        <button
          className={`font-light py-2 px-4 rounded ease-in-out transition-all duration-200  ${isActive(
            "A"
          )} hover:${
            colorClasses[accentColor]
          } hover:text-white hover:rounded-t-xl`}
          onClick={() => setActiveComponent("A")}
        >
          {" "}
          Zadania{" "}
        </button>
        <button
          className={`font-light  py-2 px-4 rounded ease-in-out transition-all duration-200  ${isActive(
            "B"
          )} hover:${
            colorClasses[accentColor]
          } hover:text-white hover:rounded-t-xl`}
          onClick={() => setActiveComponent("B")}
        >
          {" "}
          Osiągnięcia{" "}
        </button>
        <button
          className={`font-light py-2 px-4 rounded ease-in-out transition-all duration-200  ${isActive(
            "C"
          )} hover:${
            colorClasses[accentColor]
          } hover:text-white hover:rounded-t-xl`}
          onClick={() => setActiveComponent("C")}
        >
          {" "}
          Menu{" "}
        </button>
        <button
          className={`font-light py-2 px-4 rounded ease-in-out transition-all duration-200  ${isActive(
            "F"
          )} hover:${
            colorClasses[accentColor]
          } hover:text-white hover:rounded-t-xl`}
          onClick={() => setActiveComponent("F")}
        >
          {" "}
          Settings{" "}
        </button>
        {userId === "admin" && (
          <button
            className={`  text-white font-light py-2 px-4 rounded ease-in-out transition-all duration-200  ${isActive(
              "D"
            )} hover:${
              colorClasses[accentColor]
            } hover:text-white hover:rounded-t-xl`}
            onClick={() => setActiveComponent("D")}
          >
            {" "}
            Admin{" "}
          </button>
        )}

        {/* <button
          className={`text-white font-light py-2 px-4 rounded transition-all duration-100  ${isActive(
            "D"
          )} hover:text-purple-500`}
          onClick={() => clearUserId()}
        >
          {" "}
          Log out{" "}
        </button> */}
      </nav>
    </div>
  );
};

export default App;
