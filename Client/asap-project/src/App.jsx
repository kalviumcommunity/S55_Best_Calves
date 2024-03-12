import React from "react";
import "./App.css";
import Home from "./components/Home.jsx"
import Form from "./components/Form.jsx"
import Update from "./components/Update/Update.jsx"
import Signup from "./components/SignUp/SignUp.jsx";
import Login from "./components/LogIn/Login.jsx"
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insert" element={<Form />}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>

      </Routes>
    </div>
  );
}


