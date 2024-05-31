import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "./api/client";
import Card from "./Frontpagecard/Card";
import Footer from "./Footer";

function Firstpage() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('newusers')
            .select('username, name')
            .eq('email', user.email)
            .single();
          if (error) {
            throw error;
          }
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error.message);
        }
      }
    }
    fetchUserInfo();
  }, [user]);

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
      <div className="">
        {userInfo ? <Link to="/dashboard"><h2 className="hello">Hello, {userInfo.name}</h2> </Link>: <p></p>}
      </div>
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
