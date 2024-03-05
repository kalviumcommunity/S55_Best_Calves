import React from "react";
import "./App.css";
import Home from "./components/Home.jsx"
import Form from "./components/Form.jsx"
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insert" element={<Form />}/>
      </Routes>
    </div>
  );
}


