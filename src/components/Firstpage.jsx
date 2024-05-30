import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "./Frontpagecard/Card";
import Footer from "./Footer";

function Firstpage() {
  const [images, setImages] = useState([]);
  
  const buttonTexts = [
    { text: 'TREEHOUSE', icon: 'fa-tree' },
    { text: 'ICONS', icon: 'fa-ticket' },
    { text: 'OMG!', icon: 'fa-plane' },
    { text: 'CABIN', icon: 'fa-home' },
    { text: 'LAKE', icon: 'fa-pied-piper' },
    { text: 'AMAZING VIEW', icon: 'fa-window-maximize' },
    { text: 'COUNTRYSIDE', icon: 'fa-globe' },
    { text: 'NATIONAL PARKS', icon: 'fa-envira' },
    { text: 'RESTAURANTS', icon: 'fa-cutlery' },
    { text: 'CAFES', icon: 'fa-coffee' },
    { text: 'SNOW PARKS', icon: 'fa-cubes' },
    { text: 'FILTERS', icon: 'fa-toggle-on' }
  ];

  

  return (
    <div>
      <div className="dash1"></div>
      <div className="fullpage">
        {buttonTexts.map(({ text, icon }) => (
          <div className="fpicons" key={text}>
            <button className="fpb">
              <p>{text}</p>
              <i className={`fa ${icon}`} aria-hidden="true"></i>
            </button>
          </div>
        ))}
      </div>
      
      <Card />
      <Footer />
    </div>
  );
}

export default Firstpage;
