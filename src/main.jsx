// src/index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RootWrapper } from "./RootWrapper"; // New file for wrapping logic

// Mounting the app with StrictMode and Router wrapped
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootWrapper>
      <App />
    </RootWrapper>
  </StrictMode>,
);
