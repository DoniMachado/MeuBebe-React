import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n.js";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
