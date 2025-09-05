import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  console.log("SignIn Page - Clerk Key:", clerkPubKey ? "Key exists" : "No key");
  
  if (!clerkPubKey || clerkPubKey === 'pk_test_placeholder-replace-with-actual-key') {
    return (
      <div className="auth-page">
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          backgroundColor: 'var(--container-bg)', 
          borderRadius: '12px',
          color: 'var(--text-color)'
        }}>
          <h2>Authentication Not Configured</h2>
          <p>Please configure Clerk authentication in your .env.local file.</p>
          <p>Check the .env.local file for instructions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-header-center">
            <h1 className="auth-title">Welcome Back!</h1>
            <p className="auth-subtitle">Sign in to your AlgoVisualizer account</p>
          </div>
          <SignIn 
            routing="path"
            path="/sign-in"
            redirectUrl="/"
            afterSignInUrl="/"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
