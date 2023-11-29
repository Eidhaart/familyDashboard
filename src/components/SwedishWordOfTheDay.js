import React, { useState, useEffect } from "react";
import word from "./JSON/word.json";

const getSwedishWordOfTheDay = () => {
  // Your words array or import from the JSON file
  const words = word;

  // Generate a new index based on the current date
  const today = new Date();
  const index = today.getDate() % words.length; // This ensures a new word each day
  return words[index];
};

const SwedishWordOfTheDay = () => {
  const [word, setWord] = useState({ swedish: "", english: "" });

  useEffect(() => {
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem("swedishWordDate");
    if (currentDate !== storedDate) {
      const newWord = getSwedishWordOfTheDay();
      setWord(newWord);
      localStorage.setItem("swedishWord", JSON.stringify(newWord));
      localStorage.setItem("swedishWordDate", currentDate);
    } else {
      const storedWord = JSON.parse(localStorage.getItem("swedishWord"));
      setWord(storedWord);
    }
  }, []);

  return (
    <div
      style={{ textAlign: "center", padding: "20px" }}
      className=" bg-stone-950 rounded-lg shadow-black text-white"
    >
      <h2>Swedish Word of the Day</h2>
      <br></br>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{word.swedish}</p>
      <p style={{ fontSize: "20px" }}>{word.english}</p>
    </div>
  );
};

export default SwedishWordOfTheDay;
