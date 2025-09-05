import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
};

export default SignUpPage;
