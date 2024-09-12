import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateContext } from "./context/StateContext.jsx";

createRoot(document.getElementById("root")).render(
  <StateContext>
    <App />
  </StateContext>
);
