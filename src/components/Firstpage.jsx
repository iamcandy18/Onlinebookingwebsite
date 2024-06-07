import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "./api/client";
import Card from "./Frontpagecard/Card";
import Footer from "./Footer";

function Firstpage() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [text, setText] = useState('');

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
    { text: 'TREEHOUSE', icon: 'fa-tree', linkTo: '/treehouse' },
    { text: 'LAKE', icon: 'fa-pied-piper', linkTo: '/lake' },
    { text: 'AMAZING VIEW', icon: 'fa-window-maximize', linkTo: '/amazing-view' },
    { text: 'COUNTRYSIDE', icon: 'fa-globe', linkTo: '/countryside' },
    { text: 'NATIONAL PARKS', icon: 'fa-envira', linkTo: '/national-parks' },
    { text: 'RESTAURANTS', icon: 'fa-cutlery', linkTo: '/restaurants' },
    { text: 'CAFES', icon: 'fa-coffee', linkTo: '/cafes' },
    { text: 'SNOW PARKS', icon: 'fa-cubes', linkTo: '/snow-parks' },
    { text: 'MUSIC SHOWS', icon: 'fa-microphone', linkTo: '/cafes' },
    { text: 'SNOW PARKS', icon: 'fa-cubes', linkTo: '/snow-parks' },
  ];

  const changecardimages = (text) => {
    setText(text);
  };

  return (
    <div>
      <div className="dash1"></div>

      <div className="wr2">
        <div className="">
          {userInfo ? (
            <Link to="/dashboard">
              <h2 className="hello">Hello, {userInfo.name}</h2>
            </Link>
          ) : (
            <div className="padding"></div>
          )}
        </div>

        <div className="fullpage">
          {buttonTexts.map(({ text, icon, linkTo }) => (
            <div className="fpicons" key={text}>
              <button className="fpb" onClick={() => changecardimages(text)}>
                <p>{text}</p>
                <i className={`fa ${icon}`} aria-hidden="true"></i>
              </button>
            </div>
          ))}
        </div>

        <Link to="/booking">
          <Card text={text} />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Firstpage;
