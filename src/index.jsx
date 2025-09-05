// src/index.jsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/components.css";

import { ClerkProvider } from "@clerk/clerk-react";

// Use the publishable key from your .env.local
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error("Missing Clerk Publishable Key! Did you set VITE_CLERK_PUBLISHABLE_KEY in .env.local?");
}

ReactDOM.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <Router>
      <App />
    </Router>
  </ClerkProvider>,
  document.getElementById("root")
);
