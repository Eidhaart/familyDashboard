import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function ComponentC({ userId }) {
  const [foods, setFoods] = useState([]);
  const weekdayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchData = async () => {
      // Additional logic for awarding/removing bonus points

      try {
        const querySnapshot = await getDocs(collection(db, "food"));
        const allFoods = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setFoods(allFoods);
      } catch {
        console.log("Error fetching data: ");
      }
    };

    fetchData();
  });

  const sortedFoods = foods.sort((a, b) => {
    return weekdayOrder.indexOf(a.day) - weekdayOrder.indexOf(b.day);
  });

  const removeFood = async (day) => {
    try {
      // Query the collection to find the document with the matching 'day'
      const querySnapshot = await getDocs(
        query(collection(db, "food"), where("day", "==", day))
      );

      // Assuming there's only one document per day, or you have some logic to decide which one to delete
      const docToDelete = querySnapshot.docs[0];

      if (docToDelete) {
        await deleteDoc(doc(db, "food", docToDelete.id));
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const renderFoods = (foods) =>
    sortedFoods?.map((food) => (
      <div>
        <h3 className="bg-slate-700 rounded-t-xl">{food.day}</h3>

        <div
          key={food.id}
          className={`rounded-b-xl shadow-md p-4  mb-4 bg-slate-800`}
        >
          <div className="flex items-center ">
            <div className="flex-grow ml-5 mr-5">
              <h3 className="text-xl italic font-semibold text-center">
                <div>
                  {food.altName === "" ? (
                    <div>{food.name}</div>
                  ) : (
                    <div>
                      {food.name} / {food.altName}
                    </div>
                  )}
                  {userId === "admin" && (
                    <button
                      className="rounded-full bg-red-700 px-2 my-2 font-bold"
                      onClick={() => removeFood(food.day)}
                    >
                      X
                    </button>
                  )}
                </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className=" min-h-screen backdrop-blur-lg flex flex-col justify-center items-center font-bold p-16 text-center text-white"></div>
  );
}

export default ComponentC;
