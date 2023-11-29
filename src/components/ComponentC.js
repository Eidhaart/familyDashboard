import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";

function ComponentC() {
  return (
    <div className="flex flex-col justify-center items-center font-bold p-16 text-center text-white">
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
