import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date()); // Update time every second
    }, 1000);

    return () => {
      clearInterval(timerId); // Clear interval on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const formatTime = (time) => {
    // Specify options to exclude seconds
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };

    // Format time as HH:MM
    return time.toLocaleTimeString([], options);
  };

  const formatDate = (time) => {
    // Specify options for month and day
    const options = {
      month: "short", // 'short' for abbreviated month name
      day: "numeric", // Numeric day
    };

    // Format date as Month (abbreviated) Day, without the year
    return time.toLocaleDateString("en-US", options); // Example: "Nov 26"
  };

  return (
    <div className="">
      <div className="  text-white p-5 rounded-2xl shadow-lg bg-slate-900 bg-opacity-40 ">
        <h2 className="text-4xl font-semibold">{formatTime(time)}</h2>
        <p className="text-gray-400 text-sm mt-2">{formatDate(time)}</p>
      </div>
    </div>
  );
}

export default DigitalClock;
