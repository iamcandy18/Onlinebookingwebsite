import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import Firstpage from "./components/Firstpage";
import Booking from "./components/Booking";
import Admin from "./components/Frontpagecard/Admin";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}> 

      <Route path="/login" index element ={<Login/>}/>
      <Route index element ={<Firstpage/>}/>
      <Route path="/register" index element ={<Register/>}/>
      <Route path="/dashboard" index element ={<Dashboard/>}/>
      <Route path="/booking" index element ={<Booking/>}/>
      <Route path="/admin" index element ={<Admin/>}/>

      </Route>

    </Routes>
    
  );
}

export default App;
