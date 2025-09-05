import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/components.css";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey || clerkPubKey === "pk_test_placeholder-replace-with-actual-key") {
  console.warn("⚠️ Clerk Publishable Key not configured properly!");
  console.warn("Please set VITE_CLERK_PUBLISHABLE_KEY in .env.local");
  console.warn("Authentication features will be disabled until configured.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey || "test"}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
          <Analytics />
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
