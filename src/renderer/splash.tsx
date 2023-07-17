import React from "react";
import { createRoot } from "react-dom/client";
import splashImage from "./images/splash.jpeg";

const container = document.getElementById("root");
const root = createRoot(container!);

const Splash = () => <img src={splashImage} width="800" height="450" alt="" />;

root.render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>
);
