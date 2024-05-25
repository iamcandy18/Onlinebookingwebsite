import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Firstpage from "./components/Firstpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}> 

      <Route path="/login" index element ={<Login/>}/>
      <Route index element ={<Firstpage/>}/>
      <Route path="/register" index element ={<Register/>}/>
      <Route path="/dashboard" index element ={<Dashboard/>}/>
      </Route>

    </Routes>
    
  );
}

export default App;
