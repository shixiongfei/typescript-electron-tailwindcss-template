import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
