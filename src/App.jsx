import "./App.css";
import React from "react";
import Login from "./components/Auth/Login";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import Firstpage from "./components/Firstpage";
import Admin from "./components/Admin";
import BookingPage from "./components/Booking";
import Attendee from "./components/booking/Attendee";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}> 

      <Route path="/login" index element ={<Login/>}/>
      <Route index element ={<Firstpage/>}/>
      <Route path="/register" index element ={<Register/>}/>
      <Route path="/dashboard" index element ={<Dashboard/>}/>
      <Route path="/admin" index element ={<Admin/>}/>
      <Route path="/booking" index element ={<BookingPage/>}/>
      <Route path="/booking/attendee" index element ={<Attendee/>}/>
      </Route>

    </Routes>
    
  );
}

export default App;
