import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="w-full h-full">
      {/* <Login /> */}
      <Register />
    </div>
  );
}

export default App;
