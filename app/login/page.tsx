import React from "react";
import RootLayout from "../layout";
import Login from "@/components/Login";

const LoginPage = () => {
  return (
    <RootLayout showNavbar={false} showFooter={false}>
      <Login />
    </RootLayout>
  );
};

export default LoginPage;
