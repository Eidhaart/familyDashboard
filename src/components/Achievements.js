import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

function Achievements({ pointsAdam, pointsLeon, accentColor }) {
  const [adamPoints, setAdamPoints] = useState(0);
  const [leonPoints, setLeonPoints] = useState(0);

  useEffect(() => {
    setAdamPoints(pointsAdam);
    setLeonPoints(pointsLeon);
  }, [pointsAdam, pointsLeon]);

  let adamBarHeight = `${adamPoints * 5}px`;
  let leonBarHeight = `${leonPoints * 5}px`;

  if (leonPoints >= 100 || adamPoints >= 100) {
    adamBarHeight = `${adamPoints * 3}px`;
    leonBarHeight = `${leonPoints * 3}px`;
  }
  if (leonPoints >= 200 || adamPoints >= 200) {
    adamBarHeight = `${adamPoints * 2}px`;
    leonBarHeight = `${leonPoints * 2}px`;
  }
  if (leonPoints >= 300 || adamPoints >= 300) {
    adamBarHeight = `${adamPoints * 1}px`;
    leonBarHeight = `${leonPoints * 1}px`;
  }

  const renderParagraphAboveBar = (user) => {
    if (
      (user === "adam" && adamPoints > leonPoints) ||
      (user === "leon" && leonPoints > adamPoints)
    ) {
      return (
        <p className="mb-2 font-bold text-green-600 rounded-md p-1 text-4xl ">
          <FontAwesomeIcon icon={faCrown} fade />
        </p>
      );
    }
    return null;
  };

  return (
    <div className=" w-full h-full p-20  flex justify-center items-end space-x-4  text-white">
      <div className="text-center flex flex-col items-center">
        {renderParagraphAboveBar("adam")}
        <div
          style={{ height: adamBarHeight }}
          className=" w-20 bg-yellow-500 mb-2 rounded"
        />
        <div className="text-lg font-bold">Adam</div>
        <div className="text-lg font-bold">{adamPoints}</div>
      </div>
      <div className="text-center flex flex-col items-center">
        {renderParagraphAboveBar("leon")}
        <div
          style={{ height: leonBarHeight }}
          className={`w-20 bg-purple-500 mb-2 rounded`}
        />
        <div className="text-lg font-bold">Leon</div>
        <div className="text-lg font-bold">{leonPoints}</div>
      </div>
    </div>
  );
}

export default Achievements;
