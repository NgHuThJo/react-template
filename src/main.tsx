import React from "react";
import ReactDOM from "react-dom/client";
import { Context } from "./providers/context.js";
import { Router } from "./app/router.js";
import "#frontend/assets/styles";

const root = document.getElementById("root");

if (!root) {
  throw new ReferenceError("DOM root not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Context>
      <Router />
    </Context>
  </React.StrictMode>,
);
