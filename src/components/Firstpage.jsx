import React from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "./Card";
function Firstpage() {


  return (
    <div>
      <div className="dash1"></div>
      <div className="fullpage">
        
      <div className="fpicons"><button className="fpb"><p>TREEHOUSE</p><i class="fa fa-tree" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>ICONS</p><i class="fa fa-ticket" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>OMG!</p><i class="fa fa-plane" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>CABIN</p><i class="fa fa-home" aria-hidden="true"></i> </button></div>
      <div className="fpicons"><button className="fpb"><p>LAKE</p><i class="fa fa-pied-piper" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>AMAZING <br />  VIEW</p><i class="fa fa-window-maximize" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>COUNTRYSIDE</p><i class="fa fa-globe" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>NATIONAL <br /> PARKS</p><i class="fa fa-envira" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>RESTAURANTS</p><i class="fa fa-cutlery" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>CAFES</p><i class="fa fa-coffee" aria-hidden="true"></i></button></div>
      <div className="fpicons"><button className="fpb"><p>SNOW <br />  PARKS</p><i class="fa fa-cubes" aria-hidden="true"></i></button></div>
      
      <div className="fpicons"><button className="fpb"><p>FILTERS</p><i class="fa fa-toggle-on" aria-hidden="true"></i></button></div>

       
      </div>
      <Card/>
    </div>
  );
}

export default Firstpage;
