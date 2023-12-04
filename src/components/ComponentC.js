import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function ComponentC() {
  const [foods, setFoods] = useState([]);

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

  const renderFoods = (foods) =>
    foods?.map((food) => (
      <div key={food.id} className={`rounded-xl shadow-md p-4  mb-4`}>
        <div className="flex items-center">
          <div className="flex-grow ml-5">
            <h3 className="text-xl font-semibold">
              {food.name} / {food.altName}
            </h3>
            {/* {selectedTaskId === food.id && (
              <InfoModal
                taskTitle={food.title}
                closeModal={() => setSelectedTaskId(null)}
              />
            )} */}

            <p className=" text-xs font-semibold">{food.day}</p>
          </div>
        </div>
        <div></div>
      </div>
    ));

  return (
    <div className=" min-h-screen backdrop-blur-lg flex flex-col justify-center items-center font-bold p-16 text-center text-white">
      {renderFoods(foods)}
      <h1 className="uppercase text-5xl">Błąd 404</h1>
      <br></br>
      <p className="font-semibold uppercase">aka</p>
      <br></br>
      <p className="italic">"Się nie interesuj bo kociej mordy dostaniesz"</p>
      <br></br>
      <br></br>
      <FontAwesomeIcon
        icon={faPoo}
        className="text-5xl"
        bounce
        style={{ color: "#e22ee9" }}
      />
    </div>
  );
}

export default ComponentC;
