import React from "react";
import { HEADER_LOGO } from "../constants";

export default function SplashScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <img alt={"loompas-logo"} width={"10%"} src={HEADER_LOGO} />
    </div>
  );
}
