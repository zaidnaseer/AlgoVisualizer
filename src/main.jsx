import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/components.css";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
