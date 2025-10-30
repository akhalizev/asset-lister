import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/seedConsole"; // Expose seeding functions to window for console access

createRoot(document.getElementById("root")!).render(<App />);
  