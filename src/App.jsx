import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}> 

      <Route index element ={<Navbar/>}/>
      <Route path="/login" index element ={<Login/>}/>
      <Route path="/register" index element ={<Register/>}/>
      </Route>

    </Routes>
    
  );
}

export default App;
