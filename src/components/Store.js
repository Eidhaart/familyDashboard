import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import items from "./JSON/items.json";
import ContactUs from "./ContactUs";
import emailjs from "emailjs-com";

function Store({ points, user, closeFunction, buyFunction, accentColor }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [showErrorStyle, setShowErrorStyle] = useState(false);
  const [showSuccessStyle, setShowSuccessStyle] = useState(null);
  const contactUsRefs = useRef();

  const sendEmail = (item) => {
    const templateParams = {
      user_id: user,
      points_amount: points,
      item_name: item,
      // Add other necessary parameters here
    };

    emailjs
      .send(
        "service_x2d8ryc",
        "template_1dsmiuu",
        templateParams,
        "bJSWFmn0jK5aVMiTh"
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          // Handle email success here
        },
        (error) => {
          console.log("Email sending error:", error.text);
          // Handle email sending error here
        }
      );
  };

  const handlePurchase = (currentPoints, purchasePoints, itemId, item) => {
    if (currentPoints < purchasePoints) {
      setPopupMessage("You don't have enough points to buy this item.");
      setShowPopup(true);
      setShowErrorStyle(itemId);
      setTimeout(() => {
        setShowPopup(false);
        setShowErrorStyle(null);
      }, 1000);
    } else {
      buyFunction(purchasePoints);
      setShowSuccessStyle(itemId);
      sendEmail(item);
      setTimeout(() => {
        setShowSuccessStyle(null);
      }, 2000);
    }
  };

  return (
    <div className="  bg-stone-700 h-full w-full p-4 overflow-scroll pb-16">
      <div className="flex justify-between items-center bg-stone-900 p-4 rounded-lg shadow-lg">
        <div className="text-stone-300 font-bold bg-slate-600 rounded-lg p-2   ">
          <FontAwesomeIcon className=" mx-1" icon={faSackDollar} /> {"  "}
          {points}
        </div>
        <div className="text-stone-300 font-bold uppercase">{user}</div>
        <button
          className={`px-4 py-2 bg-slate-600 text-white font-semibold hover:bg-${accentColor}-500 transition-all duration-75 rounded-lg p-2 `}
          onClick={closeFunction}
        >
          X
        </button>
      </div>

      {/* Placeholder items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 items-center justify-center">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg text-white"
          >
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p>{item.description}</p>
            <p>price: {item.price}</p>
            <ContactUs
              ref={(el) => {
                if (contactUsRefs.current) {
                  contactUsRefs.current[index] = el;
                }
              }}
              userId={user}
              points={item.points}
              item={item.name}
            />
            <button
              onClick={() =>
                handlePurchase(points, item.price, item.id, item.name)
              }
              className={`mt-2 px-4 py-2 text-white font-semibold rounded float-right transition-all duration-200 ease-in-out ${
                showErrorStyle === item.id
                  ? "bg-red-600 hover:bg-red-700" // Red button style for error
                  : showSuccessStyle === item.id
                  ? "bg-green-600 hover:bg-green-700" // Green button style for success
                  : "bg-yellow-600 hover:bg-yellow-700" // Normal button style
              }`}
            >
              {showErrorStyle === item.id
                ? "✖"
                : showSuccessStyle === item.id
                ? "✔"
                : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
