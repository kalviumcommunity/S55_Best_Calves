import React from "react";
import "./App.css";
import Home from "./components/Home.jsx"
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}


