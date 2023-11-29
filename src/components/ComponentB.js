import React from "react";

function ComponentB({ setAccent, setWallpaper, logout, setSharedValue }) {
  const updateValue = (newValue) => {
    setSharedValue(newValue);
  };

  return (
    <div className="flex flex-col min-h-screen p-10 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold uppercase mb-5">Settings</h1>

      <div className="mb-5">
        <h2 className="font-semibold text-lg mb-3">Accent Color</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setAccent("red")}
            className="rounded-t-full rounded-bl-full bg-red-500 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
          ></button>
          <button
            onClick={() => setAccent("purple")}
            className="rounded-t-full rounded-bl-full bg-purple-500 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
          ></button>
          <button
            onClick={() => setAccent("blue")}
            className="rounded-t-full rounded-bl-full bg-blue-500 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          ></button>
          <button
            onClick={() => setAccent("green")}
            className="rounded-t-full rounded-bl-full bg-green-500 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
          ></button>
          <button
            onClick={() => setAccent("orange")}
            className="rounded-t-full rounded-bl-full bg-orange-500 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="font-semibold text-lg mb-3">Wallpaper</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => updateValue("one")}
            className="rounded-xl bg-[url('1.png')] bg-no-repeat bg-center bg-cover w-16 h-16 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
          <button
            onClick={() => updateValue("two")}
            className="rounded-xl bg-[url('2.png')] bg-no-repeat bg-center bg-cover w-16 h-16 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
          <button
            onClick={() => updateValue("three")}
            className="rounded-xl bg-[url('3.png')] bg-no-repeat bg-center bg-cover w-16 h-16 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
          <button
            onClick={() => updateValue("four")}
            className="rounded-xl bg-[url('4.png')] bg-no-repeat bg-center bg-cover w-16 h-16 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
          <button
            onClick={() => updateValue("five")}
            className="rounded-xl bg-[url('5.png')] bg-no-repeat bg-center bg-cover w-16 h-16 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
          <button
            onClick={() => updateValue("six")}
            className="rounded-xl bg-[url('6.png')] bg-no-repeat bg-center bg-cover w-16 h-16 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all duration-200"
          ></button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-3">User</h2>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ComponentB;
