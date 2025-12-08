import React from "react";
import Header from "../components/MainPageComponents/Header";
import { AuthCard } from "../components/authComp/AuthCard";

export default function Sign() {
  return (
    <div className="flex flex-col gap-12">

      <Header hideLoginButton={true} />
      <AuthCard />
    </div>
  );
}
