import React from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "../client";
import Logout from "./Logout";
function Firstpage() {


  return (
    <div>
      <div className="dash1"></div>
      <div className="fullpage">
        
      <div className="page"><Link to='/dashboard'>
        <button className="fpbutton">
        <i class="fa fa-user-circle f2" aria-hidden="true"></i>
            <p>DASHBOARD</p></button></Link>
        <button className="fpbutton">
        <i class="fa fa-ticket f2" aria-hidden="true"></i>
            <p>MY TICKETS</p>
        </button>
        <button className="fpbutton">
        <i class="fa fa-calendar-o f2" aria-hidden="true"></i>
        <p>UPCOMING EVENTS</p>
        </button>
        <button className="fpbutton">
        <i class="fa fa-play f2" aria-hidden="true"></i>
            <p>STREAM</p></button>
        <button className="fpbutton">
        <i class="fa fa-film f2" aria-hidden="true"></i>
            <p>MOVIES</p></button>
        <button className="fpbutton">
        <i class="fa fa-futbol-o f2" aria-hidden="true"></i><p>SPORTS</p></button>
        <button className="fpbutton" onClick={Logout}>
        <i class="fa fa-sign-out f2" aria-hidden="true"></i>
            <p>SIGN OUT</p></button>
            
      </div>
      <div className="page2">
        
        </div>
       
      </div>
    </div>
  );
}

export default Firstpage;
