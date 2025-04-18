// src/RootWrapper.jsx
import { BrowserRouter } from "react-router-dom";

// You can add other wrappers like Context Providers here
export const RootWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
